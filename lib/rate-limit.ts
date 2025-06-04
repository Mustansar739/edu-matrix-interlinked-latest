// ==========================================
// RATE LIMITING SERVICE - SECURITY ENHANCEMENT
// ==========================================

import { RateLimiterMemory } from 'rate-limiter-flexible'
import { prisma } from './prisma'

// Rate limiters for different operations
const loginAttemptLimiter = new RateLimiterMemory({
  keyPrefix: 'login_fail',
  points: 5, // Number of attempts
  duration: 900, // Per 15 minutes
  blockDuration: 900, // Block for 15 minutes
})

const generalLimiter = new RateLimiterMemory({
  keyPrefix: 'general',
  points: 100, // Number of requests
  duration: 60, // Per 1 minute
  blockDuration: 60, // Block for 1 minute
})

const passwordResetLimiter = new RateLimiterMemory({
  keyPrefix: 'password_reset',
  points: 3, // Number of attempts
  duration: 3600, // Per 1 hour
  blockDuration: 3600, // Block for 1 hour
})

const registrationLimiter = new RateLimiterMemory({
  keyPrefix: 'registration',
  points: 3, // Number of registrations
  duration: 3600, // Per 1 hour
  blockDuration: 3600, // Block for 1 hour
})

interface RateLimitOptions {
  identifier: string // IP address or user email
  type: 'login' | 'general' | 'password_reset' | 'registration'
}

export const rateLimitService = {
  async checkRateLimit({ identifier, type }: RateLimitOptions) {
    try {
      let limiter: RateLimiterMemory

      switch (type) {
        case 'login':
          limiter = loginAttemptLimiter
          break
        case 'password_reset':
          limiter = passwordResetLimiter
          break
        case 'registration':
          limiter = registrationLimiter
          break
        default:
          limiter = generalLimiter
      }

      const resRateLimit = await limiter.consume(identifier)
      
      return {
        allowed: true,
        remainingPoints: resRateLimit.remainingPoints,
        resetTime: new Date(Date.now() + resRateLimit.msBeforeNext)
      }

    } catch (rejRes: any) {
      const secs = Math.round(rejRes.msBeforeNext / 1000) || 1
      
      return {
        allowed: false,
        remainingPoints: 0,
        resetTime: new Date(Date.now() + rejRes.msBeforeNext),
        retryAfter: secs,
        error: `Too many ${type} attempts. Try again in ${secs} seconds.`
      }
    }
  },

  async recordFailedLogin(email: string, ipAddress?: string) {
    try {
      // Record in database for persistent tracking
      await prisma.user.update({
        where: { email },
        data: {
          failedAttempts: {
            increment: 1
          },
          lastFailedLogin: new Date(),
          lastLoginAttempt: new Date()
        }
      })

      // Check if user should be locked
      const user = await prisma.user.findUnique({
        where: { email },
        select: { failedAttempts: true, id: true }
      })

      if (user && user.failedAttempts >= 5) {
        // Lock account for 30 minutes after 5 failed attempts
        const lockUntil = new Date(Date.now() + 30 * 60 * 1000)
        
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lockedUntil: lockUntil
          }
        })

        return { locked: true, lockUntil }
      }

      return { locked: false }

    } catch (error) {
      console.error('Failed to record login attempt:', error)
      throw error
    }
  },

  async clearFailedLogins(email: string) {
    try {
      await prisma.user.update({
        where: { email },
        data: {
          failedAttempts: 0,
          lockedUntil: null,
          lastFailedLogin: null
        }
      })
    } catch (error) {
      console.error('Failed to clear failed logins:', error)
      throw error
    }
  },

  async isAccountLocked(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          lockedUntil: true,
          failedAttempts: true
        }
      })

      if (!user) return { locked: false }

      if (user.lockedUntil && user.lockedUntil > new Date()) {
        const unlockTime = user.lockedUntil
        const remainingTime = Math.ceil((unlockTime.getTime() - Date.now()) / 1000 / 60)
        
        return {
          locked: true,
          unlockTime,
          remainingMinutes: remainingTime,
          error: `Account is locked. Try again in ${remainingTime} minutes.`
        }
      }

      // Clear lock if time has passed
      if (user.lockedUntil && user.lockedUntil <= new Date()) {
        await this.clearFailedLogins(email)
      }

      return { locked: false }

    } catch (error) {
      console.error('Failed to check account lock:', error)
      throw error
    }
  },

  // Record authentication attempts for auditing
  async recordAuthAttempt(email: string, status: 'SUCCESS' | 'FAILED' | 'BLOCKED', userAgent?: string, ipAddress?: string) {
    try {
      await prisma.authAttempt.create({
        data: {
          email,
          status,
          userAgent,
          // Note: In a real app, you might want to hash IP addresses for privacy
        }
      })
    } catch (error) {
      console.error('Failed to record auth attempt:', error)
      // Don't throw error to avoid breaking auth flow
    }
  },

  // Get client IP from request
  getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    
    if (realIP) {
      return realIP
    }
    
    return 'unknown'
  },

  // Get user agent from request
  getUserAgent(request: Request): string {
    return request.headers.get('user-agent') || 'unknown'
  }
}
