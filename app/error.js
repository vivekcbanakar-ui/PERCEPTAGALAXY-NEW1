"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900/60 border border-red-500/30 rounded-lg p-8 backdrop-blur-sm text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-slate-300 mb-6">
          We hit an unexpected error. Our team has been notified.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-white transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-bold text-white transition"
          >
            Go home
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="text-slate-400 cursor-pointer text-sm">Error details</summary>
            <pre className="mt-2 text-xs text-red-300 bg-slate-950 p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
