import React from 'react';
import { Search, Globe, Cpu, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import Container from './container';
import Heading from './heading';
import SubHeading from './subheading';

export default function WorkflowBento() {
  return (
    <section id="workflow" className="py-16 md:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-transparent transition-colors">
      <Container className="space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-950/70 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
            <span>Architecture & Workflow</span>
          </div>
          <Heading variant="big">
            How The Discovery Engine Works
          </Heading>
          <SubHeading variant="big">
            A three-tier autonomous pipeline that discovers, renders, inspects, and scores opportunities directly from verified company career portals.
          </SubHeading>
        </div>

        {/* Bento Grid with Inverted Card Aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Search API */}
          <div className="p-6 rounded-2xl inverted-card border shadow-md hover:scale-[1.01] transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-500">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500">Layer 1 • Discovery</span>
              <h3 className="text-lg font-bold mt-1">Structured Search API</h3>
              <p className="text-xs card-text-muted font-mono mt-0.5">Autonomous Career Index</p>
            </div>
            <p className="text-xs card-text-muted leading-relaxed">
              Instead of querying stale job aggregators, JobAmigo issues rank-stable, structured web search queries targeting authentic career sites like Microsoft Careers, Amazon Jobs, and Wellfound with location and seniority context.
            </p>
            <div className="p-3 rounded-xl inverted-card-subtle border text-[11px] font-mono space-y-1">
              <div className="text-yellow-500 font-semibold">GET /?query=site:amazon.jobs "Intern" India</div>
              <div className="card-text-muted">→ Returns real titles, verified URLs & snippets</div>
            </div>
          </div>

          {/* Card 2: Fetch API */}
          <div className="p-6 rounded-2xl inverted-card border shadow-md hover:scale-[1.01] transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-500">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Layer 2 • Extraction</span>
              <h3 className="text-lg font-bold mt-1">DOM Extraction & Fetch</h3>
              <p className="text-xs card-text-muted font-mono mt-0.5">Headless Browser Rendering</p>
            </div>
            <p className="text-xs card-text-muted leading-relaxed">
              Modern career boards are heavy Single Page Applications with client-side rendering. Headless Chromium fleet renders the live DOM, strips noise (navbars, banners, ads), and returns clean Markdown.
            </p>
            <div className="p-3 rounded-xl inverted-card-subtle border text-[11px] font-mono space-y-1">
              <div className="text-amber-500 font-semibold">POST / &#123; urls: [...], format: "markdown" &#125;</div>
              <div className="card-text-muted">→ Extracts actual qualifications & apply forms</div>
            </div>
          </div>

          {/* Card 3: Agent API */}
          <div className="p-6 rounded-2xl inverted-card border shadow-md hover:scale-[1.01] transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-500">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500">Layer 3 • Navigation</span>
              <h3 className="text-lg font-bold mt-1">Autonomous Browser Agent</h3>
              <p className="text-xs card-text-muted font-mono mt-0.5">Goal-Driven Multi-Step Automation</p>
            </div>
            <p className="text-xs card-text-muted leading-relaxed">
              For dynamic career portals requiring interactive navigation, JobAmigo deploys goal-driven autonomous browser agents with JSON output schemas to click filters, paginate listings, and return structured jobs.
            </p>
            <div className="p-3 rounded-xl inverted-card-subtle border text-[11px] font-mono space-y-1">
              <div className="text-yellow-500 font-semibold">POST /run &#123; url, goal, output_schema &#125;</div>
              <div className="card-text-muted">→ Executes autonomous multi-step clicks</div>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Deterministic Matching in Inverted Card Theme */}
        <div className="p-6 sm:p-8 rounded-2xl inverted-card border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-yellow-500">
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
              <span>Deterministic Relevance & Deduplication Engine</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold">
              Zero Guesswork. Transparent scoring for every candidate opening.
            </h4>
            <p className="text-xs card-text-muted leading-relaxed">
              Every job is scored across 4 strict criteria: <strong>Role Similarity (35%)</strong>, <strong>Seniority Alignment (25%)</strong>, <strong>Location Fit (25%)</strong>, and <strong>Keyword Match (15%)</strong>. Canonical URL normalization removes tracking parameters and eliminates duplicate reposts.
            </p>
          </div>

          <a
            href="#search-console"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-neutral-950 font-bold text-xs shrink-0 inline-flex items-center gap-2 shadow-md shadow-yellow-500/20 transition-all hover:scale-[1.02]"
          >
            <span>Try in Search Console</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </Container>
    </section>
  );
}
