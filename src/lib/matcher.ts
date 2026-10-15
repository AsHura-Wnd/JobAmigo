import { JobListing, SearchPreferences } from './types';

/**
 * Normalizes a URL by removing common tracking parameters, hashes, and trailing slashes.
 */
export function normalizeUrl(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'ref', 'source', 'gh_src', 'lever-source', 's', 'gh_jid', 'iis', 'iisn'
    ];
    trackingParams.forEach(p => url.searchParams.delete(p));
    
    // Sort remaining params for stability
    url.searchParams.sort();
    
    let clean = `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
    if (url.search) {
      clean += url.search;
    }
    return clean.toLowerCase();
  } catch {
    return urlStr.trim().toLowerCase().replace(/\/+$/, '');
  }
}

/**
 * Generates a fuzzy composite key: company + title + location
 */
export function generateCompositeKey(company: string, title: string, location: string): string {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  return `${norm(company)}|${norm(title)}|${norm(location)}`;
}

/**
 * Deterministic matching calculation based on:
 * - Role similarity: up to 35 pts
 * - Seniority alignment: up to 25 pts
 * - Location compatibility: up to 25 pts
 * - Keyword overlap: up to 15 pts
 * Total: 100 pts
 */
export function scoreListing(
  listing: Omit<JobListing, 'matchScore' | 'matchExplanation'>,
  prefs: SearchPreferences
): {
  matchScore: number;
  matchExplanation: JobListing['matchExplanation'];
} {
  const reasons: string[] = [];
  let roleScore = 0;
  let seniorityScore = 0;
  let locationScore = 0;
  let keywordScore = 0;

  const targetRole = (prefs.role || '').toLowerCase().trim();
  const targetTokens = targetRole.split(/\s+/).filter(Boolean);
  const titleLower = listing.title.toLowerCase();
  const descLower = (listing.shortDescription || '').toLowerCase();

  // 1. Role Score (Max 35)
  if (targetRole) {
    if (titleLower.includes(targetRole)) {
      roleScore = 35;
      reasons.push(`Exact role title match: "${prefs.role}" (+35%)`);
    } else {
      const matchedTokens = targetTokens.filter(tok => titleLower.includes(tok));
      if (matchedTokens.length > 0) {
        const ratio = matchedTokens.length / targetTokens.length;
        roleScore = Math.round(ratio * 30);
        reasons.push(`Role token match (${matchedTokens.join(', ')}): +${roleScore}%`);
      } else if (descLower.includes(targetRole)) {
        roleScore = 15;
        reasons.push(`Target role mentioned in description: +15%`);
      }
    }
  } else {
    roleScore = 30; // neutral default
  }

  // 2. Seniority Score (Max 25)
  const targetSeniority = prefs.seniority || 'All';
  const typeLower = (listing.employmentType || '').toLowerCase();
  const fullText = `${titleLower} ${descLower} ${typeLower}`;

  if (targetSeniority === 'All') {
    seniorityScore = 20;
    reasons.push(`Seniority neutral filter (+20%)`);
  } else if (targetSeniority === 'Internship') {
    if (fullText.includes('intern') || fullText.includes('trainee') || fullText.includes('co-op')) {
      seniorityScore = 25;
      reasons.push(`Verified internship/trainee opportunity (+25%)`);
    } else if (fullText.includes('entry level') || fullText.includes('fresher') || fullText.includes('junior') || fullText.includes('associate')) {
      seniorityScore = 15;
      reasons.push(`Related entry-level opportunity for interns (+15%)`);
    } else {
      seniorityScore = 5;
    }
  } else if (targetSeniority === 'Fresher' || targetSeniority === 'Entry Level') {
    if (fullText.includes('fresher') || fullText.includes('entry level') || fullText.includes('graduate') || fullText.includes('junior') || fullText.includes('campus')) {
      seniorityScore = 25;
      reasons.push(`Confirmed ${targetSeniority} position (+25%)`);
    } else if (fullText.includes('intern')) {
      seniorityScore = 18;
      reasons.push(`Internship suitable for new graduates (+18%)`);
    } else {
      seniorityScore = 8;
    }
  }

  // 3. Location Score (Max 25)
  const targetLoc = (prefs.location || '').toLowerCase().trim();
  const listLoc = (listing.location || '').toLowerCase();

  if (!targetLoc || targetLoc === 'any' || targetLoc === 'all') {
    locationScore = 20;
    reasons.push(`Broad location allowed (+20%)`);
  } else if (targetLoc.includes('remote')) {
    if (listLoc.includes('remote') || descLower.includes('work from home') || descLower.includes('remote')) {
      locationScore = 25;
      reasons.push(`Direct Remote match (+25%)`);
    } else {
      locationScore = 10;
    }
  } else {
    // Specific location e.g. "India", "Bengaluru", "Delhi", "Hyderabad"
    if (listLoc.includes(targetLoc)) {
      locationScore = 25;
      reasons.push(`Location exact match: "${listing.location}" matches "${prefs.location}" (+25%)`);
    } else if (targetLoc === 'india' && (
      listLoc.includes('bangalore') || listLoc.includes('bengaluru') ||
      listLoc.includes('delhi') || listLoc.includes('gurgaon') || listLoc.includes('noida') ||
      listLoc.includes('hyderabad') || listLoc.includes('pune') || listLoc.includes('mumbai') ||
      listLoc.includes('chennai') || listLoc.includes('remote - india')
    )) {
      locationScore = 25;
      reasons.push(`Metropolitan tech hub within India: "${listing.location}" (+25%)`);
    } else if (listLoc.includes('remote')) {
      locationScore = 20;
      reasons.push(`Remote eligible across ${prefs.location} (+20%)`);
    } else {
      locationScore = 5;
    }
  }

  // 4. Keywords Score (Max 15)
  const keywords = prefs.keywords || [];
  if (keywords.length > 0) {
    const matchedKeywords: string[] = [];
    const skillsList = listing.requiredSkills.map(s => s.toLowerCase());
    const searchableContent = `${fullText} ${skillsList.join(' ')}`;

    keywords.forEach(kw => {
      const kwTrim = kw.toLowerCase().trim();
      if (kwTrim && searchableContent.includes(kwTrim)) {
        matchedKeywords.push(kw);
      }
    });

    if (matchedKeywords.length > 0) {
      const ratio = matchedKeywords.length / keywords.length;
      keywordScore = Math.min(15, Math.round(ratio * 15));
      reasons.push(`Matched required tech skills: ${matchedKeywords.join(', ')} (+${keywordScore}%)`);
    } else {
      reasons.push(`Keywords not prominently detected`);
    }
  } else {
    keywordScore = 15; // default full marks if no filter specified
  }

  const rawTotal = roleScore + seniorityScore + locationScore + keywordScore;
  const matchScore = Math.max(10, Math.min(100, rawTotal));

  return {
    matchScore,
    matchExplanation: {
      reasons,
      roleScore,
      locationScore,
      seniorityScore,
      keywordScore,
    },
  };
}

/**
 * Deduplicates listings first by normalized URL, then by composite key (company + title + location).
 * Retains the record with the most comprehensive data (e.g. description length, skills count, fetch verification).
 */
export function deduplicateListings(listings: JobListing[]): JobListing[] {
  const urlMap = new Map<string, JobListing>();

  for (const item of listings) {
    const normUrl = normalizeUrl(item.directApplyUrl);
    if (!urlMap.has(normUrl)) {
      urlMap.set(normUrl, item);
    } else {
      const existing = urlMap.get(normUrl)!;
      // Keep whichever has richer data or fetch verification
      const existingRichness = (existing.shortDescription?.length || 0) + (existing.requiredSkills?.length || 0) * 10 + (existing.provenance.verifiedViaFetch ? 50 : 0);
      const newRichness = (item.shortDescription?.length || 0) + (item.requiredSkills?.length || 0) * 10 + (item.provenance.verifiedViaFetch ? 50 : 0);
      if (newRichness > existingRichness) {
        urlMap.set(normUrl, item);
      }
    }
  }

  // Second pass: deduplicate by company + title + location
  const compositeMap = new Map<string, JobListing>();
  for (const item of Array.from(urlMap.values())) {
    const key = generateCompositeKey(item.company, item.title, item.location);
    if (!compositeMap.has(key)) {
      compositeMap.set(key, item);
    } else {
      const existing = compositeMap.get(key)!;
      const existingScore = existing.matchScore + (existing.provenance.verifiedViaFetch ? 20 : 0);
      const newScore = item.matchScore + (item.provenance.verifiedViaFetch ? 20 : 0);
      if (newScore > existingScore) {
        compositeMap.set(key, item);
      }
    }
  }

  // Return sorted descending by match score
  return Array.from(compositeMap.values()).sort((a, b) => b.matchScore - a.matchScore);
}
