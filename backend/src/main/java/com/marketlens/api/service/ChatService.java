package com.marketlens.api.service;

import org.springframework.stereotype.Service;

import com.marketlens.api.ai.OpenRouterClient;
import com.marketlens.api.dto.ChatResponse;

/**
 * Chat Service - processes user messages and validates market-related questions.
 *
 * Flow:
 * 1. User sends message
 * 2. We send it to OpenRouter AI
 * 3. We validate if the question/answer is market-related
 * 4. Return response with validation flag
 *
 * Why validate?
 * - Chatbot should stay focused on crypto/market topics
 * - Off-topic questions get a friendly rejection
 * - Keeps interviews clean: "We built a market-focused AI, not a general chatbot"
 *
 * Market keywords: bitcoin, crypto, ethereum, blockchain, price, market, trading,
 * bullish, bearish, hodl, defi, nft, coin, token, exchange, etc.
 */
@Service
public class ChatService {

    private final OpenRouterClient openRouterClient;

    // List of market-related keywords (simple validation)
    private static final String[] MARKET_KEYWORDS = {
        "bitcoin", "crypto", "ethereum", "blockchain", "price", "market",
        "trading", "bullish", "bearish", "hodl", "defi", "nft", "coin",
        "token", "exchange", "binance", "wallet", "ledger", "altcoin",
        "satoshi", "whale", "pump", "dump", "volume", "dominance",
        "fear", "greed", "sentiment", "moon", "btc", "eth", "usd",
        "rally", "crash", "bull", "bear", "ath", "ema", "rsi", "macd",
        "staking", "mining", "yield", "liquidity", "swap", "ape"
    };

    public ChatService(OpenRouterClient openRouterClient) {
        this.openRouterClient = openRouterClient;
    }

    /**
     * Process user message and return AI response.
     *
     * @param userMessage the user's question/input
     * @return ChatResponse with AI reply and isMarketRelated flag
     */
    public ChatResponse processMessage(String userMessage) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return new ChatResponse("Please enter a question.", false);
        }

        try {
            // Build market-focused prompt
            String prompt = buildMarketPrompt(userMessage);

            // Send to OpenRouter AI
            String aiResponse = openRouterClient.generateContent(prompt);

            // Validate if question was market-related
            boolean isMarketRelated = isMarketRelated(userMessage, aiResponse);

            return new ChatResponse(aiResponse, isMarketRelated);

        } catch (IllegalStateException e) {
            // API key missing or other auth issue
            return new ChatResponse(
                "AI service is not available. Check that OPENROUTER_API_KEY is set.",
                false
            );
        } catch (Exception e) {
            return new ChatResponse(
                "Error processing your question. Please try again.",
                false
            );
        }
    }

    /**
     * Build a system prompt to guide AI responses toward market topics.
     *
     * @param userMessage the user's question
     * @return formatted prompt for OpenRouter
     */
    private String buildMarketPrompt(String userMessage) {
        return "You are a cryptocurrency market expert. Answer questions about Bitcoin, " +
               "altcoins, blockchain, trading, market trends, and crypto finance. " +
               "Keep answers concise (2-3 sentences). If the question is not about crypto/markets, " +
               "politely decline and redirect to market topics.\n\n" +
               "User question: " + userMessage;
    }

    /**
     * Simple validation: check if user's question contains market keywords.
     * This is a basic check - not perfect, but good for interviews.
     *
     * @param userMessage the original question
     * @param aiResponse the AI's response
     * @return true if question appears market-related
     */
    private boolean isMarketRelated(String userMessage, String aiResponse) {
        String combined = (userMessage + " " + aiResponse).toLowerCase();

        for (String keyword : MARKET_KEYWORDS) {
            if (combined.contains(keyword)) {
                return true;
            }
        }

        // If AI explicitly says "not related to crypto", mark as non-market
        if (aiResponse.toLowerCase().contains("not related") ||
            aiResponse.toLowerCase().contains("outside my expertise") ||
            aiResponse.toLowerCase().contains("cryptocurrency topic")) {
            return false;
        }

        return false; // Default: if no keywords, probably not market-related
    }
}
