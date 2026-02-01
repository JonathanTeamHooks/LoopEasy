"use client";

import Link from "next/link";

const howItWorks = [
  { step: "1", emoji: "🎯", title: "Ask for anything", desc: "\"I want a kettlebell workout\" — be as specific as you want" },
  { step: "2", emoji: "✨", title: "We find the best", desc: "AI surfaces top curators and content that matches your request" },
  { step: "3", emoji: "❤️", title: "Follow what you love", desc: "Found a creator you vibe with? Hit follow. They're now YOUR curator." },
  { step: "4", emoji: "🔁", title: "It remembers", desc: "Next time you ask, your followed curators come up first — instantly" },
];

const sampleCreators = [
  { name: "@KettlebellKing", category: "Fitness", avatar: "💪", content: "342 workouts" },
  { name: "@DevWithMaria", category: "Coding", avatar: "👩‍💻", content: "89 tutorials" },
  { name: "@ZenMaster_J", category: "Meditation", avatar: "🧘", content: "156 sessions" },
  { name: "@ComedyCarl", category: "Entertainment", avatar: "😂", content: "500+ clips" },
];

export default function CuratorsSection() {
  return (
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
              {howItWorks.map((item, i) => (
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
                {sampleCreators.map((creator, i) => (
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

              <Link href="/browse" className="mt-6 w-full py-3 bg-[#1c1c1f] border border-[#2a2a2e] text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:border-[#6366f1] transition-all">
                Discover More Curators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
