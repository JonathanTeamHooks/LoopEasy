"use client";

import Link from "next/link";
import type { Channel } from "@/types/database";

interface CreatorChannelCardProps {
  channel: Channel;
  size?: 'normal' | 'compact';
}

export default function CreatorChannelCard({ channel, size = 'normal' }: CreatorChannelCardProps) {
  const isCompact = size === 'compact';
  
  // Generate a subtle gradient if no thumbnail
  const fallbackGradients = [
    "from-slate-700 to-slate-800",
    "from-zinc-700 to-zinc-800",
    "from-neutral-700 to-neutral-800",
    "from-stone-700 to-stone-800",
  ];
  const fallbackGradient = fallbackGradients[Math.abs(channel.name.charCodeAt(0)) % fallbackGradients.length];

  return (
    <Link 
      href={`/channel/${channel.id}`}
      className={`group cursor-pointer block flex-shrink-0 ${isCompact ? 'w-40' : 'w-48'}`}
    >
      {/* Thumbnail with glow effect */}
      <div className="relative transition-all duration-300 ease-out group-hover:shadow-[0_8px_25px_rgba(99,102,241,0.2)]">
        <div className={`
          ${isCompact ? 'aspect-square' : 'aspect-video'} 
          rounded-lg overflow-hidden relative
          bg-gradient-to-br ${fallbackGradient}
          group-hover:scale-[1.02] transition-transform duration-300 ease-out
        `}>
          {channel.thumbnail_url ? (
            <img 
              src={channel.thumbnail_url} 
              alt={channel.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-50">📺</span>
            </div>
          )}
          
          {/* Hover overlay with play button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] transform scale-0 group-hover:scale-100 transition-all duration-300 ease-out hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Category badge */}
          {channel.category && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-xs text-white font-medium">
              {channel.category}
            </div>
          )}
        </div>
      </div>
      
      {/* Info */}
      <div className="mt-2 px-0.5">
        <h3 className="font-medium text-white text-sm truncate group-hover:text-[#6366f1] transition-colors duration-200">
          {channel.name}
        </h3>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {channel.description || channel.category || 'Channel'}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
          <span>{(channel.follower_count || 0).toLocaleString()}</span>
          <span className="text-gray-600">followers</span>
        </p>
      </div>
    </Link>
  );
}
