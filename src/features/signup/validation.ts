export const MIN_PASSWORD_LENGTH = 6
export const OTP_LENGTH = 4

const MIN_MOBILE_DIGITS = 7
const MAX_MOBILE_DIGITS = 15
const MIN_NAME_LENGTH = 2

export function validateMobile(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (!digits) return 'Mobile number is required'
  if (digits.length < MIN_MOBILE_DIGITS || digits.length > MAX_MOBILE_DIGITS) {
    return 'Enter a valid mobile number'
  }
  return null
}

export function validateOtp(value: string): string | null {
  if (value.length < OTP_LENGTH) return `Enter the ${OTP_LENGTH}-digit code`
  return null
}

export function validateName(value: string, label: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return `${label} is required`
  if (trimmed.length < MIN_NAME_LENGTH) return `${label} looks too short`
  return null
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Password is required'
  if (value.length < MIN_PASSWORD_LENGTH) return `Must be at least ${MIN_PASSWORD_LENGTH} characters`
  return null
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  if (!confirm) return 'Please re-enter your password'
  if (password !== confirm) return 'Both passwords must match'
  return null
}
