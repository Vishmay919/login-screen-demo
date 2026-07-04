import { useState, type FormEvent } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import TextField from '../../../components/TextField/TextField'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import { EyeIcon, EyeOffIcon } from '../../../components/icons'
import { validateConfirmPassword, validatePassword } from '../validation'
import { delay, type StepProps } from './stepProps'
import styles from './steps.module.css'

export default function PasswordStep({ data, update, onNext, onBack }: StepProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordError = submitted ? validatePassword(data.password) : null
  const confirmError = submitted
    ? validateConfirmPassword(data.password, data.confirmPassword)
    : null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (
      validatePassword(data.password) ||
      validateConfirmPassword(data.password, data.confirmPassword)
    ) {
      return
    }
    setLoading(true)
    await delay(1100) // pretend we are creating the account
    setLoading(false)
    onNext()
  }

  const toggle = (visible: boolean, onToggle: () => void, label: string) => (
    <ButtonBase type="button" className={styles.pw_toggle} onClick={onToggle} aria-label={label}>
      {visible ? <EyeIcon /> : <EyeOffIcon />}
    </ButtonBase>
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>Create Password for your account</h2>

      <div className={styles.fields}>
        <TextField
          label="Enter new password"
          type={showPassword ? 'text' : 'password'}
          name="new-password"
          autoComplete="new-password"
          placeholder="Enter new password"
          value={data.password}
          onChange={(v) => update({ password: v })}
          error={passwordError}
          helper="Must be at least 6 characters"
          endAdornment={toggle(
            showPassword,
            () => setShowPassword((s) => !s),
            showPassword ? 'Hide password' : 'Show password',
          )}
          autoFocus
        />
        <TextField
          label="Confirm password"
          type={showConfirm ? 'text' : 'password'}
          name="confirm-password"
          autoComplete="new-password"
          placeholder="Confirm  password"
          value={data.confirmPassword}
          onChange={(v) => update({ confirmPassword: v })}
          error={confirmError}
          helper="Both passwords must match"
          endAdornment={toggle(
            showConfirm,
            () => setShowConfirm((s) => !s),
            showConfirm ? 'Hide password' : 'Show password',
          )}
        />
      </div>

      <WizardFooter onBack={onBack} loading={loading} />
    </form>
  )
}
