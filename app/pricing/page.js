"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PLANS = [
  {
    name: "Starting",
    price: "₹4,900",
    period: "/month",
    description: "Perfect to get started",
    features: [
      "5 competitors",
      "2 scrapers",
      "Email alerts",
      "14-day free trial",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹12,000",
    period: "/month",
    description: "Most popular choice",
    features: [
      "20 competitors",
      "6 scrapers",
      "API access",
      "Email + Slack alerts",
      "Priority support",
      "14-day free trial",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Max",
    price: "₹16,000",
    period: "/month",
    description: "For aggressive scaling",
    features: [
      "50 competitors",
      "Unlimited scrapers",
      "Advanced API",
      "All alerts",
      "24/7 support",
      "14-day free trial",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = (planName) => {
    if (!session) {
      router.push("/login");
      return;
    }
    router.push(`/checkout?plan=${planName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          {session && (
            <Link href="/dashboard" className="text-purple-400 hover:text-purple-300">
              Dashboard
            </Link>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Simple, Transparent
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          All plans include 14 days free trial. No credit card required.
          Cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`rounded-lg overflow-hidden transition transform hover:scale-105 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-purple-600 to-pink-600 p-8 md:scale-105"
                  : "bg-purple-900/30 border border-purple-500/20 p-8 hover:border-purple-500/50"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block px-3 py-1 bg-yellow-400/20 border border-yellow-400/50 rounded-full text-yellow-300 text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-300 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-slate-300 ml-2">{plan.period}</span>
              </div>

              <button
                onClick={() => handleCheckout(plan.name)}
                className={`w-full px-6 py-3 rounded-lg font-bold transition mb-6 ${
                  plan.highlighted
                    ? "bg-white text-purple-600 hover:bg-slate-100"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <span className="mr-3 text-green-400">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-purple-500/20">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Need a custom plan?</h3>
          <p className="text-slate-300 mb-8">
            For enterprise customers with unique needs, we offer custom pricing.
          </p>
          <a
            href="mailto:vivekcbanakar@gmail.com"
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
          >
            Contact Sales
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">FAQ</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes, cancel your subscription at any time with no questions asked.",
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 14-day free trial with full access to all features.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, debit cards, and UPI via Razorpay.",
            },
            {
              q: "Do you offer annual plans?",
              a: "Contact us for volume discounts and annual billing options.",
            },
          ].map((faq, i) => (
            <div key={i}>
              <h4 className="font-bold mb-2">{faq.q}</h4>
              <p className="text-slate-300 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
