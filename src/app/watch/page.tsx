"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Video, Channel } from "@/types/database";
import VideoPlayer from "@/components/VideoPlayer";

function formatViews(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

function WatchContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");
  
  const [video, setVideo] = useState<Video | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="fixed inset-0 bg-[#0f0f10] text-white flex flex-col items-center justify-center px-4">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] opacity-20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] opacity-40 animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Video Not Found</h1>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          This video may have been removed or the link is incorrect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/browse" 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Browse Channels
          </Link>
          <Link 
            href="/" 
            className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col md:flex-row">
      {/* Video Section */}
      <div className="flex-1 flex flex-col">
        {/* Video Player - Full height minus info bar */}
        <div className="flex-1 relative">
          <VideoPlayer
            embedType={video.embed_type}
            embedId={video.embed_id}
            muxPlaybackId={video.mux_playback_id}
            videoUrl={video.video_url}
            title={video.title}
            autoPlay={true}
            loop={true}
          />
        </div>
        
        {/* Video Info Bar - Below video on mobile, minimal UI */}
        <div className="bg-[#0f0f10] border-t border-white/10 p-4">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <Link href="/browse" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            
            {/* Channel Info */}
            <Link href={`/channel/${channel?.id}`} className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] overflow-hidden flex items-center justify-center flex-shrink-0">
                {channel?.thumbnail_url ? (
                  <img src={channel.thumbnail_url} alt={channel.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg">📺</span>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold truncate">{video.title}</h2>
                <p className="text-sm text-gray-400 truncate">{channel?.name} • {formatViews(video.view_count)} views</p>
              </div>
            </Link>
            
            {/* Actions */}
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] font-medium text-sm hover:opacity-90 transition-opacity flex-shrink-0">
              Follow
            </button>
            
            {/* Chat Toggle (desktop) */}
            <button
              onClick={() => setShowChat(!showChat)}
              className={`hidden md:flex p-2 rounded-full transition-colors flex-shrink-0 ${showChat ? "bg-[#6366f1]" : "bg-white/10 hover:bg-white/20"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Chat Panel - Desktop only */}
      {showChat && (
        <div className="hidden md:flex w-80 bg-[#0f0f10] border-l border-white/10 flex-col">
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
