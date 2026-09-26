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
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Redirect if not signed in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Load competitors from DB on mount
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/competitors")
        .then((r) => r.json())
        .then((data) => {
          if (data.competitors) setCompetitors(data.competitors);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [status]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !url.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setAdding(true);
    try {
      const res = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add competitor");
        return;
      }

      setCompetitors([data.competitor, ...competitors]);
      setName("");
      setUrl("");
      setSuccess(`Added ${data.competitor.name}!`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this competitor?")) return;
    try {
      await fetch("/api/competitors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setCompetitors(competitors.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white">
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer">
              ✨ Percepta Galaxy
            </h1>
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-slate-300">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 border border-purple-400 hover:bg-purple-400/10 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">
          {session.user?.name ? `Hi ${session.user.name.split(" ")[0]}` : "Welcome"}
        </h1>

        {/* Plan stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-900/30 border border-purple-500/20 p-6 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Competitors Tracked</div>
            <div className="text-3xl font-bold">{competitors.length} / 3</div>
          </div>
          <div className="bg-purple-900/30 border border-purple-500/20 p-6 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Plan</div>
            <div className="text-3xl font-bold">Free Trial</div>
          </div>
          <div className="bg-purple-900/30 border border-purple-500/20 p-6 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Days Remaining</div>
            <div className="text-3xl font-bold">14</div>
          </div>
        </div>

        {/* Add Competitor Section */}
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Add a Competitor</h2>
          <form onSubmit={handleAdd} className="space-y-4">
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
              disabled={adding}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 rounded-lg font-bold transition"
            >
              {adding ? "Adding..." : "Add Competitor"}
            </button>
            <p className="text-xs text-slate-500">
              Tip: you can enter just <code className="text-purple-300">replit.com</code> — we&apos;ll add https:// for you.
            </p>
          </form>
        </div>

        {/* Competitors List */}
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Your Competitors</h2>
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading...</div>
          ) : competitors.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-lg mb-4">No competitors tracked yet</p>
              <p className="text-sm">Add your first competitor above to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {competitors.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300">
                      {c.url}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded hover:bg-red-500/10"
                  >
                    Remove
                  </button>
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

import Link from "next/link";
