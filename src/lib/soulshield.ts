// SoulShield Integration for LoopEasy
// AI-powered content protection that aligns with your values

export interface SoulShieldProfile {
  id: string;
  name: string;
  isActive: boolean;
  protectionLevel: 'kids' | 'family' | 'faith' | 'custom';
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
export const PROTECTION_PRESETS = {
  kids: {
    name: 'Kids Mode',
    emoji: '👶',
    description: 'Age-appropriate content only',
    blockedCategories: ['violence', 'nudity', 'drugs', 'alcohol', 'horror', 'adult-themes', 'strong-language'],
    color: 'from-green-400 to-emerald-500',
  },
  family: {
    name: 'Family Friendly',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Safe for the whole family',
    blockedCategories: ['nudity', 'drugs', 'extreme-violence', 'adult-themes'],
    color: 'from-blue-400 to-cyan-500',
  },
  faith: {
    name: 'Faith-Based',
    emoji: '🙏',
    description: 'Content aligned with your beliefs',
    blockedCategories: ['nudity', 'drugs', 'violence', 'occult', 'anti-religious'],
    color: 'from-purple-400 to-indigo-500',
  },
  custom: {
    name: 'Custom',
    emoji: '⚙️',
    description: 'Your own protection rules',
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
