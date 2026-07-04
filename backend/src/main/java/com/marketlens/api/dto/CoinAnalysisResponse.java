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
    private String trend;
    private int marketHealth;
    private int confidence;
    private String aiSummary;

}