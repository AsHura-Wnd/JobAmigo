'use client';

import React, { useState } from 'react';
import { Radar, ArrowRight, Cpu, Menu, X, GitBranch } from 'lucide-react';
import Container from './container';

export default function LandingNavbar({
  onOpenDiagnostics,
  onOpenKeyModal,
  hasApiKey
}: {
  onOpenDiagnostics?: () => void;
  onOpenKeyModal?: () => void;
  hasApiKey?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('search-console');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Radar className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  JobAmigo
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                  LaunchRadar
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                TinyFish Autonomous Web Retrieval
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#workflow" className="hover:text-cyan-400 transition-colors">
              How It Works
            </a>
            <a href="#stats" className="hover:text-cyan-400 transition-colors">
              Metrics
            </a>
            <a href="#preview" className="hover:text-cyan-400 transition-colors">
              Live Preview
            </a>
            <a href="#search-console" onClick={scrollToSearch} className="hover:text-cyan-400 transition-colors">
              Search Console
            </a>
            {onOpenDiagnostics && (
              <button
                onClick={onOpenDiagnostics}
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Diagnostics</span>
              </button>
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/AsHura-Wnd/JobAmigo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-colors"
              title="View on GitHub"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" />
            </a>

            {onOpenKeyModal && (
              <button
                onClick={onOpenKeyModal}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  hasApiKey
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                }`}
              >
                {hasApiKey ? 'Key Active' : 'API Key'}
              </button>
            )}

            <a
              href="#search-console"
              onClick={scrollToSearch}
              className="text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Find opportunities</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-3 text-sm">
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 py-1"
            >
              How It Works
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 py-1"
            >
              Live Preview
            </a>
            <a
              href="#search-console"
              onClick={scrollToSearch}
              className="block text-slate-300 hover:text-cyan-400 py-1 font-semibold"
            >
              Search Console
            </a>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#search-console"
                onClick={scrollToSearch}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-xs"
              >
                Find opportunities
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
