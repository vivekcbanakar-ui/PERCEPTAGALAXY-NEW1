"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    period: "/month",
    description: "Track your #1 threat",
    features: [
      "1 main competitor",
      "Daily AI scans",
      "Weekly email reports",
      "30 AI insights / month",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: 399,
    period: "/month",
    description: "Built for founders who want to WIN",
    features: [
      "Up to 3 competitors",
      "Predictive AI insights",
      "Daily email reports",
      "Unlimited AI insights",
      "Slack/Discord alerts",
      "3 team seats",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "scale",
    name: "Scale",
    price: 999,
    period: "/month",
    description: "For agencies & scaling founders",
    features: [
      "Up to 10 competitors",
      "Predictive AI insights",
      "Real-time reports",
      "Unlimited AI insights",
      "Slack/Discord alerts",
      "10 team seats",
      "API access",
      "Dedicated Slack support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

const COMPARISON = [
  { feature: "Price", crayon: "$15K+/year", klue: "$10K+/year", us: "$399/month" },
  { feature: "Setup time", crayon: "2-3 months", klue: "1-2 months", us: "5 minutes" },
  { feature: "Competitors tracked", crayon: "50+", klue: "30+", us: "1-10 (focused)" },
  { feature: "Best for", crayon: "Enterprise", klue: "Mid-market", us: "Founders" },
  { feature: "AI predictions", crayon: "Limited", klue: "Limited", us: "Core feature" },
  { feature: "Contract required", crayon: "Yes (annual)", klue: "Yes (annual)", us: "No — cancel anytime" },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePlanSelect = (planId) => {
    if (session) {
      router.push(`/checkout?plan=${planId}`);
    } else {
      router.push(`/login?callbackUrl=/checkout?plan=${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="px-4 py-2 hover:text-purple-400 transition">Home</Link>
            {session ? (
              <Link href="/dashboard" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">Dashboard</Link>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">Sign In</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Pricing for founders <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            who want to WIN
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
          Track your top competitors. Get AI-powered predictions on their next move. Stay ahead — always.
        </p>
        <p className="text-sm text-slate-400">
          14-day free trial · No credit card required · Cancel anytime
        </p>
      </section>

      {/* Pricing cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 transition transform ${
                plan.highlighted
                  ? "bg-gradient-to-b from-purple-600/20 to-pink-600/20 border-2 border-purple-500 scale-105 shadow-2xl shadow-purple-500/20"
                  : "bg-slate-900/60 border border-purple-500/20 hover:border-purple-500/50"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-slate-400 ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-200">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full px-6 py-3 rounded-lg font-bold transition ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                }`}
              >
                {plan.cta}
              </button>

              <p className="text-center text-slate-400 text-xs mt-3">
                or ${Math.round(plan.price * 12 * 0.8)}/year (save 20%)
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why founders choose Percepta Galaxy
        </h2>
        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          We don't try to be everything for everyone. We're built for one thing: helping founders stay ahead of their #1 competitor.
        </p>

        <div className="bg-slate-900/60 border border-purple-500/20 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 bg-purple-900/40 px-6 py-4 font-bold text-sm uppercase tracking-wide">
            <div></div>
            <div className="text-slate-400">Crayon</div>
            <div className="text-slate-400">Klue</div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Percepta Galaxy
            </div>
          </div>

          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 px-6 py-4 ${
                i % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"
              }`}
            >
              <div className="text-slate-300 font-medium">{row.feature}</div>
              <div className="text-slate-400">{row.crayon}</div>
              <div className="text-slate-400">{row.klue}</div>
              <div className="text-white font-semibold">{row.us}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ-style CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still checking competitor websites manually?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Stop guessing. Start knowing. <br />
            14-day free trial. No credit card. No contracts.
          </p>
          <Link
            href={session ? "/dashboard" : "/login"}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            Start Your Free Trial →
          </Link>
          <p className="text-slate-400 text-sm mt-4">
            Join the founders building unfair advantage
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2026 Percepta Galaxy. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="text-slate-400 hover:text-purple-400 transition">Terms</Link>
            <Link href="/privacy" className="text-slate-400 hover:text-purple-400 transition">Privacy</Link>
            <a href="mailto:vivekcbanakar@gmail.com" className="text-slate-400 hover:text-purple-400 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
