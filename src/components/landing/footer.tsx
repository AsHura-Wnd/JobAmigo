import React from 'react';
import { Radar, ExternalLink, GitBranch } from 'lucide-react';
import Container from './container';

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-500">
      <Container className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Radar className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white text-sm">JobAmigo</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-400 font-medium">LaunchRadar</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Autonomous job and internship discovery engine built for the TinyFish × TechnoJam challenge at Galgotias University.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-medium">
            <a href="#workflow" className="hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#stats" className="hover:text-white transition-colors">
              Metrics
            </a>
            <a href="#preview" className="hover:text-white transition-colors">
              Live Preview
            </a>
            <a href="#search-console" className="hover:text-white transition-colors">
              Search Console
            </a>
            <a
              href="https://github.com/AsHura-Wnd/JobAmigo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://agent.tinyfish.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>TinyFish.ai</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} JobAmigo. Built for TinyFish × TechnoJam @ Galgotias University.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>TinyFish Search</span>
            <span>•</span>
            <span>TinyFish Fetch</span>
            <span>•</span>
            <span>TinyFish Agent</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
