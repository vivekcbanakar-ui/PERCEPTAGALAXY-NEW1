# Percepta Galaxy - Setup Guide

## Quick Start (10 minutes to deploy)

### Step 1: Project Structure
Your project should have this structure:
```
percepta-galaxy/
├── app/
│   ├── layout.js (Root layout with SessionProvider)
│   ├── page.js (Landing page)
│   ├── login/
│   │   └── page.js
│   ├── dashboard/
│   │   └── page.js
│   ├── pricing/
│   │   └── page.js
│   ├── checkout/
│   │   └── page.js
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.js
│   │   ├── checkout-razorpay.js
│   │   └── webhooks/
│   │       └── razorpay.js
│   └── globals.css
├── middleware.js
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env.local
```

### Step 2: Install Dependencies
```bash
npm install
```

Required packages will install:
- `next` - Framework
- `react` - UI library
- `next-auth` - Authentication
- `razorpay` - Payment processing
- `zod` - Input validation
- `tailwindcss` - Styling
- `@prisma/client` - Database (optional, for future use)

### Step 3: Create .env.local
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Then fill in your values:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

Get test keys from:
- **Razorpay Test Mode**: https://dashboard.razorpay.com/app/settings/api-keys (switch to Test)

### Step 4: Setup Tailwind (if not already done)
Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Step 5: Run Locally
```bash
npm run dev
```

Visit: `http://localhost:3000`

### Step 6: Deploy to Vercel
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Set environment variables (from `.env.local`)
6. Click "Deploy"

That's it! 🚀

---

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXTAUTH_URL` | Your app URL | `https://yourapp.vercel.app` |
| `NEXTAUTH_SECRET` | Session encryption key | Generate: `openssl rand -base64 32` |
| `RAZORPAY_KEY_ID` | Razorpay test key ID | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay test secret | From Razorpay dashboard |
| `GOOGLE_CLIENT_ID` (optional) | For Google OAuth | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` (optional) | For Google OAuth | From Google Cloud Console |

---

## Testing Payment Flow

1. Go to `/pricing`
2. Click "Start Free Trial" on any plan
3. This creates a Razorpay order (14-day free trial, ₹0)
4. Complete the payment with test card:
   - Card: `4111 1111 1111 1111`
   - Expiry: `12/25`
   - CVV: `123`

---

## Production Checklist

- [ ] Switch Razorpay to Live mode
- [ ] Update `.env` with live Razorpay keys
- [ ] Set up email provider (Gmail, SendGrid, etc.)
- [ ] Configure Google OAuth with production credentials
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Test payment flow with real card (if in India)

---

## Common Issues

### ❌ "Couldn't find any `pages` or `app` directory"
**Fix**: Make sure all files are in the `app/` folder. The structure matters!

### ❌ "Cannot find module 'next-auth'"
**Fix**: Run `npm install next-auth`

### ❌ Razorpay payment fails
**Fix**: 
- Check that `RAZORPAY_KEY_ID` is correct
- Use test mode keys (start with `rzp_test_`)
- Verify webhook signature in code

### ❌ NextAuth not working
**Fix**:
- Set `NEXTAUTH_SECRET` to a random string
- Make sure `NEXTAUTH_URL` matches your domain
- Check network tab for `/api/auth/session` call

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test sign-up and payment flow
3. 🔄 Start calling 100 SaaS founders
4. 📊 Track signup > payment conversion
5. 🎯 Iterate based on feedback

Good luck! 🚀

For questions: contact@perceptagalaxy.com
