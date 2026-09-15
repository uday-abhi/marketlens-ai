import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

/**
 * Root Layout - wraps all pages with Navbar and Footer.
 * 
 * Next.js App Router concepts:
 * - This is a Server Component (no 'use client')
 * - 'children' prop contains the page content
 * - Metadata is used for SEO (title, description)
 * 
 * In interviews: "Layout.tsx is the root layout. 
 * It renders on every page. Navbar and Footer are shared across all pages."
 */
export const metadata: Metadata = {
  title: "MarketLens AI | Crypto market intelligence",
  description: "Clear crypto market insights powered by live data and AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
