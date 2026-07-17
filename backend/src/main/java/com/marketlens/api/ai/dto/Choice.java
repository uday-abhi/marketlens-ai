package com.marketlens.api.ai.dto;

public class Choice {

    private ChatMessage message;

    public Choice() {
    }

    public ChatMessage getMessage() {
        return message;
    }

    public void setMessage(ChatMessage message) {
        this.message = message;
    }
}