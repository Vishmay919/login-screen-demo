import ButtonBase from '@mui/material/ButtonBase'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './WizardFooter.module.css'

interface WizardFooterProps {
  onBack: () => void
  backDisabled?: boolean
  continueLabel?: string
  continueDisabled?: boolean
  loading?: boolean
}

// Shared Back / Continue row. Continue is a submit button so each step's form
// gets Enter-to-submit and the browser's native validation ordering.
export default function WizardFooter({
  onBack,
  backDisabled = false,
  continueLabel = 'Continue',
  continueDisabled = false,
  loading = false,
}: WizardFooterProps) {
  return (
    <div className={styles.footer}>
      <ButtonBase
        type="button"
        className={styles.back}
        onClick={onBack}
        disabled={backDisabled || loading}
      >
        Back
      </ButtonBase>
      <ButtonBase type="submit" className={styles.next} disabled={continueDisabled || loading}>
        {loading ? (
          <CircularProgress size={20} thickness={5} color="inherit" />
        ) : (
          continueLabel
        )}
      </ButtonBase>
    </div>
  )
}
