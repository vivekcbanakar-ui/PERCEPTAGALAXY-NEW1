import Link from "next/link";
import { POSTS } from "./posts";

export const metadata = {
  title: "Blog | Percepta Galaxy",
  description: "Competitive intelligence insights, comparisons, and tactical advice for SaaS founders.",
};

export default function BlogIndex() {
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

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Founder <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Insights</span>
          </h1>
          <p className="text-xl text-slate-300">
            Competitive intelligence tactics for SaaS founders who want to WIN.
          </p>
        </div>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-slate-900/60 border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 transition"
            >
              <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                <span className="px-2 py-0.5 bg-purple-600/30 border border-purple-500/50 rounded text-purple-300">
                  {post.category}
                </span>
                <span>{post.publishedAt}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 hover:text-purple-300 transition">
                {post.title}
              </h2>
              <p className="text-slate-300 mb-4">{post.description}</p>
              <div className="text-sm text-slate-400">
                By <span className="text-white">{post.author}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Want weekly insights?</h3>
          <p className="text-slate-300 mb-6">
            Get a 5-min weekly email on what your competitors did this week.
          </p>
          <Link
            href="/free-tracker"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
          >
            Get Free Tracker →
          </Link>
        </div>
      </section>
    </div>
  );
}
