/**
 * Validate and sanitize avatar URLs to prevent XSS
 * Only allows https:// URLs from trusted domains
 */

const TRUSTED_AVATAR_DOMAINS = [
  'lh3.googleusercontent.com', // Google
  'avatars.githubusercontent.com', // GitHub
  'platform-lookaside.fbsbx.com', // Facebook
  'pbs.twimg.com', // Twitter
  'cdn.discordapp.com', // Discord
  'gravatar.com', // Gravatar
  'www.gravatar.com',
  'i.pravatar.cc', // Placeholder service
  'api.dicebear.com', // Avatar generation
  'ui-avatars.com', // UI Avatars
  // Supabase storage
  'rnkqhzjkqriwjtqluxcg.supabase.co',
];

export function getSafeAvatarUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const parsed = new URL(url);
    
    // Only allow HTTPS
    if (parsed.protocol !== 'https:') {
      console.warn('Avatar URL rejected: not HTTPS', url);
      return null;
    }
    
    // Check against trusted domains
    const hostname = parsed.hostname.toLowerCase();
    const isTrusted = TRUSTED_AVATAR_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    if (!isTrusted) {
      console.warn('Avatar URL rejected: untrusted domain', hostname);
      return null;
    }
    
    return url;
  } catch {
    console.warn('Avatar URL rejected: invalid URL', url);
    return null;
  }
}

/**
 * Generate initials from a name for fallback avatar
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
