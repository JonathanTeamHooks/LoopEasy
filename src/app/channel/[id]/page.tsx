"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Channel, Video } from "@/types/database";
import type { User } from "@supabase/supabase-js";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatViews(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.id as string;
  
  const [channel, setChannel] = useState<Channel | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchChannel() {
      const supabase = createClient();
      
      // Fetch channel
      const { data: channelData, error: channelError } = await supabase
        .from("channels")
        .select("*")
        .eq("id", channelId)
        .single();
      
      if (channelError) {
        console.error("Error fetching channel:", channelError);
        setLoading(false);
        return;
      }
      
      setChannel(channelData);
      
      // Fetch videos
      const { data: videosData, error: videosError } = await supabase
        .from("videos")
        .select("*")
        .eq("channel_id", channelId)
        .eq("status", "ready")
        .order("created_at", { ascending: false });
      
      if (videosError) {
        console.error("Error fetching videos:", videosError);
      } else {
        setVideos(videosData || []);
      }
      
      setLoading(false);
    }
    
    fetchChannel();
  }, [channelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Channel not found</h1>
        <Link href="/browse" className="text-[#6366f1] hover:underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">LoopEasy</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link href="/browse" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
                Browse
              </Link>
              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2">
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="w-9 h-9 rounded-full border-2 border-[#6366f1]" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center font-medium">
                        {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800 border border-white/10 shadow-xl z-50 py-2">
                        <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-white/10">Dashboard</Link>
                        <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-white/10">Profile</Link>
                        <button 
                          onClick={async () => { const supabase = createClient(); await supabase.auth.signOut(); window.location.href = "/"; }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
                        >Sign Out</button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/auth" className="px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 transition-opacity text-sm font-medium">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Channel Header */}
      <div className="relative">
        {/* Banner */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] relative overflow-hidden">
          {channel.thumbnail_url && (
            <img 
              src={channel.thumbnail_url} 
              alt={channel.name}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        
        {/* Channel Info */}
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] border-4 border-gray-900 flex items-center justify-center text-5xl overflow-hidden">
              {channel.thumbnail_url ? (
                <img src={channel.thumbnail_url} alt={channel.name} className="w-full h-full object-cover" />
              ) : (
                "📺"
              )}
            </div>
            
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{channel.name}</h1>
                {channel.category && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                    {channel.category}
                  </span>
                )}
              </div>
              <p className="text-gray-400 mb-4 max-w-2xl">{channel.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span><strong className="text-white">{formatViews(channel.follower_count)}</strong> followers</span>
                <span><strong className="text-white">{videos.length}</strong> videos</span>
                <span><strong className="text-white">{formatViews(channel.total_views)}</strong> total views</span>
              </div>
            </div>
            
            {/* Follow Button */}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                isFollowing
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:opacity-90"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      {/* Videos */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">Videos</h2>
        
        {videos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-2">No videos yet</p>
            <p>This channel hasn't uploaded any videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <Link 
                key={video.id} 
                href={`/watch?v=${video.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-video rounded-xl bg-gray-800 relative overflow-hidden mb-3 group-hover:ring-2 ring-[#6366f1] transition-all">
                  {video.thumbnail_url ? (
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                      <svg className="w-12 h-12 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                  
                  {/* Duration badge */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-xs">
                      {formatDuration(video.duration)}
                    </div>
                  )}
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#6366f1] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium text-white group-hover:text-[#6366f1] transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {formatViews(video.view_count)} views
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
