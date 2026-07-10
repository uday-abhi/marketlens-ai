"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  title: string;
  value: string;
  change?: number;
};

export default function StatCard({
  title,
  value,
  change,
}: Props) {

  return (

    <div className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition">

      <p className="text-gray-400 text-sm">

        {title}

      </p>

      <h2 className="text-4xl font-bold mt-3">

        {value}

      </h2>

      {change !== undefined && (

        <div
          className={`flex items-center gap-2 mt-4 font-semibold ${
            change >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >

          {change >= 0
            ? <TrendingUp size={18}/>
            : <TrendingDown size={18}/>
          }

          {change.toFixed(2)}%

        </div>

      )}

    </div>

  );

}