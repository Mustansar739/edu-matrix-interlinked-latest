import { NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

export async function GET() {
  try {
    const redis = getRedisClient();
    
    // Test basic Redis operations
    await redis.set('test-key', 'Hello from Redis!', 'EX', 60); // Expires in 60 seconds
    const value = await redis.get('test-key');
    
    // Test Redis info
    const info = await redis.info('server');
    const memoryInfo = await redis.info('memory');
    
    return NextResponse.json({
      success: true,
      message: 'Redis connection working!',
      testValue: value,
      redisInfo: {
        server: info.split('\n').slice(0, 5).join('\n'),
        memory: memoryInfo.split('\n').slice(0, 3).join('\n')
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Redis test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
