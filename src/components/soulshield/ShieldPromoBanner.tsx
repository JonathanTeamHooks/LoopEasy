"use client";

interface ShieldPromoBannerProps {
  onSetup: () => void;
  onDismiss?: () => void;
}

export default function ShieldPromoBanner({ onSetup, onDismiss }: ShieldPromoBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20 border border-emerald-500/30 p-6 mb-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative flex items-center gap-6">
        {/* Shield Icon */}
        <div className="hidden sm:flex w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-400 font-bold text-lg">SoulShield</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">NEW</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            Protect your viewing with AI
          </h3>
          <p className="text-gray-300 text-sm mb-4 max-w-xl">
            SoulShield filters content to match your values — block violence, nudity, and more, 
            or show only content aligned with your faith and beliefs.
          </p>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onSetup}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Set Up Protection
            </button>
            <a 
              href="https://soulshield.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              Learn more →
            </a>
          </div>
        </div>
        
        {/* Dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
