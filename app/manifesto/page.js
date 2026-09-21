import Link from "next/link";

export const metadata = {
  title: "Manifesto",
  description: "Why we built Percepta Galaxy — for founders who want to WIN",
};

export default function ManifestoPage() {
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

      <article className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">Manifesto</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            This is
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Inevitable.
            </span>
          </h1>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-slate-200 leading-relaxed">
          <p className="text-2xl text-white font-light italic">
            "I'm calling people to help them WIN in their market.
            <br />
            They will pay me $400, $1,000, $5,000/month because I'm solving their biggest problem."
          </p>

          <Section title="The problem nobody solves">
            <p>
              Every founder knows their #1 competitor. That's not the problem.
            </p>
            <p>
              The problem is: you don't know what they'll do next month. What they'll launch. What they'll price. Who they'll hire.
            </p>
            <p>
              You're flying blind. Checking their website every week manually. Hoping you'll catch the change before your customers do.
            </p>
            <p className="text-purple-400 font-semibold">
              Hope is not a strategy.
            </p>
          </Section>

          <Section title="What we believe">
            <p>
              We believe founders deserve better than spreadsheets and gut feelings.
            </p>
            <p>
              We believe competitive intelligence shouldn't cost $15K/year or take 3 months to set up.
            </p>
            <p>
              We believe in <strong>DOMINANCE</strong>. Not the polite kind. The kind where you know what your competitor is going to do before they do it.
            </p>
          </Section>

          <Section title="What we built">
          <p>
              Percepta Galaxy. AI that watches your competitors 24/7. Daily reports. Predictive alerts before they move. In 5 minutes, not 3 months.
          </p>
          <p>
              $399/month. No contracts. No long setup. Cancel anytime.
          </p>
          </Section>

          <Section title="Who this is for">
            <p>This is for founders who want to WIN.</p>
            <p>Not the ones who want to "explore options" or "monitor the market."</p>
            <p>The ones who wake up thinking: <em>"What's [competitor] doing today?"</em></p>
            <p>If that's you, you're in the right place.</p>
          </Section>

          <Section title="Who this is NOT for">
            <p>This is not for enterprises with 50 competitors to track and 6-month sales cycles.</p>
            <p>This is not for people who want dashboards full of vanity metrics.</p>
            <p>This is not for people who say "I'll think about it."</p>
          </Section>

          <Section title="The math">
            <div className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-6 font-mono text-sm">
              <p>Month 1:  1 customer × $399  = $399/month</p>
              <p>Month 6: 15 customers × $399  = $5,985/month</p>
              <p>Month 12: 80 customers × $399 = $31,920/month</p>
              <p className="text-purple-400 mt-4">→ $383K ARR by end of year one</p>
            </div>
            <p>
              That's not a fantasy. That's what happens when you build something founders actually need and price it like you respect them.
            </p>
          </Section>

          <Section title="Every 'No' is one step closer to 'Yes'">
            <p>
              For every founder who says "not now," there's one who says "where do I sign?"
            </p>
            <p>
              By the end of year one, this company will be built on $32K/month of recurring revenue — not because we chased investors, but because we solved a real problem for real people.
            </p>
          </Section>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8 my-12 text-center">
            <p className="text-2xl font-bold text-white mb-4">
              I'm not asking for money.
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              I'm offering DOMINANCE.
            </p>
            <Link
              href="/pricing"
              className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              See the Pricing →
            </Link>
          </div>

          <Section title="Why this works">
            <p>The companies charging $15K/year for competitive intelligence are solving an enterprise problem.</p>
            <p>But 95% of founders don't need enterprise. They need <strong>simple, actionable, fast</strong>.</p>
            <p>That's the gap. That's where we live.</p>
          </Section>

          <div className="text-center pt-12">
            <p className="text-slate-400 italic">— Vivek, founder of Percepta Galaxy</p>
            <p className="text-slate-500 text-sm mt-2">Built by founders, for founders.</p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2026 Percepta Galaxy. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="text-slate-400 hover:text-purple-400 transition">Terms</Link>
            <Link href="/privacy" className="text-slate-400 hover:text-purple-400 transition">Privacy</Link>
            <Link href="/manifesto" className="text-slate-400 hover:text-purple-400 transition">Manifesto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-l-2 border-purple-500/30 pl-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
