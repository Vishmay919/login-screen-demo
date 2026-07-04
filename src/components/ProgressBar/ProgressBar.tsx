import type { CSSProperties } from 'react'
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  value: number
}

export default function ProgressBar({ value }: ProgressBarProps) {
  const fraction = Math.min(Math.max(value, 0), 1)
  const fillVar = { '--fill': fraction } as CSSProperties

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuenow={Math.round(fraction * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Sign up progress"
    >
      <span className={styles.fill} style={fillVar} />
    </div>
  )
}
