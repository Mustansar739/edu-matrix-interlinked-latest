import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // TODO: Replace with actual database query
    const presence = {
      userId,
      status: 'online',
      lastSeen: new Date().toISOString(),
      isTyping: false,
      currentPage: '/'
    };

    return NextResponse.json(presence);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch presence' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, status, currentPage, isTyping } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // TODO: Replace with actual database update
    const updatedPresence = {
      userId,
      status: status || 'online',
      lastSeen: new Date().toISOString(),
      isTyping: isTyping || false,
      currentPage: currentPage || '/',
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(updatedPresence);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update presence' }, { status: 500 });
  }
}
