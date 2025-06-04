import { NextRequest, NextResponse } from 'next/server';
import { setCache, getCache, deleteCache } from '@/lib/cache';
import { publishEvent } from '@/lib/kafka';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Check Redis cache first
    const cacheKey = `notifications:${userId}:${limit}`;
    const cachedNotifications = await getCache(cacheKey);
    
    if (cachedNotifications) {
      return NextResponse.json(cachedNotifications);
    }

    // If not in cache, fetch from database
    const notifications = await prisma.notification.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const response = {
      notifications,
      total: notifications.length,
      unreadCount: notifications.filter(n => !n.isRead).length
    };

    // Store in Redis cache for 5 minutes
    await setCache(cacheKey, response, 300);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {  try {
    const body = await request.json();
    const { userId, type, title, message } = body;

    if (!userId || !type || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }    // Create notification in database
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        category: 'TECHNICAL', // Default category
        isRead: false
      }
    });

    // Clear user's notifications cache
    const cachePattern = `notifications:${userId}:*`;
    await deleteCache(cachePattern);    // Publish notification event to Kafka
    await publishEvent('notification-queue', {
      eventType: 'notification_created',
      notificationId: notification.id,
      userId,
      type,
      title,
      message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, isRead } = body;

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID required' }, { status: 400 });
    }

    // Update notification in database
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: isRead !== undefined ? isRead : true,
        readAt: new Date()
      }
    });

    // Clear related cache entries
    await deleteCache(`notifications:${updatedNotification.userId}:*`);    // Publish notification read event to Kafka
    await publishEvent('notification-queue', {
      eventType: 'notification_read',
      notificationId,
      userId: updatedNotification.userId,
      isRead: updatedNotification.isRead,
      readAt: updatedNotification.readAt,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(updatedNotification);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}
