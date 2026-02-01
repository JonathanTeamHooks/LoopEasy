import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.mux.com" },
      { protocol: "https", hostname: "**.youtube.com" },
      { protocol: "https", hostname: "**.ytimg.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // Compress responses
  compress: true,
};

export default nextConfig;
