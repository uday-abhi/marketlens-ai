package com.marketlens.api.dto;

public class CoinResponse {

    private String symbol;
    private String price;
    private String trend;

    public CoinResponse() {
    }

    public CoinResponse(String symbol, String price, String trend) {
        this.symbol = symbol;
        this.price = price;
        this.trend = trend;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTrend() {
        return trend;
    }

    public void setTrend(String trend) {
        this.trend = trend;
    }
}