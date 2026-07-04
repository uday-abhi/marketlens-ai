"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto h-16 px-8 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          MarketLens AI
        </Link>

        <nav className="flex gap-8">

          <Link href="/" className="text-slate-300 hover:text-white">
            Home
          </Link>

          <Link href="/dashboard" className="text-slate-300 hover:text-white">
            Dashboard
          </Link>

          <Link href="/coin" className="text-slate-300 hover:text-white">
            Coin Analysis
          </Link>

          <Link href="/learning" className="text-slate-300 hover:text-white">
            Learning Center
          </Link>

          <Link href="/about" className="text-slate-300 hover:text-white">
            About
          </Link>

        </nav>

      </div>
    </header>
  );
}