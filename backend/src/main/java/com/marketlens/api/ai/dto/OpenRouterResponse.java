package com.marketlens.api.ai.dto;

import java.util.List;

public class OpenRouterResponse {

    private List<Choice> choices;

    public OpenRouterResponse() {
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }
}