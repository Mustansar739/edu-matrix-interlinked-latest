import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis-service';

export async function GET() {
  try {
    // Test basic Redis operations
    const testKey = 'test:connection';
    const testValue = `Connected at ${new Date().toISOString()}`;
    
    // Set a test value with 60 second expiration
    await redis.set(testKey, testValue, 60);
    
    // Get the value back
    const retrievedValue = await redis.get(testKey);
    
    // Check if Redis is responding to ping
    const pingResult = await redis.ping();
    
    return NextResponse.json({
      success: true,
      message: 'Redis connection successful',
      data: {
        ping: pingResult,
        testValue: retrievedValue,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Redis connection error:', error);
    return NextResponse.json({
      success: false,
      message: 'Redis connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, ttl } = body;
    
    if (!key || !value) {
      return NextResponse.json({
        success: false,
        message: 'Key and value are required'
      }, { status: 400 });
    }
    
    // Set the value in Redis
    await redis.set(key, value, ttl);
    
    return NextResponse.json({
      success: true,
      message: 'Value stored in Redis successfully',
      data: { key, value, ttl }
    });
  } catch (error) {
    console.error('Redis set error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to store value in Redis',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
