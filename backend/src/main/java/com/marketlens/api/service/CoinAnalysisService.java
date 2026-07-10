package com.marketlens.api.service;

import java.text.DecimalFormat;

import org.springframework.stereotype.Service;

import com.marketlens.api.ai.AIAnalysisService;
import com.marketlens.api.dto.CoinAnalysisResponse;
import com.marketlens.api.market.MarketData;
import com.marketlens.api.market.MarketDataService;

@Service
public class CoinAnalysisService {

    private final MarketDataService marketDataService;
    private final AIAnalysisService aiAnalysisService;

    public CoinAnalysisService(
            MarketDataService marketDataService,
            AIAnalysisService aiAnalysisService) {

        this.marketDataService = marketDataService;
        this.aiAnalysisService = aiAnalysisService;
    }

    public CoinAnalysisResponse getCoinData(String symbol) {

        return buildResponse(symbol, false);

    }

    public CoinAnalysisResponse analyzeCoin(String symbol) {

        return buildResponse(symbol, true);

    }

    private CoinAnalysisResponse buildResponse(
            String symbol,
            boolean generateAI) {

        MarketData marketData =
                marketDataService.getMarketData(symbol);

        double currentPrice =
                Double.parseDouble(marketData.getCurrentPrice());

        double change24h =
                Double.parseDouble(marketData.getChange24h());

        DecimalFormat df = new DecimalFormat("#.##");

        String support =
                df.format(currentPrice * 0.98);

        String resistance =
                df.format(currentPrice * 1.02);

        String buyerStrength;
        String sellerStrength;
        String trend;

        if (change24h >= 5) {

            trend = "Strong Bullish";
            buyerStrength = "Very Strong";
            sellerStrength = "Very Weak";

        } else if (change24h >= 1) {

            trend = "Bullish";
            buyerStrength = "Strong";
            sellerStrength = "Weak";

        } else if (change24h > -1) {

            trend = "Sideways";
            buyerStrength = "Balanced";
            sellerStrength = "Balanced";

        } else if (change24h > -5) {

            trend = "Bearish";
            buyerStrength = "Weak";
            sellerStrength = "Strong";

        } else {

            trend = "Strong Bearish";
            buyerStrength = "Very Weak";
            sellerStrength = "Very Strong";

        }

        String aiSummary = "";

        if (generateAI) {

            aiSummary = aiAnalysisService.analyzeCoin(
                    marketData,
                    trend,
                    support,
                    resistance,
                    buyerStrength,
                    sellerStrength
            );

        }

        return new CoinAnalysisResponse(

                marketData.getSymbol(),
                marketData.getCurrentPrice(),
                marketData.getChange24h(),
                marketData.getVolume(),
                marketData.getHighPrice(),
                marketData.getLowPrice(),
                trend,
                support,
                resistance,
                buyerStrength,
                sellerStrength,
                aiSummary

        );

    }

}