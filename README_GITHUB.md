# 🚀 Percepta Galaxy

Real-time competitive intelligence SaaS platform.

## 🎯 What It Does

- **Track competitors** in real-time (ads, jobs, pricing, SEO)
- **AI-powered insights** - automatic delta detection
- **Same-day alerts** via email, Slack, WhatsApp
- **Razorpay payments** for India

## 📊 Pricing

| Tier | Price | Competitors | Features |
|------|-------|------------|----------|
| Starting | ₹4,900 | 5 | Email alerts |
| Pro | ₹12,000 | 20 | Slack + Email |
| Max | ₹16,000 | 50 | All channels |
| Custom | ₹33,000 | ∞ | White-label |

## 🚀 Quick Start

### Local Development

```bash
npm install
npx prisma db push
npm run dev
```

Visit: http://localhost:3000

### Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in your secrets (Razorpay, Supabase, OpenAI)

### Deploy to Vercel

1. Push code to GitHub
2. Import on Vercel
3. Add environment variables
4. Deploy

## 📁 API Routes

- `POST /api/checkout-razorpay` - Create payment order
- `POST /api/webhooks/razorpay` - Payment webhooks
- `POST /api/competitors/add` - Add competitor

## 🔐 Security

- All secrets in `.env.local` (never committed)
- Razorpay signature verification
- PostgreSQL encryption at rest
- JWT token auth

---

Built with Next.js, Razorpay, PostgreSQL, and AI.
