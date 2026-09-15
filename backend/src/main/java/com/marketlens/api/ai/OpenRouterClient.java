package com.marketlens.api.ai;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.marketlens.api.ai.dto.ChatMessage;
import com.marketlens.api.ai.dto.OpenRouterRequest;
import com.marketlens.api.ai.dto.OpenRouterResponse;

/**
 * Simple client for OpenRouter AI API.
 * 
 * Why separate class? 
 * - Separates AI logic from market data logic
 * - Easy to swap AI providers later
 * - Single responsibility: talk to OpenRouter API
 */
@Component
public class OpenRouterClient {

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.api.url}")
    private String apiUrl;

    @Value("${openrouter.api.model}")
    private String model;

    private final RestTemplate restTemplate;

    public OpenRouterClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Sends prompt to AI and returns response text.
     * Throws exception if API key missing or request fails.
     */
    public String generateContent(String prompt) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                "AI analysis requires OpenRouter API key. " +
                "Set OPENROUTER_API_KEY environment variable and restart."
            );
        }

        // Build request
        ChatMessage message = new ChatMessage("user", prompt);
        OpenRouterRequest request = new OpenRouterRequest(model, List.of(message));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.add("HTTP-Referer", "http://localhost:3000");
        headers.add("X-Title", "MarketLens AI");

        HttpEntity<OpenRouterRequest> entity = new HttpEntity<>(request, headers);

        try {
            OpenRouterResponse response = restTemplate.postForObject(apiUrl, entity, OpenRouterResponse.class);

            if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
                return "AI service returned empty response. Please try again.";
            }

            return response.getChoices().get(0).getMessage().getContent();

        } catch (org.springframework.web.client.HttpClientErrorException e) {
            if (e.getStatusCode().value() == 401) {
                throw new IllegalStateException("Invalid OpenRouter API key. Check your key and restart.");
            }
            throw new IllegalStateException("AI service error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new IllegalStateException("Could not connect to AI service. Check internet connection.");
        }
    }
}