import { JobListing, SearchPreferences, TinyFishStageStatus } from './types';
import { scoreListing, deduplicateListings } from './matcher';

export interface TinyFishServiceOptions {
  apiKey?: string;
}

export class TinyFishService {
  private apiKey: string;
  private baseUrlSearch = 'https://api.search.tinyfish.ai';
  private baseUrlFetch = 'https://api.fetch.tinyfish.ai';
  private baseUrlAgent = 'https://agent.tinyfish.ai/v1/automation/run';

  constructor(options: TinyFishServiceOptions = {}) {
    this.apiKey = options.apiKey || process.env.TINYFISH_API_KEY || '';
  }

  public hasKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  /**
   * Capability 1: TinyFish Search API
   * Performs live discovery of real job openings across career portals.
   */
  public async searchJobs(prefs: SearchPreferences): Promise<{
    rawResults: any[];
    status: TinyFishStageStatus;
    queriesUsed: string[];
  }> {
    const startTime = Date.now();
    const role = prefs.role || 'Software Engineer Intern';
    const loc = prefs.location || 'India';
    const seniority = prefs.seniority === 'All' ? '' : prefs.seniority;
    const kw = (prefs.keywords || []).slice(0, 3).join(' ');

    const isDesign = role.toLowerCase().includes('ui') || role.toLowerCase().includes('ux') || role.toLowerCase().includes('design');

    const queries = isDesign
      ? [
          `site:wellfound.com/jobs "${role}" ${loc}`,
          `site:dribbble.com/jobs "${role}" ${loc}`,
          `site:careers.microsoft.com "${role}" ${loc}`,
          `site:boards.greenhouse.io OR site:jobs.lever.co "${role}" ${loc} ${seniority}`
        ]
      : [
          `site:careers.microsoft.com "${role}" ${loc}`,
          `site:amazon.jobs "${role}" ${loc}`,
          `site:wellfound.com/jobs "${role}" ${loc}`,
          `site:boards.greenhouse.io OR site:jobs.lever.co "${role}" ${loc} ${seniority}`
        ];

    if (!this.hasKey()) {
      return {
        rawResults: [],
        queriesUsed: queries,
        status: {
          name: 'TinyFish Search API',
          status: 'failed',
          message: 'Missing TINYFISH_API_KEY. Configure key to perform live Search API web discovery.',
          durationMs: Date.now() - startTime,
          count: 0
        }
      };
    }

    const aggregated: any[] = [];
    let lastError: string | null = null;

    const queryPromises = queries.map(async (q) => {
      try {
        const url = `${this.baseUrlSearch}?query=${encodeURIComponent(q)}&purpose=${encodeURIComponent('Discover verified job and internship openings for college students and graduates')}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);
        
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'X-API-Key': this.apiKey,
            'Accept': 'application/json'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.results)) {
            return data.results;
          }
        } else {
          const errText = await res.text();
          lastError = `Search API status ${res.status}: ${errText}`;
        }
      } catch (err: any) {
        lastError = err.message || String(err);
      }
      return [];
    });

    const settled = await Promise.allSettled(queryPromises);
    for (const s of settled) {
      if (s.status === 'fulfilled' && Array.isArray(s.value)) {
        aggregated.push(...s.value);
      }
    }

    if (aggregated.length === 0 && lastError) {
      return {
        rawResults: [],
        queriesUsed: queries,
        status: {
          name: 'TinyFish Search API',
          status: 'failed',
          message: lastError,
          durationMs: Date.now() - startTime,
          count: 0
        }
      };
    }

    return {
      rawResults: aggregated,
      queriesUsed: queries,
      status: {
        name: 'TinyFish Search API',
        status: 'completed',
        message: `Discovered ${aggregated.length} live potential openings via TinyFish Search across career portals`,
        durationMs: Date.now() - startTime,
        count: aggregated.length
      }
    };
  }

  /**
   * Capability 2: TinyFish Fetch API
   * Renders the target URLs in headless Chromium fleet, stripping noise and extracting verified content.
   */
  public async fetchJobDetails(urls: string[]): Promise<{
    fetchedMap: Map<string, { markdown?: string; title?: string; description?: string }>;
    status: TinyFishStageStatus;
  }> {
    const startTime = Date.now();
    const fetchedMap = new Map<string, { markdown?: string; title?: string; description?: string }>();

    if (urls.length === 0) {
      return {
        fetchedMap,
        status: {
          name: 'TinyFish Fetch API',
          status: 'skipped',
          message: 'No candidate URLs provided for Fetch extraction',
          durationMs: 0,
          count: 0
        }
      };
    }

    if (!this.hasKey()) {
      return {
        fetchedMap,
        status: {
          name: 'TinyFish Fetch API',
          status: 'failed',
          message: 'Missing TINYFISH_API_KEY. Configure key to fetch live page contents with JavaScript execution.',
          durationMs: Date.now() - startTime,
          count: 0
        }
      };
    }

    try {
      const topUrls = urls.slice(0, 5); // Fetch top candidate URLs
      const res = await fetch(this.baseUrlFetch, {
        method: 'POST',
        headers: {
          'X-API-Key': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          urls: topUrls,
          purpose: 'Extract job title, company, requirements, qualifications, and direct application form link from career listing',
          format: 'markdown'
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        return {
          fetchedMap,
          status: {
            name: 'TinyFish Fetch API',
            status: 'failed',
            message: `Fetch API returned status ${res.status}: ${errText}`,
            durationMs: Date.now() - startTime,
            count: 0
          }
        };
      }

      const data = await res.json();
      if (Array.isArray(data.results)) {
        for (const item of data.results) {
          if (item && item.url) {
            fetchedMap.set(item.url, {
              markdown: item.text,
              title: item.title,
              description: item.description
            });
          }
        }
      }

      return {
        fetchedMap,
        status: {
          name: 'TinyFish Fetch API',
          status: 'completed',
          message: `Successfully rendered & extracted details from ${fetchedMap.size} job pages`,
          durationMs: Date.now() - startTime,
          count: fetchedMap.size
        }
      };
    } catch (err: any) {
      return {
        fetchedMap,
        status: {
          name: 'TinyFish Fetch API',
          status: 'failed',
          message: `Fetch API network error: ${err.message || String(err)}`,
          durationMs: Date.now() - startTime,
          count: 0
        }
      };
    }
  }

  /**
   * Capability 3: TinyFish Agent API
   * Performs autonomous browser navigation on deep career portal pages (e.g. Microsoft Careers or Amazon Jobs).
   */
  public async runCareerAgent(portalUrl: string, goal: string): Promise<{
    agentResults: any | null;
    status: TinyFishStageStatus;
  }> {
    const startTime = Date.now();

    if (!this.hasKey()) {
      return {
        agentResults: null,
        status: {
          name: 'TinyFish Agent API',
          status: 'failed',
          message: 'Missing TINYFISH_API_KEY. Configure key for autonomous browser agent navigation.',
          durationMs: Date.now() - startTime
        }
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const res = await fetch(this.baseUrlAgent, {
        method: 'POST',
        headers: {
          'X-API-Key': this.apiKey,
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({
          url: portalUrl,
          goal: goal,
          browser_profile: 'lite',
          output_schema: {
            type: 'object',
            properties: {
              jobs: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    company: { type: 'string' },
                    location: { type: 'string' },
                    applyUrl: { type: 'string' },
                    employmentType: { type: 'string' },
                    description: { type: 'string' }
                  },
                  required: ['title', 'applyUrl']
                }
              }
            }
          }
        })
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text();
        return {
          agentResults: null,
          status: {
            name: 'TinyFish Agent API',
            status: 'failed',
            message: `Agent API responded ${res.status}: ${errText}`,
            durationMs: Date.now() - startTime
          }
        };
      }

      const agentData = await res.json();
      return {
        agentResults: agentData.result || null,
        status: {
          name: 'TinyFish Agent API',
          status: agentData.status === 'COMPLETED' ? 'completed' : 'failed',
          message: agentData.status === 'COMPLETED'
            ? `Agent successfully completed browser navigation (${agentData.num_of_steps || 1} steps)`
            : `Agent status: ${agentData.status}`,
          durationMs: Date.now() - startTime
        }
      };
    } catch (err: any) {
      return {
        agentResults: null,
        status: {
          name: 'TinyFish Agent API',
          status: 'failed',
          message: `Agent API error: ${err.message || String(err)}`,
          durationMs: Date.now() - startTime
        }
      };
    }
  }

  /**
   * Executes the full pipeline:
   * 1. Search across career portals (TinyFish Search)
   * 2. Targeted browser navigation for specialized portals (TinyFish Agent)
   * 3. Extract deep metadata from discovered URLs (TinyFish Fetch)
   * 4. Normalize to strict Results Schema
   * 5. Deduplicate and deterministically score/rank
   */
  public async executePipeline(prefs: SearchPreferences): Promise<{
    results: JobListing[];
    stages: {
      search: TinyFishStageStatus;
      fetch: TinyFishStageStatus;
      agent: TinyFishStageStatus;
      matching: TinyFishStageStatus;
    };
    sourcesSearched: string[];
    totalDiscovered: number;
    deduplicatedCount: number;
    executionTimeMs: number;
    error?: string;
  }> {
    const pipelineStart = Date.now();
    const candidateListings: JobListing[] = [];
    const sourcesSet = new Set<string>([
      'Microsoft Careers',
      'Amazon Jobs',
      'Wellfound',
      'Greenhouse',
      'Lever',
      'Dribbble'
    ]);

    // 1 & 2. Run TinyFish Search and TinyFish Agent in parallel for speed
    const [searchRes, agentRun] = await Promise.all([
      this.searchJobs(prefs),
      this.hasKey()
        ? this.runCareerAgent('https://careers.microsoft.com/students/', `Find current student openings for "${prefs.role}" in "${prefs.location}" and extract titles and links`)
        : Promise.resolve({
            agentResults: null,
            status: {
              name: 'TinyFish Agent API',
              status: 'skipped' as const,
              message: 'Agent stage requires TINYFISH_API_KEY'
            }
          })
    ]);

    const agentStageStatus: TinyFishStageStatus = agentRun.status;

    // Parse search results if available
    const urlsToFetch: string[] = [];
    for (const item of searchRes.rawResults) {
      if (!item || !item.url) continue;
      
      const domain = new URL(item.url).hostname.replace('www.', '');
      let company = item.site_name || domain.split('.')[0];
      if (domain.includes('microsoft')) company = 'Microsoft';
      else if (domain.includes('amazon')) company = 'Amazon';
      else if (domain.includes('wellfound')) company = 'Wellfound Startups';
      else if (domain.includes('dribbble')) company = 'Dribbble Hiring';

      const unrankedListing: Omit<JobListing, 'matchScore' | 'matchExplanation'> = {
        id: `srch-${Buffer.from(item.url).toString('base64').slice(0, 12)}`,
        title: item.title?.replace(/[-|].*$/, '').trim() || prefs.role,
        company: company.charAt(0).toUpperCase() + company.slice(1),
        location: prefs.location || 'India',
        employmentType: prefs.seniority === 'All' ? 'Full-time' : prefs.seniority,
        shortDescription: item.snippet || 'Discovered via TinyFish Search from authentic company career portal.',
        requiredSkills: prefs.keywords || ['Problem Solving', 'Data Structures'],
        postedDate: item.date || null,
        directApplyUrl: item.url,
        sourceWebsite: domain,
        lastCheckedTimestamp: new Date().toISOString(),
        provenance: {
          discoveryMethod: 'tinyfish_search',
          rawSnippet: item.snippet
        }
      };

      const scored = scoreListing(unrankedListing, prefs);
      candidateListings.push({
        ...unrankedListing,
        ...scored
      });

      urlsToFetch.push(item.url);
    }

    if (agentRun.agentResults && Array.isArray(agentRun.agentResults.jobs)) {
        for (const job of agentRun.agentResults.jobs) {
          if (!job.applyUrl) continue;
          const unranked: Omit<JobListing, 'matchScore' | 'matchExplanation'> = {
            id: `agt-${Buffer.from(job.applyUrl).toString('base64').slice(0, 12)}`,
            title: job.title || prefs.role,
            company: job.company || 'Microsoft',
            location: job.location || prefs.location,
            employmentType: job.employmentType || prefs.seniority || 'Internship',
            shortDescription: job.description || 'Extracted via TinyFish autonomous browser agent run on career portal.',
            requiredSkills: prefs.keywords || ['Software Engineering'],
            postedDate: new Date().toISOString().split('T')[0],
            directApplyUrl: job.applyUrl,
            sourceWebsite: 'careers.microsoft.com',
            lastCheckedTimestamp: new Date().toISOString(),
            provenance: {
              discoveryMethod: 'tinyfish_agent'
            }
          };

          const scored = scoreListing(unranked, prefs);
          candidateListings.push({
            ...unranked,
            ...scored
          });
        }
      }

    // 3. TinyFish Fetch Stage (Page content & requirement extraction)
    const fetchRes = await this.fetchJobDetails(urlsToFetch);
    // Enrich candidate listings with fetched content where available
    for (const listing of candidateListings) {
      const fetched = fetchRes.fetchedMap.get(listing.directApplyUrl);
      if (fetched) {
        listing.provenance.verifiedViaFetch = true;
        if (fetched.description) {
          listing.shortDescription = fetched.description.slice(0, 300);
        }
        if (fetched.markdown) {
          listing.provenance.pageExtractedLength = fetched.markdown.length;
        }
      }
    }

    // 4. Deduplication & Deterministic Ranking Stage
    const totalDiscovered = candidateListings.length;
    const deduplicated = deduplicateListings(candidateListings);
    const deduplicatedCount = totalDiscovered - deduplicated.length;

    const matchingStage: TinyFishStageStatus = {
      name: 'Deterministic Scoring & Deduplication',
      status: 'completed',
      message: `Scored ${totalDiscovered} raw listings across 4 criteria; removed ${deduplicatedCount} duplicate entries.`,
      durationMs: Date.now() - pipelineStart,
      count: deduplicated.length
    };

    let overallError: string | undefined = undefined;
    if (!this.hasKey()) {
      overallError = 'TINYFISH_API_KEY is not configured. Please supply your TinyFish API key to run live searches against TinyFish infrastructure.';
    } else if (deduplicated.length === 0) {
      overallError = 'No real job listings matched the specified criteria from the live career queries.';
    }

    return {
      results: deduplicated,
      stages: {
        search: searchRes.status,
        fetch: fetchRes.status,
        agent: agentStageStatus,
        matching: matchingStage
      },
      sourcesSearched: Array.from(sourcesSet),
      totalDiscovered,
      deduplicatedCount,
      executionTimeMs: Date.now() - pipelineStart,
      error: overallError
    };
  }
}
