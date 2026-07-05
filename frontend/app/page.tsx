import Link from "next/link";
import LiveMarket from "./components/common/LiveMarket";

export default function Home() {
  return (
    <main>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <p className="text-blue-400 font-semibold tracking-widest uppercase">
          Crypto Market Intelligence
        </p>

        <h1 className="text-6xl font-extrabold mt-6 leading-tight">
          Understand the Crypto Market,
          <br />
          Not Just the Price.
        </h1>

        <p className="text-slate-400 text-xl mt-8 max-w-3xl leading-9">
          MarketLens AI helps you understand why the crypto market moves
          instead of only showing prices.
        </p>

        <div className="flex gap-5 mt-10">

          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
          >
            Explore Market
          </Link>

          <Link
  href="/coin"
  className="border border-slate-700 hover:border-blue-500 px-8 py-4 rounded-xl font-semibold transition"
>
  Analyze Coin
</Link>

        </div>

      </section>

      <LiveMarket />

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold mb-10">
          Why MarketLens AI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold">
              Understand the Market
            </h3>

            <p className="text-slate-400 mt-4">
              Learn why prices move instead of simply watching charts.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold">
              Analyze Any Coin
            </h3>

            <p className="text-slate-400 mt-4">
              View the behaviour of major cryptocurrencies with simple explanations.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold">
              Learn Crypto
            </h3>

            <p className="text-slate-400 mt-4">
              Build your knowledge through beginner-friendly learning modules.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}