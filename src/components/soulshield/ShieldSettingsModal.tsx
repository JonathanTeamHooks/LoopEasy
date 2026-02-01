"use client";

import { useState } from "react";
import { 
  PROTECTION_PRESETS, 
  BELIEF_SYSTEMS, 
  CONTENT_CATEGORIES,
  type SoulShieldProfile 
} from "@/lib/soulshield";

interface ShieldSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: SoulShieldProfile;
  onSave: (profile: SoulShieldProfile) => void;
  isConnected: boolean;
}

export default function ShieldSettingsModal({ 
  isOpen, 
  onClose, 
  profile,
  onSave,
  isConnected 
}: ShieldSettingsModalProps) {
  const [step, setStep] = useState<'connect' | 'level' | 'belief' | 'categories'>('connect');
  const [selectedLevel, setSelectedLevel] = useState<'personal' | 'focused' | 'faith' | 'family' | 'custom'>(
    profile?.protectionLevel || 'personal'
  );
  const [selectedBelief, setSelectedBelief] = useState(profile?.beliefSystem || '');
  const [blockedCategories, setBlockedCategories] = useState<string[]>(
    profile?.blockedCategories || PROTECTION_PRESETS.family.blockedCategories
  );
  const [isActive, setIsActive] = useState(profile?.isActive ?? true);

  if (!isOpen) return null;

  const handleSave = () => {
    const newProfile: SoulShieldProfile = {
      id: profile?.id || 'default',
      name: PROTECTION_PRESETS[selectedLevel].name,
      isActive,
      protectionLevel: selectedLevel,
      beliefSystem: selectedLevel === 'faith' ? selectedBelief : undefined,
      blockedCategories,
      allowedCategories: [],
      customRules: [],
    };
    onSave(newProfile);
    onClose();
  };

  const toggleCategory = (categoryId: string) => {
    setBlockedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">SoulShield</h2>
              <p className="text-xs text-gray-400">Protect your soul from negative digital influences</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          
          {/* Not Connected State */}
          {!isConnected && step === 'connect' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Guard Your Mind</h3>
              <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                SoulShield protects your soul from negative digital influences — for adults and kids alike. 
                You decide what enters your mind.
              </p>
              
              <div className="space-y-3 text-left max-w-sm mx-auto mb-6">
                {[
                  { icon: '🛡️', text: 'Protect yourself from harmful content' },
                  { icon: '🙏', text: 'Align your viewing with your values' },
                  { icon: '🧘', text: 'Guard your peace of mind' },
                  { icon: '🤖', text: 'AI understands context, not just keywords' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setStep('level')}
                className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Set Up SoulShield
              </button>
              <a 
                href="https://soulshield.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-3 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Learn more at soulshield.app →
              </a>
            </div>
          )}
          
          {/* Protection Level Selection */}
          {(isConnected || step === 'level') && step !== 'belief' && step !== 'categories' && (
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Protection Level</h3>
              <p className="text-sm text-gray-400 mb-4">Choose how SoulShield protects your content</p>
              
              <div className="space-y-2 mb-6">
                {Object.entries(PROTECTION_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLevel(key as typeof selectedLevel)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      selectedLevel === key
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${preset.color} flex items-center justify-center text-2xl`}>
                      {preset.emoji}
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-white">{preset.name}</div>
                      <div className="text-sm text-gray-400">{preset.description}</div>
                    </div>
                    {selectedLevel === key && (
                      <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              
              {selectedLevel === 'faith' && (
                <button
                  onClick={() => setStep('belief')}
                  className="w-full py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors mb-3"
                >
                  Choose Your Belief System →
                </button>
              )}
              
              {selectedLevel === 'custom' && (
                <button
                  onClick={() => setStep('categories')}
                  className="w-full py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors mb-3"
                >
                  Customize Categories →
                </button>
              )}
              
              {/* Active Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-medium text-white">Protection Active</div>
                  <div className="text-sm text-gray-400">Filter content on LoopEasy</div>
                </div>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${
                    isActive ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                    isActive ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          )}
          
          {/* Belief System Selection */}
          {step === 'belief' && (
            <div>
              <button onClick={() => setStep('level')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              
              <h3 className="text-lg font-bold text-white mb-1">Your Belief System</h3>
              <p className="text-sm text-gray-400 mb-4">SoulShield will show content that aligns with your values</p>
              
              <div className="grid grid-cols-2 gap-2">
                {BELIEF_SYSTEMS.map((belief) => (
                  <button
                    key={belief.id}
                    onClick={() => setSelectedBelief(belief.name)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedBelief === belief.name
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <span className="text-xl">{belief.icon}</span>
                    <span className="text-sm font-medium text-white">{belief.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Custom Categories */}
          {step === 'categories' && (
            <div>
              <button onClick={() => setStep('level')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              
              <h3 className="text-lg font-bold text-white mb-1">Block Categories</h3>
              <p className="text-sm text-gray-400 mb-4">Select content types to filter out</p>
              
              <div className="space-y-2">
                {CONTENT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      blockedCategories.includes(category.id)
                        ? 'border-red-500/50 bg-red-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="flex-1 text-left text-sm font-medium text-white">{category.name}</span>
                    {blockedCategories.includes(category.id) && (
                      <span className="text-xs text-red-400 font-medium">BLOCKED</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {(step !== 'connect' || isConnected) && (
          <div className="p-4 border-t border-white/10 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Save Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
