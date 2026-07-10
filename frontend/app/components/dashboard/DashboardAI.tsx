"use client";

import { useState } from "react";

type DashboardAIResponse = {
  aiSummary: string;
};

export default function DashboardAI() {

  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);

  async function generateReport() {

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:8080/api/dashboard/analyze",
        {
          method: "POST",
        }
      );

      const data: DashboardAIResponse =
        await res.json();

      setSummary(data.aiSummary);

    } catch {

      alert("Unable to generate report.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          AI Market Report
        </h2>

        <button
          onClick={generateReport}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          {loading
            ? "Generating..."
            : "Generate AI Report"}
        </button>

      </div>

      <pre className="whitespace-pre-wrap leading-8 text-gray-300">

        {summary ||
          "Click Generate AI Report"}

      </pre>

    </div>

  );

}