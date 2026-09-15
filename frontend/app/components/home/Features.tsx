import { BrainCircuit, ChartNoAxesCombined, ShieldAlert } from "lucide-react";

/**
 * Features section - shows 3 key features in a grid.
 * Simple static component - no state, no effects.
 * In interviews: "This is a presentational component - just renders UI based on props/data."
 */
const features = [
  { icon: ChartNoAxesCombined, title: "Live market context", text: "See price movement, volume, market cap, dominance, and sentiment together." },
  { icon: BrainCircuit, title: "AI in plain language", text: "Turn technical market information into a clear, balanced explanation." },
  { icon: ShieldAlert, title: "Risk-aware analysis", text: "Keep support, resistance, and both bullish and bearish scenarios visible." },
];

export default function Features() {
  return (
    <section className="border-y border-slate-800/80 bg-slate-950/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-blue-400">ONE FOCUSED WORKSPACE</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Useful market intelligence without the clutter.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900">
              <span className="grid size-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors">
                <Icon size={21} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}