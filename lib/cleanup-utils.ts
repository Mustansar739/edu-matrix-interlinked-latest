/**
 * Cleanup utilities for unverified accounts and expired data
 */

import { prisma } from './prisma'

/**
 * Clean up expired unverified accounts
 * Called periodically to remove accounts that were never verified
 */
export async function cleanupExpiredUnverifiedAccounts() {
  try {
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))

    // Delete unverified accounts where:
    // 1. Email verification has expired, OR
    // 2. Account is older than 7 days
    const result = await prisma.user.deleteMany({
      where: {
        AND: [
          { isVerified: false },
          {
            OR: [
              { emailVerificationExpires: { lt: now } },
              { createdAt: { lt: sevenDaysAgo } }
            ]
          }
        ]
      }
    })

    console.log(`Cleaned up ${result.count} expired unverified accounts`)
    return result.count
  } catch (error) {
    console.error('Error cleaning up unverified accounts:', error)
    throw error
  }
}

/**
 * Clean up expired OTP tokens
 */
export async function cleanupExpiredOTPTokens() {
  try {
    const now = new Date()

    const result = await prisma.user.updateMany({
      where: {
        otpExpires: { lt: now }
      },
      data: {
        otpCode: null,
        otpExpires: null,
        otpAttempts: 0
      }
    })

    console.log(`Cleaned up ${result.count} expired OTP tokens`)
    return result.count
  } catch (error) {
    console.error('Error cleaning up OTP tokens:', error)
    throw error
  }
}

/**
 * Clean up expired password reset tokens
 */
export async function cleanupExpiredPasswordResetTokens() {
  try {
    const now = new Date()

    const result = await prisma.user.updateMany({
      where: {
        passwordResetExpires: { lt: now }
      },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null
      }
    })

    console.log(`Cleaned up ${result.count} expired password reset tokens`)
    return result.count
  } catch (error) {
    console.error('Error cleaning up password reset tokens:', error)
    throw error
  }
}

/**
 * Run all cleanup tasks
 */
export async function runAllCleanupTasks() {
  console.log('Starting cleanup tasks...')
  
  const results = {
    unverifiedAccounts: 0,
    otpTokens: 0,
    passwordResetTokens: 0
  }

  try {
    results.unverifiedAccounts = await cleanupExpiredUnverifiedAccounts()
    results.otpTokens = await cleanupExpiredOTPTokens()
    results.passwordResetTokens = await cleanupExpiredPasswordResetTokens()

    console.log('Cleanup completed:', results)
    return results
  } catch (error) {
    console.error('Error during cleanup:', error)
    throw error
  }
}

/**
 * Check if an unverified account is expired
 */
export function isUnverifiedAccountExpired(user: {
  isVerified: boolean
  emailVerificationExpires: Date | null
  createdAt: Date
}): boolean {
  if (user.isVerified) return false

  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))

  // Account is expired if:
  // 1. Email verification has expired, OR
  // 2. Account is older than 7 days
  return (
    (user.emailVerificationExpires && user.emailVerificationExpires < now) ||
    user.createdAt < sevenDaysAgo
  )
}
