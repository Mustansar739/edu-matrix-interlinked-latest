import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { emailService } from "@/lib/email"
import { checkRateLimit, setCache } from "@/lib/cache"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for password reset attempts
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous'
    
    const rateLimit = await checkRateLimit(`forgot-password:${clientIP}`, 5, 3600) // 5 attempts per hour
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: "Too many password reset attempts. Please try again later." },
        { status: 429 }
      )
    }

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Always return success to prevent email enumeration attacks
    const successMessage = "If an account with that email exists, we've sent a password reset link."

    if (!user) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: successMessage },
        { status: 200 }
      )
    }

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { message: "Please verify your email address first before resetting your password." },
        { status: 400 }
      )
    }    // Generate password reset token
    const resetToken = crypto.randomUUID()
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Store reset token in Redis with 1-hour expiration
    await setCache(`reset:${resetToken}`, {
      email: user.email,
      userId: user.id,
      createdAt: Date.now()
    }, 3600) // 1 hour

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      }
    })

    // Create password reset record
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: resetToken,
        expires: resetExpires,
      }
    })

    // Send password reset email
    try {
      await emailService.sendPasswordReset({
        email: user.email,
        name: user.name,
        resetToken: resetToken
      })
      console.log(`Password reset email sent to ${email}`)
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      return NextResponse.json(
        { message: "Failed to send password reset email. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: successMessage },
      { status: 200 }
    )

  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
