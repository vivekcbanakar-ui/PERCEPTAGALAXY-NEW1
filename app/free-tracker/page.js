"use client";

import { useState } from "react";
import Link from "next/link";

export default function FreeTrackerPage() {
  const [yourCompany, setYourCompany] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form"); // 'form' | 'analyzing' | 'results' | 'submitted'
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStep("analyzing");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          competitorUrl: competitorUrl.trim(),
          yourCompany: yourCompany.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStep("form");
        return;
      }

      setReport(data.report);
      setStep("results");

      // Also save to leads for follow-up
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "free-tracker",
          competitor: competitorUrl.trim(),
          message: `Company: ${yourCompany || "not provided"} | Report generated: ${data.report?.success ? "YES" : "NO"}`,
        }),
      });
    } catch (err) {
      setError("Connection failed. Please check your internet and try again.");
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const handleGetFullReport = () => {
    setStep("submitted");
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
        {/* Step 1: Form */}
        {step === "form" && (
          <>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold mb-4">
                FREE COMPETITOR ANALYSIS
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                See what your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">#1 competitor</span> is doing right now
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                We&apos;ll scrape their site live, detect pricing, features, and recent changes — and email you the full AI analysis. Free, no signup required.
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
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your main competitor&apos;s URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  placeholder="https://notion.so"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your email <span className="text-red-400">*</span>
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
                disabled={loading || !competitorUrl || !email}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
              >
                {loading ? "⏳ Loading..." : "🔍 Analyze My Competitor →"}
              </button>

              <p className="text-center text-slate-400 text-xs">
                No credit card required. We&apos;ll email you a full competitor analysis within minutes.
              </p>
            </form>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                { icon: "🔍", title: "Live scrape", desc: "We fetch their site right now — not cached data" },
                { icon: "🤖", title: "AI analysis", desc: "GPT-powered detection of pricing, features, changes" },
                { icon: "📧", title: "Full report", desc: "Detailed breakdown emailed to you instantly" },
              ].map((f, i) => (
                <div key={i} className="bg-slate-900/40 border border-purple-500/20 rounded-lg p-5 text-center">
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <div className="font-bold text-white mb-1">{f.title}</div>
                  <div className="text-sm text-slate-400">{f.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Analyzing */}
        {step === "analyzing" && (
          <div className="text-center py-16">
            <div className="text-7xl mb-6 animate-pulse">🔍</div>
            <h2 className="text-3xl font-bold mb-4">Scraping {competitorUrl}...</h2>
            <p className="text-slate-300 text-lg mb-8">
              We&apos;re fetching the site, detecting pricing, features, and recent changes in real-time.
            </p>
            <div className="space-y-3 max-w-sm mx-auto text-left">
              {[
                "Fetching competitor website...",
                "Extracting pricing signals...",
                "Detecting feature keywords...",
                "Analyzing content changes...",
                "Generating your report...",
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  {task}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === "results" && report && (
          <div>
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">{report.success ? "✅" : "⚠️"}</div>
              <h2 className="text-3xl font-bold mb-2">
                {report.success ? "Live Analysis Complete!" : "Analysis Attempted"}
              </h2>
              <p className="text-slate-300">
                {report.success
                  ? `We scraped ${report.url} and found live data.`
                  : report.reason}
              </p>
            </div>

            {/* Live data results */}
            {report.success && (
              <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 mb-6 space-y-4">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div>
                    <div className="text-sm text-slate-400">Competitor URL</div>
                    <div className="text-white font-medium">{report.url}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Page Title</div>
                    <div className="text-white font-medium">{report.title || "Unknown"}</div>
                  </div>
                </div>

                {report.findings && report.findings.length > 0 ? (
                  <div>
                    <h3 className="font-bold text-white mb-3">🔎 What we found:</h3>
                    <div className="space-y-3">
                      {report.findings.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-800/40 rounded-lg p-4">
                          <span className="text-2xl mt-0">
                            {f.type === "pricing" ? "💰" : f.type === "feature" ? "⚡" : f.type === "social-proof" ? "👥" : "🆕"}
                          </span>
                          <div>
                            <div className="font-semibold text-white capitalize">{f.type.replace("-", " ")}</div>
                            <div className="text-slate-300 text-sm">
                              {f.type === "pricing" && f.samples
                                ? `Mentions: ${f.samples.join(", ")}`
                                : f.type === "feature"
                                ? `"${f.keyword}" mentioned ${f.count} times`
                                : f.type === "social-proof"
                                ? `Customer-focused messaging detected`
                                : `Fresh content signals detected ("${f.keyword}")`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/40 rounded-lg p-6 text-center text-slate-400">
                    General competitor page detected. Sign up to get ongoing tracking + AI predictions.
                  </div>
                )}

                <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-sm text-purple-300 font-semibold mb-1">AI Summary</div>
                  <div className="text-slate-200">{report.summary}</div>
                </div>

                <div className="text-xs text-slate-500 text-center">
                  {report.contentLength?.toLocaleString()} chars scraped • Strategy: {report.strategy}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                {report.success ? "Want daily competitor tracking?" : "Get manual analysis + daily tracking"}
              </h3>
              <p className="text-slate-300 mb-6">
                {report.success
                  ? "This was a one-time snapshot. Get AI-powered daily monitoring, change alerts, and predictions for $399/month."
                  : "Some sites block automated scraping. We'll manually analyze this competitor and send you a detailed report."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/pricing"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
                >
                  Start Free Trial →
                </Link>
                <button
                  onClick={handleGetFullReport}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-bold transition"
                >
                  Email Me Full Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Email submitted */}
        {step === "submitted" && (
          <div className="text-center py-8">
            <div className="text-7xl mb-6">📧</div>
            <h2 className="text-3xl font-bold mb-4">Report on its way!</h2>
            <p className="text-lg text-slate-300 mb-8">
              We&apos;ve sent a detailed analysis of <strong className="text-purple-400">{competitorUrl}</strong> to <strong className="text-purple-400">{email}</strong>.
            </p>
            <p className="text-slate-400 mb-8">
              In the meantime, here&apos;s what you can do:
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/pricing" className="block px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-center transition">
                Start Free Trial →
              </Link>
              <Link href="/content-templates" className="block px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-bold text-center transition">
                Content Templates
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
