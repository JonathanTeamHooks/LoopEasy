"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AI_CHANNELS, getTimeBasedSuggestions, findMatchingAIChannels, type AIChannel } from "@/lib/ai-channels";
import { type SoulShieldProfile, PROTECTION_PRESETS } from "@/lib/soulshield";
import AIChannelCard from "@/components/discover/AIChannelCard";
import CreatorChannelCard from "@/components/discover/CreatorChannelCard";
import ChannelRow from "@/components/discover/ChannelRow";
import SmartSearch from "@/components/discover/SmartSearch";
import { ShieldBadge, ShieldSettingsModal } from "@/components/soulshield";
import type { Channel } from "@/types/database";
import type { User } from "@supabase/supabase-js";

// Group AI channels by category
const AI_CHANNEL_GROUPS = {
  mood: AI_CHANNELS.filter(c => ['morning-energy', 'wind-down', 'comedy-vibes'].includes(c.id)),
  productivity: AI_CHANNELS.filter(c => ['deep-focus', 'learn-something'].includes(c.id)),
  lifestyle: AI_CHANNELS.filter(c => ['workout-fuel', 'faith-devotion', 'family-time'].includes(c.id)),
};

export default function DiscoverPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [creatorChannels, setCreatorChannels] = useState<Channel[]>([]);
  const [recentChannels, setRecentChannels] = useState<Channel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  // SoulShield state
  const [showShieldSettings, setShowShieldSettings] = useState(false);
  const [shieldProfile, setShieldProfile] = useState<SoulShieldProfile | undefined>({
    id: 'default',
    name: 'Personal Shield',
    isActive: true,
    protectionLevel: 'personal',
    blockedCategories: PROTECTION_PRESETS.personal.blockedCategories,
    allowedCategories: [],
    customRules: [],
  });
  const [isShieldConnected, setIsShieldConnected] = useState(true); // Mock connected state

  const suggestedAIChannels = getTimeBasedSuggestions();
  const searchMatchedAI = searchQuery ? findMatchingAIChannels(searchQuery) : [];
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || undefined;

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
    async function fetchChannels() {
      const supabase = createClient();
      
      // Fetch popular creator channels
      let query = supabase
        .from("channels")
        .select("*")
        .eq("is_public", true)
        .order("follower_count", { ascending: false })
        .limit(12);
      
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (!error) {
        setCreatorChannels(data || []);
        // Mock recent - in production, pull from user's history
        setRecentChannels((data || []).slice(0, 4));
      }
      setLoading(false);
    }
    
    fetchChannels();
  }, [searchQuery]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white">LoopEasy</span>
            </Link>
            
            {/* Search - Centered */}
            <div className="flex-1 max-w-xl">
              <SmartSearch 
                onSearch={(q) => setSearchQuery(q)}
                placeholder="What do you want to watch?"
              />
            </div>
            
            {/* SoulShield + Auth */}
            <div className="flex items-center gap-4">
              {/* SoulShield Badge */}
              <ShieldBadge 
                profile={shieldProfile} 
                size="md" 
                showStatus={true}
                onClick={() => setShowShieldSettings(true)}
              />
              
              <div className="w-px h-6 bg-white/20" />
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#535353] flex items-center justify-center text-white text-sm font-medium">
                        {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                      <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#282828] border border-white/10 shadow-xl z-50 overflow-hidden py-1">
                        <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-white/10">Dashboard</Link>
                        <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-white/10">Profile</Link>
                        <hr className="my-1 border-white/10" />
                        <button 
                          onClick={async () => {
                            const supabase = createClient();
                            await supabase.auth.signOut();
                            window.location.href = "/";
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-white/10"
                        >
                          Log out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/auth" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link href="/auth" className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        
        {/* Search Results Mode */}
        {searchQuery ? (
          <div>
            <h1 className="text-2xl font-bold mb-6">Results for "{searchQuery}"</h1>
            
            {/* AI Channel Matches */}
            {searchMatchedAI.length > 0 && (
              <ChannelRow 
                title="AI Channels" 
                badge={{ icon: "✨", text: "Made for you", gradient: "from-[#6366f1] to-[#8b5cf6]" }}
              >
                {searchMatchedAI.map((channel) => (
                  <AIChannelCard key={channel.id} channel={channel} userName={userName} />
                ))}
              </ChannelRow>
            )}
            
            {/* Creator Channels */}
            {creatorChannels.length > 0 && (
              <ChannelRow title="Creator Channels">
                {creatorChannels.map((channel) => (
                  <CreatorChannelCard key={channel.id} channel={channel} />
                ))}
              </ChannelRow>
            )}
            
            {searchMatchedAI.length === 0 && creatorChannels.length === 0 && !loading && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl mb-2">No results found</p>
                <button onClick={() => setSearchQuery("")} className="text-[#6366f1] hover:underline">
                  Clear search
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Greeting */}
            <h1 className="text-3xl font-bold mb-6">{getGreeting()}</h1>
            
            {/* Quick Access Grid - Recently Played / Shortcuts */}
            {(recentChannels.length > 0 || suggestedAIChannels.length > 0) && (
              <section className="mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {/* Mix of recent and suggested */}
                  {suggestedAIChannels.slice(0, 2).map((channel) => (
                    <QuickAccessCard key={channel.id} type="ai" channel={channel} />
                  ))}
                  {recentChannels.slice(0, 4).map((channel) => (
                    <QuickAccessCard key={channel.id} type="creator" channel={channel} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Made For You - AI Channels */}
            <ChannelRow 
              title="Made for you"
              subtitle="AI-curated channels based on your mood"
              badge={{ icon: "✨", text: "AI", gradient: "from-[#6366f1] to-[#8b5cf6]" }}
              viewAllHref="/discover/all"
            >
              {suggestedAIChannels.map((channel) => (
                <AIChannelCard key={channel.id} channel={channel} userName={userName} />
              ))}
              {AI_CHANNELS.filter(c => !suggestedAIChannels.includes(c)).slice(0, 4).map((channel) => (
                <AIChannelCard key={channel.id} channel={channel} userName={userName} />
              ))}
            </ChannelRow>
            
            {/* Your Mood Mixes */}
            <ChannelRow 
              title="Your Mood Mixes"
              subtitle="Channels for every feeling"
              badge={{ icon: "🎭", text: "Mood", gradient: "from-pink-500 to-rose-500" }}
            >
              {AI_CHANNEL_GROUPS.mood.map((channel) => (
                <AIChannelCard key={channel.id} channel={channel} size="compact" userName={userName} />
              ))}
            </ChannelRow>
            
            {/* Productivity Mixes */}
            <ChannelRow 
              title="Focus & Learn"
              subtitle="Get in the zone"
              badge={{ icon: "🎯", text: "Focus", gradient: "from-blue-500 to-cyan-500" }}
            >
              {AI_CHANNEL_GROUPS.productivity.map((channel) => (
                <AIChannelCard key={channel.id} channel={channel} size="compact" userName={userName} />
              ))}
            </ChannelRow>
            
            {/* Lifestyle Mixes */}
            <ChannelRow 
              title="Lifestyle"
              subtitle="Faith, fitness, and family"
              badge={{ icon: "💫", text: "Life", gradient: "from-emerald-500 to-teal-500" }}
            >
              {AI_CHANNEL_GROUPS.lifestyle.map((channel) => (
                <AIChannelCard key={channel.id} channel={channel} size="compact" userName={userName} />
              ))}
            </ChannelRow>
            
            {/* Popular Creator Channels */}
            <ChannelRow 
              title="Popular with creators"
              subtitle="Channels made by the community"
              viewAllHref="/browse"
            >
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="w-48 flex-shrink-0">
                    <div className="aspect-video rounded-lg bg-white/10 animate-pulse mb-2" />
                    <div className="h-4 bg-white/10 rounded animate-pulse mb-1" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
                  </div>
                ))
              ) : creatorChannels.length > 0 ? (
                creatorChannels.map((channel) => (
                  <CreatorChannelCard key={channel.id} channel={channel} />
                ))
              ) : (
                <div className="w-full py-8 text-center text-gray-500">
                  <p>No creator channels yet</p>
                  <Link href="/dashboard" className="text-[#6366f1] hover:underline text-sm">
                    Create the first one →
                  </Link>
                </div>
              )}
            </ChannelRow>
            
            {/* Browse All Section */}
            <section className="mt-12 mb-8">
              <h2 className="text-xl font-bold mb-4">Browse all</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  { name: 'Devotional', color: 'from-purple-600 to-indigo-600', emoji: '🙏' },
                  { name: 'Fitness', color: 'from-red-500 to-pink-500', emoji: '💪' },
                  { name: 'Education', color: 'from-emerald-500 to-teal-500', emoji: '📚' },
                  { name: 'Entertainment', color: 'from-yellow-500 to-orange-500', emoji: '🎬' },
                  { name: 'Music', color: 'from-pink-500 to-rose-500', emoji: '🎵' },
                  { name: 'Technology', color: 'from-blue-500 to-cyan-500', emoji: '💻' },
                  { name: 'Gaming', color: 'from-violet-500 to-purple-500', emoji: '🎮' },
                  { name: 'Food', color: 'from-amber-500 to-orange-500', emoji: '🍳' },
                  { name: 'Family', color: 'from-rose-400 to-pink-500', emoji: '👨‍👩‍👧‍👦' },
                  { name: 'Wellness', color: 'from-teal-400 to-emerald-500', emoji: '🧘' },
                ].map((cat) => (
                  <Link 
                    key={cat.name}
                    href={`/browse?category=${cat.name}`}
                    className={`aspect-[16/10] rounded-lg bg-gradient-to-br ${cat.color} p-4 flex flex-col justify-end hover:scale-105 transition-transform relative overflow-hidden`}
                  >
                    <span className="absolute top-2 right-2 text-3xl opacity-70">{cat.emoji}</span>
                    <span className="font-bold text-white text-lg">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      
      {/* SoulShield Settings Modal */}
      <ShieldSettingsModal
        isOpen={showShieldSettings}
        onClose={() => setShowShieldSettings(false)}
        profile={shieldProfile}
        onSave={setShieldProfile}
        isConnected={isShieldConnected}
      />
    </div>
  );
}

// Quick Access Card Component (Spotify-style shortcut tiles)
function QuickAccessCard({ type, channel }: { type: 'ai' | 'creator', channel: AIChannel | Channel }) {
  const isAI = type === 'ai';
  const aiChannel = channel as AIChannel;
  const creatorChannel = channel as Channel;
  
  return (
    <Link 
      href={isAI ? `/discover/${aiChannel.id}` : `/channel/${creatorChannel.id}`}
      className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-md overflow-hidden transition-colors"
    >
      {/* Thumbnail */}
      <div className={`w-12 h-12 flex-shrink-0 ${isAI ? `bg-gradient-to-br ${aiChannel.gradient}` : 'bg-gray-700'} flex items-center justify-center`}>
        {isAI ? (
          <span className="text-xl">{aiChannel.emoji}</span>
        ) : creatorChannel.thumbnail_url ? (
          <img src={creatorChannel.thumbnail_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-lg">📺</span>
        )}
      </div>
      
      {/* Title */}
      <span className="font-medium text-white text-sm truncate pr-2">
        {isAI ? aiChannel.name : creatorChannel.name}
      </span>
      
      {/* Play button on hover */}
      <div className="ml-auto pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
