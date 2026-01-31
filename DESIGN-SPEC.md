# LoopEasy - Design Specification

## Vision
Video channels curated by AI, built by creators. The differentiator: AI-powered tools that help creators bring their videos to life in ways they couldn't before.

---

## Core Principles

1. **AI Everywhere** — At every point of friction, there's an AI assist
2. **Creator Control** — Precise sequencing, loop/handoff behavior, full customization
3. **Platform Ubiquity** — Available on every device, everywhere

---

## Platform Availability

### Devices to Support & Showcase
- 📱 **iOS** — iPhone & iPad app (App Store)
- 🤖 **Android** — Phone & tablet app (Google Play)
- 📺 **Apple TV** — tvOS app
- 🔥 **Amazon Fire TV / Fire Stick** — Fire OS app
- 📡 **Chromecast / Google TV** — Cast support + native app
- 🖥️ **Roku** — Roku Channel
- 🌐 **Web** — Any browser (desktop & mobile)
- 🎮 **Smart TVs** — Samsung Tizen, LG webOS
- 💻 **Desktop Apps** — macOS, Windows (optional, Electron)

### Landing Page Section Needed
"Available Everywhere" showcase with device mockups showing LoopEasy on multiple screens

---

## Pages/Screens Needed

### ✅ BUILT (Frontend Mockups)
- [x] Landing page (marketing)
- [x] Browse (channel discovery)
- [x] Watch (video player + chat)
- [x] Dashboard (creator analytics)
- [x] Channel page (individual channel view)
- [x] Profile (user profile)

### 🔴 NEEDS DESIGN

#### Authentication & Onboarding
- [ ] Sign up / Sign in page
- [ ] Onboarding flow (viewer vs creator path)
- [ ] Subscription selection modal
- [ ] Email verification
- [ ] Forgot password

#### Upload Flow (AI Differentiator)
- [ ] Upload page — drag/drop, multi-file
- [ ] AI editing suite panel
  - Video enhancement (color, lighting, stabilization)
  - Style transfer (cinematic, vintage, neon, etc.)
  - Audio cleanup
  - Background replacement
- [ ] AI assistant panel ("Help me with this")
- [ ] Thumbnail generator (AI-powered)
- [ ] Auto-caption/subtitle tool
- [ ] Processing/progress states
- [ ] Upload complete / publish flow

#### Playlist/Sequence Manager
- [ ] Drag/drop video ordering UI
- [ ] Playlist settings panel
  - Loop toggle (on/off)
  - Handoff setting ("after playlist ends → go to channel X")
  - Visibility (public/private/unlisted)
- [ ] Sequence preview (visual flow of what plays)
- [ ] Scheduling UI (optional: time-based rotations)

#### AI Assistant (Global)
- [ ] Help button component (appears everywhere)
- [ ] Chat panel / slide-out drawer
- [ ] Inline AI suggestions (contextual)
- [ ] Voice input option

#### Discovery & Search
- [ ] AI-powered search UI
- [ ] "Describe what you want" input
- [ ] Mood-based filtering (enhanced)
- [ ] Personalized recommendations page

#### Settings & Account
- [ ] Account settings
- [ ] Notification preferences
- [ ] Payment/subscription management
- [ ] Payout settings (for creators)
- [ ] Connected accounts

---

## Technical Stack (Decisions Needed)

| Component | Options | Recommendation |
|-----------|---------|----------------|
| **Auth** | Clerk, NextAuth, Supabase Auth | Clerk (fastest, best DX) |
| **Database** | Supabase, PlanetScale, Neon | Supabase (auth + db + storage) |
| **Video Hosting** | Mux, Cloudflare Stream, Bunny | Mux (best API, HLS) |
| **AI Video** | Replicate, RunwayML, custom | Replicate (broad model access) |
| **AI Chat** | OpenAI GPT-4, Claude | OpenAI (fastest) |
| **Payments** | Stripe | Stripe |
| **Mobile Apps** | React Native, Expo | Expo (fastest cross-platform) |
| **TV Apps** | Expo TV, native | Expo TV + React Native TVOS |

---

## Design Priority Order

1. **Upload Flow + AI Editing** — The differentiator
2. **Playlist Manager** — Creator control
3. **Platform showcase** — Landing page section
4. **Auth/Onboarding** — Gate to everything
5. **AI Assistant UI** — Woven throughout

---

## Pricing Model

**Simple two-tier pricing — everyone can create:**

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | Watch + Create with ads. Full AI creator tools. |
| **Premium** | $9.99/mo | Ad-free watching + creating. Priority support. |

**Creator Monetization:**
- All users can create channels from day one
- Monetization unlocks at **1,000 followers**
- Once eligible: **70% revenue share** on channel ad revenue
- Premium creators earn on their content; their viewers see ads (unless viewer is also Premium)

This model removes friction for creators, drives content growth, and keeps pricing dead simple.
