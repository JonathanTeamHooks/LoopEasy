"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Channel, Video } from "@/types/database";
import type { User } from "@supabase/supabase-js";

const categories = ["All", "Music", "Technology", "Fitness", "Food", "Gaming", "Entertainment", "Education"];

const ChannelCard = ({ channel }: { channel: Channel }) => {
  const gradients = [
    "from-orange-500 to-red-600",
    "from-purple-500 to-indigo-600",
    "from-teal-500 to-emerald-600",
    "from-blue-500 to-cyan-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
  ];
  const gradient = gradients[Math.abs(channel.name.charCodeAt(0)) % gradients.length];

  return (
    <Link href={`/channel/${channel.id}`} className="group cursor-pointer">
      <div className={`aspect-video rounded-xl bg-gradient-to-br ${gradient} relative overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300`}>
        {/* Thumbnail image or fallback */}
        {channel.thumbnail_url ? (
          <img 
            src={channel.thumbnail_url} 
            alt={channel.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Live indicator */}
        {channel.is_live && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-medium text-white">LIVE</span>
          </div>
        )}
        
        {/* Category badge */}
        {channel.category && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white">
            {channel.category}
          </div>
        )}
        
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
            <span>{channel.follower_count.toLocaleString()} followers</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              {channel.total_views.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Set category and search from URL params on mount
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  useEffect(() => {
    const supabase = createClient();
    
    // Get user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchChannels() {
      const supabase = createClient();
      
      let query = supabase
        .from("channels")
        .select("*")
        .eq("is_public", true)
        .order("follower_count", { ascending: false });
      
      if (activeCategory !== "All") {
        query = query.eq("category", activeCategory);
      }
      
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching channels:", error);
      } else {
        setChannels(data || []);
      }
      setLoading(false);
    }
    
    fetchChannels();
  }, [activeCategory, searchQuery]);

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
            
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full bg-white/10 border border-white/20 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 text-white placeholder-gray-400"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Auth buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt={user.user_metadata?.full_name || "User"}
                        className="w-9 h-9 rounded-full border-2 border-[#6366f1]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-medium">
                        {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800 border border-white/10 shadow-xl z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-white/10">Dashboard</Link>
                          <Link href="/upload" className="block px-4 py-2 text-sm hover:bg-white/10">Upload</Link>
                          <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-white/10">Profile</Link>
                        </div>
                        <div className="border-t border-white/10 py-2">
                          <button 
                            onClick={async () => {
                              const supabase = createClient();
                              await supabase.auth.signOut();
                              window.location.href = "/";
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/auth" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth" className="px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 transition-opacity text-sm font-medium">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Categories */}
      <div className="sticky top-[65px] z-40 backdrop-blur-xl bg-gray-900/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Trending Section - Only show on "All" */}
        {activeCategory === "All" && !loading && channels.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Trending Now
              </span>
            </div>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {channels.slice(0, 3).map((channel, i) => (
                  <Link 
                    key={channel.id}
                    href={`/channel/${channel.id}`}
                    className="relative flex-shrink-0 w-80 group"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] relative">
                      {channel.thumbnail_url && (
                        <img src={channel.thumbnail_url} alt={channel.name} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        #{i + 1} Trending
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white mb-1">{channel.name}</h3>
                        <p className="text-white/70 text-sm">{channel.follower_count.toLocaleString()} followers • {channel.total_views.toLocaleString()} views</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-[#6366f1] ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <h1 className="text-2xl font-bold mb-6">
          {activeCategory === "All" ? "All Channels" : activeCategory}
        </h1>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-video rounded-xl bg-white/10 animate-pulse" />
            ))}
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-2">No channels found</p>
            <p>Be the first to create a channel!</p>
            <Link href="/dashboard" className="inline-block mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium">
              Create Channel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
