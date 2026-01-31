"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function WatchContent() {
  const searchParams = useSearchParams();
  const channelId = searchParams.get("channel") || "1";
  
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [showChat, setShowChat] = useState(true);
  const [isPremium] = useState(false); // Would come from auth
  const [showAdOverlay, setShowAdOverlay] = useState(!isPremium);

  // Mock channel data
  const channel = {
    name: channelId === "1" ? "Kettlebell HIIT" : channelId === "2" ? "Lofi Study Beats" : "Sample Channel",
    creator: channelId === "1" ? "@fitnessmike" : channelId === "2" ? "@chillhop" : "@creator",
    viewers: channelId === "1" ? "2.4K" : channelId === "2" ? "8.1K" : "1.2K",
    color: channelId === "1" ? "from-orange-500 to-red-600" : channelId === "2" ? "from-purple-500 to-indigo-600" : "from-gray-500 to-gray-700",
    thumbnail: channelId === "1" ? "🏋️" : channelId === "2" ? "🎵" : "📺",
  };

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "FitFan42", message: "Great workout! 💪", time: "2m ago" },
    { id: 2, user: "GymRat", message: "This is exactly what I needed today", time: "1m ago" },
    { id: 3, user: "HealthyLife", message: "Love this channel!", time: "45s ago" },
    { id: 4, user: "WorkoutQueen", message: "Anyone else doing this at 6am? 😅", time: "30s ago" },
    { id: 5, user: "FitnessJunkie", message: "My arms are on fire 🔥", time: "15s ago" },
  ]);

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };
    
    window.addEventListener("mousemove", resetTimeout);
    resetTimeout();
    
    return () => {
      window.removeEventListener("mousemove", resetTimeout);
      clearTimeout(timeout);
    };
  }, []);

  // Dismiss ad after 5 seconds
  useEffect(() => {
    if (showAdOverlay) {
      const timer = setTimeout(() => setShowAdOverlay(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAdOverlay]);

  return (
    <div className="fixed inset-0 bg-black">
      {/* Ad Overlay (for free users) */}
      {showAdOverlay && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="text-center">
            <div className="mb-4 px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium inline-block">
              AD • Skip in 5s
            </div>
            <div className="w-80 h-48 bg-gradient-to-br from-[#1c1c1f] to-[#2a2a2e] rounded-xl flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-sm text-[#6b6b70]">Advertisement Placeholder</div>
              </div>
            </div>
            <p className="text-[#6b6b70] text-sm mb-4">
              Upgrade to Premium for ad-free viewing
            </p>
            <Link 
              href="/#pricing"
              className="text-[#a855f7] hover:underline text-sm"
            >
              Go Premium →
            </Link>
          </div>
        </div>
      )}

      {/* Video Area */}
      <div className={`absolute inset-0 ${showChat ? 'right-80' : ''} transition-all bg-gradient-to-br ${channel.color}`}>
        {/* Simulated video content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[200px] opacity-20">{channel.thumbnail}</div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        {/* Top bar */}
        <div className={`absolute top-0 left-0 right-0 p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/channel/${channelId}`} className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors" title="Back to channel">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link href="/browse" className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors" title="Browse channels">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{channel.name}</h1>
                <p className="text-sm text-white/70">{channel.creator}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium">{channel.viewers} watching</span>
              </div>
              <button 
                onClick={() => setShowChat(!showChat)}
                className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Center play/pause */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && (
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full" />
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 accent-[#a855f7]"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">Up next: Core Crusher Workout</span>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="absolute top-0 right-0 bottom-0 w-80 bg-[#0a0a0b] border-l border-[#2a2a2e] flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-[#2a2a2e]">
            <h2 className="font-bold">Live Chat</h2>
            <p className="text-sm text-[#6b6b70]">{channel.viewers} viewers</p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {msg.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm text-[#a855f7]">{msg.user}</span>
                    <span className="text-xs text-[#6b6b70]">{msg.time}</span>
                  </div>
                  <p className="text-sm text-[#a1a1a6]">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat input */}
          <div className="p-4 border-t border-[#2a2a2e]">
            <div className="relative">
              <input
                type="text"
                placeholder="Send a message..."
                className="w-full px-4 py-3 bg-[#1c1c1f] border border-[#2a2a2e] rounded-full text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#6366f1] hover:text-[#a855f7] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black flex items-center justify-center"><div className="text-2xl">Loading...</div></div>}>
      <WatchContent />
    </Suspense>
  );
}
