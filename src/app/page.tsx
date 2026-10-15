'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  Search, 
  MapPin, 
  Briefcase, 
  Code, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Layers, 
  Terminal, 
  Clock, 
  ArrowRight,
  Filter,
  Key,
  X,
  ChevronDown,
  ChevronUp,
  Palette
} from 'lucide-react';
import { JobListing, SearchPreferences, SeniorityLevel } from '@/lib/types';
import LandingNavbar from '@/components/landing/navbar';
import LandingHero from '@/components/landing/hero';
import LandingStats from '@/components/landing/stats';
import WorkflowBento from '@/components/landing/workflow-bento';
import LivePreview from '@/components/landing/live-preview';
import LandingFooter from '@/components/landing/footer';

export default function LaunchRadarDashboard() {
  const [role, setRole] = useState('Software Engineer Intern');
  const [location, setLocation] = useState('India');
  const [seniority, setSeniority] = useState<SeniorityLevel>('Internship');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['Python', 'Java', 'AI Agents', 'Backend']);
  const [apiKey, setApiKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Search execution state
  const [loading, setLoading] = useState(false);
  const [progressStage, setProgressStage] = useState<'idle' | 'searching' | 'agent' | 'fetching' | 'matching'>('idle');
  const [results, setResults] = useState<JobListing[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [stats, setStats] = useState<{ totalDiscovered: number; deduplicatedCount: number; executionTimeMs: number } | null>(null);
  const [stages, setStages] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedListingId, setExpandedListingId] = useState<string | null>(null);

  // Diagnostics test states
  const [diagResults, setDiagResults] = useState<{ [key: string]: any }>({});
  const [diagTesting, setDiagTesting] = useState<{ [key: string]: boolean }>({});

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const triggerSearch = async () => {
    setLoading(true);
    setError(null);
    setProgressStage('searching');

    try {
      const payload = {
        role,
        location,
        seniority,
        keywords,
        apiKey: apiKey.trim()
      };

      const res = await fetch('/api/jobs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to complete job discovery pipeline');
      }

      setResults(data.results || []);
      setSources(data.stats?.sourcesSearched || []);
      setStats({
        totalDiscovered: data.stats?.totalDiscovered || 0,
        deduplicatedCount: data.stats?.deduplicatedCount || 0,
        executionTimeMs: data.stats?.executionTimeMs || 0
      });
      setStages(data.stages || null);
    } catch (err: any) {
      setError(err.message || 'Network error executing pipeline');
    } finally {
      setLoading(false);
      setProgressStage('idle');
    }
  };

  const runDiagnostic = async (endpoint: 'search' | 'fetch' | 'agent') => {
    setDiagTesting(prev => ({ ...prev, [endpoint]: true }));
    try {
      const res = await fetch('/api/tinyfish/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim(), endpoint })
      });
      const data = await res.json();
      setDiagResults(prev => ({ ...prev, [endpoint]: data }));
    } catch (err: any) {
      setDiagResults(prev => ({ ...prev, [endpoint]: { error: err.message } }));
    } finally {
      setDiagTesting(prev => ({ ...prev, [endpoint]: false }));
    }
  };

  return (
    <div className="min-h-screen text-stone-900 flex flex-col bg-white">
      {/* Landing Navbar */}
      <LandingNavbar
        onOpenDiagnostics={() => setShowDiagnostics(true)}
        onOpenKeyModal={() => setShowKeyModal(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Hero Section */}
      <LandingHero
        onFindOpportunities={() => {
          const el = document.getElementById('search-console');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Key Metrics */}
      <LandingStats />

      {/* Workflow & Architecture Bento */}
      <WorkflowBento />

      {/* Live Backend Results Stream Preview */}
      <LivePreview
        onSelectRole={(r) => {
          setRole(r);
          const el = document.getElementById('search-console');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Interactive Search Console Section */}
      <main id="search-console" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8 scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs font-semibold">
            <Radar className="w-3.5 h-3.5 text-yellow-600" />
            <span>Interactive Radar Search Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Launch Your Custom Search
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Configure your target domain, location, and required tech skills to dispatch autonomous search, agent navigation, and DOM fetch across authentic company career portals.
          </p>
        </div>

        {/* Preferences & Search Bar */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-md shadow-stone-200/50 space-y-6">
          
          {/* Quick Track Selectors */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-stone-200 text-xs">
            <span className="text-stone-500 font-semibold shrink-0 text-[11px] uppercase tracking-wider">Quick Tracks:</span>
            <button
              type="button"
              onClick={() => {
                setRole('UI/UX Designer Intern');
                setKeywords(['Figma', 'UI/UX', 'Wireframing', 'Design Systems', 'User Research']);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                role.toLowerCase().includes('ui') || role.toLowerCase().includes('ux') || role.toLowerCase().includes('design')
                  ? 'border-amber-400 bg-amber-50 text-amber-900 shadow-sm'
                  : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              <span>UI/UX & Product Design</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('Software Engineer Intern');
                setKeywords(['Python', 'Java', 'AI Agents', 'Backend']);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                role === 'Software Engineer Intern'
                  ? 'border-yellow-400 bg-yellow-50 text-yellow-900 shadow-sm'
                  : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-yellow-600" />
              <span>Software Engineering</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('AI/ML Intern');
                setKeywords(['Python', 'PyTorch', 'LLMs', 'Computer Vision']);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                role === 'AI/ML Intern'
                  ? 'border-yellow-400 bg-yellow-50 text-yellow-900 shadow-sm'
                  : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-yellow-600" />
              <span>AI & Machine Learning</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Role Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-yellow-600" />
                <span>Target Role</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. UI/UX Designer Intern, Product Designer"
                className="w-full bg-stone-50/60 border border-stone-200 focus:border-yellow-400 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['UI/UX Designer Intern', 'Product Designer Intern', 'Software Engineer Intern', 'AI/ML Intern', 'UX Researcher'].map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      if (r.toLowerCase().includes('design') || r.toLowerCase().includes('ux')) {
                        setKeywords(['Figma', 'UI/UX', 'Wireframing', 'Design Systems', 'User Research']);
                      }
                    }}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Location</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. India, Bengaluru, Remote"
                className="w-full bg-stone-50/60 border border-stone-200 focus:border-yellow-400 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['India', 'Bengaluru', 'Remote', 'Hyderabad', 'Delhi NCR'].map(l => (
                  <button
                    key={l}
                    onClick={() => setLocation(l)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 transition-colors"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Seniority Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-yellow-600" />
                <span>Seniority Level</span>
              </label>
              <select
                value={seniority}
                onChange={e => setSeniority(e.target.value as SeniorityLevel)}
                className="w-full bg-stone-50/60 border border-stone-200 focus:border-yellow-400 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
              >
                <option value="Internship">Internship (College & Undergrad)</option>
                <option value="Entry Level">Entry Level (0-2 years)</option>
                <option value="Fresher">Fresher (Campus Graduate)</option>
                <option value="All">All Opportunities</option>
              </select>
              <p className="text-[10px] text-stone-500 pt-1">
                Filters out experienced mid/senior roles automatically.
              </p>
            </div>
          </div>

          {/* Keywords & Action Row */}
          <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-stone-200">
            <div className="w-full md:w-2/3 space-y-2">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-yellow-600" />
                <span>Keywords & Tech Stack ({keywords.length})</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex flex-wrap items-center gap-1.5 p-2 bg-stone-50/60 border border-stone-200 rounded-xl min-h-[42px]">
                  {keywords.map(kw => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-yellow-100 text-yellow-900 border border-yellow-300 font-medium"
                    >
                      <span>{kw}</span>
                      <button
                        onClick={() => handleRemoveKeyword(kw)}
                        className="text-stone-400 hover:text-red-500 ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={e => setKeywordInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder={keywords.length === 0 ? "Type skill & hit Enter (e.g. PyTorch)..." : "Add keyword..."}
                    className="bg-transparent text-xs text-stone-900 placeholder-stone-400 focus:outline-none flex-1 min-w-[120px] px-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-3 py-2 bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-xs rounded-xl text-yellow-900 font-semibold transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-stone-500">Suggested:</span>
                {(role.toLowerCase().includes('design') || role.toLowerCase().includes('ux') || role.toLowerCase().includes('ui')
                  ? ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research', 'Adobe XD']
                  : ['Python', 'Java', 'AI Agents', 'Backend', 'React', 'Docker', 'PyTorch']
                ).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      if (!keywords.includes(s)) {
                        setKeywords([...keywords, s]);
                      }
                    }}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-stone-200 hover:border-stone-300 text-stone-600 hover:text-stone-900 transition-colors shadow-2xs"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-auto flex items-center gap-3 self-end">
              <button
                onClick={triggerSearch}
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/25 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Launch Radar Search</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Active Pipeline Progress Tracker */}
          {loading && (
            <div className="p-4 rounded-xl bg-yellow-50/50 border border-yellow-200 animate-pulse space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-yellow-800 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Running Autonomous Discovery Pipeline...
                </span>
                <span className="text-stone-500">Targeting {sources.length || 5} career portals</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-white border border-yellow-200 text-stone-800 shadow-xs">
                  <div className="font-bold text-yellow-800">1. Web Discovery</div>
                  <div className="text-[10px] text-stone-500">Querying live SERP</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-yellow-200 text-stone-800 shadow-xs">
                  <div className="font-bold text-amber-800">2. Autonomous Agent</div>
                  <div className="text-[10px] text-stone-500">Autonomous portal run</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-yellow-200 text-stone-800 shadow-xs">
                  <div className="font-bold text-yellow-800">3. DOM Fetch</div>
                  <div className="text-[10px] text-stone-500">Extracting DOM text</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-stone-200 text-stone-800 shadow-xs">
                  <div className="font-bold text-stone-700">4. Deterministic Match</div>
                  <div className="text-[10px] text-stone-500">Scoring & deduping</div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Diagnostics Drawer (Collapsible) */}
        {showDiagnostics && (
          <section className="bg-white border border-yellow-300 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-yellow-600" />
                <h3 className="font-bold text-sm text-stone-900">Live Endpoint Diagnostics</h3>
              </div>
              <button
                onClick={() => setShowDiagnostics(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-stone-600">
              Directly verify the live response and HTTP contracts for all three autonomous search API primitives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Test Search */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-yellow-700">api.search.tinyfish.ai</span>
                  <button
                    onClick={() => runDiagnostic('search')}
                    disabled={diagTesting.search}
                    className="text-[10px] px-2 py-1 rounded bg-yellow-100 border border-yellow-300 text-yellow-900 hover:bg-yellow-200 transition-colors font-medium"
                  >
                    {diagTesting.search ? 'Testing...' : 'Test Search'}
                  </button>
                </div>
                <div className="text-[11px] text-stone-700 font-mono overflow-x-auto bg-white border border-stone-200 p-2 rounded max-h-28">
                  {diagResults.search ? JSON.stringify(diagResults.search, null, 2) : 'Click Test Search to query endpoint'}
                </div>
              </div>

              {/* Test Fetch */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-amber-700">api.fetch.tinyfish.ai</span>
                  <button
                    onClick={() => runDiagnostic('fetch')}
                    disabled={diagTesting.fetch}
                    className="text-[10px] px-2 py-1 rounded bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200 transition-colors font-medium"
                  >
                    {diagTesting.fetch ? 'Testing...' : 'Test Fetch'}
                  </button>
                </div>
                <div className="text-[11px] text-stone-700 font-mono overflow-x-auto bg-white border border-stone-200 p-2 rounded max-h-28">
                  {diagResults.fetch ? JSON.stringify(diagResults.fetch, null, 2) : 'Click Test Fetch to render URL'}
                </div>
              </div>

              {/* Test Agent */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-yellow-700">agent.tinyfish.ai</span>
                  <button
                    onClick={() => runDiagnostic('agent')}
                    disabled={diagTesting.agent}
                    className="text-[10px] px-2 py-1 rounded bg-yellow-100 border border-yellow-300 text-yellow-900 hover:bg-yellow-200 transition-colors font-medium"
                  >
                    {diagTesting.agent ? 'Testing...' : 'Test Agent'}
                  </button>
                </div>
                <div className="text-[11px] text-stone-700 font-mono overflow-x-auto bg-white border border-stone-200 p-2 rounded max-h-28">
                  {diagResults.agent ? JSON.stringify(diagResults.agent, null, 2) : 'Click Test Agent to run browser goal'}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results Metadata Bar */}
        {(stats || error) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-stone-900">
                Found <span className="text-yellow-700 font-bold">{results.length}</span> verified listings
              </span>
              {stats && (
                <>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-600">
                    Discovered: {stats.totalDiscovered} ({stats.deduplicatedCount} duplicates filtered)
                  </span>
                  <span className="text-stone-300 hidden md:inline">•</span>
                  <span className="text-stone-600 hidden md:inline">
                    Latency: {stats.executionTimeMs}ms
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-stone-600 text-[11px]">
              <span>Sources:</span>
              {(sources.length > 0 ? sources : ['Microsoft', 'Amazon', 'Wellfound', 'Greenhouse']).map(s => (
                <span key={s} className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-amber-900">Discovery Engine Notice</div>
              <div>{error}</div>
              <div className="text-[11px] text-amber-800 pt-1">
                Tip: Click <strong>"Configure Engine Key"</strong> above to enter your key or add it to <code className="bg-amber-100 px-1 py-0.5 rounded">.env.local</code>.
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && !error && (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-stone-300 bg-stone-50/60 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center text-yellow-700">
              <Radar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-stone-900">Ready to Scan Career Portals</h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Configure your target role, preferred city or remote status, and skills above, then click Launch Radar Search.
              </p>
            </div>
            <button
              onClick={triggerSearch}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 text-xs font-bold rounded-xl inline-flex items-center gap-2 shadow-md shadow-yellow-500/20 transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Run Initial Search</span>
            </button>
          </div>
        )}

        {/* Results List */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <span>Ranked Matches</span>
                <span className="text-[10px] font-normal normal-case px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                  Deterministic relevance scoring
                </span>
              </h2>
              <button
                onClick={triggerSearch}
                className="text-xs text-stone-600 hover:text-yellow-700 flex items-center gap-1 transition-colors font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {results.map((job) => {
                const isExpanded = expandedListingId === job.id;
                const scoreColor =
                  job.matchScore >= 80
                    ? 'text-yellow-900 border-yellow-300 bg-yellow-100'
                    : job.matchScore >= 60
                    ? 'text-amber-900 border-amber-300 bg-amber-100'
                    : 'text-stone-800 border-stone-300 bg-stone-100';

                return (
                  <article
                    key={job.id}
                    className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-yellow-400 hover:shadow-lg transition-all shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Left Title & Company */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-base text-stone-900 hover:text-yellow-700 transition-colors">
                            {job.title}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-medium">
                            {job.employmentType}
                          </span>
                          {job.provenance.verifiedViaFetch && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-50 border border-yellow-300 text-yellow-800 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5 text-yellow-600" />
                              <span>Live Portal Verified</span>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                          <span className="font-semibold text-stone-800">{job.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-yellow-600" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3 text-yellow-600" />
                            {job.sourceWebsite}
                          </span>
                          {job.postedDate && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-yellow-600" />
                                {job.postedDate}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Match Score & Actions */}
                      <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0">
                        <div className={`px-3 py-1 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${scoreColor}`}>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{job.matchScore}% Match</span>
                        </div>
                        <a
                          href={job.directApplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>Apply Directly</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {job.shortDescription}
                    </p>

                    {/* Skills & Match Explanation Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-stone-500 mr-1">Skills:</span>
                        {job.requiredSkills.map(skill => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setExpandedListingId(isExpanded ? null : job.id)}
                        className="text-[11px] text-yellow-700 hover:text-yellow-800 flex items-center gap-1 transition-colors font-semibold"
                      >
                        <span>{isExpanded ? 'Hide Match Reasons' : 'Why this matches'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Expanded Match Breakdown */}
                    {isExpanded && (
                      <div className="mt-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                        <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-600" />
                          <span>Deterministic Match Breakdown ({job.matchScore} / 100)</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-stone-600 pl-5 list-disc">
                          {job.matchExplanation.reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                        <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] text-stone-500 font-mono">
                          <div>Role: {job.matchExplanation.roleScore}/35</div>
                          <div>Location: {job.matchExplanation.locationScore}/25</div>
                          <div>Seniority: {job.matchExplanation.seniorityScore}/25</div>
                          <div>Keywords: {job.matchExplanation.keywordScore}/15</div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-base text-stone-900">Configure Engine API Key</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Enter your API credentials to power live autonomous search and browser fetch. Your key is stored solely in memory for your session and never logged or exposed.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700">
                X-API-Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="tf_live_..."
                className="w-full bg-stone-50 border border-stone-200 focus:border-yellow-400 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 font-mono"
              />
            </div>

            <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-[11px] text-stone-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <span>
                Alternatively, you can set <code className="text-stone-900 font-semibold">TINYFISH_API_KEY</code> in <code className="text-stone-900 font-semibold">.env.local</code> in the workspace.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 text-xs font-bold shadow-md shadow-yellow-500/20 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Landing Footer */}
      <LandingFooter />
    </div>
  );
}
