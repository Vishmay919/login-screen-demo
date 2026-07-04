import type { SignupData } from './types'

// Simulated backend for the signup flow. These are the only functions that talk
// to "the server". To go live, replace each body with a real fetch call and
// keep the signatures the same; the step components do not need to change.

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export interface CreatedAccount {
  id: string
}

export async function sendOtp(countryCode: string, mobile: string): Promise<void> {
  await delay(900)
  if (!mobile) {
    throw new Error(`No mobile number was provided for ${countryCode}.`)
  }
}

export async function verifyOtp(mobile: string, code: string): Promise<void> {
  await delay(900)
  // The demo accepts any four digit code except 0000, which stands in for the
  // "wrong code" response a real endpoint would return.
  if (code === '0000') {
    throw new Error(`That code did not match the one sent to ${mobile}.`)
  }
}

export async function createAccount(data: SignupData): Promise<CreatedAccount> {
  await delay(1100)
  return { id: `acc_${data.mobile.slice(-4) || 'demo'}` }
}
