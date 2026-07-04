package com.marketlens.api.service;

import org.springframework.stereotype.Service;

import com.marketlens.api.dto.CoinAnalysisResponse;
import com.marketlens.api.market.MarketData;
import com.marketlens.api.market.MarketDataService;

@Service
public class CoinAnalysisService {

    private final MarketDataService marketDataService;

    public CoinAnalysisService(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    public CoinAnalysisResponse analyzeCoin(String symbol) {

        MarketData marketData = marketDataService.getMarketData(symbol);

        return new CoinAnalysisResponse(
                marketData.getSymbol(),
                marketData.getCurrentPrice(),
                marketData.getMarketTrend(),
                marketData.getMarketHealth(),
                90,
                "AI analysis will be added in the next phase."
        );
    }
}