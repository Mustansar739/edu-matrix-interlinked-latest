import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkRateLimit } from "@/lib/cache"

/**
 * Cancel pending registration
 * This allows users to remove their unverified account and start over
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting for cancel attempts
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous'
    
    const rateLimit = await checkRateLimit(`cancel-registration:${clientIP}`, 5, 3600) // 5 attempts per hour
    if (!rateLimit.allowed) {
      const waitTimeMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / (1000 * 60))
      return NextResponse.json(
        { message: `Too many cancel attempts. Please try again in ${waitTimeMinutes} minutes.` },
        { status: 429 }
      )
    }

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email address is required" },
        { status: 400 }
      )
    }

    // Find unverified user with this email
    const user = await prisma.user.findFirst({
      where: {
        email,
        isVerified: false
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: "No unverified account found with this email address" },
        { status: 404 }
      )
    }

    // Delete the unverified user account
    await prisma.user.delete({
      where: { id: user.id }
    })

    return NextResponse.json({
      message: "Pending registration cancelled successfully. You can now register again with the same email and username.",
      cancelledUser: {
        email: user.email,
        username: user.username
      }
    })

  } catch (error) {
    console.error("Cancel registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
