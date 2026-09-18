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
            Start Free Trial → 14 Days
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
        )}
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
    </div>
  );
}
