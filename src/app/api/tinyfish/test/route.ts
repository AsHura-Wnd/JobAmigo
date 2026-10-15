import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apiKey, endpoint } = await req.json();
    const effectiveKey = (apiKey || process.env.TINYFISH_API_KEY || '').trim();

    if (endpoint === 'search') {
      const query = 'site:careers.microsoft.com software intern India';
      const start = Date.now();
      const res = await fetch(`https://api.search.tinyfish.ai?query=${encodeURIComponent(query)}`, {
        headers: { 'X-API-Key': effectiveKey }
      });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json({
        endpoint: 'Search',
        status: res.status,
        ok: res.ok,
        durationMs: Date.now() - start,
        data
      });
    }

    if (endpoint === 'fetch') {
      const start = Date.now();
      const res = await fetch('https://api.fetch.tinyfish.ai', {
        method: 'POST',
        headers: {
          'X-API-Key': effectiveKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          urls: ['https://careers.microsoft.com'],
          purpose: 'Test fetch extraction for demo'
        })
      });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json({
        endpoint: 'Fetch',
        status: res.status,
        ok: res.ok,
        durationMs: Date.now() - start,
        data
      });
    }

    if (endpoint === 'agent') {
      const start = Date.now();
      const res = await fetch('https://agent.tinyfish.ai/v1/automation/run', {
        method: 'POST',
        headers: {
          'X-API-Key': effectiveKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: 'https://careers.microsoft.com',
          goal: 'Verify career portal accessibility',
          browser_profile: 'lite'
        })
      });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json({
        endpoint: 'Agent',
        status: res.status,
        ok: res.ok,
        durationMs: Date.now() - start,
        data
      });
    }

    return NextResponse.json({ error: 'Invalid endpoint specified' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
