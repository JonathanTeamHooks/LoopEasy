"use client";

import { useState } from "react";
import Link from "next/link";

// Mock channel data
const channels = [
  { id: "1", name: "Kettlebell HIIT", creator: "@fitnessmike", category: "Fitness", viewers: "2.4K", color: "from-orange-500 to-red-600", thumbnail: "🏋️" },
  { id: "2", name: "Lofi Study Beats", creator: "@chillhop", category: "Music", viewers: "8.1K", color: "from-purple-500 to-indigo-600", thumbnail: "🎵" },
  { id: "3", name: "Morning Yoga Flow", creator: "@yogawithsara", category: "Wellness", viewers: "1.2K", color: "from-teal-500 to-emerald-600", thumbnail: "🧘" },
  { id: "4", name: "Epic Movie Trailers", creator: "@cinephile", category: "Entertainment", viewers: "5.7K", color: "from-gray-700 to-gray-900", thumbnail: "🎬" },
  { id: "5", name: "Nature Ambience", creator: "@peacefulvibes", category: "Relax", viewers: "3.2K", color: "from-green-500 to-teal-600", thumbnail: "🌲" },
  { id: "6", name: "Coding Focus", creator: "@devmode", category: "Focus", viewers: "4.5K", color: "from-blue-500 to-cyan-600", thumbnail: "💻" },
  { id: "7", name: "Comedy Clips", creator: "@laughtrack", category: "Laugh", viewers: "6.8K", color: "from-yellow-500 to-orange-500", thumbnail: "😂" },
  { id: "8", name: "Sleep Sounds", creator: "@dreamtime", category: "Sleep", viewers: "9.2K", color: "from-indigo-600 to-purple-800", thumbnail: "🌙" },
  { id: "9", name: "Motivation Daily", creator: "@hustlehub", category: "Energize", viewers: "7.1K", color: "from-red-500 to-pink-600", thumbnail: "🔥" },
  { id: "10", name: "Jazz Cafe", creator: "@smoothjazz", category: "Vibes", viewers: "2.9K", color: "from-amber-600 to-yellow-700", thumbnail: "🎷" },
  { id: "11", name: "Puppy Cam", creator: "@cutepets", category: "Entertainment", viewers: "11.3K", color: "from-pink-400 to-rose-500", thumbnail: "🐕" },
  { id: "12", name: "Aquarium Zen", creator: "@fishworld", category: "Relax", viewers: "1.8K", color: "from-cyan-500 to-blue-600", thumbnail: "🐠" },
];

const categories = ["All", "🔥 Energize", "😌 Relax", "🧠 Focus", "💪 Fitness", "🎵 Music", "😂 Laugh", "🌙 Sleep", "🎬 Entertainment"];

const ChannelCard = ({ channel }: { channel: typeof channels[0] }) => (
  <Link href={`/channel/${channel.id}`} className="group cursor-pointer">
    <div className={`aspect-video rounded-xl bg-gradient-to-br ${channel.color} relative overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300`}>
      {/* Thumbnail emoji */}
      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
        {channel.thumbnail}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      {/* Live indicator */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-medium text-white">LIVE</span>
      </div>
      
      {/* Category badge */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white">
        {channel.category}
      </div>
      
      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
          <svg className="w-6 h-6 text-[#6366f1] ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Channel info */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="font-semibold text-white">{channel.name}</div>
        <div className="flex items-center justify-between text-xs text-white/80">
          <span>{channel.creator}</span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            {channel.viewers}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChannels = channels.filter(channel => {
    const matchesCategory = activeCategory === "All" || channel.category === activeCategory.replace(/^[^\s]+ /, "");
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          channel.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                </svg>
              </div>
              <span className="font-bold text-xl">Loop<span className="text-[#a855f7]">Easy</span></span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search channels, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#1c1c1f] border border-[#2a2a2e] rounded-full text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-colors"
                />
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-[#a1a1a6] hover:text-white transition-colors">
                Creator Studio
              </Link>
              <Link href="/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-bold">
                J
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg"
                  : "bg-[#1c1c1f] border border-[#2a2a2e] text-[#a1a1a6] hover:border-[#6366f1]/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🔥</span> Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredChannels.slice(0, 4).map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>

        {/* All channels */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Channels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>

        {/* Empty state */}
        {filteredChannels.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No channels found</h3>
            <p className="text-[#6b6b70]">Try a different search or category</p>
          </div>
        )}
      </main>
    </div>
  );
}
