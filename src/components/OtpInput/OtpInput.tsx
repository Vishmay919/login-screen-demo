import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react'
import { OTP_LENGTH } from '../../features/signup/validation'
import styles from './OtpInput.module.css'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  autoFocus?: boolean
  error?: boolean
}

export default function OtpInput({
  value,
  onChange,
  length = OTP_LENGTH,
  autoFocus = false,
  error = false,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const chars = Array.from({ length }, (_, i) => value[i] ?? '')

  const focusBox = (index: number) => {
    refs.current[Math.max(0, Math.min(length - 1, index))]?.focus()
  }

  const setChar = (index: number, char: string) => {
    const next = [...chars]
    next[index] = char
    onChange(next.join('').slice(0, length))
  }

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    if (!digit) return
    setChar(index, digit)
    if (index < length - 1) focusBox(index + 1)
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (chars[index]) {
        setChar(index, '')
      } else if (index > 0) {
        setChar(index - 1, '')
        focusBox(index - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusBox(index - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusBox(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    e.preventDefault()
    onChange(pasted)
    focusBox(pasted.length - 1)
  }

  return (
    <div className={styles.group} role="group" aria-label="One-time passcode" onPaste={handlePaste}>
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el
          }}
          className={`${styles.box} ${char ? styles.box_filled : ''} ${error ? styles.box_error : ''}`}
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={(e) => e.target.select()}
          autoFocus={autoFocus && index === 0}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
