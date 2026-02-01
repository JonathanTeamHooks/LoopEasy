# LoopEasy Code Audit Report

**Date:** February 1, 2026  
**Reviewer:** Cody (AI Agent)  
**Codebase:** LoopEasy Video Platform

---

## Executive Summary

Overall, the codebase is **well-structured** with good TypeScript practices and solid security fundamentals. The main concerns are around missing middleware enforcement, some security edge cases, and a few maintainability issues.

**Critical Issues:** 1  
**Warnings:** 8  
**Suggestions:** 12  

---

## 🔴 CRITICAL ISSUES (Must Fix)

### 1. Missing Root Middleware for Auth Protection

**Location:** No `middleware.ts` in project root or `src/`

**Problem:** The `src/lib/supabase/middleware.ts` file contains auth protection logic, but there's no root `middleware.ts` that actually imports and runs it. This means protected routes (`/dashboard`, `/upload`, `/profile`, `/settings`) are **NOT actually protected** at the middleware level.

**Current state:** The `updateSession` function is defined but never invoked.

**Impact:** Anyone can directly access protected routes without authentication (though they may see empty data or errors).

**Fix:**
```typescript
// src/middleware.ts (CREATE THIS FILE)
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon, opengraph-image, etc.
     * - public files (manifest.json, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|icon|opengraph|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## ⚠️ WARNINGS (Should Fix)

### 2. Mux Webhook Signature Verification Bypassed in Dev

**Location:** `src/app/api/webhooks/mux/route.ts:36-40`

```typescript
// Verify signature in production
if (process.env.NODE_ENV === 'production' && signature) {
  // ...
}
```

**Problem:** Signature is only verified if BOTH in production AND signature exists. An attacker could potentially send webhooks without a signature and it would be processed.

**Fix:**
```typescript
// Always verify signature if secret is configured
if (process.env.MUX_WEBHOOK_SECRET) {
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }
  const isValid = verifyWebhookSignature(body, signature)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
}
```

---

### 3. Rate Limiter Uses In-Memory Map (Not Production-Ready)

**Location:** `src/app/api/feedback/route.ts:41-60`

```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
```

**Problem:** In serverless/edge environments, each function instance has its own memory. Rate limiting is ineffective across instances and resets on cold starts.

**Fix:** Use Redis or Upstash for persistent rate limiting, or use Vercel's native rate limiting.

---

### 4. YouTube Embed Uses PostMessage to Any Origin

**Location:** `src/components/VideoPlayer.tsx:23`

```typescript
iframeRef.current.contentWindow.postMessage(message, "*");
```

**Problem:** Using `"*"` as target origin allows any page to intercept messages.

**Fix:**
```typescript
iframeRef.current.contentWindow.postMessage(message, "https://www.youtube-nocookie.com");
```

---

### 5. User Avatar URL Rendered Without Sanitization

**Location:** `src/components/Header.tsx:96`, `src/app/browse/page.tsx:106`

```typescript
<img src={getUserAvatar()!} alt={...} />
```

**Problem:** If a malicious OAuth provider returns a `javascript:` or `data:` URL, it could execute code.

**Fix:**
```typescript
function safeAvatarUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}
```

---

### 6. Edge Runtime on Channels Route May Cause Issues

**Location:** `src/app/api/channels/route.ts:4`

```typescript
export const runtime = 'edge'
```

**Problem:** The route uses Supabase server client which may not be fully compatible with Edge runtime in all cases. Can cause cryptic errors.

**Recommendation:** Either test thoroughly or remove edge runtime for reliability.

---

### 7. Missing CSRF Protection on State-Changing Routes

**Location:** All POST/DELETE API routes

**Problem:** No explicit CSRF token validation. While cookies are SameSite by default in modern browsers, older browsers are vulnerable.

**Recommendation:** For critical actions (checkout, follow, upload), consider adding Origin header validation:
```typescript
const origin = req.headers.get('origin');
if (origin !== process.env.NEXT_PUBLIC_APP_URL) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

---

### 8. Service Role Key Instantiated on Every Request

**Location:** `src/app/api/webhooks/mux/route.ts:11-16`, `src/app/api/webhooks/stripe/route.ts:12-17`

