import { useState, type FormEvent, type MouseEvent } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '../../../components/TextField/TextField'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import { ChevronDownIcon, UsFlagIcon } from '../../../components/icons'
import { validateMobile } from '../validation'
import { delay, type StepProps } from './stepProps'
import styles from './steps.module.css'

const COUNTRIES = [
  { code: '+1', label: 'United States' },
  { code: '+44', label: 'United Kingdom' },
  { code: '+91', label: 'India' },
  { code: '+61', label: 'Australia' },
]

export default function MobileStep({ data, update, onNext, onBack }: StepProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const error = submitted ? validateMobile(data.mobile) : null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (validateMobile(data.mobile)) return
    setLoading(true)
    await delay(900) // pretend we are dispatching the OTP
    setLoading(false)
    onNext()
  }

  const openMenu = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)
  const pick = (code: string) => {
    update({ countryCode: code })
    setAnchor(null)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>OTP Verification</h2>

      <div className={styles.fields}>
        <div>
          <span className={styles.label} id="mobile-label">
            Mobile Number<span className={styles.required}> *</span>
          </span>
          <div className={styles.mobile_row}>
            <ButtonBase
              type="button"
              className={`${styles.country} ${anchor ? styles.country_open : ''}`}
              onClick={openMenu}
              aria-haspopup="listbox"
              aria-expanded={Boolean(anchor)}
              aria-label={`Country code ${data.countryCode}`}
            >
              <UsFlagIcon className={styles.country_flag} />
              <span className={styles.country_code}>{data.countryCode}</span>
              <ChevronDownIcon className={styles.country_chevron} />
            </ButtonBase>

            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
              {COUNTRIES.map((c) => (
                <MenuItem
                  key={c.code}
                  selected={c.code === data.countryCode}
                  onClick={() => pick(c.code)}
                >
                  {c.label} ({c.code})
                </MenuItem>
              ))}
            </Menu>

            <div className={styles.mobile_input}>
              <TextField
                type="tel"
                name="mobile"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="8343989239"
                value={data.mobile}
                onChange={(v) => update({ mobile: v.replace(/[^\d]/g, '') })}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>

      <WizardFooter onBack={onBack} loading={loading} />
    </form>
  )
}
