// ==========================================
// EMAIL SERVICE HEALTH CHECK API
// ==========================================

import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const healthResult = await emailService.healthCheck()
    
    const response = {
      service: 'email',
      timestamp: new Date().toISOString(),
      ...healthResult
    }

    return NextResponse.json(
      response,
      { status: healthResult.status === 'healthy' ? 200 : 503 }
    )
  } catch (error) {
    console.error('Email health check failed:', error)
    
    return NextResponse.json(
      {
        service: 'email',
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        details: `Health check error: ${(error as Error).message}`
      },
      { status: 503 }
    )
  }
}
