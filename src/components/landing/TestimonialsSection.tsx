"use client";

const testimonials = [
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
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/5 via-transparent to-[#a855f7]/5" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Creators are already winning
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#141416] border border-[#2a2a2e]">
              <div className="text-lg text-[#e5e5e5] mb-6 italic">&quot;{testimonial.quote}&quot;</div>
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
  );
}
