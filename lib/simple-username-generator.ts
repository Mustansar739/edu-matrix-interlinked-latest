/**
 * Simple Username Generator
 * Generates usernames from firstName + lastName with fallback to random numbers
 */

/**
 * Generates a simple username from first and last name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Clean username (lowercase, no spaces, alphanumeric only)
 */
export function generateSimpleUsername(firstName: string, lastName: string): string {
  // Clean and combine names
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const cleanLast = lastName.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  // Combine names
  const baseUsername = cleanFirst + cleanLast
  
  // Ensure minimum length and not empty
  if (baseUsername.length < 3) {
    return baseUsername + 'user' // Fallback for very short names
  }
  
  return baseUsername
}

/**
 * Generates a username with random number suffix
 * @param firstName - User's first name  
 * @param lastName - User's last name
 * @returns Username with 3-digit random number suffix
 */
export function generateUsernameWithNumber(firstName: string, lastName: string): string {
  const baseUsername = generateSimpleUsername(firstName, lastName)
  const randomNumber = Math.floor(100 + Math.random() * 900) // 3-digit number (100-999)
  return baseUsername + randomNumber
}

/**
 * Validates if a username meets basic requirements
 * @param username - Username to validate
 * @returns Object with validation result and error message
 */
export function validateUsername(username: string): { isValid: boolean; error?: string } {
  // Basic validation rules
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' }
  }
  
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' }
  }
  
  if (username.length > 30) {
    return { isValid: false, error: 'Username must be less than 30 characters' }
  }
  
  // Only allow letters, numbers, and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' }
  }
  
  // Must start with a letter
  if (!/^[a-zA-Z]/.test(username)) {
    return { isValid: false, error: 'Username must start with a letter' }
  }
  
  return { isValid: true }
}
