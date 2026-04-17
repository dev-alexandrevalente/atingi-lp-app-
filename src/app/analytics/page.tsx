'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, CartesianGrid, Legend } from 'recharts';

interface S {
  session_id: string; visitor_id?: string | null; is_paid_traffic?: boolean; session_quality?: 'raw' | 'invalid' | 'suspect' | 'qualified'; human_probable?: boolean;
  created_at: string; funnel_version: string | null;
  utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; utm_content: string | null; utm_term: string | null;
  fbclid: string | null; gclid: string | null; ttclid: string | null; sck: string | null; referrer: string | null; landing_url: string | null;
  device_type: string | null; screen_width: number | null; user_agent: string | null;
  quiz_role: string | null; quiz_team_size: string | null; quiz_segment: string | null; quiz_time_company: string | null;
  lead_name: string | null; lead_email: string | null; lead_phone: string | null;
  last_step_reached: number; max_step_reached: number; total_time_secs: number | null; engagement_score: number | null; is_converted: boolean;
}
interface E { session_id: string; step_index: number; step_name: string; event_type: string; time_in_step: number | null; created_at: string; funnel_version?: string; }
interface I { session_id: string; interaction_type: string; section_id: string | null; element_id: string | null; metadata: any; created_at: string; funnel_version?: string; }

