"use client";

import { useState } from "react";
import type { SoulShieldProfile } from "@/lib/soulshield";
import { PROTECTION_PRESETS, getProtectionStatus } from "@/lib/soulshield";

interface ShieldBadgeProps {
  profile?: SoulShieldProfile;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  onClick?: () => void;
}

export default function ShieldBadge({ 
  profile, 
  size = 'md', 
  showStatus = false,
  onClick 
}: ShieldBadgeProps) {
  const isActive = profile?.isActive ?? false;
  const preset = profile ? PROTECTION_PRESETS[profile.protectionLevel] : null;
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 
        ${onClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
        transition-opacity
      `}
    >
      {/* Shield Icon */}
      <div className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center
        ${isActive 
          ? `bg-gradient-to-br ${preset?.color || 'from-emerald-400 to-green-500'}` 
          : 'bg-gray-600'
        }
        transition-all
      `}>
        {isActive ? (
          <svg className={`${iconSizes[size]} text-white`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        ) : (
          <svg className={`${iconSizes[size]} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )}
      </div>
      
      {/* Status Text */}
      {showStatus && (
        <div className="text-left">
          <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {isActive ? 'SoulShield' : 'Unprotected'}
          </div>
          {isActive && profile && (
            <div className={`text-gray-400 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
              {getProtectionStatus(profile)}
            </div>
          )}
        </div>
      )}
    </button>
  );
}
