"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PlatformShowcase from "@/components/PlatformShowcase";
import Header from "@/components/Header";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiState, setAiState] = useState<"idle" | "thinking" | "result">("idle");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const moods = [
    { emoji: "☀️", label: "Morning devotional", result: "Your Morning Ritual", channels: ["Your saved devotionals", "New from creators you follow", "Recommended for you"], color: "from-amber-400 to-orange-500" },
    { emoji: "💪", label: "Kettlebell workout", result: "Your Fitness Curators", channels: ["@KettlebellKing (subscribed)", "@FitWithMaria (subscribed)", "New: @IronCore"], color: "from-orange-500 to-red-500" },
    { emoji: "🔥", label: "Get me motivated", result: "Motivation Boost", channels: ["Your saved speakers", "Trending motivation", "Quick 5-min fire-ups"], color: "from-red-500 to-pink-500" },
    { emoji: "💻", label: "Help me code React", result: "Coding Tutorials", channels: ["React tutorials", "Live coding sessions", "Code-along projects"], color: "from-cyan-500 to-blue-500" },
    { emoji: "🎵", label: "Chill vibes while I work", result: "Background Flow", channels: ["Lo-fi + visuals", "Coffee shop ambience", "Gentle movement scenes"], color: "from-violet-500 to-purple-500" },
    { emoji: "😂", label: "Funny ski fails", result: "Comedy Clips", channels: ["Ski & snowboard fails", "Winter sports bloopers", "Viral snow moments"], color: "from-yellow-500 to-orange-500" },
    { emoji: "🎬", label: "Watch a movie", result: "Long-Form Content", channels: ["Indie films", "Blockbuster hits", "Binge-worthy series"], color: "from-rose-500 to-red-500" },
    { emoji: "🧘", label: "Wind down for bed", result: "Evening Routine", channels: ["Gentle yoga", "Guided meditation", "Sound machine"], color: "from-indigo-500 to-purple-500" },
  ];

  const handleMoodClick = (index: number) => {
    setSelectedMood(index);
    setAiState("thinking");
    setTimeout(() => setAiState("result"), 1500);
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Rotate demo screens
    const interval = setInterval(() => {
      setActiveDemo(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-cta" }),
      });
      
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Still show success to avoid frustration
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#6366f1]/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#a855f7]/15 rounded-full blur-[200px]" />
      </div>

      {/* Navigation */}
      <Header variant="transparent" />

      {/* HERO - Pain → AI Magic */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* The Pain */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
              You've been settling for less
            </div>
          </div>

          <div className={`mb-8 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-2xl sm:text-3xl text-[#6b6b70] font-medium mb-4">
              YouTube is chaos — Netflix is passive
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              <span className="text-white">Loop is </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Easy</span>
                <span className="absolute -top-1 -right-6 text-2xl animate-pulse">✨</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] blur-2xl opacity-30 -z-10" />
              </span>
            </h1>
          </div>

          {/* Interactive AI Demo */}
          <div className={`mt-12 mb-12 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* The AI Box */}
            <div className="max-w-2xl mx-auto">
              <div className="relative rounded-3xl bg-[#141416] border border-[#2a2a2e] overflow-hidden">
                {/* Content Area */}
                <div className="p-6">
                  {aiState === "idle" && (
                    <>
                      <div className="text-xl font-semibold text-white mb-2 text-left">What are you in the mood for?</div>
                      <p className="text-[#6b6b70] text-sm mb-4 text-left">Just say it — we'll pull from your curators or find new ones you'll love</p>
                      
                      {/* Text Input */}
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="I want to..."
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && aiPrompt.trim() && handleMoodClick(2)}
                          className="w-full px-5 py-4 bg-[#1c1c1f] border border-[#2a2a2e] rounded-2xl text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-all"
                        />
                        <button 
                          onClick={() => aiPrompt.trim() && handleMoodClick(2)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all"
                        >
                          Go ✨
                        </button>
                      </div>

                      {/* Quick Picks */}
                      <div className="text-xs text-[#6b6b70] mb-3 text-left">Or try a quick pick:</div>
                      <div className="flex flex-wrap gap-2">
                        {moods.map((mood, i) => (
                          <button
                            key={i}
                            onClick={() => handleMoodClick(i)}
                            className="group px-4 py-2 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] hover:border-[#6366f1] transition-all hover:scale-[1.02] flex items-center gap-2"
                          >
                            <span>{mood.emoji}</span>
                            <span className="text-sm text-white group-hover:text-[#a855f7] transition-colors">{mood.label}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Creator CTA */}
                      <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
                        <Link href="/upload" className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#f59e0b]/10 to-[#ef4444]/10 border border-[#f59e0b]/30 hover:border-[#f59e0b] transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
                              <span className="text-lg">🎬</span>
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-white group-hover:text-[#f59e0b] transition-colors">Build your own loop</div>
                              <div className="text-xs text-[#a1a1a6]">Upload, AI enhances, display anywhere — no other software needed</div>
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-[#f59e0b] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                      
                      {/* AI Branding - Bottom */}
                      <div className="mt-6 pt-4 border-t border-[#2a2a2e] flex items-center justify-center gap-2 text-sm text-[#6b6b70]">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                          <span className="text-xs">✨</span>
                        </div>
                        <span>Powered by <span className="text-[#a855f7]">LoopEasy AI</span></span>
                      </div>
                    </>
                  )}

                  {aiState === "thinking" && selectedMood !== null && (
                    <div className="py-8 text-center">
                      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#6366f1]/20 text-[#a855f7] font-medium mb-4">
                        <div className="w-5 h-5 border-2 border-[#a855f7] border-t-transparent rounded-full animate-spin" />
                        AI is building your stream...
                      </div>
                      <div className="text-[#6b6b70]">Curating channels for "{moods[selectedMood].label}"</div>
                    </div>
                  )}

                  {aiState === "result" && selectedMood !== null && (
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[#22c55e]">✓</span>
                        <span className="text-white font-semibold">Your stream is ready</span>
                      </div>
                      
                      {/* Result Preview */}
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${moods[selectedMood].color} mb-4`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">{moods[selectedMood].emoji}</div>
                          <div>
                            <div className="font-bold text-white text-lg">{moods[selectedMood].result}</div>
                            <div className="text-white/70 text-sm">Curated for you • Plays continuously</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span className="text-white/90 text-sm">Ready to play</span>
                        </div>
                      </div>

                      {/* Channel List with follow status */}
                      <div className="space-y-2 mb-4">
                        {moods[selectedMood].channels.map((channel, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#1c1c1f]">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${moods[selectedMood].color} flex items-center justify-center text-white font-bold`}>
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-white">{channel}</div>
                            </div>
                            {channel.includes("subscribed") ? (
                              <div className="text-xs text-[#22c55e] flex items-center gap-1">
                                <span>✓</span> Following
                              </div>
                            ) : channel.includes("New:") || channel.includes("Recommended") || channel.includes("Trending") ? (
                              <button className="text-xs px-2 py-1 rounded-full bg-[#6366f1]/20 text-[#a855f7] hover:bg-[#6366f1]/30 transition-all">
                                + Follow
                              </button>
                            ) : (
                              <div className="text-xs text-[#6b6b70]">24/7</div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Start Watching
                        </button>
                        <button 
                          onClick={() => { setAiState("idle"); setSelectedMood(null); }}
                          className="px-4 py-3 bg-[#1c1c1f] text-white rounded-xl hover:bg-[#2a2a2e] transition-all"
                        >
                          Try Another
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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

      {/* YOUR DAY, YOUR WAY */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Your entire day, <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">reimagined</span>
            </h2>
            <p className="text-xl text-[#a1a1a6] max-w-2xl mx-auto">
              From the moment you wake up to the moment you fall asleep — just tell us what you need.
            </p>
          </div>

          {/* Day Timeline */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { time: "Morning", emoji: "☀️", actions: ["Devotionals", "Morning news", "Quick workout"], color: "from-amber-500 to-orange-500" },
              { time: "Workday", emoji: "💼", actions: ["Focus music", "Coding tutorials", "Motivation boost"], color: "from-blue-500 to-cyan-500" },
              { time: "Evening", emoji: "🌆", actions: ["Funny videos", "Movies & shows", "Learn something new"], color: "from-purple-500 to-pink-500" },
              { time: "Night", emoji: "🌙", actions: ["Yoga & stretch", "Meditation", "Sleep sounds"], color: "from-indigo-500 to-violet-500" },
            ].map((period, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${period.color} flex items-center justify-center text-2xl mb-4`}>
                  {period.emoji}
                </div>
                <div className="text-lg font-bold text-white mb-3">{period.time}</div>
                <div className="space-y-2">
                  {period.actions.map((action, j) => (
                    <div key={j} className="text-sm text-[#a1a1a6] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key Differentiators */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-white">It Knows You</h3>
              <p className="text-[#a1a1a6] mb-4">
                Follow curators you love. Save your favorites. Next time you ask, it pulls from <em>your</em> people first.
              </p>
              <div className="pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#22c55e] font-medium">"Kettlebell workout"</div>
                <div className="text-white mt-1">→ Your subscribed fitness curators, instantly</div>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
              <div className="text-4xl mb-6">🔮</div>
              <h3 className="text-xl font-bold mb-3 text-white">Get Specific</h3>
              <p className="text-[#a1a1a6] mb-4">
                Not just "funny videos" — say "funny ski fails" and watch AI find exactly that and loop it forever.
              </p>
              <div className="pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#22c55e] font-medium">"Funny cat videos from Japan"</div>
                <div className="text-white mt-1">→ Curated, looped, endless entertainment</div>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
              <div className="text-4xl mb-6">🎬</div>
              <h3 className="text-xl font-bold mb-3 text-white">Short or Long</h3>
              <p className="text-[#a1a1a6] mb-4">
                Quick clips, background vibes, OR full movies and series. You decide the format, we deliver.
              </p>
              <div className="pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#22c55e] font-medium">"I want to watch a movie"</div>
                <div className="text-white mt-1">→ Indie films, blockbusters, binge-worthy series</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOLLOW YOUR CURATORS */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/5 via-transparent to-[#a855f7]/5" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Follow curators.
              <br />
              <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                Build your universe.
              </span>
            </h2>
            <p className="text-xl text-[#a1a1a6] max-w-2xl mx-auto">
              Discover creators you love. Follow them. Next time you ask for something, we pull from YOUR people first.
            </p>
          </div>

          {/* How it works */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - The Flow */}
            <div>
              <div className="text-sm text-[#6b6b70] uppercase tracking-wider mb-6">How it learns you</div>
              
              <div className="space-y-4">
                {[
                  { step: "1", emoji: "🎯", title: "Ask for anything", desc: "\"I want a kettlebell workout\" — be as specific as you want" },
                  { step: "2", emoji: "✨", title: "We find the best", desc: "AI surfaces top curators and content that matches your request" },
                  { step: "3", emoji: "❤️", title: "Follow what you love", desc: "Found a creator you vibe with? Hit follow. They're now YOUR curator." },
                  { step: "4", emoji: "🔁", title: "It remembers", desc: "Next time you ask, your followed curators come up first — instantly" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group p-5 rounded-2xl bg-[#141416] border border-[#2a2a2e] hover:border-[#6366f1] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg text-white flex items-center gap-2">
                          <span>{item.emoji}</span> {item.title}
                        </div>
                        <div className="text-[#a1a1a6] text-sm mt-1">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Example */}
            <div>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 border border-[#6366f1]/30">
                <div className="text-sm text-[#6366f1] uppercase tracking-wider mb-4">Your curators</div>
                <h3 className="text-2xl font-bold mb-2">
                  People you follow
                </h3>
                <p className="text-[#a1a1a6] mb-6 text-sm">
                  These creators appear first when you ask for related content
                </p>
                
                {/* Sample followed creators */}
                <div className="space-y-3">
                  {[
                    { name: "@KettlebellKing", category: "Fitness", avatar: "💪", content: "342 workouts" },
                    { name: "@DevWithMaria", category: "Coding", avatar: "👩‍💻", content: "89 tutorials" },
                    { name: "@ZenMaster_J", category: "Meditation", avatar: "🧘", content: "156 sessions" },
                    { name: "@ComedyCarl", category: "Entertainment", avatar: "😂", content: "500+ clips" },
                  ].map((creator, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#0a0a0b]/50 hover:bg-[#0a0a0b] transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-xl">
                        {creator.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{creator.name}</div>
                        <div className="text-xs text-[#6b6b70]">{creator.category} • {creator.content}</div>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e]">
                        Following
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full py-3 bg-[#1c1c1f] border border-[#2a2a2e] text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:border-[#6366f1] transition-all">
                  Discover More Curators
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
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
                        <div className="text-[#f59e0b] text-sm">Monetized Creator ✓</div>
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
              <div className="text-sm text-[#6b6b70]">At 1K followers</div>
              <div className="text-2xl font-bold text-[#f59e0b]">70%</div>
              <div className="text-xs text-[#6b6b70]">revenue share</div>
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
                quote: "Hit 1K followers in 2 weeks, started earning immediately. On YouTube that takes months.",
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
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
            
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#6366f1]/25">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                  </svg>
                </div>
                <span className="font-bold">Loop<span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Easy</span><span className="text-xs ml-0.5">✨</span></span>
              </Link>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[#6b6b70]">
                <Link href="/browse" className="hover:text-white transition-colors">Browse</Link>
                <Link href="/upload" className="hover:text-white transition-colors">Creators</Link>
                <Link href="/auth" className="hover:text-white transition-colors">Sign Up</Link>
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <Link href="/profile" className="hover:text-white transition-colors">Account</Link>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1c1c1f]">
              <div className="flex gap-6 text-sm text-[#6b6b70]">
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </div>
              <div className="text-sm text-[#6b6b70]">© 2026 LoopEasy. All rights reserved.</div>
            </div>
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
