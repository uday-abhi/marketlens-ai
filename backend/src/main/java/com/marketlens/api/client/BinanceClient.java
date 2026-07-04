package com.marketlens.api.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.marketlens.api.dto.BinancePriceResponse;

@Component
public class BinanceClient {

    private final RestTemplate restTemplate;

    public BinanceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public BinancePriceResponse getBitcoinPrice() {

        String url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";

        return restTemplate.getForObject(url, BinancePriceResponse.class);
    }
}