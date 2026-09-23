import Link from "next/link";

// Top SaaS competitors Indian founders worry about.
// Each page ranks for "[name] alternatives" search queries.
const COMPETITORS = {
  crayon: {
    name: "Crayon",
    tagline: "Enterprise competitive intelligence platform",
    pricing: "$15K+/year, 2-3 month setup",
    founded: "2015",
    hq: "Boston, USA",
    description:
      "Crayon is the legacy leader in competitive intelligence. Built for Fortune 500s with 50+ competitors to track and 6-month sales cycles. Comprehensive dashboards for enterprise teams.",
    problems: [
      "Takes 2-3 months to set up",
      "Costs $15K+/year — overkill for most founders",
      "Complex dashboards with hundreds of features you don't need",
      "Annual contract required, no month-to-month option",
      "Built for enterprise teams, not solo founders",
    ],
  },
  klue: {
    name: "Klue",
    tagline: "Mid-market competitive enablement",
    pricing: "$10K+/year, 1-2 month setup",
    founded: "2015",
    hq: "Vancouver, Canada",
    description:
      "Klue focuses on sales enablement — helping sales teams battle competitors in deals. Mid-market sweet spot, but still expensive for early-stage SaaS companies.",
    problems: [
      "Sales-focused, not founder-focused",
      "$10K+/year still expensive",
      "Requires buy-in from sales team",
      "Less useful for product/marketing teams",
      "Annual contracts",
    ],
  },
  "kompyte": {
    name: "Kompyte",
    tagline: "Automated competitor tracking",
    pricing: "$5K-$15K/year",
    founded: "2016",
    hq: "Barcelona, Spain",
    description:
      "Kompyte uses AI to track competitor changes automatically. Mid-market positioning, more accessible than Crayon but still pricey for solo founders.",
    problems: [
      "Still $5K+/year minimum",
      "Limited AI insights (mostly change detection, no predictions)",
      "No founder-focused features",
      "Annual contracts",
    ],
  },
  owler: {
    name: "Owler",
    tagline: "Free basic competitor data",
    pricing: "Free / $360+/year for premium",
    founded: "2013",
    hq: "San Francisco, USA",
    description:
      "Owler offers basic competitor info with crowdsourced data. Good for surface-level research, not deep strategic intelligence.",
    problems: [
      "Data quality varies (crowdsourced)",
      "No AI predictions",
      "Limited to public data",
      "Not actionable for founders",
    ],
  },
  semrush: {
    name: "SEMrush",
    tagline: "SEO + competitor research",
    pricing: "$130-$500/month",
    founded: "2008",
    hq: "Boston, USA",
    description:
      "SEMrush is primarily an SEO tool with competitor research features. Good for marketing teams but limited to digital marketing data.",
    problems: [
      "Limited to SEO/marketing data",
      "No product/pricing intelligence",
      "No AI predictions",
      "Doesn't track offline competitor moves",
    ],
  },
  sproutsocial: {
    name: "Sprout Social",
    tagline: "Social media competitor tracking",
    pricing: "$249-$499/month",
    founded: "2010",
    hq: "Chicago, USA",
    description:
      "Sprout Social tracks social media activity of competitors. Good for social media managers but doesn't cover product or pricing changes.",
    problems: [
      "Social media only",
      "No product/pricing intelligence",
      "Expensive for what it does",
    ],
  },
  visualping: {
    name: "Visualping",
    tagline: "Website change detection",
    pricing: "Free / $50+/month",
    founded: "2015",
    hq: "San Francisco, USA",
    description:
      "Visualping alerts you when competitor websites change. Cheap and simple, but no AI interpretation — you just get notified.",
    problems: [
      "No AI analysis — just raw change alerts",
      "Manual interpretation needed",
      "No predictions",
      "Becomes noise at scale",
    ],
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
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-purple-400 text-sm uppercase tracking-widest mb-4">
            {competitor.tagline}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Looking for a <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {competitor.name} alternative?
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {competitor.description}
          </p>
        </div>

        {/* Why founders switch */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Why founders switch from {competitor.name}
          </h2>
          <ul className="space-y-3">
            {competitor.problems.map((problem, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <span className="text-slate-300">{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Comparison */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-3 bg-purple-900/40 px-6 py-4 font-bold">
            <div></div>
            <div className="text-slate-400">{competitor.name}</div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Percepta Galaxy
            </div>
          </div>
          {[
            ["Price", competitor.pricing, "$399/month"],
            ["Setup time", "2-3 months", "5 minutes"],
            ["Contract", "Annual required", "Cancel anytime"],
            ["AI predictions", "Limited", "Core feature"],
            ["Built for", "Enterprise teams", "Founders"],
          ].map(([feature, them, us], i) => (
            <div
              key={feature}
              className={`grid grid-cols-3 px-6 py-4 ${
                i % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"
              }`}
            >
              <div className="text-slate-300 font-medium">{feature}</div>
              <div className="text-slate-400">{them}</div>
              <div className="text-white font-semibold">{us}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/free-tracker"
            className="block px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-center transition"
          >
            <div className="font-bold text-white mb-1">Try free for 7 days</div>
            <div className="text-sm text-slate-400">Get a free competitor report</div>
          </Link>
          <Link
            href="/pricing"
            className="block px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-center transition"
          >
            <div className="font-bold text-white mb-1">Start $399/month trial →</div>
            <div className="text-sm text-purple-100">14 days free, no card needed</div>
          </Link>
        </div>

        {/* Other competitors */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4 text-white">Other alternatives we beat</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(COMPETITORS)
              .filter(([key]) => key !== params.name)
              .map(([key, comp]) => (
                <Link
                  key={key}
                  href={`/competitors/${key}`}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition"
                >
                  {comp.name} alternative →
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
