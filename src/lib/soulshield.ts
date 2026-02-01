// SoulShield Integration for LoopEasy
// AI-powered soul protection for everyone — adults and kids alike.
// Protects your mind and soul from negative digital influences.
// Not just parental controls — it's personal protection for anyone
// who wants to guard what enters their mind through digital content.

export interface SoulShieldProfile {
  id: string;
  name: string;
  isActive: boolean;
  protectionLevel: 'personal' | 'focused' | 'faith' | 'family' | 'custom';
  beliefSystem?: string; // e.g., "Christian", "Family-friendly", etc.
  blockedCategories: string[];
  allowedCategories: string[];
  customRules: string[];
}

export interface SoulShieldSettings {
  isConnected: boolean;
  activeProfile?: SoulShieldProfile;
  profiles: SoulShieldProfile[];
}

// Protection level presets
// Designed for everyone — adults protecting their own minds, not just parents protecting kids
export const PROTECTION_PRESETS = {
  personal: {
    name: 'Personal Shield',
    emoji: '🛡️',
    description: 'Protect your peace of mind',
    blockedCategories: ['nudity', 'extreme-violence', 'drugs', 'adult-themes'],
    color: 'from-blue-400 to-cyan-500',
  },
  focused: {
    name: 'Focused Mind',
    emoji: '🧘',
    description: 'Block distractions & negativity',
    blockedCategories: ['violence', 'horror', 'strong-language', 'adult-themes', 'gambling'],
    color: 'from-teal-400 to-emerald-500',
  },
  faith: {
    name: 'Faith-Aligned',
    emoji: '🙏',
    description: 'Content that honors your beliefs',
    blockedCategories: ['nudity', 'drugs', 'violence', 'occult', 'anti-religious', 'adult-themes'],
    color: 'from-purple-400 to-indigo-500',
  },
  family: {
    name: 'Family Home',
    emoji: '🏠',
    description: 'Safe for everyone in the house',
    blockedCategories: ['nudity', 'drugs', 'extreme-violence', 'adult-themes', 'strong-language', 'horror'],
    color: 'from-rose-400 to-pink-500',
  },
  custom: {
    name: 'My Rules',
    emoji: '⚙️',
    description: 'Set your own boundaries',
    blockedCategories: [],
    color: 'from-gray-400 to-gray-500',
  },
};

// Belief system options for faith-based filtering
export const BELIEF_SYSTEMS = [
  { id: 'christian', name: 'Christian', icon: '✝️' },
  { id: 'catholic', name: 'Catholic', icon: '⛪' },
  { id: 'jewish', name: 'Jewish', icon: '✡️' },
  { id: 'muslim', name: 'Muslim', icon: '☪️' },
  { id: 'hindu', name: 'Hindu', icon: '🕉️' },
  { id: 'buddhist', name: 'Buddhist', icon: '☸️' },
  { id: 'family-values', name: 'Family Values', icon: '💝' },
  { id: 'wholesome', name: 'Wholesome Only', icon: '🌟' },
];

// Content categories that can be blocked
export const CONTENT_CATEGORIES = [
  { id: 'nudity', name: 'Nudity & Sexual Content', icon: '🔞' },
  { id: 'violence', name: 'Violence & Gore', icon: '⚔️' },
  { id: 'extreme-violence', name: 'Extreme Violence', icon: '💀' },
  { id: 'drugs', name: 'Drug Use', icon: '💊' },
  { id: 'alcohol', name: 'Alcohol', icon: '🍺' },
  { id: 'strong-language', name: 'Strong Language', icon: '🤬' },
  { id: 'horror', name: 'Horror & Scary Content', icon: '👻' },
  { id: 'adult-themes', name: 'Adult Themes', icon: '🔒' },
  { id: 'occult', name: 'Occult & Supernatural', icon: '🔮' },
  { id: 'anti-religious', name: 'Anti-Religious Content', icon: '⛔' },
  { id: 'gambling', name: 'Gambling', icon: '🎰' },
  { id: 'smoking', name: 'Smoking & Tobacco', icon: '🚬' },
];

// Mock function to check if content is allowed
export function isContentAllowed(
  contentTags: string[],
  profile: SoulShieldProfile | undefined
): { allowed: boolean; reason?: string } {
  if (!profile || !profile.isActive) {
    return { allowed: true };
  }

  for (const tag of contentTags) {
    if (profile.blockedCategories.includes(tag)) {
      return { 
        allowed: false, 
        reason: `Blocked by ${profile.name}: ${tag}` 
      };
    }
  }

  return { allowed: true };
}

// Get display text for active protection
export function getProtectionStatus(profile: SoulShieldProfile | undefined): string {
  if (!profile || !profile.isActive) {
    return 'Protection off';
  }

  if (profile.beliefSystem) {
    return `Aligned with ${profile.beliefSystem} values`;
  }

  const preset = PROTECTION_PRESETS[profile.protectionLevel];
  return preset?.description || 'Protected';
}
