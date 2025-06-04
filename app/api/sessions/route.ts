/**
 * Session management with Redis
 * For custom session storage implementation
 */

import { NextRequest, NextResponse } from 'next/server'
import { serverRedis } from '@/lib/redis'
import { v4 as uuidv4 } from 'uuid'

// Session TTL: 24 hours
const SESSION_TTL = 86400

// Create a new session
export async function POST(request: NextRequest) {
  try {
    const { userId, userData } = await request.json()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // Generate a unique session ID
    const sessionId = uuidv4()
      // Store session in Redis with TTL
    const sessionData = {
      userId,
      userData,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }
    
    await serverRedis.storeSession(sessionId, sessionData, SESSION_TTL)
    
    // Also store a reference by userId for lookup
    await serverRedis.setCache(`user_session:${userId}`, sessionId, SESSION_TTL)
    
    return NextResponse.json({ sessionId })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

// Get session data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }
      // Get session from Redis
    const sessionData = await serverRedis.getSession(sessionId)
    
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Session not found or expired' },
        { status: 404 }
      )
    }
    
    // Update last active timestamp
    sessionData.lastActive = new Date().toISOString()
    
    // Reset TTL with updated data
    await serverRedis.storeSession(sessionId, sessionData, SESSION_TTL)
    
    return NextResponse.json(sessionData)
  } catch (error) {
    console.error('Session retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}

// Delete session (logout)
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }
      // Get userId before deleting session
    const sessionData = await serverRedis.getSession(sessionId)
    if (sessionData) {
      const { userId } = sessionData
      // Delete user session reference
      await serverRedis.deleteCache(`user_session:${userId}`)
    }
    
    // Delete session
    await serverRedis.deleteSession(sessionId)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Session deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    )
  }
}
