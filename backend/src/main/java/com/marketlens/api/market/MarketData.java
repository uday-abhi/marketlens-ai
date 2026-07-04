package com.marketlens.api.market;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketData {

    private String symbol;
    private String currentPrice;
    private String marketTrend;
    private int marketHealth;
    private int fearGreed;
    private double btcDominance;

}