package com.marketlens.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.marketlens.api.ai.OpenRouterClient;
import com.marketlens.api.dto.CoinAnalysisResponse;
import com.marketlens.api.dto.DashboardOverviewResponse;
import com.marketlens.api.dto.TimeframeAnalysis;
import com.marketlens.api.exception.ExternalServiceException;

/**
 * Single service that handles ALL market data fetching.
 * 
 * Why one service? 
 * - Easier to understand for beginners
 * - Less files to navigate
 * - Clear flow: Controller -> Service -> External APIs
 * 
 * This replaces: CoinGeckoService, BinanceService, FearGreedService, 
 * MarketDataService, MarketClient, TimeframeAnalysisService
 */
@Service
public class MarketService {

    private final RestTemplate restTemplate;
    private final OpenRouterClient openRouterClient;

    // Cache for Fear & Greed (simple in-memory cache)
    private int cachedFearGreed = 50;
    private String cachedFearGreedLabel = "Neutral";
    private long fearGreedCacheTime = 0;
    private static final long CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

    public MarketService(RestTemplate restTemplate, OpenRouterClient openRouterClient) {
        this.restTemplate = restTemplate;
        this.openRouterClient = openRouterClient;
    }

    /**
     * Get complete dashboard overview - combines data from multiple APIs
     * Called by: DashboardController.getOverview()
     */
    public DashboardOverviewResponse getOverview() {
        // 1. Get global market data from CoinGecko
        Map<String, Object> global = getGlobalMarketData();
        Map<String, Object> data = getMap(global, "data");

        // 2. Extract market cap, volume, dominance
        Map<String, Object> marketCap = getMap(data, "total_market_cap");
        Map<String, Object> volume = getMap(data, "total_volume");
        Map<String, Object> dominance = getMap(data, "market_cap_percentage");

        // 3. Get Bitcoin price from Binance
        Map<String, Object> btcTicker = getBitcoinTicker();

        // 4. Get Fear & Greed (with caching)
        refreshFearGreedIfNeeded();

        // 5. Build response
        double btcPrice = Double.parseDouble(btcTicker.get("lastPrice").toString());
        double btcChange = Double.parseDouble(btcTicker.get("priceChangePercent").toString());

        return new DashboardOverviewResponse(
            cachedFearGreed,
            cachedFearGreedLabel,
            getNumber(dominance, "btc"),
            formatTrillion(getNumber(marketCap, "usd")),
            getNumber(data, "market_cap_change_percentage_24h_usd"),
            formatBillion(getNumber(volume, "usd")),
            getNumber(data, "volume_change_percentage_24h_usd"),
            btcPrice,
            btcChange,
            getTrend(btcChange)
        );
    }

    /**
     * Get coin data from Binance (no AI analysis)
     * Called by: CoinAnalysisController.getCoin()
     */
    public CoinAnalysisResponse getCoinData(String symbol) {
        return buildCoinResponse(symbol, false);
    }

    /**
     * Get coin data WITH AI analysis
     * Called by: CoinAnalysisController.analyzeCoin()
     */
    public CoinAnalysisResponse analyzeCoin(String symbol) {
        return buildCoinResponse(symbol, true);
    }

    /**
     * Generate AI report for dashboard
     * Called by: DashboardController.analyzeDashboard()
     */
    public String generateAIReport() {
        // Get BTC data
        Map<String, Object> btcTicker = getBitcoinTicker();
        double currentPrice = Double.parseDouble(btcTicker.get("lastPrice").toString());
        double change = Double.parseDouble(btcTicker.get("priceChangePercent").toString());

        // Calculate support/resistance (simple 2% bands)
        String support = String.format("%.2f", currentPrice * 0.98);
        String resistance = String.format("%.2f", currentPrice * 1.02);

        // Determine trend
        String trend = getTrend(change);
        String buyerStrength = change > 0 ? "Strong" : "Weak";
        String sellerStrength = change > 0 ? "Weak" : "Strong";

        // Generate AI analysis
        return openRouterClient.generateContent(buildAIPrompt(
            "BTC", String.valueOf(currentPrice), String.valueOf(change),
            btcTicker.get("highPrice").toString(), btcTicker.get("lowPrice").toString(),
            btcTicker.get("quoteVolume").toString(),
            trend, support, resistance, buyerStrength, sellerStrength
        ));
    }

