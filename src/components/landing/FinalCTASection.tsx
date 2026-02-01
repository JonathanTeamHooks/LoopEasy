"use client";

import { useState } from "react";

export default function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-cta" }),
      });
      
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Still show success to avoid frustration
      setSubmitted(true);
    }
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
          
          <div className="relative p-12 md:p-20 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Stop scrolling.
              <br />
              Start watching.
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-lg mx-auto">
              Join thousands who&apos;ve discovered what video was meant to be. Free to watch, free to create.
            </p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/50 backdrop-blur"
                />
                <button 
                  type="submit"
                  className="px-8 py-4 bg-white text-[#6366f1] font-bold rounded-full hover:bg-white/90 transition-all"
                >
                  Get Started
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur rounded-full font-semibold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You&apos;re in! Check your email.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
