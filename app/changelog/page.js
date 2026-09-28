import Link from "next/link";

export const metadata = {
  title: "Changelog | Percepta Galaxy",
  description: "What we shipped. Updated weekly. Built in public.",
};

const ENTRIES = [
  {
    date: "2026-09-28",
    version: "v0.6.0",
    title: "AI competitor tracking goes live",
    items: [
      "🔍 Real URL scraper + change detection",
      "🤖 AI insight generation (heuristic + OpenAI fallback)",
      "📊 Dashboard 'Track Now' button per competitor",
      "💾 Snapshot history + insight timeline",
      "👥 Affiliate/referral system ($50/mo per signup)",
      "📝 3 SEO blog posts + structured data (JSON-LD)",
      "🚀 Launch page + 30-day playbook published",
    ],
  },
  {
    date: "2026-09-25",
    version: "v0.5.0",
    title: "Marketing & content machine",
    items: [
      "📰 Blog system with rich markdown renderer",
      "⭐ 3 testimonial cards on homepage",
      "🔗 JSON-LD structured data for Google rich results",
      "📋 RSS-style sitemap with 30+ URLs",
      "💼 Sales assets: cold email templates, cold call script, LinkedIn scripts",
      "📄 /for-founders landing page (cold outreach target)",
    ],
  },
  {
    date: "2026-09-22",
    version: "v0.4.0",
    title: "Customer-ready plumbing",
    items: [
      "💳 Razorpay LIVE payments ($99/$399/$999)",
      "📦 Neon Postgres database wired with Drizzle ORM",
      "🔐 Email magic-link login via Resend",
      "📊 Admin dashboard (leads + users + MRR)",
      "🚦 Plan-based limits: 1/3/10 competitors per tier",
      "📧 Lead capture persists to DB",
    ],
  },
  {
    date: "2026-09-19",
    version: "v0.3.0",
    title: "Auth + auth providers",
    items: [
      "🔐 Google + GitHub OAuth login",
      "🎨 New pricing page ($99/$399/$999)",
      "📜 Terms + Privacy + Manifesto pages",
      "🛡️ Security headers (HSTS, X-Frame-Options)",
      "🗺️ SEO sitemap + robots.txt",
    ],
  },
  {
    date: "2026-09-17",
    version: "v0.1.0",
    title: "Project launched",
    items: [
      "🚀 First deploy to Vercel",
      "📁 Files pushed from local to GitHub",
      "💻 Project structure: Next.js 14 + App Router + TypeScript",
      "🎨 Tailwind + dark theme",
    ],
  },
];

export default function ChangelogPage() {
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

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Changelog</h1>
          <p className="text-xl text-slate-300">
            What we shipped. Updated weekly. <span className="text-purple-400">Built in public.</span>
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Subscribe: <a href="/free-tracker" className="text-purple-400 hover:text-purple-300">RSS / email</a>
          </p>
        </div>

        <div className="space-y-8">
          {ENTRIES.map((entry, i) => (
            <div key={i} className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-purple-300 text-xs font-bold">
                  {entry.version}
                </span>
                <span className="text-slate-400 text-sm">{entry.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">{entry.title}</h2>
              <ul className="space-y-2">
                {entry.items.map((item, j) => (
                  <li key={j} className="text-slate-300 pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          Full commit history: <a href="https://github.com/vivekcbanakar-ui/perceptagalaxy/commits/main" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">
            github.com/vivekcbanakar-ui/perceptagalaxy
          </a>
        </div>
      </section>
    </div>
  );
}
