package com.marketlens.api.market;

public class MarketData {

    private String symbol;
    private String currentPrice;
    private String change24h;
    private String volume;
    private String highPrice;
    private String lowPrice;

    public MarketData(
            String symbol,
            String currentPrice,
            String change24h,
            String volume,
            String highPrice,
            String lowPrice) {

        this.symbol = symbol;
        this.currentPrice = currentPrice;
        this.change24h = change24h;
        this.volume = volume;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getCurrentPrice() {
        return currentPrice;
    }

    public String getChange24h() {
        return change24h;
    }

    public String getVolume() {
        return volume;
    }

    public String getHighPrice() {
        return highPrice;
    }

    public String getLowPrice() {
        return lowPrice;
    }

}