import DashboardAI from "./DashboardAI";
import DashboardHeader from "./DashboardHeader";
import DashboardOverview from "./DashboardOverview";
import ChatBot from "../chat/ChatBot";

export default function Dashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main content (left) */}
      <div className="space-y-6 lg:col-span-2">
        <DashboardHeader />
        <DashboardOverview />
        <DashboardAI />
      </div>

      {/* ChatBot sidebar (right) */}
      <div className="hidden h-fit lg:block lg:sticky lg:top-4">
        <ChatBot />
      </div>
    </div>
  );
}
