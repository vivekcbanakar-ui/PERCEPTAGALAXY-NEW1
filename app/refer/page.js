import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReferPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/referrals")
        .then((r) => r.json())
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Sign in required</h1>
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            → Sign in
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://perceptagalaxy-nu.vercel.app";
  const referralUrl = data?.code ? `${baseUrl}/signup?ref=${data.code}` : "";
  const tweetText = data?.code
    ? `Tracking your competitors is exhausting. @perceptagalaxy does it for $399/mo. Try it free → ${referralUrl}`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard" className="text-sm text-slate-300 hover:text-purple-400">Dashboard</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm border border-purple-400 hover:bg-purple-400/10 px-3 py-1 rounded">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-4 py-1 bg-green-600/30 border border-green-500/50 rounded-full text-green-300 text-sm font-semibold">
            💸 AFFILIATE PROGRAM
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Refer a founder.
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Earn $50/month.
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            For every SaaS founder you refer who subscribes, you get $50 off your monthly bill. Forever.
          </p>
        </div>

        {/* Stats */}
        {data && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="text-sm text-slate-400 mb-2">Invited</div>
              <div className="text-4xl font-bold text-purple-400">{data.totalInvites}</div>
            </div>
            <div className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="text-sm text-slate-400 mb-2">Subscribed</div>
              <div className="text-4xl font-bold text-green-400">{data.converted}</div>
            </div>
            <div className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="text-sm text-slate-400 mb-2">Monthly Reward</div>
              <div className="text-4xl font-bold text-pink-400">${(data.pendingReward / 100).toFixed(0)}</div>
            </div>
          </div>
        )}

        {/* Your referral code */}
        {data?.code && (
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <div className="text-sm text-slate-400 uppercase tracking-widest mb-2">Your Referral Code</div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <code className="bg-slate-950 px-6 py-4 rounded-lg text-2xl font-mono font-bold text-purple-300">
                  {data.code}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(data.code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-slate-400 mb-2">Your referral link:</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralUrl}
                  readOnly
                  className="flex-1 px-4 py-2 bg-slate-950 border border-purple-500/30 rounded text-sm font-mono text-slate-300"
                />
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(referralUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
                >
                  {copied ? "✓" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share buttons */}
        <div className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Share on social</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black hover:bg-slate-800 border border-slate-600 rounded-lg font-bold text-center transition"
            >
              🐦 Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg font-bold text-center transition"
            >
              💼 Share on LinkedIn
            </a>
            <a
              href={`mailto:?subject=Check%20this%20out&body=${encodeURIComponent(`I've been using Percepta Galaxy to track my competitors — it's saved me hours. Try it free: ${referralUrl}`)}`}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-center transition"
            >
              📧 Share via Email
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check this out: ${referralUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-center transition"
            >
              💬 Share on WhatsApp
            </a>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4 text-white">How it works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Share your link", desc: "Send your link to other SaaS founders" },
              { step: 2, title: "They sign up + pay", desc: "When they subscribe to any plan, your code activates" },
              { step: 3, title: "You get $50 off", desc: "$50 off your monthly bill per subscriber. Stacks forever." },
            ].map((s) => (
              <div key={s.step}>
                <div className="text-4xl font-bold text-purple-400 mb-2">{s.step}.</div>
                <h4 className="font-bold text-white mb-1">{s.title}</h4>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
