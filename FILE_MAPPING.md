# File Mapping - Copy These to Your Project

## 📁 Project Root
Copy these files to your project root:

| File | Copy to | Purpose |
|------|---------|---------|
| `package.json` | `/package.json` | Dependencies |
| `next.config.js` | `/next.config.js` | Next.js config |
| `tailwind.config.js` | `/tailwind.config.js` | Tailwind styling |
| `postcss.config.js` | `/postcss.config.js` | PostCSS for Tailwind |
| `middleware.js` | `/middleware.js` | Route protection |
| `.env.example` | `/.env.local` | Environment variables (edit with your keys) |
| `SETUP.md` | `/SETUP.md` | Setup guide |

---

## 📁 app/ Folder (App Router Structure)

### Root Layout & Pages
| File | Copy to | Purpose |
|------|---------|---------|
| `app-layout.js` | `/app/layout.js` | Root layout with SessionProvider |
| `app-page.js` | `/app/page.js` | Landing page |
| `app-globals.css` | `/app/globals.css` | Global styles |

### Authentication Pages
| File | Copy to | Purpose |
|------|---------|---------|
| `app-login-page.js` | `/app/login/page.js` | Login with email/Google |

### Dashboard & Pricing Pages
| File | Copy to | Purpose |
|------|---------|---------|
| `app-dashboard-page.js` | `/app/dashboard/page.js` | Protected dashboard |
| `app-pricing-page.js` | `/app/pricing/page.js` | Pricing page |
| `app-checkout-page.js` | `/app/checkout/page.js` | Checkout with Razorpay |

### API Routes
| File | Copy to | Purpose |
|------|---------|---------|
| `app-api-auth-nextauth-route.js` | `/app/api/auth/[...nextauth]/route.js` | NextAuth configuration |
| `app-api-checkout-razorpay-route.js` | `/app/api/checkout-razorpay/route.js` | Razorpay order creation |
| `app-api-webhooks-razorpay-route.js` | `/app/api/webhooks/razorpay/route.js` | Payment verification |

---

## 🚀 Setup Instructions

### 1. Create Directory Structure
```bash
mkdir -p app/login
mkdir -p app/dashboard
mkdir -p app/pricing
mkdir -p app/checkout
mkdir -p app/api/auth/\[...nextauth\]
mkdir -p app/api/webhooks
```

### 2. Copy Files
Copy each file from the mapping above to its destination.

**Example:**
```bash
cp app-layout.js app/layout.js
cp app-page.js app/page.js
cp app-globals.css app/globals.css
# ... and so on
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create .env.local
```bash
cp .env.example .env.local
# Edit .env.local with your keys:
# - RAZORPAY_KEY_ID
# - RAZORPAY_KEY_SECRET
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
```

### 5. Run Locally
```bash
npm run dev
```

Visit: `http://localhost:3000`

### 6. Deploy to Vercel
1. Push to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy ✅

---

## 📝 File Contents Summary

### Pages (UI Components)
- **landing page** (`app/page.js`): Hero, features, CTAs
- **login** (`app/login/page.js`): Email + Google auth
- **dashboard** (`app/dashboard/page.js`): Protected, add competitors, stats
- **pricing** (`app/pricing/page.js`): 4 plans, FAQ, CTA
- **checkout** (`app/checkout/page.js`): Order summary, Razorpay modal

### API Routes (Backend)
- **auth** (`app/api/auth/[...nextauth]/route.js`): NextAuth handlers
- **checkout** (`app/api/checkout-razorpay/route.js`): Create Razorpay order
- **webhook** (`app/api/webhooks/razorpay/route.js`): Verify payment

### Configuration
- **layout.js**: Root layout with SessionProvider
- **middleware.js**: Protect /dashboard, /checkout
- **globals.css**: Tailwind + scrollbar styling
- **next.config.js**: Build config
- **tailwind.config.js**: Custom colors
- **postcss.config.js**: Tailwind processing

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] Landing page loads at http://localhost:3000
- [ ] "Sign In" button works
- [ ] Email login page loads
- [ ] "Pricing" page shows 4 plans
- [ ] "Start Free Trial" redirects to login if not authenticated
- [ ] Dashboard page requires authentication
- [ ] Razorpay modal appears on checkout (in test mode)

---

## 🔗 External Services Setup

### Razorpay
1. Go to https://dashboard.razorpay.com
2. Sign up (free account)
3. Settings → API Keys
4. Switch to "Test Mode"
5. Copy Key ID and Key Secret → `.env.local`

### Vercel (for deployment)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your GitHub repo
4. Add environment variables
5. Deploy

### Google OAuth (optional)
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable OAuth consent screen
4. Create OAuth 2.0 credentials
5. Copy Client ID and Secret → `.env.local`

---

Done! Your Percepta Galaxy app is ready to deploy 🚀
