# LaunchRadar — Submission Package & Social Posts

## 📌 Project Overview
- **Name:** LaunchRadar — TinyFish-powered Job & Internship Finder
- **Event:** TinyFish × TechnoJam Challenge (Galgotias University)
- **Status:** Complete, production-built, and running live on `http://localhost:3000`
- **Target Tier:** 200-Point Tier (3 Distinct TinyFish Capabilities)

---

## 📱 Social Post Drafts (Ready for Review)

> ⚠️ *Note: These are drafts prepared for your approval. Do not publish without your explicit consent.*

### 🐦 X (Twitter) Post Draft
```text
Built LaunchRadar 🚀 for the @TinyFish_AI × @TechnoJam_GU hackathon challenge!

Hunting for student tech internships shouldn't mean drowning in stale job boards. LaunchRadar uses 3 core @TinyFish_AI primitives:
🔍 Search API: Discovers real, rank-stable openings across Microsoft, Amazon & Wellfound
🌐 Fetch API: Renders live SPAs in headless Chromium to extract authentic requirements
🤖 Agent API: Autonomous browser agent navigating multi-step career boards

Built with Next.js, TypeScript & Tailwind CSS with deterministic matching + deduplication.

Check it out! 🛰️ #TinyFish #TechnoJam #GalgotiasUniversity #BuildInPublic #AIAgents
```

### 💼 LinkedIn Post Draft
```text
Excited to unveil LaunchRadar 🛰️ — an autonomous job & internship finder built for the TinyFish × TechnoJam challenge at Galgotias University!

Finding student internships and entry-level developer roles across major company career sites is typically plagued by stale aggregators, expired links, and messy JavaScript-rendered pages.

To solve this, I built LaunchRadar powered by 3 distinct @TinyFish core capabilities:

1️⃣ TinyFish Search API: Powers live, rank-stable discovery across Microsoft Careers, Amazon Jobs, Wellfound, and Greenhouse boards without scraping friction.
2️⃣ TinyFish Fetch API: Uses TinyFish's Chromium fleet to render complex SPAs, bypass anti-bot barriers, and extract clean Markdown specs for qualification matching.
3️⃣ TinyFish Agent API: Autonomous browser agent navigation executing structured goal runs on interactive career portals.

Combined with deterministic relevance scoring (role similarity, seniority fit, location matching, and keyword overlap) and canonical URL deduplication, LaunchRadar connects students with verified, actionable opportunities.

Stack: Next.js 14, TypeScript, Tailwind CSS, TinyFish SDK & APIs.

Huge thanks to the TinyFish and TechnoJam teams for hosting this challenge! 🚀

#TinyFish #TechnoJam #GalgotiasUniversity #ArtificialIntelligence #WebAgents #SoftwareEngineering #Nextjs
```

---

## 📋 What Was Tested & Validated
1. **Live HTTP Contracts:**
   - `https://api.search.tinyfish.ai`: Verified live connectivity, error handling, and query execution.
   - `https://api.fetch.tinyfish.ai`: Verified POST endpoint with headless Chromium rendering.
   - `https://agent.tinyfish.ai/v1/automation/run`: Verified autonomous goal-based browser runner schema.
2. **Matching & Deduplication:**
   - Canonical URL normalization (stripping tracking query params).
   - Composite fuzzy key deduplication (`company + title + location`).
   - Deterministic 4-pillar scoring algorithm with detailed match explanations.
3. **Frontend & App Server:**
   - Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.
   - Verified production build and live daemon server on `http://localhost:3000`.
   - Responsive dark dashboard with real-time multi-stage pipeline status tracker and live diagnostics drawer.
