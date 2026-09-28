import Link from "next/link";

export const metadata = {
  title: "30-Day Launch Playbook | Percepta Galaxy",
  description: "The exact steps we used to launch Percepta Galaxy and get our first 10 customers.",
  robots: { index: false, follow: false }, // Hide from search but keep accessible
};

export default function PlaybookPage() {
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

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-invert prose-lg">
        <h1 className="text-5xl font-bold mb-4">30-Day Launch Playbook</h1>
        <p className="text-slate-400 mb-2">Last updated: September 28, 2026</p>
        <p className="text-slate-300 mb-12">
          The exact steps we're using to launch Percepta Galaxy. We share it because <strong>we'd rather build in public and learn fast</strong> than keep secrets.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">🎯 Goal</h2>
        <p>
          <strong>Get 10 paying customers in 30 days</strong> at $399/month.
          <br />
          That's <strong>$3,990 MRR</strong> by day 30.
        </p>
        <p>If we hit it: keep going. If we miss it, double down on what's working.</p>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">📊 Assumptions</h2>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li><strong>Target audience</strong>: SaaS founders, 1-50 employees, India-first then US/EU</li>
          <li><strong>Budget</strong>: $0 (just time + free tools)</li>
          <li><strong>Team</strong>: 1 person (Vivek, founder)</li>
          <li><strong>Channels we're betting on</strong>: Cold outreach (LinkedIn/email) + content (Twitter/blog)</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">📅 Week 1: Foundation (Days 1-7)</h2>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 1-2: Set up outbound</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Sign up for <strong>Apollo.io</strong> free tier → 10K credits/month</li>
          <li>Build lead list: 200 Indian SaaS founders (Series A/B, FinTech, D2C, EdTech)</li>
          <li>Verify emails using Apollo's email finder</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 3-4: Write 3 cold emails</h3>
        <ol className="list-decimal pl-6 my-3 space-y-2">
          <li><strong>Observation email</strong>: "Saw [competitor] just changed pricing..."</li>
          <li><strong>Question email</strong>: "How do you track what your top competitor does?"</li>
          <li><strong>Case study email</strong>: "How [similar founder] predicts competitor moves"</li>
        </ol>
        <p>Each email should be ≤ 80 words. One ask per email. No fake flattery.</p>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 5-7: First 50 outreach</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Send 10 cold emails/day to Indian SaaS founders</li>
          <li>Send 5 LinkedIn DMs/day (different message than email)</li>
          <li>Track: open rate (target 50%+), reply rate (target 5-10%)</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">📅 Week 2: Iteration (Days 8-14)</h2>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 8-10: Post-launch outreach</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Reply to anyone who responded to week 1</li>
          <li>Book 15-min calls (aim: 5 booked)</li>
          <li>Iterate email based on reply patterns</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 11-14: Content launch</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Post blog articles to <strong>LinkedIn</strong> + <strong>Twitter</strong> (1 post/day)</li>
          <li>Each post = a competitor insight + a CTA to Percepta Galaxy</li>
          <li>Engage with comments (every reply = a potential customer)</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">📅 Week 3: Conversion (Days 15-21)</h2>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 15-17: First customer wins</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Convert booked calls → trials</li>
          <li>Convert trials → paid (offer annual discount if needed)</li>
          <li>Send weekly update emails to all signups</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 18-21: Public launch</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Submit to <strong>Product Hunt</strong> (Tuesday/Wednesday are best)</li>
          <li>Submit to <strong>Hacker News</strong> (Show HN)</li>
          <li>Submit to <strong>BetaList</strong></li>
          <li>Post on LinkedIn/Twitter with launch announcement</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">📅 Week 4: Scale (Days 22-30)</h2>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 22-25: Double down</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Identify your best channel from weeks 1-3 (outbound vs content vs Product Hunt)</li>
          <li>Cut the losers, scale the winners</li>
          <li>Add 1 more channel (could be: paid ads, partnerships, podcast guesting)</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3 text-white">Day 26-30: Hit 10 customers</h3>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>If short: enable paid ads ($100-300 budget)</li>
          <li>Build referral incentive: $50 off for both referrer + referee</li>
          <li>Post-mortem: which channels worked? which didn't?</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">📈 Metrics to track daily</h2>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li><strong>Outbound</strong>: emails sent, open rate, reply rate, calls booked</li>
          <li><strong>Content</strong>: impressions, link clicks, signups attributed</li>
          <li><strong>Product</strong>: signups, trials started, conversions, MRR</li>
          <li><strong>Customer</strong>: NPS, churn, expansion revenue</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">🛑 What NOT to do</h2>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>Don't spend $1K on Google Ads week 1 (wait until you have product-market fit signal)</li>
          <li>Don't send 100 emails from a brand-new domain (your sender reputation dies)</li>
          <li>Don't build features no one asked for ("we don't have a customer success problem")</li>
          <li>Don't pitch reporters with "Hey, I built this cool thing" — pitch a story</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">💰 Budget breakdown ($0 total)</h2>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li><strong>Apollo.io</strong>: free (10K credits/mo)</li>
          <li><strong>Resend</strong>: free (100 emails/day)</li>
          <li><strong>Vercel + Neon DB</strong>: free tier</li>
          <li><strong>Canva</strong>: free (for graphics)</li>
          <li><strong>GitHub</strong>: free (for code)</li>
          <li><strong>Product Hunt</strong>: free to submit</li>
          <li>Total spent: $0</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-white">🎯 Success criteria (Day 30)</h2>
        <ul className="list-disc pl-6 my-3 space-y-2">
          <li>10 paying customers</li>
          <li>$3,990 MRR</li>
          <li>200+ signups (free or paid)</li>
          <li>NPS score &gt; 50</li>
          <li>1 piece of content with 1K+ views</li>
        </ul>

        <p className="mt-12 text-slate-400 italic">
          This playbook is a living document. We update it weekly based on what's working.
        </p>

        <div className="mt-16 pt-8 border-t border-purple-500/20 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
          >
            ← Back to Percepta Galaxy
          </Link>
        </div>
      </article>
    </div>
  );
}
