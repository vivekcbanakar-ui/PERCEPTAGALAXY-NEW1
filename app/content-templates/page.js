import Link from "next/link";
import dynamic from "next/dynamic";

const TemplatesList = dynamic(() => import("./TemplatesList"), { ssr: false });

export const metadata = {
  title: "Content Templates | Percepta Galaxy",
  description: "30 ready-to-post content templates for Twitter and LinkedIn. For SaaS founders building in public.",
  robots: { index: false, follow: false },
};

export default function ContentTemplatesPage() {
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
      <TemplatesList />
    </div>
  );
}

const TEMPLATES = {
  twitter: [
    {
      title: "Competitor insight (the hook)",
      template: `🚨 [Competitor] just changed [pricing/features/messaging].

What this means:
• [Implication 1]
• [Implication 2]
• [What we should expect next]

If you're building in [niche], this matters.
Track changes like this automatically →`,
    },
    {
      title: "Build in public",
      template: `Just hit [milestone]:

→ [# customers]
→ $[MRR]
→ [# users]
→ [# competitors tracked]

Building in public is brutal and worth it.
Every "no" is one step closer to "yes."

What's your current milestone?`,
    },
    {
      title: "Customer win",
      template: `[Founder name] uses Percepta Galaxy to track their #1 competitor.

Caught a [type] change in [time] that would've taken them [longer time] manually.

That's the value: speed of insight.

If you're tracking competitors, you're already losing by [typical delay] of weeks.
Here's the link →`,
    },
    {
      title: "Tactical insight (educational)",
      template: `5 signs your competitor is about to launch something:

1. [Signal 1]
2. [Signal 2]
3. [Signal 3]
4. [Signal 4]
5. [Signal 5]

If you see 3+ of these at once → launch is close.

(Full breakdown with examples → in comments)`,
    },
    {
      title: "Industry observation",
      template: `Something I keep noticing in [industry]:

[Observation 1]

[Observation 2]

The pattern?

[Pattern]

Most founders ignore this. The ones who don't [outcome].`,
    },
    {
      title: "Pricing reveal",
      template: "Hot take: most SaaS pricing is fake.\n\n[Company 1]: $X/mo for Y. Competitor: $X*10/mo for Y/10.\n\nReality: marginal cost ≈ $0 for software.\n\nWe're $399/mo flat. No enterprise tier. No 'contact us.'\n\nWorking. [$MRR] MRR after [#] customers.",
    },
    {
      title: "Founder pain point",
      template: "Unpopular opinion: most founder advice is wrong.\n\n[Specific example]\n\nThe actual answer is simpler:\n\n[Real answer]\n\nNo MBA required. Just [specific action].",
    },
    {
      title: "Behind the scenes (build in public)",
      template: "Building Percepta Galaxy update:\n\nDay [#]:\n→ Shipped: [feature]\n→ Revenue: $[X]\n→ Users: [#]\n→ Insights discovered: [X]\n→ Customer feedback: '[quote]'\n\nThis is the loop. Ship. Sell. Listen. Iterate.",
    },
    {
      title: "Question / engagement bait",
      template: "Honest question for SaaS founders:\n\nHow often do you check your #1 competitor's site?\n\n🅰️ Daily\n🅱️ Weekly\n🅲 Never\n🅳 When they post on LinkedIn\n\nNo wrong answer. Just curious. (I'll share results tomorrow)",
    },
    {
      title: "Mistake / failure post",
      template: "Failed: [thing] this week.\n\nWhat I tried:\n[Steps]\n\nWhat went wrong:\n[Reason]\n\nWhat I'm doing instead:\n[Fix]\n\nBuild in public = share the L's too. More useful than wins.",
    },
  ],
  linkedin: [
    {
      title: "Long-form founder story",
      template: `I was checking my #1 competitor's website every Monday morning.

Manually. Like everyone else.

For 3 months, I missed:
• A pricing change
• A feature launch
• A pivot to enterprise

I finally snapped and built something: Percepta Galaxy.

It watches competitor sites daily. AI tells me what they did. Predicts what they'll do.

3 months from idea → $X MRR.

Here's what I learned shipping this:

→ Manual is fine for 1 competitor. Past 1, you miss things.
→ Most "AI" tools are actually just change detection. Real AI predicts strategy.
→ Founders don't care about data. They care about ACTIONABLE insight.
→ Cheaper isn't better. Faster is.

We're $399/month. No contracts. 5-min setup. Built for founders who want to WIN, not analysts who want dashboards.

If you're checking competitor sites manually, you're losing by 2-3 weeks every time.

Check it out →`,
    },
    {
      title: "Industry insight (longer)",
      template: `Spent the morning looking at 50 Indian SaaS companies. Here's what I noticed:

[Insight 1 with example]

[Insight 2 with example]

[Insight 3 with example]

The pattern?

[Pattern from observations]

[What it means for founders]

If you're building in this space, your move should be [actionable step].`,
    },
    {
      title: "How-to guide",
      template: `How to track your #1 competitor in 30 minutes (without expensive tools):

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step 4]
5. [Step 5]

Or:

[Step 1]
[Step 2]
[Step 3]
[Step 4]
[Step 5]

(Full guide in comments)

This is the framework behind [your product/service]. Took us [time] to figure out. Free for you.`,
    },
    {
      title: "Hot take",
      template: `Hot take: CRM tools are mostly useless for early-stage SaaS.

[Reason 1]
[Reason 2]
[Reason 3]

The founders I talk to say the same thing. They have HubSpot. They don't use it. They have Salesforce. They use spreadsheets.

The real CRM is: LinkedIn + email + a notes file.

[Counter-take / nuance / when CRM matters]

What's your stack for tracking customer relationships?`,
    },
    {
      title: "Customer story",
      template: `[Founder name] has been a customer for [X weeks].

Before us:
- Checked competitor weekly
- Manual pricing research
- No alerts
- Missed 3 launches

After us:
- Daily AI insights
- Caught [type] change in [time]
- Got heads-up on [specific insight]
- [Specific outcome — e.g., "Updated pricing in time for renewal cycle"]

That's the difference between guessing and knowing.

If you're tracking competitors manually, you're losing.

[link]`,
    },
  ],
};

