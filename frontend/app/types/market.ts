export type DashboardOverview = {
  fearGreed: number;
  fearGreedLabel: string;
  btcDominance: number;
  marketCap: string;
  marketCapChange: number;
  volume24h: string;
  volumeChange: number;
  btcPrice: number;
  btcChange: number;
  marketTrend: string;
};

export type CoinAnalysis = {
  symbol: string;
  currentPrice: string;
  change24h: string;
  volume: string;
  highPrice: string;
  lowPrice: string;
  trend: string;
  support: string;
  resistance: string;
  buyerStrength: string;
  sellerStrength: string;
  aiSummary: string;
  timeframeAnalysis: TimeframeAnalysis[];
};

export type TimeframeAnalysis = {
  timeframe: string;
  trend: string;
  changePercentage: number;
  support: string;
  resistance: string;
};
