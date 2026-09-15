package com.marketlens.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketlens.api.dto.CoinAnalysisResponse;
import com.marketlens.api.service.MarketService;

/**
 * Coin Analysis Controller - handles individual coin data and AI analysis.
 * 
 * Endpoints:
 * - GET /api/coin/{symbol}     -> Returns market data only
 * - POST /api/coin/{symbol}/analyze -> Returns market data + AI analysis
 */
@RestController
@RequestMapping("/api/coin")
public class CoinAnalysisController {

    private final MarketService marketService;

    public CoinAnalysisController(MarketService marketService) {
        this.marketService = marketService;
    }

    // Market data only (no AI)
    @GetMapping("/{symbol}")
    public CoinAnalysisResponse getCoin(@PathVariable String symbol) {
        return marketService.getCoinData(symbol);
    }

    // AI analysis
    @PostMapping("/{symbol}/analyze")
    public CoinAnalysisResponse analyzeCoin(@PathVariable String symbol) {
        return marketService.analyzeCoin(symbol);
    }
}