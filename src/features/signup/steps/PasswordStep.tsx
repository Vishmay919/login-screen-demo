import { useState, type FormEvent } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import TextField from '../../../components/TextField/TextField'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import { EyeIcon, EyeOffIcon } from '../../../components/icons'
import { validateConfirmPassword, validatePassword } from '../validation'
import { createAccount } from '../api'
import { useAsyncAction } from '../useAsyncAction'
import type { StepProps } from './stepProps'
import styles from './steps.module.css'

export default function PasswordStep({ data, update, onNext, onBack }: StepProps) {
  const [submitted, setSubmitted] = useState(false)
  const { pending, error: serverError, run } = useAsyncAction()

  const passwordError = submitted ? validatePassword(data.password) : null
  const confirmError = submitted
    ? validateConfirmPassword(data.password, data.confirmPassword)
    : null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (validatePassword(data.password) || validateConfirmPassword(data.password, data.confirmPassword)) {
      return
    }
    run(async () => {
      await createAccount(data)
      onNext()
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>Create Password for your account</h2>

      <div className={styles.fields}>
        <PasswordField
          label="Enter new password"
          name="new-password"
          placeholder="Enter new password"
          helper="Must be at least 6 characters"
          value={data.password}
          onChange={(v) => update({ password: v })}
          error={passwordError}
          autoFocus
        />
        <PasswordField
          label="Confirm password"
          name="confirm-password"
          placeholder="Confirm password"
          helper="Both passwords must match"
          value={data.confirmPassword}
          onChange={(v) => update({ confirmPassword: v })}
          error={confirmError}
        />
      </div>

      {serverError && (
        <p className={styles.error_text} role="alert">
          {serverError}
        </p>
      )}

      <WizardFooter onBack={onBack} loading={pending} />
    </form>
  )
}

interface PasswordFieldProps {
  label: string
  name: string
  placeholder: string
  helper: string
  value: string
  onChange: (value: string) => void
  error: string | null
  autoFocus?: boolean
}

function PasswordField({ error, autoFocus, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      autoComplete="new-password"
      error={error}
      autoFocus={autoFocus}
      endAdornment={
        <ButtonBase
          type="button"
          className={styles.pw_toggle}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeIcon /> : <EyeOffIcon />}
        </ButtonBase>
      }
    />
  )
}
