package com.marketlens.api.dto;

public class DashboardResponse {

    private String marketStatus;
    private int marketHealth;
    private int fearGreed;
    private double btcDominance;

    public DashboardResponse() {
    }

    public DashboardResponse(String marketStatus, int marketHealth, int fearGreed, double btcDominance) {
        this.marketStatus = marketStatus;
        this.marketHealth = marketHealth;
        this.fearGreed = fearGreed;
        this.btcDominance = btcDominance;
    }

    public String getMarketStatus() {
        return marketStatus;
    }

    public void setMarketStatus(String marketStatus) {
        this.marketStatus = marketStatus;
    }

    public int getMarketHealth() {
        return marketHealth;
    }

    public void setMarketHealth(int marketHealth) {
        this.marketHealth = marketHealth;
    }

    public int getFearGreed() {
        return fearGreed;
    }

    public void setFearGreed(int fearGreed) {
        this.fearGreed = fearGreed;
    }

    public double getBtcDominance() {
        return btcDominance;
    }

    public void setBtcDominance(double btcDominance) {
        this.btcDominance = btcDominance;
    }
}