import { NextRequest, NextResponse } from "next/server"
import { otpService } from "@/lib/otp"
import { emailService } from "@/lib/email"
import { prisma } from "@/lib/prisma"

// Generate and send OTP
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { message: "Please verify your email first" },
        { status: 400 }
      )
    }    // Check rate limiting
    await otpService.checkOTPRateLimit(user.id);

    // Generate OTP
    const { otp, expires } = await otpService.generateOTPForUser({
      userId: user.id,
      email: user.email
    })

    // Send OTP via email
    try {
      await emailService.sendOTPEmail(user.email, otp, 'verification', user.name)
      console.log(`OTP sent successfully to ${email}: ${otp}`)
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError)
      // Continue anyway for development - in production you might want to return error
    }

    return NextResponse.json(
      { 
        message: "OTP sent successfully",
        expires: expires.toISOString()
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error("OTP generation error:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

// Verify OTP
export async function PUT(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }    // Verify OTP
    const result = await otpService.verifyOTPLegacy({
      userId: user.id,
      token: otp
    })

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    )

  } catch (error: any) {
    console.error("OTP verification error:", error)
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 400 }
    )
  }
}
