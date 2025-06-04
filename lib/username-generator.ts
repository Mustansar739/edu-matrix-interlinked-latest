import { prisma } from "@/lib/prisma"

/**
 * Generate a unique username based on first name, last name, and email
 */
export async function generateUniqueUsername(
  firstName: string, 
  lastName: string, 
  email: string
): Promise<string> {
  // Clean and prepare base components
  const cleanFirstName = firstName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const cleanLastName = lastName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  
  // Generate different username patterns
  const patterns = [
    `${cleanFirstName}${cleanLastName}`,
    `${cleanFirstName}.${cleanLastName}`,
    `${cleanFirstName}_${cleanLastName}`,
    `${cleanFirstName}${cleanLastName.charAt(0)}`,
    `${cleanFirstName.charAt(0)}${cleanLastName}`,
    `${emailPrefix}`,
    `${cleanFirstName}${cleanLastName}2024`,
    `${cleanFirstName}${cleanLastName}edu`,
  ]
  
  // Try each pattern
  for (const pattern of patterns) {
    if (pattern.length >= 3) {
      const isAvailable = await isUsernameAvailable(pattern)
      if (isAvailable) {
        return pattern
      }
    }
  }
  
  // If all patterns are taken, add random numbers
  const basePattern = `${cleanFirstName}${cleanLastName}`
  for (let i = 1; i <= 999; i++) {
    const candidate = `${basePattern}${i}`
    const isAvailable = await isUsernameAvailable(candidate)
    if (isAvailable) {
      return candidate
    }
  }
  
  // Ultimate fallback - use timestamp
  const timestamp = Date.now().toString().slice(-6)
  return `user${timestamp}`
}

/**
 * Check if a username is available
 */
async function isUsernameAvailable(username: string): Promise<boolean> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username }
    })
    return !existingUser
  } catch (error) {
    console.error('Error checking username availability:', error)
    return false
  }
}

/**
 * Generate username from Google profile
 */
export async function generateUsernameFromGoogle(
  name: string,
  email: string
): Promise<string> {
  const nameParts = name.split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts[1] || ''
  
  return generateUniqueUsername(firstName, lastName, email)
}

/**
 * Generate username with preference for a specific username
 */
export async function generateUsernameWithPreference(
  firstName: string, 
  lastName: string, 
  email: string,
  preferredUsername?: string
): Promise<string> {
  // If preferred username is provided and available, use it
  if (preferredUsername && preferredUsername.length >= 3) {
    const cleanPreferred = preferredUsername.toLowerCase().replace(/[^a-z0-9_-]/g, '')
    if (cleanPreferred.length >= 3 && await isUsernameAvailable(cleanPreferred)) {
      return cleanPreferred
    }
  }
  
  // Otherwise use the standard generation logic
  return generateUniqueUsername(firstName, lastName, email)
}
