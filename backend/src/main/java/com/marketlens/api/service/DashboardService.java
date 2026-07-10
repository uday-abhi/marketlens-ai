package com.marketlens.api.service;

import org.springframework.stereotype.Service;

import com.marketlens.api.ai.AIAnalysisService;
import com.marketlens.api.dto.DashboardAIResponse;
import com.marketlens.api.dto.DashboardResponse;
import com.marketlens.api.market.MarketData;
import com.marketlens.api.market.MarketDataService;

@Service
public class DashboardService {

    private final MarketDataService marketDataService;
    private final AIAnalysisService aiAnalysisService;

    public DashboardService(
            MarketDataService marketDataService,
            AIAnalysisService aiAnalysisService) {

        this.marketDataService = marketDataService;
        this.aiAnalysisService = aiAnalysisService;
    }

    public DashboardResponse getDashboardData() {

        MarketData btc = marketDataService.getMarketData("BTC");

        double currentPrice =
                Double.parseDouble(btc.getCurrentPrice());

        double change =
                Double.parseDouble(btc.getChange24h());

        String trend;
        String buyerStrength;
        String sellerStrength;

        if (change >= 5) {

            trend = "Strong Bullish";
            buyerStrength = "Very Strong";
            sellerStrength = "Very Weak";

        } else if (change >= 1) {

            trend = "Bullish";
            buyerStrength = "Strong";
            sellerStrength = "Weak";

        } else if (change > -1) {

            trend = "Sideways";
            buyerStrength = "Balanced";
            sellerStrength = "Balanced";

        } else if (change > -5) {

            trend = "Bearish";
            buyerStrength = "Weak";
            sellerStrength = "Strong";

        } else {

            trend = "Strong Bearish";
            buyerStrength = "Very Weak";
            sellerStrength = "Very Strong";

        }

        return new DashboardResponse(trend);

    }

    public DashboardAIResponse generateAIReport() {

        MarketData btc = marketDataService.getMarketData("BTC");

        double currentPrice =
                Double.parseDouble(btc.getCurrentPrice());

        double change =
                Double.parseDouble(btc.getChange24h());

        String support = String.format("%.2f", currentPrice * 0.98);
        String resistance = String.format("%.2f", currentPrice * 1.02);

        String trend;
        String buyerStrength;
        String sellerStrength;

        if (change >= 5) {

            trend = "Strong Bullish";
            buyerStrength = "Very Strong";
            sellerStrength = "Very Weak";

        } else if (change >= 1) {

            trend = "Bullish";
            buyerStrength = "Strong";
            sellerStrength = "Weak";

        } else if (change > -1) {

            trend = "Sideways";
            buyerStrength = "Balanced";
            sellerStrength = "Balanced";

        } else if (change > -5) {

            trend = "Bearish";
            buyerStrength = "Weak";
            sellerStrength = "Strong";

        } else {

            trend = "Strong Bearish";
            buyerStrength = "Very Weak";
            sellerStrength = "Very Strong";

        }

        String aiSummary = aiAnalysisService.analyzeCoin(
                btc,
                trend,
                support,
                resistance,
                buyerStrength,
                sellerStrength
        );

        return new DashboardAIResponse(aiSummary);

    }

}