import { useState } from "react";
import Link from "next/link";

export const metadata = {
  title: "Free Competitor Report | Percepta Galaxy",
  description: "Get a free 7-day AI competitor analysis. See what your #1 threat is doing now and predict their next move.",
};

export default function FreeTrackerPage() {

export default function FreeTrackerPage() {
  const [yourCompany, setYourCompany] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "free-tracker",
          competitor: competitorUrl,
          message: `Their company: ${yourCompany}`,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
          <Link href="/" className="px-4 py-2 hover:text-purple-400 transition">← Back</Link>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 py-16">
        {!submitted ? (
          <>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold mb-4">
                FREE FOR 7 DAYS
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                See what your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">#1 competitor</span> is about to do
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Get a free 7-day AI-powered competitor report. We'll email you what they're doing now AND predict their next move.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your company name
                </label>
                <input
                  type="text"
                  value={yourCompany}
                  onChange={(e) => setYourCompany(e.target.value)}
                  placeholder="Acme SaaS"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your main competitor's URL
                </label>
                <input
                  type="url"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  placeholder="https://competitor.com"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your email (we'll send the report here)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@yourcompany.com"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 rounded-lg font-bold text-lg transition"
              >
                {loading ? "Setting up tracker..." : "Get My Free Report →"}
              </button>

              <p className="text-center text-slate-400 text-xs">
                No credit card required. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                { icon: "🔍", title: "Daily monitoring", desc: "We check their site every day for changes" },
                { icon: "🤖", title: "AI predictions", desc: "What they'll do in the next 30 days" },
                { icon: "📧", title: "Weekly emails", desc: "Concise, actionable reports in your inbox" },
              ].map((f, i) => (
                <div key={i} className="bg-slate-900/40 border border-purple-500/20 rounded-lg p-5 text-center">
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <div className="font-bold text-white mb-1">{f.title}</div>
                  <div className="text-sm text-slate-400">{f.desc}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-slate-900/60 border border-green-500/30 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4 text-white">You're in!</h2>
            <p className="text-lg text-slate-300 mb-6">
              We're tracking <strong className="text-purple-400">{competitorUrl}</strong> for you. Your first report will arrive within 24 hours.
            </p>
            <p className="text-slate-400 mb-8">
              Check your email at <strong>{email}</strong> for next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
              >
                See Full Pricing →
              </Link>
              <Link
                href="/manifesto"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-bold transition"
              >
                Why We Built This
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
