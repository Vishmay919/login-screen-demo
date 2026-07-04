export type StepId = 'account' | 'mobile' | 'otp' | 'name' | 'password'

export interface StepMeta {
  id: StepId
  // Progress fill as a fraction of the 554px track, read off the Figma fills.
  // null means no bar, which the design only does on the first step.
  progress: number | null
}

export const STEPS: StepMeta[] = [
  { id: 'account', progress: null },
  { id: 'mobile', progress: 80 / 554 },
  { id: 'otp', progress: 160 / 554 },
  { id: 'name', progress: 264 / 554 },
  { id: 'password', progress: 1 },
]
