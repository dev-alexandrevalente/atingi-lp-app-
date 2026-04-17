/**
 * Atingi Landing Page Analytics — Universal Event Tracking System
 *
 * Tracks lead journey through ALL funnel versions (V1, V2, V3, V4),
 * step-level events, granular interactions, and conversions in Supabase.
 *
 * Architecture:
 *   - initSession()          → Called on app mount. Creates a unique session row.
 *   - trackStep()            → Called on each quiz/form step transition.
 *   - trackInteraction()     → Called for granular events (section_view, cta_click, etc.)
 *   - updateLiveLead()       → Called on form field changes (Live Lead capture).
 *   - endSessionBeacon()     → Called on beforeunload to save total time.
 *   - getSessionId()         → Public getter for current session ID.
 *   - getCurrentVersion()    → Public getter for current funnel version.
 */

'use client';

import { supabase } from '@/lib/supabaseClient';

// ─── Step Name Maps (Version-Specific) ────────────────────────────────────────

/** Quiz Funnel steps (V1, V2, V3) — 7 screens */
export const STEP_NAMES: Record<number, string> = {
  0: 'hero',
  1: 'role',         // Cargo
  2: 'team_size',    // Tamanho do time
  3: 'segment',      // Segmento
  4: 'time_company', // Tempo de fundação
  5: 'contact_form', // Nome / Email / Telefone
  6: 'converted',    // Clicou no CTA final
};

/** V4 DirectLeadForm steps — 5 screens + conversion */
export const STEP_NAMES_V4: Record<number, string> = {
  0: 'hero',              // SplitRoutingHero landing
  1: 'v4_role',           // Cargo (DirectLeadForm)
  2: 'v4_team_size',      // Tamanho do time
  3: 'v4_segment',        // Segmento
  4: 'v4_maturity',       // Tempo de operação
  5: 'v4_contact_form',   // Nome / Email / Telefone
  6: 'v4_converted',      // Submit + WhatsApp redirect
};

/** Returns the correct step name map for a given version */
export function getStepNamesForVersion(version: string): Record<number, string> {
  return version === 'v4' ? STEP_NAMES_V4 : STEP_NAMES;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const SESSION_KEY = 'atingi_lp_session';
const SESSION_START_KEY = 'atingi_lp_start';
const STEP_ENTER_KEY = 'atingi_lp_step_enter';
const LAST_CREATE_KEY = 'atingi_lp_last_create';
const FINGERPRINT_KEY = 'atingi_lp_fingerprint';
const VERSION_KEY = 'atingi_lp_version';
const VISITOR_KEY = 'atingi_visitor_id';

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min session timeout
const ANTI_DUP_MS = 30_000;            // 30s anti-duplicate (FB in-app reloads)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function safeLocalStorage(op: 'get' | 'set' | 'remove', key: string, value?: string): string | null {
  try {
    if (op === 'get') return localStorage.getItem(key);
    if (op === 'set') { localStorage.setItem(key, value!); return null; }
    if (op === 'remove') { localStorage.removeItem(key); return null; }
  } catch (_) { /* private browsing / SSR */ }
  return null;
}

/** Public getter for persistent visitor ID across sessions */
export function getOrCreateVisitorId(): string {
  let vid = safeLocalStorage('get', VISITOR_KEY);
  if (!vid) {
    vid = generateUUID();
    safeLocalStorage('set', VISITOR_KEY, vid);
  }
  return vid;
}

/** Public getter — returns the current analytics session ID */
export function getSessionId(): string {
  let sid = safeLocalStorage('get', SESSION_KEY);
  if (!sid) {
    sid = generateUUID();
    safeLocalStorage('set', SESSION_KEY, sid);
  }
  return sid;
}

/** Public getter — returns the stored funnel version for the current session */
export function getCurrentVersion(): string {
  return safeLocalStorage('get', VERSION_KEY) || 'v1';
}

function resetSession(version: string): string {
  const sid = `${generateUUID()}_${version}`;
  safeLocalStorage('set', SESSION_KEY, sid);
  safeLocalStorage('set', VERSION_KEY, version);
  safeLocalStorage('remove', SESSION_START_KEY);
  safeLocalStorage('remove', STEP_ENTER_KEY);
  return sid;
}

/** Lightweight device fingerprint — privacy-safe, unique enough per device */
function getFingerprint(): string {
  if (typeof window === 'undefined') return 'ssr';
  const ua = navigator.userAgent;
  const screen = `${window.screen.width}x${window.screen.height}`;
  const lang = navigator.language;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return `${ua}|${screen}|${lang}|${tz}`;
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getTrackingParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const qs = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'sck', 'fbclid', 'gclid', 'ttclid'];
  const out: Record<string, string> = {};
  const raw = (window as any).__RAW_ENTRY_PARAMS__ || {};

  for (const k of keys) {
    if (raw[k]) { out[k] = raw[k]; continue; }
    const urlVal = qs.get(k);
    if (urlVal) { out[k] = urlVal; continue; }
    try {
      const sv = sessionStorage.getItem('atingi_track_' + k);
      if (sv) { out[k] = sv; continue; }
    } catch (_) { /* private browsing */ }
    const cm = document.cookie.match(new RegExp('(^| )' + k + '=([^;]+)'));
    if (cm) out[k] = decodeURIComponent(cm[2]);
  }
  return out;
}

