# 🔧 Registration System - Automated Cleanup Setup Guide

## 📋 Overview
This guide helps you set up automated cleanup of expired unverified user accounts to prevent username hoarding.

## 🚀 Setup Options

### Option 1: Windows Task Scheduler (Windows)

1. **Open Task Scheduler**
   - Press `Win + R`, type `taskschd.msc`, press Enter

2. **Create Basic Task**
   - Click "Create Basic Task" in the right panel
   - Name: "Cleanup Expired Users"
   - Description: "Remove expired unverified user accounts"

3. **Set Trigger**
   - Trigger: Daily
   - Start: 02:00 AM (or preferred time)
   - Recur every: 1 days

4. **Set Action**
   - Action: Start a program
   - Program: `node`
   - Arguments: `scripts/cleanup-expired-users.js`
   - Start in: `E:\edu-matrix-interlinked 3\edu-matrix-interlinked`

### Option 2: Cron Job (Linux/Mac)

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 2 AM)
0 2 * * * cd /path/to/your/project && node scripts/cleanup-expired-users.js >> logs/cleanup.log 2>&1
```

### Option 3: Next.js API Cron (Vercel/Cloud)

```javascript
// Add to your deployment platform's cron settings
// Or use a service like Uptime Robot to call the cleanup API

// POST https://yourdomain.com/api/auth/cleanup-expired
// Headers: { "x-api-key": "your-secret-key" }
```

## 🔐 Security Configuration

### Environment Variables

Add to your `.env.local`:

```env
# Optional: Protect cleanup API with secret key
CLEANUP_API_KEY=your-very-secret-cleanup-key-here
```

## 📊 Monitoring

### Manual Cleanup

```bash
# Run cleanup manually
cd "your-project-directory"
node scripts/cleanup-expired-users.js
```

### Check Logs

```bash
# View cleanup logs (if using cron)
tail -f logs/cleanup.log
```

### API Cleanup

```bash
# Call cleanup API (if CLEANUP_API_KEY is set)
curl -X POST https://yourdomain.com/api/auth/cleanup-expired \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key"
```

## 🎯 Recommended Schedule

- **Production**: Daily at 2 AM
- **Development**: Weekly or manual
- **High Traffic**: Twice daily (2 AM and 2 PM)

## 🔍 Verification

After setup, verify it's working:

1. Check cleanup logs
2. Monitor database for expired unverified users
3. Test username availability for previously blocked usernames

## 📈 Benefits

✅ **Prevents Username Hoarding**: Expired registrations don't block usernames  
✅ **Improves User Experience**: Better username availability  
✅ **Maintains Database Hygiene**: Removes stale unverified accounts  
✅ **Automated Process**: No manual intervention required
