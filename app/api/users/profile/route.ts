import { NextRequest, NextResponse } from 'next/server';
import { setCache, getCache, deleteCache } from '@/lib/cache';
import { publishEvent } from '@/lib/kafka';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Check Redis cache first
    const cacheKey = `user:profile:${userId}`;
    const cachedProfile = await getCache(cacheKey);
    
    if (cachedProfile) {
      return NextResponse.json(cachedProfile);
    }    // Fetch from database if not in cache
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Cache for 10 minutes
    await setCache(cacheKey, userProfile, 600);    // Track profile view event using analytics topic
    await publishEvent('analytics-events', {
      eventType: 'user_profile_viewed',
      viewedUserId: userId,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Update user profile in database
    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    // Clear cache for this user
    await deleteCache(`user:profile:${userId}`);

    // Publish profile update event
    await publishEvent('user-events', {
      eventType: 'user_profile_updated',
      userId,
      updatedFields: Object.keys(updateData),
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
  }
}
