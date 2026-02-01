"use client";

const dayPeriods = [
  { time: "Morning", emoji: "☀️", actions: ["Devotionals", "Morning news", "Quick workout"], color: "from-amber-500 to-orange-500" },
  { time: "Workday", emoji: "💼", actions: ["Focus music", "Coding tutorials", "Motivation boost"], color: "from-blue-500 to-cyan-500" },
  { time: "Evening", emoji: "🌆", actions: ["Funny videos", "Movies & shows", "Learn something new"], color: "from-purple-500 to-pink-500" },
  { time: "Night", emoji: "🌙", actions: ["Yoga & stretch", "Meditation", "Sleep sounds"], color: "from-indigo-500 to-violet-500" },
];

const features = [
  {
    icon: "🎯",
    title: "It Knows You",
    description: "Follow curators you love. Save your favorites. Next time you ask, it pulls from your people first.",
    example: { prompt: "\"Kettlebell workout\"", result: "→ Your subscribed fitness curators, instantly" },
  },
  {
    icon: "🔮",
    title: "Get Specific",
    description: "Not just \"funny videos\" — say \"funny ski fails\" and watch AI find exactly that and loop it forever.",
    example: { prompt: "\"Funny cat videos from Japan\"", result: "→ Curated, looped, endless entertainment" },
  },
  {
    icon: "🎬",
    title: "Short or Long",
    description: "Quick clips, background vibes, OR full movies and series. You decide the format, we deliver.",
    example: { prompt: "\"I want to watch a movie\"", result: "→ Indie films, blockbusters, binge-worthy series" },
  },
];

export default function DayTimelineSection() {
  return (
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
          {dayPeriods.map((period, i) => (
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
          {features.map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-gradient-to-b from-[#141416] to-[#0a0a0b] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all">
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-[#a1a1a6] mb-4">{feature.description}</p>
              <div className="pt-4 border-t border-[#2a2a2e]">
                <div className="text-sm text-[#22c55e] font-medium">{feature.example.prompt}</div>
                <div className="text-white mt-1">{feature.example.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
