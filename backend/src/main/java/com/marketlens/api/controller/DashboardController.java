package com.marketlens.api.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketlens.api.dto.DashboardAIResponse;
import com.marketlens.api.dto.DashboardOverviewResponse;
import com.marketlens.api.dto.DashboardResponse;
import com.marketlens.api.market.BinanceTicker;
import com.marketlens.api.service.BinanceService;
import com.marketlens.api.service.CoinGeckoService;
import com.marketlens.api.service.DashboardOverviewService;
import com.marketlens.api.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final CoinGeckoService coinGeckoService;
    private final BinanceService binanceService;
    private final DashboardOverviewService dashboardOverviewService;

    // Constructor Injection for both services
   public DashboardController(
        DashboardService dashboardService,
        DashboardOverviewService dashboardOverviewService,
        BinanceService binanceService,
        CoinGeckoService coinGeckoService) {

    this.dashboardService = dashboardService;
    this.dashboardOverviewService = dashboardOverviewService;
    this.binanceService = binanceService;
    this.coinGeckoService = coinGeckoService;
}

    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboardData();
    }

    @PostMapping("/analyze")
    public DashboardAIResponse analyzeDashboard() {
        return dashboardService.generateAIReport();
    }
    

    // New endpoint for overview metrics
    @GetMapping("/overview")
    public DashboardOverviewResponse getOverview() {
        return dashboardOverviewService.getOverview();
    }

    @GetMapping("/btc")
public BinanceTicker getBitcoinData() {
    return binanceService.getBitcoinData();
}
@GetMapping("/global")
public Object getGlobalData() {
    return coinGeckoService.getGlobalMarketData();
}

}