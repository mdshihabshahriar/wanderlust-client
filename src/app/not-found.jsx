import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      
      <div className="relative mb-8">
        <h1 className="text-[120px] font-medium leading-none tracking-tighter text-gray-200 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 flex items-center gap-2">
            <span className="text-sm font-medium">Page not found</span>
          </div>
        </div>
      </div>

      <p className="text-gray-500 max-w-sm text-sm leading-relaxed mb-8">
        The page you`re looking for doesn`t exist or has been moved.
        Let`s get you back on track.
      </p>

      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition"
        >
          Go home
        </Link>
      </div>

      <div className="mt-12 flex gap-6 flex-wrap justify-center">
        <Link href="/explore" className="text-xs text-gray-400 hover:text-gray-600">
          Explore destinations
        </Link>
        <Link href="/help" className="text-xs text-gray-400 hover:text-gray-600">
          Help center
        </Link>
        <Link href="/contact" className="text-xs text-gray-400 hover:text-gray-600">
          Contact us
        </Link>
      </div>
    </div>
  );
}