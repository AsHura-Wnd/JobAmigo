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
    <header className="border-b border-yellow-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm shadow-yellow-500/5">
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center shadow-md shadow-yellow-500/25 group-hover:scale-105 transition-transform">
              <Radar className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-stone-900 group-hover:text-yellow-600 transition-colors">
                  JobAmigo
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-800">
                  Banana Radar
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Autonomous AI Job Discovery
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
            <a href="#workflow" className="hover:text-yellow-600 transition-colors">
              How It Works
            </a>
            <a href="#stats" className="hover:text-yellow-600 transition-colors">
              Metrics
            </a>
            <a href="#preview" className="hover:text-yellow-600 transition-colors">
              Live Preview
            </a>
            <a href="#search-console" onClick={scrollToSearch} className="hover:text-yellow-600 transition-colors">
              Search Console
            </a>
            {onOpenDiagnostics && (
              <button
                onClick={onOpenDiagnostics}
                className="hover:text-yellow-600 flex items-center gap-1 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-yellow-600" />
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
              className="p-2 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
              title="View on GitHub"
            >
              <GitBranch className="w-4 h-4 text-yellow-600" />
            </a>

            {onOpenKeyModal && (
              <button
                onClick={onOpenKeyModal}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  hasApiKey
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-900 shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-yellow-300'
                }`}
              >
                {hasApiKey ? 'Key Active' : 'API Key'}
              </button>
            )}

            <a
              href="#search-console"
              onClick={scrollToSearch}
              className="text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-neutral-950 font-bold flex items-center gap-1.5 shadow-md shadow-yellow-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Find opportunities</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:text-stone-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-yellow-100 py-4 space-y-3 text-sm bg-white">
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-600 hover:text-yellow-600 py-1"
            >
              How It Works
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-600 hover:text-yellow-600 py-1"
            >
              Live Preview
            </a>
            <a
              href="#search-console"
              onClick={scrollToSearch}
              className="block text-stone-600 hover:text-yellow-600 py-1 font-semibold"
            >
              Search Console
            </a>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#search-console"
                onClick={scrollToSearch}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-neutral-950 font-bold text-xs"
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
