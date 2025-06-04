# 📧 Email Service Setup Guide

## 🚨 Current Issue: Email Verification Failed

### Problem
```
Failed to send verification email: {
  statusCode: 400,
  message: 'API key is invalid',
  name: 'validation_error'
}
```

### Root Cause
The Resend API key is invalid, expired, or not properly configured.

## ✅ Solution Steps

### 1. Get a Valid Resend API Key

1. **Sign up for Resend**: https://resend.com/signup
2. **Create API Key**: https://resend.com/api-keys
3. **Copy your API key** (starts with `re_`)

### 2. Update Environment Variables

Edit your `.env.local` file:

```bash
# Replace with your actual API key from Resend
RESEND_API_KEY="re_your_actual_api_key_here"

# Use your verified domain or resend.dev for testing
RESEND_FROM_EMAIL="noreply@yourdomain.com"
RESEND_FROM_NAME="Edu Matrix Interlinked"

# Development mode options
DEV_MODE_EMAIL_SKIP=false
DEV_MODE_EMAIL_LOG_ONLY=true  # Set to true for development
```

### 3. Domain Verification (Production)

For production, you need to verify your domain:

1. **Add Domain** in Resend dashboard
2. **Add DNS Records** as instructed
3. **Wait for verification** (can take up to 72 hours)
4. **Update RESEND_FROM_EMAIL** to use your verified domain

### 4. Development Mode

For development, you can:

```bash
# Option 1: Log emails only (don't actually send)
DEV_MODE_EMAIL_LOG_ONLY=true

# Option 2: Skip emails entirely
DEV_MODE_EMAIL_SKIP=true
```

### 5. Test Email Service

1. **Health Check**: `GET /api/health/email`
2. **Test Email**: `POST /api/test/email` (development only)

```bash
# Test the email service
curl -X GET "http://localhost:3000/api/health/email"

# Send test email (development only)
curl -X POST "http://localhost:3000/api/test/email" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","type":"verification"}'
```

## 🔧 Enhanced Features

### Improved Error Handling
- ✅ Detailed error messages
- ✅ Retry logic with exponential backoff
- ✅ Rate limiting protection
- ✅ Development mode fallbacks

### Better User Experience
- ✅ Users aren't deleted if email fails
- ✅ Ability to resend verification emails
- ✅ Clear error messages
- ✅ Partial success handling

### Monitoring & Debugging
- ✅ Health check endpoint
- ✅ Detailed logging
- ✅ Email service testing
- ✅ Development mode options

## 🚀 Quick Fix for Development

If you just want to test registration without emails:

```bash
# Add to .env.local
DEV_MODE_EMAIL_LOG_ONLY=true
```

This will:
- ✅ Log email details to console
- ✅ Skip actual email sending
- ✅ Allow registration to complete
- ✅ Show you what emails would be sent

## 📊 Monitoring

Check email service health:
```bash
curl http://localhost:3000/api/health/email
```

Expected response:
```json
{
  "service": "email",
  "status": "healthy",
  "timestamp": "2025-06-04T12:00:00.000Z",
  "details": "Email service is configured correctly"
}
```

## 🔍 Troubleshooting

### Common Issues

1. **API Key Invalid**
   - ✅ Get new key from Resend
   - ✅ Check for typos
   - ✅ Ensure no quotes in .env file

2. **Domain Not Verified**
   - ✅ Use resend.dev for testing
   - ✅ Verify your domain in Resend
   - ✅ Check DNS propagation

3. **Rate Limits**
   - ✅ Resend has generous limits
   - ✅ Check your dashboard
   - ✅ Implement retry logic (already added)

4. **Email Not Received**
   - ✅ Check spam folder
   - ✅ Verify email address
   - ✅ Check Resend logs

## 📧 Email Templates

The system includes these email templates:
- ✅ Email Verification
- ✅ Password Reset
- ✅ Welcome Email
- ✅ OTP/2FA

All templates are responsive and branded for Edu Matrix.
