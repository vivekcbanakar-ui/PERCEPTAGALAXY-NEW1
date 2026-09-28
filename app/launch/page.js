import Link from "next/link";

export const metadata = {
  title: "Launch Week | Percepta Galaxy",
  description: "Get 50% off the Growth plan during our launch week. Limited to first 50 customers.",
};

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Confetti background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-20">✨</div>
        <div className="absolute top-20 right-20 text-3xl opacity-20">🚀</div>
        <div className="absolute top-40 left-1/3 text-2xl opacity-15">⭐</div>
        <div className="absolute top-60 right-1/3 text-3xl opacity-20">💫</div>
        <div className="absolute top-80 left-1/4 text-2xl opacity-15">🎯</div>
      </div>

      {/* Nav */}
      <nav className="relative border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <Link href="/" className="px-4 py-2 hover:text-purple-400 transition">← Back to site</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-block mb-6 px-4 py-1 bg-pink-600/30 border border-pink-500/50 rounded-full text-pink-300 text-sm font-semibold animate-pulse">
          🔥 LAUNCH WEEK — 50% OFF GROWTH PLAN
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          We just launched.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Want 50% off?
          </span>
        </h1>
        <p className="text-2xl text-slate-300 max-w-3xl mx-auto mb-4">
          First 50 founders who sign up get our Growth plan for{" "}
          <span className="font-bold text-white">$199/month</span> (was $399). Forever.
        </p>
        <p className="text-slate-400 mb-8">
          Track 3 competitors with daily AI insights. Predict their next move. Cancel anytime.
        </p>

        {/* Countdown / Scarcity */}
        <div className="bg-slate-900/60 border-2 border-pink-500/50 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-5xl font-bold text-pink-400">47</div>
              <div className="text-xs text-slate-400 uppercase mt-2">Spots Left</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-400">6</div>
              <div className="text-xs text-slate-400 uppercase mt-2">Days Left</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400">3</div>
              <div className="text-xs text-slate-400 uppercase mt-2">Already In</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            *Scarcity reflected based on launch week signup caps.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-block px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl font-bold text-xl transition transform hover:scale-105 shadow-2xl shadow-pink-500/30"
        >
          Claim Your $199 Rate →
        </Link>
        <p className="text-xs text-slate-500 mt-4">
          No code needed. Discount auto-applied at checkout during launch week.
        </p>
      </section>

      {/* What's in Growth */}
      <section className="relative max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What you get for $199/mo (limited time)
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Track 3 competitors", desc: "Your #1 threat + 2 others to monitor" },
            { title: "Daily AI insights", desc: "LLM-powered summaries of every change" },
            { title: "Predictive alerts", desc: "Get notified of strategy shifts in 24-48h" },
            { title: "Slack/Discord alerts", desc: "Real-time notifications in your workspace" },
            { title: "Priority support", desc: "Reply within 24 hours" },
            { title: "Future price lock", desc: "This rate locked in forever — even when we raise prices" },
          ].map((f, i) => (
            <div key={i} className="bg-slate-900/60 border border-pink-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-slate-400 text-sm">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder's Note */}
      <section className="relative max-w-3xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-10">
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            "I built Percepta Galaxy because I was the founder checking competitor sites every week, missing pricing changes, missing launches, missing <em className="text-pink-400">2-3 weeks</em> of context."
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            "Crayon and Klue exist but cost $15K/year and take months to set up. I wanted something founders could use today, for less than a Netflix subscription."
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            "50 of you get a launch-week price. Forever. After that, it's $399/mo. That's it."
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              V
            </div>
            <div>
              <div className="font-bold text-white">Vivek Banakar</div>
              <div className="text-sm text-slate-400">Founder, Percepta Galaxy</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Quick answers</h2>
        <div className="space-y-4">
          {[
            {
              q: "Why is this discounted?",
              a: "Launch week. First 50 customers get our Growth plan at $199/mo forever. Lock in this rate before it goes away.",
            },
            {
              q: "What if I want to upgrade later?",
              a: "Easy. Upgrade to Scale plan anytime. The $199/mo price stays on Growth unless you downgrade.",
            },
            {
              q: "Is this the same product?",
              a: "Yes. Same AI tracking, same dashboard, same insights. Just cheaper for the first 50.",
            },
            {
              q: "How long does the deal last?",
              a: "7 days from launch (Oct 5, 2026). Or first 50 signups — whichever comes first.",
            },
          ].map((f, i) => (
            <div key={i} className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-6">
              <h3 className="font-bold text-white mb-2">{f.q}</h3>
              <p className="text-slate-300 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Don't miss the launch.
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          47 spots left. After launch week: $399/month.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl font-bold text-xl transition transform hover:scale-105 shadow-2xl shadow-pink-500/30"
        >
          Get $199/mo Growth Plan →
        </Link>
      </section>
    </div>
  );
}
