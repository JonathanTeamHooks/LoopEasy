"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AI_CHANNELS, type AIChannel } from "@/lib/ai-channels";

// Playback end options
type EndBehavior = 'loop' | 'flow' | 'surprise' | 'stop';

// Mock videos for demonstration
const MOCK_VIDEOS = [
  { id: '1', title: 'Perfect Morning Routine', duration: '12:34', views: '45K', playing: false },
  { id: '2', title: 'Start Your Day Right', duration: '8:21', views: '23K', playing: false },
  { id: '3', title: 'Motivation for Success', duration: '15:00', views: '89K', playing: false },
  { id: '4', title: 'Energy Boost Workout', duration: '20:15', views: '34K', playing: false },
  { id: '5', title: 'Positive Mindset Training', duration: '10:45', views: '67K', playing: false },
  { id: '6', title: 'Wake Up Inspired', duration: '7:30', views: '12K', playing: false },
  { id: '7', title: 'Daily Affirmations', duration: '5:45', views: '28K', playing: false },
  { id: '8', title: 'Mindful Movement', duration: '18:20', views: '41K', playing: false },
];

export default function AIChannelPage() {
  const params = useParams();
  const channelId = params.channelId as string;
  const [channel, setChannel] = useState<AIChannel | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [endBehavior, setEndBehavior] = useState<EndBehavior>('loop');
  const [showEndSettings, setShowEndSettings] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = AI_CHANNELS.find(c => c.id === channelId);
    setChannel(found || null);
  }, [channelId]);

  // Get related channels for "flow to next"
  const relatedChannels = AI_CHANNELS.filter(c => c.id !== channelId).slice(0, 3);

  if (!channel) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Channel not found</h1>
          <Link href="/discover" className="text-[#6366f1] hover:underline">
            Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  const nextVideo = () => {
    if (currentVideoIndex < MOCK_VIDEOS.length - 1) {
      setCurrentVideoIndex(i => i + 1);
    } else {
      // End of channel - apply end behavior
      handleEndOfChannel();
    }
  };

  const handleEndOfChannel = () => {
    switch (endBehavior) {
      case 'loop':
        setCurrentVideoIndex(0);
        break;
      case 'flow':
        // Navigate to first related channel
        if (relatedChannels[0]) {
          window.location.href = `/discover/${relatedChannels[0].id}`;
        }
        break;
      case 'surprise':
        const randomChannel = AI_CHANNELS[Math.floor(Math.random() * AI_CHANNELS.length)];
        window.location.href = `/discover/${randomChannel.id}`;
        break;
      case 'stop':
        setIsPlaying(false);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Compact Nav */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <Link href="/discover" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="font-bold text-sm">LoopEasy</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className={`relative bg-gradient-to-b ${channel.gradient.replace('to-', 'via-').replace('from-', 'from-')} from-opacity-60 to-[#121212] pt-8 pb-16 px-6`}>
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-end gap-6">
            {/* Channel Icon */}
            <div className={`w-48 h-48 rounded-lg bg-gradient-to-br ${channel.gradient} shadow-2xl flex items-center justify-center flex-shrink-0`}>
              <span className="text-7xl">{channel.emoji}</span>
            </div>
            
            {/* Channel Info */}
            <div className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#6366f1] text-white">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z"/>
                  </svg>
                  AI Channel
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">{channel.name}</h1>
              <p className="text-gray-300 mb-4">{channel.description}</p>
              <p className="text-sm text-gray-400">
                Made for you • {MOCK_VIDEOS.length} videos • Continuous playback
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button 
              onClick={() => setIsPlaying(true)}
              className="w-14 h-14 rounded-full bg-[#6366f1] hover:bg-[#5558e3] hover:scale-105 flex items-center justify-center transition-all shadow-lg"
            >
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                isSaved ? 'border-[#6366f1] text-[#6366f1]' : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
              }`}
            >
              {isSaved ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
              {isSaved ? 'Saved' : 'Save'}
            </button>
            
            {/* End Behavior Settings */}
            <div className="relative">
              <button 
                onClick={() => setShowEndSettings(!showEndSettings)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {endBehavior === 'loop' && 'Loop channel'}
                {endBehavior === 'flow' && 'Flow to next'}
                {endBehavior === 'surprise' && 'Surprise me'}
                {endBehavior === 'stop' && 'Stop at end'}
              </button>
              
              {showEndSettings && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowEndSettings(false)} />
                  <div className="absolute left-0 mt-2 w-56 rounded-lg bg-[#282828] border border-white/10 shadow-xl z-50 overflow-hidden py-1">
                    <div className="px-3 py-2 text-xs text-gray-400 font-medium">When channel ends:</div>
                    {[
                      { id: 'loop', icon: '🔁', label: 'Loop channel', desc: 'Start over from the beginning' },
                      { id: 'flow', icon: '➡️', label: 'Flow to next', desc: 'Continue to related channel' },
                      { id: 'surprise', icon: '🎲', label: 'Surprise me', desc: 'Random channel, same vibe' },
                      { id: 'stop', icon: '⏹️', label: 'Stop', desc: 'End playback' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setEndBehavior(option.id as EndBehavior);
                          setShowEndSettings(false);
                        }}
                        className={`w-full flex items-start gap-3 px-3 py-2 hover:bg-white/10 transition-colors text-left ${
                          endBehavior === option.id ? 'bg-white/5' : ''
                        }`}
                      >
                        <span className="text-lg">{option.icon}</span>
                        <div>
                          <div className="text-sm text-white">{option.label}</div>
                          <div className="text-xs text-gray-400">{option.desc}</div>
                        </div>
                        {endBehavior === option.id && (
                          <svg className="w-4 h-4 text-[#6366f1] ml-auto mt-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Video Player Area */}
      {isPlaying && (
        <section className="bg-black sticky top-10 z-40">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              {/* Placeholder player */}
              <div className="text-center">
                <span className="text-5xl mb-4 block">{channel.emoji}</span>
                <p className="text-lg text-white font-medium">{MOCK_VIDEOS[currentVideoIndex].title}</p>
                <p className="text-sm text-gray-400 mt-1">Playing • {MOCK_VIDEOS[currentVideoIndex].duration}</p>
              </div>
              
              {/* Mini player controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentVideoIndex(i => Math.max(0, i - 1))}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={nextVideo}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18l8.5-6L6 6v12zm2 0V6l6.5 6L8 18zm8-12h2v12h-2V6z"/>
                    </svg>
                  </button>
                </div>
                
                {/* Up next indicator */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Up next:</span>
                  <span className="text-white">{MOCK_VIDEOS[(currentVideoIndex + 1) % MOCK_VIDEOS.length].title}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Queue */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Queue</h2>
          <span className="text-sm text-gray-400">{MOCK_VIDEOS.length} videos</span>
        </div>
        
        <div className="space-y-1">
          {MOCK_VIDEOS.map((video, index) => (
            <button
              key={video.id}
              onClick={() => {
                setCurrentVideoIndex(index);
                setIsPlaying(true);
              }}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors text-left group ${
                currentVideoIndex === index && isPlaying
                  ? 'bg-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              {/* Index / Playing indicator */}
              <div className="w-6 text-center">
                {currentVideoIndex === index && isPlaying ? (
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="w-0.5 h-3 bg-[#6366f1] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-4 bg-[#6366f1] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-3 bg-[#6366f1] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                )}
                {currentVideoIndex !== index && (
                  <svg className="w-4 h-4 text-white hidden group-hover:block mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </div>
              
              {/* Thumbnail */}
              <div className={`w-16 h-10 rounded bg-gradient-to-br ${channel.gradient} opacity-60 flex items-center justify-center flex-shrink-0`}>
                <span className="text-lg">{channel.emoji}</span>
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${currentVideoIndex === index && isPlaying ? 'text-[#6366f1]' : 'text-white'}`}>
                  {video.title}
                </p>
                <p className="text-xs text-gray-400">{video.views} views</p>
              </div>
              
              {/* Duration */}
              <span className="text-sm text-gray-400">{video.duration}</span>
            </button>
          ))}
        </div>
        
        {/* Related Channels */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Similar channels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedChannels.map((related) => (
              <Link
                key={related.id}
                href={`/discover/${related.id}`}
                className="group"
              >
                <div className={`aspect-square rounded-lg bg-gradient-to-br ${related.gradient} flex items-center justify-center mb-2 group-hover:shadow-xl transition-shadow`}>
                  <span className="text-4xl">{related.emoji}</span>
                </div>
                <p className="text-sm font-medium text-white truncate">{related.name}</p>
                <p className="text-xs text-gray-400">AI Channel</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
