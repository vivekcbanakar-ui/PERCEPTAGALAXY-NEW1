import Link from "next/link";
import { POSTS } from "../posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default function BlogPost({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  // Convert markdown-ish content to JSX (simple parse for now)
  const lines = post.content.trim().split("\n");
  const jsx = [];
  let inList = false;
  let listItems = [];

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // H1, H2, H3
    if (trimmed.startsWith("# ")) {
      if (inList) { jsx.push(<ul>{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>); inList = false; listItems = []; }
      jsx.push(<h1 key={i} className="text-4xl md:text-5xl font-bold mb-4 mt-8">{trimmed.slice(2)}</h1>);
    } else if (trimmed.startsWith("## ")) {
      if (inList) { jsx.push(<ul>{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>); inList = false; listItems = []; }
      jsx.push(<h2 key={i} className="text-2xl md:text-3xl font-bold mb-3 mt-8 text-white">{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith("### ")) {
      if (inList) { jsx.push(<ul>{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>); inList = false; listItems = []; }
      jsx.push(<h3 key={i} className="text-xl font-bold mb-2 mt-6 text-white">{trimmed.slice(4)}</h3>);
    }
    // Tables (simple)
    else if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (inList) { jsx.push(<ul>{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>); inList = false; listItems = []; }
      const cells = trimmed.slice(1, -1).split("|").map((c) => c.trim());
      if (!cells.every((c) => c.startsWith("---"))) {
        jsx.push(<div key={i} className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <tbody>{cells.map((c, j) => <td key={j} className="border border-purple-500/20 px-3 py-2">{renderInline(c)}</td>)}</tbody>
          </table>
        </div>);
      }
    }
    // Bullet list
    else if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(renderInline(trimmed.slice(2)));
    }
    // Bold text lines
    else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      if (inList) { jsx.push(<ul>{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>); inList = false; listItems = []; }
      jsx.push(<p key={i} className="font-bold text-white mb-2 mt-4">{trimmed.slice(2, -2)}</p>);
    }
    // Empty line
    else if (trimmed === "") {
      if (inList) { jsx.push(<ul className="list-disc pl-6 my-3 space-y-1">{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>); inList = false; listItems = []; }
      jsx.push(<div key={i} className="h-2" />);
    }
    // Normal paragraph
    else if (trimmed.length > 0) {
      if (inList) { jsx.push(<ul>{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>); inList = false; listItems = []; }
      jsx.push(<p key={i} className="text-slate-300 leading-relaxed mb-4">{renderInline(trimmed)}</p>);
    }
  });

  // Final list flush
  if (inList) {
    jsx.push(<ul className="list-disc pl-6 my-3 space-y-1">{listItems.map((it, j) => <li key={j}>{it}</li>)}</ul>);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <Link href="/blog" className="px-4 py-2 hover:text-purple-400 transition">← All posts</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
            <span className="px-2 py-0.5 bg-purple-600/30 border border-purple-500/50 rounded text-purple-300">{post.category}</span>
            <span>{post.publishedAt}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-slate-300">{post.description}</p>
          <div className="mt-6 text-sm text-slate-400">
            By <span className="text-white">{post.author}</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">{jsx}</div>

        <div className="mt-16 pt-8 border-t border-purple-500/20">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Try Percepta Galaxy free</h3>
            <p className="text-slate-300 mb-6">
              Track 1-10 competitors with AI-powered daily insights.
            </p>
            <Link
              href="/free-tracker"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition"
            >
              Get Free 7-Day Report →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

// Simple inline renderer for **bold**, [text](url), `code`
function renderInline(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  // Match **bold**, [text](url), `code`
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/;

  while (remaining.length > 0) {
    const m = remaining.match(regex);
    if (!m) {
      parts.push(remaining);
      break;
    }
    const before = remaining.slice(0, m.index);
    if (before) parts.push(before);

    const match = m[0];
    if (match.startsWith("**")) {
      parts.push(<strong key={key++} className="text-white">{match.slice(2, -2)}</strong>);
    } else if (match.startsWith("[")) {
      const [, linkText] = match.match(/\[([^\]]+)\]\(([^)]+)\)/);
      parts.push(<Link key={key++} href={match.match(/\(([^)]+)\)/)[1]} className="text-purple-400 hover:text-purple-300 underline">{linkText}</Link>);
    } else if (match.startsWith("`")) {
      parts.push(<code key={key++} className="bg-slate-800 px-1 py-0.5 rounded text-purple-300 text-sm">{match.slice(1, -1)}</code>);
    }

    remaining = remaining.slice(m.index + match.length);
  }

  return parts;
}
