package com.marketlens.api.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CoinGeckoService {

    private static final String COINGECKO_URL =
            "https://api.coingecko.com/api/v3/global";

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public Map<String, Object> getGlobalMarketData() {

        try {

            return restTemplate.getForObject(
                    COINGECKO_URL,
                    Map.class
            );

        } catch (Exception e) {

            System.out.println("CoinGecko API unavailable: " + e.getMessage());

            Map<String, Object> data = new HashMap<>();

            Map<String, Object> marketData = new HashMap<>();
            marketData.put("market_cap_percentage", Map.of("btc", 0.0));

            data.put("data", marketData);

            return data;
        }
    }
}