const ROLE_L: Record<string, string> = { ceo: 'CEO / Dono', diretor: 'Diretor(a)', head: 'Head / Gerente', coordenador: 'Coordenador', padrao: 'Outro' };
const SEG_L: Record<string, string> = { agencia: 'Agência', tech: 'Tecnologia', consultoria: 'Consultoria', servicos: 'Serviços', industria: 'Indústria', educacao: 'Educação', outro: 'Outro' };
const TEAM_L: Record<string, string> = { '1-5': '1–5', '6-10': '6–10', '11-20': '11–20', '21-50': '21–50', '51-80': '51–80', '81+': '81+' };
const CLR = ['#02CE37', '#0EA5E9', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#14B8A6', '#F43F5E', '#10B981', '#3B82F6'];

const fmt = (n: number) => n.toLocaleString('pt-BR');
const pct = (a: number, b: number) => b > 0 ? Math.round((a / b) * 100) : 0;
const fmtT = (s: number | null) => { if (!s) return '—'; const m = Math.floor(s / 60); return m > 0 ? `${m}m ${Math.round(s % 60)}s` : `${Math.round(s)}s`; };

function parseOS(ua: string | null) { if (!ua) return 'Outro'; if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'; if (/Android/i.test(ua)) return 'Android'; if (/Windows/i.test(ua)) return 'Windows'; if (/Macintosh/i.test(ua)) return 'macOS'; return 'Outro'; }
function parseBR(ua: string | null) { if (!ua) return 'Outro'; if (/FBAN|FBAV/i.test(ua)) return 'FB In-App'; if (/Instagram/i.test(ua)) return 'Instagram'; if (/CriOS/i.test(ua)) return 'Chrome iOS'; if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome'; if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari'; if (/Firefox/i.test(ua)) return 'Firefox'; return 'Outro'; }
function classify(s: S): 'paid' | 'organic' { if (s.is_paid_traffic) return 'paid'; if (s.fbclid || s.gclid || s.ttclid) return 'paid'; if (s.utm_medium && /cpc|paid|ads|social/i.test(s.utm_medium)) return 'paid'; if (s.utm_source && /facebook|instagram|google|meta|tiktok/i.test(s.utm_source)) return 'paid'; return 'organic'; }

function getStepsForVersion(version: string | null) {
  if (version === 'v4') return { 0: '🎬 Split Hero', 1: '📋 Cargo', 2: '👥 Tamanho', 3: '🏢 Segmento', 4: '📅 Tempo', 5: '📞 Contato', 6: '✅ Conv.' };
  if (version === 'v3') return { 0: '🎬 Hero', 1: '🎯 Momento', 2: '⚠️ Obstáculo', 3: '🛠️ Ferram.', 4: '💸 Fat.', 5: '✅ Trial/Docs' };
  return { 0: '🎬 Hero', 1: '📲 Intro', 2: '👤 Cargo', 3: '👥 Time', 4: '🏢 Seg.', 5: '📅 Fund.', 6: '✅ Conv.' };
}

const Card = ({ label, value, color, sub }: { label: string; value: string | number; color: string; sub?: React.ReactNode }) => (
  <div style={{ background: '#111827', borderRadius: 12, padding: '14px 16px', border: '1px solid #1F2937' }}>
    <p style={{ color: '#9CA3AF', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5, margin: 0 }}>{label}</p>
    <p style={{ color, fontSize: 24, fontWeight: 800, margin: '4px 0 0', fontVariantNumeric: 'tabular-nums' }}>{value}</p>
    {sub && <div style={{ color: '#6B7280', fontSize: 10, margin: '3px 0 0' }}>{sub}</div>}
  </div>
);
const TH = ({ children }: { children: React.ReactNode }) => <th style={{ padding: '8px 10px', textAlign: 'left', color: '#6B7280', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>{children}</th>;
const TD = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <td style={{ padding: '8px 10px', color: '#D1D5DB', fontSize: 11, ...style }}>{children}</td>;
const badge = (color: string, text: string) => <span style={{ background: color + '20', color, padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{text}</span>;
const ttStyle = { background: '#111827', border: '1px solid #374151', borderRadius: 8, fontSize: 11, color: '#F9FAFB' };

export default function Analytics() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState(0);
  const [range, setRange] = useState('7d');
  const [cStart, setCStart] = useState('');
  const [cEnd, setCEnd] = useState('');
  const [sessions, setSessions] = useState<S[]>([]);
  const [events, setEvents] = useState<E[]>([]);
  const [interactions, setInteractions] = useState<I[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUp, setLastUp] = useState<Date | null>(null);
  const [tFilter, setTFilter] = useState<'all' | 'paid' | 'organic'>('all');
  const [vFilter, setVFilter] = useState<'all' | 'v1' | 'v2' | 'v3' | 'v4'>('all');
  const [page, setPage] = useState(1);
  const [xId, setXId] = useState<string | null>(null);
  const [adSpend, setAdSpend] = useState('');
  const [adClicks, setAdClicks] = useState('');
  const PP = 12;

  const [authError, setAuthError] = useState('');

  const load = useCallback(async (forcedPw?: string) => {
    setLoading(sessions.length === 0);
    setAuthError('');
    try {
      const q = new URLSearchParams({ range, ...(cStart && { start: cStart }), ...(cEnd && { end: cEnd }) });
      const currentPw = forcedPw || pw;
      const res = await fetch(`/api/analytics?${q}`, { headers: { 'Authorization': `Bearer ${currentPw}` } });
      if (!res.ok) {
        if (res.status === 401) {
          setAuth(false);
          setAuthError('Senha incorreta');
          return;
        }
        setAuthError('Erro ao carregar dados');
        return;
      }
      if (!auth) setAuth(true);
      // Persist password in sessionStorage for page refresh
      if (typeof window !== 'undefined') sessionStorage.setItem('atingi_analytics_pw', currentPw);
      const data = await res.json();
      setSessions(data.sessions || []);
      setEvents(data.events || []);
      setInteractions(data.interactions || []);
      setLastUp(new Date());
      setPage(1);
    } catch (e) {
      console.error(e);
      setAuthError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }, [range, cStart, cEnd, pw, sessions.length, auth]);

  // Auto-login from sessionStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedPw = sessionStorage.getItem('atingi_analytics_pw');
    if (savedPw && !auth) {
      setPw(savedPw);
      load(savedPw);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!auth) return;
    load();
    const i = setInterval(() => load(), 60000);
    return () => clearInterval(i);
  }, [auth, load]);

  const fs = useMemo(() => {
    let r = tFilter === 'all' ? sessions : sessions.filter(s => classify(s) === tFilter);
    if (vFilter !== 'all') r = r.filter(s => s.funnel_version === vFilter);
    return r;
  }, [sessions, tFilter, vFilter]);

  const m = useMemo(() => {
    const t = fs.length;
    const paid = fs.filter(s => s.is_paid_traffic || classify(s) === 'paid').length;
    
    // Enhanced Metrics for Session vs Visitor
    const qualified_sessions = fs.filter(s => s.session_quality === 'qualified' || s.human_probable || (!s.session_quality && s.total_time_secs && s.total_time_secs > 2)).length;
    const invalid_sessions = fs.filter(s => s.session_quality === 'invalid' || (!s.session_quality && (!s.total_time_secs || s.total_time_secs === 0) && s.max_step_reached === 0)).length;
    const suspect_sessions = fs.filter(s => s.session_quality === 'suspect' || (!s.session_quality && s.total_time_secs && s.total_time_secs <= 2 && s.max_step_reached === 0)).length;
    
    const unique_visitors = new Set(fs.map(s => s.visitor_id).filter(Boolean)).size;
    const visitors = new Set(fs.map(s => s.visitor_id || s.session_id)).size;
    
    const noiseRate = t > 0 ? pct(t - qualified_sessions, t) : 0;
    
    const converted = fs.filter(s => s.is_converted).length;
    const withEmail = fs.filter(s => s.lead_email).length;
    const bounces = fs.filter(s => s.max_step_reached === 0 && (s.total_time_secs ?? 0) < 5).length;
    const timed = fs.filter(s => s.total_time_secs && s.total_time_secs > 0);
    const avgTime = timed.length > 0 ? timed.reduce((a, s) => a + s.total_time_secs!, 0) / timed.length : 0;
    const avgScore = t > 0 ? fs.reduce((a, s) => a + (s.engagement_score || 0), 0) / t : 0;
    return { t, converted, withEmail, bounces, bounceRate: pct(bounces, t), avgTime, avgScore, paid, organic: t - paid, qualified_sessions, invalid_sessions, suspect_sessions, unique_visitors, visitors, noiseRate };
  }, [fs]);

  const funnel = useMemo(() => {
    const activeVersion = vFilter !== 'all' ? vFilter : 'v1';
    const STEPS = getStepsForVersion(activeVersion);
    const maxSteps = Object.keys(STEPS).length;
    
    return Array.from({ length: maxSteps }, (_, i) => {
      const reached = fs.filter(s => s.max_step_reached >= i).length;
      const prev = i > 0 ? fs.filter(s => s.max_step_reached >= i - 1).length : fs.length;
      return { 
        name: STEPS[i as keyof typeof STEPS] || `Step ${i}`, 
        count: reached, 
        pct: pct(reached, fs.length), 
        dropoff: i > 0 ? pct(prev - reached, prev) : 0, 
        advance: i > 0 && prev > 0 ? pct(reached, prev) : 100 
      };
    });
  }, [fs, vFilter]);

  const byField = useCallback((field: keyof S, labels?: Record<string, string>) => {
    const map: Record<string, { total: number; converted: number }> = {};
    fs.forEach(s => { const k = (s[field] as string) || 'N/A'; if (!map[k]) map[k] = { total: 0, converted: 0 }; map[k].total++; if (s.is_converted) map[k].converted++; });
    return Object.entries(map).map(([k, d]) => ({ name: labels?.[k] || k, ...d, convRate: pct(d.converted, d.total) })).sort((a, b) => b.total - a.total);
  }, [fs]);

  const sources = useMemo(() => {
    const map: Record<string, { source: string; campaign: string | null; medium: string | null; total: number; converted: number; leads: number; stepSum: number }> = {};
    fs.forEach(s => {
      const key = s.utm_source ? `${s.utm_source}|${s.utm_campaign || '(none)'}` : classify(s) === 'paid' ? 'pago_sem_utm' : 'organico';
      if (!map[key]) map[key] = { source: s.utm_source || 'Direto', campaign: s.utm_campaign, medium: s.utm_medium, total: 0, converted: 0, leads: 0, stepSum: 0 };
      map[key].total++; map[key].stepSum += s.max_step_reached;
      if (s.is_converted) map[key].converted++;
      if (s.lead_email) map[key].leads++;
    });
    return Object.values(map).map(d => ({ ...d, convRate: pct(d.converted, d.total), leadRate: pct(d.leads, d.total), avgStep: d.total > 0 ? Math.round(d.stepSum / d.total * 10) / 10 : 0 })).sort((a, b) => b.total - a.total);
  }, [fs]);

  const interactData = useMemo(() => {
    const targetInteractions = vFilter === 'all' ? interactions : interactions.filter(i => i.funnel_version === vFilter || (!i.funnel_version && /^v/.test(vFilter)));
    const sectionMap: Record<string, { views: number; time: number; events: number }> = {};
    const typeMap: Record<string, number> = {};
    targetInteractions.forEach(i => {
      typeMap[i.interaction_type] = (typeMap[i.interaction_type] || 0) + 1;
      if (i.section_id) {
        if (!sectionMap[i.section_id]) sectionMap[i.section_id] = { views: 0, time: 0, events: 0 };
        sectionMap[i.section_id].events++;
        if (i.interaction_type === 'section_view') {
          sectionMap[i.section_id].views++;
          sectionMap[i.section_id].time += i.metadata?.duration_ms ? i.metadata.duration_ms / 1000 : 0;
        }
      }
    });

    const sections = Object.entries(sectionMap).map(([id, d]) => ({
      id, views: d.views, events: d.events, avgTime: d.views > 0 ? d.time / d.views : 0
    })).sort((a, b) => b.views - a.views);

    return { typeMap, sections };
  }, [interactions, vFilter]);

  const versionCompare = useMemo(() => {
    const stats: Record<string, { total: number; leads: number; converted: number; bounces: number; time: number; tCount: number }> = {};
    ['v1', 'v2', 'v3', 'v4'].forEach(v => stats[v] = { total: 0, leads: 0, converted: 0, bounces: 0, time: 0, tCount: 0 });
    
    sessions.forEach(s => {
      const v = s.funnel_version || 'v1';
      if (!stats[v]) return;
      stats[v].total++;
      if (s.lead_email) stats[v].leads++;
      if (s.is_converted) stats[v].converted++;
      if (s.max_step_reached === 0 && (s.total_time_secs ?? 0) < 5) stats[v].bounces++;
      if (s.total_time_secs && s.total_time_secs > 0) { stats[v].time += s.total_time_secs; stats[v].tCount++; }
    });

    return Object.entries(stats).filter(([v, d]) => d.total > 0).map(([version, d]) => ({
      version: version.toUpperCase(),
      total: d.total,
      convRate: pct(d.converted, d.total),
      leadRate: pct(d.leads, d.total),
      bounceRate: pct(d.bounces, d.total),
      avgTime: d.tCount > 0 ? d.time / d.tCount : 0
    }));
  }, [sessions]);

  const liveLeads = useMemo(() => sessions.filter(s => new Date(s.created_at) >= new Date(Date.now() - 15 * 60000) && !s.is_converted && s.max_step_reached > 0), [sessions]);

  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030712', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <div style={{ background: '#111827', borderRadius: 16, padding: '40px 32px', maxWidth: 360, width: '100%', border: '1px solid #1F2937' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 4, textAlign: 'center' }}>📊 Analytics</h1>
        <p style={{ color: '#6B7280', fontSize: 13, textAlign: 'center', marginBottom: 24 }}>Atingi LP Intelligence</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && load(pw)} placeholder="Senha de acesso"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #374151', background: '#0D1117', color: '#fff', fontSize: 14, marginBottom: 16, boxSizing: 'border-box', outline: 'none' }} />
        {authError && <p style={{ color: '#EF4444', fontSize: 12, textAlign: 'center', margin: '-8px 0 16px', fontWeight: 600 }}>{authError}</p>}
        <button onClick={() => load(pw)}
          style={{ width: '100%', padding: 12, borderRadius: 10, background: '#02CE37', color: '#030712', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          {loading ? 'Verificando...' : 'Acessar Dashboard'}
        </button>
      </div>
    </div>
  );

  const tabs = ['📊 Funil', '📋 Leads', '🏢 Segmentos', '🎯 Atribuição', '🔍 Heatmap', '⚖️ Comparativo', '🧠 Diagnóstico'];

  return (
    <div style={{ minHeight: '100vh', overflowY: 'auto', background: '#030712', color: '#F9FAFB', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #1F2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>📊 Atingi LP Analytics</h1>
          <p style={{ color: '#6B7280', fontSize: 11, margin: '2px 0 0' }}>{fmt(sessions.length)} sessões · {lastUp ? `atualizado ${lastUp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : ''}{liveLeads.length > 0 && <span style={{ color: '#02CE37', marginLeft: 8 }}>🟢 {liveLeads.length} ao vivo</span>}</p>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#6B7280' }}>Versão:</span>
          {(['all', 'v1', 'v2', 'v3', 'v4'] as const).map(v => (
            <button key={v} onClick={() => setVFilter(v)} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: vFilter === v ? '#02CE37' : '#111827', color: vFilter === v ? '#030712' : '#9CA3AF', border: 'none', cursor: 'pointer' }}>
              {v === 'all' ? 'Todas' : v.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => load()} style={{ padding: '5px 8px', borderRadius: 6, fontSize: 13, background: '#111827', color: '#9CA3AF', border: '1px solid #1F2937', cursor: 'pointer' }}>🔄</button>
          {['today', 'yesterday', '7d', '30d', '90d', 'custom'].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: range === r ? '#02CE37' : '#111827', color: range === r ? '#030712' : '#9CA3AF', border: 'none', cursor: 'pointer' }}>
              {r === 'today' ? 'Hoje' : r === 'yesterday' ? 'Ontem' : r === 'custom' ? 'Custom' : r}
            </button>
          ))}
          {range === 'custom' && (
            <div style={{ display: 'flex', gap: 4, marginLeft: 8, alignItems: 'center' }}>
              <input type="date" value={cStart} onChange={e => setCStart(e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, fontSize: 11, background: '#111827', color: '#fff', border: '1px solid #374151', colorScheme: 'dark' }} />
              <span style={{ color: '#6B7280', fontSize: 11 }}>até</span>
              <input type="date" value={cEnd} onChange={e => setCEnd(e.target.value)} style={{ padding: '4px 8px', borderRadius: 6, fontSize: 11, background: '#111827', color: '#fff', border: '1px solid #374151', colorScheme: 'dark' }} />
              <button onClick={() => load()} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#0EA5E9', color: '#fff', border: 'none', cursor: 'pointer' }}>Aplicar</button>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {([['all', '🌐 Todos', fs.length], ['paid', '📢 Pago', m.paid], ['organic', '🌱 Org.', m.organic]] as const).map(([k, l, c]) => (
            <button key={k} onClick={() => setTFilter(k)} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: tFilter === k ? (k === 'paid' ? '#7C3AED' : k === 'organic' ? '#059669' : '#02CE37') : '#111827', color: tFilter === k ? '#fff' : '#9CA3AF', border: tFilter === k ? 'none' : '1px solid #1F2937', cursor: 'pointer' }}>
              {l} ({c})
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 8, padding: '12px 20px' }}>
        <Card label="✅ Convertidos" value={m.converted} color="#02CE37" sub={`${pct(m.converted, m.visitors)}% dos Humanos`} />
        <Card label="👥 Humanos Únicos" value={fmt(m.visitors)} color="#0EA5E9" sub={`${m.unique_visitors > 0 ? m.unique_visitors + ' c/ V_ID' : 'Legado'}`} />
        <Card label="🔥 Sessões Qual." value={fmt(m.qualified_sessions)} color="#F59E0B" sub={`${pct(m.qualified_sessions, m.t)}% de limpeza`} />
        <Card label="🗑️ Ruído/Bots" value={fmt(m.invalid_sessions + m.suspect_sessions)} color="#EF4444" sub={`${m.noiseRate}% tx de ruído`} />
        <Card label="🌐 Acessos Brutos" value={fmt(m.t)} color="#14B8A6" sub={`(Tráfego Inflado)`} />
        <Card label="📢 Cliques Pagos" value={m.paid} color="#7C3AED" sub={`${m.organic} orgânico (Bruto)`} />
      </div>

      <div style={{ display: 'flex', gap: 0, padding: '0 20px', borderBottom: '1px solid #1F2937', overflowX: 'auto' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding: '10px 16px', fontSize: 12, fontWeight: 600, color: tab === i ? '#fff' : '#6B7280', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: tab === i ? '2px solid #02CE37' : '2px solid transparent', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '16px 20px' }}>
        {loading ? (<div style={{ textAlign: 'center', padding: 60, color: '#6B7280' }}>⏳ Atualizando Analytics Seguramente...</div>) : (<>

          {/* TAB 0: FUNIL */}
          {tab === 0 && (<div>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Funil de Conversão {vFilter !== 'all' ? `(${vFilter.toUpperCase()})` : '(Visão Geral)'}</h2>
            <div style={{ height: 300, marginBottom: 24 }}>
              <ResponsiveContainer><BarChart data={funnel} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} stroke="#374151" fontSize={10} />
                <YAxis type="category" dataKey="name" width={120} stroke="#374151" fontSize={11} tick={{ fill: '#D1D5DB' }} />
                <Tooltip formatter={(v) => [`${v}%`, 'Retenção']} contentStyle={ttStyle} />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} fill="#02CE37" />
              </BarChart></ResponsiveContainer>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead><tr style={{ borderBottom: '1px solid #1F2937' }}>{['Etapa', 'Alcançaram', '% Total', 'Drop-off', 'Avanço'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                <tbody>{funnel.map((step, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #111827' }}>
                    <TD style={{ fontWeight: 600 }}>{step.name}</TD><TD>{fmt(step.count)}</TD><TD>{badge('#02CE37', `${step.pct}%`)}</TD>
                    <TD>{i > 0 ? <span style={{ color: step.dropoff > 30 ? '#EF4444' : step.dropoff > 15 ? '#F59E0B' : '#02CE37', fontWeight: 600 }}>-{step.dropoff}%</span> : '—'}</TD>
                    <TD style={{ color: '#9CA3AF' }}>{i > 0 ? `${step.advance}%` : '—'}</TD>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            
            <h3 style={{ fontSize: 13, fontWeight: 700, margin: '24px 0 12px', color: '#D1D5DB' }}>⏱️ Tempo Médio por Etapa</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))', gap: 8 }}>
              {funnel.map((step, i) => {
                const stepVer = vFilter !== 'all' ? vFilter : 'v1';
                const sName = getStepsForVersion(stepVer)[i as keyof ReturnType<typeof getStepsForVersion>];
                const evts = events.filter(e => e.step_index === i && (!e.funnel_version || e.funnel_version === stepVer || vFilter === 'all') && e.time_in_step != null && e.time_in_step > 0);
                const avg = evts.length > 0 ? evts.reduce((a, e) => a + e.time_in_step!, 0) / evts.length : 0;
                return (
                  <div key={i} style={{ background: '#111827', borderRadius: 8, padding: '10px 12px', textAlign: 'center', border: '1px solid #1F2937' }}>
                    <p style={{ fontSize: 10, color: '#6B7280', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{sName}</p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: '#02CE37', margin: '4px 0 0' }}>{fmtT(avg)}</p>
                  </div>
                );
              })}
            </div>
          </div>)}

          {/* TAB 1: LEADS */}
          {tab === 1 && (() => {
            const leads = fs.filter(s => s.lead_email || s.lead_name);
            const paged = leads.slice((page - 1) * PP, page * PP);
            return (<div>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Leads Capturados ({leads.length})</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                  <thead><tr style={{ borderBottom: '1px solid #1F2937' }}>{['Nome', 'Email', 'Cargo', 'Time', 'Versão', 'Status', 'Data'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                  <tbody>{paged.map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #111827' }}>
                      <TD style={{ fontWeight: 600, color: '#E5E7EB' }}>{s.lead_name || '—'}</TD><TD>{s.lead_email || '—'}</TD>
                      <TD>{ROLE_L[s.quiz_role || ''] || s.quiz_role || '—'}</TD><TD>{TEAM_L[s.quiz_team_size || ''] || s.quiz_team_size || '—'}</TD>
                      <TD>{badge(s.funnel_version === 'v4' ? '#EC4899' : s.funnel_version === 'v3' ? '#8B5CF6' : s.funnel_version === 'v2' ? '#0EA5E9' : '#6366f1', (s.funnel_version || 'v1').toUpperCase())}</TD>
                      <TD>{badge(s.is_converted ? '#02CE37' : '#F59E0B', s.is_converted ? '✅ Conv.' : `Step ${s.max_step_reached}`)}</TD>
                      <TD style={{ color: '#4B5563', fontSize: 10 }}>{new Date(s.created_at).toLocaleDateString()}</TD>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>);
          })()}

          {/* TAB 2, TAB 3 OMITTED FOR BREVITY / KEPT SIMILAR TO ORIGINAL IF NEEDED (Removed to save space, but keeping core attribution) */}
          {tab === 2 && (<div>
             <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Demográficos e Segmentação</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 8, marginBottom: 20 }}>
              {byField('quiz_segment', SEG_L).map((r, i) => (
                <div key={i} style={{ background: '#111827', borderRadius: 10, padding: '12px 14px', border: '1px solid #1F2937' }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#E5E7EB', margin: 0 }}>{r.name}</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: '#02CE37', margin: '4px 0' }}>{r.total}</p>
                  <p style={{ fontSize: 10, color: '#6B7280', margin: 0 }}>Conv: {r.convRate}%</p>
                </div>
              ))}
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer><BarChart data={byField('quiz_role', ROLE_L)}>
                <XAxis dataKey="name" stroke="#374151" fontSize={10} /><YAxis stroke="#374151" fontSize={10} /><Tooltip contentStyle={ttStyle} />
                <Bar dataKey="total" name="Sessões" fill="#0EA5E9" radius={[4, 4, 0, 0]} /><Bar dataKey="converted" name="Conv" fill="#02CE37" radius={[4, 4, 0, 0]} />
              </BarChart></ResponsiveContainer>
            </div>
          </div>)}

          {tab === 3 && (<div>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Atribuição: {sources.length} Origens Encontradas</h2>
            <div style={{ overflowX: 'auto', marginBottom: 28 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                <thead><tr style={{ borderBottom: '1px solid #1F2937' }}>{['Fonte', 'Campanha', 'Sessões', 'Leads', 'Conv', 'Conv %'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                <tbody>{sources.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #111827' }}>
                    <TD style={{ fontWeight: 600, color: s.source !== 'Direto' ? '#8B5CF6' : '#6B7280' }}>{s.source}</TD>
                    <TD style={{ color: '#9CA3AF' }}>{s.campaign || '—'}</TD><TD>{s.total}</TD><TD style={{ color: '#0EA5E9' }}>{s.leads}</TD>
                    <TD style={{ color: '#02CE37', fontWeight: 600 }}>{s.converted}</TD><TD>{badge(s.convRate > 5 ? '#02CE37' : '#EF4444', `${s.convRate}%`)}</TD>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>)}

          {/* TAB 4: HEATMAP / SECTIONS */}
          {tab === 4 && (<div>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>🔍 Heatmap de Interações</h2>
            <p style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 20 }}>Visão granular habilitada pelo sistema universal de tracking.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 24 }}>
              <div style={{ background: '#111827', borderRadius: 12, padding: 16, border: '1px solid #1F2937' }}>
                <h3 style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 8, textTransform: 'uppercase' }}>Por Tipo de Evento</h3>
                {Object.entries(interactData.typeMap).sort((a, b) => b[1] - a[1]).map(([t, c], i) => (
                  <div key={t} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1F2937', fontSize: 12 }}>
                    <span style={{ color: '#D1D5DB' }}>{t}</span><span style={{ color: '#02CE37', fontWeight: 600 }}>{fmt(c)}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#D1D5DB' }}>👀 Visibilidade e Retenção por Seção</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                <thead><tr style={{ borderBottom: '1px solid #1F2937' }}>{['Seção (ID)', 'Visualizações', 'Outros Eventos', 'Tempo Médio'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                <tbody>{interactData.sections.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #111827' }}>
                    <TD style={{ fontWeight: 600, color: '#E5E7EB' }}>{s.id}</TD>
                    <TD>{badge('#0EA5E9', fmt(s.views))}</TD><TD>{s.events - s.views}</TD>
                    <TD style={{ color: '#F59E0B' }}>{fmtT(s.avgTime)}</TD>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>)}

          {/* TAB 5: COMPARATIVO */}
          {tab === 5 && (<div>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>⚖️ Comparativo de Versões</h2>
            <p style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 20 }}>Batalha das landing pages (V1 vs V2 vs V3 vs V4).</p>
            
            <div style={{ height: 260, marginBottom: 24 }}>
              <ResponsiveContainer><BarChart data={versionCompare}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="version" stroke="#374151" fontSize={12} tick={{ fill: '#D1D5DB' }} />
                <YAxis stroke="#374151" fontSize={11} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={ttStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="convRate" name="Taxa de Conversão" fill="#02CE37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leadRate" name="Captura de Lead" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bounceRate" name="Bounce" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart></ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
              {versionCompare.map((v, i) => (
                <div key={v.version} style={{ background: '#111827', borderRadius: 12, padding: 16, border: `1px solid ${v.version === 'V4' ? '#EC4899' : '#1F2937'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{v.version}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{v.total} sessões</span>
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6B7280', fontSize: 12 }}>Conversão:</span><span style={{ color: '#02CE37', fontWeight: 700, fontSize: 13 }}>{v.convRate}%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6B7280', fontSize: 12 }}>Leads:</span><span style={{ color: '#0EA5E9', fontWeight: 700, fontSize: 13 }}>{v.leadRate}%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6B7280', fontSize: 12 }}>Bounce:</span><span style={{ color: '#EF4444', fontWeight: 700, fontSize: 13 }}>{v.bounceRate}%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6B7280', fontSize: 12 }}>Tempo Médio:</span><span style={{ color: '#14B8A6', fontWeight: 700, fontSize: 13 }}>{fmtT(v.avgTime)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>)}

          {/* TAB 6: DIAGNÓSTICO (V4 FOCUS & RUPTURA) */}
          {tab === 6 && (<div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#F9FAFB', marginBottom: 4 }}>🧠 Diagnóstico de Ruptura (Intent Leakage)</h2>
            <p style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 24 }}>Análise detalhada do comportamento de conversão e evasão (drop-off).</p>

            {/* V4 Journey Specific Tracking */}
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#0EA5E9' }}>Jornada de Alta Definição (V4)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginBottom: 32 }}>
              {(() => {
                const map: Record<string, number> = {};
                interactions.filter(i => i.interaction_type.startsWith('v4_')).forEach(i => map[i.interaction_type] = (map[i.interaction_type] || 0) + 1);
                const order = ['v4_form_start', 'v4_step_view', 'v4_step_answer', 'v4_step_advance', 'v4_form_submit', 'v4_lead_generated', 'v4_whatsapp_redirect'];
                const dropoffs = ['v4_step_dropoff', 'v4_form_abandon'];
                
                return (
                  <>
                    <div style={{ background: '#111827', borderRadius: 12, padding: 16, border: '1px solid #1F2937', gridColumn: '1 / -1' }}>
                      <p style={{ fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Funil de Intenção e Conversão Real</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {order.map((key, idx) => (
                           <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                             <div style={{ background: '#0D1117', padding: '8px 12px', borderRadius: 8, border: '1px solid #374151', minWidth: 140 }}>
                                <div style={{ fontSize: 9, color: '#6B7280', textTransform: 'uppercase' }}>{key.replace('v4_', '')}</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#02CE37' }}>{fmt(map[key] || 0)}</div>
                             </div>
                             {idx < order.length - 1 && <span style={{ color: '#374151' }}>→</span>}
                           </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ background: '#111827', borderRadius: 12, padding: 16, border: '1px solid #EF444450' }}>
                      <p style={{ fontSize: 11, color: '#EF4444', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Vazamentos (Drop-offs)</p>
                      {dropoffs.map(key => (
                         <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #1F2937' }}>
                           <span style={{ fontSize: 12, color: '#D1D5DB' }}>{key.replace('v4_', '')}</span>
                           <span style={{ fontSize: 14, fontWeight: 700, color: '#EF4444' }}>{fmt(map[key] || 0)}</span>
                         </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>

            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#D1D5DB' }}>Pontos de Fricção Crítica (Comparativo)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 12 }}>
               {versionCompare.map(v => (
                 <div key={v.version} style={{ background: '#111827', borderRadius: 12, padding: 16, border: `1px solid ${v.version === 'V4' ? '#EC4899' : '#1F2937'}` }}>
                   <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>{v.version}</p>
                   {v.bounceRate > 40 ? <p style={{ fontSize: 12, color: '#EF4444', margin: '4px 0' }}>🚨 Rejeição alta na primeira dobra ({v.bounceRate}%)</p> : <p style={{ fontSize: 12, color: '#02CE37', margin: '4px 0' }}>✅ Boa retenção inicial ({v.bounceRate}% bounce)</p>}
                   {v.convRate < 10 ? <p style={{ fontSize: 12, color: '#F59E0B', margin: '4px 0' }}>⚠️ Baixa taxa de fechamento final ({v.convRate}%)</p> : <p style={{ fontSize: 12, color: '#02CE37', margin: '4px 0' }}>🔥 Conversão saudável ({v.convRate}%)</p>}
                   <p style={{ fontSize: 11, color: '#9CA3AF', margin: '8px 0 0', lineHeight: 1.5 }}>
                     A versão {v.version} foca em capturar {v.total} leads. Com um leadRate de {v.leadRate}%, 
                     {v.leadRate > v.convRate * 1.5 ? ' muitos geram interesse mas caem no final (WhatsApp).' : ' a evolução até o chat é consistente.'}
                   </p>
                 </div>
               ))}
            </div>

          </div>)}

        </>)}
      </div>
    </div>
  );
}
