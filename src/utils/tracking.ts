/**
 * UTM & Tracking Parameter Capture and Passthrough
 * Ported from /funil project for the Atingi Landing Page.
 *
 * Captures UTM params, ad click IDs (fbclid, gclid, ttclid),
 * and custom params (src, sck) from URL and cookies.
 * Builds URLs with all tracked params appended.
 * Pushes events to dataLayer with UTM attribution.
 */

const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'src',
  'sck',
  'fbclid',
  'gclid',
  'ttclid',
];

const STORAGE_PREFIX = 'atingi_track_';

const WHATSAPP_URL = 'https://wa.me/5541987298735?text=Ol%C3%A1%2C%20vim%20pela%20Landing%20Page%20da%20Atingi.%20Gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20da%20Plataforma.';

function getQueryParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Collects all tracking params from multiple sources.
 * Priority: __RAW_ENTRY_PARAMS__ (head script) > URL > sessionStorage > cookies > packed cookie
 */
function collectTrackingParams(): URLSearchParams {
  const qs = getQueryParams();
  const out = new URLSearchParams();
  const raw = (typeof window !== 'undefined' ? (window as any).__RAW_ENTRY_PARAMS__ : {}) || {};

  // 0) HIGHEST PRIORITY: Raw params captured by inline <head> script before GTM/React
  TRACKING_KEYS.forEach((k) => {
    if (raw[k]) out.set(k, raw[k]);
  });

  // 1) URL params (may have been modified by GTM or redirects)
  TRACKING_KEYS.forEach((k) => {
    if (!out.get(k)) {
      const v = qs.get(k);
      if (v) out.set(k, v);
    }
  });

  // 2) Fallback: sessionStorage (survives SPA navigation, Facebook in-app browser)
  TRACKING_KEYS.forEach((k) => {
    if (!out.get(k)) {
      try {
        const v = sessionStorage.getItem(STORAGE_PREFIX + k) || localStorage.getItem(STORAGE_PREFIX + k);
        if (v) out.set(k, v);
      } catch (_e) { /* private browsing */ }
    }
  });

  // 3) Fallback: individual cookies
  TRACKING_KEYS.forEach((k) => {
    if (!out.get(k)) {
      const cv = getCookie(k);
      if (cv) out.set(k, cv);
    }
  });

  // 4) Fallback: packed cookie (utm_params / UTM / utm)
  if (!out.get('utm_source')) {
    const packed = getCookie('utm_params') || getCookie('UTM') || getCookie('utm');
    if (packed) {
      try {
        const packedParams = new URLSearchParams(packed);
        packedParams.forEach((val, key) => {
          if (!out.get(key)) out.set(key, val);
        });
      } catch (_e) {
        // ignore malformed cookie
      }
    }
  }

  return out;
}

/**
 * Saves current URL tracking params to cookies AND sessionStorage
 * for persistence across page navigations.
 * Call this once on app initialization.
 */
