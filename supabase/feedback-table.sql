-- LoopEasy Additional Tables
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/rnkqhzjkqriwjtqluxcg/sql

-- ======================
-- FEEDBACK TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  message text NOT NULL,
  page_url text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  reviewed boolean DEFAULT false,
  reviewed_at timestamptz,
  notes text
);

CREATE INDEX IF NOT EXISTS idx_feedback_created ON public.feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_reviewed ON public.feedback(reviewed);
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.feedback IS 'User feedback and suggestions - sanitized text only';

-- ======================
-- WAITLIST TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text DEFAULT 'homepage',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON public.waitlist(created_at DESC);
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.waitlist IS 'Email signups from homepage';

-- ======================
-- VIDEO EMBED SUPPORT
-- ======================
-- Add columns for external video embeds (YouTube, Vimeo, etc.)
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS embed_type text;
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS embed_id text;
COMMENT ON COLUMN public.videos.embed_type IS 'Video platform: youtube, vimeo, dailymotion, mux, direct';
COMMENT ON COLUMN public.videos.embed_id IS 'Video ID on external platform';
