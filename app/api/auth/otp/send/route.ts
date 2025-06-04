import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otp';
import { emailService } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, setCache } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    const { email, purpose } = await request.json();

    if (!email || !purpose) {
      return NextResponse.json(
        { error: 'Email and purpose are required' },
        { status: 400 }
      );
    }

    // Rate limit OTP requests with Redis
    const rateLimit = await checkRateLimit(`otp-send:${email}`, 3, 300); // 3 requests per 5 minutes
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many OTP requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }    // Generate and store OTP in Redis
    const otp = otpService.generateOTP();
    await setCache(`otp:${email}:${purpose}`, {
      code: otp,
      attempts: 0,
      createdAt: Date.now(),
      userId: user.id
    }, 300); // 5 minutes expiration

    // Also store with traditional service for compatibility
    await otpService.storeOTP(user.id, otp, purpose);

    // Send OTP via email
    try {
      await emailService.sendOTPEmail(user.email, otp, purpose, user.name);
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send verification code' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Verification code sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
