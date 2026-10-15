'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Layers, Search, Banana } from 'lucide-react';
import Container from './container';
import Heading from './heading';
import SubHeading from './subheading';

const ROTATING_ROLES = [
  'UI/UX Designers',
  'Software Engineer Interns',
  'AI/ML Engineers',
  'Backend Developers',
  'College Freshers'
];

export default function LandingHero({
  onFindOpportunities
}: {
  onFindOpportunities?: () => void;
}) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROTATING_ROLES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onFindOpportunities) {
      onFindOpportunities();
    } else {
      const el = document.getElementById('search-console');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-yellow-100 bg-white">
      {/* Warm Banana Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-yellow-200/50 via-amber-100/40 to-yellow-300/30 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Warm Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #eab308 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <Container className="text-center relative z-10 space-y-6 max-w-4xl">
        {/* Top Product Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-300 text-xs text-yellow-900 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
          <span className="font-semibold text-yellow-900">Autonomous Radar Engine</span>
          <span className="text-yellow-600">•</span>
          <span className="text-yellow-700">Live Job & Internship Discovery</span>
        </div>

        {/* Main Headline with Dynamic Role Rotation */}
        <Heading as="h1" variant="big" className="leading-[1.15]">
          Verified tech opportunities for{' '}
          <span className="inline-block relative min-w-[280px] sm:min-w-[360px] text-left transition-all">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 font-black">
              {ROTATING_ROLES[roleIndex]}
            </span>
          </span>
        </Heading>

        {/* Concise Value Proposition */}
        <SubHeading variant="big" className="max-w-2xl mx-auto text-stone-600">
          JobAmigo combines autonomous <strong className="text-yellow-800 font-semibold">Search</strong>, <strong className="text-amber-800 font-semibold">DOM Extraction</strong>, and <strong className="text-yellow-800 font-semibold">Browser Agent</strong> infrastructure to discover real openings across top career portals with deterministic matching.
        </SubHeading>

        {/* Prominent Banana CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#search-console"
            onClick={handleScroll}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/25 transition-all hover:scale-[1.03]"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Find opportunities</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>

          <a
            href="#workflow"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-yellow-50 border border-stone-200 hover:border-yellow-300 text-stone-800 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Layers className="w-4 h-4 text-yellow-600" />
            <span>How It Works</span>
          </a>
        </div>

        {/* Trusted Career Portals Banner */}
        <div className="pt-8 flex flex-col items-center gap-3 text-xs text-stone-500">
          <span className="uppercase tracking-widest text-[10px] font-semibold text-stone-600">
            Real Career Portals Scanned in Real-Time
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-stone-700 text-xs font-medium">
            <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 hover:border-yellow-400 shadow-sm transition-colors">Microsoft Careers</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 hover:border-yellow-400 shadow-sm transition-colors">Amazon Jobs</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 hover:border-yellow-400 shadow-sm transition-colors">Wellfound Startups</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 hover:border-yellow-400 shadow-sm transition-colors">Greenhouse Boards</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 hover:border-yellow-400 shadow-sm transition-colors">Lever Portals</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-stone-200 hover:border-yellow-400 shadow-sm transition-colors">Dribbble Design</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
