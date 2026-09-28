import Link from "next/link";
import dynamic from "next/dynamic";

const TemplatesList = dynamic(() => import("./TemplatesList"), { ssr: false });

export const metadata = {
  title: "Content Templates | Percepta Galaxy",
  description: "30 ready-to-post content templates for Twitter and LinkedIn. For SaaS founders building in public.",
  robots: { index: false, follow: false },
};

export default function ContentTemplatesPage() {
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
      <TemplatesList />
    </div>
  );
}
