import React from 'react';
import { Radar, ExternalLink, GitBranch } from 'lucide-react';
import Container from './container';

export default function LandingFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white py-12 text-xs text-stone-500">
      <Container className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-yellow-400/20 border border-yellow-300 flex items-center justify-center text-yellow-600">
                <Radar className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-stone-900 text-sm">JobAmigo</span>
              <span className="text-stone-300">/</span>
              <span className="text-yellow-600 font-semibold">LaunchRadar</span>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Autonomous job and internship discovery engine delivering verified, rank-stable opportunities directly from top company career portals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-stone-600 font-medium">
            <a href="#workflow" className="hover:text-yellow-700 transition-colors">
              Workflow
            </a>
            <a href="#stats" className="hover:text-yellow-700 transition-colors">
              Metrics
            </a>
            <a href="#preview" className="hover:text-yellow-700 transition-colors">
              Live Preview
            </a>
            <a href="#search-console" className="hover:text-yellow-700 transition-colors">
              Search Console
            </a>
            <a
              href="https://github.com/AsHura-Wnd/JobAmigo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-yellow-700 transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} JobAmigo. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Autonomous Search</span>
            <span>•</span>
            <span>Intelligent Extraction</span>
            <span>•</span>
            <span>Browser Agent</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
