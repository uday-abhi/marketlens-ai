"use client";

import Link from "next/link";
import { BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * Navigation Bar - responsive header with mobile menu.
 * Uses 'use client' because it has interactive state (mobile menu toggle).
 * 
 * In interviews: "Navbar is a client component because it uses useState for the mobile menu.
 * The rest of the site uses server components by default (Next.js 13+ App Router)."
 */
const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/coin", label: "Coin analysis" },
  { href: "/report", label: "Market report" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#07111f]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white" onClick={() => setMenuOpen(false)}>
          <span className="grid size-8 place-items-center rounded-lg bg-blue-600"><BarChart3 size={18} /></span>
          MarketLens <span className="text-blue-400">AI</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white">{link.label}</Link>)}
        </nav>
        <Link href="/coin" className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 sm:block">Analyze a coin</Link>
        <button className="rounded-lg p-2 text-slate-300 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && <nav className="border-t border-slate-800 px-4 py-3 md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-7xl gap-1">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">{link.label}</Link>)}</div>
      </nav>}
    </header>
  );
}
