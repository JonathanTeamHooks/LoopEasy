"use client";

import { useState } from "react";
import Link from "next/link";

const moods = [
  { emoji: "☀️", label: "Morning devotional", category: "Devotional", color: "from-amber-400 to-orange-500" },
  { emoji: "💪", label: "Kettlebell workout", category: "Fitness", color: "from-orange-500 to-red-500" },
  { emoji: "🔥", label: "Motivation boost", category: "Entertainment", color: "from-red-500 to-pink-500" },
  { emoji: "💻", label: "Coding tutorials", category: "Technology", color: "from-cyan-500 to-blue-500" },
  { emoji: "🎵", label: "Lo-fi focus music", category: "Music", color: "from-violet-500 to-purple-500" },
  { emoji: "😂", label: "Funny videos", category: "Entertainment", color: "from-yellow-500 to-orange-500" },
  { emoji: "🎬", label: "Watch a movie", category: "Entertainment", color: "from-rose-500 to-red-500" },
  { emoji: "🧘", label: "Meditation & sleep", category: "Wellness", color: "from-indigo-500 to-purple-500" },
];

type HeroSectionProps = {
  isLoaded: boolean;
};

export default function HeroSection({ isLoaded }: HeroSectionProps) {
  const [aiPrompt, setAiPrompt] = useState("");

  const handleSearch = () => {
    if (aiPrompt.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(aiPrompt.trim())}`;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* The Pain */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
            You've been settling for less
          </div>
        </div>

        <div className={`mb-8 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-2xl sm:text-3xl text-[#6b6b70] font-medium mb-4">
            YouTube is chaos — Netflix is passive
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="text-white">Loop is </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Easy</span>
              <span className="absolute -top-1 -right-6 text-2xl animate-pulse">✨</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] blur-2xl opacity-30 -z-10" />
            </span>
          </h1>
        </div>

        {/* Interactive AI Demo */}
        <div className={`mt-12 mb-12 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-3xl bg-[#141416] border border-[#2a2a2e] overflow-hidden">
              <div className="p-6">
                <div className="text-xl font-semibold text-white mb-2 text-left">What are you in the mood for?</div>
                <p className="text-[#6b6b70] text-sm mb-4 text-left">Just say it — we'll pull from your curators or find new ones you'll love</p>
                
                {/* Text Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="I want to..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    className="w-full px-5 py-4 bg-[#1c1c1f] border border-[#2a2a2e] rounded-2xl text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-all"
                  />
                  <button 
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all"
                  >
                    Go ✨
                  </button>
                </div>

                {/* Quick Picks */}
                <div className="text-xs text-[#6b6b70] mb-3 text-left">Or try a quick pick:</div>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood, i) => (
                    <Link
                      key={i}
                      href={`/browse?search=${encodeURIComponent(mood.label)}&category=${encodeURIComponent(mood.category)}`}
                      className="group px-4 py-2 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] hover:border-[#6366f1] transition-all hover:scale-[1.02] flex items-center gap-2"
                    >
                      <span>{mood.emoji}</span>
                      <span className="text-sm text-white group-hover:text-[#a855f7] transition-colors">{mood.label}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Creator CTA */}
                <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
                  <Link href="/upload" className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#f59e0b]/10 to-[#ef4444]/10 border border-[#f59e0b]/30 hover:border-[#f59e0b] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
                        <span className="text-lg">🎬</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white group-hover:text-[#f59e0b] transition-colors">Build your own loop</div>
                        <div className="text-xs text-[#a1a1a6]">Upload, AI enhances, display anywhere — no other software needed</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-[#f59e0b] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                {/* AI Branding */}
                <div className="mt-6 pt-4 border-t border-[#2a2a2e] flex items-center justify-center gap-2 text-sm text-[#6b6b70]">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                    <span className="text-xs">✨</span>
                  </div>
                  <span>Powered by <span className="text-[#a855f7]">LoopEasy AI</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/browse" className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-lg font-semibold rounded-full hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Start Watching Free
          </Link>
          <Link href="/upload" className="group w-full sm:w-auto px-8 py-4 bg-[#1c1c1f] border border-[#2a2a2e] text-white text-lg font-medium rounded-full hover:border-[#f59e0b] transition-all flex items-center justify-center gap-3">
            <span className="text-xl">✨</span>
            Create with AI
          </Link>
        </div>

        {/* Launch Banner */}
        <div className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-white font-medium">🚀 Just Launched</span>
            <span className="text-[#a1a1a6]">—</span>
            <span className="text-[#a855f7] font-semibold">Join the early creators</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#6b6b70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
