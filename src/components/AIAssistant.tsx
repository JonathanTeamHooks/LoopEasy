"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type AIAssistantProps = {
  context?: string; // e.g., "upload", "playlist", "browse", "watch"
  onAction?: (action: string, data?: Record<string, unknown>) => void;
};

export default function AIAssistant({ context = "general", onAction }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Context-aware initial message
  useEffect(() => {
    const contextMessages: Record<string, string> = {
      upload: "👋 Ready to help with your uploads! I can enhance videos, add effects, generate captions, or create thumbnails. What would you like to do?",
      playlist: "👋 Let's build the perfect playlist! I can suggest the best video order, recommend handoff channels, or help optimize for engagement.",
      browse: "👋 Looking for something to watch? Tell me what mood you're in or what you're interested in, and I'll find the perfect channels for you.",
      watch: "👋 Enjoying the content? I can find similar channels, save this to your favorites, or tell you more about this creator.",
      dashboard: "👋 Welcome to your creator studio! I can help analyze your performance, suggest content ideas, or optimize your channels.",
      general: "👋 Hey! I'm your AI assistant. I can help you discover content, create channels, edit videos, or anything else you need.",
    };

    setMessages([{
      id: "welcome",
      role: "assistant",
      content: contextMessages[context] || contextMessages.general,
      timestamp: new Date(),
    }]);
  }, [context]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const contextSuggestions: Record<string, string[]> = {
    upload: ["Enhance my video", "Add cinematic look", "Generate captions", "Create thumbnail"],
    playlist: ["Optimize video order", "Suggest handoff channel", "Analyze duration", "Find similar content"],
    browse: ["I want to relax", "Something energetic", "Help me focus", "Make me laugh"],
    watch: ["Find similar channels", "Save to favorites", "About this creator", "Share this"],
    dashboard: ["Analyze my growth", "Content ideas", "Best posting times", "Revenue tips"],
    general: ["Help me find channels", "How do I create?", "Explain premium", "Contact support"],
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = getContextualResponse(input.toLowerCase(), context);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: responses,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getContextualResponse = (input: string, ctx: string): string => {
    // Simple pattern matching for demo
    if (input.includes("enhance") || input.includes("improve")) {
      return "✨ I can enhance your video with AI! This will automatically improve color balance, lighting, and clarity. Should I apply Auto-Enhance now?";
    }
    if (input.includes("cinematic") || input.includes("movie")) {
      return "🎬 Great choice! The Cinematic Look adds film-grade color grading, subtle letterboxing, and that Hollywood feel. Want me to apply it to your video?";
    }
    if (input.includes("caption") || input.includes("subtitle")) {
      return "💬 I'll generate accurate captions for your video using AI speech recognition. This usually takes about 30 seconds. Ready to start?";
    }
    if (input.includes("thumbnail")) {
      return "🖼️ I'll analyze your video and generate several thumbnail options using the best frames. You can choose your favorite or I can pick the one likely to get the most clicks!";
    }
    if (input.includes("relax") || input.includes("calm") || input.includes("chill")) {
      return "😌 For relaxation, I'd recommend:\n\n• **Calm Meditation** - Guided sessions\n• **Lofi Study Beats** - Chill background music\n• **Nature Escapes** - Peaceful scenery\n\nWant me to start playing one of these?";
    }
    if (input.includes("energetic") || input.includes("energy") || input.includes("workout")) {
      return "🔥 Let's get you pumped! Check out:\n\n• **HIIT Explosion** - High intensity workouts\n• **Power Playlist** - Motivational music\n• **Morning Motivation** - Start your day right\n\nWhich sounds good?";
    }
    if (input.includes("order") || input.includes("sequence") || input.includes("arrange")) {
      return "📊 Based on viewer retention data, I recommend this order:\n\n1. Start with high-energy content (hooks viewers)\n2. Build to your longest/best video\n3. End with a satisfying closer\n\nThis pattern increases average watch time by ~34%. Want me to reorder your playlist?";
    }
    if (input.includes("handoff") || input.includes("after") || input.includes("next channel")) {
      return "🔗 For handoff, I found channels with high audience overlap:\n\n• **Evening Yoga** (88% match)\n• **Meditation Daily** (82% match)\n• **Healthy Cooking** (76% match)\n\nConnecting to these could boost your cross-channel retention by 45%!";
    }
    if (input.includes("growth") || input.includes("analytics") || input.includes("stats")) {
      return "📈 Your channel is growing! Here's what I see:\n\n• Views up 127% this month\n• Best performing: Morning Motivation (2.4K daily)\n• Peak audience: 7-9 AM weekdays\n\nWant detailed insights or tips to grow faster?";
    }
    if (input.includes("help") || input.includes("what can")) {
      return "I can help with lots of things! Here's what I do best:\n\n🎬 **Creating** - Edit videos, add effects, generate thumbnails\n📺 **Discovering** - Find channels based on your mood\n📊 **Growing** - Analyze performance, optimize content\n💡 **Learning** - Explain features, answer questions\n\nWhat would you like to explore?";
    }
    
    return "Got it! Let me think about the best way to help with that. Is there anything specific you'd like me to focus on, or should I suggest some options?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg shadow-[#6366f1]/30 hover:shadow-xl hover:shadow-[#6366f1]/40 hover:scale-105 transition-all flex items-center justify-center group"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">🤖</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#22c55e] rounded-full border-2 border-[#0a0a0b] animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed z-50 bg-[#141416] border border-[#2a2a2e] shadow-2xl transition-all ${
      isMinimized 
        ? "bottom-6 right-6 w-72 rounded-2xl" 
        : "bottom-6 right-6 w-96 h-[600px] rounded-3xl flex flex-col"
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2e] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-lg">
            🤖
          </div>
          <div>
            <div className="font-semibold text-sm">AI Assistant</div>
            <div className="text-xs text-[#22c55e] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 rounded-lg hover:bg-[#1c1c1f] text-[#6b6b70] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMinimized ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              )}
            </svg>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-[#1c1c1f] text-[#6b6b70] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-2xl rounded-br-md"
                    : "bg-[#1c1c1f] text-[#e5e5e5] rounded-2xl rounded-bl-md"
                } p-3`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1c1c1f] rounded-2xl rounded-bl-md p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#6b6b70] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#6b6b70] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-2 h-2 bg-[#6b6b70] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {(contextSuggestions[context] || contextSuggestions.general).slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] text-xs text-[#a1a1a6] hover:border-[#6366f1] hover:text-white transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#2a2a2e]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
