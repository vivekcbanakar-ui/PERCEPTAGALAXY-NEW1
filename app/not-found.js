import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl mb-4">🌌</div>
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <p className="text-xl text-slate-300 mb-2">Lost in the galaxy</p>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-white transition"
        >
          Beam me home
        </Link>
      </div>
    </div>
  );
}
