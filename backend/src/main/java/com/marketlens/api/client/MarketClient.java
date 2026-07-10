package com.marketlens.api.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.marketlens.api.dto.BinancePriceResponse;

@Component
public class MarketClient {

    private final RestTemplate restTemplate;

    public MarketClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public BinancePriceResponse getCoinPrice(String symbol) {

        String url =
                "https://api.binance.com/api/v3/ticker/24hr?symbol="
                        + symbol.toUpperCase()
                        + "USDT";

        return restTemplate.getForObject(
                url,
                BinancePriceResponse.class
        );
    }
}