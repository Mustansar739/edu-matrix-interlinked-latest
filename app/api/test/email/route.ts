// ==========================================
// EMAIL SERVICE TEST UTILITY
// ==========================================

import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { message: 'Email testing is only available in development mode' },
      { status: 403 }
    )
  }

  try {
    const { email, type = 'verification' } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    let result
    const testName = 'Test User'
    const testToken = 'test-token-12345'

    switch (type) {
      case 'verification':
        result = await emailService.sendEmailVerification({
          email,
          name: testName,
          verificationToken: testToken
        })
        break
      case 'welcome':
        result = await emailService.sendWelcomeEmail({
          email,
          name: testName
        })
        break
      case 'password-reset':
        result = await emailService.sendPasswordReset({
          email,
          name: testName,
          resetToken: testToken
        })
        break
      case 'otp':
        result = await emailService.sendOTPEmail(
          email,
          '123456',
          'login',
          testName
        )
        break
      default:
        return NextResponse.json(
          { message: 'Invalid email type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: `Test ${type} email sent successfully`,
      result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Email test failed:', error)
    
    return NextResponse.json(
      {
        message: 'Email test failed',
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { message: 'Email testing is only available in development mode' },
      { status: 403 }
    )
  }

  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const type = searchParams.get('type') || 'verification'

  if (!email) {
    return NextResponse.json(
      { message: 'Email parameter is required' },
      { status: 400 }
    )
  }

  return POST(new NextRequest(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify({ email, type })
  }))
}
