export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0B1120] border-r border-gray-800 p-6">

      <h1 className="text-2xl font-bold text-white mb-10">
        🚀 MarketLens AI
      </h1>

      <nav className="space-y-4">

        <button className="w-full text-left text-gray-300 hover:text-white transition">
          Dashboard
        </button>

        <button className="w-full text-left text-gray-300 hover:text-white transition">
          Coin Analysis
        </button>

        <button className="w-full text-left text-gray-300 hover:text-white transition">
          Market Report
        </button>

        <button className="w-full text-left text-gray-300 hover:text-white transition">
          AI Assistant
        </button>

        <button className="w-full text-left text-gray-300 hover:text-white transition">
          Learning Center
        </button>

      </nav>

    </aside>
  );
}