// ─── Public API ───────────────────────────────────────────────────────────────

let HAS_QUALIFIED = false;

/** Automatically upgrades raw session to qualified upon specific interactions */
async function promoteSessionToQualified() {
  if (typeof window === 'undefined' || HAS_QUALIFIED) return;
  HAS_QUALIFIED = true;
  safeLocalStorage('set', 'atingi_lp_qualified', 'true');
  const sid = getSessionId();
  try {
    await supabase.from('lp_sessions').update({ 
      session_quality: 'qualified', 
      human_probable: true 
    }).eq('session_id', sid);
  } catch (e) {
    console.warn('[Analytics] Failed to qualify session:', e);
  }
}

/**
 * Initialize analytics session — call once on component mount.
 */
export async function initSession(funnelVersion: 'v1' | 'v2' | 'v3' | 'v4' = 'v1'): Promise<void> {
  if (typeof window === 'undefined') return;

  const fingerprint = getFingerprint();
  const storedFingerprint = safeLocalStorage('get', FINGERPRINT_KEY);
  const lastCreate = safeLocalStorage('get', LAST_CREATE_KEY);
  const existingStart = safeLocalStorage('get', SESSION_START_KEY);

  // Anti-duplicate: FB In-App Browser re-opens page within 30s → skip
  if (lastCreate && (Date.now() - parseInt(lastCreate)) < ANTI_DUP_MS && fingerprint === storedFingerprint) {
    console.log('[Analytics] Anti-dup: same device, recent session. Skipping.');
    return;
  }

  // Active session on same device → reuse
  const sessionActive = existingStart && (Date.now() - parseInt(existingStart)) < SESSION_TTL_MS;
  if (sessionActive && fingerprint === storedFingerprint) {
    safeLocalStorage('set', SESSION_START_KEY, Date.now().toString());
    safeLocalStorage('set', VERSION_KEY, funnelVersion);
    console.log('[Analytics] Reusing active session:', getSessionId());
    return;
  }

  // New session
  const sid = resetSession(funnelVersion);
  const params = getTrackingParams();

  safeLocalStorage('set', SESSION_START_KEY, Date.now().toString());
  safeLocalStorage('set', LAST_CREATE_KEY, Date.now().toString());
  safeLocalStorage('set', FINGERPRINT_KEY, fingerprint);

  const isPaidTraffic = !!(params.utm_source || params.utm_medium || params.utm_campaign || params.fbclid || params.gclid || params.ttclid);

  const data = {
    session_id: sid,
    visitor_id: getOrCreateVisitorId(),
    is_paid_traffic: isPaidTraffic,
    session_quality: 'raw',
    human_probable: false,
    funnel_version: funnelVersion,
    utm_source: params.utm_source || null,
    utm_medium: params.utm_medium || null,
    utm_campaign: params.utm_campaign || null,
    utm_content: params.utm_content || null,
    utm_term: params.utm_term || null,
    sck: params.sck || null,
    fbclid: params.fbclid || null,
    gclid: params.gclid || null,
    ttclid: params.ttclid || null,
    referrer: document.referrer || null,
    landing_url: window.location.href.substring(0, 1000),
    device_type: getDeviceType(),
    screen_width: window.innerWidth,
    user_agent: navigator.userAgent.substring(0, 500),
  };

  console.log('[Analytics] Creating new session:', { sid, funnelVersion, ...params });

  try {
    const { error } = await supabase.from('lp_sessions').insert(data);
    if (error) console.warn('[Analytics] initSession error:', error.message);
  } catch (e) {
    console.warn('[Analytics] initSession failed:', e);
  }
}

/**
 * Track a step enter/exit event in the funnel (quiz or V4 form).
 * @param stepIndex  Numeric step index
 * @param eventType  'enter' | 'exit' | 'interaction'
 * @param metadata   Any extra key/value pairs
 */
