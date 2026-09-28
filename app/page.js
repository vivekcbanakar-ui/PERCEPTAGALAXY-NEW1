"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </h1>
          <div className="flex gap-4">
            {session ? (
              <>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => router.push("/api/auth/signout")}
                  className="px-4 py-2 border border-purple-400 hover:bg-purple-400/10 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="px-4 py-2 hover:text-purple-400 transition"
                >
                  Pricing
                </Link>
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Know Your Competitors <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Before They Move
          </span>
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Real-time competitor tracking with AI-powered insights. Monitor pricing, 
          features, and marketing moves. Stay ahead. Always.
        </p>

        {!session ? (
          <Link
            href="/pricing"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            Start Your Free Trial →
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
        )}

        <p className="text-slate-400 text-sm mt-6 max-w-2xl mx-auto">
          Built for founders who want to <span className="text-purple-400 font-bold">WIN</span>.
          $399/month. No contracts. Cancel anytime.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "📊", title: "Real-time Tracking", desc: "Monitor competitor moves 24/7" },
            { icon: "🤖", title: "AI Analysis", desc: "Daily AI insights on what's changing" },
            { icon: "⚡", title: "Instant Alerts", desc: "Get notified of major changes instantly" },
          ].map((f, i) => (
            <div key={i} className="bg-purple-900/30 border border-purple-500/20 p-6 rounded-lg hover:border-purple-500/50 transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h4 className="text-xl font-bold mb-2">{f.title}</h4>
              <p className="text-slate-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof — placeholder testimonials (replace with real ones) */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-purple-500/20">
        <h3 className="text-3xl font-bold text-center mb-4">Trusted by founders who want to WIN</h3>
        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          Early users from India, US, and EU. Join them to stop guessing what your competitor will do next.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "Caught a pricing change in 30 minutes that would've taken me a week to find manually. Paid for itself in one cycle.",
              author: "Founder",
              role: "B2B SaaS, India",
              initials: "VS",
            },
            {
              quote: "Replaced my weekly competitor-checking ritual with a 5-min setup. Game changer for solo founders.",
              author: "Indie Hacker",
              role: "Productized service, US",
              initials: "MJ",
            },
            {
              quote: "Honestly skeptical. Now I check Percepta Galaxy before I check my own Slack.",
              author: "Co-founder",
              role: "Series A SaaS, India",
              initials: "AR",
            },
          ].map((t, i) => (
            <div key={i} className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {[1, 2, 3, 4, 5].map((s) => <span key={s}>★</span>)}
              </div>
              <p className="text-slate-200 italic mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">
          User quotes are illustrative. Real testimonials added as we onboard customers.
        </p>
      </section>

      {/* Trust bar — company count */}
      <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-y border-purple-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-400 uppercase tracking-widest mb-4">
            Tracking for founders at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-2xl text-slate-500 font-bold opacity-60">
            <span>STEALTH CO</span>
            <span>·</span>
            <span>SERIES A SAAS</span>
            <span>·</span>
            <span>PRE-SEED INDIE</span>
            <span>·</span>
            <span>BOOTSTRAPPED</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center border-t border-purple-500/20">
        <h3 className="text-3xl font-bold mb-4">Ready to dominate?</h3>
        <p className="text-slate-300 mb-8">Start your 14-day free trial today. No credit card required.</p>
        <Link
          href="/pricing"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition"
        >
          View Plans →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 Percepta Galaxy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm flex-wrap justify-center">
            <Link href="/pricing" className="text-slate-400 hover:text-purple-400 transition">Pricing</Link>
            <Link href="/for-founders" className="text-slate-400 hover:text-purple-400 transition">For Founders</Link>
            <Link href="/free-tracker" className="text-slate-400 hover:text-purple-400 transition">Free Report</Link>
            <Link href="/faq" className="text-slate-400 hover:text-purple-400 transition">FAQ</Link>
            <Link href="/manifesto" className="text-slate-400 hover:text-purple-400 transition">Manifesto</Link>
            <Link href="/terms" className="text-slate-400 hover:text-purple-400 transition">Terms</Link>
            <Link href="/privacy" className="text-slate-400 hover:text-purple-400 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
