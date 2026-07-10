package com.marketlens.api.ai;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.marketlens.api.ai.dto.Content;
import com.marketlens.api.ai.dto.GeminiRequest;
import com.marketlens.api.ai.dto.GeminiResponse;
import com.marketlens.api.ai.dto.Part;

@Component
public class GeminiClient {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public GeminiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateContent(String prompt) {

        Part part = new Part(prompt);

        Content content = new Content(List.of(part));

        GeminiRequest request = new GeminiRequest(List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GeminiRequest> entity =
                new HttpEntity<>(request, headers);

        GeminiResponse response =
                restTemplate.postForObject(
                        apiUrl + "?key=" + apiKey,
                        entity,
                        GeminiResponse.class
                );

        if (response == null
                || response.getCandidates() == null
                || response.getCandidates().isEmpty()) {

            return "Unable to generate AI analysis.";
        }

        return response
                .getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();

    }

}