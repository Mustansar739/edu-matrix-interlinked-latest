import { NextRequest, NextResponse } from 'next/server';
import { setupUserModuleConnections } from '@/lib/user-module-verification';

export async function POST(req: NextRequest) {
  try {
    const { userId, institutionId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await setupUserModuleConnections(userId, institutionId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'User module connections setup successfully' 
    });
  } catch (error) {
    console.error('Error setting up user modules:', error);
    
    return NextResponse.json(
      { error: 'Failed to setup user module connections' },
      { status: 500 }
    );
  }
}