export function persistTrackingParams(): void {
  if (typeof window === 'undefined') return;
  const qs = getQueryParams();
  const raw = (window as any).__RAW_ENTRY_PARAMS__ || {};
  let found = 0;

  TRACKING_KEYS.forEach((k) => {
    const v = raw[k] || qs.get(k);
    if (v) {
      found++;
      // Cookie with 30-day expiry
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${k}=${encodeURIComponent(v)};path=/;expires=${expires};SameSite=Lax`;

      // sessionStorage & localStorage as backups for persistence across embedded browsers
      try {
        sessionStorage.setItem(STORAGE_PREFIX + k, v);
        localStorage.setItem(STORAGE_PREFIX + k, v);
      } catch (_e) { /* private browsing */ }
    }
  });

  if (found > 0) {
    console.log('[Tracking] Persisted', found, 'tracking params');
  }
}

/**
 * Builds the WhatsApp URL with UTM params forwarded.
 */
export function getWhatsAppUrl(): string {
  const tracking = collectTrackingParams();
  const url = new URL(WHATSAPP_URL);
  
  // Append UTM params as query params so they reach WhatsApp analytics
  tracking.forEach((val, key) => {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, val);
    }
  });

  return url.toString();
}

let isRedirecting = false;

/**
 * Submit lead + quiz data to GTM + n8n, then redirect to WhatsApp.
 * Called from CTA WhatsApp buttons on the LP AFTER the quiz.
 */
export function submitLeadAndRedirect(
  lead: { name: string; email: string; phone: string },
  source: string = 'landing_page',
  quizData?: { role: string; score: number; answers: Record<string, string>; frustrations: string[] }
): void {
  if (typeof window === 'undefined') return;
  if (isRedirecting) {
    console.warn('[Tracking] Previsto duplo disparo (debounce active). Ignorando envio.');
    return;
  }
  isRedirecting = true;
  
  const tracking = collectTrackingParams();
  const w = window as any;

  // Format phone: ensure 55 prefix
  const phoneDigits = lead.phone.replace(/\D/g, '');
  const formattedPhone = phoneDigits.startsWith('55') ? phoneDigits : '55' + phoneDigits;

  // 1. GTM DataLayer Push — 'lead' event with contact + quiz data
  w.dataLayer = w.dataLayer || [];
  const gtmPayload: Record<string, unknown> = {
    event: 'lead',
    lead_name: lead.name,
    lead_email: lead.email,
    lead_phone: formattedPhone,
    lead_source: source,
    utm_source: tracking.get('utm_source') || '',
    utm_medium: tracking.get('utm_medium') || '',
    utm_campaign: tracking.get('utm_campaign') || '',
    utm_content: tracking.get('utm_content') || '',
    utm_term: tracking.get('utm_term') || '',
    fbclid: tracking.get('fbclid') || '',
    sck: tracking.get('sck') || '',
  };
  if (quizData) {
    gtmPayload.quiz_role = quizData.role;
    gtmPayload.quiz_score = quizData.score;
    gtmPayload.quiz_frustrations = quizData.frustrations.join(',');
  }
  w.dataLayer.push(gtmPayload);
  console.log('[GTM] lead event pushed', { name: lead.name, source, quiz_score: quizData?.score });

  // 2. n8n Webhook via Internal Next.js Backend API (Server-Side Proxy)
  const payload: Record<string, string> = {
    data_conversao: new Date().toISOString(),
    nome: lead.name,
    email: lead.email,
    telefone: formattedPhone,
    nivel: quizData?.answers?.nivel || quizData?.role || '',
    tamanho: quizData?.answers?.tamanho || '',
    segmento: quizData?.answers?.segmento || '',
    tempo_empresa: quizData?.answers?.tempo_empresa || '',
    utm_source: tracking.get('utm_source') || '',
    utm_medium: tracking.get('utm_medium') || '',
    utm_campaign: tracking.get('utm_campaign') || '',
    utm_content: tracking.get('utm_content') || '',
    utm_term: tracking.get('utm_term') || '',
    sck: tracking.get('sck') || '',
    fbclid: tracking.get('fbclid') || '',
    page_url: window.location.href,
  };

  // 2. n8n Server-Side Webhook Proxy
  let popup: Window | null = null;
  const whatsappUrl = getWhatsAppUrl();
  try {
    popup = window.open('about:blank', '_blank');
  } catch (e) {
    // silently catch if browser instantly prevents synchronously
  }

  // We wait for the fetch to resolve (or fail) BEFORE navigating away, preventing browser aborts.
  fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  })
    .catch(err => console.warn('[Next.js/n8n API] webhook error:', err))
    .finally(() => {
      // 3. Open WhatsApp in a NEW TAB (or redirect) only AFTER fetch completes
      console.log('[Tracking] Opening WhatsApp:', whatsappUrl);
      
      if (popup) {
        popup.location.href = whatsappUrl;
      } else {
        window.location.href = whatsappUrl;
      }
      setTimeout(() => { isRedirecting = false; }, 3000);
    });
}

/**
 * Submit lead + quiz data to GTM + n8n, then redirect to Trial Onboarding.
 * Used exclusively for V3 Funnel.
 */
export function submitLeadAndTrialRedirect(
  lead: { name: string; email: string; phone: string },
  source: string = 'landing_page_trial',
  quizData?: { role: string; score: number; answers: Record<string, string>; frustrations: string[] }
): void {
  if (typeof window === 'undefined') return;
  if (isRedirecting) {
    console.warn('[Tracking] Previsto duplo disparo (debounce active). Ignorando envio.');
    return;
  }
  isRedirecting = true;
  
  const tracking = collectTrackingParams();
  const w = window as any;

  // Format phone: ensure 55 prefix
  const phoneDigits = lead.phone.replace(/\D/g, '');
  const formattedPhone = phoneDigits.startsWith('55') ? phoneDigits : '55' + phoneDigits;

  // 1. GTM DataLayer Push — FIRST push standard 'lead' event for GTM/Meta tag compatibility
  w.dataLayer = w.dataLayer || [];
  
  // Standard 'lead' event — triggers GTM tags (Meta Pixel, GA4, etc.)
  w.dataLayer.push({
    event: 'lead',
    lead_name: lead.name,
    lead_email: lead.email,
    lead_phone: formattedPhone,
    lead_source: source,
    lead_type: 'trial', // Differentiator for GTM triggers that need it
    utm_source: tracking.get('utm_source') || '',
    utm_medium: tracking.get('utm_medium') || '',
    utm_campaign: tracking.get('utm_campaign') || '',
    utm_content: tracking.get('utm_content') || '',
    utm_term: tracking.get('utm_term') || '',
    fbclid: tracking.get('fbclid') || '',
    sck: tracking.get('sck') || '',
  });
  console.log('[GTM] lead event pushed (trial compat)', { name: lead.name, source });

  // Secondary 'lead_trial' event — for specific internal analytics tracking
  const gtmPayload: Record<string, unknown> = {
    event: 'lead_trial',
    lead_name: lead.name,
    lead_email: lead.email,
    lead_phone: formattedPhone,
    lead_source: source,
    utm_source: tracking.get('utm_source') || '',
    utm_medium: tracking.get('utm_medium') || '',
    utm_campaign: tracking.get('utm_campaign') || '',
    utm_content: tracking.get('utm_content') || '',
    utm_term: tracking.get('utm_term') || '',
    fbclid: tracking.get('fbclid') || '',
    sck: tracking.get('sck') || '',
  };
  if (quizData) {
    gtmPayload.quiz_role = quizData.role;
    gtmPayload.quiz_score = quizData.score;
    gtmPayload.quiz_frustrations = quizData.frustrations.join(',');
  }
  w.dataLayer.push(gtmPayload);
  console.log('[GTM] lead_trial event pushed', { name: lead.name, source });

  // 2. n8n Webhook via Internal Next.js Backend API (Server-Side Proxy)
  const payload: Record<string, string> = {
    data_conversao: new Date().toISOString(),
    nome: lead.name,
    email: lead.email,
    telefone: formattedPhone,
    nivel: quizData?.answers?.nivel || quizData?.role || '',
    tamanho: quizData?.answers?.tamanho || '',
    segmento: quizData?.answers?.segmento || '',
    tempo_empresa: quizData?.answers?.tempo_empresa || '',
    utm_source: tracking.get('utm_source') || '',
    utm_medium: tracking.get('utm_medium') || '',
    utm_campaign: tracking.get('utm_campaign') || '',
    utm_content: tracking.get('utm_content') || '',
    utm_term: tracking.get('utm_term') || '',
    sck: tracking.get('sck') || '',
    fbclid: tracking.get('fbclid') || '',
    is_trial_v3: 'true',
    page_url: window.location.href,
  };

  fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  })
    .catch(err => console.warn('[Next.js/n8n API] webhook error:', err))
    .finally(() => {
      // 3. Mount Smart Onboarding URL (Trial Redirect)
      const trialParams = new URLSearchParams();
      trialParams.set('nome', lead.name);
      trialParams.set('email', lead.email);
      trialParams.set('telefone', formattedPhone);
      
      // Taxonomia compatibility for Trial API
      const lpRole = quizData?.answers?.nivel || quizData?.role || '';
      let mappedRole = '';
      if (lpRole === 'dono' || lpRole === 'consultor') mappedRole = 'ceo';
      if (lpRole === 'gestor') mappedRole = 'diretor';
      if (lpRole === 'coordenador') mappedRole = 'coordenador';
      
      if (mappedRole) trialParams.set('nivel', mappedRole);
      if (quizData?.answers?.tamanho) trialParams.set('tamanho', quizData.answers.tamanho);
      if (quizData?.answers?.segmento) trialParams.set('segmento', quizData.answers.segmento);
      if (quizData?.answers?.tempo_empresa) trialParams.set('tempo_empresa', quizData.answers.tempo_empresa);

      // Append UTMs to trial URL
      tracking.forEach((val, key) => {
        if (!trialParams.has(key)) trialParams.set(key, val);
      });

      const trialUrl = `https://app.atingi.com.br/atingi/start?${trialParams.toString()}`;
      console.log('[Tracking] Redirecting to Trial:', trialUrl);
      
      const w = window.open(trialUrl, '_self');
      if (!w) window.location.href = trialUrl;
      setTimeout(() => { isRedirecting = false; }, 3000);
    });
}

/**
 * Dispara evento explícito "pageview" para o Meta Pixel e GTM 
 * no carregamento completo da página, incluindo a versão do funil.
 */
export function trackPageView(version: string): void {
  if (typeof window === 'undefined') return;
  const tracking = collectTrackingParams();
  const w = window as any;

  w.dataLayer = w.dataLayer || [];
  
  const gtmPayload: Record<string, unknown> = {
    event: 'pageview',
    funnel_version: version,
    page_url: window.location.href,
    utm_source: tracking.get('utm_source') || '',
    utm_medium: tracking.get('utm_medium') || '',
    utm_campaign: tracking.get('utm_campaign') || '',
    utm_content: tracking.get('utm_content') || '',
    utm_term: tracking.get('utm_term') || '',
    fbclid: tracking.get('fbclid') || '',
    sck: tracking.get('sck') || '',
  };

  w.dataLayer.push(gtmPayload);
  console.log('[GTM] pageview event pushed:', { version });
}



