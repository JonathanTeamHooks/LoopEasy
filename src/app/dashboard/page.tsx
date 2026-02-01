"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Channel } from "@/types/database";

type DashboardStats = {
  channels: Channel[];
  totalFollowers: number;
  totalViews: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const supabase = createClient();
    
    async function loadDashboard() {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth?redirect=/dashboard");
        return;
      }
      
      setUser(session.user);
      
      // Fetch user's channels
      const { data: channels, error: channelsError } = await supabase
        .from("channels")
        .select("*")
        .eq("owner_id", session.user.id)
        .order("created_at", { ascending: false });
      
      if (channelsError) {
        console.error("Error fetching channels:", channelsError);
      }
      
      const userChannels = channels || [];
      
      // Calculate totals
      const totalFollowers = userChannels.reduce((sum, ch) => sum + (ch.follower_count || 0), 0);
      const totalViews = userChannels.reduce((sum, ch) => sum + (ch.total_views || 0), 0);
      
      setStats({
        channels: userChannels,
        totalFollowers,
        totalViews,
      });
      
      setLoading(false);
    }
    
    loadDashboard();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth?redirect=/dashboard");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Creator";

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#0a0a0b] border-r border-[#2a2a2e] p-6 flex flex-col">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
            </svg>
          </div>
          <div>
            <span className="font-bold">Loop<span className="text-[#a855f7]">Easy</span></span>
            <div className="text-xs text-[#f59e0b]">Creator Studio</div>
          </div>
        </Link>
        
        {/* Quick Links */}
        <div className="flex gap-2 mb-8">
          <Link href="/browse" className="flex-1 px-3 py-2 text-xs text-center bg-[#1c1c1f] border border-[#2a2a2e] rounded-lg hover:border-[#6366f1] transition-colors">
            Browse
          </Link>
          <Link href="/upload" className="flex-1 px-3 py-2 text-xs text-center bg-[#1c1c1f] border border-[#2a2a2e] rounded-lg hover:border-[#6366f1] transition-colors">
            Upload
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto">
          <NavSection title="Main" items={[
            { id: "overview", label: "Overview", icon: "📊" },
          ]} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <NavSection title="Content" items={[
            { id: "channels", label: "My Channels", icon: "📺", badge: String(stats?.channels.length || 0) },
            { id: "content", label: "Content Library", icon: "🎬" },
          ]} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <NavSection title="Analytics" items={[
            { id: "analytics", label: "Performance", icon: "📈" },
            { id: "audience", label: "Audience", icon: "👥" },
          ]} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <NavSection title="Account" items={[
            { id: "settings", label: "Settings", icon: "⚙️" },
          ]} activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        {/* User */}
        <div className="pt-6 border-t border-[#2a2a2e]">
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1c1c1f] transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{userName}</div>
              <div className="text-xs text-[#6b6b70]">Free Plan</div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {userName}!</h1>
            <p className="text-[#6b6b70]">Here&apos;s what&apos;s happening with your channels</p>
          </div>
          <Link href="/upload" className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Channel
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Channels" value={String(stats?.channels.length || 0)} />
          <StatCard label="Total Followers" value={formatNumber(stats?.totalFollowers || 0)} />
          <StatCard label="Total Views" value={formatNumber(stats?.totalViews || 0)} />
        </div>

        {/* Channels List */}
        <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Your Channels</h2>
          
          {stats?.channels.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📺</div>
              <h3 className="text-xl font-semibold mb-2">No channels yet</h3>
              <p className="text-[#6b6b70] mb-6">Create your first channel to start building your audience</p>
              <Link href="/upload" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg transition-all">
                Create Your First Channel
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stats?.channels.map((channel, index) => (
                <Link
                  key={channel.id}
                  href={`/channel/${channel.slug || channel.id}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1c1c1f] transition-colors"
                >
                  <span className="text-[#6b6b70] font-mono w-6">#{index + 1}</span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-2xl overflow-hidden">
                    {channel.thumbnail_url ? (
                      <img src={channel.thumbnail_url} alt={channel.name} className="w-full h-full object-cover" />
                    ) : (
                      "📺"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{channel.name}</div>
                    <div className="text-sm text-[#6b6b70]">{channel.category || "Uncategorized"}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#a1a1a6]">{formatNumber(channel.total_views)} views</div>
                    <div className="text-xs text-[#6b6b70]">{formatNumber(channel.follower_count)} followers</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavSection({ 
  title, 
  items, 
  activeTab, 
  setActiveTab 
}: { 
  title: string; 
  items: { id: string; label: string; icon: string; badge?: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div>
      <div className="px-4 mb-2 text-xs font-semibold text-[#6b6b70] uppercase tracking-wider">{title}</div>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === item.id
                ? "bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white"
                : "text-[#a1a1a6] hover:bg-[#1c1c1f] hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 bg-[#2a2a2e] text-[#a1a1a6] text-xs rounded-full">{item.badge}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
      <div className="text-sm text-[#6b6b70] mb-1">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}
