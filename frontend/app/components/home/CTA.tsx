import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Call to Action section - encourages user to visit dashboard.
 * Simple static component with a link.
 */
export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-700 to-blue-950 px-6 py-12 text-center sm:px-12">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Start with the market overview.</h2>
        <p className="mx-auto mt-4 max-w-xl text-blue-100">
          Explore live indicators before diving deeper into individual coin analysis.
        </p>
        <Link href="/dashboard" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-800 transition hover:bg-blue-50">
          Open dashboard <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}