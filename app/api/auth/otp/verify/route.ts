import { NextRequest, NextResponse } from 'next/server';
import { otpService } from '@/lib/otp';
import { prisma } from '@/lib/prisma';
import { generatePasswordResetToken } from '@/lib/auth-utils';
import { getCache, setCache, deleteCache, checkRateLimit } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, purpose } = await request.json();

    if (!email || !otp || !purpose) {
      return NextResponse.json(
        { error: 'Email, OTP, and purpose are required' },
        { status: 400 }
      );
    }

    // Rate limit OTP verification attempts with Redis
    const rateLimit = await checkRateLimit(`otp-verify:${email}`, 5, 900); // 5 attempts per 15 minutes
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please try again later.' },
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
    }    // Check OTP from Redis first
    const otpData = await getCache<{code: string, attempts: number, expires: number}>(`otp:${email}:${purpose}`);
    
    if (!otpData || typeof otpData !== 'object' || !otpData.code) {
      return NextResponse.json(
        { error: 'OTP not found or expired' },
        { status: 400 }
      );
    }

    // Check if too many attempts
    if (otpData.attempts >= 3) {
      await deleteCache(`otp:${email}:${purpose}`);
      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (otpData.code !== otp) {
      // Increment attempts
      const updatedOtpData = { ...otpData, attempts: otpData.attempts + 1 };
      await setCache(`otp:${email}:${purpose}`, updatedOtpData, 300);
      
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // OTP is valid - remove from Redis
    await deleteCache(`otp:${email}:${purpose}`);

    // Also verify with traditional service for compatibility
    const isValid = await otpService.verifyOTP(user.id, otp, purpose);
    
    if (!isValid) {
      // Log failed attempt
      await prisma.authAttempt.create({
        data: {
          userId: user.id,
          email: user.email,
          status: 'FAILED',
          userAgent: request.headers.get('user-agent') || ''
        }
      });

      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    // Log successful attempt
    await prisma.authAttempt.create({
      data: {
        userId: user.id,
        email: user.email,
        status: 'SUCCESS',
        userAgent: request.headers.get('user-agent') || ''
      }
    });

    // Handle different purposes
    let responseData: any = { message: 'Verification successful' };

    switch (purpose) {
      case 'registration':
        // Mark email as verified (using correct field name)
        await prisma.user.update({
          where: { id: user.id },
          data: { isVerified: true }
        });        break;

      case 'password-reset':
        // Generate password reset token (using correct model)
        const resetToken = generatePasswordResetToken();
        await prisma.passwordReset.create({
          data: {
            userId: user.id,
            token: resetToken,
            expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
          }
        });
        responseData.resetToken = resetToken;
        break;

      case 'login':
        // This would typically be handled by the login flow
        break;

      case '2fa-setup':
        // This is handled by the 2FA setup process
        break;
    }

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }    );
  }
}
