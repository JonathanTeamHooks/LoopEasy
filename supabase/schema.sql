-- LoopEasy Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- USERS (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  is_premium boolean default false,
  premium_until timestamp with time zone,
  follower_count integer default 0,
  following_count integer default 0,
  is_monetized boolean default false, -- unlocks at 1000 followers
  stripe_customer_id text,
  stripe_connect_id text, -- for creator payouts
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- CHANNELS
-- ============================================
create table public.channels (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  description text,
  thumbnail_url text,
  category text,
  is_live boolean default false,
  is_public boolean default true,
  follower_count integer default 0,
  total_views integer default 0,
  total_watch_time integer default 0, -- in seconds
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- VIDEOS
-- ============================================
create table public.videos (
  id uuid default uuid_generate_v4() primary key,
  channel_id uuid references public.channels(id) on delete cascade not null,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  thumbnail_url text,
  video_url text, -- Mux playback URL
  mux_asset_id text,
  mux_playback_id text,
  duration integer, -- in seconds
  status text default 'processing', -- processing, ready, error
  view_count integer default 0,
  position integer default 0, -- order in channel playlist
  is_public boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- FOLLOWS (users following channels)
-- ============================================
create table public.follows (
  id uuid default uuid_generate_v4() primary key,
  follower_id uuid references public.profiles(id) on delete cascade not null,
  channel_id uuid references public.channels(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(follower_id, channel_id)
);

-- ============================================
-- WATCH HISTORY
-- ============================================
create table public.watch_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  video_id uuid references public.videos(id) on delete cascade not null,
  channel_id uuid references public.channels(id) on delete cascade not null,
  watch_time integer default 0, -- seconds watched
  completed boolean default false,
  last_position integer default 0, -- resume position
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- SUBSCRIPTIONS (Premium)
-- ============================================
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_subscription_id text unique,
  status text not null, -- active, canceled, past_due
  plan text default 'premium', -- premium
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- CREATOR EARNINGS
-- ============================================
create table public.earnings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  channel_id uuid references public.channels(id) on delete cascade not null,
  amount integer not null, -- in cents
  period_start date not null,
  period_end date not null,
  status text default 'pending', -- pending, paid, failed
  stripe_transfer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.channels enable row level security;
alter table public.videos enable row level security;
alter table public.follows enable row level security;
alter table public.watch_history enable row level security;
alter table public.subscriptions enable row level security;
alter table public.earnings enable row level security;

-- Profiles: public read, owner write
create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Channels: public read, owner write
create policy "Public channels are viewable by everyone" on public.channels
  for select using (is_public = true);
create policy "Users can create channels" on public.channels
  for insert with check (auth.uid() = owner_id);
create policy "Owners can update their channels" on public.channels
  for update using (auth.uid() = owner_id);
create policy "Owners can delete their channels" on public.channels
  for delete using (auth.uid() = owner_id);

-- Videos: public read, owner write
create policy "Public videos are viewable by everyone" on public.videos
  for select using (is_public = true);
create policy "Users can create videos in their channels" on public.videos
  for insert with check (auth.uid() = owner_id);
create policy "Owners can update their videos" on public.videos
  for update using (auth.uid() = owner_id);
create policy "Owners can delete their videos" on public.videos
  for delete using (auth.uid() = owner_id);

-- Follows: users can manage their own follows
create policy "Users can view follows" on public.follows
  for select using (true);
create policy "Users can follow channels" on public.follows
  for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow channels" on public.follows
  for delete using (auth.uid() = follower_id);

-- Watch history: private to user
create policy "Users can view own watch history" on public.watch_history
  for select using (auth.uid() = user_id);
create policy "Users can create watch history" on public.watch_history
  for insert with check (auth.uid() = user_id);
create policy "Users can update own watch history" on public.watch_history
  for update using (auth.uid() = user_id);

-- Subscriptions: private to user
create policy "Users can view own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Earnings: private to user
create policy "Users can view own earnings" on public.earnings
  for select using (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update follower counts on follow/unfollow
create or replace function public.update_follower_count()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update public.channels set follower_count = follower_count + 1 where id = NEW.channel_id;
    update public.profiles set following_count = following_count + 1 where id = NEW.follower_id;
    -- Check if channel owner should be monetized (1000+ followers across all channels)
    update public.profiles set is_monetized = true
    where id = (select owner_id from public.channels where id = NEW.channel_id)
    and (select sum(follower_count) from public.channels where owner_id = (select owner_id from public.channels where id = NEW.channel_id)) >= 1000;
    return NEW;
  elsif (TG_OP = 'DELETE') then
    update public.channels set follower_count = follower_count - 1 where id = OLD.channel_id;
    update public.profiles set following_count = following_count - 1 where id = OLD.follower_id;
    return OLD;
  end if;
end;
$$ language plpgsql security definer;

create trigger on_follow_change
  after insert or delete on public.follows
  for each row execute procedure public.update_follower_count();

-- Update timestamps
create or replace function public.update_updated_at()
returns trigger as $$
begin
  NEW.updated_at = timezone('utc'::text, now());
  return NEW;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on public.profiles
  for each row execute procedure public.update_updated_at();
create trigger update_channels_updated_at before update on public.channels
  for each row execute procedure public.update_updated_at();
create trigger update_videos_updated_at before update on public.videos
  for each row execute procedure public.update_updated_at();
create trigger update_watch_history_updated_at before update on public.watch_history
  for each row execute procedure public.update_updated_at();
create trigger update_subscriptions_updated_at before update on public.subscriptions
  for each row execute procedure public.update_updated_at();

-- ============================================
-- INDEXES
-- ============================================
create index idx_channels_owner on public.channels(owner_id);
create index idx_channels_slug on public.channels(slug);
create index idx_videos_channel on public.videos(channel_id);
create index idx_videos_owner on public.videos(owner_id);
create index idx_follows_follower on public.follows(follower_id);
create index idx_follows_channel on public.follows(channel_id);
create index idx_watch_history_user on public.watch_history(user_id);
create index idx_subscriptions_user on public.subscriptions(user_id);
create index idx_earnings_user on public.earnings(user_id);
