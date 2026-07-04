import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import InputBase from '@mui/material/InputBase'
import styles from './TextField.module.css'

interface TextFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  type?: 'text' | 'tel' | 'password'
  error?: string | null
  helper?: string
  name?: string
  autoFocus?: boolean
  autoComplete?: string
  required?: boolean
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
  endAdornment?: ReactNode
}

export default function TextField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  error,
  helper,
  name,
  autoFocus,
  autoComplete,
  required,
  inputMode,
  endAdornment,
}: TextFieldProps) {
  const id = useId()
  const describedBy = `${id}-desc`
  const message = error ?? helper
  const hasError = Boolean(error)

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={`${styles.control} ${hasError ? styles.control_error : ''}`}>
        <InputBase
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          inputProps={{
            inputMode,
            'aria-invalid': hasError,
            'aria-describedby': message ? describedBy : undefined,
          }}
          className={styles.input}
          fullWidth
        />
        {endAdornment && <span className={styles.adornment}>{endAdornment}</span>}
      </div>

      {message && (
        <p id={describedBy} className={`${styles.helper} ${hasError ? styles.helper_error : ''}`}>
          {message}
        </p>
      )}
    </div>
  )
}
