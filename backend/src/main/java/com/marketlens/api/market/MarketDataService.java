package com.marketlens.api.market;

import org.springframework.stereotype.Service;

import com.marketlens.api.client.MarketClient;
import com.marketlens.api.dto.BinancePriceResponse;

@Service
public class MarketDataService {

    private final MarketClient marketClient;

    public MarketDataService(MarketClient marketClient) {
        this.marketClient = marketClient;
    }

    public MarketData getMarketData(String symbol) {

        BinancePriceResponse coin =
                marketClient.getCoinPrice(symbol);

        return new MarketData(

                coin.getSymbol(),

                coin.getLastPrice(),

                coin.getPriceChangePercent(),

                coin.getVolume(),

                coin.getHighPrice(),

                coin.getLowPrice()

        );

    }

}