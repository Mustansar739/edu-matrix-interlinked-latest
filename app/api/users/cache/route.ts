/**
 * User API with Redis caching
 * Demonstrates practical Redis usage in the application
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCache, setCache } from '@/lib/cache'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId')

  // Handle all users request
  if (!userId) {
    // Try to get all users from cache first
    const cachedUsers = await getCache('all_users')
    if (cachedUsers) {
      console.log('✅ Returning users from Redis cache')
      return NextResponse.json(cachedUsers)
    }    // If not in cache, fetch from database
    console.log('🔍 Users not in cache, fetching from database')
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    // Store in cache for 5 minutes
    await setCache('all_users', users, 300)
    console.log('💾 Users stored in Redis cache for 5 minutes')

    return NextResponse.json(users)
  }

  // Handle single user request
  // Try to get user from cache first
  const cachedUser = await getCache(`user:${userId}`)
  if (cachedUser) {
    console.log(`✅ Returning user ${userId} from Redis cache`)
    return NextResponse.json(cachedUser)
  }
  // If not in cache, fetch from database
  console.log(`🔍 User ${userId} not in cache, fetching from database`)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Store in cache for 10 minutes
  await setCache(`user:${userId}`, user, 600)
  console.log(`💾 User ${userId} stored in Redis cache for 10 minutes`)

  return NextResponse.json(user)
}
