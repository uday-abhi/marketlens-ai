package com.marketlens.api.service;

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

        return restTemplate.getForObject(
                COINGECKO_URL,
                Map.class
        );

    }

}