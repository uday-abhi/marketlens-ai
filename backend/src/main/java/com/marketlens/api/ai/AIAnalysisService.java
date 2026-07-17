package com.marketlens.api.ai;

import org.springframework.stereotype.Service;

import com.marketlens.api.market.MarketData;

@Service
public class AIAnalysisService {

    private final OpenRouterClient openRouterClient;

    public AIAnalysisService(OpenRouterClient openRouterClient) {
        this.openRouterClient = openRouterClient;
    }

    public String analyzeCoin(
            MarketData data,
            String trend,
            String support,
            String resistance,
            String buyerStrength,
            String sellerStrength) {

        String prompt = """
You are the lead cryptocurrency market analyst for MarketLens AI.

Your job is to explain the market in the same style as a professional analyst from Bloomberg, CoinDesk, or TradingView.

The audience includes beginners and experienced traders.

Analyze ONLY the market data provided below.

Coin: %s

Current Price: %s USD

24 Hour Change: %s%%

24 Hour High: %s

24 Hour Low: %s

24 Hour Volume: %s

Trend: %s

Support Level: %s

Resistance Level: %s

Buyer Strength: %s

Seller Strength: %s

Instructions:

Write a detailed, natural, human-like market report.

Do NOT simply repeat the numbers.

Instead, explain what those numbers mean.

Connect price movement, trend, volume, support and resistance together.

Explain the market like an experienced analyst speaking to a trader.

Never say "according to the data provided".

Never mention that you are an AI.

Never guarantee profits.

Always discuss both bullish and bearish possibilities.

Return ONLY plain text.

Use exactly these headings:

Market Condition

Why is the Market Moving?

Key Levels to Watch

Trading Outlook

Risk Factors
"""
.formatted(
                data.getSymbol(),
                data.getCurrentPrice(),
                data.getChange24h(),
                data.getHighPrice(),
                data.getLowPrice(),
                data.getVolume(),
                trend,
                support,
                resistance,
                buyerStrength,
                sellerStrength
        );

        try {

            return openRouterClient.generateContent(prompt);

        } catch (Exception e) {

            System.out.println("\n========== GEMINI ERROR ==========");
            e.printStackTrace();
            System.out.println("==================================\n");

            return """
Market Condition

AI analysis is temporarily unavailable because the language model service could not be reached.

Why is the Market Moving?

Live market data has been successfully collected from Binance, but an AI explanation could not be generated at this time.

Key Levels to Watch

Support: %s
Resistance: %s

Trading Outlook

Current Trend: %s

Risk Factors

Please try again later when the AI service becomes available.
"""
.formatted(
                    support,
                    resistance,
                    trend
            );
        }
    }
}