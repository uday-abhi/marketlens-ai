package com.marketlens.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.marketlens.api.market.BinanceTicker;

@Service
public class BinanceService {

    private static final String BINANCE_URL =
            "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT";

    private final RestTemplate restTemplate = new RestTemplate();

    public BinanceTicker getBitcoinData() {

        return restTemplate.getForObject(
                BINANCE_URL,
                BinanceTicker.class
        );

    }

}