/**
 * Event tracking API using Kafka
 * Track user actions and system events
 */

import { NextRequest, NextResponse } from 'next/server'
import { publishEvent } from '@/lib/kafka'

export async function POST(request: NextRequest) {
  try {
    const { eventType, eventData } = await request.json()
    
    if (!eventType) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      )
    }
    
    // Add timestamp if not provided
    const enrichedData = {
      ...eventData,
      timestamp: eventData.timestamp || new Date().toISOString(),
      source: 'api'
    }
    
    // Publish to Kafka
    await publishEvent(eventType, enrichedData)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Event publishing error:', error)
    return NextResponse.json(
      { error: 'Failed to publish event' },
      { status: 500 }
    )
  }
}
