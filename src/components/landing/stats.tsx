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
    <section id="stats" className="py-12 border-b border-yellow-100 bg-yellow-50/40">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-yellow-200 hover:border-yellow-400 hover:shadow-md transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight ${stat.color}`}>
                    {stat.value}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 border border-yellow-300 flex items-center justify-center text-yellow-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-semibold text-xs text-stone-900">{stat.label}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
