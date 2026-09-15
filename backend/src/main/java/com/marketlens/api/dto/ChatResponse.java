package com.marketlens.api.dto;

/**
 * Chat response DTO - holds AI reply and validation flag.
 *
 * Structure:
 * - reply: the AI-generated response text
 * - isMarketRelated: true if question was about crypto/markets, false if off-topic
 */
public class ChatResponse {
    private String reply;
    private boolean isMarketRelated;

    // Constructors
    public ChatResponse() {}

    public ChatResponse(String reply, boolean isMarketRelated) {
        this.reply = reply;
        this.isMarketRelated = isMarketRelated;
    }

    // Getters & Setters
    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public boolean isMarketRelated() {
        return isMarketRelated;
    }

    public void setMarketRelated(boolean marketRelated) {
        isMarketRelated = marketRelated;
    }
}