    // ========== PRIVATE HELPER METHODS ==========

    private CoinAnalysisResponse buildCoinResponse(String symbol, boolean generateAI) {
        // Normalize symbol (e.g., "btc" -> "BTC", remove USDT)
        String normalized = symbol == null ? "" : symbol.trim().toUpperCase().replace("USDT", "");
        
        // Fetch from Binance
        String url = "https://api.binance.com/api/v3/ticker/24hr?symbol=" + normalized + "USDT";
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        
        if (response == null || response.get("lastPrice") == null) {
            throw new ExternalServiceException("No data found for " + symbol);
        }

        // Extract data
        double currentPrice = Double.parseDouble(response.get("lastPrice").toString());
        double change24h = Double.parseDouble(response.get("priceChangePercent").toString());

        // Simple support/resistance calculation (2% bands)
        String support = String.format("%.2f", currentPrice * 0.98);
        String resistance = String.format("%.2f", currentPrice * 1.02);

        // Determine trend and strength
        String trend = getTrend(change24h);
        String buyerStrength, sellerStrength;
        if (change24h >= 5) {
            buyerStrength = "Very Strong"; sellerStrength = "Very Weak";
        } else if (change24h >= 1) {
            buyerStrength = "Strong"; sellerStrength = "Weak";
        } else if (change24h > -1) {
            buyerStrength = "Balanced"; sellerStrength = "Balanced";
        } else if (change24h > -5) {
            buyerStrength = "Weak"; sellerStrength = "Strong";
        } else {
            buyerStrength = "Very Weak"; sellerStrength = "Very Strong";
        }

        // AI analysis (optional)
        String aiSummary = "";
        List<TimeframeAnalysis> timeframeAnalysis = new ArrayList<>();

        if (generateAI) {
            aiSummary = openRouterClient.generateContent(buildAIPrompt(
                normalized,
                String.valueOf(currentPrice),
                String.valueOf(change24h),
                response.get("highPrice").toString(),
                response.get("lowPrice").toString(),
                response.get("quoteVolume").toString(),
                trend, support, resistance, buyerStrength, sellerStrength
            ));
            
            // Add timeframe analysis
            timeframeAnalysis = analyzeTimeframes(normalized);
        }

        return new CoinAnalysisResponse(
            normalized,
            String.valueOf(currentPrice),
            String.valueOf(change24h),
            response.get("quoteVolume").toString(),
            response.get("highPrice").toString(),
            response.get("lowPrice").toString(),
            trend,
            support,
            resistance,
            buyerStrength,
            sellerStrength,
            aiSummary,
            timeframeAnalysis
        );
    }

    private List<TimeframeAnalysis> analyzeTimeframes(String symbol) {
        List<TimeframeAnalysis> results = new ArrayList<>();
        
        // Analyze multiple timeframes
        String[][] timeframes = {
            {"1d", "1 Day", "30"},
            {"4h", "4 Hours", "42"},
            {"1h", "1 Hour", "48"},
            {"15m", "15 Minutes", "64"},
            {"5m", "5 Minutes", "60"}
        };

        for (String[] tf : timeframes) {
            try {
                String interval = tf[0];
                String label = tf[1];
                int limit = Integer.parseInt(tf[2]);

                String url = "https://api.binance.com/api/v3/klines?symbol=" 
                    + symbol + "USDT&interval=" + interval + "&limit=" + limit;
                
                @SuppressWarnings("unchecked")
                List<List<Object>> candles = restTemplate.getForObject(url, List.class);
                
                if (candles != null && !candles.isEmpty()) {
                    double firstClose = Double.parseDouble(candles.get(0).get(4).toString());
                    double lastClose = Double.parseDouble(candles.get(candles.size() - 1).get(4).toString());
                    
                    double support = candles.stream()
                        .mapToDouble(c -> Double.parseDouble(c.get(3).toString()))
                        .min().orElse(lastClose);
                    double resistance = candles.stream()
                        .mapToDouble(c -> Double.parseDouble(c.get(2).toString()))
                        .max().orElse(lastClose);
                    
                    double change = ((lastClose - firstClose) / firstClose) * 100;
                    
                    results.add(new TimeframeAnalysis(
                        label,
                        getTrend(change),
                        change,
                        String.format("%.2f", support),
                        String.format("%.2f", resistance)
                    ));
                }
            } catch (Exception e) {
                // Skip failed timeframes silently
            }
        }
        return results;
    }

