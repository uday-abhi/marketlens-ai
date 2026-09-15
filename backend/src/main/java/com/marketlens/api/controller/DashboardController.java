package com.marketlens.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketlens.api.dto.DashboardAIResponse;
import com.marketlens.api.dto.DashboardOverviewResponse;
import com.marketlens.api.service.MarketService;

/**
 * Dashboard Controller - handles dashboard-related API endpoints.
 * 
 * Architecture: Controller -> Service -> External APIs
 * - Controller: Handles HTTP requests/responses
 * - MarketService: Business logic + external API calls
 * - External APIs: CoinGecko, Binance, Alternative.me, OpenRouter
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final MarketService marketService;

    // Constructor injection - Spring creates MarketService and passes it here
    public DashboardController(MarketService marketService) {
        this.marketService = marketService;
    }

    // GET /api/dashboard/overview - Returns market overview data
    @GetMapping("/overview")
    public DashboardOverviewResponse getOverview() {
        return marketService.getOverview();
    }

    // POST /api/dashboard/analyze - Generates AI market report
    @PostMapping("/analyze")
    public DashboardAIResponse analyzeDashboard() {
        String aiSummary = marketService.generateAIReport();
        return new DashboardAIResponse(aiSummary);
    }
}