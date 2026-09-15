/**
 * How It Works section - 3 step process.
 * Simple static component with a grid layout.
 */
const steps = [
  ["01", "Choose a market", "Open the dashboard for the broad market view or search a coin by ticker."],
  ["02", "Read the signals", "Review the price, 24-hour change, volume, support, resistance, and market trend."],
  ["03", "Get a clear summary", "Ask for an AI explanation that connects the available data and highlights risk."],
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold text-blue-400">HOW IT WORKS</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          A clearer workflow for market research.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map(([number, title, text]) => (
          <article key={number} className="relative h-full overflow-hidden rounded-2xl border border-slate-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600">
            <p className="text-4xl font-bold text-blue-500/50">{number}</p>
            <h3 className="mt-7 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 leading-6 text-slate-400">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}