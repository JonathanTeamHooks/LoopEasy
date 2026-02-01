import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rnkqhzjkqriwjtqluxcg.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Bible Project videos with their YouTube IDs
const bibleProjectVideos = [
  {
    title: 'Overview: Genesis Ch. 1-11',
    description: 'Watch our overview video on Genesis 1-11, which breaks down the literary design of the book and its flow of thought. In Genesis, God makes a good world and calls humans to partner with him.',
    embed_type: 'youtube',
    embed_id: 'GQI72THyO5I',
    thumbnail_url: 'https://img.youtube.com/vi/GQI72THyO5I/maxresdefault.jpg',
    duration: 480,
  },
  {
    title: 'Overview: Genesis Ch. 12-50',
    description: 'Watch our overview video on Genesis 12-50, which breaks down the literary design of the book and its flow of thought. In Genesis, God promises to bless rebellious humanity.',
    embed_type: 'youtube',
    embed_id: 'F4isSyennFo',
    thumbnail_url: 'https://img.youtube.com/vi/F4isSyennFo/maxresdefault.jpg',
    duration: 540,
  },
  {
    title: 'Overview: Matthew Ch. 1-13',
    description: 'Watch our overview video on Matthew Ch. 1-13, which breaks down the literary design of the book and its flow of thought. In Matthew, Jesus brings God\'s heavenly kingdom to earth.',
    embed_type: 'youtube',
    embed_id: '3Dv4-n6OYGI',
    thumbnail_url: 'https://img.youtube.com/vi/3Dv4-n6OYGI/maxresdefault.jpg',
    duration: 510,
  },
  {
    title: 'Overview: Matthew Ch. 14-28',
    description: 'Watch our overview video on Matthew Ch. 14-28, which breaks down the literary design of the book and its flow of thought. Jesus reveals what it looks like when God becomes king.',
    embed_type: 'youtube',
    embed_id: 'GGCF3OPWN14',
    thumbnail_url: 'https://img.youtube.com/vi/GGCF3OPWN14/maxresdefault.jpg',
    duration: 480,
  },
  {
    title: 'Overview: The Book of Job',
    description: 'Watch our overview video on the book of Job, which breaks down the literary design of the book and its flow of thought. Job explores the difficult question of God\'s relationship to human suffering.',
    embed_type: 'youtube',
    embed_id: 'xQwnH8th_fs',
    thumbnail_url: 'https://img.youtube.com/vi/xQwnH8th_fs/maxresdefault.jpg',
    duration: 540,
  },
  {
    title: 'Overview: Gospel of John',
    description: 'Watch our overview video on the Gospel of John, which breaks down the literary design of the book and its flow of thought. In John, Jesus becomes human as the incarnation of the creator God of Israel.',
    embed_type: 'youtube',
    embed_id: 'G-2e9mMf7E8',
    thumbnail_url: 'https://img.youtube.com/vi/G-2e9mMf7E8/maxresdefault.jpg',
    duration: 600,
  },
  {
    title: 'The Story of the Bible',
    description: 'This video summarizes the overall story of the Bible as a series of crossroad decisions. All humanity, followed by the Israelites, redefine good and evil.',
    embed_type: 'youtube',
    embed_id: '7_CGP-12AE0',
    thumbnail_url: 'https://img.youtube.com/vi/7_CGP-12AE0/maxresdefault.jpg',
    duration: 360,
  },
  {
    title: 'What is the Bible?',
    description: 'An introduction to what the Bible is - a unified story that leads to Jesus. At The Bible Project, we make animated videos that explore the books of the Bible.',
    embed_type: 'youtube',
    embed_id: 'vFwNZNyDu9k',
    thumbnail_url: 'https://img.youtube.com/vi/vFwNZNyDu9k/maxresdefault.jpg',
    duration: 300,
  },
];

async function seedBibleProject() {
  console.log('Seeding Bible Project content...');

  // Use the LoopEasy Official user for curated content
  const systemUserId = 'e35ae180-cf81-4e02-a1b0-b1d1b0b6d6e9';
  console.log('Using LoopEasy Official user:', systemUserId);

  // Check if channel already exists
  const { data: existingChannel } = await supabase
    .from('channels')
    .select('id')
    .eq('slug', 'bible-project')
    .single();

  let channelId: string;

  if (existingChannel) {
    channelId = existingChannel.id;
    console.log('Found existing Bible Project channel:', channelId);
  } else {
    // Create the Bible Project channel
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .insert({
        owner_id: systemUserId,
        name: 'The Bible Project',
        slug: 'bible-project',
        description: 'Beautiful animated videos that explain the books and themes of the Bible. Perfect for morning devotionals and Bible study.',
        thumbnail_url: 'https://img.youtube.com/vi/GQI72THyO5I/maxresdefault.jpg',
        category: 'Devotional',
        is_live: true,
        is_public: true,
        follower_count: 1000,
        total_views: 50000,
      })
      .select()
      .single();

    if (channelError) {
      console.error('Error creating channel:', channelError);
      return;
    }
    channelId = channel.id;
    console.log('Created Bible Project channel:', channelId);
  }

  // Add videos to the channel
  for (let i = 0; i < bibleProjectVideos.length; i++) {
    const video = bibleProjectVideos[i];
    
    // Check if video already exists
    const { data: existingVideo } = await supabase
      .from('videos')
      .select('id')
      .eq('channel_id', channelId)
      .eq('embed_id', video.embed_id)
      .single();

    if (existingVideo) {
      console.log(`Video already exists: ${video.title}`);
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
      console.error(`Error adding video ${video.title}:`, videoError);
    } else {
      console.log(`Added video: ${video.title}`);
    }
  }

  console.log('Done seeding Bible Project content!');
}

seedBibleProject().catch(console.error);
