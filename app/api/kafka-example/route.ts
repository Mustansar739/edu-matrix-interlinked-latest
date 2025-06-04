/**
 * Example API route showing Kafka usage in main app
 * Background processing and business events
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  publishBusinessEvent, 
  queueEmail, 
  queueNotification, 
  logAudit, 
  trackEvent 
} from '@/lib/kafka'

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()

    switch (action) {
      case 'user_registration':
        // Publish business event
        await publishBusinessEvent('user_registered', {
          userId: data.userId,
          email: data.email,
          userType: data.userType,
          registrationSource: 'web'
        })

        // Queue welcome email
        await queueEmail({
          to: data.email,
          subject: 'Welcome to Edu Matrix!',
          template: 'welcome',
          data: { name: data.name }
        })

        // Send notification
        await queueNotification({
          userId: data.userId,
          type: 'welcome',
          title: 'Welcome!',
          message: 'Your account has been created successfully'
        })

        // Log audit
        await logAudit({
          userId: data.userId,
          action: 'user_registered',
          resource: 'user',
          details: { email: data.email, userType: data.userType }
        })

        // Track analytics
        await trackEvent({
          userId: data.userId,
          event: 'user_registered',
          properties: {
            userType: data.userType,
            source: 'web'
          }
        })
        break

      case 'course_enrollment':
        await publishBusinessEvent('course_enrolled', {
          userId: data.userId,
          courseId: data.courseId,
          enrollmentType: data.enrollmentType,
          price: data.price
        })

        await queueEmail({
          to: data.userEmail,
          subject: 'Course Enrollment Confirmed',
          template: 'course_enrolled',
          data: { courseName: data.courseName }
        })

        await logAudit({
          userId: data.userId,
          action: 'course_enrolled',
          resource: 'course',
          details: { courseId: data.courseId, price: data.price }
        })
        break

      case 'payment_completed':
        await publishBusinessEvent('payment_completed', {
          userId: data.userId,
          paymentId: data.paymentId,
          amount: data.amount,
          currency: data.currency,
          items: data.items
        })

        await queueEmail({
          to: data.userEmail,
          subject: 'Payment Receipt',
          template: 'payment_receipt',
          data: { amount: data.amount, items: data.items }
        })
        break

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Events published successfully'
    })

  } catch (error) {
    console.error('Kafka example error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
