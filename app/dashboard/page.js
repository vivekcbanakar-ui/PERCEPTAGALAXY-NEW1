"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Competitor name"
                className="px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <input
                type="url"
                placeholder="Website URL"
                className="px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
            >
              Add Competitor
            </button>
          </form>
        </div>

        {/* Competitors List */}
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Your Competitors</h2>
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg mb-4">No competitors tracked yet</p>
            <p className="text-sm">Add your first competitor above to get started</p>
          </div>
        </div>

        {/* CTA to Upgrade */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Upgrade to track more competitors</h3>
          <p className="text-slate-300 mb-6">Free trial limited to 1 competitor. Upgrade now to track up to 50.</p>
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
