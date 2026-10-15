# LaunchRadar — Autonomous Job & Internship Finder

LaunchRadar is an autonomous job and internship discovery platform that scans, inspects, ranks, and verifies authentic employment listings for students and fresh graduates across premier engineering and tech career portals.

---

## 🚀 TinyFish Capabilities Utilized (200-Point Tier)

LaunchRadar incorporates three meaningfully distinct TinyFish core capabilities into an end-to-end multi-stage pipeline:

### 1. TinyFish Search API (`api.search.tinyfish.ai`)
* **Role in Pipeline:** Discovery Layer.
* **Implementation:** Performs rank-stable, structured SERP retrieval across targeted company career boards (e.g., `careers.microsoft.com`, `amazon.jobs`, `wellfound.com/jobs`, `boards.greenhouse.io`, `jobs.lever.co`).
* **Why it matters:** Unlike brittle web scraping or stale databases, TinyFish Search returns live titles, snippets, and verified URLs optimized for AI agent ingestion.

### 2. TinyFish Fetch API (`api.fetch.tinyfish.ai`)
* **Role in Pipeline:** Verification & Content Extraction Layer.
* **Implementation:** Dispatches discovered candidate job URLs to TinyFish's managed Chromium browser fleet with JavaScript rendering enabled.
* **Why it matters:** Career portals heavily rely on client-side SPAs (React/Angular) and anti-bot protections. TinyFish Fetch renders the actual DOM, strips out cookie banners, navigation noise, and ads, and returns clean Markdown for exact qualification parsing.

### 3. TinyFish Agent API (`agent.tinyfish.ai`)
* **Role in Pipeline:** Autonomous Career Portal Navigation.
* **Implementation:** When specialized career search interfaces require interactive filtering or pagination (e.g. Microsoft Careers portal), LaunchRadar runs a goal-directed browser agent with a strict output schema to extract freshly listed opportunities.
* **Why it matters:** Handles dynamic interactive workflows beyond static search, ensuring zero missed openings.

---

## 🎯 Deterministic Relevance Scoring & Deduplication

* **Deterministic Matching:** Calculates a weighted 0–100 relevance score:
  * **Role Similarity (35%):** Exact match and token n-gram overlap.
  * **Seniority Compatibility (25%):** Distinguishes Internship, Fresher, and Entry-Level from senior roles.
  * **Location Matching (25%):** Filters India, major tech hubs (Bengaluru, Hyderabad, Delhi NCR, Pune), or Remote.
  * **Keyword Overlap (15%):** Matches skills like Python, Java, AI Agents, React, Docker.
* **Dual-Stage Deduplication:**
  1. Canonical URL normalization (stripping tracking parameters like `utm_*`, `ref`, `gh_jid`).
  2. Composite fuzzy key matching (`company + normalized_title + location`).
  3. Retains the highest-fidelity, fetch-verified record.

---

## 🛠️ Quick Start

### 1. Installation
```bash
git clone <repo-url>
cd tinyFish
npm install
```

### 2. Configure Environment (Optional)
Create `.env.local` in the project root:
```env
TINYFISH_API_KEY=your_tinyfish_api_key_here
```
*(You can also input your key directly into the LaunchRadar UI via the "Configure TinyFish Key" modal during your session. The key is held in memory and never persisted or leaked).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Submission Checklist
- [x] Tested real search queries against TinyFish live endpoints.
- [x] Verified actual listing URLs from Microsoft Careers, Amazon Jobs, and Wellfound.
- [x] Tested changing roles (AI/ML, Software Engineer, Backend) and locations.
- [x] Verified deterministic deduplication and transparent scoring explanations.
- [x] Zero API keys leaked in code or Git.
- [x] Production build passes cleanly with TypeScript and Tailwind CSS.
