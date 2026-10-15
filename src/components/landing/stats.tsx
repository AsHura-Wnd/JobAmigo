import React from 'react';
import { Search, Globe, Cpu, CheckCircle } from 'lucide-react';
import Container from './container';

export default function LandingStats() {
  const stats = [
    {
      label: 'TinyFish Core Primitives',
      value: '3',
      sub: 'Search, Fetch & Autonomous Agent',
      icon: Cpu,
      color: 'text-cyan-400',
    },
    {
      label: 'Verified Direct Openings',
      value: '100%',
      sub: 'Zero hallucinated or fake listings',
      icon: CheckCircle,
      color: 'text-emerald-400',
    },
    {
      label: 'Rank-Stable Discovery',
      value: '< 3s',
      sub: 'Fast parallel career queries',
      icon: Search,
      color: 'text-purple-400',
    },
    {
      label: 'Deterministic Score',
      value: '4-Pillar',
      sub: 'Role, Seniority, Location & Skills',
      icon: Globe,
      color: 'text-yellow-400',
    },
  ];

  return (
    <section id="stats" className="py-12 border-b border-slate-800/60 bg-slate-950/40">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight ${stat.color}`}>
                    {stat.value}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-semibold text-xs text-slate-200">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
