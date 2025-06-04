/**
 * Example API route showing Redis usage in main app
 */

import { NextRequest, NextResponse } from 'next/server'
import { setCache, getCache, cacheOrFetch, checkRateLimit } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    // Example 1: Simple caching
    const cachedData = await getCache('example-data')
    if (cachedData) {
      return NextResponse.json({ 
        source: 'cache',
        data: cachedData 
      })
    }

    // Example 2: Cache with automatic fetch
    const freshData = await cacheOrFetch(
      'example-data',
      async () => {
        // Simulate API call or database query
        return {
          message: 'Hello from Redis!',
          timestamp: new Date().toISOString(),
          random: Math.random()
        }
      },
      300 // 5 minutes TTL
    )

    return NextResponse.json({ 
      source: 'fresh',
      data: freshData 
    })

  } catch (error) {
    console.error('Redis example error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'anonymous'
    
    // Example: Rate limiting
    const rateLimit = await checkRateLimit(clientIp, 5, 60) // 5 requests per minute
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetTime: rateLimit.resetTime
        },
        { status: 429 }
      )
    }

    // Example: Store data
    const body = await request.json()
    await setCache(`user-data:${clientIp}`, body, 3600) // 1 hour

    return NextResponse.json({ 
      success: true,
      remaining: rateLimit.remaining
    })

  } catch (error) {
    console.error('Redis POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
