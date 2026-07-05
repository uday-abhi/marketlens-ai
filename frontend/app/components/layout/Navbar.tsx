"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-8">

        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          MarketLens AI
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">

          <Link
            href="/"
            className="text-slate-300 hover:text-white transition"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-slate-300 hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            href="/coin"
            className="text-slate-300 hover:text-white transition"
          >
            Coin Analysis
          </Link>

          <Link
            href="/report"
            className="text-slate-300 hover:text-white transition"
          >
            Market Report
          </Link>

          <Link
            href="/about"
            className="text-slate-300 hover:text-white transition"
          >
            About
          </Link>

        </nav>

      </div>
    </header>
  );
}