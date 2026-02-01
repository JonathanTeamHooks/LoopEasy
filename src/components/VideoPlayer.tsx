"use client";

import { useRef, useState, useEffect } from "react";

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
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle native video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // YouTube embed
  if (embedType === "youtube" && embedId) {
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&mute=1&loop=${loop ? 1 : 0}&playlist=${embedId}&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // Vimeo embed
  if (embedType === "vimeo" && embedId) {
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${embedId}?autoplay=${autoPlay ? 1 : 0}&loop=${loop ? 1 : 0}&background=0&title=0&byline=0&portrait=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Dailymotion embed
  if (embedType === "dailymotion" && embedId) {
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          ref={iframeRef}
          src={`https://www.dailymotion.com/embed/video/${embedId}?autoplay=${autoPlay ? 1 : 0}&loop=${loop ? 1 : 0}&mute=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  // MUX video - use MP4 for browser compatibility
  if (muxPlaybackId || embedType === "mux") {
    const playbackId = embedId || muxPlaybackId;
    // MUX provides MP4 renditions that work in all browsers
    const mp4Url = `https://stream.mux.com/${playbackId}/high.mp4`;
    const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?width=1280&height=720&fit_mode=smartcrop`;

    return (
      <div className="relative w-full h-full bg-black group">
        <video
          ref={videoRef}
          poster={posterUrl}
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay={autoPlay}
          loop={loop}
          playsInline
          muted
          controls
          onEnded={onEnded}
        >
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Direct video URL (mp4, webm, etc.)
  if (videoUrl) {
    return (
      <div className="relative w-full h-full bg-black group">
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay={autoPlay}
          loop={loop}
          playsInline
          controls
          onEnded={onEnded}
        />
      </div>
    );
  }

  // Fallback - no video source
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

// Utility function to parse video URLs and extract embed info
export function parseVideoUrl(url: string): { embedType: string; embedId: string } | null {
  if (!url) return null;

  // YouTube
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) return { embedType: "youtube", embedId: match[1] };
  }

  // Vimeo
  const vimeoPattern = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = url.match(vimeoPattern);
  if (vimeoMatch) return { embedType: "vimeo", embedId: vimeoMatch[1] };

  // Dailymotion
  const dailymotionPattern = /(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/;
  const dailymotionMatch = url.match(dailymotionPattern);
  if (dailymotionMatch) return { embedType: "dailymotion", embedId: dailymotionMatch[1] };

  // MUX
  const muxPattern = /stream\.mux\.com\/([a-zA-Z0-9]+)/;
  const muxMatch = url.match(muxPattern);
  if (muxMatch) return { embedType: "mux", embedId: muxMatch[1] };

  return null;
}
