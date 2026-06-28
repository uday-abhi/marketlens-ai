package com.marketlens.api.service;

import org.springframework.stereotype.Service;

import com.marketlens.api.dto.DashboardResponse;

@Service
public class DashboardService {

    public DashboardResponse getDashboardData() {

        return new DashboardResponse(
                "Bullish",
                82,
                71,
                63.5
        );
    }
}