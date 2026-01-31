"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "processing" | "ready" | "error";
  thumbnail?: string;
  duration?: string;
};

type AITool = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "enhance" | "transform" | "audio" | "creative";
  isPro?: boolean;
};

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [activeAITool, setActiveAITool] = useState<string | null>(null);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState<{role: "user" | "ai"; text: string}[]>([
    { role: "ai", text: "Hey! I'm here to help you create amazing content. What would you like to do with your video?" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [processingEffect, setProcessingEffect] = useState<string | null>(null);

  const aiTools: AITool[] = [
    // Enhance
    { id: "auto-enhance", name: "Auto Enhance", description: "AI automatically improves color, lighting, and clarity", icon: "✨", category: "enhance" },
    { id: "stabilize", name: "Stabilize", description: "Remove camera shake for smooth footage", icon: "📐", category: "enhance" },
    { id: "upscale", name: "4K Upscale", description: "Enhance resolution up to 4K quality", icon: "🔍", category: "enhance", isPro: true },
    { id: "denoise", name: "Denoise", description: "Remove grain and visual noise", icon: "🌫️", category: "enhance" },
    
    // Transform
    { id: "cinematic", name: "Cinematic Look", description: "Film-grade color grading and letterbox", icon: "🎬", category: "transform" },
    { id: "vintage", name: "Vintage Film", description: "Classic VHS or film grain aesthetic", icon: "📼", category: "transform" },
    { id: "neon", name: "Neon Glow", description: "Cyberpunk-style neon color effects", icon: "💜", category: "transform" },
    { id: "anime", name: "Anime Style", description: "Transform footage into anime aesthetic", icon: "🎨", category: "transform", isPro: true },
    
    // Audio
    { id: "audio-clean", name: "Clean Audio", description: "Remove background noise and enhance voice", icon: "🎙️", category: "audio" },
    { id: "audio-boost", name: "Volume Boost", description: "Intelligently increase audio levels", icon: "🔊", category: "audio" },
    { id: "music-match", name: "Music Match", description: "AI suggests music that fits your video's mood", icon: "🎵", category: "audio" },
    { id: "voice-over", name: "AI Voice Over", description: "Generate narration from text", icon: "🗣️", category: "audio", isPro: true },
    
    // Creative
    { id: "auto-captions", name: "Auto Captions", description: "Generate accurate subtitles automatically", icon: "💬", category: "creative" },
    { id: "thumbnail", name: "AI Thumbnail", description: "Generate eye-catching thumbnails", icon: "🖼️", category: "creative" },
    { id: "smart-cut", name: "Smart Cut", description: "AI removes silence and dead space", icon: "✂️", category: "creative" },
    { id: "highlights", name: "Auto Highlights", description: "AI finds the best moments", icon: "⭐", category: "creative", isPro: true },
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading" as const,
      thumbnail: "🎬",
      duration: `${Math.floor(Math.random() * 10) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    }));

    setFiles(prev => [...prev, ...uploadedFiles]);

    // Simulate upload progress
    uploadedFiles.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress: 100, status: "processing" } : f
          ));
          
          // Simulate processing
          setTimeout(() => {
            setFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, status: "ready" } : f
            ));
          }, 1500 + index * 500);
        } else {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress } : f
          ));
        }
      }, 200);
    });

    if (uploadedFiles.length > 0) {
      setSelectedFile(uploadedFiles[0].id);
      setShowAIPanel(true);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const applyAITool = (toolId: string) => {
    setActiveAITool(toolId);
    setProcessingEffect(toolId);
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessingEffect(null);
      setAiChatMessages(prev => [...prev, {
        role: "ai",
        text: `✅ ${aiTools.find(t => t.id === toolId)?.name} applied! Your video is looking great. Want to try another effect or proceed to publish?`
      }]);
    }, 2000);
  };

  const handleAISend = () => {
    if (!aiInput.trim()) return;
    
    setAiChatMessages(prev => [...prev, { role: "user", text: aiInput }]);
    const input = aiInput.toLowerCase();
    setAiInput("");

    // Simulate AI response based on input
    setTimeout(() => {
      let response = "";
      if (input.includes("cinematic") || input.includes("movie")) {
        response = "I can give your video a cinematic look! This adds film-grade color grading and a letterbox effect. Want me to apply it?";
      } else if (input.includes("caption") || input.includes("subtitle")) {
        response = "I'll generate captions for your video automatically. This usually takes about 30 seconds. Should I start?";
      } else if (input.includes("thumbnail")) {
        response = "I can create several thumbnail options for you based on the best frames in your video. Want me to generate some?";
      } else if (input.includes("music") || input.includes("audio")) {
        response = "I can help with audio! I can clean up background noise, suggest matching music, or even generate a voiceover. What sounds good?";
      } else if (input.includes("help") || input.includes("what can")) {
        response = "I can enhance your video (color, stabilization, 4K upscale), add effects (cinematic, vintage, neon), improve audio, generate captions, and create thumbnails. Just tell me what you're going for!";
      } else {
        response = "Got it! Let me think about the best way to help with that. In the meantime, you can try any of the AI tools on the right, or tell me more about what you're envisioning.";
      }
      setAiChatMessages(prev => [...prev, { role: "ai", text: response }]);
    }, 1000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
                <span className="text-[#6b6b70] text-sm ml-2">/ Upload</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setAiChatOpen(!aiChatOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                aiChatOpen 
                  ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white" 
                  : "bg-[#1c1c1f] border border-[#2a2a2e] text-[#a1a1a6] hover:border-[#6366f1]"
              }`}
            >
              <span className="text-lg">🤖</span>
              <span className="text-sm font-medium">AI Assistant</span>
            </button>
            
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg transition-all">
              Continue to Playlist →
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all ${showAIPanel ? 'mr-96' : ''} ${aiChatOpen ? 'mr-80' : ''}`}>
          {/* Upload Zone */}
          {files.length === 0 ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-20 text-center transition-all ${
                isDragging 
                  ? "border-[#6366f1] bg-[#6366f1]/10" 
                  : "border-[#2a2a2e] hover:border-[#6366f1]/50"
              }`}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Drop your videos here</h2>
              <p className="text-[#6b6b70] mb-6">or click to browse • MP4, MOV, WebM up to 10GB</p>
              
              <label className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-full cursor-pointer hover:shadow-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Select Files
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>

              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#6b6b70]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span>AI Enhancement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎨</span>
                  <span>Style Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <span>Auto Captions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🖼️</span>
                  <span>AI Thumbnails</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Add more files button */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Videos ({files.length})</h2>
                <label className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1f] border border-[#2a2a2e] text-white rounded-full cursor-pointer hover:border-[#6366f1] transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add More
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>

              {/* File list */}
              <div className="grid gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => {
                      setSelectedFile(file.id);
                      setShowAIPanel(true);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedFile === file.id
                        ? "bg-[#6366f1]/10 border-[#6366f1]"
                        : "bg-[#141416] border-[#2a2a2e] hover:border-[#6366f1]/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="w-32 h-20 rounded-xl bg-gradient-to-br from-[#1c1c1f] to-[#2a2a2e] flex items-center justify-center text-3xl relative overflow-hidden">
                        {file.status === "processing" && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        {file.thumbnail}
                        {file.duration && file.status === "ready" && (
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                            {file.duration}
                          </span>
                        )}
                      </div>

                      {/* File info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{file.name}</div>
                        <div className="text-sm text-[#6b6b70]">{formatFileSize(file.size)}</div>
                        
                        {file.status === "uploading" && (
                          <div className="mt-2">
                            <div className="h-1.5 bg-[#2a2a2e] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <div className="text-xs text-[#6b6b70] mt-1">Uploading... {Math.round(file.progress)}%</div>
                          </div>
                        )}
                        
                        {file.status === "processing" && (
                          <div className="text-xs text-[#f59e0b] mt-2 flex items-center gap-1">
                            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
                            Processing video...
                          </div>
                        )}
                        
                        {file.status === "ready" && (
                          <div className="text-xs text-[#22c55e] mt-2 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Ready for editing
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {file.status === "ready" && (
                          <>
                            <button className="p-2 rounded-lg hover:bg-[#2a2a2e] transition-colors text-[#6b6b70] hover:text-white">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-[#ef4444]/20 transition-colors text-[#6b6b70] hover:text-[#ef4444]">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Preview Area */}
              {selectedFile && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#1c1c1f] to-[#141416] border border-[#2a2a2e] flex items-center justify-center relative overflow-hidden">
                    {processingEffect && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
                        <div className="w-16 h-16 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin mb-4" />
                        <div className="text-lg font-semibold">Applying {aiTools.find(t => t.id === processingEffect)?.name}...</div>
                        <div className="text-sm text-[#6b6b70] mt-1">This may take a moment</div>
                      </div>
                    )}
                    <div className="text-6xl opacity-30">
                      {files.find(f => f.id === selectedFile)?.thumbnail}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                        <span className="text-sm text-white/80">0:00 / {files.find(f => f.id === selectedFile)?.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* AI Tools Panel */}
        {showAIPanel && files.length > 0 && (
          <aside className="fixed right-0 top-[73px] bottom-0 w-96 bg-[#0a0a0b] border-l border-[#2a2a2e] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">AI Tools</h3>
                <button
                  onClick={() => setShowAIPanel(false)}
                  className="p-2 rounded-lg hover:bg-[#1c1c1f] text-[#6b6b70] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <button
                  onClick={() => applyAITool("auto-enhance")}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/30 hover:border-[#6366f1] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div className="text-left">
                      <div className="font-semibold group-hover:text-[#a855f7] transition-colors">Auto-Enhance Everything</div>
                      <div className="text-sm text-[#6b6b70]">One-click AI improvement</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Tool Categories */}
              {["enhance", "transform", "audio", "creative"].map((category) => (
                <div key={category} className="mb-6">
                  <h4 className="text-sm font-semibold text-[#6b6b70] uppercase tracking-wider mb-3">
                    {category === "enhance" && "🔧 Enhance"}
                    {category === "transform" && "🎨 Transform"}
                    {category === "audio" && "🎵 Audio"}
                    {category === "creative" && "✨ Creative"}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {aiTools.filter(t => t.category === category).map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => applyAITool(tool.id)}
                        disabled={processingEffect !== null}
                        className={`p-3 rounded-xl text-left transition-all relative ${
                          activeAITool === tool.id
                            ? "bg-[#6366f1]/20 border border-[#6366f1]"
                            : "bg-[#141416] border border-[#2a2a2e] hover:border-[#6366f1]/50"
                        } ${processingEffect ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {tool.isPro && (
                          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] text-[10px] font-bold rounded">
                            PRO
                          </span>
                        )}
                        <div className="text-xl mb-1">{tool.icon}</div>
                        <div className="text-sm font-medium">{tool.name}</div>
                        <div className="text-xs text-[#6b6b70] mt-0.5 line-clamp-2">{tool.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* AI Chat Panel */}
        {aiChatOpen && (
          <aside className="fixed right-0 top-[73px] bottom-0 w-80 bg-[#0a0a0b] border-l border-[#2a2a2e] flex flex-col">
            <div className="p-4 border-b border-[#2a2a2e] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button
                onClick={() => setAiChatOpen(false)}
                className="p-2 rounded-lg hover:bg-[#1c1c1f] text-[#6b6b70] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiChatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white"
                      : "bg-[#1c1c1f] text-[#e5e5e5]"
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#2a2a2e]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1]"
                />
                <button
                  onClick={handleAISend}
                  className="p-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Make it cinematic", "Add captions", "Clean audio"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setAiInput(suggestion);
                      setTimeout(handleAISend, 100);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] text-xs text-[#a1a1a6] hover:border-[#6366f1] hover:text-white transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
