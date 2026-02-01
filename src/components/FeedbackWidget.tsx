"use client";

import { useState } from "react";

// Sanitize input - strip all HTML, scripts, and potentially dangerous content
function sanitizeInput(input: string): string {
  return input
    // Remove all HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove script content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    // Remove javascript: URLs
    .replace(/javascript:/gi, "")
    // Remove data: URLs
    .replace(/data:/gi, "")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim()
    // Limit length
    .slice(0, 2000);
}

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitized = sanitizeInput(message);
    if (!sanitized || sanitized.length < 10) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: sanitized,
          pageUrl: window.location.pathname,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("");
        setCharCount(0);
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 2000);
    setMessage(value);
    setCharCount(value.length);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? "bg-[#1c1c1f] rotate-45" 
            : "bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:scale-110"
        }`}
        aria-label="Send feedback"
      >
        {isOpen ? (
          <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ) : (
          <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Feedback panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#141416] border border-[#2a2a2e] rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-[#2a2a2e] bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <span>💡</span>
              Share Your Ideas
            </h3>
            <p className="text-xs text-[#6b6b70] mt-1">
              Help us make LoopEasy better
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            <textarea
              value={message}
              onChange={handleChange}
              placeholder="What feature would you love to see? Any bugs to report? We read every suggestion!"
              className="w-full h-32 px-3 py-2 bg-[#1c1c1f] border border-[#2a2a2e] rounded-xl text-white text-sm placeholder-[#6b6b70] resize-none focus:outline-none focus:border-[#6366f1]"
              disabled={status === "sending" || status === "success"}
            />
            
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs ${charCount > 1800 ? "text-amber-400" : "text-[#6b6b70]"}`}>
                {charCount}/2000
              </span>
              
              <button
                type="submit"
                disabled={status === "sending" || status === "success" || message.length < 10}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : status === "error"
                    ? "bg-red-500 text-white"
                    : "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:opacity-90 disabled:opacity-50"
                }`}
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you!
                  </span>
                ) : status === "error" ? (
                  "Try again"
                ) : (
                  "Send Feedback"
                )}
              </button>
            </div>

            {status === "error" && (
              <p className="text-xs text-red-400 mt-2">
                Please enter at least 10 characters
              </p>
            )}
          </form>

          <div className="px-4 pb-4">
            <p className="text-[10px] text-[#6b6b70] text-center">
              Your feedback is stored securely and reviewed by our team
            </p>
          </div>
        </div>
      )}
    </>
  );
}
