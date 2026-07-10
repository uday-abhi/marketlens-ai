package com.marketlens.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketlens.api.dto.CoinAnalysisResponse;
import com.marketlens.api.service.CoinAnalysisService;

@RestController
@RequestMapping("/api/coin")
public class CoinAnalysisController {

    private final CoinAnalysisService coinAnalysisService;

    public CoinAnalysisController(CoinAnalysisService coinAnalysisService) {
        this.coinAnalysisService = coinAnalysisService;
    }

    // Market data only (no AI)
    @GetMapping("/{symbol}")
    public CoinAnalysisResponse getCoin(@PathVariable String symbol) {
        return coinAnalysisService.getCoinData(symbol);
    }

    // AI analysis
    @PostMapping("/{symbol}/analyze")
    public CoinAnalysisResponse analyzeCoin(@PathVariable String symbol) {
        return coinAnalysisService.analyzeCoin(symbol);
    }
}