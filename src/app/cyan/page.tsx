"use client";

import { useState, useEffect } from "react";

// Electric Cyan Theme - Tech-forward, AI vibes
const theme = {
  accent: "#00d4ff",
  accentHover: "#33ddff",
  accentGlow: "rgba(0, 212, 255, 0.4)",
  accentMuted: "rgba(0, 212, 255, 0.15)",
  gradient: "from-[#00d4ff] via-[#00a8cc] to-[#0891b2]",
  gradientText: "linear-gradient(135deg, #00d4ff 0%, #00ffd4 50%, #00ff88 100%)",
};

// Memorable Loop Logo - Infinity symbol with play button
const LoopLogo = ({ size = "default" }: { size?: "small" | "default" }) => {
  const dimensions = size === "small" ? "w-8 h-8" : "w-10 h-10";
  const iconSize = size === "small" ? "w-4 h-4" : "w-5 h-5";
  
  return (
    <div className={`${dimensions} rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center relative overflow-hidden`}>
      <svg className={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Infinity loop */}
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" className="text-white"/>
      </svg>
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
    </div>
  );
};

export default function CyanTheme() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] noise overflow-hidden">
      {/* Theme indicator */}
      <div className="fixed top-4 right-4 z-[100] px-4 py-2 bg-[#141416] border border-[#2a2a2e] rounded-full text-sm">
        <span className="text-[#a1a1a6]">Theme:</span> <span className="text-[#00d4ff] font-semibold">Electric Cyan</span>
      </div>

      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00d4ff] rounded-full blur-[200px] opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[800px] h-[800px] bg-[#00ffd4] rounded-full blur-[250px] opacity-8 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[#00ff88] rounded-full blur-[180px] opacity-5 animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LoopLogo />
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
              Loop<span className="text-[#00d4ff]">Easy</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-[#a1a1a6]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#creators" className="hover:text-white transition-colors">For Creators</a>
            <a href="#business" className="hover:text-white transition-colors">For Business</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-[#a1a1a6] hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-5 py-2.5 bg-[#00d4ff] hover:bg-[#33ddff] text-black text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div 
              className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] text-sm text-[#a1a1a6] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                Now in Public Beta
              </span>
            </div>

            <h1 
              className={`font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Video Channels
              <br />
              <span className="bg-gradient-to-r from-[#00d4ff] via-[#00ffd4] to-[#00ff88] bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}>That Never Stop</span>
            </h1>

            <p 
              className={`text-lg sm:text-xl text-[#a1a1a6] max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Create curated video channels that play in perfect sequence. 
              Share with your audience or loop for your business. 
              <span className="text-white">Spotify, but for video.</span>
            </p>

            <div 
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <button className="w-full sm:w-auto px-8 py-4 bg-[#00d4ff] hover:bg-[#33ddff] text-black font-semibold rounded-full transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] hover:scale-105">
                Start Creating — It&apos;s Free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-[#1c1c1f] hover:bg-[#252528] text-white font-medium rounded-full border border-[#2a2a2e] hover:border-[#3a3a3f] transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div 
            className={`mt-20 relative transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Browser mockup */}
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/20 to-transparent rounded-3xl blur-3xl -z-10" />
              
              <div className="bg-[#141416] rounded-2xl border border-[#2a2a2e] overflow-hidden shadow-2xl">
                {/* Browser header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c1f] border-b border-[#2a2a2e]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-[#0a0a0b] rounded-lg px-4 py-1.5 text-sm text-[#6b6b70] text-center">
                      loopeasy.com/channel/awesome-music-videos
                    </div>
                  </div>
                </div>
                
                {/* App interface mockup */}
                <div className="flex h-[500px]">
                  {/* Sidebar */}
                  <div className="w-64 bg-[#0a0a0b] border-r border-[#2a2a2e] p-4 hidden md:block">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#1c1c1f] text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        <span className="text-sm font-medium">Home</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a1a1a6] hover:bg-[#1c1c1f] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <span className="text-sm font-medium">Explore</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a1a1a6] hover:bg-[#1c1c1f] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
                        </svg>
                        <span className="text-sm font-medium">Your Library</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className="text-xs font-semibold text-[#6b6b70] uppercase tracking-wider mb-3 px-3">Your Channels</div>
                      <div className="space-y-1">
                        {["Lofi Beats 24/7", "Epic Trailers", "Morning Motivation"].map((channel, i) => (
                          <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a1a1a6] hover:bg-[#1c1c1f] hover:text-white transition-colors cursor-pointer">
                            <div className={`w-8 h-8 rounded bg-gradient-to-br ${theme.gradient} opacity-80`} />
                            <span className="text-sm truncate">{channel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="flex-1 p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">Good evening</h2>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradient}`} />
                      </div>
                    </div>
                    
                    {/* Quick picks grid */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {[
                        { name: "Lofi Beats 24/7", color: "from-[#003d4d] to-[#001a22]" },
                        { name: "Epic Trailers", color: "from-[#004d3d] to-[#00221a]" },
                        { name: "Morning Coffee", color: "from-[#3d4d00] to-[#1a2200]" },
                        { name: "Focus Mode", color: "from-[#004d4d] to-[#002222]" },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 bg-gradient-to-r ${item.color} rounded-lg overflow-hidden hover:bg-opacity-80 transition-all cursor-pointer group`}>
                          <div className="w-16 h-16 bg-black/30 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                          <span className="font-semibold text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Trending section */}
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">Trending Channels</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="aspect-square rounded-lg bg-gradient-to-br from-[#2a2a2e] to-[#1c1c1f] mb-3 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 rounded-full bg-[#00d4ff] flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium truncate">Channel Name</div>
                          <div className="text-xs text-[#6b6b70]">12.5K followers</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Player bar */}
                <div className="h-20 bg-[#1c1c1f] border-t border-[#2a2a2e] flex items-center px-4 gap-4">
                  <div className="flex items-center gap-3 w-64">
                    <div className={`w-14 h-14 rounded bg-gradient-to-br ${theme.gradient}`} />
                    <div>
                      <div className="text-sm font-medium">Currently Playing</div>
                      <div className="text-xs text-[#6b6b70]">Channel Name</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-2">
                      <button className="text-[#a1a1a6] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                        <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                      <button className="text-[#a1a1a6] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="w-full max-w-md flex items-center gap-2">
                      <span className="text-xs text-[#6b6b70]">1:24</span>
                      <div className="flex-1 h-1 bg-[#3a3a3f] rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-[#00d4ff] rounded-full" />
                      </div>
                      <span className="text-xs text-[#6b6b70]">4:32</span>
                    </div>
                  </div>
                  
                  <div className="w-64 flex items-center justify-end gap-3">
                    <button className="text-[#a1a1a6] hover:text-[#00d4ff] transition-colors p-2 rounded-lg hover:bg-[#252528]" title="Loop">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                      </svg>
                    </button>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#a1a1a6]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                      <div className="w-24 h-1 bg-[#3a3a3f] rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-[#00d4ff] via-[#00ffd4] to-[#00ff88] bg-clip-text text-transparent">create & share</span>
            </h2>
            <p className="text-lg text-[#a1a1a6] max-w-2xl mx-auto">
              Whether you&apos;re a creator building an audience or a business running displays, Loop Easy has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                ),
                title: "Curated Channels",
                description: "Build video channels that play in your exact sequence. No algorithms, no surprises — just your vision."
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                  </svg>
                ),
                title: "Infinite Loop",
                description: "Set it and forget it. Your channels play on repeat 24/7 — perfect for lobbies, waiting rooms, or background vibes."
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                ),
                title: "Grow Your Audience",
                description: "Get followers, build subscribers, and monetize your channels. Turn your curation skills into a community."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-[#141416] border border-[#2a2a2e] hover:border-[#00d4ff]/50 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] mb-6 group-hover:bg-[#00d4ff] group-hover:text-black transition-all">
                  {feature.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#a1a1a6] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/20 via-[#00ffd4]/20 to-[#00ff88]/20 rounded-3xl blur-3xl" />
            <div className="relative bg-[#141416] border border-[#2a2a2e] rounded-3xl p-12 md:p-16">
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
                Ready to start looping?
              </h2>
              <p className="text-lg text-[#a1a1a6] mb-8 max-w-lg mx-auto">
                Join thousands of creators and businesses already using Loop Easy. It&apos;s free to get started.
              </p>
              <button className="px-10 py-4 bg-[#00d4ff] hover:bg-[#33ddff] text-black font-semibold rounded-full transition-all hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] hover:scale-105 text-lg">
                Create Your First Channel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2e] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <LoopLogo size="small" />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold">
              Loop<span className="text-[#00d4ff]">Easy</span>
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-[#6b6b70]">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-[#6b6b70]">
            © 2026 Loop Easy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
