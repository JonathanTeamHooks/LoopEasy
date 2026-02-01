"use client";

import { useState } from "react";
import Link from "next/link";

type VideoItem = {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
};

export default function NewPlaylistPage() {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [videos, setVideos] = useState<VideoItem[]>([
    // Demo videos - in real app, these would come from uploaded videos
    { id: "1", title: "My First Video", duration: "3:24", thumbnail: "🎬" },
    { id: "2", title: "Tutorial Part 1", duration: "8:15", thumbnail: "📹" },
    { id: "3", title: "Behind the Scenes", duration: "2:45", thumbnail: "🎥" },
  ]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newVideos = [...videos];
    const draggedVideo = newVideos[draggedIndex];
    newVideos.splice(draggedIndex, 1);
    newVideos.splice(index, 0, draggedVideo);
    setVideos(newVideos);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-[#1c1c1f]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/upload" className="text-[#6b6b70] hover:text-white transition-colors">
              ← Back to Upload
            </Link>
            <span className="text-[#2a2a2e]">|</span>
            <h1 className="text-lg font-semibold">Create Playlist</h1>
          </div>
          
          <button
            onClick={() => {
              // In real app, this would save to database
              alert("Playlist created! (Demo mode)");
            }}
            disabled={!playlistName.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Playlist
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Playlist Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Thumbnail Preview */}
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-[#2a2a2e] flex items-center justify-center">
              {videos.length > 0 ? (
                <div className="text-6xl">{videos[0].thumbnail}</div>
              ) : (
                <div className="text-center text-[#6b6b70]">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">No videos yet</p>
                </div>
              )}
            </div>

            {/* Playlist Name */}
            <div>
              <label className="block text-sm font-medium text-[#a1a1a6] mb-2">Playlist Name</label>
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="My Awesome Playlist"
                className="w-full px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#a1a1a6] mb-2">Description</label>
              <textarea
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                placeholder="What's this playlist about?"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-colors resize-none"
              />
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium text-[#a1a1a6] mb-3">Visibility</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsPublic(true)}
                  className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                    isPublic
                      ? "bg-[#6366f1]/20 border-[#6366f1] text-white"
                      : "bg-[#1c1c1f] border-[#2a2a2e] text-[#6b6b70] hover:border-[#6366f1]/50"
                  }`}
                >
                  <span className="block text-lg mb-1">🌍</span>
                  <span className="text-sm font-medium">Public</span>
                </button>
                <button
                  onClick={() => setIsPublic(false)}
                  className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                    !isPublic
                      ? "bg-[#6366f1]/20 border-[#6366f1] text-white"
                      : "bg-[#1c1c1f] border-[#2a2a2e] text-[#6b6b70] hover:border-[#6366f1]/50"
                  }`}
                >
                  <span className="block text-lg mb-1">🔒</span>
                  <span className="text-sm font-medium">Private</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e]">
              <div className="flex justify-between text-sm">
                <span className="text-[#6b6b70]">Videos</span>
                <span className="font-medium">{videos.length}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-[#6b6b70]">Total Duration</span>
                <span className="font-medium">
                  {videos.reduce((acc, v) => {
                    const [mins, secs] = v.duration.split(":").map(Number);
                    return acc + mins * 60 + secs;
                  }, 0) > 0
                    ? `${Math.floor(videos.reduce((acc, v) => {
                        const [mins, secs] = v.duration.split(":").map(Number);
                        return acc + mins * 60 + secs;
                      }, 0) / 60)}:${String(videos.reduce((acc, v) => {
                        const [mins, secs] = v.duration.split(":").map(Number);
                        return acc + mins * 60 + secs;
                      }, 0) % 60).padStart(2, "0")}`
                    : "0:00"
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Video List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Videos</h2>
              <p className="text-sm text-[#6b6b70]">Drag to reorder</p>
            </div>

            {videos.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-[#2a2a2e] rounded-2xl">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#6b6b70] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <p className="text-[#6b6b70] mb-4">No videos in this playlist yet</p>
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1] text-white rounded-full text-sm font-medium hover:bg-[#5558e3] transition-colors"
                >
                  <span>+</span> Upload Videos
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] cursor-move hover:border-[#6366f1]/50 transition-all ${
                      draggedIndex === index ? "opacity-50 scale-[0.98]" : ""
                    }`}
                  >
                    {/* Drag Handle */}
                    <div className="text-[#6b6b70] hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                    </div>

                    {/* Position */}
                    <span className="w-6 text-center text-[#6b6b70] font-medium">{index + 1}</span>

                    {/* Thumbnail */}
                    <div className="w-24 h-14 rounded-lg bg-[#2a2a2e] flex items-center justify-center text-2xl flex-shrink-0">
                      {video.thumbnail}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{video.title}</h3>
                      <p className="text-sm text-[#6b6b70]">{video.duration}</p>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => removeVideo(video.id)}
                      className="p-2 text-[#6b6b70] hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Add More */}
                <Link
                  href="/upload"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-[#2a2a2e] text-[#6b6b70] hover:border-[#6366f1]/50 hover:text-[#6366f1] transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-medium">Add More Videos</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
