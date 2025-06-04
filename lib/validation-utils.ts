/**
 * ==========================================
 * REGISTRATION VALIDATION UTILITIES
 * ==========================================
 * Enhanced validation for registration forms and API
 */

export interface PasswordStrengthResult {
  score: number
  feedback: string[]
  isValid: boolean
}

export interface UsernameValidationResult {
  isValid: boolean
  errors: string[]
}

export interface EmailValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Enhanced password validation with detailed feedback
 */
export function validatePasswordStrength(password: string): PasswordStrengthResult {
  const feedback: string[] = []
  let score = 0

  // Length check (minimum 6 characters for better UX)
  if (password.length >= 6) {
    score++
  } else {
    feedback.push("Password must be at least 6 characters long")
  }

  // Contains letter
  if (/[a-zA-Z]/.test(password)) {
    score++
  } else {
    feedback.push("Password must contain at least one letter")
  }

  // Contains number
  if (/[0-9]/.test(password)) {
    score++
  } else {
    feedback.push("Password must contain at least one number")
  }

  // Contains special character
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++
  } else {
    feedback.push("Password must contain at least one special character")
  }

  // Additional security checks
  if (password.length >= 12) {
    score += 0.5 // Bonus for longer passwords
  }

  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    score += 0.5 // Bonus for mixed case
  }

  return {
    score: Math.min(score, 4), // Cap at 4
    feedback,
    isValid: score >= 2 // Require at least 2 criteria (easy requirement)
  }
}

/**
 * Username validation with comprehensive checks
 */
export function validateUsername(username: string): UsernameValidationResult {
  const errors: string[] = []

  // Length check
  if (username.length < 3) {
    errors.push("Username must be at least 3 characters long")
  }

  if (username.length > 30) {
    errors.push("Username must be less than 30 characters")
  }

  // Valid characters check
  const validUsernameRegex = /^[a-zA-Z0-9_-]+$/
  if (!validUsernameRegex.test(username)) {
    errors.push("Username can only contain letters, numbers, underscores, and hyphens")
  }

  // Cannot start or end with special characters
  if (/^[_-]|[_-]$/.test(username)) {
    errors.push("Username cannot start or end with underscore or hyphen")
  }

  // Cannot contain consecutive special characters
  if (/[_-]{2,}/.test(username)) {
    errors.push("Username cannot contain consecutive underscores or hyphens")
  }

  // Reserved usernames
  const reservedUsernames = [
    'admin', 'administrator', 'root', 'system', 'api', 'www', 'mail', 'ftp',
    'support', 'help', 'info', 'contact', 'sales', 'marketing', 'security',
    'null', 'undefined', 'test', 'demo', 'guest', 'anonymous', 'user'
  ]

  if (reservedUsernames.includes(username.toLowerCase())) {
    errors.push("This username is reserved and cannot be used")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Email validation with enhanced checking
 */
export function validateEmail(email: string): EmailValidationResult {
  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    return {
      isValid: false,
      error: "Email is required"
    }
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address"
    }
  }

  // Check for common typos in domains
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'edu']
  const domain = email.split('@')[1]?.toLowerCase()
  
  // Basic length checks
  if (email.length > 254) {
    return {
      isValid: false,
      error: "Email address is too long"
    }
  }

  return {
    isValid: true
  }
}

/**
 * Comprehensive form validation for registration
 */
export interface RegistrationFormData {
  email: string
  username: string
  password: string
  confirmPassword: string
  name: string
}

export interface RegistrationValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
  warnings: Record<string, string[]>
}

export function validateRegistrationForm(data: RegistrationFormData): RegistrationValidationResult {
  const errors: Record<string, string[]> = {}
  const warnings: Record<string, string[]> = {}

  // Email validation
  const emailValidation = validateEmail(data.email)
  if (!emailValidation.isValid && emailValidation.error) {
    errors.email = [emailValidation.error]
  }

  // Username validation
  const usernameValidation = validateUsername(data.username)
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.errors
  }

  // Password validation
  const passwordValidation = validatePasswordStrength(data.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.feedback
  } else if (passwordValidation.score < 3) {
    warnings.password = ["Consider using a stronger password for better security"]
  }

  // Confirm password
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = ["Passwords do not match"]
  }

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters long"]
  }

  if (data.name && data.name.length > 100) {
    errors.name = ["Name must be less than 100 characters"]
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  }
}
