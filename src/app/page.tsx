"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PlatformShowcase from "@/components/PlatformShowcase";
import {
  HeroSection,
  DayTimelineSection,
  CuratorsSection,
  ProductDemoSection,
  AIFeaturesSection,
  TestimonialsSection,
  FinalCTASection,
  Footer,
} from "@/components/landing";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Ambient background - reduced for performance */}
      <div className="fixed inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#6366f1]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#a855f7]/10 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <Header variant="transparent" />

      {/* HERO */}
      <HeroSection isLoaded={isLoaded} />

      {/* YOUR DAY, YOUR WAY */}
      <DayTimelineSection />

      {/* FOLLOW YOUR CURATORS */}
      <CuratorsSection />

      {/* THE PRODUCT - Show Don't Tell */}
      <ProductDemoSection />

      {/* AI SUPERPOWERS */}
      <AIFeaturesSection />

      {/* PLATFORM SHOWCASE */}
      <PlatformShowcase />

      {/* SOCIAL PROOF */}
      <TestimonialsSection />

      {/* FINAL CTA */}
      <FinalCTASection />

      {/* FOOTER */}
      <Footer />

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