    private String buildAIPrompt(String symbol, String price, String change,
                                 String high, String low, String volume,
                                 String trend, String support, String resistance,
                                 String buyerStrength, String sellerStrength) {
        return """
            You are a professional cryptocurrency market analyst.
            
            Analyze this market data and provide a clear report:
            
            Coin: %s
            Current Price: $%s
            24h Change: %s%%
            24h High: $%s
            24h Low: $%s
            24h Volume: %s
            Trend: %s
            Support: $%s
            Resistance: $%s
            Buyer Strength: %s
            Seller Strength: %s
            
            Write a report with these sections:
            Market Condition
            Why is the Market Moving?
            Key Levels to Watch
            Trading Outlook
            Risk Factors
            
            Be balanced - show both bullish and bearish views.
            Don't guarantee profits. Explain what the numbers mean.
            """.formatted(symbol, price, change, high, low, volume, trend, support, resistance, buyerStrength, sellerStrength);
    }

    // --- API Calls ---

    @SuppressWarnings("unchecked")
    private Map<String, Object> getGlobalMarketData() {
        try {
            return restTemplate.getForObject("https://api.coingecko.com/api/v3/global", Map.class);
        } catch (Exception e) {
            throw new ExternalServiceException("Failed to fetch global market data", e);
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> getBitcoinTicker() {
        try {
            return restTemplate.getForObject("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT", Map.class);
        } catch (Exception e) {
            throw new ExternalServiceException("Failed to fetch Bitcoin data", e);
        }
    }

    private void refreshFearGreedIfNeeded() {
        long now = System.currentTimeMillis();
        if (now - fearGreedCacheTime < CACHE_TTL_MS) {
            return; // Cache still valid
        }

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> body = restTemplate.getForObject("https://api.alternative.me/fng/", Map.class);
            if (body != null) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> entries = (List<Map<String, Object>>) body.get("data");
                if (entries != null && !entries.isEmpty()) {
                    String rawValue = String.valueOf(entries.get(0).get("value"));
                    cachedFearGreed = Integer.parseInt(rawValue.trim());
                    cachedFearGreedLabel = classifyFearGreed(cachedFearGreed);
                    fearGreedCacheTime = now;
                }
            }
        } catch (Exception e) {
            // Keep cached values on error
            fearGreedCacheTime = now;
        }
    }

    private String classifyFearGreed(int value) {
        if (value >= 80) return "Extreme Greed";
        if (value >= 60) return "Greed";
        if (value >= 40) return "Neutral";
        if (value >= 20) return "Fear";
        return "Extreme Fear";
    }

    // --- Utility Methods ---

    @SuppressWarnings("unchecked")
    private Map<String, Object> getMap(Map<String, Object> source, String key) {
        Object value = source.get(key);
        if (!(value instanceof Map<?, ?>)) {
            throw new IllegalStateException("Missing data: " + key);
        }
        return (Map<String, Object>) value;
    }

    private double getNumber(Map<String, Object> source, String key) {
        Object value = source.get(key);
        return value instanceof Number n ? n.doubleValue() : 0.0;
    }

    private String formatTrillion(double value) {
        return String.format("%.2fT", value / 1_000_000_000_000.0);
    }

    private String formatBillion(double value) {
        return String.format("%.2fB", value / 1_000_000_000.0);
    }

    private String getTrend(double change) {
        if (change >= 5) return "Strong Bullish";
        if (change >= 1) return "Bullish";
        if (change > -1) return "Sideways";
        if (change > -5) return "Bearish";
        return "Strong Bearish";
    }
}