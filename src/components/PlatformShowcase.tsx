"use client";

import { useState, useEffect } from "react";

type Platform = {
  id: string;
  name: string;
  icon: string;
  description: string;
  available: boolean;
  comingSoon?: boolean;
};

export default function PlatformShowcase() {
  const [activePlatform, setActivePlatform] = useState("web");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const element = document.getElementById("platform-showcase");
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  const platforms: Platform[] = [
    { id: "ios", name: "iPhone & iPad", icon: "📱", description: "Native iOS app with offline downloads and AirPlay support", available: true },
    { id: "android", name: "Android", icon: "🤖", description: "Full-featured Android app for phones and tablets", available: true },
    { id: "web", name: "Web Browser", icon: "🌐", description: "Watch anywhere with our responsive web app", available: true },
    { id: "appletv", name: "Apple TV", icon: "📺", description: "Big screen experience with Siri integration", available: true },
    { id: "firetv", name: "Fire TV", icon: "🔥", description: "Alexa-enabled viewing on Fire TV and Fire Stick", available: true },
    { id: "chromecast", name: "Chromecast", icon: "📡", description: "Cast from any device to your TV", available: true },
    { id: "roku", name: "Roku", icon: "🟣", description: "Available on all Roku devices", available: true },
    { id: "googletv", name: "Google TV", icon: "▶️", description: "Integrated with Google TV home screen", available: true },
    { id: "samsung", name: "Samsung TV", icon: "📺", description: "Native app for Samsung Smart TVs", available: true, comingSoon: true },
    { id: "lg", name: "LG TV", icon: "📺", description: "Built for LG webOS", available: true, comingSoon: true },
  ];

  // Auto-rotate platforms
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActivePlatform(prev => {
        const currentIndex = platforms.findIndex(p => p.id === prev);
        return platforms[(currentIndex + 1) % platforms.length].id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section id="platform-showcase" className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/5 via-transparent to-[#a855f7]/5" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-[#a855f7] text-sm font-semibold mb-6">
            <span>📱</span>
            Available Everywhere
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Watch on Any Device,
            <br />
            <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Anywhere You Are
            </span>
          </h2>
          <p className="text-lg text-[#a1a1a6] max-w-2xl mx-auto">
            Start watching on your phone, continue on your TV, or create on your laptop. 
            Your channels, your watchlist, your progress — synced across every device.
          </p>
        </div>

        {/* Device Mockup Display */}
        <div className="relative h-[400px] mb-16">
          {/* Center TV/Monitor */}
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            ["appletv", "firetv", "roku", "googletv", "samsung", "lg", "web"].includes(activePlatform)
              ? "opacity-100 scale-100"
              : "opacity-30 scale-90"
          }`}>
            <div className="w-[500px] h-[300px] bg-[#141416] rounded-2xl border border-[#2a2a2e] shadow-2xl overflow-hidden relative">
              {/* Screen content */}
              <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-[#1c1c1f] to-[#0a0a0b] overflow-hidden">
                {/* LoopEasy interface mockup */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">LoopEasy</span>
                  </div>
                  {/* Channel grid preview */}
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`aspect-video rounded-lg ${
                        ["from-orange-500 to-red-600", "from-purple-500 to-indigo-600", "from-teal-500 to-emerald-600", "from-pink-500 to-rose-600",
                         "from-blue-500 to-cyan-600", "from-amber-500 to-orange-600", "from-green-500 to-lime-600", "from-violet-500 to-purple-600"][i]
                      } bg-gradient-to-br opacity-80`} />
                    ))}
                  </div>
                </div>
              </div>
              {/* TV stand indicator */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-24 h-6 bg-[#2a2a2e] rounded-b-lg" />
            </div>
          </div>

          {/* Phone - Left */}
          <div className={`absolute left-[10%] top-1/2 -translate-y-1/2 transition-all duration-500 ${
            ["ios", "android"].includes(activePlatform)
              ? "opacity-100 scale-100"
              : "opacity-50 scale-75"
          }`}>
            <div className="w-[180px] h-[360px] bg-[#141416] rounded-[30px] border-4 border-[#2a2a2e] shadow-2xl overflow-hidden relative">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0a0a0b] rounded-full" />
              {/* Screen */}
              <div className="absolute inset-2 top-10 rounded-[20px] bg-gradient-to-br from-[#1c1c1f] to-[#0a0a0b] p-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#a855f7] mb-2" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 rounded-lg bg-gradient-to-r from-[#2a2a2e] to-[#1c1c1f]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tablet - Right */}
          <div className={`absolute right-[10%] top-1/2 -translate-y-1/2 transition-all duration-500 ${
            activePlatform === "ios" 
              ? "opacity-100 scale-100"
              : "opacity-40 scale-75"
          }`}>
            <div className="w-[280px] h-[200px] bg-[#141416] rounded-2xl border-4 border-[#2a2a2e] shadow-2xl overflow-hidden relative">
              <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-[#1c1c1f] to-[#0a0a0b] p-3">
                <div className="flex gap-2 h-full">
                  <div className="w-1/3 space-y-2">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#a855f7]" />
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-3 rounded bg-[#2a2a2e]" />
                    ))}
                  </div>
                  <div className="flex-1 rounded-lg bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Chromecast indicator */}
          <div className={`absolute right-[5%] bottom-[10%] transition-all duration-500 ${
            activePlatform === "chromecast"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50"
          }`}>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#141416] border border-[#2a2a2e] rounded-full">
              <span className="text-lg">📡</span>
              <span className="text-sm">Casting to Living Room TV</span>
            </div>
          </div>
        </div>

        {/* Platform Icons Grid */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={`group relative p-4 rounded-2xl border transition-all ${
                activePlatform === platform.id
                  ? "bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border-[#6366f1] scale-105"
                  : "bg-[#141416] border-[#2a2a2e] hover:border-[#6366f1]/50"
              }`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{platform.icon}</div>
              <div className="text-xs font-medium truncate">{platform.name}</div>
              {platform.comingSoon && (
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] text-[8px] font-bold rounded-full">
                  SOON
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Platform Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#141416] border border-[#2a2a2e] rounded-full">
            <span className="text-2xl">{platforms.find(p => p.id === activePlatform)?.icon}</span>
            <span className="font-medium">{platforms.find(p => p.id === activePlatform)?.name}</span>
            <span className="text-[#6b6b70]">—</span>
            <span className="text-[#a1a1a6]">{platforms.find(p => p.id === activePlatform)?.description}</span>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="relative group">
            <button className="flex items-center gap-3 px-6 py-3 bg-black border border-[#2a2a2e] rounded-xl opacity-75 cursor-not-allowed">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-[#6b6b70]">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#6366f1] text-white text-[10px] font-bold rounded-full">SOON</span>
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-3 px-6 py-3 bg-black border border-[#2a2a2e] rounded-xl opacity-75 cursor-not-allowed">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-[#6b6b70]">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#6366f1] text-white text-[10px] font-bold rounded-full">SOON</span>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-3 px-6 py-3 bg-[#FF9900]/50 text-black/70 rounded-xl cursor-not-allowed">
              <span className="text-2xl">🔥</span>
              <div className="text-left">
                <div className="text-[10px] opacity-80">Available on</div>
                <div className="text-sm font-semibold">Amazon Fire TV</div>
              </div>
            </button>
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#6366f1] text-white text-[10px] font-bold rounded-full">SOON</span>
          </div>
        </div>
      </div>
    </section>
  );
}
