# Registration Rate Limiting Guide

## 📊 Current Configuration

### Rate Limits
- **Maximum Attempts**: 3 registration attempts per hour
- **Time Window**: 3600 seconds (1 hour)
- **Tracking Method**: By IP address
- **Storage**: Redis with sliding window algorithm

### Error Messages

#### Before Improvements (Old)
```
"Too many registration attempts. Please try again later."
```

#### After Improvements (New)
```
"Too many registration attempts (3 maximum per hour). Please try again in 23 minutes."
```

## 🎯 Detailed Behavior

### User Experience Flow

1. **First 3 Attempts**: User can register freely
2. **Validation Errors**: If form has errors and user is close to limit:
   - Shows validation error + warning: "Warning: 1 registration attempt remaining this hour."
3. **Limit Exceeded**: After 3 attempts:
   - Shows: "Too many registration attempts (3 maximum per hour). Please try again in X minutes."
4. **Wait Period**: User must wait for the sliding window to reset
5. **Reset**: After time passes, attempts become available again

### Technical Implementation

```typescript
// Rate limit check
const rateLimit = await checkRateLimit(`register:${clientIP}`, 3, 3600)

// If limit exceeded
if (!rateLimit.allowed) {
  const waitTimeMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / (1000 * 60))
  return NextResponse.json({
    message: `Too many registration attempts (3 maximum per hour). Please try again in ${timeMessage}.`,
    rateLimitInfo: {
      maxAttempts: 3,
      windowHours: 1,
      waitTimeMinutes,
      resetTime: rateLimit.resetTime
    }
  }, { status: 429 })
}
```

## 📍 IP Address Tracking

### Headers Checked (in order)
1. `x-forwarded-for` (proxy/CDN forwarded IP)
2. `x-real-ip` (real client IP)
3. `'anonymous'` (fallback if no IP available)

### Behavior
- Same IP address = shared rate limit counter
- Different IP addresses = separate rate limit counters
- VPN/proxy users share limits if using same exit IP

## ⏰ Time Calculations

### Wait Time Display
```typescript
const waitTimeMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / (1000 * 60))
const waitTimeHours = Math.floor(waitTimeMinutes / 60)
const remainingMinutes = waitTimeMinutes % 60

// Examples:
// "Please try again in 45 minutes"
// "Please try again in 1 hour and 23 minutes"
// "Please try again in 2 hours and 15 minutes"
```

### Reset Behavior
- Uses **sliding window algorithm**
- Each attempt has its own timestamp
- Attempts "fall off" the window as time passes
- Not all-or-nothing reset

## 🔄 Comparison with Other Endpoints

| Endpoint | Max Attempts | Time Window | Wait Time |
|----------|-------------|-------------|-----------|
| Registration | 3 | 1 hour | 1 hour |
| Forgot Password | 5 | 1 hour | 1 hour |
| Verify Email | 10 | 1 hour | 1 hour |
| Reset Password | 5 | 1 hour | 1 hour |
| OTP Verify | 5 | 15 minutes | 15 minutes |

## 🚨 User-Facing Information

### What Users See

#### Success Response (includes rate limit info)
```json
{
  "message": "Account created successfully. Please check your email to verify your account.",
  "user": { ... },
  "rateLimitInfo": {
    "remainingAttempts": 2,
    "resetTime": 1672531200000
  }
}
```

#### Validation Error with Warning
```json
{
  "message": "Password must be at least 8 characters. Warning: 1 registration attempt remaining this hour.",
  "validationErrors": { ... },
  "rateLimitInfo": {
    "remainingAttempts": 1,
    "resetTime": 1672531200000
  }
}
```

#### Rate Limit Exceeded
```json
{
  "message": "Too many registration attempts (3 maximum per hour). Please try again in 23 minutes.",
  "rateLimitInfo": {
    "maxAttempts": 3,
    "windowHours": 1,
    "waitTimeMinutes": 23,
    "resetTime": 1672531200000
  }
}
```

## 💡 Frontend Integration Suggestions

### Display Remaining Attempts
```jsx
{response.rateLimitInfo && response.rateLimitInfo.remainingAttempts <= 2 && (
  <Alert variant="warning">
    {response.rateLimitInfo.remainingAttempts} registration attempts remaining this hour
  </Alert>
)}
```

### Show Countdown Timer
```jsx
{isRateLimited && (
  <div>
    Next attempt available in: <CountdownTimer resetTime={rateLimitInfo.resetTime} />
  </div>
)}
```

## 🛠️ Configuration Changes

### To Modify Rate Limits
File: `app/api/auth/register/route.ts`
```typescript
// Change these parameters:
const rateLimit = await checkRateLimit(`register:${clientIP}`, 5, 1800) // 5 attempts per 30 minutes
```

### Common Configurations
- **Strict**: 3 attempts per 1 hour (current)
- **Moderate**: 5 attempts per 1 hour
- **Lenient**: 10 attempts per 1 hour
- **Very Strict**: 3 attempts per 2 hours

## 🔧 Troubleshooting

### If Users Report Issues
1. Check Redis connection and logs
2. Verify IP address detection is working
3. Check if proxy/CDN is forwarding correct headers
4. Monitor rate limit keys in Redis: `register:IP_ADDRESS`

### Manual Reset (if needed)
```bash
# Connect to Redis
redis-cli

# Remove specific IP's rate limit
DEL register:192.168.1.100

# Or remove all registration rate limits
KEYS register:* | xargs DEL
```

## 📈 Monitoring

### Metrics to Track
- Rate limit hit frequency
- Average wait times
- IP addresses hitting limits repeatedly
- False positives (legitimate users blocked)

### Redis Keys to Monitor
- Pattern: `register:*`
- Check key expiration times
- Monitor memory usage for rate limit data

## 🎯 Summary

**Quick Answer to "How many attempts and how long to wait?"**
- **3 attempts maximum per hour**
- **Must wait up to 1 hour after limit exceeded**
- **Wait time depends on when first attempt was made**
- **Uses sliding window - resets gradually as time passes**
