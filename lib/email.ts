// ==========================================
// EMAIL CONFIGURATION - RESEND INTEGRATION
// ==========================================

import { Resend } from 'resend'
import { render } from '@react-email/render'
import { EmailVerificationTemplate } from '@/components/emails/email-verification'
import { PasswordResetTemplate } from '@/components/emails/password-reset'
import { WelcomeTemplate } from '@/components/emails/welcome'
import { OTPTemplate } from '@/components/emails/otp'

// ==========================================
// ENVIRONMENT VALIDATION
// ==========================================
function validateEmailConfig() {
  const requiredEnvVars = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }

  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(`Missing required email environment variables: ${missing.join(', ')}`)
  }

  // Validate API key format
  if (!process.env.RESEND_API_KEY?.startsWith('re_')) {
    console.warn('⚠️  RESEND_API_KEY does not appear to be in the correct format (should start with "re_")')
  }

  // Check for placeholder values
  if (process.env.RESEND_API_KEY?.includes('REPLACE_WITH_ACTUAL_API_KEY')) {
    throw new Error('Please replace RESEND_API_KEY with your actual API key from https://resend.com/api-keys')
  }

  return requiredEnvVars
}

const emailConfig = validateEmailConfig()
const resend = new Resend(emailConfig.RESEND_API_KEY)

// ==========================================
// EMAIL SERVICE UTILITIES
// ==========================================
interface EmailError {
  statusCode?: number
  message: string
  name?: string
}

function isRetryableError(error: EmailError): boolean {
  // Retry on server errors (5xx), rate limits, or network issues
  return (
    (error.statusCode && error.statusCode >= 500) ||
    error.statusCode === 429 ||
    error.message?.includes('network') ||
    error.message?.includes('timeout')
  )
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error = new Error('Unknown error')

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxRetries) {
        break
      }

      const emailError = error as EmailError
      if (!isRetryableError(emailError)) {
        // Don't retry non-retryable errors
        throw error
      }

      const delayMs = baseDelay * Math.pow(2, attempt) + Math.random() * 1000
      console.log(`📧 Email attempt ${attempt + 1} failed, retrying in ${delayMs}ms...`)
      await delay(delayMs)
    }
  }

  throw lastError
}

// ==========================================
// EMAIL SERVICE INTERFACES
// ==========================================
interface SendEmailVerificationProps {
  email: string
  name: string
  verificationToken: string
}

interface SendPasswordResetProps {
  email: string
  name: string
  resetToken: string
}

interface SendWelcomeEmailProps {
  email: string
  name: string
}

