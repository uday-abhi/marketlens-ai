package com.marketlens.api.service;

import org.springframework.stereotype.Service;

import com.marketlens.api.dto.DashboardResponse;
import com.marketlens.api.market.MarketData;
import com.marketlens.api.market.MarketDataService;

@Service
public class DashboardService {

    private final MarketDataService marketDataService;

    public DashboardService(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    public DashboardResponse getDashboardData() {

        MarketData marketData = marketDataService.getMarketData("BTC");

        return new DashboardResponse(
                marketData.getMarketTrend(),
                marketData.getMarketHealth(),
                marketData.getFearGreed(),
                marketData.getBtcDominance(),
                marketData.getCurrentPrice()
        );
    }
}