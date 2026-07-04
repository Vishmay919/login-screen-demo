export const MIN_PASSWORD_LENGTH = 6
export const OTP_LENGTH = 4

export function validateMobile(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (!digits) return 'Mobile number is required'
  if (digits.length < 7 || digits.length > 15) return 'Enter a valid mobile number'
  return null
}

export function validateOtp(value: string): string | null {
  if (value.length < OTP_LENGTH) return `Enter the ${OTP_LENGTH}-digit code`
  return null
}

export function validateName(value: string, label: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return `${label} is required`
  if (trimmed.length < 2) return `${label} looks too short`
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
