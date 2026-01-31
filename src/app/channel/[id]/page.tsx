"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock channel data
const channelData: Record<string, any> = {
  "1": { 
    name: "Kettlebell HIIT", 
    creator: "@fitnessmike", 
    creatorName: "Mike Johnson",
    category: "Fitness", 
    viewers: "2.4K", 
    followers: "48.2K",
    color: "from-orange-500 to-red-600", 
    thumbnail: "🏋️",
    description: "High-intensity kettlebell workouts to build strength and burn fat. New content daily!",
    videos: [
      { id: "v1", title: "20 Min Full Body Burn", duration: "20:15", views: "12.4K" },
      { id: "v2", title: "Kettlebell Swing Masterclass", duration: "15:30", views: "8.7K" },
      { id: "v3", title: "Core Crusher Workout", duration: "12:45", views: "6.2K" },
      { id: "v4", title: "Arm Day Special", duration: "18:20", views: "5.1K" },
      { id: "v5", title: "Leg Day Inferno", duration: "22:10", views: "9.3K" },
      { id: "v6", title: "HIIT for Beginners", duration: "10:00", views: "15.8K" },
    ]
  },
  "2": { 
    name: "Lofi Study Beats", 
    creator: "@chillhop", 
    creatorName: "Chill Hop Music",
    category: "Music", 
    viewers: "8.1K", 
    followers: "124.5K",
    color: "from-purple-500 to-indigo-600", 
    thumbnail: "🎵",
    description: "24/7 lofi hip hop beats to relax/study to. The perfect background for focus.",
    videos: [
      { id: "v1", title: "Rainy Day Vibes", duration: "∞", views: "45.2K" },
      { id: "v2", title: "Late Night Study Session", duration: "∞", views: "32.1K" },
      { id: "v3", title: "Coffee Shop Ambience", duration: "∞", views: "28.7K" },
    ]
  },
};

// Default channel for unknown IDs
const defaultChannel = {
  name: "Sample Channel",
  creator: "@creator",
  creatorName: "Content Creator",
  category: "Entertainment",
  viewers: "1.2K",
  followers: "5.4K",
  color: "from-gray-500 to-gray-700",
  thumbnail: "📺",
  description: "A great channel with amazing content. Subscribe for more!",
  videos: [
    { id: "v1", title: "Sample Video 1", duration: "10:00", views: "1.2K" },
    { id: "v2", title: "Sample Video 2", duration: "15:00", views: "800" },
  ]
};

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.id as string;
  const channel = channelData[channelId] || defaultChannel;
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleWatch = () => {
    setShowPaywall(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-3xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Login Required</h3>
            <p className="text-[#a1a1a6] mb-6">
              This is where users would need to log in or sign up to watch content. Free users see ads, Premium users don't.
            </p>
            <div className="space-y-3">
              <Link
                href={`/watch?channel=${channelId}`}
                className="block w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Continue (Demo Mode)
              </Link>
              <button
                onClick={() => setShowPaywall(false)}
                className="block w-full py-3 bg-[#1c1c1f] border border-[#2a2a2e] text-white rounded-full hover:border-[#6366f1] transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/browse" className="p-2 hover:bg-[#1c1c1f] rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                  </svg>
                </div>
                <span className="font-bold text-xl hidden sm:block">Loop<span className="text-[#a855f7]">Easy</span></span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/browse" className="text-sm text-[#a1a1a6] hover:text-white transition-colors">
                Browse
              </Link>
              <Link href="/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-bold">
                J
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Channel Header */}
      <div className={`bg-gradient-to-br ${channel.color} relative`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Channel thumbnail */}
            <div className="w-32 h-32 rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center text-6xl shadow-2xl">
              {channel.thumbnail}
            </div>
            
            {/* Channel info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {channel.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-white/80">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {channel.viewers} watching
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{channel.name}</h1>
              <p className="text-white/80 mb-4">{channel.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    {channel.creatorName[0]}
                  </div>
                  <div>
                    <div className="font-medium">{channel.creatorName}</div>
                    <div className="text-sm text-white/60">{channel.followers} followers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  isFollowing
                    ? "bg-white/20 text-white"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button
                onClick={handleWatch}
                className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Currently Playing */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            Now Playing
          </h2>
          <div 
            onClick={handleWatch}
            className="relative aspect-video bg-[#1c1c1f] rounded-2xl overflow-hidden cursor-pointer group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-30`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl opacity-20">{channel.thumbnail}</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-[#6366f1] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="px-2 py-1 bg-red-500 rounded text-xs font-bold">LIVE</span>
                <span>{channel.viewers} watching now</span>
              </div>
            </div>
          </div>
        </section>

        {/* Video Queue */}
        <section>
          <h2 className="text-xl font-bold mb-4">Up Next in Queue</h2>
          <div className="space-y-3">
            {channel.videos.map((video: any, index: number) => (
              <div 
                key={video.id}
                onClick={handleWatch}
                className="flex gap-4 p-3 bg-[#1c1c1f] rounded-xl hover:bg-[#252528] transition-colors cursor-pointer group"
              >
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-[#2a2a2e] flex-shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-50`} />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">
                    {channel.thumbnail}
                  </div>
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium truncate group-hover:text-[#a855f7] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-[#6b6b70]">{channel.creator}</p>
                      <p className="text-sm text-[#6b6b70]">{video.views} views</p>
                    </div>
                    <span className="text-sm text-[#6b6b70]">#{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
