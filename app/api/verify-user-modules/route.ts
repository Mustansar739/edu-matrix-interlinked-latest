import { NextRequest, NextResponse } from 'next/server';
import { verifyUserModuleConnections } from '@/lib/user-module-verification';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const verificationResult = await verifyUserModuleConnections(userId);
    
    return NextResponse.json(verificationResult);
  } catch (error) {
    console.error('Error verifying user modules:', error);
    
    return NextResponse.json(
      { error: 'Failed to verify user module connections' },
      { status: 500 }
    );
  }
}
