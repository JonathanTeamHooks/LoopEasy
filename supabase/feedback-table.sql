-- Feedback table for user suggestions
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/rnkqhzjkqriwjtqluxcg/sql

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

-- Index for efficient querying
CREATE INDEX IF NOT EXISTS idx_feedback_created ON public.feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_reviewed ON public.feedback(reviewed);

-- RLS: Disable public access (only service role can read/write)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- No public policies - only accessible via service role key (server-side)
-- This ensures users can't read other users' feedback

-- Grant insert only (through API) - this is handled by service role
COMMENT ON TABLE public.feedback IS 'User feedback and suggestions - sanitized text only, no code execution';
