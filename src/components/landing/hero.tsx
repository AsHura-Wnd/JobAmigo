'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Layers, ShieldCheck, Search, Globe, Cpu } from 'lucide-react';
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
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/60">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <Container className="text-center relative z-10 space-y-6 max-w-4xl">
        {/* Top Challenge Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-emerald-400">TinyFish × TechnoJam</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Galgotias University Hackathon</span>
        </div>

        {/* Main Headline with Dynamic Role Rotation */}
        <Heading as="h1" variant="big" className="leading-[1.15]">
          Verified tech opportunities for{' '}
          <span className="inline-block relative min-w-[280px] sm:min-w-[360px] text-left transition-all">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 font-black">
              {ROTATING_ROLES[roleIndex]}
            </span>
          </span>
        </Heading>

        {/* Concise Value Proposition */}
        <SubHeading variant="big" className="max-w-2xl mx-auto">
          JobAmigo combines TinyFish's <strong className="text-cyan-300 font-semibold">Search</strong>, <strong className="text-emerald-300 font-semibold">Fetch</strong>, and <strong className="text-purple-300 font-semibold">Agent</strong> infrastructure to discover real openings across top career portals with deterministic matching.
        </SubHeading>

        {/* Prominent CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#search-console"
            onClick={handleScroll}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.03]"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Find opportunities</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>

          <a
            href="#workflow"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>How TinyFish Works</span>
          </a>
        </div>

        {/* Trusted Career Portals Banner */}
        <div className="pt-8 flex flex-col items-center gap-3 text-xs text-slate-500">
          <span className="uppercase tracking-widest text-[10px] font-semibold text-slate-400">
            Real Career Portals Scanned in Real-Time
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-slate-300 text-xs font-medium">
            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">Microsoft Careers</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">Amazon Jobs</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">Wellfound Startups</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">Greenhouse Boards</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">Lever Portals</span>
            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">Dribbble Design</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
