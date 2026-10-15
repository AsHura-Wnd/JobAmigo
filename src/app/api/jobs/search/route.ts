import { NextRequest, NextResponse } from 'next/server';
import { TinyFishService } from '@/lib/tinyfish';
import { SearchPreferences } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, location, seniority, keywords, apiKey } = body;

    const prefs: SearchPreferences = {
      role: (role || '').trim(),
      location: (location || 'India').trim(),
      seniority: seniority || 'Internship',
      keywords: Array.isArray(keywords) ? keywords : []
    };

    const effectiveKey = (apiKey || process.env.TINYFISH_API_KEY || '').trim();
    const service = new TinyFishService({ apiKey: effectiveKey });

    const pipelineResult = await service.executePipeline(prefs);

    return NextResponse.json({
      success: pipelineResult.results.length > 0 || !pipelineResult.error,
      results: pipelineResult.results,
      stats: {
        totalDiscovered: pipelineResult.totalDiscovered,
        deduplicatedCount: pipelineResult.deduplicatedCount,
        sourcesSearched: pipelineResult.sourcesSearched,
        executionTimeMs: pipelineResult.executionTimeMs
      },
      stages: pipelineResult.stages,
      tinyFishConfig: {
        hasApiKey: service.hasKey(),
        authenticated: service.hasKey(),
        endpointsUsed: [
          'https://api.search.tinyfish.ai',
          'https://api.fetch.tinyfish.ai',
          'https://agent.tinyfish.ai/v1/automation/run'
        ]
      },
      error: pipelineResult.error
    });
  } catch (err: any) {
    console.error('Jobs Search API error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Internal server error while executing TinyFish pipeline',
        results: [],
        stats: {
          totalDiscovered: 0,
          deduplicatedCount: 0,
          sourcesSearched: [],
          executionTimeMs: 0
        },
        stages: {
          search: { name: 'Search', status: 'failed', message: err.message },
          fetch: { name: 'Fetch', status: 'idle', message: 'Not run' },
          agent: { name: 'Agent', status: 'idle', message: 'Not run' },
          matching: { name: 'Matching', status: 'idle', message: 'Not run' }
        },
        tinyFishConfig: {
          hasApiKey: false,
          authenticated: false,
          endpointsUsed: []
        }
      },
      { status: 500 }
    );
  }
}
