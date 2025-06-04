// ==========================================
// OTP SERVICE - SPEAKEASY INTEGRATION
// ==========================================

import * as speakeasy from 'speakeasy'
import * as QRCode from 'qrcode'
import { prisma } from './prisma'

interface GenerateOTPProps {
  userId: string
  email: string
}

interface VerifyOTPProps {
  userId: string
  token: string
}

export const otpService = {
  // Generate simple 6-digit OTP without speakeasy (more reliable)
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  },

  // Store OTP in database with purpose
  async storeOTP(userId: string, otp: string, purpose: string = 'verification') {
    try {
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
      
      await prisma.user.update({
        where: { id: userId },
        data: {
          otpToken: otp,
          otpExpires: otpExpires,
          otpAttempts: 0,
          otpLastRequest: new Date()
        }
      })

      console.log(`OTP stored for user ${userId}: ${otp} (purpose: ${purpose})`)
      return { otp, expires: otpExpires }
      
    } catch (error) {
      console.error('OTP storage error:', error)
      throw new Error('Failed to store OTP')
    }
  },
  // Generate OTP for user with email (legacy method for backward compatibility)
  async generateOTPForUser({ userId, email }: GenerateOTPProps) {
    try {
      const otp = this.generateOTP()
      return await this.storeOTP(userId, otp)
    } catch (error) {
      console.error('OTP generation error:', error)
      throw new Error('Failed to generate OTP')
    }
  },
  // Verify OTP with purpose support
  async verifyOTP(userId: string, token: string, purpose: string = 'verification'): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          otpToken: true,
          otpExpires: true,
          otpAttempts: true,
          email: true
        }
      })

      if (!user) {
        throw new Error('User not found')
      }

      // Check if OTP exists and hasn't expired
      if (!user.otpToken || !user.otpExpires || user.otpExpires < new Date()) {
        throw new Error('OTP expired or not found')
      }

      // Check attempt limits (max 3 attempts)
      if (user.otpAttempts >= 3) {
        throw new Error('Too many OTP attempts. Please request a new code.')
      }

      // Verify OTP
      if (user.otpToken !== token) {
        // Increment failed attempts
        await prisma.user.update({
          where: { id: userId },
          data: {
            otpAttempts: {
              increment: 1
            }
          }
        })
        throw new Error('Invalid OTP code')
      }

      // Clear OTP on successful verification
      await prisma.user.update({
        where: { id: userId },
        data: {
          otpToken: null,
          otpExpires: null,
          otpAttempts: 0,
          otpLastRequest: null
        }
      })

      return true
      
    } catch (error) {
      console.error('OTP verification error:', error)
      return false
    }
  },

  // Legacy verify method for backward compatibility
  async verifyOTPLegacy({ userId, token }: VerifyOTPProps) {
    const isValid = await this.verifyOTP(userId, token)
    return { success: isValid }
  },

  // Generate 2FA secret for authenticator apps
  async generate2FASecret(userId: string, email: string) {
    try {
      const secret = speakeasy.generateSecret({
        name: `Edu Matrix (${email})`,
        issuer: 'Edu Matrix',
        length: 20
      })

      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!)

      return {
        secret: secret.base32,
        qrCode: qrCodeUrl,
        backupCodes: this.generateBackupCodes()
      }
      
    } catch (error) {
      console.error('2FA secret generation error:', error)
      throw new Error('Failed to generate 2FA secret')
    }
  },

  // Verify 2FA token from authenticator app
  verify2FA(secret: string, token: string) {
    try {
      const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 2
      })

      return verified
      
    } catch (error) {
      console.error('2FA verification error:', error)
      return false
    }
  },

  // Generate backup codes for 2FA
  generateBackupCodes() {
    const codes = []
    for (let i = 0; i < 8; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase())
    }
    return codes
  },

  // Check rate limiting for OTP requests
  async checkOTPRateLimit(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          otpLastRequest: true,
          otpAttempts: true
        }
      })

      if (!user) {
        throw new Error('User not found')
      }

      // Check if last OTP request was within 1 minute
      if (user.otpLastRequest) {
        const timeSinceLastRequest = Date.now() - user.otpLastRequest.getTime()
        const oneMinute = 60 * 1000

        if (timeSinceLastRequest < oneMinute) {
          const waitTime = Math.ceil((oneMinute - timeSinceLastRequest) / 1000)
          throw new Error(`Please wait ${waitTime} seconds before requesting another OTP`)
        }
      }

      return { allowed: true }
      
    } catch (error) {
      console.error('OTP rate limit check error:', error)
      throw error
    }
  }
}
