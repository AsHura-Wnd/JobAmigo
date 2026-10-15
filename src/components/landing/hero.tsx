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
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-yellow-900/20">
      {/* Warm Banana Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-yellow-500/20 via-amber-400/15 to-yellow-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Warm Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fde047 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <Container className="text-center relative z-10 space-y-6 max-w-4xl">
        {/* Top Product Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17180f] border border-yellow-700/60 text-xs text-yellow-300 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <span className="font-semibold text-yellow-400">Autonomous Radar Engine</span>
          <span className="text-yellow-700">•</span>
          <span className="text-yellow-200/70">Live Job & Internship Discovery</span>
        </div>

        {/* Main Headline with Dynamic Role Rotation */}
        <Heading as="h1" variant="big" className="leading-[1.15]">
          Verified tech opportunities for{' '}
          <span className="inline-block relative min-w-[280px] sm:min-w-[360px] text-left transition-all">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 font-black">
              {ROTATING_ROLES[roleIndex]}
            </span>
          </span>
        </Heading>

        {/* Concise Value Proposition */}
        <SubHeading variant="big" className="max-w-2xl mx-auto text-stone-300">
          JobAmigo combines autonomous <strong className="text-yellow-300 font-semibold">Search</strong>, <strong className="text-amber-300 font-semibold">DOM Extraction</strong>, and <strong className="text-yellow-400 font-semibold">Browser Agent</strong> infrastructure to discover real openings across top career portals with deterministic matching.
        </SubHeading>

        {/* Prominent Banana CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#search-console"
            onClick={handleScroll}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/25 transition-all hover:scale-[1.03]"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Find opportunities</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>

          <a
            href="#workflow"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#14150e] hover:bg-[#1e2014] border border-yellow-900/40 text-yellow-100 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Layers className="w-4 h-4 text-yellow-400" />
            <span>How It Works</span>
          </a>
        </div>

        {/* Trusted Career Portals Banner */}
        <div className="pt-8 flex flex-col items-center gap-3 text-xs text-yellow-200/50">
          <span className="uppercase tracking-widest text-[10px] font-semibold text-yellow-400/70">
            Real Career Portals Scanned in Real-Time
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-stone-300 text-xs font-medium">
            <span className="px-3 py-1 rounded-lg bg-[#14150e] border border-yellow-900/40 hover:border-yellow-700/60 transition-colors">Microsoft Careers</span>
            <span className="px-3 py-1 rounded-lg bg-[#14150e] border border-yellow-900/40 hover:border-yellow-700/60 transition-colors">Amazon Jobs</span>
            <span className="px-3 py-1 rounded-lg bg-[#14150e] border border-yellow-900/40 hover:border-yellow-700/60 transition-colors">Wellfound Startups</span>
            <span className="px-3 py-1 rounded-lg bg-[#14150e] border border-yellow-900/40 hover:border-yellow-700/60 transition-colors">Greenhouse Boards</span>
            <span className="px-3 py-1 rounded-lg bg-[#14150e] border border-yellow-900/40 hover:border-yellow-700/60 transition-colors">Lever Portals</span>
            <span className="px-3 py-1 rounded-lg bg-[#14150e] border border-yellow-900/40 hover:border-yellow-700/60 transition-colors">Dribbble Design</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
