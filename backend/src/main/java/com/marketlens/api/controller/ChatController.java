package com.marketlens.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketlens.api.dto.ChatRequest;
import com.marketlens.api.dto.ChatResponse;
import com.marketlens.api.service.ChatService;

/**
 * Chat Controller - handles AI chatbot interactions.
 *
 * Endpoint:
 * - POST /api/chat - sends user message, gets AI response
 *
 * Architecture:
 * - Controller receives message → ChatService processes → OpenRouter AI replies
 * - ChatService validates if question is market-related
 * - Returns response with validation flag
 *
 * Why separate ChatService?
 * - Keeps AI logic in one place
 * - Reusable for other endpoints
 * - Easy to test and mock
 */
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    // Constructor injection
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    /**
     * POST /api/chat
     * User sends message → AI responds
     *
     * Request body: { "message": "What is Bitcoin?" }
     * Response: { "reply": "Bitcoin is...", "isMarketRelated": true }
     *
     * @param chatRequest user message
     * @return ChatResponse with AI reply and market-related flag
     */
    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest chatRequest) {
        return chatService.processMessage(chatRequest.getMessage());
    }
}
