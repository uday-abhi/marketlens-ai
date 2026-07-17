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

    public String generateContent(String prompt) {

        ChatMessage message = new ChatMessage(
                "user",
                prompt
        );

        OpenRouterRequest request =
                new OpenRouterRequest(
                        model,
                        List.of(message)
                );

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        headers.add("HTTP-Referer", "http://localhost:3000");
        headers.add("X-Title", "MarketLens AI");

        HttpEntity<OpenRouterRequest> entity =
                new HttpEntity<>(request, headers);

        OpenRouterResponse response =
                restTemplate.postForObject(
                        apiUrl,
                        entity,
                        OpenRouterResponse.class
                );

        if (response == null
                || response.getChoices() == null
                || response.getChoices().isEmpty()) {

            return "Unable to generate AI analysis.";
        }

        return response.getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}