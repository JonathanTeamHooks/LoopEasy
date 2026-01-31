"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [step, setStep] = useState<"auth" | "onboarding" | "plan">("auth");
  const [userType, setUserType] = useState<"viewer" | "creator" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      setStep("onboarding");
    } else {
      // Sign in - go to browse
      window.location.href = "/browse";
    }
  };

  const handleOnboardingNext = () => {
    if (userType === "creator") {
      setStep("plan");
    } else {
      window.location.href = "/browse";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7]" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">LoopEasy</span>
          </Link>
          
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Video Channels<br />
            Curated by AI,<br />
            Built by You
          </h1>
          
          <p className="text-xl text-white/80 max-w-md">
            Discover endless video experiences. Create channels with AI-powered tools. 
            Earn money doing what you love.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { value: "10K+", label: "Channels" },
              { value: "500K+", label: "Videos" },
              { value: "$2M+", label: "Creator Earnings" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Auth Step */}
          {step === "auth" && (
            <>
              {/* Mobile Logo */}
              <Link href="/" className="lg:hidden flex items-center justify-center gap-3 mb-8 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold">LoopEasy</span>
              </Link>

              <h2 className="text-3xl font-bold mb-2">
                {mode === "signup" ? "Create your account" : "Welcome back"}
              </h2>
              <p className="text-[#6b6b70] mb-8">
                {mode === "signup" 
                  ? "Start watching and creating in minutes" 
                  : "Sign in to continue to LoopEasy"
                }
              </p>

              {/* Social Auth */}
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1c1c1f] border border-[#2a2a2e] rounded-xl hover:border-[#6366f1]/50 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-white">Continue with Google</span>
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1c1c1f] border border-[#2a2a2e] rounded-xl hover:border-[#6366f1]/50 transition-all">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-white">Continue with Apple</span>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#2a2a2e]" />
                <span className="text-sm text-[#6b6b70]">or</span>
                <div className="flex-1 h-px bg-[#2a2a2e]" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="text-sm text-[#a1a1a6] mb-1.5 block">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-colors"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="text-sm text-[#a1a1a6] mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-[#a1a1a6] mb-1.5 block">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
                    className="w-full px-4 py-3 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1] transition-colors"
                    required
                  />
                </div>

                {mode === "signin" && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-[#6366f1] hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all"
                >
                  {mode === "signup" ? "Create Account" : "Sign In"}
                </button>
              </form>

              <p className="text-center text-sm text-[#6b6b70] mt-6">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button 
                      onClick={() => setMode("signin")}
                      className="text-[#6366f1] hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <button 
                      onClick={() => setMode("signup")}
                      className="text-[#6366f1] hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </p>

              {mode === "signup" && (
                <p className="text-center text-xs text-[#6b6b70] mt-4">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-[#a1a1a6] hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#a1a1a6] hover:underline">Privacy Policy</a>
                </p>
              )}
            </>
          )}

          {/* Onboarding Step */}
          {step === "onboarding" && (
            <>
              <h2 className="text-3xl font-bold mb-2">How will you use LoopEasy?</h2>
              <p className="text-[#6b6b70] mb-8">
                This helps us personalize your experience
              </p>

              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setUserType("viewer")}
                  className={`w-full p-6 rounded-2xl border text-left transition-all ${
                    userType === "viewer"
                      ? "bg-[#6366f1]/10 border-[#6366f1]"
                      : "bg-[#141416] border-[#2a2a2e] hover:border-[#6366f1]/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center text-2xl">
                      📺
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">I want to watch</div>
                      <div className="text-sm text-[#a1a1a6]">
                        Discover channels, follow creators, enjoy endless video content
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUserType("creator")}
                  className={`w-full p-6 rounded-2xl border text-left transition-all ${
                    userType === "creator"
                      ? "bg-[#f59e0b]/10 border-[#f59e0b]"
                      : "bg-[#141416] border-[#2a2a2e] hover:border-[#f59e0b]/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/20 flex items-center justify-center text-2xl">
                      🎬
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">I want to create</div>
                      <div className="text-sm text-[#a1a1a6]">
                        Build channels, use AI tools, grow an audience, and earn money
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleOnboardingNext}
                disabled={!userType}
                className={`w-full py-3.5 font-semibold rounded-xl transition-all ${
                  userType
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:shadow-lg"
                    : "bg-[#2a2a2e] text-[#6b6b70] cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </>
          )}

          {/* Plan Selection Step */}
          {step === "plan" && (
            <>
              <h2 className="text-3xl font-bold mb-2">Choose your plan</h2>
              <p className="text-[#6b6b70] mb-8">
                Start free or unlock all creator tools
              </p>

              <div className="space-y-4 mb-8">
                {/* Free Plan */}
                <button
                  className="w-full p-6 rounded-2xl bg-[#141416] border border-[#2a2a2e] hover:border-[#6366f1]/50 text-left transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-lg mb-1">Free</div>
                      <div className="text-sm text-[#a1a1a6] mb-3">
                        Basic creator tools, 3 channels max
                      </div>
                      <ul className="space-y-1.5">
                        {["Up to 3 channels", "Basic AI tools", "Standard analytics", "Community support"].map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-[#a1a1a6]">
                            <svg className="w-4 h-4 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">$0</div>
                      <div className="text-xs text-[#6b6b70]">forever</div>
                    </div>
                  </div>
                </button>

                {/* Creator Pro Plan */}
                <button
                  className="w-full p-6 rounded-2xl bg-gradient-to-br from-[#f59e0b]/10 to-[#ef4444]/10 border border-[#f59e0b]/50 hover:border-[#f59e0b] text-left transition-all relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 px-2 py-1 bg-[#f59e0b] text-black text-xs font-bold rounded">
                    RECOMMENDED
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-lg mb-1 flex items-center gap-2">
                        Creator Pro
                        <span className="text-[#f59e0b]">✨</span>
                      </div>
                      <div className="text-sm text-[#a1a1a6] mb-3">
                        Full AI suite, unlimited channels, 70% revenue
                      </div>
                      <ul className="space-y-1.5">
                        {["Unlimited channels", "All AI tools (Pro)", "Advanced analytics", "70% revenue share", "Priority support"].map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-[#a1a1a6]">
                            <svg className="w-4 h-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">$19.99</div>
                      <div className="text-xs text-[#6b6b70]">/month</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="block w-full py-3.5 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white text-center font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Start with Creator Pro
                </Link>
                <Link
                  href="/dashboard"
                  className="block w-full py-3.5 bg-[#1c1c1f] border border-[#2a2a2e] text-white text-center font-medium rounded-xl hover:border-[#6366f1]/50 transition-all"
                >
                  Continue with Free
                </Link>
              </div>

              <p className="text-center text-xs text-[#6b6b70] mt-4">
                Cancel anytime • 7-day free trial for Pro
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
