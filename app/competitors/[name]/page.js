import Link from "next/link";

const COMPETITORS = {
  crayon: {
    name: "Crayon",
    tagline: "Enterprise competitive intelligence platform",
    pricing: "$15K+/year",
    setup: "2-3 months",
    founded: "2015",
    hq: "Boston, USA",
    description:
      "Crayon is the legacy leader in competitive intelligence. Built for Fortune 500s with 50+ competitors to track and 6-month sales cycles.",
    problems: [
      "Takes 2-3 months to fully set up",
      "Costs $15K+/year — way too expensive for early-stage SaaS",
      "Complex dashboards with hundreds of features you'll never use",
      "Annual contract required, no month-to-month option",
      "Built for enterprise sales teams, not solo founders",
    ],
    quote: {
      text: "We spent $200K implementing Crayon and only 2 of our 10 sales reps actually used it.",
      author: "VP of Sales, B2B SaaS",
    },
    comparison: [
      ["Setup time", "2-3 months", "5 minutes"],
      ["Monthly cost", "$1,250+", "$399"],
      ["Contract", "Annual required", "Cancel anytime"],
      ["AI predictions", "No", "Yes — core feature"],
      ["Built for", "Enterprise teams", "Solo founders"],
      ["Free trial", "Demo only", "7 days, no card"],
    ],
    color: "from-blue-500 to-indigo-600",
  },
  klue: {
    name: "Klue",
    tagline: "Mid-market competitive enablement platform",
    pricing: "$10K+/year",
    setup: "1-2 months",
    founded: "2015",
    hq: "Vancouver, Canada",
    description:
      "Klue focuses on sales enablement — helping sales teams battle competitors in deals. Mid-market sweet spot, but still expensive for early-stage SaaS companies.",
    problems: [
      "Sales-focused, not founder-focused",
      "$10K+/year is out of reach for most early-stage founders",
      "Requires buy-in from your entire sales team",
      "Less useful for product and marketing teams",
      "Locked into annual contracts",
    ],
    quote: {
      text: "Klue was great for our 50-person sales team. Completely impractical when we were 5 people.",
      author: "Founder, Series A SaaS",
    },
    comparison: [
      ["Setup time", "1-2 months", "5 minutes"],
      ["Monthly cost", "$833+", "$399"],
      ["Contract", "Annual required", "Cancel anytime"],
      ["AI predictions", "Basic", "Advanced — strategic"],
      ["Built for", "Sales teams", "Founders & small teams"],
      ["Free trial", "Demo only", "7 days, no card"],
    ],
    color: "from-teal-500 to-cyan-600",
  },
  kompyte: {
    name: "Kompyte",
    tagline: "Automated competitor tracking with AI",
    pricing: "$5K-$15K/year",
    setup: "2-4 weeks",
    founded: "2016",
    hq: "Barcelona, Spain",
    description:
      "Kompyte uses AI to track competitor changes automatically. Mid-market positioning, more accessible than Crayon but still pricey for solo founders.",
    problems: [
      "Still $5K+/year minimum — expensive for startups",
      "Limited AI insights (mostly basic change detection)",
      "No founder-specific strategic analysis",
      "Annual contracts lock you in",
      "Alert fatigue — too many notifications, not enough insight",
    ],
    quote: {
      text: "Kompyte told me 47 things changed on competitor.com last month. I still didn't know what it meant for my business.",
      author: "Indie Founder",
    },
    comparison: [
      ["Setup time", "2-4 weeks", "5 minutes"],
      ["Monthly cost", "$417-$1,250", "$399"],
      ["Contract", "Annual required", "Cancel anytime"],
      ["AI predictions", "Basic alerts", "Strategic predictions"],
      ["Insight quality", "Change notifications", "Actionable analysis"],
      ["Free trial", "14 days", "7 days, no card"],
    ],
    color: "from-orange-500 to-red-600",
  },
  owler: {
    name: "Owler",
    tagline: "Crowdsourced competitor intelligence",
    pricing: "Free / $360+/year",
    setup: "Instant",
    founded: "2013",
    hq: "San Francisco, USA",
    description:
      "Owler offers basic competitor info through crowdsourced data. Good for surface-level research, not deep strategic intelligence for SaaS founders.",
    problems: [
      "Data quality is inconsistent (crowdsourced — anyone can contribute wrong info)",
      "No AI predictions or strategic analysis",
      "Limited to public, surface-level data",
      "Not actionable for founders making product decisions",
      "Free tier is very limited; paid is still basic",
    ],
    quote: {
      text: "Owler gave me revenue estimates that were off by 10x. I can't build strategy on bad data.",
      author: "Founder, $50K MRR SaaS",
    },
    comparison: [
      ["Data quality", "Crowdsourced — variable", "Primary source scraping"],
      ["AI predictions", "No", "Yes — GPT-powered"],
      ["Pricing intelligence", "Limited", "Deep detection"],
      ["Founded for", "General research", "SaaS founders"],
      ["Monthly cost", "$0-$30", "$399"],
      ["Free trial", "Free tier", "7 days, no card"],
    ],
    color: "from-yellow-500 to-orange-600",
  },
  semrush: {
    name: "SEMrush",
    tagline: "SEO and digital marketing intelligence",
    pricing: "$130-$500/month",
    setup: "30 minutes",
    founded: "2008",
    hq: "Boston, USA",
    description:
      "SEMrush is primarily an SEO tool with competitor research features. Powerful for marketing teams, but limited for SaaS competitive intelligence.",
    problems: [
      "Focused on SEO and marketing data only",
      "No product or pricing intelligence",
      "No AI predictions about competitor moves",
      "Doesn't cover offline competitor strategy",
      "Too broad — not built specifically for SaaS founders",
    ],
    quote: {
      text: "SEMrush tells me their keyword rankings. Percepta Galaxy tells me what they're building next. Totally different tools.",
      author: "SaaS Founder",
    },
    comparison: [
      ["Focus", "SEO & marketing", "Product & pricing intelligence"],
      ["AI predictions", "No", "Yes"],
      ["Pricing detection", "No", "Yes — deep"],
      ["Built for", "Marketing teams", "SaaS founders"],
      ["Monthly cost", "$130-$500", "$399"],
      ["Free trial", "14 days", "7 days, no card"],
    ],
    color: "from-orange-500 to-amber-600",
  },
  sproutsocial: {
    name: "Sprout Social",
    tagline: "Social media competitor analysis",
    pricing: "$249-$499/month",
    setup: "1 hour",
    founded: "2010",
    hq: "Chicago, USA",
    description:
      "Sprout Social tracks social media activity of competitors. Good for social media managers, but doesn&apos;t cover the product and pricing intelligence that matters most.",
    problems: [
      "Social media only — doesn't cover product or pricing changes",
      "$249+/month for a narrow feature set",
      "No strategic AI predictions",
      "Not built for SaaS competitive intelligence",
      "Overkill if you don't need full social management",
    ],
    quote: {
      text: "I got fired because I was using Sprout Social for competitive intel instead of actual competitor product tracking. Big mistake.",
      author: "Former Head of Growth",
    },
    comparison: [
      ["Coverage", "Social media only", "Full site — product + pricing"],
      ["AI predictions", "No", "Yes"],
      ["Pricing detection", "No", "Yes"],
      ["Monthly cost", "$249-$499", "$399"],
      ["Setup time", "1 hour", "5 minutes"],
      ["Free trial", "30 days", "7 days, no card"],
    ],
    color: "from-pink-500 to-rose-600",
  },
  visualping: {
    name: "Visualping",
    tagline: "Simple website change detection",
    pricing: "Free / $50+/month",
    setup: "2 minutes",
    founded: "2015",
    hq: "San Francisco, USA",
    description:
      "Visualping alerts you when competitor websites change. Cheap and simple, but provides zero analysis — you just get raw notifications.",
    problems: [
      "No AI analysis — just raw change alerts",
      "You still have to interpret every change yourself",
      "No strategic predictions",
      "Becomes noise when tracking multiple competitors",
      "Good for tech-savvy individuals, not for busy founders",
    ],
    quote: {
      text: "I got 312 alerts from Visualping last month. I opened maybe 3. The rest were noise.",
      author: "Solo SaaS Founder",
    },
    comparison: [
      ["AI analysis", "None — raw alerts only", "GPT-powered insights"],
      ["Predictions", "No", "Yes — what they'll do next"],
      ["Signal vs noise", "Everything alerts", "Only meaningful changes"],
      ["Monthly cost", "$0-$50", "$399"],
      ["Founder-friendly", "No — manual", "Yes — automated insights"],
      ["Free trial", "5 pages/day free", "7 days full access"],
    ],
    color: "from-violet-500 to-purple-600",
  },
};

