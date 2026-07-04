package com.marketlens.api.dto;

public class DashboardResponse {

    private String marketStatus;
    private int marketHealth;
    private int fearGreed;
    private double btcDominance;

    private String bitcoinPrice;
    private String ethereumPrice;
    private String solanaPrice;

    public DashboardResponse() {
    }

    public DashboardResponse(
            String marketStatus,
            int marketHealth,
            int fearGreed,
            double btcDominance,
            String bitcoinPrice,
            String ethereumPrice,
            String solanaPrice) {

        this.marketStatus = marketStatus;
        this.marketHealth = marketHealth;
        this.fearGreed = fearGreed;
        this.btcDominance = btcDominance;
        this.bitcoinPrice = bitcoinPrice;
        this.ethereumPrice = ethereumPrice;
        this.solanaPrice = solanaPrice;
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

    public String getBitcoinPrice() {
        return bitcoinPrice;
    }

    public void setBitcoinPrice(String bitcoinPrice) {
        this.bitcoinPrice = bitcoinPrice;
    }

    public String getEthereumPrice() {
        return ethereumPrice;
    }

    public void setEthereumPrice(String ethereumPrice) {
        this.ethereumPrice = ethereumPrice;
    }

    public String getSolanaPrice() {
        return solanaPrice;
    }

    public void setSolanaPrice(String solanaPrice) {
        this.solanaPrice = solanaPrice;
    }
}