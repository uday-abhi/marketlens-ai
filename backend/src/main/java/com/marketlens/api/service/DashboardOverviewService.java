package com.marketlens.api.service;

import org.springframework.stereotype.Service;
import java.util.Map;

import com.marketlens.api.dto.DashboardOverviewResponse;
import com.marketlens.api.market.BinanceTicker;
// Ensure your actual service classes are imported below if they sit in different packages:
// import com.marketlens.api.service.CoinGeckoService;
// import com.marketlens.api.service.BinanceService;
// import com.marketlens.api.service.FearGreedService;

@Service
public class DashboardOverviewService {

    // Assumed auto-injected helper services matching your property references
    private final CoinGeckoService coinGeckoService;
    private final BinanceService binanceService;
    private final FearGreedService fearGreedService;

    public DashboardOverviewService(
            CoinGeckoService coinGeckoService,
            BinanceService binanceService,
            FearGreedService fearGreedService) {
        this.coinGeckoService = coinGeckoService;
        this.binanceService = binanceService;
        this.fearGreedService = fearGreedService;
    }

    @SuppressWarnings("unchecked")
    public DashboardOverviewResponse getOverview() {

        Map<String, Object> global =
                coinGeckoService.getGlobalMarketData();

        Map<String, Object> data =
                (Map<String, Object>) global.get("data");

        Map<String, Double> marketCap =
                (Map<String, Double>) data.get("total_market_cap");

        Map<String, Double> volume =
                (Map<String, Double>) data.get("total_volume");

        Map<String, Double> dominance =
                (Map<String, Double>) data.get("market_cap_percentage");

        BinanceTicker btc =
                binanceService.getBitcoinData();

        return new DashboardOverviewResponse(
                fearGreedService.getFearGreedIndex(),
                fearGreedService.getFearGreedLabel(),

                dominance.get("btc"),

                formatTrillion(marketCap.get("usd")),

                ((Number)data.get("market_cap_change_percentage_24h_usd")).doubleValue(),

                formatBillion(volume.get("usd")),

                ((Number)data.get("volume_change_percentage_24h_usd")).doubleValue(),

                Double.parseDouble(btc.getLastPrice()),

                Double.parseDouble(btc.getPriceChangePercent()),

                getTrend(Double.parseDouble(btc.getPriceChangePercent()))
        );
    }

    // --- Helper Methods ---

    private String formatTrillion(double value) {
        return String.format("%.2fT", value / 1_000_000_000_000.0);
    }

    private String formatBillion(double value) {
        return String.format("%.2fB", value / 1_000_000_000.0);
    }

    private String getTrend(double change) {
        if (change >= 5)
            return "Strong Bullish";

        if (change >= 1)
            return "Bullish";

        if (change > -1)
            return "Sideways";

        if (change > -5)
            return "Bearish";

        return "Strong Bearish";
    }
}