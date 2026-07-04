import type { ReactNode } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import { CheckIcon } from '../icons'
import styles from './SelectableCard.module.css'

interface SelectableCardProps {
  icon: ReactNode
  label: string
  selected: boolean
  onSelect: () => void
}

export default function SelectableCard({ icon, label, selected, onSelect }: SelectableCardProps) {
  return (
    <ButtonBase
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`${styles.card} ${selected ? styles.card_selected : ''}`}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.check} ${selected ? styles.check_on : ''}`} aria-hidden>
        <CheckIcon className={styles.check_icon} />
      </span>
    </ButtonBase>
  )
}
