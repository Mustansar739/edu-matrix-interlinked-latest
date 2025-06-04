import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkRateLimit } from "@/lib/cache"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for account replacement
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous'
    
    const rateLimit = await checkRateLimit(`replace-account:${clientIP}`, 2, 600) // 2 attempts per 10 minutes
    if (!rateLimit.allowed) {
      const waitTimeMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / (1000 * 60))
      return NextResponse.json(
        { 
          message: `Please wait ${waitTimeMinutes} minute(s) before trying again.`,
          waitTimeMinutes
        },
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

    // Find and delete unverified user with this email
    const deletedUser = await prisma.user.deleteMany({
      where: {
        email,
        isVerified: false
      }
    })

    if (deletedUser.count === 0) {
      return NextResponse.json(
        { 
          message: "No unverified account found with this email address.",
          status: "not_found"
        },
        { status: 404 }
      )
    }

    console.log(`Deleted ${deletedUser.count} unverified account(s) for email: ${email}`)

    return NextResponse.json({
      message: "Unverified account deleted successfully. You can now register with this email again.",
      status: "account_deleted",
      deletedCount: deletedUser.count
    })

  } catch (error) {
    console.error("Replace account error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
