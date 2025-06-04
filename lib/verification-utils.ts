/**
 * Generate a cryptographically secure random verification token
 * Uses Web Crypto API for Edge Runtime compatibility
 */
export function generateVerificationToken(): string {
  // Use Web Crypto API which is available in Edge Runtime
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  
  // Convert to hex string
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export function generateTokenExpiration(hours: number = 24): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000)
}

export function isTokenExpired(expiration: Date): boolean {
  return expiration < new Date()
}
