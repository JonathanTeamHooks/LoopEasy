#!/bin/bash
# Run this after adding embed columns to the videos table
# Prerequisites: Run the SQL in supabase/feedback-table.sql first

SUPABASE_URL="https://rnkqhzjkqriwjtqluxcg.supabase.co"
SERVICE_KEY="${SUPABASE_SERVICE_KEY:-$(cat ~/.config/supabase/credentials.json | grep service_role_key | cut -d'"' -f4)}"
DEMO_USER="e35ae180-cf81-4e02-a1b0-b1d1b0b6d6e9"

# Channel IDs
CHILL_ID="508a06e8-f7c7-4fa6-99fe-b11f7c0dd218"
TECH_ID="f596cd65-8755-46d3-a8a8-93a078114d45"
FIT_ID="52add484-560d-4d50-9e20-062ed481c566"
COOK_ID="75d505de-0683-436c-be3f-06b91a38463b"
GAME_ID="b2bbf527-9bbb-48bb-ad15-40d571172f31"

echo "Adding YouTube videos..."

# Chill Vibes - Lo-fi Music
curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${CHILL_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"lofi hip hop radio - beats to relax/study to\",
    \"description\": \"The famous Lofi Girl stream. Perfect for studying, working, or just chilling.\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"jfKfPfyJRdk\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg\",
    \"duration\": 0,
    \"status\": \"ready\",
    \"view_count\": 1523000
  }"

curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${CHILL_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"Chillhop Radio - jazzy & lofi hip hop beats\",
    \"description\": \"24/7 lofi hip hop radio from Chillhop Music.\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"7NOSDKb0HlU\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/7NOSDKb0HlU/maxresdefault.jpg\",
    \"duration\": 0,
    \"status\": \"ready\",
    \"view_count\": 856000
  }"

# Tech Today - Coding Tutorials
curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${TECH_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"Next.js 14 Complete Course 2024\",
    \"description\": \"Full stack app tutorial with Next.js 14, server actions, MongoDB, and Auth.js.\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"vCOSTG10Y4o\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/vCOSTG10Y4o/maxresdefault.jpg\",
    \"duration\": 14400,
    \"status\": \"ready\",
    \"view_count\": 425000
  }"

curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${TECH_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"React Full Course for Free (2024)\",
    \"description\": \"Complete React JS course for beginners. Learn React from scratch!\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"CgkZ7MvWUAA\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/CgkZ7MvWUAA/maxresdefault.jpg\",
    \"duration\": 43200,
    \"status\": \"ready\",
    \"view_count\": 892000
  }"

# Fitness Flow - Workouts
curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${FIT_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"15 MIN SWEATY HIIT - No Equipment\",
    \"description\": \"A quick & effective no-repeat HIIT workout to burn calories at home!\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"_3hoz1zATys\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/_3hoz1zATys/maxresdefault.jpg\",
    \"duration\": 900,
    \"status\": \"ready\",
    \"view_count\": 12400000
  }"

curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${FIT_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"15 Minute Fat Burning HIIT | The Body Coach\",
    \"description\": \"Joe Wicks brings you a killer 15 minute fat burning workout!\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"4wVG5J7vL-I\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/4wVG5J7vL-I/maxresdefault.jpg\",
    \"duration\": 900,
    \"status\": \"ready\",
    \"view_count\": 3200000
  }"

# Cooking Corner
curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${COOK_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"Gordon Ramsay's 10 Minute Pasta\",
    \"description\": \"Gordon Ramsay shows how to make delicious pasta in just 10 minutes!\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"K32XDmE778k\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/K32XDmE778k/maxresdefault.jpg\",
    \"duration\": 600,
    \"status\": \"ready\",
    \"view_count\": 8900000
  }"

# Gaming Galaxy
curl -s -X POST "${SUPABASE_URL}/rest/v1/videos" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"channel_id\": \"${GAME_ID}\",
    \"owner_id\": \"${DEMO_USER}\",
    \"title\": \"Top 15 VALORANT EDG Plays of 2024\",
    \"description\": \"The best plays from the 2024 VALORANT World Champions!\",
    \"embed_type\": \"youtube\",
    \"embed_id\": \"bGwdLgObQCs\",
    \"thumbnail_url\": \"https://img.youtube.com/vi/bGwdLgObQCs/maxresdefault.jpg\",
    \"duration\": 720,
    \"status\": \"ready\",
    \"view_count\": 2100000
  }"

echo ""
echo "Done! YouTube videos added to all channels."
