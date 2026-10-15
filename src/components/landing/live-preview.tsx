'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, MapPin, Globe, Clock, CheckCircle2, RefreshCw, ArrowRight, Briefcase } from 'lucide-react';
import Container from './container';
import Heading from './heading';
import SubHeading from './subheading';
import { JobListing } from '@/lib/types';

export default function LivePreview({
  onSelectRole
}: {
  onSelectRole?: (role: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'software' | 'design' | 'aiml'>('software');
  const [listings, setListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveSample = async (tab: 'software' | 'design' | 'aiml') => {
    setLoading(true);
    setError(null);

    const queryPayload = 
      tab === 'design'
        ? { role: 'UI/UX Designer Intern', location: 'India', seniority: 'Internship', keywords: ['Figma', 'UI/UX'] }
        : tab === 'aiml'
        ? { role: 'AI/ML Intern', location: 'India', seniority: 'Internship', keywords: ['Python', 'PyTorch'] }
        : { role: 'Software Engineer Intern', location: 'India', seniority: 'Internship', keywords: ['Python', 'Java'] };

    try {
      const res = await fetch('/api/jobs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryPayload)
      });
      const data = await res.json();
      if (res.ok && data.results && data.results.length > 0) {
        setListings(data.results.slice(0, 3));
      } else {
        setError(data.error || 'No live listings found for this category');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch live preview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveSample(activeTab);
  }, [activeTab]);

  return (
    <section id="preview" className="py-16 md:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-transparent transition-colors">
      <Container className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-950/70 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
              <span>Live Backend Stream</span>
            </div>
            <Heading variant="medium">Real Openings Discovered Live</Heading>
            <SubHeading>
              Live preview fetched directly from our backend pipeline across verified portals. Zero fabricated records.
            </SubHeading>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 inverted-card-subtle border rounded-xl self-start md:self-auto text-xs">
            <button
              onClick={() => setActiveTab('software')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'software'
                  ? 'bg-yellow-400 text-stone-950 font-bold shadow-sm'
                  : 'card-text-muted hover:text-yellow-500'
              }`}
            >
              Software Eng
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'design'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'card-text-muted hover:text-amber-500'
              }`}
            >
              UI/UX Design
            </button>
            <button
              onClick={() => setActiveTab('aiml')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'aiml'
                  ? 'bg-yellow-300 text-stone-950 font-bold shadow-sm'
                  : 'card-text-muted hover:text-yellow-500'
              }`}
            >
              AI & ML
            </button>
          </div>
        </div>

        {/* Live Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl inverted-card border animate-pulse space-y-4 shadow-md"
              >
                <div className="h-4 bg-stone-700 dark:bg-stone-200 rounded w-3/4" />
                <div className="h-3 bg-stone-700 dark:bg-stone-200 rounded w-1/2" />
                <div className="h-16 bg-stone-800 dark:bg-stone-100 rounded" />
                <div className="h-8 bg-stone-700 dark:bg-stone-200 rounded" />
              </div>
            ))
          ) : error || listings.length === 0 ? (
            <div className="col-span-3 p-8 text-center rounded-2xl inverted-card border space-y-3 shadow-md">
              <p className="text-xs card-text-muted">
                {error || 'No listings found. Use the Search Console below to query live career portals.'}
              </p>
              <button
                onClick={() => fetchLiveSample(activeTab)}
                className="text-xs px-3 py-1.5 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/40 text-yellow-400 dark:bg-yellow-50 dark:hover:bg-yellow-100 dark:border-yellow-300 dark:text-yellow-900 inline-flex items-center gap-1.5 transition-colors font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Fetch</span>
              </button>
            </div>
          ) : (
            listings.map((job) => {
              const scoreColor =
                job.matchScore >= 80
                  ? 'text-yellow-400 border-yellow-500/40 bg-yellow-400/10 dark:text-yellow-900 dark:border-yellow-300 dark:bg-yellow-100'
                  : 'text-amber-400 border-amber-500/40 bg-amber-400/10 dark:text-amber-900 dark:border-amber-300 dark:bg-amber-100';

              return (
                <div
                  key={job.id}
                  className="p-6 rounded-2xl inverted-card border hover:scale-[1.01] transition-all flex flex-col justify-between space-y-4 shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full inverted-card-subtle border text-xs">
                        {job.employmentType}
                      </span>
                      <div className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 ${scoreColor}`}>
                        <Sparkles className="w-3 h-3" />
                        <span>{job.matchScore}% Match</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm line-clamp-1 hover:text-yellow-500 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-xs font-semibold card-text-muted mt-0.5">{job.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] card-text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-yellow-500" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-yellow-500" />
                        {job.sourceWebsite}
                      </span>
                    </div>

                    <p className="text-xs card-text-muted line-clamp-3 leading-relaxed">
                      {job.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {job.requiredSkills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-[10px] px-2 py-0.5 rounded inverted-card-subtle border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={job.directApplyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 border border-yellow-400/40 dark:bg-yellow-50 dark:hover:bg-yellow-100 dark:text-yellow-900 dark:border-yellow-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Apply on {job.company}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA to Search Console */}
        <div className="text-center pt-4">
          <a
            href="#search-console"
            className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-600 dark:text-yellow-400 hover:underline transition-colors"
          >
            <span>Launch full interactive search with customized keywords & location</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
