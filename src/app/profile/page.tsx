"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Channel } from "@/types/database";

type ProfileData = {
  following: number;
  savedChannels: Channel[];
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: true,
    autoplay: true,
  });

  useEffect(() => {
    const supabase = createClient();
    
    async function loadProfile() {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth?redirect=/profile");
        return;
      }
      
      setUser(session.user);
      
      // Fetch followed channels
      const { data: follows } = await supabase
        .from("follows")
        .select("channel_id, channels(*)")
        .eq("follower_id", session.user.id);
      
      const savedChannels = follows?.map(f => f.channels as unknown as Channel).filter(Boolean) || [];
      
      setProfileData({
        following: savedChannels.length,
        savedChannels,
      });
      
      setLoading(false);
    }
    
    loadProfile();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth?redirect=/profile");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Unknown";

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/browse" className="p-2 hover:bg-[#1c1c1f] rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 p-6 bg-[#141416] border border-[#2a2a2e] rounded-2xl">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-4xl font-bold overflow-hidden">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt={userName} className="w-full h-full object-cover" />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{userName}</h2>
            <p className="text-[#6b6b70]">{userEmail}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-[#6366f1]/20 text-[#6366f1] rounded-full text-sm font-medium">
                Free Plan
              </span>
              <span className="text-sm text-[#6b6b70]">Member since {memberSince}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#2a2a2e]">
          {[
            { id: "profile", label: "Profile" },
            { id: "saved", label: "Following" },
            { id: "preferences", label: "Preferences" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id ? "text-white" : "text-[#6b6b70] hover:text-white"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Account Information</h3>
              <div className="space-y-4">
                <InfoRow label="Full Name" value={userName} />
                <InfoRow label="Email" value={userEmail} />
                <InfoRow label="User ID" value={user?.id?.slice(0, 8) + "..." || "N/A"} />
              </div>
            </div>
            
            <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Authentication</h3>
              <p className="text-[#6b6b70] text-sm mb-4">
                Signed in via {user?.app_metadata?.provider || "email"}
              </p>
              <button
                onClick={handleSignOut}
                className="px-6 py-2 bg-[#1c1c1f] border border-[#2a2a2e] rounded-full text-white hover:border-[#ef4444] hover:text-[#ef4444] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">
              Following ({profileData?.savedChannels.length || 0})
            </h3>
            
            {profileData?.savedChannels.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👀</div>
                <h3 className="text-xl font-semibold mb-2">Not following anyone yet</h3>
                <p className="text-[#6b6b70] mb-6">Discover channels you love and follow them</p>
                <Link href="/browse" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold">
                  Browse Channels
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData?.savedChannels.map((channel) => (
                  <Link 
                    key={channel.id} 
                    href={`/channel/${channel.slug || channel.id}`} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#1c1c1f] hover:bg-[#252528] transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-2xl overflow-hidden">
                      {channel.thumbnail_url ? (
                        <img src={channel.thumbnail_url} alt={channel.name} className="w-full h-full object-cover" />
                      ) : (
                        "📺"
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{channel.name}</div>
                      <div className="text-sm text-[#6b6b70]">{channel.category || "Uncategorized"}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Preferences</h3>
            <div className="space-y-4">
              {[
                { key: "notifications", label: "Push Notifications", desc: "Get notified about new content" },
                { key: "emailUpdates", label: "Email Updates", desc: "Receive weekly digest and announcements" },
                { key: "darkMode", label: "Dark Mode", desc: "Use dark theme (always on)" },
                { key: "autoplay", label: "Autoplay", desc: "Automatically play next video" },
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between py-3 border-b border-[#2a2a2e] last:border-0">
                  <div>
                    <div className="font-medium">{pref.label}</div>
                    <div className="text-sm text-[#6b6b70]">{pref.desc}</div>
                  </div>
                  <button 
                    onClick={() => setPreferences(prev => ({
                      ...prev,
                      [pref.key]: !prev[pref.key as keyof typeof prev]
                    }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences[pref.key as keyof typeof preferences] 
                        ? "bg-[#6366f1]" 
                        : "bg-[#2a2a2e]"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      preferences[pref.key as keyof typeof preferences]
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="mt-8 p-6 border border-[#ef4444]/30 rounded-2xl">
          <h3 className="text-lg font-bold text-[#ef4444] mb-2">Danger Zone</h3>
          <p className="text-sm text-[#6b6b70] mb-4">These actions are irreversible. Please proceed with caution.</p>
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-[#ef4444]/30 text-[#ef4444] rounded-full hover:bg-[#ef4444]/10 transition-colors">
              Delete Account
            </button>
            <button className="px-4 py-2 border border-[#2a2a2e] text-[#6b6b70] rounded-full hover:border-[#6b6b70] transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#2a2a2e] last:border-0">
      <div>
        <div className="text-sm text-[#6b6b70]">{label}</div>
        <div>{value}</div>
      </div>
    </div>
  );
}
