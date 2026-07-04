import { useState, type FormEvent } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import OtpInput from '../../../components/OtpInput/OtpInput'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import { validateOtp } from '../validation'
import { delay, type StepProps } from './stepProps'
import styles from './steps.module.css'

export default function OtpStep({ data, update, onNext, onBack }: StepProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const error = submitted ? validateOtp(data.otp) : null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (validateOtp(data.otp)) return
    setLoading(true)
    await delay(900) // pretend we are verifying the code
    setLoading(false)
    onNext()
  }

  const handleResend = async () => {
    setResending(true)
    update({ otp: '' })
    setSubmitted(false)
    await delay(800)
    setResending(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>OTP Verification</h2>

      <div className={styles.fields}>
        <div>
          <p className={styles.subtitle}>An OTP has been sent to your mobile number</p>
          <OtpInput
            value={data.otp}
            onChange={(v) => update({ otp: v })}
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

      <WizardFooter onBack={onBack} loading={loading} />
    </form>
  )
}
