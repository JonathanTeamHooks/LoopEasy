"use client";

import Link from "next/link";
import type { AIChannel } from "@/lib/ai-channels";

interface AIChannelCardProps {
  channel: AIChannel;
  size?: 'normal' | 'large' | 'compact';
  userName?: string;
}

export default function AIChannelCard({ channel, size = 'normal', userName }: AIChannelCardProps) {
  const isLarge = size === 'large';
  const isCompact = size === 'compact';
  
  return (
    <Link 
      href={`/discover/${channel.id}`}
      className={`group cursor-pointer block flex-shrink-0 ${
        isLarge ? 'w-full' : isCompact ? 'w-40' : 'w-48'
      }`}
    >
      {/* Outer glow container */}
      <div className={`
        relative rounded-lg
        transition-all duration-300 ease-out
        group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)]
      `}>
        <div className={`
          relative overflow-hidden rounded-lg
          bg-gradient-to-br ${channel.gradient}
          ${isLarge ? 'aspect-[21/9]' : isCompact ? 'aspect-square' : 'aspect-video'}
          group-hover:scale-[1.03]
          transition-transform duration-300 ease-out
        `}>
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          {/* Background texture */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.2),transparent_50%)]" />
          </div>
          
          {/* Made for You badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z"/>
            </svg>
            <span className="text-xs font-medium text-white">
              {userName ? `Made for ${userName}` : 'AI Mix'}
            </span>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className={`
              ${isLarge ? 'text-5xl' : isCompact ? 'text-3xl' : 'text-4xl'} 
              mb-1 
              transform group-hover:scale-110 group-hover:-rotate-3 
              transition-transform duration-300 origin-bottom-left
            `}>
              {channel.emoji}
            </div>
            <h3 className={`font-bold text-white ${isLarge ? 'text-2xl' : 'text-base'} leading-tight drop-shadow-lg`}>
              {channel.name}
            </h3>
            {!isCompact && (
              <p className={`text-white/80 ${isLarge ? 'text-sm' : 'text-xs'} mt-0.5 line-clamp-1 drop-shadow`}>
                {channel.description}
              </p>
            )}
          </div>
          
          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`
              ${isLarge ? 'w-16 h-16' : 'w-12 h-12'}
              rounded-full bg-white flex items-center justify-center
              shadow-[0_4px_20px_rgba(0,0,0,0.3)]
              transform scale-0 group-hover:scale-100 
              transition-all duration-300 ease-out
              hover:bg-gray-100
            `}>
              <svg 
                className={`${isLarge ? 'w-7 h-7' : 'w-5 h-5'} text-gray-900 ml-0.5`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
