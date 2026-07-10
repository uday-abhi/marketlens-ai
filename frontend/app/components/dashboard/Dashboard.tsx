"use client";

import DashboardHeader from "./DashboardHeader";
import DashboardOverview from "./DashboardOverview";
import DashboardAI from "./DashboardAI";

export default function Dashboard() {
  return (
    <main className="space-y-8">
      <DashboardHeader />

      <DashboardOverview />

      <DashboardAI />
    </main>
  );
}