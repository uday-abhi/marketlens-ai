package com.marketlens.api.dto;

/**
 * Simple DTO for timeframe analysis data.
 * Used in CoinAnalysisResponse for multi-timeframe view.
 */
public class TimeframeAnalysis {

    private String timeframe;
    private String trend;
    private double changePercentage;
    private String support;
    private String resistance;

    public TimeframeAnalysis() {}

    public TimeframeAnalysis(String timeframe, String trend, double changePercentage,
                             String support, String resistance) {
        this.timeframe = timeframe;
        this.trend = trend;
        this.changePercentage = changePercentage;
        this.support = support;
        this.resistance = resistance;
    }

    // Getters and setters
    public String getTimeframe() { return timeframe; }
    public void setTimeframe(String timeframe) { this.timeframe = timeframe; }

    public String getTrend() { return trend; }
    public void setTrend(String trend) { this.trend = trend; }

    public double getChangePercentage() { return changePercentage; }
    public void setChangePercentage(double changePercentage) { this.changePercentage = changePercentage; }

    public String getSupport() { return support; }
    public void setSupport(String support) { this.support = support; }

    public String getResistance() { return resistance; }
    public void setResistance(String resistance) { this.resistance = resistance; }
}