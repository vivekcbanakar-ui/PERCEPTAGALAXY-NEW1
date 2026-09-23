import Link from "next/link";

export const metadata = {
  title: "Built for Founders Who Want to WIN | Percepta Galaxy",
  description: "Track your #1 competitor's every move. AI predicts what they'll do next. $399/month, 5-minute setup. No contracts.",
};

export default function ForFoundersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <Link href="/" className="px-4 py-2 hover:text-purple-400 transition">← Back</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-4 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold">
          FOR FOUNDERS WHO WANT TO WIN
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          We don't track <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            30 competitors for you.
          </span>
        </h1>
        <p className="text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
          You already know your #1 threat.
          <br />
          <strong className="text-white">What you don't know: what they'll do next month.</strong>
        </p>
        <p className="text-3xl font-bold text-white mb-8">
          That's what we do.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/free-tracker"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            Get Free Report →
          </Link>
          <Link
            href="/pricing"
            className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-bold text-lg transition"
          >
            See Pricing
          </Link>
        </div>
      </section>

      {/* The Problem */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-6 text-white">
            You're flying blind.
          </h2>
          <div className="space-y-4 text-lg text-slate-300">
            <p>
              You check your competitor's website every week. Maybe every day. Manually.
            </p>
            <p>
              You scroll their pricing page. Their blog. Their changelog. Their Twitter. Their LinkedIn.
            </p>
            <p>
              And you still miss things. Important things.
            </p>
            <p className="text-red-400 font-semibold text-xl pt-4">
              Hope is not a strategy.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Here's what we do instead.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "1", title: "Watch daily", desc: "AI monitors their site, pricing, features, jobs page 24/7. You don't lift a finger." },
            { num: "2", title: "Alert instantly", desc: "Email + Slack notification the moment something changes. No more weekly checking." },
            { num: "3", title: "Predict next", desc: "AI tells you what they're LIKELY to do next. Before they do it." },
          ].map((step) => (
            <div key={step.num} className="bg-slate-900/60 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            ₹33,200/month. AI predictions. Actionable.
          </h2>
          <p className="text-xl text-center text-slate-300 mb-8">
            For founders who want to stay ahead.
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "Daily AI competitor reports",
              "Predictive alerts (what they'll do next)",
              "Slack/Discord notifications",
              "Pricing change tracking",
              "Feature launch detection",
              "Job posting intelligence",
              "Weekly strategy email",
              "Cancel anytime — no contracts",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pitch */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Hi [Name], this is Vivek from Percepta Galaxy.
          </h2>
          <div className="space-y-4 text-lg text-slate-300">
            <p>
              I noticed you're in <strong className="text-purple-400">[industry]</strong>. Your biggest threat is probably <strong className="text-purple-400">[competitor]</strong>.
            </p>
            <p>
              Here's the problem: You're checking their website every week manually.
            </p>
            <p>
              Our AI does that daily. And predicts what they'll do next.
            </p>
            <p className="text-2xl font-bold text-white pt-4">
              $399/month. No contracts. No long setup.
            </p>
            <p className="text-xl">
              Can I show you what we found about [competitor's] next move in the next 2 weeks?
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/free-tracker"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition"
            >
              Try It Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Stop reacting. <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Start winning.</span>
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          7-day free report. No credit card. No contracts.
        </p>
        <Link
          href="/free-tracker"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
        >
          Get My Free Report →
        </Link>
      </section>
    </div>
  );
}
