package com.marketlens.api.dto;

import java.util.List;

/**
 * Simple DTO for coin analysis data.
 * No Lombok annotations - manual getters/setters for clarity.
 */
public class CoinAnalysisResponse {

    private String symbol;
    private String currentPrice;
    private String change24h;
    private String volume;
    private String highPrice;
    private String lowPrice;
    private String trend;
    private String support;
    private String resistance;
    private String buyerStrength;
    private String sellerStrength;
    private String aiSummary;
    private List<TimeframeAnalysis> timeframeAnalysis;

    public CoinAnalysisResponse() {}

    public CoinAnalysisResponse(String symbol, String currentPrice, String change24h,
                                String volume, String highPrice, String lowPrice,
                                String trend, String support, String resistance,
                                String buyerStrength, String sellerStrength,
                                String aiSummary, List<TimeframeAnalysis> timeframeAnalysis) {
        this.symbol = symbol;
        this.currentPrice = currentPrice;
        this.change24h = change24h;
        this.volume = volume;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.trend = trend;
        this.support = support;
        this.resistance = resistance;
        this.buyerStrength = buyerStrength;
        this.sellerStrength = sellerStrength;
        this.aiSummary = aiSummary;
        this.timeframeAnalysis = timeframeAnalysis;
    }

    // Getters and setters
    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(String currentPrice) { this.currentPrice = currentPrice; }

    public String getChange24h() { return change24h; }
    public void setChange24h(String change24h) { this.change24h = change24h; }

    public String getVolume() { return volume; }
    public void setVolume(String volume) { this.volume = volume; }

    public String getHighPrice() { return highPrice; }
    public void setHighPrice(String highPrice) { this.highPrice = highPrice; }

    public String getLowPrice() { return lowPrice; }
    public void setLowPrice(String lowPrice) { this.lowPrice = lowPrice; }

    public String getTrend() { return trend; }
    public void setTrend(String trend) { this.trend = trend; }

    public String getSupport() { return support; }
    public void setSupport(String support) { this.support = support; }

    public String getResistance() { return resistance; }
    public void setResistance(String resistance) { this.resistance = resistance; }

    public String getBuyerStrength() { return buyerStrength; }
    public void setBuyerStrength(String buyerStrength) { this.buyerStrength = buyerStrength; }

    public String getSellerStrength() { return sellerStrength; }
    public void setSellerStrength(String sellerStrength) { this.sellerStrength = sellerStrength; }

    public String getAiSummary() { return aiSummary; }
    public void setAiSummary(String aiSummary) { this.aiSummary = aiSummary; }

    public List<TimeframeAnalysis> getTimeframeAnalysis() { return timeframeAnalysis; }
    public void setTimeframeAnalysis(List<TimeframeAnalysis> timeframeAnalysis) { this.timeframeAnalysis = timeframeAnalysis; }
}
