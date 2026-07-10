package com.marketlens.api.dto;

public class DashboardAIResponse {

    private String aiSummary;

    public DashboardAIResponse() {
    }

    public DashboardAIResponse(String aiSummary) {
        this.aiSummary = aiSummary;
    }

    public String getAiSummary() {
        return aiSummary;
    }

    public void setAiSummary(String aiSummary) {
        this.aiSummary = aiSummary;
    }
}