"use client";

import { useState, useEffect } from "react";

// Premium Indigo Theme - Chosen for SaaS conversion
const theme = {
  accent: "#6366f1",
  accentHover: "#818cf8",
  gradient: "from-[#6366f1] via-[#8b5cf6] to-[#a855f7]",
};

// Memorable Loop Logo
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

// Feature icons
const icons = {
  workout: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h4v12H4zM16 6h4v12h-4zM8 10h8M8 14h8M2 12h2M20 12h2" />
    </svg>
  ),
  schedule: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  trophy: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14M5 3v4a7 7 0 0014 0V3M5 3H3v4a4 4 0 004 4M19 3h2v4a4 4 0 01-4 4M12 14v4M8 21h8M12 18h.01" />
    </svg>
  ),
  brand: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  tv: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  zap: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] noise overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#6366f1] rounded-full blur-[200px] opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[800px] h-[800px] bg-[#8b5cf6] rounded-full blur-[250px] opacity-8 animate-pulse-slow" style={{ animationDelay: '2s' }} />
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
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#pricing" className="px-5 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              Start Free Trial
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
                Built for Fitness Studios
              </span>
            </div>

            {/* Headline */}
            <h1 className={`font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Stop Showing CNN
              <br />
              <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                On Your Gym TVs
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-lg sm:text-xl text-[#a1a1a6] max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              AI-powered TV content for fitness studios. Curated workout clips, auto-updating class schedules, member shoutouts — all branded to your studio.
              <span className="text-white block mt-2 font-medium">$49/month. Works on any smart TV.</span>
            </p>

            {/* CTA */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold rounded-full transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-105 text-center">
                Start 14-Day Free Trial
              </a>
              <a href="#demo" className="w-full sm:w-auto px-8 py-4 bg-[#1c1c1f] hover:bg-[#252528] text-white font-medium rounded-full border border-[#2a2a2e] hover:border-[#3a3a3f] transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Demo
              </a>
            </div>

            {/* Social proof */}
            <p className={`text-sm text-[#6b6b70] mt-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>

          {/* Hero Image - Gym TV Mockup */}
          <div className={`mt-20 relative transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/20 to-transparent rounded-3xl blur-3xl -z-10" />
              
              {/* TV Mockup */}
              <div className="bg-[#141416] rounded-2xl border border-[#2a2a2e] overflow-hidden shadow-2xl">
                {/* TV Bezel */}
                <div className="bg-gradient-to-b from-[#2a2a2e] to-[#1c1c1f] p-2">
                  <div className="bg-[#0a0a0b] rounded-lg overflow-hidden">
                    {/* Screen Content */}
                    <div className="relative aspect-video">
                      {/* Background Video Placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e5f] via-[#2d1e5f] to-[#1c1c1f]">
                        {/* Workout clip placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#6366f1]/20 flex items-center justify-center">
                              <svg className="w-8 h-8 text-[#6366f1]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                            <p className="text-[#6b6b70] text-sm">Workout content playing</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Overlay UI */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* Top bar */}
                        <div className="flex items-start justify-between">
                          {/* Logo */}
                          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white">
                              CF
                            </div>
                            <div>
                              <div className="font-semibold text-white">CrossFit Downtown</div>
                              <div className="text-xs text-[#a1a1a6]">Est. 2019</div>
                            </div>
                          </div>
                          
                          {/* Time */}
                          <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-right">
                            <div className="text-2xl font-bold text-white">9:45 AM</div>
                            <div className="text-xs text-[#a1a1a6]">Thursday, Jan 30</div>
                          </div>
                        </div>
                        
                        {/* Bottom bar */}
                        <div className="flex gap-4">
                          {/* Next class */}
                          <div className="flex-1 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                            <div className="text-xs text-[#a1a1a6] mb-1">NEXT CLASS</div>
                            <div className="font-semibold text-white">HIIT Strength</div>
                            <div className="text-sm text-[#6366f1]">Starts in 15 min</div>
                          </div>
                          
                          {/* Member PR */}
                          <div className="flex-1 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                            <div className="text-xs text-[#a1a1a6] mb-1">🎉 NEW PR</div>
                            <div className="font-semibold text-white">Sarah M.</div>
                            <div className="text-sm text-[#22c55e]">Deadlift: 225 lbs</div>
                          </div>
                          
                          {/* Trainer */}
                          <div className="flex-1 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                            <div className="text-xs text-[#a1a1a6] mb-1">TODAY&apos;S COACH</div>
                            <div className="font-semibold text-white">Mike Johnson</div>
                            <div className="text-sm text-[#a1a1a6]">CF-L2 Trainer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* TV Stand indicator */}
                <div className="h-8 bg-[#1c1c1f] flex items-center justify-center">
                  <div className="w-24 h-1 bg-[#2a2a2e] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Problem Section */}
      <section className="py-20 px-6 border-t border-[#1c1c1f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-6">
            Your gym TVs are wasting potential
          </h2>
          <p className="text-lg text-[#a1a1a6] mb-12">
            Right now, most studios show cable news, random YouTube, or nothing at all. 
            That&apos;s prime real estate going unused — screens your members look at every day.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-[#141416] border border-[#2a2a2e]">
              <div className="text-3xl mb-3">📺</div>
              <h3 className="font-semibold mb-2 text-white">Off-Brand Content</h3>
              <p className="text-sm text-[#a1a1a6]">CNN and ESPN don&apos;t represent your studio&apos;s energy and values.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#141416] border border-[#2a2a2e]">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-semibold mb-2 text-white">No Time to Manage</h3>
              <p className="text-sm text-[#a1a1a6]">You&apos;re running a gym, not a TV station. Who has time to update content?</p>
            </div>
            <div className="p-6 rounded-xl bg-[#141416] border border-[#2a2a2e]">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="font-semibold mb-2 text-white">Expensive Alternatives</h3>
              <p className="text-sm text-[#a1a1a6]">Enterprise digital signage costs $200-500/month. Way too much.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
              Everything your gym TV needs
            </h2>
            <p className="text-lg text-[#a1a1a6] max-w-2xl mx-auto">
              LoopEasy runs itself. Set it up once, and your screens stay fresh, branded, and engaging — automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: icons.workout,
                title: "Curated Workout Content",
                description: "AI-curated clips from top fitness creators. Kettlebells, HIIT, yoga, mobility — matching your studio's vibe."
              },
              {
                icon: icons.schedule,
                title: "Auto-Updating Schedules",
                description: "Connects to Mindbody, WellnessLiving, and more. Your class schedule updates automatically."
              },
              {
                icon: icons.trophy,
                title: "Member PR Boards",
                description: "Celebrate member wins. \"Sarah hit a 225lb deadlift!\" builds community and motivation."
              },
              {
                icon: icons.brand,
                title: "Your Branding",
                description: "Upload your logo, pick your colors. Every screen looks professionally designed."
              },
              {
                icon: icons.tv,
                title: "Works on Any TV",
                description: "Smart TV, Fire Stick, Chromecast, Apple TV — if it has a screen, LoopEasy runs on it."
              },
              {
                icon: icons.zap,
                title: "5-Minute Setup",
                description: "No IT degree required. Sign up, connect your TV, choose your content. Done."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-[#141416] border border-[#2a2a2e] hover:border-[#6366f1]/50 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] mb-6 group-hover:bg-[#6366f1] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#a1a1a6] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 border-t border-[#1c1c1f]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
              What studio owners are saying
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#141416] border border-[#2a2a2e]">
              <p className="text-[#a1a1a6] mb-4 italic">
                &quot;Our members actually stop and watch the TVs now. The workout clips get people pumped, and the PR board has become a thing — people celebrate each other&apos;s wins.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">MK</div>
                <div>
                  <div className="font-semibold text-white">Mike K.</div>
                  <div className="text-sm text-[#6b6b70]">CrossFit Box Owner, Austin TX</div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-[#141416] border border-[#2a2a2e]">
              <p className="text-[#a1a1a6] mb-4 italic">
                &quot;I was paying $300/month for a digital signage solution that I had to manually update. LoopEasy is $49 and it runs itself. No brainer.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">JL</div>
                <div>
                  <div className="font-semibold text-white">Jennifer L.</div>
                  <div className="text-sm text-[#6b6b70]">Yoga Studio Owner, Denver CO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-[#a1a1a6]">
              Start free. Upgrade when you&apos;re ready. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="p-8 rounded-2xl bg-[#141416] border border-[#2a2a2e]">
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">Starter</h3>
                <p className="text-sm text-[#a1a1a6]">Perfect for single-location studios</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-[#a1a1a6]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">1 screen</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">Curated workout content</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">Basic branding (logo)</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">Email support</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border border-[#2a2a2e] hover:border-[#6366f1] text-white font-medium transition-all">
                Start Free Trial
              </button>
            </div>

            {/* Pro - Highlighted */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#6366f1]/20 to-[#141416] border-2 border-[#6366f1] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#6366f1] rounded-full text-xs font-semibold">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">Pro</h3>
                <p className="text-sm text-[#a1a1a6]">For growing studios</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-[#a1a1a6]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]"><strong className="text-white">3 screens</strong></span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">Everything in Starter</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]"><strong className="text-white">Custom branding</strong></span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]"><strong className="text-white">Class schedules</strong> (Mindbody, etc.)</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]"><strong className="text-white">Member shoutouts</strong></span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">Priority support</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                Start Free Trial
              </button>
            </div>

            {/* Studio */}
            <div className="p-8 rounded-2xl bg-[#141416] border border-[#2a2a2e]">
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">Studio</h3>
                <p className="text-sm text-[#a1a1a6]">For multi-location or large studios</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-[#a1a1a6]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]"><strong className="text-white">Unlimited screens</strong></span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]"><strong className="text-white">AI content curation</strong></span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]"><strong className="text-white">Analytics dashboard</strong></span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#a1a1a6]">Dedicated account manager</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border border-[#2a2a2e] hover:border-[#6366f1] text-white font-medium transition-all">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Annual discount note */}
          <p className="text-center text-sm text-[#6b6b70] mt-8">
            💡 Save 2 months with annual billing
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 border-t border-[#1c1c1f]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-12 text-center">
            Frequently asked questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: "What devices does LoopEasy work on?",
                a: "Any smart TV, Amazon Fire Stick, Chromecast, Apple TV, Roku, or any device with a web browser. If it can display a webpage, it can run LoopEasy."
              },
              {
                q: "How long does setup take?",
                a: "About 5 minutes. Sign up, upload your logo, choose your content categories, and paste the URL into your TV browser. That's it."
              },
              {
                q: "Where does the workout content come from?",
                a: "We curate clips from top fitness creators on Instagram, TikTok, and YouTube. All content is properly embedded and licensed. You can also upload your own videos."
              },
              {
                q: "Does it integrate with my booking software?",
                a: "Yes! We integrate with Mindbody, WellnessLiving, TeamUp, Pike13, and more. Your class schedule updates automatically."
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No contracts, no commitments. Cancel with one click from your dashboard."
              },
              {
                q: "What if I need help setting up?",
                a: "We offer free onboarding calls for all new customers. Our support team will walk you through everything and make sure your screens look perfect."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#141416] border border-[#2a2a2e]">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-[#a1a1a6] text-sm">{faq.a}</p>
              </div>
            ))}
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
                Ready to upgrade your gym TVs?
              </h2>
              <p className="text-lg text-[#a1a1a6] mb-8 max-w-lg mx-auto">
                Join hundreds of studios already using LoopEasy. Start your free trial — no credit card required.
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
                    Get Started
                  </button>
                </form>
              ) : (
                <div className="text-[#22c55e] font-medium">
                  ✅ You&apos;re on the list! We&apos;ll be in touch soon.
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
