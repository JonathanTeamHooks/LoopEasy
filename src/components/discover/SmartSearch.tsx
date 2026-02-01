"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AI_CHANNELS, findMatchingAIChannels, type AIChannel } from "@/lib/ai-channels";

interface SmartSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SmartSearch({ onSearch, placeholder = "What do you want to watch?" }: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [matchingChannels, setMatchingChannels] = useState<AIChannel[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const matches = findMatchingAIChannels(query);
      setMatchingChannels(matches.slice(0, 4));
    } else {
      setMatchingChannels([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const showDropdown = isFocused && query.length > 1 && matchingChannels.length > 0;

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="
              w-full px-10 py-2.5 text-sm
              bg-[#242424] hover:bg-[#2a2a2a]
              border-none rounded-full
              text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-white/20
              transition-colors
            "
          />
          
          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                onSearch?.("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>
      
      {/* Dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-[#282828] rounded-lg shadow-2xl z-50 overflow-hidden border border-white/10"
        >
          <div className="p-2">
            <div className="px-3 py-1.5 text-xs text-gray-400 font-medium">
              AI Channels
            </div>
            {matchingChannels.map((channel) => (
              <Link
                key={channel.id}
                href={`/discover/${channel.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setIsFocused(false)}
              >
                <div className={`w-10 h-10 rounded bg-gradient-to-br ${channel.gradient} flex items-center justify-center text-lg flex-shrink-0`}>
                  {channel.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {channel.name}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    AI Channel
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Search all */}
          <div className="border-t border-white/10 p-2">
            <button
              onClick={() => {
                onSearch?.(query);
                setIsFocused(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-300">
                Search for "{query}"
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
