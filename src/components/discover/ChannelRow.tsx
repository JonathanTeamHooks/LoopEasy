"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface ChannelRowProps {
  title: string;
  subtitle?: string;
  badge?: {
    icon: string;
    text: string;
    gradient: string;
  };
  children: React.ReactNode;
  viewAllHref?: string;
}

export default function ChannelRow({ title, subtitle, badge, children, viewAllHref }: ChannelRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const updateFades = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftFade(scrollLeft > 20);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateFades);
      updateFades();
      return () => el.removeEventListener('scroll', updateFades);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-10 group/row">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          {badge && (
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.gradient} text-white text-xs font-semibold shadow-lg`}>
              <span className="text-sm">{badge.icon}</span>
              {badge.text}
            </span>
          )}
          <div>
            <h2 className="text-xl font-bold text-white hover:underline cursor-pointer decoration-2 underline-offset-4">
              {viewAllHref ? <Link href={viewAllHref}>{title}</Link> : title}
            </h2>
            {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200">
          {viewAllHref && (
            <Link href={viewAllHref} className="text-sm text-gray-400 hover:text-white transition-colors mr-2 font-medium">
              Show all
            </Link>
          )}
          <button 
            onClick={() => scroll('left')}
            className={`w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 ${!showLeftFade ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
            disabled={!showLeftFade}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 ${!showRightFade ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
            disabled={!showRightFade}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Scrollable Row with edge fades */}
      <div className="relative">
        {/* Left fade */}
        <div className={`absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Right fade */}
        <div className={`absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'}`} />
        
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 scroll-smooth"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
