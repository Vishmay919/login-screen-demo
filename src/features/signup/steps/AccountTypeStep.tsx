import type { FormEvent } from 'react'
import SelectableCard from '../../../components/SelectableCard/SelectableCard'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import { BriefcaseIcon, PersonIcon } from '../../../components/icons'
import type { StepProps } from './stepProps'
import styles from './steps.module.css'

export default function AccountTypeStep({ data, update, onNext, onBack }: StepProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>
        To join us tell us <span className={styles.accent}>what type of account</span> you are
        opening
      </h2>

      <div className={`${styles.fields} ${styles.fields_tight}`} role="radiogroup" aria-label="Account type">
        <SelectableCard
          icon={<PersonIcon />}
          label="Personal"
          selected={data.accountType === 'personal'}
          onSelect={() => update({ accountType: 'personal' })}
        />
        <SelectableCard
          icon={<BriefcaseIcon />}
          label="Business"
          selected={data.accountType === 'business'}
          onSelect={() => update({ accountType: 'business' })}
        />
      </div>

      <WizardFooter onBack={onBack} backDisabled />
    </form>
  )
}