export default function ContentTemplates() {
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
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              15 Content Templates
            </span>
            <br />
            for SaaS Founders
          </h1>
          <p className="text-xl text-slate-300">
            Copy-paste prompts for Twitter + LinkedIn. Build in public, get customers.
          </p>
        </div>

        {/* Twitter */}
        <h2 className="text-3xl font-bold mb-6 text-purple-400">🐦 Twitter Templates</h2>
        <div className="space-y-4 mb-12">
          {TEMPLATES.twitter.map((t, i) => (
            <div key={i} className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-6">
              <div className="text-sm text-purple-400 mb-2">{t.title}</div>
              <pre className="text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">{t.template}</pre>
              <button
                onClick={() => navigator.clipboard?.writeText(t.template)}
                className="mt-3 text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded font-bold transition"
              >
                📋 Copy
              </button>
            </div>
          ))}
        </div>

        {/* LinkedIn */}
        <h2 className="text-3xl font-bold mb-6 text-pink-400">💼 LinkedIn Templates</h2>
        <div className="space-y-4 mb-12">
          {TEMPLATES.linkedin.map((t, i) => (
            <div key={i} className="bg-slate-900/60 border border-pink-500/20 rounded-lg p-6">
              <div className="text-sm text-pink-400 mb-2">{t.title}</div>
              <pre className="text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">{t.template}</pre>
              <button
                onClick={() => navigator.clipboard?.writeText(t.template)}
                className="mt-3 text-xs px-3 py-1 bg-pink-600 hover:bg-pink-700 rounded font-bold transition"
              >
                📋 Copy
              </button>
            </div>
          ))}
        </div>

        {/* Strategy */}
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">📊 Posting cadence</h3>
          <ul className="space-y-2 text-slate-200">
            <li>• <strong>Twitter</strong>: 1-3 posts/day for first 30 days</li>
            <li>• <strong>LinkedIn</strong>: 1 post every 2-3 days (LinkedIn rewards consistency)</li>
            <li>• <strong>Best times</strong>: Twitter 8am/12pm/5pm, LinkedIn 9am Tue-Thu</li>
            <li>• <strong>Reply to every comment</strong> within 1 hour = algorithm boost</li>
            <li>• <strong>Mix 70/30</strong>: 70% value posts, 30% your product</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
