package com.marketlens.api.dto;

public class DashboardResponse {

    private String marketStatus;

    public DashboardResponse() {
    }

    public DashboardResponse(String marketStatus) {
        this.marketStatus = marketStatus;
    }

    public String getMarketStatus() {
        return marketStatus;
    }

    public void setMarketStatus(String marketStatus) {
        this.marketStatus = marketStatus;
    }
}