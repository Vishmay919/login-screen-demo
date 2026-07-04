import { useState, type FormEvent, type MouseEvent } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '../../../components/TextField/TextField'
import WizardFooter from '../../../components/WizardFooter/WizardFooter'
import {
  AuFlagIcon,
  ChevronDownIcon,
  GbFlagIcon,
  InFlagIcon,
  UsFlagIcon,
} from '../../../components/icons'
import { validateMobile } from '../validation'
import { sendOtp } from '../api'
import { useAsyncAction } from '../useAsyncAction'
import type { StepProps } from './stepProps'
import styles from './steps.module.css'

const COUNTRIES = [
  { code: '+1', label: 'United States', Flag: UsFlagIcon },
  { code: '+44', label: 'United Kingdom', Flag: GbFlagIcon },
  { code: '+91', label: 'India', Flag: InFlagIcon },
  { code: '+61', label: 'Australia', Flag: AuFlagIcon },
]

export default function MobileStep({ data, update, onNext, onBack }: StepProps) {
  const [submitted, setSubmitted] = useState(false)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const { pending, error: serverError, setError, run } = useAsyncAction()

  const error = (submitted ? validateMobile(data.mobile) : null) ?? serverError
  const country = COUNTRIES.find((c) => c.code === data.countryCode) ?? COUNTRIES[0]

  const handleChange = (value: string) => {
    update({ mobile: value.replace(/[^\d]/g, '') })
    if (serverError) setError(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (validateMobile(data.mobile)) return
    run(async () => {
      await sendOtp(data.countryCode, data.mobile)
      onNext()
    })
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
              <country.Flag className={styles.country_flag} />
              <span className={styles.country_code}>{data.countryCode}</span>
              <ChevronDownIcon className={styles.country_chevron} />
            </ButtonBase>

            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
              slotProps={{ list: { role: 'listbox' } }}
            >
              {COUNTRIES.map((c) => (
                <MenuItem
                  key={c.code}
                  role="option"
                  selected={c.code === data.countryCode}
                  onClick={() => pick(c.code)}
                >
                  <c.Flag className={styles.menu_flag} />
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
                labelledBy="mobile-label"
                value={data.mobile}
                onChange={handleChange}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>

      <WizardFooter onBack={onBack} loading={pending} />
    </form>
  )
}
