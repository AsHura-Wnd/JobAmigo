export type SeniorityLevel = 'Internship' | 'Entry Level' | 'Fresher' | 'All';

export interface SearchPreferences {
  role: string;
  location: string;
  seniority: SeniorityLevel;
  keywords: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  shortDescription: string;
  requiredSkills: string[];
  postedDate: string | null;
  directApplyUrl: string;
  sourceWebsite: string;
  lastCheckedTimestamp: string;
  matchScore: number; // 0 to 100
  matchExplanation: {
    reasons: string[];
    roleScore: number;
    locationScore: number;
    seniorityScore: number;
    keywordScore: number;
  };
  provenance: {
    discoveryMethod: 'tinyfish_search' | 'tinyfish_agent' | 'tinyfish_fetch';
    rawSnippet?: string;
    verifiedViaFetch?: boolean;
    pageExtractedLength?: number;
  };
}

export interface TinyFishStageStatus {
  name: string;
  status: 'idle' | 'running' | 'completed' | 'skipped' | 'failed';
  message: string;
  details?: Record<string, any>;
  durationMs?: number;
  count?: number;
}

export interface SearchResponse {
  success: boolean;
  results: JobListing[];
  stats: {
    totalDiscovered: number;
    deduplicatedCount: number;
    sourcesSearched: string[];
    executionTimeMs: number;
  };
  stages: {
    search: TinyFishStageStatus;
    fetch: TinyFishStageStatus;
    agent: TinyFishStageStatus;
    matching: TinyFishStageStatus;
  };
  tinyFishConfig: {
    hasApiKey: boolean;
    authenticated: boolean;
    endpointsUsed: string[];
  };
  error?: string;
}
