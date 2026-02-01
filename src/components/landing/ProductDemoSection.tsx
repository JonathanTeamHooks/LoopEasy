"use client";

import { useState, useEffect } from "react";

export default function ProductDemoSection() {
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
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
              {/* Watch state */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${activeDemo === 0 ? 'opacity-100' : 'opacity-0'}`}>
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

              {/* Create state */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${activeDemo === 1 ? 'opacity-100' : 'opacity-0'}`}>
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

              {/* Earn state */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${activeDemo === 2 ? 'opacity-100' : 'opacity-0'}`}>
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
  );
}
