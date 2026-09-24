import Link from "next/link";
import { useState } from "react";

export const metadata = {
  title: "FAQ | Percepta Galaxy",
  description: "Common questions about Percepta Galaxy's AI competitor intelligence platform.",
};

const FAQS = [
  {
    q: "What exactly does Percepta Galaxy track?",
    a: "We monitor your competitor's website, pricing page, changelog, blog, job postings, social media, and public footprint — 24/7. AI summarizes changes and predicts their next move.",
  },
  {
    q: "How is this different from Crayon or Klue?",
    a: "Those tools are built for enterprises with 6-month sales cycles and $15K+/year budgets. We're built for founders who want to WIN — $399/month, 5-minute setup, no annual contract.",
  },
  {
    q: "How accurate are the AI predictions?",
    a: "Predictions are based on patterns from your competitor's behavior over the last 90 days — pricing changes, hiring trends, product launches, content cadence. The longer you use us, the better the predictions get.",
  },
  {
    q: "Do you need access to my competitor's private data?",
    a: "No. We only track publicly available data — their website, pricing, blog, public social posts, job listings. Anything you could find with Google, but automated.",
  },
  {
    q: "What if my competitor changes their strategy?",
    a: "Our AI detects strategy shifts within 24-48 hours and alerts you. We also re-baseline our predictions based on new behavior.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. 7-day free report with no credit card. 14-day free trial on all paid plans.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Month-to-month. Cancel from your dashboard. No questions, no retention calls.",
  },
  {
    q: "Do you support multiple competitors?",
    a: "Yes. Starter = 1 competitor, Growth = 3, Scale = 10. Most founders track 1-3 closely.",
  },
  {
    q: "What integrations do you have?",
    a: "Slack, Discord, email, webhooks. CRM integrations (HubSpot, Salesforce) coming Q1 2027.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Hosted on Vercel (SOC2). Encrypted in transit (HTTPS) and at rest. GDPR compliant.",
  },
  {
    q: "Do you have an API?",
    a: "Yes, on the Scale plan. REST API for competitor data, insights, and predictions.",
  },
  {
    q: "What if I want to track a competitor you don't support?",
    a: "We support any public website. If your competitor has a website (or social presence), we can track them.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Frequently asked
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              questions
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Everything founders ask before signing up.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-900/60 border border-purple-500/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-purple-900/20 transition"
              >
                <span className="font-bold text-white pr-4">{faq.q}</span>
                <span className="text-purple-400 text-2xl flex-shrink-0">
                  {openIdx === i ? "−" : "+"}
                </span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-4 text-slate-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2 text-white">Still have questions?</h3>
          <p className="text-slate-300 mb-6">Email us directly — we respond within 24 hours.</p>
          <a
            href="mailto:vivekcbanakar@gmail.com"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
          >
            vivekcbanakar@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}
