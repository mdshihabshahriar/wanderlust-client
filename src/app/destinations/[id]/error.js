'use client'

import Link from "next/link";

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      <div className="relative mb-8">
        <h1 className="text-[120px] font-medium leading-none tracking-tighter text-gray-200 select-none">
          500
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-2">
            <span className="text-red-500 text-xl">⚠️</span>
            <span className="text-sm font-medium text-red-600">Something went wrong</span>
          </div>
        </div>
      </div>

      <p className="text-gray-500 max-w-sm text-sm leading-relaxed mb-8">
        An unexpected error occurred. Our team has been notified.
        Please try again or go back to safety.
      </p>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
        >
          Go home
        </Link>
      </div>

      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 max-w-sm">
        <p className="text-xs text-gray-400 leading-relaxed">
          If this keeps happening, please{" "}
          with the error details.
        </p>
      </div>

    </div>
  );
};

export default ErrorPage;