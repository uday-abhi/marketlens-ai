package com.marketlens.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BinancePriceResponse {

    private String symbol;

    private String lastPrice;

    @JsonProperty("priceChangePercent")
    private String priceChangePercent;

    @JsonProperty("quoteVolume")
    private String volume;

    @JsonProperty("highPrice")
    private String highPrice;

    @JsonProperty("lowPrice")
    private String lowPrice;

    public BinancePriceResponse() {
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(String lastPrice) {
        this.lastPrice = lastPrice;
    }

    public String getPriceChangePercent() {
        return priceChangePercent;
    }

    public void setPriceChangePercent(String priceChangePercent) {
        this.priceChangePercent = priceChangePercent;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getHighPrice() {
        return highPrice;
    }

    public void setHighPrice(String highPrice) {
        this.highPrice = highPrice;
    }

    public String getLowPrice() {
        return lowPrice;
    }

    public void setLowPrice(String lowPrice) {
        this.lowPrice = lowPrice;
    }
}