```typescript
function getSupabaseAdmin(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

**Problem:** Creates a new client on every invocation. While not a security issue, it's inefficient.

**Fix:**
```typescript
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export { supabaseAdmin };
```

---

### 9. No CSP Headers Configured

**Location:** Missing `next.config.ts` security headers

**Problem:** No Content Security Policy headers to prevent XSS attacks.

**Fix:** Add to `next.config.ts`:
```typescript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self' https://stream.mux.com https://*.youtube-nocookie.com; frame-src https://www.youtube-nocookie.com https://player.vimeo.com;"
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options', 
    value: 'SAMEORIGIN'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];
```

---

## 💡 SUGGESTIONS (Nice to Have)

### 10. Large Components Could Be Split

**Location:** 
- `src/app/page.tsx` - 600+ lines
- `src/app/dashboard/page.tsx` - 300+ lines
- `src/components/PlatformShowcase.tsx` - 250+ lines

**Suggestion:** Extract sections into smaller components for maintainability.

---

### 11. Type Assertions Without Validation

**Location:** Multiple files

```typescript
const { id: channelId } = await params
```

**Suggestion:** Add Zod validation for route params:
```typescript
import { z } from 'zod';
const ParamsSchema = z.object({ id: z.string().uuid() });
const { id } = ParamsSchema.parse(await params);
```

---

### 12. Hardcoded Demo Data in Production Pages

**Location:** 
- `src/app/dashboard/page.tsx` - Mock creator data
- `src/app/profile/page.tsx` - Mock user data

**Suggestion:** Either load real data or clearly mark as demo. Currently confusing.

---

### 13. Missing Error Boundaries

**Problem:** No React Error Boundaries. If a component throws, the whole page crashes.

**Suggestion:** Add error.tsx files for key routes.

---

### 14. Console.log Used for Production Logging

**Location:** Multiple API routes use `console.error`

**Suggestion:** Use a proper logging library (e.g., Pino, Winston) with structured logging for production observability.

---

### 15. No Loading States for Data Fetching

**Location:** `src/app/browse/page.tsx`, `src/app/channel/[id]/page.tsx`

**Suggestion:** Add `loading.tsx` files for better UX during data fetching.

---

### 16. Auth Callback Doesn't Handle Errors Gracefully

**Location:** `src/app/api/auth/callback/route.ts`

```typescript
return NextResponse.redirect(`${origin}/auth?error=Could not authenticate`)
```

**Suggestion:** Show a proper error page with retry options instead of just a URL parameter.

---

### 17. Missing Database Indexes (Assumption)

**Location:** Database schema (implied from queries)

**Suggestion:** Ensure indexes exist on:
- `videos.channel_id`
- `videos.status`
- `follows.follower_id`
- `follows.channel_id`
- `channels.is_public`
- `channels.slug`

---

### 18. No Image Optimization for External URLs

**Location:** Channel thumbnails and user avatars

**Suggestion:** Use Next.js Image component with `remotePatterns` configured:
```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'image.mux.com' },
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
  ],
}
```

---

### 19. Unused Imports/Variables

**Location:** Various (checked with linter)

**Suggestion:** Run `eslint --fix` and enable `no-unused-vars` rule.

---

### 20. Missing Playwright/Cypress Tests

**Problem:** No E2E tests visible in the codebase.

**Suggestion:** Add at least critical path tests:
- Auth flow
- Browse → Watch flow
- Upload flow

---

### 21. API Routes Don't Use Consistent Response Types

**Location:** API routes return different shapes

**Suggestion:** Create a standard response type:
```typescript
type APIResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code?: string };
```

---

## ✅ What's Done Well

1. **TypeScript usage** - Proper types throughout, good use of `Database` types
2. **Input sanitization** - The feedback API has thorough XSS prevention
3. **Auth patterns** - Supabase auth is correctly implemented
4. **Webhook signature verification** - Stripe webhook properly verified
5. **No secrets in git** - `.env.local` properly gitignored
6. **No npm vulnerabilities** - Clean `npm audit`
7. **No TODO/FIXME comments** - Clean codebase
8. **Error handling** - Try/catch blocks in all API routes
9. **Loading states** - Skeleton loaders in browse page
10. **Form validation** - Client-side validation in auth forms

---

## Priority Order

1. **🔴 Add root middleware.ts** - Critical auth bypass
2. **⚠️ Fix Mux webhook signature check** - Security
3. **⚠️ Add CSP headers** - Security
4. **⚠️ Fix postMessage origin** - Security
5. **⚠️ Sanitize avatar URLs** - Security
6. **💡 Split large components** - Maintainability
7. **💡 Add error boundaries** - Reliability
8. **💡 Add E2E tests** - Quality

---

*Report generated by automated code review. Manual review recommended for business logic.*
