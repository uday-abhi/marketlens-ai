package com.marketlens.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoinAnalysisResponse {

    private String symbol;

    private String currentPrice;

    private String change24h;

    private String volume;

    private String highPrice;

    private String lowPrice;

    private String trend;

    private String support;

    private String resistance;

    private String buyerStrength;

    private String sellerStrength;

    private String aiSummary;

}