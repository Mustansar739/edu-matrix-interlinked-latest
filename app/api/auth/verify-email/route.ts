import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Validation schema
const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = verifyEmailSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          message: "Invalid verification token", 
          errors: validation.error.flatten().fieldErrors,
          success: false
        },
        { status: 400 }
      )
    }

    const { token } = validation.data

    // Find user by verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        isVerified: false
      },      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        isVerified: true,
        emailVerificationToken: true,
        emailVerificationExpires: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { 
          message: "Invalid or expired verification token. Please request a new verification email.",
          success: false,
          errorCode: "INVALID_TOKEN"
        },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
      // Clean up expired token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerificationToken: null,
          emailVerificationExpires: null
        }
      })

      return NextResponse.json(
        { 
          message: "Verification token has expired. Please request a new verification email.",
          success: false,
          errorCode: "TOKEN_EXPIRED",
          email: user.email
        },
        { status: 400 }
      )
    }    // Verify the user
    const verifiedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
        updatedAt: new Date()
      },      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        isVerified: true
      }
    })

    return NextResponse.json({
      message: "Email verified successfully! You can now sign in to your account.",
      success: true,      user: {
        id: verifiedUser.id,
        email: verifiedUser.email,
        name: verifiedUser.name,
        username: verifiedUser.username,
        isVerified: verifiedUser.isVerified
      }
    }, { status: 200 })

  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { 
        message: "Internal server error during verification",
        success: false,
        errorCode: "SERVER_ERROR"
      },
      { status: 500 }
    )
  }
}

// GET method for URL-based verification (e.g., from email links)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      { 
        message: "Verification token is required",
        success: false,
        errorCode: "MISSING_TOKEN"
      },
      { status: 400 }
    )
  }

  // Reuse POST logic
  const postRequest = new NextRequest(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify({ token })
  })

  return POST(postRequest)
}

// For direct verification from email links, redirect to appropriate page
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const redirect = searchParams.get('redirect') || '/auth/signin'

    if (!token) {
      // Redirect to error page
      return NextResponse.redirect(new URL('/auth/error?error=missing_token', request.url))
    }

    // Verify the token using POST logic
    const verificationResult = await POST(new NextRequest(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify({ token })
    }))

    const result = await verificationResult.json()

    if (result.success) {
      // Redirect to signin with success message
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('message', 'Email verified successfully! You can now sign in.')
      signInUrl.searchParams.set('type', 'success')
      return NextResponse.redirect(signInUrl)
    } else {
      // Redirect to error page with specific error
      const errorUrl = new URL('/auth/error', request.url)
      errorUrl.searchParams.set('error', result.errorCode || 'verification_failed')
      errorUrl.searchParams.set('message', result.message)
      if (result.email) {
        errorUrl.searchParams.set('email', result.email)
      }
      return NextResponse.redirect(errorUrl)
    }

  } catch (error) {
    console.error("Email verification redirect error:", error)
    return NextResponse.redirect(new URL('/auth/error?error=server_error', request.url))
  }
}
