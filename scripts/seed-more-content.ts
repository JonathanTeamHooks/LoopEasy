import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rnkqhzjkqriwjtqluxcg.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Use the LoopEasy Official user
const systemUserId = 'e35ae180-cf81-4e02-a1b0-b1d1b0b6d6e9';

interface Channel {
  name: string;
  slug: string;
  description: string;
  category: string;
  thumbnail_url: string;
  videos: {
    title: string;
    description: string;
    embed_type: string;
    embed_id: string;
    thumbnail_url: string;
    duration: number;
  }[];
}

const channels: Channel[] = [
  {
    name: 'Lo-Fi Focus',
    slug: 'lofi-focus',
    description: 'Chill lo-fi beats to help you focus, study, and relax. Perfect for work or meditation.',
    category: 'Music',
    thumbnail_url: 'https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
    videos: [
      {
        title: 'Lofi Hip Hop Radio - Beats to Relax/Study',
        description: 'Chill beats to help you focus and relax while working or studying.',
        embed_type: 'youtube',
        embed_id: 'jfKfPfyJRdk',
        thumbnail_url: 'https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
        duration: 0, // livestream
      },
    ],
  },
  {
    name: 'Calm Meditation',
    slug: 'calm-meditation',
    description: 'Guided meditations and peaceful content to help you unwind, sleep better, and find inner peace.',
    category: 'Wellness',
    thumbnail_url: 'https://img.youtube.com/vi/aEqlQvczMJQ/maxresdefault.jpg',
    videos: [
      {
        title: 'Guided Sleep Meditation',
        description: 'A calming guided meditation to help you fall into a deep, peaceful sleep.',
        embed_type: 'youtube',
        embed_id: 'aEqlQvczMJQ',
        thumbnail_url: 'https://img.youtube.com/vi/aEqlQvczMJQ/maxresdefault.jpg',
        duration: 3600,
      },
      {
        title: 'Morning Meditation for Positive Energy',
        description: 'Start your day with positive intentions and calm energy.',
        embed_type: 'youtube',
        embed_id: 'ENYYb5vIMkU',
        thumbnail_url: 'https://img.youtube.com/vi/ENYYb5vIMkU/maxresdefault.jpg',
        duration: 600,
      },
    ],
  },
  {
    name: 'Kettlebell Kings',
    slug: 'kettlebell-kings',
    description: 'The best kettlebell workouts for strength, conditioning, and fat loss. All levels welcome.',
    category: 'Fitness',
    thumbnail_url: 'https://img.youtube.com/vi/cKx8xE8jJZs/maxresdefault.jpg',
    videos: [
      {
        title: '20 Minute Full Body Kettlebell Workout',
        description: 'A complete kettlebell workout that targets every muscle group in just 20 minutes.',
        embed_type: 'youtube',
        embed_id: 'cKx8xE8jJZs',
        thumbnail_url: 'https://img.youtube.com/vi/cKx8xE8jJZs/maxresdefault.jpg',
        duration: 1200,
      },
      {
        title: 'Kettlebell Basics for Beginners',
        description: 'Learn the fundamental kettlebell movements safely and effectively.',
        embed_type: 'youtube',
        embed_id: 'Bj_Z4xAv_9Q',
        thumbnail_url: 'https://img.youtube.com/vi/Bj_Z4xAv_9Q/maxresdefault.jpg',
        duration: 900,
      },
    ],
  },
  {
    name: 'Code With Me',
    slug: 'code-with-me',
    description: 'Learn to code with hands-on tutorials. React, Next.js, JavaScript, and more.',
    category: 'Technology',
    thumbnail_url: 'https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg',
    videos: [
      {
        title: 'React Tutorial for Beginners',
        description: 'Learn React from scratch in this comprehensive beginner-friendly tutorial.',
        embed_type: 'youtube',
        embed_id: 'w7ejDZ8SWv8',
        thumbnail_url: 'https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg',
        duration: 3600,
      },
      {
        title: 'Build a Full Stack App with Next.js',
        description: 'Create a complete application from start to finish using Next.js.',
        embed_type: 'youtube',
        embed_id: 'wm5gMKuwSYk',
        thumbnail_url: 'https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
        duration: 5400,
      },
    ],
  },
  {
    name: 'Daily Motivation',
    slug: 'daily-motivation',
    description: 'Powerful motivational speeches and content to ignite your drive and push through challenges.',
    category: 'Entertainment',
    thumbnail_url: 'https://img.youtube.com/vi/mgmVOuLgFB0/maxresdefault.jpg',
    videos: [
      {
        title: 'NEVER GIVE UP - Powerful Motivational Speech',
        description: 'When you feel like quitting, remember why you started. This speech will reignite your fire.',
        embed_type: 'youtube',
        embed_id: 'mgmVOuLgFB0',
        thumbnail_url: 'https://img.youtube.com/vi/mgmVOuLgFB0/maxresdefault.jpg',
        duration: 600,
      },
      {
        title: 'Morning Motivation - Start Your Day Right',
        description: 'The perfect way to start your morning with energy and purpose.',
        embed_type: 'youtube',
        embed_id: 'qHH3lhYwqcY',
        thumbnail_url: 'https://img.youtube.com/vi/qHH3lhYwqcY/maxresdefault.jpg',
        duration: 480,
      },
    ],
  },
];

async function seedContent() {
  console.log('Seeding additional content...');

  for (const channelData of channels) {
    // Check if channel already exists
    const { data: existingChannel } = await supabase
      .from('channels')
      .select('id')
      .eq('slug', channelData.slug)
      .single();

    let channelId: string;

    if (existingChannel) {
      channelId = existingChannel.id;
      console.log(`Found existing channel: ${channelData.name}`);
    } else {
      // Create the channel
      const { data: channel, error: channelError } = await supabase
        .from('channels')
        .insert({
          owner_id: systemUserId,
          name: channelData.name,
          slug: channelData.slug,
          description: channelData.description,
          thumbnail_url: channelData.thumbnail_url,
          category: channelData.category,
          is_live: true,
          is_public: true,
          follower_count: Math.floor(Math.random() * 5000) + 500,
          total_views: Math.floor(Math.random() * 100000) + 10000,
        })
        .select()
        .single();

      if (channelError) {
        console.error(`Error creating channel ${channelData.name}:`, channelError);
        continue;
      }
      channelId = channel.id;
      console.log(`Created channel: ${channelData.name}`);
    }

    // Add videos to the channel
    for (let i = 0; i < channelData.videos.length; i++) {
      const video = channelData.videos[i];
      
      // Check if video already exists
      const { data: existingVideo } = await supabase
        .from('videos')
        .select('id')
        .eq('channel_id', channelId)
        .eq('embed_id', video.embed_id)
        .single();

      if (existingVideo) {
        console.log(`  Video already exists: ${video.title}`);
        continue;
      }

      const { error: videoError } = await supabase
        .from('videos')
        .insert({
          channel_id: channelId,
          owner_id: systemUserId,
          title: video.title,
          description: video.description,
          thumbnail_url: video.thumbnail_url,
          embed_type: video.embed_type,
          embed_id: video.embed_id,
          duration: video.duration,
          status: 'ready',
          view_count: Math.floor(Math.random() * 10000) + 1000,
          position: i,
          is_public: true,
        });

      if (videoError) {
        console.error(`  Error adding video ${video.title}:`, videoError);
      } else {
        console.log(`  Added video: ${video.title}`);
      }
    }
  }

  console.log('Done seeding additional content!');
}

seedContent().catch(console.error);
