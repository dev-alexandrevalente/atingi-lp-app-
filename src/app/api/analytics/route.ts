import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PASS = process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD || 'atingi2024';

// Server-side Supabase client — uses service_role key for full read access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/, '').trim();

    // Auth check
    if (token !== PASS) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '7d';
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    let since = new Date();
    let until = new Date();
    
    until.setHours(23, 59, 59, 999); // end of today by default

    if (range === 'custom' && startParam && endParam) {
      since = new Date(startParam);
      until = new Date(endParam);
      until.setHours(23, 59, 59, 999);
    } else if (range === 'today') {
      since.setHours(0, 0, 0, 0);
    } else if (range === 'yesterday') {
      since.setDate(since.getDate() - 1);
      since.setHours(0, 0, 0, 0);
      until.setDate(until.getDate() - 1);
      until.setHours(23, 59, 59, 999);
    } else if (range === '7d') {
      since.setDate(since.getDate() - 7);
      since.setHours(0, 0, 0, 0);
    } else if (range === '30d') {
      since.setDate(since.getDate() - 30);
      since.setHours(0, 0, 0, 0);
    } else if (range === '90d') {
      since.setDate(since.getDate() - 90);
      since.setHours(0, 0, 0, 0);
    } else {
      // default 7d fallback
      since.setDate(since.getDate() - 7);
      since.setHours(0, 0, 0, 0);
    }

    const sinceIso = since.toISOString();
    const untilIso = until.toISOString();

    // Parallel fetch all 3 tables
    const [sessionsRes, eventsRes, interactionsRes] = await Promise.all([
      supabase
        .from('lp_sessions')
        .select('*')
        .gte('created_at', sinceIso)
        .lte('created_at', untilIso)
        .order('created_at', { ascending: false }),
      supabase
        .from('lp_step_events')
        .select('*')
        .gte('created_at', sinceIso)
        .lte('created_at', untilIso),
      supabase
        .from('lp_interactions')
        .select('*')
        .gte('created_at', sinceIso)
        .lte('created_at', untilIso),
    ]);

    return NextResponse.json({
      sessions: sessionsRes.data || [],
      events: eventsRes.data || [],
      interactions: interactionsRes.data || [],
    });
  } catch (error: any) {
    console.error('[API/Analytics] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
