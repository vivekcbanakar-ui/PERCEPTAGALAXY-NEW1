"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

// Simple admin: anyone signed in with the admin email can view
// In production, add proper auth (e.g., admin role on user)
const ADMIN_EMAILS = ["vivekcbanakar@gmail.com"]; // Add more as needed

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && ADMIN_EMAILS.includes(session?.user?.email)) {
      // Load stats
      fetch("/api/admin/stats")
        .then((r) => r.json())
        .then((data) => setStats(data))
        .catch((e) => console.error(e));

      // Load leads
      fetch("/api/admin/leads")
        .then((r) => r.json())
        .then((data) => setLeads(data.leads || []))
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [status, session]);

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
          <p className="text-slate-400">Please sign in to access admin</p>
          <Link href="/login" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
            → Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!ADMIN_EMAILS.includes(session?.user?.email)) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">403 — Not authorized</h1>
          <p className="text-slate-400">This area is for admins only.</p>
          <Link href="/" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const exportCSV = () => {
    const csv = [
      ["Email", "Source", "Competitor", "Message", "Created At"],
      ...leads.map((l) => [l.email, l.source, l.competitor || "", l.message || "", l.createdAt]),
    ]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `percepta-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="border-b border-purple-500/20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Admin
          </h1>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard" className="text-sm text-slate-300 hover:text-purple-400">
              Dashboard
            </Link>
            <span className="text-sm text-slate-400">{session.user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 border border-purple-400 hover:bg-purple-400/10 rounded-lg text-sm transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-400 mb-8">See who's interested + paying customers</p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Leads", value: stats?.leadsCount || 0, color: "text-purple-400" },
            { label: "Active Users", value: stats?.usersCount || 0, color: "text-blue-400" },
            { label: "Paid Subscribers", value: stats?.subscribersCount || 0, color: "text-green-400" },
            { label: "MRR (USD)", value: `$${stats?.mrr || 0}`, color: "text-pink-400" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-6">
              <div className="text-sm text-slate-400 mb-2">{s.label}</div>
              <div className={`text-4xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Leads */}
        <div className="bg-slate-900/60 border border-purple-500/20 rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Leads ({leads.length})</h2>
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-bold transition"
            >
              📥 Export CSV
            </button>
          </div>
          {leads.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No leads yet. Submit the free-tracker form to test.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-4 text-slate-400">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400">Source</th>
                    <th className="text-left py-3 px-4 text-slate-400">Competitor</th>
                    <th className="text-left py-3 px-4 text-slate-400">Message</th>
                    <th className="text-left py-3 px-4 text-slate-400">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-purple-500/10">
                      <td className="py-3 px-4">
                        <a href={`mailto:${lead.email}`} className="text-purple-400 hover:text-purple-300">
                          {lead.email}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{lead.source}</td>
                      <td className="py-3 px-4 text-slate-300">{lead.competitor || "—"}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{lead.message || "—"}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
