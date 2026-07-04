export type AccountType = 'personal' | 'business'

export interface SignupData {
  accountType: AccountType
  countryCode: string
  mobile: string
  otp: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export const emptySignupData: SignupData = {
  accountType: 'personal',
  countryCode: '+1',
  mobile: '',
  otp: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
}
