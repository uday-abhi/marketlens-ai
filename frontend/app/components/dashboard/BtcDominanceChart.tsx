"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

type Props = {
  dominance: number;
};

export default function BtcDominanceChart({ dominance }: Props) {

  const data = [
    {
      name: "BTC",
      value: dominance
    },
    {
      name: "Others",
      value: 100 - dominance
    }
  ];

  const COLORS = [
    "#F7931A",
    "#334155"
  ];

  return (

    <div className="bg-slate-900 rounded-xl p-6">

      <h3 className="text-xl font-bold mb-4">

        BTC Dominance

      </h3>

      <div className="h-72">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              stroke="none"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="text-center">

        <h2 className="text-4xl font-bold">

          {dominance.toFixed(2)}%

        </h2>

        <p className="text-gray-400 mt-2">

          Bitcoin Market Share

        </p>

      </div>

    </div>

  );

}