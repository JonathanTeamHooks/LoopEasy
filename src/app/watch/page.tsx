"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Video, Channel } from "@/types/database";

function formatViews(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

function WatchContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showChat, setShowChat] = useState(true);

  // Mock chat messages
  const [chatMessages] = useState([
    { id: 1, user: "Viewer1", message: "Great content! 👍", time: "2m ago" },
    { id: 2, user: "FanUser", message: "This is awesome", time: "1m ago" },
    { id: 3, user: "WatchParty", message: "Love this channel!", time: "45s ago" },
    { id: 4, user: "Streamer22", message: "Anyone else watching? 😊", time: "30s ago" },
    { id: 5, user: "NightOwl", message: "Perfect vibes 🔥", time: "15s ago" },
  ]);

  useEffect(() => {
    async function fetchVideo() {
      if (!videoId) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      
      // Fetch video
      const { data: videoData, error: videoError } = await supabase
        .from("videos")
        .select("*")
        .eq("id", videoId)
        .single();
      
      if (videoError || !videoData) {
        console.error("Error fetching video:", videoError);
        setLoading(false);
        return;
      }
      
      setVideo(videoData);
      
      // Fetch channel
      const { data: channelData } = await supabase
        .from("channels")
        .select("*")
        .eq("id", videoData.channel_id)
        .single();
      
      if (channelData) {
        setChannel(channelData);
      }
      
      setLoading(false);
    }
    
    fetchVideo();
  }, [videoId]);

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Video not found</h1>
        <Link href="/browse" className="text-[#6366f1] hover:underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white flex">
      {/* Video Section */}
      <div className={`flex-1 relative ${showChat ? "" : "w-full"}`}>
        {/* Video Player */}
        <div className="absolute inset-0" onClick={togglePlay}>
          {video.video_url ? (
            <video
              ref={videoRef}
              src={video.video_url}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <p className="text-gray-400">Video not available</p>
            </div>
          )}
        </div>
        
        {/* Controls Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <Link href="/browse" className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2 rounded-full transition-colors ${showChat ? "bg-[#6366f1]" : "bg-black/50 hover:bg-black/70"}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          )}
          
          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Channel Info */}
            <div className="flex items-center gap-4 mb-4">
              <Link href={`/channel/${channel?.id}`} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] overflow-hidden flex items-center justify-center">
                  {channel?.thumbnail_url ? (
                    <img src={channel.thumbnail_url} alt={channel.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">📺</span>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{video.title}</h2>
                  <p className="text-sm text-gray-300">{channel?.name} • {formatViews(video.view_count)} views</p>
                </div>
              </Link>
              
              <button className="ml-auto px-6 py-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] font-medium hover:opacity-90 transition-opacity">
                Follow
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="p-2">
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-[#6366f1] rounded-full w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Panel */}
      {showChat && (
        <div className="w-80 bg-gray-900 border-l border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold">Live Chat</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex-shrink-0 flex items-center justify-center text-xs font-bold">
                  {msg.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm text-[#6366f1]">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 break-words">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Send a message..."
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 focus:border-[#6366f1] focus:outline-none text-sm"
              />
              <button className="px-4 py-2 rounded-full bg-[#6366f1] hover:bg-[#5558e3] transition-colors text-sm font-medium">
                Send
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
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
      </div>
    }>
      <WatchContent />
    </Suspense>
  );
}
