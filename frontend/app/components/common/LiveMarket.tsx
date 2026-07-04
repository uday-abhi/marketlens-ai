"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  bitcoinPrice: string;
};

export default function LiveMarket() {
  const [bitcoinPrice, setBitcoinPrice] = useState("Loading...");
  const [ethereumPrice, setEthereumPrice] = useState("Loading...");
  const [solanaPrice, setSolanaPrice] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setBitcoinPrice(Number(data.bitcoinPrice).toLocaleString());

        // Temporary values
        // Later these will come from the backend
        setEthereumPrice("1,566");
        setSolanaPrice("70");
      })
      .catch(console.error);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-8 py-10">

      <h2 className="text-3xl font-bold mb-8">
        Live Market
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">

          <p className="text-slate-400">
            Bitcoin
          </p>

          <h3 className="text-4xl font-bold mt-3">
            ${bitcoinPrice}
          </h3>

        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">

          <p className="text-slate-400">
            Ethereum
          </p>

          <h3 className="text-4xl font-bold mt-3">
            ${ethereumPrice}
          </h3>

        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">

          <p className="text-slate-400">
            Solana
          </p>

          <h3 className="text-4xl font-bold mt-3">
            ${solanaPrice}
          </h3>

        </div>

      </div>

    </section>
  );
}