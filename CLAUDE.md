# LoopEasy - Agent Instructions

This file provides instructions for AI agents (Claude, Cursor, etc.) working on this project.

## 🗂️ Business Registry — MANDATORY
Before ANY push, deploy, or file operation:
1. Read `~/clawd/docs/BUSINESS_REGISTRY.md`
2. Confirm the correct GitHub remote, branch, local path, and Vercel project for this business
3. Check the business's current deployment stage for deploy rules
4. If Stage 2+, do NOT deploy to production without owner approval

This is not optional. Wrong deploys waste hours and risk breaking live products.


## 🎨 Web Design & Development Standards

**All web, UI, and visual work must follow the Team Hooks Web Design Playbook.**

### Source Files
- **Playbook:** `~/clawd/skills/web-design/SKILL.md`
- **References:** `~/clawd/skills/web-design/references/` (load by task type)
- **Brand kit:** `/docs/brand-kit.md` (auto-synced from Master Sheet)

### Before Any Design Work
1. Read `/docs/brand-kit.md` for colors, fonts, and visual style
2. Load relevant reference files based on task type
3. Execute to agency standards — would Pentagram approve this?
4. Run QA checklist before merge

### The Standard
- **Stack:** Next.js (App Router) + Tailwind CSS
- **Accessibility:** WCAG 2.1 AA minimum
- **Performance:** Core Web Vitals (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1)
- **Test:** Lighthouse 90+ on Performance and Accessibility

**No template energy. Every pixel intentional.**
