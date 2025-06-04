import { NextRequest, NextResponse } from 'next/server';

// Internal API health check for Socket.IO server
export async function GET(request: NextRequest) {
  try {
    // Check if request is from Socket.IO server
    const socketServerHeader = request.headers.get('X-Socket-Server');
    const internalApiKey = request.headers.get('X-Internal-API-Key');
    
    // Simple health check response
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'edu-matrix-api',
      version: '1.0.0',
      uptime: process.uptime(),
      isInternal: !!socketServerHeader
    };

    return NextResponse.json(health);
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      error: 'Health check failed',
      timestamp: new Date().toISOString() 
    }, { status: 500 });
  }
}
