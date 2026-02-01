// AI-Curated Channel Definitions
// These are the "moods" - AI-powered channels that auto-curate content

export interface AIChannel {
  id: string;
  name: string;
  description: string;
  emoji: string;
  gradient: string;
  keywords: string[]; // For matching user searches
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';
  category: string;
}

export const AI_CHANNELS: AIChannel[] = [
  {
    id: 'morning-energy',
    name: 'Morning Energy',
    description: 'Start your day with motivation and positivity',
    emoji: '☀️',
    gradient: 'from-amber-500 to-orange-500',
    keywords: ['morning', 'wake up', 'energy', 'motivation', 'start day', 'uplifting', 'positive'],
    timeOfDay: 'morning',
    category: 'Mood',
  },
  {
    id: 'deep-focus',
    name: 'Deep Focus',
    description: 'Concentration-friendly content for work and study',
    emoji: '🎯',
    gradient: 'from-blue-500 to-cyan-500',
    keywords: ['focus', 'concentrate', 'work', 'study', 'coding', 'productive', 'ambient', 'background'],
    timeOfDay: 'anytime',
    category: 'Productivity',
  },
  {
    id: 'faith-devotion',
    name: 'Faith & Devotion',
    description: 'Spiritual content to nurture your soul',
    emoji: '🙏',
    gradient: 'from-purple-500 to-indigo-500',
    keywords: ['faith', 'devotion', 'spiritual', 'prayer', 'worship', 'christian', 'bible', 'sermon', 'church'],
    timeOfDay: 'anytime',
    category: 'Faith',
  },
  {
    id: 'workout-fuel',
    name: 'Workout Fuel',
    description: 'High-energy content to power your exercise',
    emoji: '💪',
    gradient: 'from-red-500 to-pink-500',
    keywords: ['workout', 'exercise', 'fitness', 'gym', 'training', 'hiit', 'cardio', 'strength'],
    timeOfDay: 'anytime',
    category: 'Fitness',
  },
  {
    id: 'wind-down',
    name: 'Wind Down',
    description: 'Calm and relaxing content for evening peace',
    emoji: '🌙',
    gradient: 'from-indigo-500 to-violet-500',
    keywords: ['relax', 'calm', 'peaceful', 'wind down', 'evening', 'chill', 'unwind', 'destress'],
    timeOfDay: 'evening',
    category: 'Wellness',
  },
  {
    id: 'learn-something',
    name: 'Learn Something New',
    description: 'Educational content to expand your mind',
    emoji: '🧠',
    gradient: 'from-emerald-500 to-teal-500',
    keywords: ['learn', 'education', 'tutorial', 'how to', 'teach', 'knowledge', 'documentary'],
    timeOfDay: 'anytime',
    category: 'Education',
  },
  {
    id: 'comedy-vibes',
    name: 'Comedy Vibes',
    description: 'Laugh out loud with curated funny content',
    emoji: '😂',
    gradient: 'from-yellow-500 to-amber-500',
    keywords: ['funny', 'comedy', 'laugh', 'humor', 'jokes', 'hilarious', 'entertaining'],
    timeOfDay: 'anytime',
    category: 'Entertainment',
  },
  {
    id: 'family-time',
    name: 'Family Time',
    description: 'Safe, fun content the whole family can enjoy',
    emoji: '👨‍👩‍👧‍👦',
    gradient: 'from-pink-500 to-rose-500',
    keywords: ['family', 'kids', 'children', 'safe', 'wholesome', 'together', 'movie night'],
    timeOfDay: 'anytime',
    category: 'Family',
  },
];

// Smart search: find relevant AI channels based on natural language query
export function findMatchingAIChannels(query: string): AIChannel[] {
  const normalizedQuery = query.toLowerCase();
  const words = normalizedQuery.split(/\s+/);
  
  // Score each channel based on keyword matches
  const scored = AI_CHANNELS.map(channel => {
    let score = 0;
    
    // Check each keyword
    for (const keyword of channel.keywords) {
      if (normalizedQuery.includes(keyword)) {
        score += 2; // Exact phrase match
      } else {
        for (const word of words) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 1; // Partial match
          }
        }
      }
    }
    
    // Boost based on time of day
    const hour = new Date().getHours();
    if (channel.timeOfDay === 'morning' && hour >= 5 && hour < 12) score += 1;
    if (channel.timeOfDay === 'afternoon' && hour >= 12 && hour < 17) score += 1;
    if (channel.timeOfDay === 'evening' && hour >= 17 && hour < 21) score += 1;
    if (channel.timeOfDay === 'night' && (hour >= 21 || hour < 5)) score += 1;
    
    return { channel, score };
  });
  
  // Return channels with score > 0, sorted by score
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.channel);
}

// Get suggested AI channels based on time of day
export function getTimeBasedSuggestions(): AIChannel[] {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    // Morning
    return AI_CHANNELS.filter(c => 
      c.timeOfDay === 'morning' || c.id === 'faith-devotion' || c.id === 'workout-fuel'
    );
  } else if (hour >= 12 && hour < 17) {
    // Afternoon
    return AI_CHANNELS.filter(c => 
      c.id === 'deep-focus' || c.id === 'learn-something' || c.id === 'workout-fuel'
    );
  } else if (hour >= 17 && hour < 21) {
    // Evening
    return AI_CHANNELS.filter(c => 
      c.timeOfDay === 'evening' || c.id === 'family-time' || c.id === 'comedy-vibes'
    );
  } else {
    // Night
    return AI_CHANNELS.filter(c => 
      c.id === 'wind-down' || c.id === 'faith-devotion'
    );
  }
}
