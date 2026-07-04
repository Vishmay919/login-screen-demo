import Modal from '@mui/material/Modal'
import ButtonBase from '@mui/material/ButtonBase'
import { CheckIcon, ShieldCheckIcon } from '../../components/icons'
import type { SignupData } from './types'
import styles from './SuccessModal.module.css'

interface SuccessModalProps {
  open: boolean
  data: SignupData
  onGoToDashboard: () => void
}

export default function SuccessModal({ open, data, onGoToDashboard }: SuccessModalProps) {
  const fullName = `${data.firstName} ${data.lastName}`.trim()
  const rows = [
    { label: 'Account Type', value: data.accountType === 'business' ? 'Business' : 'Personal' },
    { label: 'Name', value: fullName || '—' },
    { label: 'Mobile Number', value: `${data.countryCode} ${data.mobile}` },
  ]

  return (
    <Modal open={open} aria-labelledby="success-title">
      <div className={styles.card}>
        <span className={styles.badge}>
          <CheckIcon className={styles.badge_icon} />
        </span>

        <h2 id="success-title" className={styles.title}>
          You’re all set!
        </h2>
        <p className={styles.subtitle}>Here’s a quick summary of your account details</p>

        <dl className={styles.summary}>
          {rows.map((row) => (
            <div key={row.label} className={styles.row}>
              <dt className={styles.row_label}>{row.label}</dt>
              <dd className={styles.row_value} title={row.value}>{row.value}</dd>
            </div>
          ))}
        </dl>

        <p className={styles.secure}>
          <ShieldCheckIcon className={styles.secure_icon} />
          Your account is secured with bank-grade security
        </p>

        <ButtonBase className={styles.cta} onClick={onGoToDashboard}>
          Go To Dashboard
        </ButtonBase>
      </div>
    </Modal>
  )
}
