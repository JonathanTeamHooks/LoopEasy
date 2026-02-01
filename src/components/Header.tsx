"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface HeaderProps {
  variant?: "default" | "minimal" | "transparent";
  showSearch?: boolean;
}

export default function Header({ variant = "default", showSearch = false }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User";
  };

  const getUserAvatar = () => {
    if (!user) return null;
    return user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
  };

  const bgClass = variant === "transparent" 
    ? "bg-transparent" 
    : "bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-[#1c1c1f]";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#6366f1]/25">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Loop<span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Easy</span></span>
          </Link>
          
          {/* Main Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/browse" className="px-4 py-2 text-sm text-[#a1a1a6] hover:text-white hover:bg-white/5 rounded-lg transition-all">
              Browse
            </Link>
          </nav>
        </div>

        {/* Search (optional) */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search channels..."
                className="w-full px-4 py-2 pl-10 bg-[#1c1c1f] border border-[#2a2a2e] rounded-xl text-white placeholder-[#6b6b70] focus:outline-none focus:border-[#6366f1]"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-[#1c1c1f] animate-pulse" />
          ) : user ? (
            /* Logged in state */
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                {getUserAvatar() ? (
                  <img 
                    src={getUserAvatar()!} 
                    alt={getUserDisplayName()}
                    className="w-9 h-9 rounded-full border-2 border-[#6366f1]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-medium">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block text-sm text-white font-medium">{getUserDisplayName()}</span>
                <svg className="w-4 h-4 text-[#6b6b70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1c1c1f] border border-[#2a2a2e] shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#2a2a2e]">
                      <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                      <p className="text-xs text-[#6b6b70]">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link 
                        href="/browse" 
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[#a1a1a6] hover:bg-[#2a2a2e] hover:text-white transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Browse Channels
                      </Link>
                      <Link 
                        href="/dashboard" 
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[#a1a1a6] hover:bg-[#2a2a2e] hover:text-white transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        Creator Dashboard
                      </Link>
                      <Link 
                        href="/upload" 
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[#a1a1a6] hover:bg-[#2a2a2e] hover:text-white transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Upload Video
                      </Link>
                      <Link 
                        href="/profile" 
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[#a1a1a6] hover:bg-[#2a2a2e] hover:text-white transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile & Settings
                      </Link>
                    </div>
                    <div className="border-t border-[#2a2a2e] py-2">
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-[#2a2a2e] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Logged out state */
            <>
              <Link href="/auth" className="text-sm text-[#a1a1a6] hover:text-white transition-colors">
                Sign In
              </Link>
              <Link 
                href="/auth" 
                className="px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
