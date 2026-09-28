import Link from "next/link";
import TestimonialForm from "./TestimonialForm";

export const metadata = {
  title: "Share Your Testimonial | Percepta Galaxy",
  description: "Tell us how Percepta Galaxy has helped you stay ahead. Real testimonials help us grow.",
};

export default function TestimonialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ Percepta Galaxy
          </Link>
          <Link href="/" className="px-4 py-2 hover:text-purple-400 transition">← Back</Link>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">win</span>
          </h1>
          <p className="text-xl text-slate-300">
            How has Percepta Galaxy helped you stay ahead of competitors?
          </p>
          <p className="text-sm text-slate-500 mt-3">
            Real testimonials help us grow. We may feature yours (with permission) on our homepage.
          </p>
        </div>

        <TestimonialForm />
      </section>
    </div>
  );
}
