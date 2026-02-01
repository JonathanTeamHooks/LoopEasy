"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1c1f] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#6366f1]/25">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
                </svg>
              </div>
              <span className="font-bold">Loop<span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">Easy</span><span className="text-xs ml-0.5">✨</span></span>
            </Link>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#6b6b70]">
              <Link href="/browse" className="hover:text-white transition-colors">Browse</Link>
              <Link href="/upload" className="hover:text-white transition-colors">Creators</Link>
              <Link href="/auth" className="hover:text-white transition-colors">Sign Up</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/profile" className="hover:text-white transition-colors">Account</Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1c1c1f]">
            <div className="flex gap-6 text-sm text-[#6b6b70]">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
            <div className="text-sm text-[#6b6b70]">© 2026 LoopEasy. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
