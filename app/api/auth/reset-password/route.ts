import { NextRequest, NextResponse } from "next/server"
import { hashPassword } from "@/lib/password-utils"
import { prisma } from "@/lib/prisma"
import { getCache, deleteCache, setCache, checkRateLimit } from "@/lib/cache"


export async function POST(request: NextRequest) {
  try {
    // Rate limiting for password reset attempts
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous'
    
    const rateLimit = await checkRateLimit(`reset-password:${clientIP}`, 5, 3600) // 5 attempts per hour
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: "Too many password reset attempts. Please try again later." },
        { status: 429 }
      )
    }

    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }    // Check Redis first for token validation
    const tokenData = await getCache<{email: string, userId: string, createdAt: number}>(`reset:${token}`);
    if (!tokenData || typeof tokenData !== 'object' || !tokenData.email) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        email: tokenData.email,
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date() // Token must not be expired
        }
      }
    })

    if (!user) {
      // Remove invalid token from Redis
      await deleteCache(`reset:${token}`)
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
        // Reset failed login attempts on successful password reset
        failedAttempts: 0,        lockedUntil: null,
      }
    })

    // Remove reset token from Redis (one-time use)
    await deleteCache(`reset:${token}`)

    // Invalidate any existing user sessions due to password change
    const userSessions = await getCache(`user-sessions:${user.id}`)
    if (userSessions && Array.isArray(userSessions)) {
      for (const sessionId of userSessions) {
        await deleteCache(`session:${sessionId}`)
      }
      await deleteCache(`user-sessions:${user.id}`)
    }    // Update user cache with reset login attempts
    const currentUserCache = await getCache(`user:${user.id}`);
    const updatedUserCache = {
      ...(currentUserCache && typeof currentUserCache === 'object' ? currentUserCache : {}),
      failedAttempts: 0,
      lockedUntil: null
    };
    await setCache(`user:${user.id}`, updatedUserCache, 3600);

    // Mark the reset token as used
    await prisma.passwordReset.updateMany({
      where: {
        userId: user.id,
        token: token
      },
      data: {
        usedAt: new Date()
      }
    })

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
