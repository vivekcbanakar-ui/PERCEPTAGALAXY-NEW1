"use client";

import { useState } from "react";
import Link from "next/link";

export default function TestimonialForm() {
  const [submitted, setSubmitted] = useState(false);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "testimonial@perceptagalaxy.com",
          source: "testimonial-form",
          message: `⭐ TESTIMONIAL: ${quote} | ${name}, ${role}, ${company}`,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-900/60 border border-green-500/30 rounded-2xl p-12 text-center">
        <div className="text-6xl mb-4">🙏</div>
        <h2 className="text-3xl font-bold mb-4 text-white">Thank you!</h2>
        <p className="text-lg text-slate-300 mb-6">
          Your testimonial has been submitted. We&apos;ll review it and add it to our homepage if approved.
        </p>
        <p className="text-slate-400 mb-8">
          Want to share more? Tell other founders about Percepta Galaxy and earn $50/month for each paid referral.{" "}
          <Link href="/refer" className="text-purple-400 hover:text-purple-300 underline">
            → Get your referral link
          </Link>
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-bold transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Your quote
        </label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
          rows={4}
          placeholder="What did you find? What changed for you?"
          className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Rahul Verma"
          className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            placeholder="Founder / CEO / PM"
            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            placeholder="Company name"
            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition"
      >
        Submit Testimonial →
      </button>

      <p className="text-center text-slate-500 text-xs">
        Your testimonial will be reviewed before being published. We&apos;ll only use your first name + company.
      </p>
    </form>
  );
}
