import type { CoinAnalysis, DashboardOverview } from "../types/market";

/**
 * API client - handles all HTTP requests to backend.
 * 
 * Key concepts:
 * - Uses fetch() (native browser API, no axios needed)
 * - Generic request<T>() function for type safety
 * - Centralized error handling
 * - Base URL from environment variable
 * 
 * In interviews: "We use native fetch() instead of axios to keep bundle small.
 * The generic request function gives us TypeScript types for responses."
 */
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9090";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, options);

  if (!response.ok) {
    let errorMessage = "Something went wrong. Please try again.";

    try {
      const body = await response.json();
      if (body && typeof body === "object" && "message" in body) {
        errorMessage = String(body.message);
      }
    } catch {
      // JSON parse failed, use default message
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export const marketApi = {
  // GET /api/dashboard/overview - market overview data
  getOverview: () => request<DashboardOverview>("/api/dashboard/overview"),

  // GET /api/coin/{symbol} - coin data only
  getCoin: (symbol: string) => request<CoinAnalysis>(`/api/coin/${symbol}`),

  // POST /api/coin/{symbol}/analyze - coin data + AI analysis
  analyzeCoin: (symbol: string) => request<CoinAnalysis>(`/api/coin/${symbol}/analyze`, { method: "POST" }),

  // POST /api/dashboard/analyze - AI dashboard report
  analyzeDashboard: () => request<{ aiSummary: string }>("/api/dashboard/analyze", { method: "POST" }),
};

// Chat API - interactive market questions
export const chatApi = {
  // POST /api/chat - send message to AI, get market-related response
  sendMessage: (message: string) =>
    request<{ reply: string; isMarketRelated: boolean }>("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }),
};
