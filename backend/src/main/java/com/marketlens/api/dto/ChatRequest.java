package com.marketlens.api.dto;

/**
 * Chat request DTO - holds user message for AI chat endpoint.
 *
 * Simple structure:
 * - message: the user's question or input
 */
public class ChatRequest {
    private String message;

    // Constructors
    public ChatRequest() {}

    public ChatRequest(String message) {
        this.message = message;
    }

    // Getters & Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
