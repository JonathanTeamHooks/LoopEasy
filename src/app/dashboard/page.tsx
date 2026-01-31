"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [showPaywall, setShowPaywall] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock creator data
  const creatorData = {
    name: "Jonathan",
    username: "@jonathancreates",
    plan: "Creator Pro",
    earnings: {
      thisMonth: 2847,
      lastMonth: 1253,
      allTime: 12450,
    },
    stats: {
      channels: 12,
      followers: 48200,
      views: 1200000,
      watchTime: "45.2K hrs",
    },
    channels: [
      { id: "1", name: "Morning Motivation", views: "234K", earnings: 847, growth: "+23%", thumbnail: "🔥" },
      { id: "2", name: "Workout Beats", views: "189K", earnings: 623, growth: "+18%", thumbnail: "🎵" },
      { id: "3", name: "Focus Flow", views: "156K", earnings: 512, growth: "+31%", thumbnail: "🧠" },
      { id: "4", name: "Chill Vibes", views: "98K", earnings: 298, growth: "+12%", thumbnail: "😌" },
    ],
    recentActivity: [
      { type: "earning", message: "Earned $23.50 from Morning Motivation", time: "2 hours ago" },
      { type: "follower", message: "Gained 127 new followers", time: "5 hours ago" },
      { type: "milestone", message: "Focus Flow hit 150K views!", time: "1 day ago" },
      { type: "payout", message: "Payout of $1,253.00 processed", time: "3 days ago" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Creator Pro Paywall */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-3xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Creator Dashboard</h3>
            <p className="text-[#a1a1a6] mb-6">
              This is where creators manage their channels, track earnings, and analyze performance. Requires Creator Pro subscription ($19.99/mo).
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setShowPaywall(false)}
                className="block w-full py-3 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Continue (Demo Mode)
              </button>
              <Link
                href="/browse"
                className="block w-full py-3 bg-[#1c1c1f] border border-[#2a2a2e] text-white rounded-full hover:border-[#f59e0b] transition-all"
              >
                Go Back to Browse
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#0a0a0b] border-r border-[#2a2a2e] p-6 flex flex-col">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8">
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

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto">
          {/* Main */}
          <div>
            <div className="px-4 mb-2 text-xs font-semibold text-[#6b6b70] uppercase tracking-wider">Main</div>
            <div className="space-y-1">
              {[
                { id: "overview", label: "Overview", icon: "📊", badge: null },
                { id: "notifications", label: "Notifications", icon: "🔔", badge: "3" },
              ].map((item) => (
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
                    <span className="px-2 py-0.5 bg-[#ef4444] text-white text-xs rounded-full">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="px-4 mb-2 text-xs font-semibold text-[#6b6b70] uppercase tracking-wider">Content</div>
            <div className="space-y-1">
              {[
                { id: "channels", label: "My Channels", icon: "📺", badge: "12" },
                { id: "create", label: "Create Channel", icon: "➕", badge: null },
                { id: "content", label: "Content Library", icon: "🎬", badge: null },
                { id: "queue", label: "Queue Manager", icon: "📋", badge: null },
                { id: "schedule", label: "Schedule", icon: "📅", badge: null },
              ].map((item) => (
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

          {/* Analytics */}
          <div>
            <div className="px-4 mb-2 text-xs font-semibold text-[#6b6b70] uppercase tracking-wider">Analytics</div>
            <div className="space-y-1">
              {[
                { id: "analytics", label: "Performance", icon: "📈" },
                { id: "audience", label: "Audience", icon: "👥" },
                { id: "engagement", label: "Engagement", icon: "💬" },
                { id: "realtime", label: "Real-time", icon: "⚡", badge: "LIVE" },
              ].map((item) => (
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
                    <span className="px-1.5 py-0.5 bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold rounded">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Monetization */}
          <div>
            <div className="px-4 mb-2 text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">Monetization</div>
            <div className="space-y-1">
              {[
                { id: "earnings", label: "Earnings", icon: "💰", highlight: true },
                { id: "payouts", label: "Payouts", icon: "💸" },
                { id: "adSettings", label: "Ad Settings", icon: "📣" },
                { id: "sponsorships", label: "Sponsorships", icon: "🤝", badge: "NEW" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 text-white"
                      : item.highlight 
                        ? "text-[#f59e0b] hover:bg-[#1c1c1f]" 
                        : "text-[#a1a1a6] hover:bg-[#1c1c1f] hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 bg-[#a855f7]/20 text-[#a855f7] text-[10px] font-bold rounded">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <div className="px-4 mb-2 text-xs font-semibold text-[#6b6b70] uppercase tracking-wider">Tools</div>
            <div className="space-y-1">
              {[
                { id: "aiAssistant", label: "AI Assistant", icon: "🤖", badge: "BETA" },
                { id: "thumbnails", label: "Thumbnail Maker", icon: "🖼️" },
                { id: "community", label: "Community", icon: "💬" },
                { id: "collaborations", label: "Collaborations", icon: "🔗" },
              ].map((item) => (
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
                    <span className="px-1.5 py-0.5 bg-[#6366f1]/20 text-[#6366f1] text-[10px] font-bold rounded">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div>
            <div className="px-4 mb-2 text-xs font-semibold text-[#6b6b70] uppercase tracking-wider">Account</div>
            <div className="space-y-1">
              {[
                { id: "settings", label: "Settings", icon: "⚙️" },
                { id: "branding", label: "Branding", icon: "🎨" },
                { id: "help", label: "Help & Support", icon: "❓" },
              ].map((item) => (
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
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* User */}
        <div className="pt-6 border-t border-[#2a2a2e]">
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1c1c1f] transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center font-bold">
              J
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{creatorData.name}</div>
              <div className="text-xs text-[#f59e0b]">{creatorData.plan}</div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {creatorData.name}!</h1>
            <p className="text-[#6b6b70]">Here's what's happening with your channels</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Channel
          </button>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/30 rounded-2xl p-6">
            <div className="text-sm text-[#22c55e] mb-1">This Month</div>
            <div className="text-3xl font-bold">${creatorData.earnings.thisMonth.toLocaleString()}</div>
            <div className="text-sm text-[#22c55e] mt-2">+127% vs last month</div>
          </div>
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <div className="text-sm text-[#6b6b70] mb-1">Total Channels</div>
            <div className="text-3xl font-bold">{creatorData.stats.channels}</div>
            <div className="text-sm text-[#6b6b70] mt-2">+2 this month</div>
          </div>
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <div className="text-sm text-[#6b6b70] mb-1">Total Followers</div>
            <div className="text-3xl font-bold">{(creatorData.stats.followers / 1000).toFixed(1)}K</div>
            <div className="text-sm text-[#22c55e] mt-2">+3.2K this month</div>
          </div>
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <div className="text-sm text-[#6b6b70] mb-1">Total Views</div>
            <div className="text-3xl font-bold">{(creatorData.stats.views / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-[#22c55e] mt-2">+180K this month</div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Revenue (Last 30 Days)</h2>
            <div className="flex gap-2">
              {["7D", "30D", "90D", "1Y"].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded-full text-sm ${
                    period === "30D" ? "bg-[#6366f1] text-white" : "text-[#6b6b70] hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          {/* Chart placeholder */}
          <div className="h-64 flex items-end gap-1">
            {[30, 45, 35, 60, 50, 70, 65, 80, 75, 95, 85, 100, 90, 110, 95, 120, 105, 130, 115, 140, 125, 150, 135, 160, 145, 170, 155, 180, 165, 190].map((height, i) => (
              <div 
                key={i} 
                className="flex-1 bg-gradient-to-t from-[#6366f1] to-[#a855f7] rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ height: `${height * 0.6}%` }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Channels */}
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Top Channels</h2>
            <div className="space-y-4">
              {creatorData.channels.map((channel, index) => (
                <div key={channel.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1c1c1f] transition-colors cursor-pointer">
                  <span className="text-[#6b6b70] font-mono w-6">#{index + 1}</span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-2xl">
                    {channel.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{channel.name}</div>
                    <div className="text-sm text-[#6b6b70]">{channel.views} views</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#22c55e]">${channel.earnings}</div>
                    <div className="text-xs text-[#22c55e]">{channel.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {creatorData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#1c1c1f] transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    activity.type === "earning" ? "bg-[#22c55e]/20" :
                    activity.type === "follower" ? "bg-[#6366f1]/20" :
                    activity.type === "milestone" ? "bg-[#f59e0b]/20" :
                    "bg-[#a855f7]/20"
                  }`}>
                    {activity.type === "earning" ? "💰" :
                     activity.type === "follower" ? "👥" :
                     activity.type === "milestone" ? "🎉" : "💸"}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{activity.message}</div>
                    <div className="text-xs text-[#6b6b70] mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
