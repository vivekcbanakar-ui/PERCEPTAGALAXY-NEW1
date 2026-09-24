import Link from "next/link";
import { useState } from "react";

export const metadata = {
  title: "Free Founder Resources | Percepta Galaxy",
  description: "Cold email templates, LinkedIn scripts, and cold call scripts for B2B SaaS founders.",
};

export default function ResourcesPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    // Capture email as lead
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "resources-page" }),
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <Link href="/" className="px-4 py-2 hover:text-purple-400 transition">← Back</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Founder <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">resources</span>
          </h1>
          <p className="text-xl text-slate-300">
            Free templates, scripts, and tools to help you sell more.
          </p>
        </div>

        {/* Email templates */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">📧 3 Cold Outreach Email Templates</h2>
          <p className="text-slate-300 mb-6">
            Proven templates to get replies from busy founders. Used by Percepta Galaxy + 100s of B2B SaaS sales teams.
          </p>

          {!submitted ? (
            <form onSubmit={handleDownload} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
              >
                Get Templates →
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                ✓ Check your email — templates are on the way. (Demo: shown below)
              </div>

              <Template
                title="Template 1: The Observation"
                subject="Saw [competitor] just changed their pricing"
                body={`Hi [Name],

Quick observation: [Competitor] just changed their [pricing/features]. Most founders don't catch this for 2-3 weeks.

We track changes like this for 50+ SaaS companies daily. AI tells founders what [competitor] will do NEXT, not just what they did.

Want me to send you a free report on what [competitor] is likely to launch in Q4?

— Vivek, Percepta Galaxy
founder@perceptagalaxy.com

P.S. Built for founders who'd rather WIN than react.`}
              />

              <Template
                title="Template 2: The Question"
                subject="Quick question"
                body={`Hi [Name],

Saw you launched [product name] — congrats. Quick question: how do you track what your top competitor does after they launch?

Most founders I talk to say they "check their site weekly." That's the gap.

We built Percepta Galaxy to do that daily + predict what's next. $399/month, 5-min setup, no contract.

Worth a 15-min call?

— Vivek`}
              />

              <Template
                title="Template 3: The Case Study"
                subject="How [similar founder] predicts [competitor] moves"
                body={`Hi [Name],

[Similar founder in your space] was checking their #1 competitor's site manually every week. Missing pricing changes, missing launches, missing 2-3 weeks of context.

We set them up on Percepta Galaxy — daily AI reports, predictive alerts. 5-minute setup. Now they react in 24 hours instead of 3 weeks.

$399/month. No contract.

Worth a 15-min demo?

— Vivek
P.S. Try our free 7-day report: perceptagalaxy.com/free-tracker`}
              />
            </div>
          )}
        </div>

        {/* LinkedIn scripts */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">💼 LinkedIn DM Scripts</h2>
          <div className="space-y-4 text-slate-300">
            <Script
              title="Connection request (300 char max)"
              body={`Hi [Name] — saw you're building [their product]. Quick question: how do you track what your top competitor does? I'm building something for that. Would love your take.`}
            />
            <Script
              title="After they accept"
              body={`Thanks for connecting. 

Honest question — do you track your #1 competitor weekly or just hope they don't do anything big?

Most founders I ask say "weekly check" and miss 2-3 weeks of moves. We built Percepta Galaxy to fix that — daily AI reports + predictive alerts.

Worth a 15-min call to see if it fits?`}
            />
          </div>
        </div>

        {/* Sales pitch */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">📞 Cold Call Script</h2>
          <div className="bg-slate-950/50 rounded-lg p-6 text-slate-300 font-mono text-sm whitespace-pre-wrap">
{`Hi [Name], this is Vivek from Percepta Galaxy.

I noticed you're in [industry]. Your biggest threat is probably [competitor].

Here's the problem: You're checking their website every week manually.

Our AI does that daily. And predicts what they'll do next.

$399/month. No contracts. No long setup.

Can I show you what we found about [competitor's] next move in the next 2 weeks?

[If yes → book 15-min call]
[If no → "Got it. Mind if I send you a free report? Takes 30 seconds to set up."]`}
          </div>
        </div>

        {/* Free tools */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-white">🛠️ Free Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/free-tracker"
              className="block p-6 bg-slate-800/50 hover:bg-slate-800 border border-purple-500/20 rounded-lg transition"
            >
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-bold text-white mb-1">7-Day Free Competitor Report</div>
              <div className="text-sm text-slate-400">Get a free AI report on what your competitor is doing.</div>
            </Link>
            <Link
              href="/competitors/crayon"
              className="block p-6 bg-slate-800/50 hover:bg-slate-800 border border-purple-500/20 rounded-lg transition"
            >
              <div className="text-2xl mb-2">⚖️</div>
              <div className="font-bold text-white mb-1">Crayon Alternative</div>
              <div className="text-sm text-slate-400">See how we compare to the $15K/year enterprise tool.</div>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition"
          >
            Ready to Start? See Pricing →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Template({ title, subject, body }) {
  return (
    <div className="bg-slate-950/50 rounded-lg p-5 border border-purple-500/10">
      <div className="font-bold text-purple-400 mb-1">{title}</div>
      <div className="text-sm text-slate-500 mb-3">Subject: {subject}</div>
      <pre className="text-slate-300 whitespace-pre-wrap font-sans text-sm">{body}</pre>
    </div>
  );
}

function Script({ title, body }) {
  return (
    <div className="bg-slate-950/50 rounded-lg p-5 border border-purple-500/10">
      <div className="font-bold text-purple-400 mb-2">{title}</div>
      <pre className="text-slate-300 whitespace-pre-wrap font-sans text-sm">{body}</pre>
    </div>
  );
}
