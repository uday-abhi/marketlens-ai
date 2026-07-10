package com.marketlens.api.dto;

public class DashboardOverviewResponse {

    private int fearGreed;
    private String fearGreedLabel;

    private double btcDominance;

    private String marketCap;
    private double marketCapChange;

    private String volume24h;
    private double volumeChange;

    private double btcPrice;
    private double btcChange;

    private String marketTrend;

    public DashboardOverviewResponse() {
    }

    public DashboardOverviewResponse(
            int fearGreed,
            String fearGreedLabel,
            double btcDominance,
            String marketCap,
            double marketCapChange,
            String volume24h,
            double volumeChange,
            double btcPrice,
            double btcChange,
            String marketTrend) {

        this.fearGreed = fearGreed;
        this.fearGreedLabel = fearGreedLabel;
        this.btcDominance = btcDominance;
        this.marketCap = marketCap;
        this.marketCapChange = marketCapChange;
        this.volume24h = volume24h;
        this.volumeChange = volumeChange;
        this.btcPrice = btcPrice;
        this.btcChange = btcChange;
        this.marketTrend = marketTrend;
    }

    public int getFearGreed() {
        return fearGreed;
    }

    public void setFearGreed(int fearGreed) {
        this.fearGreed = fearGreed;
    }

    public String getFearGreedLabel() {
        return fearGreedLabel;
    }

    public void setFearGreedLabel(String fearGreedLabel) {
        this.fearGreedLabel = fearGreedLabel;
    }

    public double getBtcDominance() {
        return btcDominance;
    }

    public void setBtcDominance(double btcDominance) {
        this.btcDominance = btcDominance;
    }

    public String getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(String marketCap) {
        this.marketCap = marketCap;
    }

    public double getMarketCapChange() {
        return marketCapChange;
    }

    public void setMarketCapChange(double marketCapChange) {
        this.marketCapChange = marketCapChange;
    }

    public String getVolume24h() {
        return volume24h;
    }

    public void setVolume24h(String volume24h) {
        this.volume24h = volume24h;
    }

    public double getVolumeChange() {
        return volumeChange;
    }

    public void setVolumeChange(double volumeChange) {
        this.volumeChange = volumeChange;
    }

    public double getBtcPrice() {
        return btcPrice;
    }

    public void setBtcPrice(double btcPrice) {
        this.btcPrice = btcPrice;
    }

    public double getBtcChange() {
        return btcChange;
    }

    public void setBtcChange(double btcChange) {
        this.btcChange = btcChange;
    }

    public String getMarketTrend() {
        return marketTrend;
    }

    public void setMarketTrend(String marketTrend) {
        this.marketTrend = marketTrend;
    }
}