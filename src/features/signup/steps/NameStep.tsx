import { useState, type FormEvent } from 'react'
import TextField from '../../../components/TextField/TextField'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import { validateName } from '../validation'
import type { StepProps } from './stepProps'
import styles from './steps.module.css'

export default function NameStep({ data, update, onNext, onBack }: StepProps) {
  const [submitted, setSubmitted] = useState(false)

  const firstError = submitted ? validateName(data.firstName, 'First name') : null
  const lastError = submitted ? validateName(data.lastName, 'Last name') : null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (validateName(data.firstName, 'First name') || validateName(data.lastName, 'Last name')) {
      return
    }
    onNext()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>What is your name?</h2>

      <div className={styles.fields}>
        <TextField
          label="First Name"
          name="firstName"
          autoComplete="given-name"
          placeholder="Oliver"
          value={data.firstName}
          onChange={(v) => update({ firstName: v })}
          error={firstError}
          autoFocus
        />
        <TextField
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          placeholder="Last Name"
          value={data.lastName}
          onChange={(v) => update({ lastName: v })}
          error={lastError}
        />
      </div>

      <WizardFooter onBack={onBack} />
    </form>
  )
}
