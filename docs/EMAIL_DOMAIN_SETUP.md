# 📧 Email Domain Setup Guide for Resend

## 🎯 Current Solution (Already Applied)
Your `.env.local` has been updated to use Resend's official testing domain:
```
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

This domain is **pre-verified** by Resend and works immediately without any setup!

## 🚀 Long-term Solutions (For Production)

### Option 1: Free Domain Solutions
1. **Freenom** (Free domains like .tk, .ml, .ga)
   - Visit: https://freenom.com
   - Get a free domain like `edumatrix.tk`
   - Add to Resend dashboard

2. **Free Subdomains**
   - Use services like `is-a.dev`, `js.org` for project domains
   - Apply for a free subdomain like `edu-matrix.is-a.dev`

### Option 2: Affordable Domain Services
1. **Namecheap** - $8-12/year
2. **Cloudflare Registrar** - At cost pricing
3. **Google Domains** - $12/year
4. **GoDaddy** - Often has $1 first year deals

### Option 3: Use Gmail SMTP (Alternative)
If you prefer Gmail, you can use Gmail SMTP instead of Resend:

```env
# Gmail SMTP Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-gmail@gmail.com"
SMTP_PASS="your-app-password"  # Generate from Google Account settings
```

## 🛠️ How to Add Your Own Domain to Resend

1. **Get a domain** (from any registrar)
2. **Add to Resend Dashboard**:
   - Go to https://resend.com/domains
   - Click "Add Domain"
   - Enter your domain name
   - Add the DNS records to your domain registrar

3. **DNS Records to Add**:
   ```
   Type: MX
   Name: @
   Value: feedback-smtp.resend.com
   Priority: 10

   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   ```

4. **Verify Domain**:
   - Wait for DNS propagation (5-30 minutes)
   - Click "Verify" in Resend dashboard

## 🧪 Testing Your Current Setup

Your current configuration should work immediately. Test it with:

```bash
npm run dev
```

Then try registering a new user to see if emails are sent successfully.

## 📝 Notes

- `onboarding@resend.dev` is perfect for development and testing
- Emails from this domain may go to spam in production
- For production apps, use your own verified domain
- The current API key should work with the resend.dev domain

## 🔧 Troubleshooting

If emails still fail:
1. Check if API key is valid at https://resend.com/api-keys
2. Verify you're on the correct pricing plan
3. Check Resend dashboard for usage limits
4. Look at Resend logs for detailed error messages
