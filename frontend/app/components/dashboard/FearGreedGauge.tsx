"use client";

import GaugeComponent from "react-gauge-component";

type Props = {
    value: number;
    label: string;
};

export default function FearGreedGauge({ value, label }: Props) {

    return (

        <div className="bg-slate-900 rounded-xl p-6">

            <h3 className="text-xl font-bold mb-4">
                Fear & Greed Index
            </h3>

            <GaugeComponent
                type="semicircle"
                value={value}
                labels={{
                    valueLabel: {
                        style: {
                            fontSize: "38px",
                            fill: "#ffffff"
                        }
                    }
                }}
                arc={{
                    subArcs: [
                        {
                            limit: 25,
                            color: "#ef4444"
                        },
                        {
                            limit: 50,
                            color: "#f59e0b"
                        },
                        {
                            limit: 75,
                            color: "#22c55e"
                        },
                        {
                            color: "#16a34a"
                        }
                    ]
                }}
            />

            <h2 className="text-center text-2xl font-bold mt-5 text-green-400">

                {label}

            </h2>

        </div>

    );

}