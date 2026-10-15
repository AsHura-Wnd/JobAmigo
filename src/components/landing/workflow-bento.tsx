import React from 'react';
import { Search, Globe, Cpu, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import Container from './container';
import Heading from './heading';
import SubHeading from './subheading';

export default function WorkflowBento() {
  return (
    <section id="workflow" className="py-16 md:py-24 border-b border-slate-800/60">
      <Container className="space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Workflow</span>
          </div>
          <Heading variant="big">
            How TinyFish Powers JobAmigo
          </Heading>
          <SubHeading variant="big">
            A three-tier autonomous pipeline that discovers, renders, inspects, and scores opportunities directly from verified company career portals.
          </SubHeading>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Search API */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Layer 1 • Discovery</span>
              <h3 className="text-lg font-bold text-white mt-1">TinyFish Search API</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">api.search.tinyfish.ai</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of querying stale job aggregators, JobAmigo issues rank-stable, structured web search queries targeting authentic career sites like Microsoft Careers, Amazon Jobs, and Wellfound with location and seniority context.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="text-cyan-400">GET /?query=site:amazon.jobs "Intern" India</div>
              <div className="text-slate-500">→ Returns real titles, verified URLs & snippets</div>
            </div>
          </div>

          {/* Card 2: Fetch API */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Layer 2 • Extraction</span>
              <h3 className="text-lg font-bold text-white mt-1">TinyFish Fetch API</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">api.fetch.tinyfish.ai</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modern career boards are heavy Single Page Applications with client-side rendering. TinyFish Fetch dispatches a managed Chromium fleet to render the live DOM, strip noise (navbars, banners, ads), and return clean Markdown.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="text-emerald-400">POST / &#123; urls: [...], format: "markdown" &#125;</div>
              <div className="text-slate-500">→ Extracts actual qualifications & apply forms</div>
            </div>
          </div>

          {/* Card 3: Agent API */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 hover:border-purple-500/40 transition-all space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Layer 3 • Navigation</span>
              <h3 className="text-lg font-bold text-white mt-1">TinyFish Agent API</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">agent.tinyfish.ai/v1/automation/run</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              For dynamic career portals requiring interactive navigation, JobAmigo deploys goal-driven autonomous browser agents with JSON output schemas to click filters, paginate listings, and return structured jobs.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="text-purple-400">POST /run &#123; url, goal, output_schema &#125;</div>
              <div className="text-slate-500">→ Executes autonomous multi-step clicks</div>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Deterministic Matching */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Deterministic Relevance & Deduplication Engine</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Zero Guesswork. Transparent scoring for every candidate opening.
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every job is scored across 4 strict criteria: <strong>Role Similarity (35%)</strong>, <strong>Seniority Alignment (25%)</strong>, <strong>Location Fit (25%)</strong>, and <strong>Keyword Match (15%)</strong>. Canonical URL normalization removes tracking parameters and eliminates duplicate reposts.
            </p>
          </div>

          <a
            href="#search-console"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700 shrink-0 inline-flex items-center gap-2 transition-colors"
          >
            <span>Try in Search Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
