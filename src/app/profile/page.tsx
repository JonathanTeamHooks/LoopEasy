"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [showPaywall, setShowPaywall] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const userData = {
    name: "Jonathan Hooks",
    email: "jonathan@example.com",
    username: "@jonathanhooks",
    avatar: "J",
    plan: "Creator Pro",
    planPrice: "$19.99/mo",
    memberSince: "January 2026",
    preferences: {
      notifications: true,
      emailUpdates: true,
      darkMode: true,
      autoplay: true,
    },
    following: 24,
    watchHistory: [
      { name: "Kettlebell HIIT", creator: "@fitnessmike", time: "2 hours ago" },
      { name: "Lofi Study Beats", creator: "@chillhop", time: "Yesterday" },
      { name: "Morning Yoga Flow", creator: "@yogawithsara", time: "2 days ago" },
    ],
    savedChannels: [
      { name: "Kettlebell HIIT", creator: "@fitnessmike", thumbnail: "🏋️" },
      { name: "Lofi Study Beats", creator: "@chillhop", thumbnail: "🎵" },
      { name: "Focus Flow", creator: "@devmode", thumbnail: "🧠" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Login Paywall */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-3xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Your Profile</h3>
            <p className="text-[#a1a1a6] mb-6">
              This is where users manage their account settings, subscription, watch history, and preferences. Requires login.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setShowPaywall(false)}
                className="block w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Continue (Demo Mode)
              </button>
              <Link
                href="/browse"
                className="block w-full py-3 bg-[#1c1c1f] border border-[#2a2a2e] text-white rounded-full hover:border-[#6366f1] transition-all"
              >
                Go Back to Browse
              </Link>
            </div>
          </div>
        </div>
      )}

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
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-4xl font-bold">
            {userData.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-[#6b6b70]">{userData.username}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 text-[#f59e0b] rounded-full text-sm font-medium">
                {userData.plan}
              </span>
              <span className="text-sm text-[#6b6b70]">Member since {userData.memberSince}</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-[#1c1c1f] border border-[#2a2a2e] rounded-full hover:border-[#6366f1] transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#2a2a2e]">
          {[
            { id: "profile", label: "Profile" },
            { id: "subscription", label: "Subscription" },
            { id: "history", label: "Watch History" },
            { id: "saved", label: "Saved Channels" },
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
                <div className="flex items-center justify-between py-3 border-b border-[#2a2a2e]">
                  <div>
                    <div className="text-sm text-[#6b6b70]">Full Name</div>
                    <div>{userData.name}</div>
                  </div>
                  <button className="text-[#6366f1] text-sm">Edit</button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#2a2a2e]">
                  <div>
                    <div className="text-sm text-[#6b6b70]">Email</div>
                    <div>{userData.email}</div>
                  </div>
                  <button className="text-[#6366f1] text-sm">Edit</button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#2a2a2e]">
                  <div>
                    <div className="text-sm text-[#6b6b70]">Username</div>
                    <div>{userData.username}</div>
                  </div>
                  <button className="text-[#6366f1] text-sm">Edit</button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm text-[#6b6b70]">Password</div>
                    <div>••••••••••</div>
                  </div>
                  <button className="text-[#6366f1] text-sm">Change</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "subscription" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/20 border border-[#f59e0b]/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">{userData.plan}</h3>
                  <p className="text-[#a1a1a6]">{userData.planPrice} • Renews Feb 1, 2026</p>
                </div>
                <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
                  Manage Plan
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/20 rounded-xl">
                  <div className="text-2xl mb-1">♾️</div>
                  <div className="text-sm font-medium">Unlimited Channels</div>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <div className="text-2xl mb-1">💰</div>
                  <div className="text-sm font-medium">70% Revenue Share</div>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-sm font-medium">Advanced Analytics</div>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <div className="text-2xl mb-1">🚫</div>
                  <div className="text-sm font-medium">No Ads</div>
                </div>
              </div>
            </div>
            <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Billing History</h3>
              <div className="space-y-3">
                {["Jan 1, 2026 — $19.99", "Dec 1, 2025 — $19.99", "Nov 1, 2025 — $19.99"].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-[#2a2a2e] last:border-0">
                    <span>{item}</span>
                    <button className="text-[#6366f1] text-sm">Receipt</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Recently Watched</h3>
            <div className="space-y-3">
              {userData.watchHistory.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1c1c1f] transition-colors cursor-pointer">
                  <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-[#6b6b70]">{item.creator}</div>
                  </div>
                  <div className="text-sm text-[#6b6b70]">{item.time}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 text-[#ef4444] hover:bg-[#ef4444]/10 rounded-xl transition-colors">
              Clear Watch History
            </button>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Saved Channels ({userData.savedChannels.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.savedChannels.map((channel, i) => (
                <Link key={i} href={`/channel/${i + 1}`} className="flex items-center gap-4 p-4 rounded-xl bg-[#1c1c1f] hover:bg-[#252528] transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-2xl">
                    {channel.thumbnail}
                  </div>
                  <div>
                    <div className="font-medium">{channel.name}</div>
                    <div className="text-sm text-[#6b6b70]">{channel.creator}</div>
                  </div>
                </Link>
              ))}
            </div>
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
                  <button className={`w-12 h-6 rounded-full transition-colors ${
                    userData.preferences[pref.key as keyof typeof userData.preferences] 
                      ? "bg-[#6366f1]" 
                      : "bg-[#2a2a2e]"
                  }`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      userData.preferences[pref.key as keyof typeof userData.preferences]
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
