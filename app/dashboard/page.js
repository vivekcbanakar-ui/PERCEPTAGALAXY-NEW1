"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 border border-purple-400 hover:bg-purple-400/10 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="bg-purple-900/30 border border-purple-500/20 p-6 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Total Competitors</div>
            <div className="text-3xl font-bold">0</div>
          </div>
          <div className="bg-purple-900/30 border border-purple-500/20 p-6 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Plan Tier</div>
            <div className="text-3xl font-bold text-purple-400">Free Trial</div>
          </div>
          <div className="bg-purple-900/30 border border-purple-500/20 p-6 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Days Remaining</div>
            <div className="text-3xl font-bold">14</div>
          </div>
        </div>

        {/* Add Competitor Section */}
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Add a Competitor</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError("");
              setSuccess("");

              if (!name.trim() || !url.trim()) {
                setError("Please fill in both fields");
                return;
              }

              // Normalize URL — auto-prepend https:// if missing
              let normalizedUrl = url.trim();
              if (!/^https?:\/\//i.test(normalizedUrl)) {
                normalizedUrl = "https://" + normalizedUrl;
              }

              // Basic URL validation
              try {
                new URL(normalizedUrl);
              } catch {
                setError("Please enter a valid URL (e.g. replit.com)");
                return;
              }

              // Add to local list (will be persisted when DB is added)
              setCompetitors([...competitors, { name: name.trim(), url: normalizedUrl, addedAt: new Date() }]);
              setName("");
              setUrl("");
              setSuccess(`Added ${name.trim()}!`);
            }}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Competitor name (e.g. Replit)"
                className="px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Website URL (e.g. replit.com)"
                className="px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
            >
              Add Competitor
            </button>
            <p className="text-xs text-slate-500">
              Tip: you can enter just <code className="text-purple-300">replit.com</code> — we&apos;ll add https:// for you.
            </p>
          </form>
        </div>

        {/* Competitors List */}
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Your Competitors</h2>
          {competitors.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-lg mb-4">No competitors tracked yet</p>
              <p className="text-sm">Add your first competitor above to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {competitors.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300">
                      {c.url}
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">
                    Added {c.addedAt.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA to Upgrade */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Upgrade to track more competitors</h3>
          <p className="text-slate-300 mb-6">Free trial limited to 1 competitor. Upgrade now to track up to 10.</p>
          <button
            onClick={() => router.push("/pricing")}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
          >
            View Plans →
          </button>
        </div>
      </div>
    </div>
  );
}
