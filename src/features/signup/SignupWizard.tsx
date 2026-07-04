import { useState, type ReactElement } from 'react'
import AuthLayout from '../../components/AuthLayout/AuthLayout'
import SuccessModal from './SuccessModal'
import AccountTypeStep from './steps/AccountTypeStep'
import MobileStep from './steps/MobileStep'
import OtpStep from './steps/OtpStep'
import NameStep from './steps/NameStep'
import PasswordStep from './steps/PasswordStep'
import { STEPS, type StepId } from './steps'
import { emptySignupData, type SignupData } from './types'
import type { StepProps } from './steps/stepProps'
import styles from './SignupWizard.module.css'

const STEP_COMPONENTS: Record<StepId, (props: StepProps) => ReactElement> = {
  account: AccountTypeStep,
  mobile: MobileStep,
  otp: OtpStep,
  name: NameStep,
  password: PasswordStep,
}

export default function SignupWizard() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'back'>('next')
  const [data, setData] = useState<SignupData>(emptySignupData)
  const [success, setSuccess] = useState(false)

  const step = STEPS[index]
  const StepComponent = STEP_COMPONENTS[step.id]

  const update = (patch: Partial<SignupData>) => setData((prev) => ({ ...prev, ...patch }))

  const goNext = () => {
    if (index < STEPS.length - 1) {
      setDirection('next')
      setIndex((i) => i + 1)
    } else {
      setSuccess(true)
    }
  }

  const goBack = () => {
    setDirection('back')
    setIndex((i) => Math.max(0, i - 1))
  }

  const restart = () => {
    setSuccess(false)
    setDirection('back')
    setIndex(0)
    setData(emptySignupData)
  }

  return (
    <>
      <AuthLayout progress={step.progress}>
        <div
          key={step.id}
          className={`${styles.step} ${direction === 'back' ? styles.step_back : ''}`}
        >
          <StepComponent data={data} update={update} onNext={goNext} onBack={goBack} />
        </div>
      </AuthLayout>

      <SuccessModal open={success} data={data} onGoToDashboard={restart} />
    </>
  )
}
