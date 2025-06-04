import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateVerificationToken, generateTokenExpiration } from "@/lib/verification-utils"
import { emailService } from "@/lib/email"
import { z } from "zod"

// Validation schema
const resendVerificationSchema = z.object({
  email: z.string().email("Invalid email address")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = resendVerificationSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          message: "Invalid email address", 
          errors: validation.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }

    const { email } = validation.data
    const normalizedEmail = email.toLowerCase()

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        name: true,
        isVerified: true,
        emailVerificationExpires: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email address" },
        { status: 404 }
      )
    }

    // Check if user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { message: "This account is already verified. You can sign in now." },
        { status: 400 }
      )
    }    // Check rate limiting - don't allow resending too frequently
    const minimumWaitTime = 60 * 1000 // 1 minute (reduced from 2 minutes)
    const currentTime = Date.now()

    // Simplified rate limiting approach:
    // For the first request after account creation, use creation time
    // For subsequent requests, we'll track it differently since we update the token
    
    // Check if account was created too recently (prevents spam during initial registration)
    const timeSinceCreation = currentTime - user.createdAt.getTime()
    const accountTooNew = timeSinceCreation < (30 * 1000) // 30 seconds after creation
    
    if (accountTooNew) {
      const waitTime = Math.ceil((30 * 1000 - timeSinceCreation) / 1000)
      console.log(`Account too new: user must wait ${waitTime} more seconds`)
      
      return NextResponse.json(
        { 
          message: `Please wait ${waitTime} seconds before requesting verification email`,
          retryAfter: waitTime
        },
        { status: 429 }
      )
    }

    // For existing tokens, check if verification expires soon (which means token was generated recently)
    if (user.emailVerificationExpires) {
      const tokenExpiresAt = user.emailVerificationExpires.getTime()
      const tokenLifetime = 24 * 60 * 60 * 1000 // 24 hours
      const estimatedTokenCreation = tokenExpiresAt - tokenLifetime
      const timeSinceTokenCreation = currentTime - estimatedTokenCreation
      
      // Only apply rate limiting if the token was created recently
      if (timeSinceTokenCreation < minimumWaitTime && timeSinceTokenCreation > 0) {
        const waitTime = Math.ceil((minimumWaitTime - timeSinceTokenCreation) / 1000)
        console.log(`Rate limit triggered: user must wait ${waitTime} more seconds (token too recent)`)
        
        return NextResponse.json(
          { 
            message: `Please wait ${waitTime} seconds before requesting another verification email`,
            retryAfter: waitTime
          },
          { status: 429 }
        )
      }
    }

    console.log(`Rate limiting passed for user: ${user.email}`)// Generate new verification token
    const verificationToken = generateVerificationToken()
    const verificationExpires = generateTokenExpiration(24 * 60) // 24 hours

    console.log(`Generating new verification token for user: ${user.email}`)

    // Update user with new token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
        updatedAt: new Date()
      }
    })

    console.log(`Database updated with new verification token for user: ${user.email}`)    // Send verification email
    try {
      console.log(`Attempting to send verification email to: ${user.email}`)
      
      const emailResult = await emailService.sendEmailVerification({
        email: user.email,
        name: user.name,
        verificationToken
      })

      if (emailResult.success) {
        console.log(`✅ Verification email sent successfully to: ${user.email}`)
        
        return NextResponse.json({
          message: "Verification email sent successfully! Please check your inbox and spam folder.",
          email: user.email,
          expiresIn: "24 hours",
          emailSent: true
        }, { status: 200 })
      } else {
        console.error(`❌ Email sending failed for ${user.email}:`, emailResult.error)
        
        // Clear the token if email failed to send
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerificationToken: null,
            emailVerificationExpires: null
          }
        })
        
        return NextResponse.json(
          { 
            message: `Failed to send verification email: ${emailResult.error || 'Unknown error'}`,
            error: "email_send_failed",
            emailSent: false
          },
          { status: 500 }
        )
      }

    } catch (emailError) {
      console.error("❌ Failed to send verification email:", emailError)
      
      // Clear the token if email failed to send
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerificationToken: null,
          emailVerificationExpires: null
        }
      })
      
      const errorMessage = emailError instanceof Error ? emailError.message : "Unknown email error"
      console.error(`❌ Email error details for ${user.email}:`, errorMessage)
      
      return NextResponse.json(
        { 
          message: `Failed to send verification email: ${errorMessage}`,
          error: "email_send_failed",
          emailSent: false
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("❌ Resend verification error:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Unknown server error"
    console.error(`❌ Detailed error for resend verification:`, errorMessage)
    
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: "server_error"
      },
      { status: 500 }
    )
  }
}

// GET method for convenience (email in query params)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { message: "Email parameter is required" },
      { status: 400 }
    )
  }

  // Reuse POST logic
  return POST(new NextRequest(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify({ email })
  }))
}
