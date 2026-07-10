package com.marketlens.api.ai;

import org.springframework.stereotype.Service;

import com.marketlens.api.market.MarketData;

@Service
public class GeminiService {

    private final GeminiClient geminiClient;

    public GeminiService(GeminiClient geminiClient) {
        this.geminiClient = geminiClient;
    }

    public String analyzeMarket(MarketData data,
                                String support,
                                String resistance,
                                String buyerStrength,
                                String sellerStrength,
                                String trend) {

        String prompt = """
You are MarketLens AI, an expert cryptocurrency market analyst.

Analyze the following live market data.

Coin : %s

Current Price : %s

24 Hour Change : %s%%

24 Hour High : %s

24 Hour Low : %s

Volume : %s

Support : %s

Resistance : %s

Buyer Strength : %s

Seller Strength : %s

Trend : %s

Write a professional market analysis using these headings exactly.

## Market Condition

## Why is the Market Moving?

## What Should Traders Watch?

## Trading Outlook

## Risk Factors

Rules:

1. Keep the explanation factual.
2. Use simple English.
3. Do not guarantee profits.
4. Keep each section under 70 words.
5. Do not use markdown.
6. Return only the explanation.
""".formatted(
                data.getSymbol(),
                data.getCurrentPrice(),
                data.getChange24h(),
                data.getHighPrice(),
                data.getLowPrice(),
                data.getVolume(),
                support,
                resistance,
                buyerStrength,
                sellerStrength,
                trend
        );

        return geminiClient.generateContent(prompt);
    }
}