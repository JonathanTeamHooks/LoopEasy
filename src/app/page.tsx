"use client";

import { useState, useEffect } from "react";

// LoopEasy Consumer - Free with Ads / Premium Subscription
// "Spotify for Video" - AI-curated channels, creator showcase

const theme = {
  accent: "#6366f1",
  accentHover: "#818cf8",
  gradient: "from-[#6366f1] via-[#8b5cf6] to-[#a855f7]",
  gold: "#f59e0b",
};

// Infinity Loop Logo
const LoopLogo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const dimensions = size === "small" ? "w-8 h-8" : size === "large" ? "w-16 h-16" : "w-10 h-10";
  const iconSize = size === "small" ? "w-4 h-4" : size === "large" ? "w-8 h-8" : "w-5 h-5";
  
  return (
    <div className={`${dimensions} rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center relative overflow-hidden`}>
      <svg className={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" className="text-white"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] noise overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#6366f1] rounded-full blur-[200px] opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[800px] h-[800px] bg-[#8b5cf6] rounded-full blur-[250px] opacity-8 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-[#f59e0b] rounded-full blur-[200px] opacity-5 animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LoopLogo />
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
              Loop<span className="text-[#6366f1]">Easy</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-[#a1a1a6]">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#creators" className="hover:text-white transition-colors">For Creators</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-[#a1a1a6] hover:text-white transition-colors">
              Sign In
            </button>
            <a href="#pricing" className="px-5 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              Get Started Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] text-sm text-[#a1a1a6] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Free to watch • Premium to create
              </span>
            </div>

            {/* Headline */}
            <h1 className={`font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Video Channels
              <br />
              <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Curated by AI
              </span>
              <br />
              <span className="text-[#a1a1a6] text-4xl sm:text-5xl">Made by Creators</span>
            </h1>

            {/* Subheadline */}
            <p className={`text-lg sm:text-xl text-[#a1a1a6] max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Discover endless video channels — fitness, music, motivation, relaxation, and more. 
              Watch free with ads, or go Premium for an ad-free experience.
              <span className="text-white block mt-2 font-medium">Creators: Build your audience. Showcase your skills.</span>
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold rounded-full transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-105 text-center">
                Start Watching — It&apos;s Free
              </a>
              <a href="#creators" className="w-full sm:w-auto px-8 py-4 bg-[#1c1c1f] hover:bg-[#252528] text-white font-medium rounded-full border border-[#2a2a2e] hover:border-[#3a3a3f] transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                Become a Creator
              </a>
            </div>

            {/* Quick stats */}
            <div className={`flex items-center justify-center gap-8 mt-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-xs text-[#6b6b70]">Channels</div>
              </div>
              <div className="w-px h-8 bg-[#2a2a2e]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500K+</div>
                <div className="text-xs text-[#6b6b70]">Videos</div>
              </div>
              <div className="w-px h-8 bg-[#2a2a2e]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Free</div>
                <div className="text-xs text-[#6b6b70]">With Ads</div>
              </div>
            </div>
          </div>

          {/* Hero Visual - App Preview */}
          <div className={`mt-20 relative transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/20 to-transparent rounded-3xl blur-3xl -z-10" />
              
              <div className="bg-[#141416] rounded-2xl border border-[#2a2a2e] overflow-hidden shadow-2xl">
                {/* App Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#1c1c1f] border-b border-[#2a2a2e]">
                  <div className="flex items-center gap-4">
                    <LoopLogo size="small" />
                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 rounded-full bg-[#6366f1] text-white text-sm font-medium">Discover</button>
                      <button className="px-4 py-1.5 rounded-full text-[#a1a1a6] text-sm hover:text-white transition-colors">Following</button>
                      <button className="px-4 py-1.5 rounded-full text-[#a1a1a6] text-sm hover:text-white transition-colors">For You</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-medium">Premium</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7]" />
                  </div>
                </div>
                
                {/* Channel Grid */}
                <div className="p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">Trending Channels</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Kettlebell HIIT", creator: "@fitnessmike", color: "from-orange-500 to-red-600", category: "Fitness" },
                      { name: "Lofi Study Beats", creator: "@chillhop", color: "from-purple-500 to-indigo-600", category: "Music" },
                      { name: "Morning Yoga Flow", creator: "@yogawithsara", color: "from-teal-500 to-emerald-600", category: "Wellness" },
                      { name: "Epic Movie Trailers", creator: "@cinephile", color: "from-gray-700 to-gray-900", category: "Entertainment" },
                    ].map((channel, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className={`aspect-video rounded-lg bg-gradient-to-br ${channel.color} mb-2 relative overflow-hidden`}>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                              <svg className="w-5 h-5 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/50 text-xs text-white">{channel.category}</div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                              <div className="h-full bg-white rounded-full" style={{ width: `${30 + i * 20}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="font-medium text-sm truncate">{channel.name}</div>
                        <div className="text-xs text-[#6b6b70]">{channel.creator}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Categories */}
                  <div className="mt-8">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">Browse by Mood</h2>
                    <div className="flex flex-wrap gap-2">
                      {["🔥 Energize", "😌 Relax", "🧠 Focus", "💪 Workout", "🎵 Vibes", "📚 Learn", "😂 Laugh", "🌙 Sleep"].map((mood, i) => (
                        <button key={i} className="px-4 py-2 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] text-sm hover:border-[#6366f1] hover:text-white transition-all">
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 border-t border-[#1c1c1f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
              How LoopEasy Works
            </h2>
            <p className="text-lg text-[#a1a1a6] max-w-2xl mx-auto">
              Discover, watch, and create — all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discover Channels",
                description: "Browse thousands of curated video channels. Fitness, music, education, entertainment — AI finds what you'll love.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                )
              },
              {
                step: "02",
                title: "Watch Free or Premium",
                description: "Enjoy with ads for free, or upgrade to Premium for an uninterrupted, ad-free experience. $9.99/month.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                )
              },
              {
                step: "03",
                title: "Create & Earn",
                description: "Build your own channels. Curate content, grow your audience, and earn from views. Your taste is your talent.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-[#141416] border border-[#2a2a2e] group hover:border-[#6366f1]/50 transition-all">
                <div className="absolute -top-4 left-8 px-3 py-1 bg-[#6366f1] rounded-full text-xs font-bold">{item.step}</div>
                <div className="w-16 h-16 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] mb-6 group-hover:bg-[#6366f1] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[#a1a1a6] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Creators */}
      <section id="creators" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                For Creators
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
                Your Curation Skills
                <br />
                <span className={`bg-gradient-to-r from-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent`}>Are Worth Money</span>
              </h2>
              <p className="text-lg text-[#a1a1a6] mb-8 leading-relaxed">
                You don&apos;t need to make videos to be a creator. If you have great taste — 
                if you know what videos go together, what hits the right vibe — you can 
                build an audience and earn from it.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Build channels from content across the web",
                  "AI helps you find and organize content",
                  "Grow followers who love your curation style",
                  "Earn revenue share from your channel views"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#a1a1a6]">{benefit}</span>
                  </div>
                ))}
              </div>

              <a href="#pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all">
                Start Creating
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Creator Stats Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 rounded-3xl blur-3xl" />
              <div className="relative bg-[#141416] border border-[#2a2a2e] rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center text-2xl font-bold">JM</div>
                  <div>
                    <div className="font-bold text-lg">@JessicaMFit</div>
                    <div className="text-sm text-[#a1a1a6]">Fitness Creator • Joined 3 months ago</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-xl bg-[#1c1c1f]">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-[#6b6b70]">Channels</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[#1c1c1f]">
                    <div className="text-2xl font-bold text-white">48K</div>
                    <div className="text-xs text-[#6b6b70]">Followers</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[#1c1c1f]">
                    <div className="text-2xl font-bold text-[#22c55e]">$2.4K</div>
                    <div className="text-xs text-[#6b6b70]">Earned</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e]">
                  <div className="text-sm text-[#a1a1a6] mb-2">Top Channel</div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600" />
                    <div className="flex-1">
                      <div className="font-medium">Kettlebell Full Body</div>
                      <div className="text-xs text-[#6b6b70]">23K views this month</div>
                    </div>
                    <div className="text-[#22c55e] text-sm font-medium">+127%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 border-t border-[#1c1c1f]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
              Watch Free. Create More.
            </h2>
            <p className="text-lg text-[#a1a1a6] mb-8">
              Everyone can watch. Creators get more tools.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 p-1 rounded-full bg-[#1c1c1f] border border-[#2a2a2e]">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === "monthly" ? "bg-[#6366f1] text-white" : "text-[#a1a1a6]"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === "yearly" ? "bg-[#6366f1] text-white" : "text-[#a1a1a6]"}`}
              >
                Yearly <span className="text-[#22c55e]">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-[#141416] border border-[#2a2a2e]">
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">Free</h3>
                <p className="text-sm text-[#a1a1a6]">Watch unlimited with ads</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-[#a1a1a6]">/forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited channel access",
                  "Personalized recommendations",
                  "Follow creators",
                  "Ad-supported viewing"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#a1a1a6]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full border border-[#2a2a2e] hover:border-[#6366f1] text-white font-medium transition-all">
                Start Watching
              </button>
            </div>

            {/* Premium */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#6366f1]/20 to-[#141416] border-2 border-[#6366f1] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#6366f1] rounded-full text-xs font-semibold">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">Premium</h3>
                <p className="text-sm text-[#a1a1a6]">Ad-free experience</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">${billingCycle === "monthly" ? "9.99" : "7.99"}</span>
                <span className="text-[#a1a1a6]">/month</span>
                {billingCycle === "yearly" && <span className="block text-xs text-[#6b6b70]">Billed annually (${7.99 * 12})</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Free",
                  "No ads, ever",
                  "Offline downloads",
                  "Higher quality streaming",
                  "Early access to new features"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#a1a1a6]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                Go Premium
              </button>
            </div>

            {/* Creator */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#f59e0b]/10 to-[#141416] border border-[#f59e0b]/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-full text-xs font-semibold">
                CREATOR
              </div>
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">Creator Pro</h3>
                <p className="text-sm text-[#a1a1a6]">Build, grow, and earn</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">${billingCycle === "monthly" ? "19.99" : "15.99"}</span>
                <span className="text-[#a1a1a6]">/month</span>
                {billingCycle === "yearly" && <span className="block text-xs text-[#6b6b70]">Billed annually (${15.99 * 12})</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Premium",
                  "Unlimited channel creation",
                  "AI curation assistant",
                  "Advanced analytics",
                  "Revenue sharing (70%)",
                  "Priority support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#a1a1a6]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                Become a Creator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-20 rounded-3xl blur-3xl`} />
            <div className="relative bg-[#141416] border border-[#2a2a2e] rounded-3xl p-12 md:p-16">
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
                Start Your Journey
              </h2>
              <p className="text-lg text-[#a1a1a6] mb-8 max-w-lg mx-auto">
                Watch for free. Create to earn. Your taste is your superpower.
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-4 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1]"
                  />
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold rounded-full transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
                  >
                    Get Early Access
                  </button>
                </form>
              ) : (
                <div className="text-[#22c55e] font-medium">
                  ✅ You&apos;re in! We&apos;ll notify you when we launch.
                </div>
              )}
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
              Loop<span className="text-[#6366f1]">Easy</span>
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-[#6b6b70]">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Creators</a>
            <a href="mailto:hello@loopeasy.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-[#6b6b70]">
            © 2026 LoopEasy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
