"use client";

import { useState, useEffect, useRef } from "react";

// LoopEasy Consumer - Premium Polish Version
// "Spotify for Video" with AI curation and creator economy

// Animated gradient background
const GradientOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <div 
    className={`absolute rounded-full blur-[120px] animate-pulse ${className}`}
    style={{ animationDelay: `${delay}s`, animationDuration: '8s' }}
  />
);

// Infinity Loop Logo with animation
const LoopLogo = ({ size = "default", animate = false }: { size?: "small" | "default" | "large"; animate?: boolean }) => {
  const dimensions = size === "small" ? "w-8 h-8" : size === "large" ? "w-20 h-20" : "w-10 h-10";
  const iconSize = size === "small" ? "w-4 h-4" : size === "large" ? "w-10 h-10" : "w-5 h-5";
  
  return (
    <div className={`${dimensions} rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center relative overflow-hidden group`}>
      <svg 
        className={`${iconSize} text-white ${animate ? 'animate-spin-slow' : ''}`} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
    </div>
  );
};

// Animated counter
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Floating channel card
const FloatingChannelCard = ({ channel, index }: { channel: { name: string; creator: string; color: string; category: string; viewers: string }; index: number }) => (
  <div 
    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className={`aspect-video rounded-xl bg-gradient-to-br ${channel.color} relative overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow`}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Live indicator */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-medium text-white">LIVE</span>
      </div>
      
      {/* Category badge */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white">
        {channel.category}
      </div>
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-[#6366f1] ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full"
          style={{ width: `${30 + index * 15}%` }}
        />
      </div>
      
      {/* Channel info overlay */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="font-semibold text-white text-shadow">{channel.name}</div>
        <div className="flex items-center justify-between text-xs text-white/80">
          <span>{channel.creator}</span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            {channel.viewers}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Mood pill button
const MoodPill = ({ mood, isActive, onClick }: { mood: string; isActive: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg shadow-[#6366f1]/30' 
        : 'bg-[#1c1c1f] border border-[#2a2a2e] text-[#a1a1a6] hover:border-[#6366f1]/50 hover:text-white'
    }`}
  >
    {mood}
  </button>
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [activeMood, setActiveMood] = useState("🔥 Energize");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const channels = [
    { name: "Kettlebell HIIT", creator: "@fitnessmike", color: "from-orange-500 to-red-600", category: "Fitness", viewers: "2.4K" },
    { name: "Lofi Study Beats", creator: "@chillhop", color: "from-purple-500 to-indigo-600", category: "Music", viewers: "8.1K" },
    { name: "Morning Yoga Flow", creator: "@yogawithsara", color: "from-teal-500 to-emerald-600", category: "Wellness", viewers: "1.2K" },
    { name: "Epic Movie Trailers", creator: "@cinephile", color: "from-gray-700 to-gray-900", category: "Entertainment", viewers: "5.7K" },
  ];

  const moods = ["🔥 Energize", "😌 Relax", "🧠 Focus", "💪 Workout", "🎵 Vibes", "📚 Learn", "😂 Laugh", "🌙 Sleep"];

  return (
    <div className="min-h-screen bg-[#0a0a0b] overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <GradientOrb className="w-[800px] h-[800px] -top-[400px] -left-[200px] bg-[#6366f1] opacity-20" delay={0} />
        <GradientOrb className="w-[600px] h-[600px] top-[50%] -right-[200px] bg-[#a855f7] opacity-15" delay={2} />
        <GradientOrb className="w-[500px] h-[500px] -bottom-[200px] left-[30%] bg-[#f59e0b] opacity-10" delay={4} />
      </div>

      {/* Noise texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />

      {/* Navigation with blur effect on scroll */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5' : ''
      } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LoopLogo animate />
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
              Loop<span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">Easy</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-[#a1a1a6]">
            <a href="#how-it-works" className="hover:text-white transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#creators" className="hover:text-white transition-colors relative group">
              For Creators
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#pricing" className="hover:text-white transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-[#a1a1a6] hover:text-white transition-colors hidden sm:block">
              Sign In
            </button>
            <a href="#pricing" className="group relative px-5 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#818cf8] to-[#c084fc] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated badge */}
            <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1c1c1f] to-[#252528] border border-[#2a2a2e] text-sm text-[#a1a1a6] mb-8 shadow-lg">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" style={{ animationDelay: '0.4s' }} />
                </span>
                <AnimatedCounter end={12847} suffix="+" /> people watching now
              </span>
            </div>

            {/* Headline with gradient animation */}
            <h1 className={`font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="block">Video Channels</span>
              <span className="block bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Curated by AI
              </span>
              <span className="block text-[#6b6b70] text-3xl sm:text-4xl md:text-5xl mt-4">Built by Creators Like You</span>
            </h1>

            {/* Subheadline */}
            <p className={`text-lg sm:text-xl text-[#a1a1a6] max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Discover endless video channels — fitness, music, motivation, relaxation. 
              <span className="text-white"> Watch free with ads</span> or go 
              <span className="text-[#f59e0b]"> Premium</span> for ad-free. 
              <span className="block mt-2 text-white font-medium">Creators earn 70% of ad revenue.</span>
            </p>

            {/* CTA Buttons with hover effects */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#pricing" className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-105">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Start Watching — Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#818cf8] to-[#c084fc] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#creators" className="group w-full sm:w-auto px-8 py-4 bg-[#1c1c1f] hover:bg-[#252528] text-white font-medium rounded-full border border-[#2a2a2e] hover:border-[#f59e0b]/50 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-[#f59e0b] group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                Become a Creator
              </a>
            </div>

            {/* Animated stats */}
            <div className={`flex items-center justify-center gap-8 sm:gap-12 mt-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                { value: 10000, suffix: "+", label: "Channels" },
                { value: 500000, suffix: "+", label: "Videos" },
                { value: 50000, suffix: "+", label: "Creators" },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#6366f1] transition-colors">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-[#6b6b70]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Channel Grid */}
          <div className={`mt-20 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Mood selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {moods.map((mood) => (
                <MoodPill 
                  key={mood} 
                  mood={mood} 
                  isActive={activeMood === mood}
                  onClick={() => setActiveMood(mood)}
                />
              ))}
            </div>

            {/* Channel cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {channels.map((channel, i) => (
                <FloatingChannelCard key={i} channel={channel} index={i} />
              ))}
            </div>

            {/* "Explore more" link */}
            <div className="text-center mt-8">
              <a href="#" className="inline-flex items-center gap-2 text-[#a1a1a6] hover:text-white transition-colors group">
                Explore <AnimatedCounter end={10000} suffix="+" /> channels
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* How It Works - with animations */}
      <section id="how-it-works" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366f1]/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <span className="text-[#6366f1] text-sm font-semibold tracking-wider uppercase mb-4 block">Simple as 1-2-3</span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              How LoopEasy Works
            </h2>
            <p className="text-lg text-[#a1a1a6] max-w-2xl mx-auto">
              Discover, watch, create — all in one beautifully simple experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#6366f1]/20 via-[#6366f1] to-[#6366f1]/20 -translate-y-1/2" />
            
            {[
              {
                step: "01",
                title: "Discover Channels",
                description: "AI learns your taste and surfaces channels you'll love. Fitness, music, motivation — infinite variety, zero effort.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                color: "from-[#6366f1] to-[#8b5cf6]"
              },
              {
                step: "02",
                title: "Watch Your Way",
                description: "Free with tasteful ads, or upgrade to Premium for uninterrupted bliss. Your choice, your experience.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                ),
                color: "from-[#8b5cf6] to-[#a855f7]"
              },
              {
                step: "03",
                title: "Create & Earn",
                description: "Curate your own channels. Build an audience. Earn 70% of ad revenue. Your taste is literally your talent.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "from-[#a855f7] to-[#ec4899]"
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] group-hover:border-[#6366f1]/30 transition-all duration-500 h-full">
                  {/* Step number */}
                  <div className={`absolute -top-4 left-8 px-4 py-1.5 bg-gradient-to-r ${item.color} rounded-full text-sm font-bold text-white shadow-lg`}>
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-[#a1a1a6] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Section - Premium design */}
      <section id="creators" className="py-32 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 rounded-full blur-[200px]" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 text-[#f59e0b] text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                Creator Program
              </span>
              
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Taste
                <br />
                <span className="bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-[#ef4444] bg-clip-text text-transparent">
                  = Your Income
                </span>
              </h2>
              
              <p className="text-xl text-[#a1a1a6] mb-8 leading-relaxed">
                You don&apos;t need expensive equipment or video skills. 
                If you know what content slaps — you can build channels, 
                grow followers, and <span className="text-white font-medium">earn real money</span>.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  { icon: "🎯", text: "Curate content from across the web" },
                  { icon: "🤖", text: "AI assistant helps you find gems" },
                  { icon: "📈", text: "Grow your audience with analytics" },
                  { icon: "💰", text: "Earn 70% of your channel's ad revenue" }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <span className="text-[#a1a1a6] group-hover:text-white transition-colors">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <a href="#pricing" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-semibold rounded-full hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all hover:scale-105">
                <span>Start Creating Today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Creator Dashboard Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b]/30 to-[#ef4444]/30 rounded-3xl blur-3xl" />
              
              <div className="relative bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] rounded-3xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center text-lg font-bold">JM</div>
                    <div>
                      <div className="font-bold">@JessicaMFit</div>
                      <div className="text-xs text-[#6b6b70] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                        Creator Pro
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#22c55e]">$2,847</div>
                    <div className="text-xs text-[#6b6b70]">This month</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Channels", value: "12", change: "+2" },
                    { label: "Followers", value: "48.2K", change: "+3.2K" },
                    { label: "Views", value: "1.2M", change: "+180K" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#1c1c1f] rounded-xl p-3 text-center">
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs text-[#6b6b70]">{stat.label}</div>
                      <div className="text-xs text-[#22c55e]">{stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* Revenue chart preview */}
                <div className="bg-[#1c1c1f] rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Revenue (30 days)</span>
                    <span className="text-xs text-[#22c55e]">+127% vs last month</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {[30, 45, 35, 60, 50, 70, 65, 80, 75, 95, 85, 100].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-[#f59e0b] to-[#ef4444] rounded-t opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Top channel */}
                <div className="bg-[#1c1c1f] rounded-xl p-4">
                  <div className="text-xs text-[#6b6b70] mb-2">🔥 Top Performing Channel</div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Kettlebell Full Body</div>
                      <div className="text-xs text-[#6b6b70]">42 videos • 23K views/day</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#22c55e]">$847</div>
                      <div className="text-xs text-[#6b6b70]">earned</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Premium design */}
      <section id="pricing" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366f1]/5 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="text-[#6366f1] text-sm font-semibold tracking-wider uppercase mb-4 block">Pricing</span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Start Free. Upgrade Anytime.
            </h2>
            <p className="text-lg text-[#a1a1a6] mb-8">
              Everyone can watch. Creators get superpowers.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#1c1c1f] border border-[#2a2a2e]">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === "monthly" ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg" : "text-[#a1a1a6] hover:text-white"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === "yearly" ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg" : "text-[#a1a1a6] hover:text-white"}`}
              >
                Yearly
                <span className="px-2 py-0.5 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-xs">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/30 transition-all duration-500">
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Free</h3>
                <p className="text-sm text-[#a1a1a6]">Perfect for casual viewers</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-[#6b6b70]">/forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited channel access",
                  "AI-powered recommendations",
                  "Follow your favorite creators",
                  "Ad-supported viewing"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-[#6366f1] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#a1a1a6]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full border border-[#2a2a2e] hover:border-[#6366f1] text-white font-medium transition-all group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                Start Watching
              </button>
            </div>

            {/* Premium - Highlighted */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#1c1c1f] to-[#0a0a0b] border border-[#6366f1]/50">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full text-xs font-bold text-white shadow-lg">
                  MOST POPULAR
                </div>
                <div className="mb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Premium</h3>
                  <p className="text-sm text-[#a1a1a6]">Ad-free experience</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-bold">${billingCycle === "monthly" ? "9.99" : "7.99"}</span>
                  <span className="text-[#6b6b70]">/month</span>
                  {billingCycle === "yearly" && <div className="text-xs text-[#22c55e] mt-1">Billed annually • Save $24</div>}
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Everything in Free",
                    "Zero ads, ever",
                    "Offline downloads",
                    "4K streaming quality",
                    "Early access to features"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-[#6366f1] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#a1a1a6]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-[1.02]">
                  Go Premium
                </button>
              </div>
            </div>

            {/* Creator Pro */}
            <div className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#f59e0b]/30 hover:border-[#f59e0b]/50 transition-all duration-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-full text-xs font-bold text-white shadow-lg">
                CREATOR
              </div>
              <div className="mb-6 pt-2">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Creator Pro</h3>
                <p className="text-sm text-[#a1a1a6]">Build, grow, and earn</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold">${billingCycle === "monthly" ? "19.99" : "15.99"}</span>
                <span className="text-[#6b6b70]">/month</span>
                {billingCycle === "yearly" && <div className="text-xs text-[#22c55e] mt-1">Billed annually • Save $48</div>}
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Premium",
                  "Unlimited channel creation",
                  "AI curation assistant",
                  "Advanced analytics dashboard",
                  "70% revenue share",
                  "Priority support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-[#f59e0b] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#a1a1a6]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-semibold transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-[1.02]">
                Become a Creator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/30 via-[#a855f7]/30 to-[#ec4899]/30 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] rounded-3xl p-12 md:p-20 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#6366f1]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#a855f7]/20 rounded-full blur-3xl" />
              
              <div className="relative">
                <LoopLogo size="large" animate />
                
                <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold mt-8 mb-6">
                  Ready to Loop In?
                </h2>
                <p className="text-xl text-[#a1a1a6] mb-10 max-w-lg mx-auto">
                  Join thousands discovering and creating amazing video experiences.
                </p>
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-6 py-4 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all"
                    />
                    <button 
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-full transition-all hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-105"
                    >
                      Get Early Access
                    </button>
                  </form>
                ) : (
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#22c55e]/20 text-[#22c55e] rounded-full font-medium">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    You&apos;re in! We&apos;ll notify you when we launch.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1c1c1f] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <LoopLogo />
                <span className="font-[family-name:var(--font-display)] text-xl font-bold">
                  Loop<span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">Easy</span>
                </span>
              </div>
              <p className="text-sm text-[#6b6b70] max-w-xs">
                Video channels curated by AI, created by you. Watch, discover, and earn.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <div className="font-semibold mb-4">Product</div>
                <div className="space-y-2 text-sm text-[#6b6b70]">
                  <a href="#" className="block hover:text-white transition-colors">Features</a>
                  <a href="#" className="block hover:text-white transition-colors">Pricing</a>
                  <a href="#" className="block hover:text-white transition-colors">Creators</a>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-4">Company</div>
                <div className="space-y-2 text-sm text-[#6b6b70]">
                  <a href="#" className="block hover:text-white transition-colors">About</a>
                  <a href="#" className="block hover:text-white transition-colors">Blog</a>
                  <a href="#" className="block hover:text-white transition-colors">Careers</a>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-4">Legal</div>
                <div className="space-y-2 text-sm text-[#6b6b70]">
                  <a href="#" className="block hover:text-white transition-colors">Terms</a>
                  <a href="#" className="block hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="block hover:text-white transition-colors">Cookies</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1c1c1f]">
            <div className="text-sm text-[#6b6b70]">
              © 2026 LoopEasy. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              {['twitter', 'instagram', 'youtube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-[#1c1c1f] flex items-center justify-center text-[#6b6b70] hover:text-white hover:bg-[#252528] transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'twitter' && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>}
                    {social === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>}
                    {social === 'youtube' && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Custom styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .text-shadow {
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
