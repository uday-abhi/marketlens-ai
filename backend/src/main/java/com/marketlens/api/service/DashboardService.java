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

        MarketData btc = marketDataService.getMarketData("BTC");
        MarketData eth = marketDataService.getMarketData("ETH");
        MarketData sol = marketDataService.getMarketData("SOL");

        return new DashboardResponse(
                btc.getMarketTrend(),
                btc.getMarketHealth(),
                btc.getFearGreed(),
                btc.getBtcDominance(),
                btc.getCurrentPrice(),
                eth.getCurrentPrice(),
                sol.getCurrentPrice()
        );
    }
}