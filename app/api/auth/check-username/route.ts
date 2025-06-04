import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { validateUsername } from "@/lib/simple-username-generator"

// Simple in-memory cache for username checks (lasts 5 minutes)
const usernameCache = new Map<string, { available: boolean, timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username } = body
    
    // Validate username format first
    const validation = validateUsername(username)
    if (!validation.isValid) {
      return NextResponse.json({
        available: false,
        message: validation.error
      }, { status: 400 })
    }

    const normalizedUsername = username.toLowerCase()
    
    // Check cache first for faster response
    const cached = usernameCache.get(normalizedUsername)
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json({
        available: cached.available,
        message: cached.available ? "Username is available" : "Username is already taken"
      })
    }

    // Check database if not in cache
    const existingUser = await prisma.user.findUnique({
      where: { username: normalizedUsername },
      select: { id: true, username: true }
    })

    const isAvailable = !existingUser
    
    // Cache the result
    usernameCache.set(normalizedUsername, {
      available: isAvailable,
      timestamp: Date.now()
    })

    // Clean old cache entries periodically
    if (Math.random() < 0.1) { // 10% chance to clean cache
      const now = Date.now()
      for (const [key, value] of usernameCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
          usernameCache.delete(key)
        }
      }
    }

    return NextResponse.json({
      available: isAvailable,
      message: isAvailable ? "Username is available" : "Username is already taken"
    })

  } catch (error) {
    console.error("Username check error:", error)
    return NextResponse.json({
      available: false,
      message: "Error checking username availability"
    }, { status: 500 })
  }
}
