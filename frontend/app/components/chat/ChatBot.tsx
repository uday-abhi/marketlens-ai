"use client";

/**
 * ChatBot Component - Interactive AI chat for market questions.
 *
 * Features:
 * - Messages list (user vs AI styled differently)
 * - Input field with send button
 * - Market-related validation indicator
 * - Smooth scroll-to-bottom on new message
 * - Loading spinner during API call
 *
 * Interview talking point:
 * "The chatbot validates if questions are market-related. Non-market questions
 * get a friendly rejection. It uses the same OpenRouter API as market analysis."
 */

import { SendHorizontal, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  isMarketRelated?: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:9090";

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! I'm your crypto market assistant. Ask me anything about Bitcoin, trading, market trends, or crypto investing. What would you like to know?",
      isUser: false,
      isMarketRelated: true,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        isUser: false,
        isMarketRelated: data.isMarketRelated,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process that. Make sure the backend is running and you have an OPENROUTER_API_KEY set.",
        isUser: false,
        isMarketRelated: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 px-6 py-4">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-blue-400" />
          <h2 className="text-lg font-bold text-white">Market Assistant</h2>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Ask about crypto, trading, and market trends
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-3 text-sm ${
                msg.isUser
                  ? "bg-blue-600 text-white"
                  : `${
                      msg.isMarketRelated
                        ? "bg-slate-700 text-slate-100"
                        : "bg-amber-900/30 text-amber-100 border border-amber-700/50"
                    }`
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-slate-700 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 bg-slate-800/50 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about Bitcoin, trading, markets..."
            className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