export async function trackStep(
  stepIndex: number,
  eventType: 'enter' | 'exit' | 'interaction',
  metadata?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;
  const sid = getSessionId();
  const version = getCurrentVersion();
  const stepNames = getStepNamesForVersion(version);

  // Calculate time in step
  let timeInStep: number | null = null;
  if (eventType === 'enter') {
    safeLocalStorage('set', STEP_ENTER_KEY, Date.now().toString());
  } else {
    const enterTime = safeLocalStorage('get', STEP_ENTER_KEY);
    if (enterTime) timeInStep = Math.round((Date.now() - parseInt(enterTime)) / 1000);
  }

  try {
    // Insert step event with funnel_version
    await supabase.from('lp_step_events').insert({
      session_id: sid,
      step_index: stepIndex,
      step_name: stepNames[stepIndex] || `step_${stepIndex}`,
      event_type: eventType,
      time_in_step: timeInStep,
      funnel_version: version,
      metadata: metadata || null,
    });

    // Update session's last_step and max_step_reached
    if (eventType === 'enter') {
      const { data: current } = await supabase
        .from('lp_sessions')
        .select('max_step_reached')
        .eq('session_id', sid)
        .single();
      const currentMax = current?.max_step_reached ?? 0;

      await supabase
        .from('lp_sessions')
        .update({
          last_step_reached: stepIndex,
          max_step_reached: Math.max(currentMax, stepIndex),
        })
        .eq('session_id', sid);
    }
    
    // Explicit signal of step progression
    if (stepIndex > 0) {
      promoteSessionToQualified();
    }
  } catch (e) {
    console.warn('[Analytics] trackStep failed:', e);
  }
}

/**
 * Track a granular interaction event (section visibility, CTA click, scroll, etc.)
 * Writes to the new `lp_interactions` table.
 */
export async function trackInteraction(
  interactionType: 'section_view' | 'cta_click' | 'scroll_depth' | 'form_focus' | 'route_choice' | 'form_start' | 'form_submit' | 'form_abandon' | 'whatsapp_redirect' | 'conversion_intent' | 'v4_form_start' | 'v4_step_view' | 'v4_step_answer' | 'v4_step_advance' | 'v4_form_submit' | 'v4_lead_generated' | 'v4_whatsapp_redirect' | 'v4_conversion_intent' | 'v4_form_abandon' | 'v4_step_dropoff',
  elementId: string,
  elementLabel?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;
  const sid = getSessionId();
  const version = getCurrentVersion();

  try {
    await supabase.from('lp_interactions').insert({
      session_id: sid,
      funnel_version: version,
      interaction_type: interactionType,
      element_id: elementId,
      element_label: elementLabel || null,
      metadata: metadata || null,
    });

    promoteSessionToQualified(); // Interaction qualifies session
  } catch (e) {
    console.warn('[Analytics] trackInteraction failed:', e);
  }
}

/**
 * Live Lead Capture — update session with real-time form data.
 */
export async function updateLiveLead(data: {
  lead_name?: string;
  lead_email?: string;
  lead_phone?: string;
  quiz_role?: string;
  quiz_team_size?: string;
  quiz_segment?: string;
  quiz_time_company?: string;
  is_converted?: boolean;
}): Promise<void> {
  if (typeof window === 'undefined') return;
  const sid = getSessionId();

  const payload: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) payload[k] = v;
  }
  if (Object.keys(payload).length === 0) return;

  try {
    const { error } = await supabase
      .from('lp_sessions')
      .update(payload)
      .eq('session_id', sid);
    if (error) console.warn('[Analytics] updateLiveLead error:', error.message);
  } catch (e) {
    console.warn('[Analytics] updateLiveLead failed:', e);
  }
}

/**
 * End session on tab close — uses fetch keepalive (survives beforeunload).
 */
export function endSessionBeacon(currentStep: number): void {
  if (typeof window === 'undefined') return;
  const sid = getSessionId();
  const startTime = safeLocalStorage('get', SESSION_START_KEY);
  const totalTimeSecs = startTime ? Math.round((Date.now() - parseInt(startTime)) / 1000) : 0;

  // Engagement score: 0-100 based on step depth and time
  const maxSteps = getCurrentVersion() === 'v4' ? 6 : 6;
  const stepScore = (Math.min(currentStep, maxSteps) / maxSteps) * 60;
  const timeScore = Math.min(totalTimeSecs / 180, 1) * 40;
  const engagementScore = Math.round((stepScore + timeScore) * 10) / 10;

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  const qualified = safeLocalStorage('get', 'atingi_lp_qualified');
  let sessionQuality: string | undefined = undefined;
  let humanProbable: boolean | undefined = undefined;

  if (!qualified) {
    if (totalTimeSecs === 0 && currentStep === 0) {
      sessionQuality = 'invalid';
    } else if (totalTimeSecs <= 2 && currentStep === 0) {
      sessionQuality = 'suspect';
    } else if (totalTimeSecs > 2) {
      sessionQuality = 'qualified';
      humanProbable = true;
    }
  }

  const payload: Record<string, unknown> = {
    total_time_secs: totalTimeSecs,
    engagement_score: engagementScore,
    last_step_reached: currentStep,
  };

  if (sessionQuality) payload.session_quality = sessionQuality;
  if (humanProbable !== undefined) payload.human_probable = humanProbable;

  try {
    fetch(`${SUPABASE_URL}/rest/v1/lp_sessions?session_id=eq.${sid}`, {
      method: 'PATCH',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn('[Analytics] endSessionBeacon failed:', e);
  }
}
