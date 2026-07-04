import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";

export const metadata: Metadata = {
  title: "MarketLens AI",
  description: "Understand the Crypto Market, Not Just the Price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0F172A] text-white">

        <Navbar />

        {children}

      </body>
    </html>
  );
}