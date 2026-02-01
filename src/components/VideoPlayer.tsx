"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface VideoPlayerProps {
  embedType?: string | null;
  embedId?: string | null;
  muxPlaybackId?: string | null;
  videoUrl?: string | null;
  title: string;
  autoPlay?: boolean;
  loop?: boolean;
  onEnded?: () => void;
}

export default function VideoPlayer({
  embedType,
  embedId,
  muxPlaybackId,
  videoUrl,
  title,
  autoPlay = true,
  loop = true,
  onEnded,
}: VideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send command to YouTube iframe via postMessage
  const sendYouTubeCommand = useCallback((command: string, args?: any) => {
    if (iframeRef.current?.contentWindow) {
      const message = JSON.stringify({
        event: "command",
        func: command,
        args: args || []
      });
      iframeRef.current.contentWindow.postMessage(message, "*");
    }
  }, []);

  // Handle YouTube mute toggle
  const handleYouTubeMuteToggle = useCallback(() => {
    if (isMuted) {
      sendYouTubeCommand("unMute");
      sendYouTubeCommand("setVolume", [100]);
    } else {
      sendYouTubeCommand("mute");
    }
    setIsMuted(!isMuted);
  }, [isMuted, sendYouTubeCommand]);

  // Handle native video mute toggle
  const handleNativeMuteToggle = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Set up native video muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // YouTube embed - NO blocking overlay, just a positioned button
  if (embedType === "youtube" && embedId) {
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&mute=1&loop=${loop ? 1 : 0}&playlist=${embedId}&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        
        {/* Unmute button - positioned, NOT blocking iframe */}
        {isMuted && (
          <button
            onClick={handleYouTubeMuteToggle}
            className="absolute bottom-20 left-4 z-10 flex items-center gap-2 px-4 py-3 rounded-full bg-white text-black text-sm font-semibold shadow-lg hover:bg-gray-100 transition-all animate-pulse"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            Tap to unmute
          </button>
        )}
      </div>
    );
  }

  // Vimeo embed
  if (embedType === "vimeo" && embedId) {
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${embedId}?autoplay=1&loop=${loop ? 1 : 0}&muted=1&background=0&title=0&byline=0&portrait=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        {isMuted && (
          <button
            onClick={() => setIsMuted(false)}
            className="absolute bottom-20 left-4 z-10 flex items-center gap-2 px-4 py-3 rounded-full bg-white text-black text-sm font-semibold shadow-lg hover:bg-gray-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            Tap to unmute
          </button>
        )}
      </div>
    );
  }

  // Dailymotion embed
  if (embedType === "dailymotion" && embedId) {
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          ref={iframeRef}
          src={`https://www.dailymotion.com/embed/video/${embedId}?autoplay=1&loop=${loop ? 1 : 0}&mute=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        {isMuted && (
          <button
            onClick={() => setIsMuted(false)}
            className="absolute bottom-20 left-4 z-10 flex items-center gap-2 px-4 py-3 rounded-full bg-white text-black text-sm font-semibold shadow-lg hover:bg-gray-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            Tap to unmute
          </button>
        )}
      </div>
    );
  }

  // MUX video
  if (muxPlaybackId || embedType === "mux") {
    const playbackId = embedId || muxPlaybackId;
    const mp4Url = `https://stream.mux.com/${playbackId}/high.mp4`;
    const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?width=1280&height=720&fit_mode=smartcrop`;

    return (
      <div className="relative w-full h-full bg-black">
        <video
          ref={videoRef}
          poster={posterUrl}
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay={autoPlay}
          loop={loop}
          playsInline
          muted={isMuted}
          controls
          onEnded={onEnded}
        >
          <source src={mp4Url} type="video/mp4" />
        </video>
        {isMuted && (
          <button
            onClick={handleNativeMuteToggle}
            className="absolute bottom-20 left-4 z-10 flex items-center gap-2 px-4 py-3 rounded-full bg-white text-black text-sm font-semibold shadow-lg hover:bg-gray-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            Tap to unmute
          </button>
        )}
      </div>
    );
  }

  // Direct video URL
  if (videoUrl) {
    return (
      <div className="relative w-full h-full bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay={autoPlay}
          loop={loop}
          playsInline
          muted={isMuted}
          controls
          onEnded={onEnded}
        />
        {isMuted && (
          <button
            onClick={handleNativeMuteToggle}
            className="absolute bottom-20 left-4 z-10 flex items-center gap-2 px-4 py-3 rounded-full bg-white text-black text-sm font-semibold shadow-lg hover:bg-gray-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            Tap to unmute
          </button>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1c1c1f] to-[#0a0a0b] flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-white/50">Video not available</p>
      </div>
    </div>
  );
}

// Utility function to parse video URLs
export function parseVideoUrl(url: string): { embedType: string; embedId: string } | null {
  if (!url) return null;

  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) return { embedType: "youtube", embedId: match[1] };
  }

  const vimeoPattern = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = url.match(vimeoPattern);
  if (vimeoMatch) return { embedType: "vimeo", embedId: vimeoMatch[1] };

  const dailymotionPattern = /(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/;
  const dailymotionMatch = url.match(dailymotionPattern);
  if (dailymotionMatch) return { embedType: "dailymotion", embedId: dailymotionMatch[1] };

  const muxPattern = /stream\.mux\.com\/([a-zA-Z0-9]+)/;
  const muxMatch = url.match(muxPattern);
  if (muxMatch) return { embedType: "mux", embedId: muxMatch[1] };

  return null;
}