interface SendOTPEmailProps {
  email: string
  name: string
  otp: string
  purpose: 'login' | 'registration' | 'password-reset' | '2fa-setup'
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export const emailService = {
  // ==========================================
  // EMAIL HEALTH CHECK
  // ==========================================
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy', details: string }> {
    try {
      // Test API key validity with a simple request
      const testEmail = 'test@example.com'
      const { error } = await resend.emails.send({
        from: `${emailConfig.RESEND_FROM_NAME} <${emailConfig.RESEND_FROM_EMAIL}>`,
        to: [testEmail],
        subject: 'Health Check Test',
        html: '<p>This is a health check test</p>'
      })

      if (error) {
        return {
          status: 'unhealthy',
          details: `API configuration issue: ${error.message}`
        }
      }

      return {
        status: 'healthy',
        details: 'Email service is configured correctly'
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        details: `Health check failed: ${(error as Error).message}`
      }
    }
  },
  // ==========================================
  // SEND EMAIL VERIFICATION
  // ==========================================
  async sendEmailVerification({ email, name, verificationToken }: SendEmailVerificationProps): Promise<EmailResult> {
    const verificationUrl = `${emailConfig.NEXTAUTH_URL}/auth/verify-email?token=${verificationToken}`
    
    return retryWithBackoff(async () => {
      try {
        const emailHtml = await render(EmailVerificationTemplate({ 
          name, 
          verificationUrl 
        }))

        const { data, error } = await resend.emails.send({
          from: `${emailConfig.RESEND_FROM_NAME} <${emailConfig.RESEND_FROM_EMAIL}>`,
          to: [email],
          subject: 'Verify your Edu Matrix Interlinked account',
          html: emailHtml
        })

        if (error) {
          console.error('📧 Resend API Error:', {
            error,
            statusCode: (error as any).statusCode,
            message: error.message,
            name: (error as any).name,
            email: email.replace(/(.{2}).*(@.*)/, '$1***$2') // Partially hide email for privacy
          })
          
          // Provide more specific error messages
          let errorMessage = 'Failed to send verification email'
          if ((error as any).statusCode === 400) {
            errorMessage = 'Email service configuration error. Please contact support.'
          } else if ((error as any).statusCode === 429) {
            errorMessage = 'Email rate limit exceeded. Please try again in a few minutes.'
          } else if ((error as any).statusCode >= 500) {
            errorMessage = 'Email service temporarily unavailable. Please try again later.'
          }
          
          throw new Error(errorMessage)
        }

        console.log('✅ Verification email sent successfully:', {
          messageId: data?.id,
          recipient: email.replace(/(.{2}).*(@.*)/, '$1***$2')
        })
        
        return { success: true, messageId: data?.id }
      } catch (error) {
        console.error('📧 Email verification error:', error)
        throw error
      }
    })
  },
  // ==========================================
  // SEND PASSWORD RESET EMAIL
  // ==========================================
  async sendPasswordReset({ email, name, resetToken }: SendPasswordResetProps): Promise<EmailResult> {
    const resetUrl = `${emailConfig.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`
    
    return retryWithBackoff(async () => {
      try {
        const emailHtml = await render(PasswordResetTemplate({ 
          name, 
          resetUrl 
        }))

        const { data, error } = await resend.emails.send({
          from: `${emailConfig.RESEND_FROM_NAME} <${emailConfig.RESEND_FROM_EMAIL}>`,
          to: [email],
          subject: 'Reset your Edu Matrix Interlinked password',
          html: emailHtml
        })

        if (error) {
          console.error('📧 Password reset email error:', error)
          throw new Error('Failed to send password reset email')
        }

        console.log('✅ Password reset email sent successfully:', data?.id)
        return { success: true, messageId: data?.id }
      } catch (error) {
        console.error('Password reset email error:', error)
        throw error
      }
    })
  },
  // ==========================================
  // SEND WELCOME EMAIL
  // ==========================================
  async sendWelcomeEmail({ email, name }: SendWelcomeEmailProps): Promise<EmailResult> {
    return retryWithBackoff(async () => {
      try {
        const emailHtml = await render(WelcomeTemplate({ name }))

        const { data, error } = await resend.emails.send({
          from: `${emailConfig.RESEND_FROM_NAME} <${emailConfig.RESEND_FROM_EMAIL}>`,
          to: [email],
          subject: 'Welcome to Edu Matrix Interlinked!',
          html: emailHtml
        })

        if (error) {
          console.error('📧 Welcome email error:', error)
          throw new Error('Failed to send welcome email')
        }

        console.log('✅ Welcome email sent successfully:', data?.id)
        return { success: true, messageId: data?.id }
      } catch (error) {
        console.error('Welcome email error:', error)
        throw error
      }
    })
  },
  // ==========================================
  // SEND OTP EMAIL
  // ==========================================
  async sendOTPEmail(email: string, otp: string, purpose: string, name?: string): Promise<EmailResult> {
    const getPurposeText = (purpose: string) => {
      switch (purpose) {
        case 'login':
          return 'complete your login'
        case 'registration':
          return 'verify your email address'
        case 'password-reset':
          return 'reset your password'
        case '2fa-setup':
          return 'set up two-factor authentication'
        default:
          return 'verify your identity'
      }
    }

    const subject = `Your Edu Matrix Interlinked verification code - ${otp}`
    const purposeText = getPurposeText(purpose)

    return retryWithBackoff(async () => {
      try {
        const emailHtml = await render(OTPTemplate({ 
          name: name || 'User',
          otp,
          purpose: purposeText
        }))

        const { data, error } = await resend.emails.send({
          from: `${emailConfig.RESEND_FROM_NAME} <${emailConfig.RESEND_FROM_EMAIL}>`,
          to: [email],
          subject,
          html: emailHtml
        })

        if (error) {
          console.error('📧 OTP email error:', error)
          throw new Error('Failed to send OTP email')
        }

        console.log('✅ OTP email sent successfully:', data?.id)
        return { success: true, messageId: data?.id }
      } catch (error) {
        console.error('OTP email error:', error)
        throw error
      }
    })
  }
}