export async function generateStaticParams() {
  return Object.keys(COMPETITORS).map((name) => ({ name }));
}

export async function generateMetadata({ params }) {
  const competitor = COMPETITORS[params.name];
  if (!competitor) return { title: "Competitor not found" };

  return {
    title: `${competitor.name} Alternatives for SaaS Founders | Percepta Galaxy`,
    description: `Looking for a ${competitor.name} alternative? Percepta Galaxy gives founders AI-powered competitor intelligence at $399/month vs ${competitor.pricing}. 5-minute setup.`,
  };
}

export default function CompetitorPage({ params }) {
  const competitor = COMPETITORS[params.name];

  if (!competitor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Competitor not found</h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300">← Back home</Link>
        </div>
      </div>
    );
  }

  const competitorKey = params.name;
  const otherCompetitors = Object.entries(COMPETITORS).filter(([key]) => key !== competitorKey);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <div className="flex gap-4">
            <Link href="/free-tracker" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition text-sm">
              Free Analysis →
            </Link>
            <Link href="/" className="px-4 py-2 hover:text-purple-400 transition text-sm">← Back</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className={`inline-block px-4 py-1 bg-gradient-to-r ${competitor.color} rounded-full text-white text-sm font-semibold mb-4 opacity-80`}>
            {competitor.tagline}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {competitor.name} vs<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Percepta Galaxy
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {competitor.description}
          </p>
          <div className="flex justify-center gap-6 mt-6 text-sm text-slate-400">
            <span>Founded: {competitor.founded}</span>
            <span>HQ: {competitor.hq}</span>
            <span>Setup: {competitor.setup}</span>
          </div>
        </div>

        {/* Comparison table */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-3 bg-gradient-to-r from-purple-900/60 to-pink-900/60 px-6 py-5 font-bold">
            <div className="text-slate-300">Feature</div>
            <div className="text-slate-300">{competitor.name}</div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
              Percepta Galaxy
            </div>
          </div>
          {competitor.comparison.map(([feature, them, us], i) => (
            <div
              key={feature}
              className={`grid grid-cols-3 px-6 py-4 ${
                i % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"
              } ${i === competitor.comparison.length - 1 ? "border-t border-purple-500/10" : ""}`}
            >
              <div className="text-slate-300 font-medium">{feature}</div>
              <div className="text-slate-400">{them}</div>
              <div className="text-white font-semibold">{us}</div>
            </div>
          ))}
        </div>

        {/* Why founders switch */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Why founders leave {competitor.name}
            </h2>
            <ul className="space-y-4">
              {competitor.problems.map((problem, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 shrink-0">✗</span>
                  <span className="text-slate-300">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            {/* Quote */}
            <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8">
              <div className="text-4xl text-purple-400 mb-3">&ldquo;</div>
              <p className="text-slate-200 text-lg italic leading-relaxed mb-4">
                {competitor.quote.text}
              </p>
              <p className="text-slate-400 text-sm">— {competitor.quote.author}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-purple-400">{competitor.pricing}</div>
                <div className="text-sm text-slate-400 mt-1">Their pricing</div>
              </div>
              <div className="bg-slate-900/60 border border-green-500/20 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-green-400">$399/mo</div>
                <div className="text-sm text-slate-400 mt-1">Percepta Galaxy</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Link
            href="/free-tracker"
            className="block px-6 py-5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-center transition"
          >
            <div className="font-bold text-white mb-1">🔍 Get Free Analysis</div>
            <div className="text-sm text-slate-400">See what we find for your competitor in 60 seconds</div>
          </Link>
          <Link
            href="/pricing"
            className="block px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-center transition"
          >
            <div className="font-bold text-white mb-1">Start Free Trial →</div>
            <div className="text-sm text-purple-100">14 days free, no card needed</div>
          </Link>
        </div>

        {/* Other competitors */}
        <div className="mt-12">
          <h3 className="text-lg font-bold mb-4 text-white">Other alternatives we beat</h3>
          <div className="flex flex-wrap gap-2">
            {otherCompetitors.map(([key, comp]) => (
              <Link
                key={key}
                href={`/competitors/${key}`}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition hover:border-purple-500/50"
              >
                {comp.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
