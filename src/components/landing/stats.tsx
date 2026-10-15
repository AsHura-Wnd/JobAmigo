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
      color: 'text-yellow-600',
    },
    {
      label: 'Verified Direct Openings',
      value: '100%',
      sub: 'Zero hallucinated or fake listings',
      icon: CheckCircle,
      color: 'text-amber-600',
    },
    {
      label: 'Rank-Stable Discovery',
      value: '< 3s',
      sub: 'Fast parallel career queries',
      icon: Search,
      color: 'text-yellow-600',
    },
    {
      label: 'Deterministic Score',
      value: '4-Pillar',
      sub: 'Role, Seniority, Location & Skills',
      icon: Globe,
      color: 'text-amber-600',
    },
  ];

  return (
    <section id="stats" className="py-12 border-b border-stone-200/80 dark:border-stone-800 bg-transparent transition-colors">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl inverted-card border shadow-md hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight ${stat.color}`}>
                    {stat.value}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-500">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-semibold text-xs tracking-tight">{stat.label}</div>
                <div className="text-[11px] card-text-muted mt-0.5">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
