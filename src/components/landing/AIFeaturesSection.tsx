"use client";

import Link from "next/link";

const aiFeatures = [
  { icon: "✨", title: "Auto Enhance", desc: "One click improves color, lighting, and clarity" },
  { icon: "🎬", title: "Style Transfer", desc: "Cinematic, vintage, neon — pick your vibe" },
  { icon: "💬", title: "Auto Captions", desc: "AI generates accurate subtitles instantly" },
  { icon: "🖼️", title: "AI Thumbnails", desc: "Eye-catching thumbnails that get clicks" },
  { icon: "🎵", title: "Audio Cleanup", desc: "Remove noise, enhance voice, match music" },
  { icon: "✂️", title: "Smart Cut", desc: "AI removes silence and dead space" },
  { icon: "📐", title: "Stabilize", desc: "Smooth out shaky handheld footage" },
  { icon: "🔍", title: "4K Upscale", desc: "Enhance resolution up to 4K quality" },
];

export default function AIFeaturesSection() {
  return (
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
          {aiFeatures.map((feature, i) => (
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
  );
}
