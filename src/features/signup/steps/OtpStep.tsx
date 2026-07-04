import { useState, type FormEvent } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import OtpInput from '../../../components/OtpInput/OtpInput'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import { validateOtp } from '../validation'
import { sendOtp, verifyOtp } from '../api'
import { useAsyncAction } from '../useAsyncAction'
import type { StepProps } from './stepProps'
import styles from './steps.module.css'

export default function OtpStep({ data, update, onNext, onBack }: StepProps) {
  const [submitted, setSubmitted] = useState(false)
  const [resending, setResending] = useState(false)
  // Bumped whenever the code should be re-entered, which remounts OtpInput so it
  // clears its boxes and refocuses the first one.
  const [entryId, setEntryId] = useState(0)
  const { pending, error: serverError, setError, run } = useAsyncAction()

  const error = (submitted ? validateOtp(data.otp) : null) ?? serverError

  const resetEntry = () => {
    setSubmitted(false)
    update({ otp: '' })
    setEntryId((id) => id + 1)
  }

  const handleChange = (value: string) => {
    update({ otp: value })
    if (serverError) setError(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (validateOtp(data.otp)) return
    run(async () => {
      try {
        await verifyOtp(data.mobile, data.otp)
        onNext()
      } catch (err) {
        resetEntry() // wrong code: clear the boxes so the user starts fresh
        throw err
      }
    })
  }

  const handleResend = async () => {
    setResending(true)
    setError(null)
    resetEntry()
    try {
      await sendOtp(data.countryCode, data.mobile)
    } finally {
      setResending(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>OTP Verification</h2>

      <div className={styles.fields}>
        <div>
          <p className={styles.subtitle}>An OTP has been sent to your mobile number</p>
          <OtpInput
            key={entryId}
            value={data.otp}
            onChange={handleChange}
            error={Boolean(error)}
            autoFocus
          />
          {error && (
            <p className={styles.error_text} role="alert">
              {error}
            </p>
          )}
          <p className={styles.resend_row}>
            Did not receive OTP?{' '}
            <ButtonBase
              type="button"
              className={styles.resend_btn}
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? 'Resending…' : 'Resend OTP'}
            </ButtonBase>
          </p>
        </div>
      </div>

      <WizardFooter onBack={onBack} loading={pending} />
    </form>
  )
}
