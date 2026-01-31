"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PlatformShowcase from "@/components/PlatformShowcase";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Rotate demo screens
    const interval = setInterval(() => {
      setActiveDemo(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#6366f1]/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#a855f7]/15 rounded-full blur-[200px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold">Loop<span className="text-[#a855f7]">Easy</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-sm text-[#a1a1a6] hover:text-white transition-colors">Sign In</Link>
            <Link href="/auth" className="px-5 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-semibold rounded-full hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO - The Punch */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* The Problem - Strike First */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
              You've been settling for less
            </div>
          </div>

          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block text-[#6b6b70]">YouTube is chaos.</span>
            <span className="block text-[#6b6b70]">Netflix is passive.</span>
            <span className="block mt-4 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              This is neither.
            </span>
          </h1>

          <p className={`text-xl sm:text-2xl text-[#a1a1a6] max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white font-semibold">Curated video channels</span> that play forever.
            <br />
            <span className="text-white font-semibold">Created by anyone</span> with AI-powered tools.
            <br />
            <span className="text-white font-semibold">Watch free</span> or go premium. <span className="text-[#f59e0b] font-semibold">Creators earn 70%.</span>
          </p>

          {/* CTA */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/browse" className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-lg font-semibold rounded-full hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Start Watching Free
            </Link>
            <Link href="/upload" className="group w-full sm:w-auto px-8 py-4 bg-[#1c1c1f] border border-[#2a2a2e] text-white text-lg font-medium rounded-full hover:border-[#f59e0b] transition-all flex items-center justify-center gap-3">
              <span className="text-xl">✨</span>
              Create with AI
            </Link>
          </div>

          {/* Live Stats Bar */}
          <div className={`flex flex-wrap items-center justify-center gap-6 sm:gap-12 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[#22c55e] font-semibold">12,847</span>
              <span className="text-[#6b6b70]">watching now</span>
            </div>
            <div className="text-[#6b6b70]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">10,000+</span>
              <span className="text-[#6b6b70]">channels</span>
            </div>
            <div className="text-[#6b6b70]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-[#f59e0b] font-semibold">$2.4M+</span>
              <span className="text-[#6b6b70]">paid to creators</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#6b6b70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* THE VOID - What's Missing */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              What you've been missing
            </h2>
            <p className="text-xl text-[#a1a1a6] max-w-2xl mx-auto">
              You've accepted a broken experience. Let us show you what video should feel like.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
              <div className="text-4xl mb-6">😩</div>
              <h3 className="text-xl font-bold mb-3 text-[#ef4444]">The Endless Scroll</h3>
              <p className="text-[#a1a1a6] mb-4">
                YouTube dumps you in an ocean of thumbnails. You spend more time <em>choosing</em> than watching.
              </p>
              <div className="pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#6366f1] font-medium">With LoopEasy:</div>
                <div className="text-white mt-1">Pick a channel. Press play. It never stops.</div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
              <div className="text-4xl mb-6">🎬</div>
              <h3 className="text-xl font-bold mb-3 text-[#ef4444]">The Creation Gap</h3>
              <p className="text-[#a1a1a6] mb-4">
                You have taste. You know what's good. But editing video? That's a whole career.
              </p>
              <div className="pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#6366f1] font-medium">With LoopEasy:</div>
                <div className="text-white mt-1">AI edits for you. Upload → Enhance → Publish. Done.</div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
              <div className="text-4xl mb-6">💸</div>
              <h3 className="text-xl font-bold mb-3 text-[#ef4444]">The Creator Squeeze</h3>
              <p className="text-[#a1a1a6] mb-4">
                YouTube takes 45%. You need 1,000 subs. The algorithm decides if you exist.
              </p>
              <div className="pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#f59e0b] font-medium">With LoopEasy:</div>
                <div className="text-white mt-1">You keep 70%. Start earning day one. No gatekeepers.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PRODUCT - Show Don't Tell */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/5 via-transparent to-[#a855f7]/5" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              See it in action
            </h2>
            <p className="text-xl text-[#a1a1a6]">
              This is what your viewing experience becomes
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="relative">
            {/* Browser mockup */}
            <div className="bg-[#141416] rounded-2xl border border-[#2a2a2e] shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a2e]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1.5 rounded-full bg-[#1c1c1f] text-sm text-[#6b6b70]">
                    loopeasy.com/watch
                  </div>
                </div>
              </div>

              {/* Screen content */}
              <div className="relative aspect-video bg-[#0a0a0b]">
                {/* Demo states */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeDemo === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Watching state */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <div className="text-[120px]">🏋️</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        LIVE
                      </span>
                      <span className="text-white/80 text-sm">2.4K watching</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">Kettlebell HIIT</div>
                    <div className="text-white/60">@fitnessmike • Playing continuously</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full w-1/3 bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
                  </div>
                </div>

                <div className={`absolute inset-0 transition-opacity duration-500 ${activeDemo === 1 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* AI Upload state */}
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <div className="w-full max-w-2xl">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/20 text-[#6366f1] text-sm font-medium mb-4">
                          <span className="text-lg">🤖</span>
                          AI is enhancing your video...
                        </div>
                        <div className="text-xl font-semibold text-white">Making it cinematic</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30">
                          <span className="text-[#22c55e]">✓</span>
                          <span className="text-white">Color correction applied</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30">
                          <span className="text-[#22c55e]">✓</span>
                          <span className="text-white">Audio enhanced</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/30">
                          <div className="w-4 h-4 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin" />
                          <span className="text-white">Adding cinematic letterbox...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`absolute inset-0 transition-opacity duration-500 ${activeDemo === 2 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Earnings state */}
                  <div className="absolute inset-0 p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center text-xl font-bold">JM</div>
                      <div>
                        <div className="font-bold text-white">Creator Dashboard</div>
                        <div className="text-[#f59e0b] text-sm">Creator Pro</div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-3xl font-bold text-[#22c55e]">$2,847</div>
                        <div className="text-[#6b6b70] text-sm">This month</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-[#1c1c1f]">
                        <div className="text-2xl font-bold text-white">12</div>
                        <div className="text-[#6b6b70] text-sm">Channels</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1c1c1f]">
                        <div className="text-2xl font-bold text-white">48.2K</div>
                        <div className="text-[#6b6b70] text-sm">Followers</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1c1c1f]">
                        <div className="text-2xl font-bold text-white">1.2M</div>
                        <div className="text-[#6b6b70] text-sm">Views</div>
                      </div>
                    </div>
                    <div className="flex items-end gap-1 h-24">
                      {[30, 45, 35, 60, 50, 70, 65, 80, 75, 95, 85, 100, 90, 110, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[#f59e0b] to-[#ef4444] rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Demo indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {["Watch", "Create", "Earn"].map((label, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveDemo(i)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        activeDemo === i
                          ? "bg-white text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 top-1/4 px-4 py-3 bg-[#141416] border border-[#2a2a2e] rounded-2xl shadow-xl animate-bounce-slow">
              <div className="text-sm text-[#6b6b70]">Channel plays</div>
              <div className="text-2xl font-bold text-[#6366f1]">24/7</div>
            </div>
            <div className="absolute -left-4 bottom-1/4 px-4 py-3 bg-[#141416] border border-[#f59e0b]/30 rounded-2xl shadow-xl">
              <div className="text-sm text-[#6b6b70]">You keep</div>
              <div className="text-2xl font-bold text-[#f59e0b]">70%</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI SUPERPOWERS */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/20 text-[#6366f1] text-sm font-semibold mb-6">
              <span>🤖</span>
              AI-Powered Creation
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Your iPhone footage.
              <br />
              <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                Hollywood quality.
              </span>
            </h2>
            <p className="text-xl text-[#a1a1a6] max-w-2xl mx-auto">
              AI handles the hard parts. You just upload and describe what you want.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "✨", title: "Auto Enhance", desc: "One click improves color, lighting, and clarity" },
              { icon: "🎬", title: "Style Transfer", desc: "Cinematic, vintage, neon — pick your vibe" },
              { icon: "💬", title: "Auto Captions", desc: "AI generates accurate subtitles instantly" },
              { icon: "🖼️", title: "AI Thumbnails", desc: "Eye-catching thumbnails that get clicks" },
              { icon: "🎵", title: "Audio Cleanup", desc: "Remove noise, enhance voice, match music" },
              { icon: "✂️", title: "Smart Cut", desc: "AI removes silence and dead space" },
              { icon: "📐", title: "Stabilize", desc: "Smooth out shaky handheld footage" },
              { icon: "🔍", title: "4K Upscale", desc: "Enhance resolution up to 4K quality" },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#141416] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <div className="font-semibold mb-1">{feature.title}</div>
                <div className="text-sm text-[#6b6b70]">{feature.desc}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/upload" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-full hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all">
              Try AI Creator Tools Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM SHOWCASE */}
      <PlatformShowcase />

      {/* SOCIAL PROOF */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/5 via-transparent to-[#a855f7]/5" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Creators are already winning
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I made $800 in my first month. On YouTube I couldn't even monetize yet.",
                name: "Sarah K.",
                role: "Fitness Creator",
                avatar: "🏋️",
                stat: "$4.2K/mo"
              },
              {
                quote: "The AI tools are insane. I uploaded raw footage and it made it look professional.",
                name: "Marcus T.",
                role: "Music Curator",
                avatar: "🎵",
                stat: "50K followers"
              },
              {
                quote: "No algorithm games. My channel plays 24/7 and people find it. That's it.",
                name: "Jenny L.",
                role: "Meditation Guide",
                avatar: "🧘",
                stat: "2.1M views"
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#141416] border border-[#2a2a2e]">
                <div className="text-lg text-[#e5e5e5] mb-6 italic">"{testimonial.quote}"</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-[#6b6b70]">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-sm font-semibold">
                    {testimonial.stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
            
            <div className="relative p-12 md:p-20 text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Stop scrolling.
                <br />
                Start watching.
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-lg mx-auto">
                Join thousands who've discovered what video was meant to be. Free to watch, free to create.
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/50 backdrop-blur"
                  />
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-white text-[#6366f1] font-bold rounded-full hover:bg-white/90 transition-all"
                  >
                    Get Started
                  </button>
                </form>
              ) : (
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/20 backdrop-blur rounded-full font-semibold">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You're in! Check your email.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1c1c1f] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                </svg>
              </div>
              <span className="font-bold">LoopEasy</span>
            </div>
            <div className="flex gap-8 text-sm text-[#6b6b70]">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Creators</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <div className="text-sm text-[#6b6b70]">© 2026 LoopEasy</div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
