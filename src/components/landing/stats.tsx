import React from 'react';
import { Search, Globe, Cpu, CheckCircle } from 'lucide-react';
import Container from './container';

export default function LandingStats() {
  const stats = [
    {
      label: 'Core Pipeline Primitives',
      value: '3',
      sub: 'Search, Fetch & Autonomous Agent',
      icon: Cpu,
      color: 'text-yellow-400',
    },
    {
      label: 'Verified Direct Openings',
      value: '100%',
      sub: 'Zero hallucinated or fake listings',
      icon: CheckCircle,
      color: 'text-amber-300',
    },
    {
      label: 'Rank-Stable Discovery',
      value: '< 3s',
      sub: 'Fast parallel career queries',
      icon: Search,
      color: 'text-yellow-300',
    },
    {
      label: 'Deterministic Score',
      value: '4-Pillar',
      sub: 'Role, Seniority, Location & Skills',
      icon: Globe,
      color: 'text-amber-400',
    },
  ];

  return (
    <section id="stats" className="py-12 border-b border-yellow-900/20 bg-[#0d0e09]/60">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#14150e]/80 border border-yellow-900/30 hover:border-yellow-600/50 transition-all backdrop-blur-sm shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight ${stat.color}`}>
                    {stat.value}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-yellow-950/40 border border-yellow-900/40 flex items-center justify-center text-yellow-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-semibold text-xs text-stone-200">{stat.label}</div>
                <div className="text-[11px] text-yellow-200/50 mt-0.5">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
