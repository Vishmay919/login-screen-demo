import type { SignupData } from '../types'

export interface StepProps {
  data: SignupData
  update: (patch: Partial<SignupData>) => void
  onNext: () => void
  onBack: () => void
}

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
