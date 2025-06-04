import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/password-utils"
import { generateUsernameWithPreference } from "@/lib/username-generator"
import { generateVerificationToken, generateTokenExpiration } from "@/lib/verification-utils"
import { emailService } from "@/lib/email"
import { z } from "zod"

// Validation schema
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          message: "Validation failed", 
          errors: validation.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }

    const { email, username, password, firstName, lastName } = validation.data    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    })

    if (existingUser) {
      // Handle unverified accounts
      if (!existingUser.isVerified) {
        const now = new Date()
        const verificationExpired = existingUser.emailVerificationExpires && existingUser.emailVerificationExpires < now
        const accountOld = (now.getTime() - existingUser.createdAt.getTime()) > (7 * 24 * 60 * 60 * 1000) // 7 days

        // If the unverified account is expired or old, delete it and continue with registration
        if (verificationExpired || accountOld) {
          console.log(`Cleaning up expired unverified account: ${existingUser.email}`)
          await prisma.user.delete({
            where: { id: existingUser.id }
          })
          // Continue with registration (don't return, let it proceed)
        } else {
          // Unverified account exists and hasn't expired yet
          const timeRemaining = existingUser.emailVerificationExpires 
            ? Math.max(0, Math.floor((existingUser.emailVerificationExpires.getTime() - Date.now()) / (1000 * 60)))
            : 0

          return NextResponse.json({
            status: "unverified_account_found",
            message: "An unverified account exists with this email or username",
            email: existingUser.email,
            username: existingUser.username,
            name: existingUser.name,
            timeRemainingMinutes: timeRemaining,
            options: {
              resendVerification: {
                action: "resend_verification",
                endpoint: "/api/auth/resend-verification",
                description: "Resend verification email to complete registration"
              },
              replaceAccount: {
                action: "replace_account", 
                endpoint: "/api/auth/replace-unverified",
                description: "Delete the unverified account and create a new one"
              },
              continueWithExisting: {
                action: "continue_with_existing",
                description: "Sign in with the existing account if you remember the password"
              }
            }
          }, { status: 200 })
        }
      } else {
        // User exists and is verified
        if (existingUser.email.toLowerCase() === email.toLowerCase()) {
          return NextResponse.json(
            { message: "An account with this email already exists" },
            { status: 409 }
          )
        }
        
        if (existingUser.username.toLowerCase() === username.toLowerCase()) {
          return NextResponse.json(
            { message: "Username is already taken" },
            { status: 409 }
          )
        }
      }    }// Generate final username (prefer user's choice if available)
    const finalUsername = await generateUsernameWithPreference(
      firstName || '', 
      lastName || '', 
      email,
      username
    )

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate verification token
    const verificationToken = generateVerificationToken()
    const verificationExpires = generateTokenExpiration(24 * 60) // 24 hours    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: finalUsername,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        isVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })    // Send verification email
    try {
      const emailResult = await emailService.sendEmailVerification({
        email: newUser.email,
        name: newUser.name,
        verificationToken
      })

      if (!emailResult.success) {
        console.error("Failed to send verification email:", emailResult.error)
        
        // Don't delete the user immediately - give them a chance to resend
        // Instead, return a different response indicating partial success
        return NextResponse.json(
          { 
            message: "Account created but verification email failed to send. Please check your email or request a new verification email.",
            userId: newUser.id,
            emailSent: false
          },
          { status: 201 } // 201 because user was created successfully
        )
      }

      console.log("✅ Verification email sent successfully:", emailResult.messageId)
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      
      // Don't delete the user immediately - this is too aggressive
      // Instead, log the error and inform the user
      const errorMessage = emailError instanceof Error ? emailError.message : "Unknown email error"
      
      return NextResponse.json(
        { 
          message: `Account created but verification email failed: ${errorMessage}. Please request a new verification email.`,
          userId: newUser.id,
          emailSent: false
        },
        { status: 201 }
      )
    }    return NextResponse.json({
      message: "Registration successful! Please check your email to verify your account.",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        isVerified: newUser.isVerified
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
