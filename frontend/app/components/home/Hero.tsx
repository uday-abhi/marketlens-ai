import Link from "next/link";
import LiveMarket from "./LiveMarket";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* Left */}

        <div>

          <p className="text-blue-500 font-semibold uppercase tracking-[4px] mb-5">
            AI Powered Crypto Intelligence
          </p>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Understand the
            <br />
            Crypto Market,
            <br />
            <span className="text-blue-500">
              Not Just the Price.
            </span>
          </h1>

          <p className="text-gray-400 text-lg mt-8 max-w-xl leading-8">
            Analyze cryptocurrencies using AI, live market data,
            technical indicators and market sentiment to make
            smarter trading decisions.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition"
            >
              Dashboard
            </Link>

            <Link
              href="/coin"
              className="border border-gray-700 hover:border-blue-500 px-7 py-3 rounded-xl font-semibold transition"
            >
              Analyze Coin
            </Link>

          </div>

        </div>

        {/* Right */}

        <LiveMarket />

      </div>
    </section>
  );
}