"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Video = {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  views: string;
};

type PlaylistSettings = {
  loopMode: "loop" | "once" | "shuffle";
  afterEnd: "loop" | "stop" | "handoff" | "recommendations";
  handoffChannel: string | null;
  visibility: "public" | "unlisted" | "private";
  allowSkip: boolean;
  autoPlay: boolean;
};

export default function PlaylistManagerPage() {
  const params = useParams();
  const playlistId = params.id;

  const [videos, setVideos] = useState<Video[]>([
    { id: "1", title: "Morning Warmup Routine", duration: "5:32", thumbnail: "🏃", views: "12K" },
    { id: "2", title: "Full Body HIIT - 20 Min", duration: "20:15", thumbnail: "🔥", views: "45K" },
    { id: "3", title: "Core Crusher Workout", duration: "12:48", thumbnail: "💪", views: "28K" },
    { id: "4", title: "Cool Down & Stretch", duration: "8:20", thumbnail: "🧘", views: "15K" },
    { id: "5", title: "Bonus: Kettlebell Flow", duration: "15:00", thumbnail: "🏋️", views: "32K" },
  ]);

  const [settings, setSettings] = useState<PlaylistSettings>({
    loopMode: "loop",
    afterEnd: "loop",
    handoffChannel: null,
    visibility: "public",
    allowSkip: true,
    autoPlay: true,
  });

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(true);
  const [showHandoffPicker, setShowHandoffPicker] = useState(false);
  const [aiSuggestionOpen, setAiSuggestionOpen] = useState(false);

  const suggestedChannels = [
    { id: "meditation", name: "Calm Meditation", creator: "@mindfulmoments", match: "92%" },
    { id: "yoga", name: "Evening Yoga Flow", creator: "@yogawithsara", match: "88%" },
    { id: "nutrition", name: "Healthy Meal Prep", creator: "@fitfood", match: "85%" },
  ];

  const handleDragStart = (e: React.DragEvent, videoId: string) => {
    setDraggedItem(videoId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, videoId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== videoId) {
      const draggedIndex = videos.findIndex(v => v.id === draggedItem);
      const targetIndex = videos.findIndex(v => v.id === videoId);
      
      const newVideos = [...videos];
      const [removed] = newVideos.splice(draggedIndex, 1);
      newVideos.splice(targetIndex, 0, removed);
      setVideos(newVideos);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const removeVideo = (videoId: string) => {
    setVideos(videos.filter(v => v.id !== videoId));
  };

  const getTotalDuration = () => {
    const totalSeconds = videos.reduce((acc, v) => {
      const [mins, secs] = v.duration.split(":").map(Number);
      return acc + mins * 60 + secs;
    }, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <header className="border-b border-[#2a2a2e] bg-[#0a0a0b]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                </svg>
              </div>
              <div>
                <span className="font-bold">Loop<span className="text-[#a855f7]">Easy</span></span>
                <span className="text-[#6b6b70] text-sm ml-2">/ Playlist Manager</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setAiSuggestionOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1f] border border-[#2a2a2e] text-[#a1a1a6] rounded-full hover:border-[#6366f1] hover:text-white transition-all"
            >
              <span className="text-lg">🤖</span>
              <span className="text-sm font-medium">AI Suggest Order</span>
            </button>
            
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg transition-all">
              Publish Channel
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main - Video List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Channel Header */}
            <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl">
                  🔥
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    defaultValue="Morning Fitness Routine"
                    className="text-2xl font-bold bg-transparent border-none focus:outline-none w-full"
                    placeholder="Channel Name"
                  />
                  <textarea
                    defaultValue="Start your day right with this complete fitness program. From warmup to cooldown, everything you need."
                    className="mt-2 text-[#a1a1a6] bg-transparent border-none focus:outline-none w-full resize-none"
                    rows={2}
                    placeholder="Channel description..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#6b6b70]">
                  <span className="text-white font-medium">{videos.length}</span> videos
                </div>
                <div className="text-sm text-[#6b6b70]">
                  <span className="text-white font-medium">{getTotalDuration()}</span> total
                </div>
                <div className="text-sm text-[#6b6b70]">
                  <span className="text-white font-medium">132K</span> views
                </div>
              </div>
            </div>

            {/* Video Sequence */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Video Sequence</h2>
                <Link 
                  href="/upload"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1f] border border-[#2a2a2e] text-white rounded-full hover:border-[#6366f1] transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Videos
                </Link>
              </div>

              <p className="text-sm text-[#6b6b70]">Drag to reorder • Videos play in this sequence</p>

              <div className="space-y-2">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, video.id)}
                    onDragOver={(e) => handleDragOver(e, video.id)}
                    onDragEnd={handleDragEnd}
                    className={`p-4 rounded-xl bg-[#141416] border transition-all cursor-grab active:cursor-grabbing ${
                      draggedItem === video.id
                        ? "border-[#6366f1] opacity-50"
                        : "border-[#2a2a2e] hover:border-[#6366f1]/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Drag Handle + Number */}
                      <div className="flex items-center gap-2 text-[#6b6b70]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zM8 11h2v2H8v-2zm6 0h2v2h-2v-2zm-6 5h2v2H8v-2zm6 0h2v2h-2v-2z"/>
                        </svg>
                        <span className="font-mono text-sm w-6">{index + 1}</span>
                      </div>

                      {/* Thumbnail */}
                      <div className="w-24 h-14 rounded-lg bg-gradient-to-br from-[#1c1c1f] to-[#2a2a2e] flex items-center justify-center text-2xl relative">
                        {video.thumbnail}
                        <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-white text-[10px] rounded">
                          {video.duration}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{video.title}</div>
                        <div className="text-sm text-[#6b6b70]">{video.views} views</div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-[#1c1c1f] text-[#6b6b70] hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => removeVideo(video.id)}
                          className="p-2 rounded-lg hover:bg-[#ef4444]/20 text-[#6b6b70] hover:text-[#ef4444] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Flow */}
              <div className="mt-6 p-4 bg-[#141416] border border-[#2a2a2e] rounded-xl">
                <div className="text-sm text-[#6b6b70] mb-3">Playback Flow</div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {videos.map((video, index) => (
                    <div key={video.id} className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1c1c1f] to-[#2a2a2e] flex items-center justify-center text-lg flex-shrink-0">
                        {video.thumbnail}
                      </div>
                      {index < videos.length - 1 && (
                        <svg className="w-6 h-6 text-[#6b6b70] mx-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                  
                  {/* After end indicator */}
                  <svg className="w-6 h-6 text-[#6b6b70] mx-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  
                  <div className={`px-3 py-2 rounded-lg text-xs font-medium flex-shrink-0 ${
                    settings.afterEnd === "loop" ? "bg-[#6366f1]/20 text-[#6366f1]" :
                    settings.afterEnd === "handoff" ? "bg-[#22c55e]/20 text-[#22c55e]" :
                    settings.afterEnd === "stop" ? "bg-[#ef4444]/20 text-[#ef4444]" :
                    "bg-[#f59e0b]/20 text-[#f59e0b]"
                  }`}>
                    {settings.afterEnd === "loop" && "🔁 Loop Back"}
                    {settings.afterEnd === "handoff" && "➡️ Handoff"}
                    {settings.afterEnd === "stop" && "⏹️ Stop"}
                    {settings.afterEnd === "recommendations" && "✨ Recommend"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Settings */}
          <div className="space-y-6">
            {/* Playback Settings */}
            <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>⚙️</span>
                Playback Settings
              </h3>

              <div className="space-y-4">
                {/* After Playlist Ends */}
                <div>
                  <label className="text-sm text-[#6b6b70] mb-2 block">After playlist ends...</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "loop", label: "🔁 Loop", desc: "Start over" },
                      { id: "stop", label: "⏹️ Stop", desc: "End playback" },
                      { id: "handoff", label: "➡️ Handoff", desc: "Go to channel" },
                      { id: "recommendations", label: "✨ Suggest", desc: "Show recs" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSettings({ ...settings, afterEnd: option.id as PlaylistSettings["afterEnd"] });
                          if (option.id === "handoff") setShowHandoffPicker(true);
                        }}
                        className={`p-3 rounded-xl text-left transition-all ${
                          settings.afterEnd === option.id
                            ? "bg-[#6366f1]/20 border border-[#6366f1]"
                            : "bg-[#1c1c1f] border border-[#2a2a2e] hover:border-[#6366f1]/50"
                        }`}
                      >
                        <div className="text-sm font-medium">{option.label}</div>
                        <div className="text-xs text-[#6b6b70]">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Handoff Channel Picker */}
                {settings.afterEnd === "handoff" && (
                  <div className="p-4 bg-[#1c1c1f] rounded-xl border border-[#2a2a2e]">
                    <label className="text-sm text-[#6b6b70] mb-2 block">Handoff to channel:</label>
                    {settings.handoffChannel ? (
                      <div className="flex items-center gap-3 p-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-lg">
                          🧘
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Evening Yoga Flow</div>
                          <div className="text-xs text-[#6b6b70]">@yogawithsara</div>
                        </div>
                        <button
                          onClick={() => setSettings({ ...settings, handoffChannel: null })}
                          className="text-[#6b6b70] hover:text-white"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowHandoffPicker(true)}
                        className="w-full p-3 border border-dashed border-[#2a2a2e] rounded-lg text-[#6b6b70] hover:border-[#6366f1] hover:text-white transition-all text-sm"
                      >
                        + Select a channel
                      </button>
                    )}
                  </div>
                )}

                {/* Loop Mode */}
                <div>
                  <label className="text-sm text-[#6b6b70] mb-2 block">Playback mode</label>
                  <div className="flex gap-2">
                    {[
                      { id: "loop", label: "🔁 Sequential" },
                      { id: "shuffle", label: "🔀 Shuffle" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setSettings({ ...settings, loopMode: mode.id as "loop" | "shuffle" })}
                        className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all ${
                          settings.loopMode === mode.id
                            ? "bg-[#6366f1]/20 border border-[#6366f1] text-white"
                            : "bg-[#1c1c1f] border border-[#2a2a2e] text-[#a1a1a6] hover:border-[#6366f1]/50"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Allow viewers to skip</span>
                    <button
                      onClick={() => setSettings({ ...settings, allowSkip: !settings.allowSkip })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.allowSkip ? "bg-[#6366f1]" : "bg-[#2a2a2e]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        settings.allowSkip ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-play next video</span>
                    <button
                      onClick={() => setSettings({ ...settings, autoPlay: !settings.autoPlay })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.autoPlay ? "bg-[#6366f1]" : "bg-[#2a2a2e]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        settings.autoPlay ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-[#141416] border border-[#2a2a2e] rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>👁️</span>
                Visibility
              </h3>
              <div className="space-y-2">
                {[
                  { id: "public", label: "Public", desc: "Anyone can find and watch", icon: "🌐" },
                  { id: "unlisted", label: "Unlisted", desc: "Only people with the link", icon: "🔗" },
                  { id: "private", label: "Private", desc: "Only you can see", icon: "🔒" },
                ].map((vis) => (
                  <button
                    key={vis.id}
                    onClick={() => setSettings({ ...settings, visibility: vis.id as PlaylistSettings["visibility"] })}
                    className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                      settings.visibility === vis.id
                        ? "bg-[#6366f1]/20 border border-[#6366f1]"
                        : "bg-[#1c1c1f] border border-[#2a2a2e] hover:border-[#6366f1]/50"
                    }`}
                  >
                    <span className="text-xl">{vis.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{vis.label}</div>
                      <div className="text-xs text-[#6b6b70]">{vis.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Suggestions Card */}
            <div className="bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/30 rounded-2xl p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>🤖</span>
                AI Suggestions
              </h3>
              <p className="text-sm text-[#a1a1a6] mb-4">
                Let AI optimize your playlist for maximum engagement
              </p>
              <button
                onClick={() => setAiSuggestionOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Get AI Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Handoff Channel Picker Modal */}
      {showHandoffPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-3xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Select Handoff Channel</h3>
              <button
                onClick={() => setShowHandoffPicker(false)}
                className="p-2 rounded-lg hover:bg-[#1c1c1f] text-[#6b6b70] hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-[#6b6b70] mb-4">
              When your playlist ends, viewers will continue to this channel:
            </p>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search channels..."
                className="w-full px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1]"
              />
            </div>

            <div className="text-xs text-[#6b6b70] mb-2">AI SUGGESTED</div>
            <div className="space-y-2">
              {suggestedChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => {
                    setSettings({ ...settings, handoffChannel: channel.id });
                    setShowHandoffPicker(false);
                  }}
                  className="w-full p-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] hover:border-[#6366f1] transition-all flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-xl">
                    {channel.id === "meditation" ? "🧘" : channel.id === "yoga" ? "🧘‍♀️" : "🥗"}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{channel.name}</div>
                    <div className="text-xs text-[#6b6b70]">{channel.creator}</div>
                  </div>
                  <div className="px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] text-xs font-medium rounded">
                    {channel.match} match
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestions Modal */}
      {aiSuggestionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-3xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span>🤖</span>
                AI Playlist Optimizer
              </h3>
              <button
                onClick={() => setAiSuggestionOpen(false)}
                className="p-2 rounded-lg hover:bg-[#1c1c1f] text-[#6b6b70] hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#1c1c1f] rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <div className="font-medium mb-1">Optimal Order Found</div>
                    <p className="text-sm text-[#a1a1a6]">
                      Based on viewer retention data, I recommend starting with high-energy content 
                      and ending with recovery. This order increases average watch time by 34%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#1c1c1f] rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔗</span>
                  <div>
                    <div className="font-medium mb-1">Handoff Suggestion</div>
                    <p className="text-sm text-[#a1a1a6]">
                      "Evening Yoga Flow" has 88% audience overlap. Setting it as your handoff 
                      channel could increase cross-channel retention by 45%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#1c1c1f] rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <div className="font-medium mb-1">Duration Analysis</div>
                    <p className="text-sm text-[#a1a1a6]">
                      Your playlist is 61 minutes. Consider adding a 5-minute "bonus" video 
                      to hit the 66-minute sweet spot for this category.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setAiSuggestionOpen(false)}
                  className="flex-1 py-3 bg-[#1c1c1f] border border-[#2a2a2e] text-white rounded-xl font-medium hover:border-[#6366f1] transition-all"
                >
                  Keep Current
                </button>
                <button
                  onClick={() => {
                    // Would apply AI suggestions
                    setAiSuggestionOpen(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Apply All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
