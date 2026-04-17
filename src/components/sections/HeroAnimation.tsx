"use client";

import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════ */
const BRAND = "#02CE37";
const GOLD = "#FFD700";
const SILVER = "#C0C0C0";
const BRONZE = "#CD7F32";
const WARN = "#f59e0b";
const ERROR = "#ef4444";
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ═══════════════════════════════════════════════════════════════════════
   ACT SYSTEM — tuned timing per scene complexity
   ═══════════════════════════════════════════════════════════════════════ */
enum Act { CHAOS, CENTRALIZE, TRANSFORM, DISTRIBUTE, EVOLVE, RANK }
// Chaos: fast read   | Teia: absorb impact | Transform: understand OKR
// Distribute: see links | Evolve: watch bars | Rank: absorb & reward
const ACT_MS = [4500, 6000, 5500, 5000, 5000, 6000];

const LABELS: Record<Act, { pre: string; em: string }> = {
  [Act.CHAOS]: { pre: "Empresa operando com", em: "caos e desalinhamento" },
  [Act.CENTRALIZE]: { pre: "Atingi absorve e", em: "centraliza tudo" },
  [Act.TRANSFORM]: { pre: "Transformando em", em: "objetivos e metas claras" },
  [Act.DISTRIBUTE]: { pre: "Distribuindo execução para", em: "líderes e equipes" },
  [Act.EVOLVE]: { pre: "Acompanhando", em: "performance em tempo real" },
  [Act.RANK]: { pre: "Reconhecendo os", em: "top performers" },
};

/* ═══════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════ */

const CHAOS_PAIRS = [
  { problem: "Metas sem responsável", pIcon: "⚠️" },
  { problem: "KPIs desatualizados", pIcon: "📉" },
  { problem: "Dados em planilhas", pIcon: "🗂️" },
  { problem: "Áreas desalinhadas", pIcon: "❌" },
  { problem: "Sem previsibilidade", pIcon: "🔴" },
];

const OKR_TREE = [
  { depth: 0, type: "OBJ", label: "Crescer Receita 40%", pct: 78 },
  { depth: 1, type: "KR", label: "Fechar 200 contratos", pct: 65 },
  { depth: 1, type: "KR", label: "Ticket médio +20%", pct: 82 },
  { depth: 0, type: "OBJ", label: "Eficiência Operacional", pct: 48 },
  { depth: 1, type: "KR", label: "Reduzir custo 15%", pct: 48 },
];

const TEAM = [
  { name: "Marina S.", dept: "Comercial", pts: 3875, pct: 92, goal: "R$ 1M faturamento", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
  { name: "Lucas F.", dept: "Marketing", pts: 3700, pct: 87, goal: "40 leads qualificados", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { name: "Camila S.", dept: "Produto", pts: 3500, pct: 81, goal: "3 entregas/mês", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { name: "Pedro M.", dept: "Financeiro", pts: 3200, pct: 72, goal: "Custo -15%", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
];

const IFOOD_LOGO = `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/ifood_logo_1.webp`;

/* ═══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

function Sparkline({ color, delay = 0, rising = true }: { color: string; delay?: number; rising?: boolean }) {
  const path = rising
    ? "M0 20 L8 18 L16 15 L24 16 L32 10 L40 8 L48 3"
    : "M0 5 L8 8 L16 14 L24 12 L32 18 L40 19 L48 20";
  return (
    <m.svg width="48" height="24" viewBox="0 0 48 24" className="flex-shrink-0"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.5 }}>
      <m.path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeOut" }} />
    </m.svg>
  );
}

function CircleProgress({ pct, color, size = 32, delay = 0 }: { pct: number; color: string; size?: number; delay?: number }) {
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <m.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0"
      style={{ transform: "rotate(-90deg)" }}
      initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.5, ease }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={3} />
      <m.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round"
        strokeDasharray={circ} initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ delay: delay + 0.3, duration: 1.5, ease }} />
    </m.svg>
  );
}

function EngineOrb({ size = 48, active = false }: { size?: number; active?: boolean }) {
  const c = size / 2;
  const r = size * 0.37;
  const teeth = 8;
  const toothH = size * 0.07;
  const gearPath = (() => {
    const pts: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2;
      const a2 = ((i + 0.35) / teeth) * Math.PI * 2;
      const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const a4 = ((i + 0.85) / teeth) * Math.PI * 2;
      pts.push(`${c + Math.cos(a1) * r},${c + Math.sin(a1) * r}`);
      pts.push(`${c + Math.cos(a2) * (r + toothH)},${c + Math.sin(a2) * (r + toothH)}`);
      pts.push(`${c + Math.cos(a3) * (r + toothH)},${c + Math.sin(a3) * (r + toothH)}`);
      pts.push(`${c + Math.cos(a4) * r},${c + Math.sin(a4) * r}`);
    }
    return `M ${pts.join(' L ')} Z`;
  })();
  return (
    <m.div style={{ width: size, height: size }}
      animate={active ? { scale: [1, 1.06, 1] } : {}}
      transition={active ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="ha-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={BRAND} /><stop offset="100%" stopColor="#86efac" />
          </linearGradient>
          <radialGradient id="ha-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd660" /><stop offset="100%" stopColor={BRAND} />
          </radialGradient>
        </defs>
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur={active ? "4s" : "14s"} repeatCount="indefinite" />
          <path d={gearPath} fill="url(#ha-g)" stroke={BRAND} strokeWidth={0.8} opacity={0.9} />
        </g>
        <circle cx={c} cy={c} r={r * 0.55} fill="url(#ha-c)" />
        <circle cx={c} cy={c} r={size * 0.06} fill="white" opacity={0.9}>
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ACT 1 — CHAOS
   ═══════════════════════════════════════════════════════════════════════ */
function SceneChaos() {
  return (
    <div className="relative px-5 sm:px-8 py-5 h-full flex flex-col">
      {/* Broken web SVG background - escondido no mobile */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.06]">
        <m.line x1="8%" y1="15%" x2="42%" y2="35%" stroke={ERROR} strokeWidth={1.5} strokeDasharray="6 8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
        <m.line x1="58%" y1="10%" x2="92%" y2="45%" stroke={WARN} strokeWidth={1.5} strokeDasharray="6 8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
        <m.line x1="15%" y1="65%" x2="60%" y2="85%" stroke={ERROR} strokeWidth={1.5} strokeDasharray="6 8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
        <m.line x1="72%" y1="60%" x2="48%" y2="92%" stroke={WARN} strokeWidth={1.5} strokeDasharray="6 8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }} />
        {[["12%","22%"],["46%","32%"],["88%","42%"],["25%","72%"],["68%","78%"]].map(([cx2,cy2], i) => (
          <m.circle key={i} cx={cx2} cy={cy2} r={3.5} fill={i % 2 === 0 ? ERROR : WARN}
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, delay: 0.3 + i * 0.2, repeat: Infinity }} />
        ))}
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[19px] sm:text-[15px] font-bold text-slate-800">Painel da Empresa</span>
        <m.span
          className="text-[15px] sm:text-[13px] text-red-500 font-semibold flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-full"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" style={{ animation: "pulse-dot 1.5s infinite" }} />
          5 alertas críticos
        </m.span>
      </div>

      {/* Problem rows */}
      <div className="relative z-10 flex flex-col gap-2.5 flex-1">
        {CHAOS_PAIRS.map((pair, i) => (
          <m.div key={i}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border"
            style={{ borderColor: `${i % 2 === 0 ? ERROR : WARN}20` }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease }}
          >
            <span className="text-[22px] sm:text-[18px] flex-shrink-0">{pair.pIcon}</span>
            <span className="text-[18px] sm:text-[15px] font-semibold text-slate-700 flex-1">{pair.problem}</span>
            <Sparkline color={i % 2 === 0 ? ERROR : WARN} delay={0.4 + i * 0.15} rising={false} />
          </m.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ACT 2 — CENTRALIZE (teia) — clean alignment, no overlaps
   ═══════════════════════════════════════════════════════════════════════ */
function SceneCentralize({ mob }: { mob: boolean }) {
  const nodes = [
    { label: "Metas", icon: "🎯" },
    { label: "KPIs", icon: "📊" },
    { label: "Projetos", icon: "📋" },
    { label: "Equipes", icon: "👥" },
    { label: "Dados", icon: "🗂️" },
    { label: "Áreas", icon: "🏢" },
  ];
  const count = nodes.length;

  // Layout mode
  const VW = mob ? 340 : 600;
  const VH = mob ? 520 : 360;
  
  // Desktop: center orb
  // Mobile: bottom orb + top arc
  const cx = VW / 2;
  const cy = mob ? 400 : VH / 2;
  
  const lineR = mob ? 220 : 140;   
  const ringR1 = mob ? 60 : 50;    
  const ringR2 = mob ? 120 : 90;    
  const ringR3 = mob ? 180 : 130;  
  const engS = mob ? 80 : 70;      
  const lblW = 100;      
  const lblH = 32;      

  const nodePos = nodes.map((_, i) => {
    if (mob) {
      // Majestic vertical arc at the top
      const startAngle = Math.PI * 1.15; // top left
      const endAngle = Math.PI * 1.85;   // top right
      const angle = startAngle + (i / (count - 1)) * (endAngle - startAngle);
      // stagger radius slightly for depth
      const r = lineR + ((i % 2) * 30);
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle };
    } else {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(angle) * lineR, y: cy + Math.sin(angle) * lineR, angle };
    }
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "100%" }}
      >
        <defs>
          <radialGradient id="ha-cg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={BRAND} stopOpacity="0.18" />
            <stop offset="60%" stopColor={BRAND} stopOpacity="0.04" />
            <stop offset="100%" stopColor={BRAND} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Background glow ── */}
        <m.circle cx={cx} cy={cy} r={mob ? 160 : 130} fill="url(#ha-cg2)"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

        {/* ── 3 concentric orbit rings ── */}
        {[
          { r: ringR1, dash: "3 8", dur: "8s", dir: 1, op: 0.3 },
          { r: ringR2, dash: "4 10", dur: "14s", dir: -1, op: 0.2 },
          { r: ringR3, dash: "5 12", dur: "20s", dir: 1, op: 0.12 },
        ].map((ring, i) => (
          <circle key={`r-${i}`} cx={cx} cy={cy} r={ring.r}
            fill="none" stroke={BRAND} strokeWidth={1.2} strokeDasharray={ring.dash} opacity={ring.op}>
            <animateTransform attributeName="transform" type="rotate"
              from={`${ring.dir > 0 ? 0 : 360} ${cx} ${cy}`}
              to={`${ring.dir > 0 ? 360 : 0} ${cx} ${cy}`}
              dur={ring.dur} repeatCount="indefinite" />
          </circle>
        ))}

        {/* ── Web lines: each node → center ── */}
        {nodePos.map((pos, i) => (
          <g key={`web-${i}`}>
            {/* Main line */}
            <m.line x1={pos.x} y1={pos.y} x2={cx} y2={cy}
              stroke={BRAND} strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease }} />
            <circle cx={pos.x} cy={pos.y} r={3} fill={BRAND} opacity={0.6} />
            {/* 2 particle streams per line (DESATIVADO NO MOBILE) */}
            {!mob && [0, 1].map((d) => (
              <m.circle key={d} fill={BRAND}
                initial={{ cx: pos.x, cy: pos.y, r: 2.5, opacity: 0 }}
                animate={{
                  cx: [pos.x, cx], cy: [pos.y, cy],
                  opacity: [0, 0.85, 0.85, 0],
                }}
                transition={{
                  duration: 1.8, delay: 0.5 + i * 0.12 + d * 0.9,
                  repeat: Infinity, repeatDelay: 2,
                  times: [0, 0.12, 0.8, 1], ease: "easeIn",
                }} />
            ))}
          </g>
        ))}

        {/* ── Hexagonal mesh connecting outer nodes ── */}
        {nodePos.map((pos, i) => {
          const next = nodePos[(i + 1) % count];
          return (
            <m.line key={`hex-${i}`}
              x1={pos.x} y1={pos.y} x2={next.x} y2={next.y}
              stroke={BRAND} strokeWidth={1} strokeDasharray="3 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, delay: 0.8 + i * 0.08, ease }} />
          );
        })}

        {/* ── Node labels via foreignObject (same coordinate space) ── */}
        {nodePos.map((pos, i) => (
          <m.g key={`lbl-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}>
            <foreignObject
              x={pos.x - lblW / 2}
              y={pos.y - lblH / 2}
              width={lblW}
              height={lblH}
            >
              <div className="flex items-center justify-center gap-1.5 h-full bg-white/95 border border-emerald-100 rounded-full shadow-sm px-2">
                <span className="text-[20px] sm:text-[16px] leading-none flex items-center pb-0.5">{nodes[i].icon}</span>
                <span className="text-[16px] sm:text-[13px] font-bold text-slate-700 leading-none">{nodes[i].label}</span>
              </div>
            </foreignObject>
          </m.g>
        ))}

        {/* ── Center engine via foreignObject ── */}
        <foreignObject x={cx - engS / 2} y={cy - engS / 2} width={engS} height={engS}>
          <EngineOrb size={engS} active />
        </foreignObject>

        {/* ── Center pulsing glow ── */}
        <circle cx={cx} cy={cy} r={engS * 0.6} fill={BRAND} opacity={0.06} />


      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ACT 3 — TRANSFORM (problem→solution morph + OKR tree)
   ═══════════════════════════════════════════════════════════════════════ */
function SceneTransform({ mob }: { mob: boolean }) {
  const [morphed, setMorphed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMorphed(true), 1400); return () => clearTimeout(t); }, []);

  return (
    <div className="relative px-5 sm:px-8 py-5 h-full flex flex-col">
      {/* Connected tree background */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.05]">
        <m.line x1="15%" y1="20%" x2="50%" y2="50%" stroke={BRAND} strokeWidth={2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
        <m.line x1="85%" y1="20%" x2="50%" y2="50%" stroke={BRAND} strokeWidth={2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.2 }} />
        <m.line x1="50%" y1="50%" x2="30%" y2="80%" stroke={BRAND} strokeWidth={1.5}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
        <m.line x1="50%" y1="50%" x2="70%" y2="80%" stroke={BRAND} strokeWidth={1.5}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.7 }} />
      </svg>

      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[18px] sm:text-[15px] font-bold text-slate-800">Mapa Estratégico</span>
        <m.span className="text-[15px] sm:text-[13px] text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: morphed ? 0 : 1 }}>
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Estruturado
        </m.span>
      </div>

      <AnimatePresence mode="wait">
        {!morphed ? (
          <m.div key="problems" className="relative z-10 flex flex-col gap-2.5 flex-1"
            exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.5 }}>
            {CHAOS_PAIRS.slice(0, 3).map((pair, i) => (
              <m.div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border"
                style={{ borderColor: `${ERROR}20` }}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease }}>
                <span className="text-[20px] sm:text-[16px]">{pair.pIcon}</span>
                <span className="text-[16px] sm:text-[14px] font-semibold text-slate-600 flex-1">{pair.problem}</span>
                <Sparkline color={ERROR} rising={false} delay={0} />
              </m.div>
            ))}
          </m.div>
        ) : (
          <m.div key="okr" className="relative z-10 flex flex-col gap-2.5 flex-1"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}>
            {OKR_TREE.map((item, i) => (
              <m.div key={i}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-slate-100"
                style={{ marginLeft: item.depth * (mob ? 16 : 28) }}
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}>
                {item.depth > 0 && <m.div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: BRAND }}
                  initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }} />}
                <span className="text-[14px] sm:text-[11px] font-black uppercase tracking-wider flex-shrink-0"
                  style={{ color: item.depth === 0 ? BRAND : "#94a3b8" }}>{item.type}</span>
                <span className="text-[18px] sm:text-[14px] font-semibold text-slate-700 flex-1 truncate">{item.label}</span>
                <CircleProgress pct={item.pct} color={BRAND} size={34} delay={0.3 + i * 0.12} />
                <m.span className="text-[16px] sm:text-[13px] font-bold text-emerald-600 flex-shrink-0 w-10 text-right"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.12 }}>
                  {item.pct}%
                </m.span>
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ACT 4 — DISTRIBUTE (team + goals with SVG animated arrows)
   ═══════════════════════════════════════════════════════════════════════ */
function SceneDistribute({ mob }: { mob: boolean }) {
  return (
    <div className="relative px-5 sm:px-8 py-5 h-full flex flex-col">
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[18px] sm:text-[15px] font-bold text-slate-800">Equipes & Metas Atribuídas</span>
        <span className="text-[15px] sm:text-[13px] text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> {TEAM.length} áreas conectadas
        </span>
      </div>

      <div className={`relative z-10 flex flex-1 ${mob ? 'flex-wrap gap-x-2 gap-y-4 content-start' : 'flex-col gap-3'}`}>
        {TEAM.map((person, i) => {
          if (mob) {
            // MOBILE: Compact card with vertical downward arrow logic
            return (
              <m.div key={i} className="flex flex-col items-center w-[calc(50%-4px)]"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease }}>
                
                {/* Person card */}
                <div className="flex items-center gap-2 bg-white rounded-xl px-2.5 py-2 border border-slate-100 w-full shadow-sm">
                  <img src={person.avatar} alt={person.name} className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-sm" draggable={false} loading="eager" fetchPriority="high" decoding="async" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-bold text-slate-800 block truncate leading-tight">{person.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate leading-tight">{person.dept}</span>
                  </div>
                </div>

                {/* Vertical Animated SVG arrow */}
                <m.svg width="20" height="24" viewBox="0 0 20 24" className="my-1"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}>
                  <defs>
                    <marker id={`av-${i}`} markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
                      <path d="M0 0 L6 3 L0 6" fill={BRAND} />
                    </marker>
                  </defs>
                  <m.line x1="10" y1="2" x2="10" y2="20" stroke={BRAND} strokeWidth="1.5" strokeDasharray="3 2"
                    markerEnd={`url(#av-${i})`}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.6, ease }} />
                  {/* Traveling dot */}
                  <m.circle fill={BRAND}
                    initial={{ cx: 10, cy: 2, r: 2.5, opacity: 0 }}
                    animate={{ cy: [2, 20], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.2, delay: 1 + i * 0.2, repeat: Infinity, repeatDelay: 2.5, times: [0, 0.1, 0.85, 1] }} />
                </m.svg>

                {/* Goal card */}
                <m.div className="flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-2 py-2 w-full"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 250, damping: 16 }}>
                  <span className="text-[13px]">🎯</span>
                  <span className="text-[12px] font-bold text-emerald-800 truncate">{person.goal}</span>
                </m.div>
              </m.div>
            );
          }

          // DESKTOP: Horizontal Layout
          return (
            <m.div key={i} className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease }}>

              {/* Person card */}
              <div className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-slate-100 flex-shrink-0" style={{ width: 180 }}>
                <img src={person.avatar} alt={person.name} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0" draggable={false} loading="eager" fetchPriority="high" decoding="async" />
                <div className="min-w-0">
                  <span className="text-[18px] sm:text-[14px] font-bold text-slate-800 block truncate">{person.name}</span>
                  <span className="text-[15px] sm:text-[12px] text-slate-400 font-medium">{person.dept}</span>
                </div>
              </div>

              {/* Horizontal Animated SVG arrow */}
              <m.svg width="60" height="20" viewBox="0 0 60 20" className="flex-shrink-0"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}>
                <defs>
                  <marker id={`ah-${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0 0 L6 3 L0 6" fill={BRAND} />
                  </marker>
                </defs>
                <m.line x1="2" y1="10" x2="48" y2="10" stroke={BRAND} strokeWidth="1.5"
                  markerEnd={`url(#ah-${i})`}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.6, ease }} />
                {/* Traveling dot */}
                <m.circle fill={BRAND}
                  initial={{ cx: 2, cy: 10, r: 2.5, opacity: 0 }}
                  animate={{ cx: [2, 48], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, delay: 1 + i * 0.2, repeat: Infinity, repeatDelay: 2.5, times: [0, 0.1, 0.85, 1] }} />
              </m.svg>

              {/* Goal card */}
              <m.div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 flex-1 min-w-0"
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 250, damping: 16 }}>
                <span className="text-[18px] sm:text-[14px]">🎯</span>
                <span className="text-[16px] sm:text-[13px] font-bold text-emerald-800 truncate">{person.goal}</span>
              </m.div>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ACT 5 — EVOLVE (performance live)
   ═══════════════════════════════════════════════════════════════════════ */
function SceneEvolve({ mob }: { mob: boolean }) {
  return (
    <div className="relative px-5 sm:px-8 py-5 h-full flex flex-col">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, ${BRAND} 0.6px, transparent 0.6px)`, backgroundSize: "18px 18px" }} />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="text-[18px] sm:text-[15px] font-bold text-slate-800">Performance ao Vivo</span>
        <m.span className="text-[15px] sm:text-[13px] text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full"
          animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Tempo real
        </m.span>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5 flex-1">
        {TEAM.map((person, i) => (
          <m.div key={i}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
            <div className="relative flex-shrink-0">
              <img src={person.avatar} alt={person.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm" draggable={false} loading="eager" fetchPriority="high" decoding="async" />
              <m.div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                style={{ background: person.pct > 80 ? BRAND : WARN }}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 400 }}>
                <span className="text-white text-[9px] font-bold">✓</span>
              </m.div>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[18px] sm:text-[14px] font-bold text-slate-800 block truncate">{person.name}</span>
              <span className="text-[15px] sm:text-[12px] text-slate-400 font-medium">{person.dept}</span>
            </div>
            <Sparkline color={BRAND} delay={0.3 + i * 0.12} rising={true} />
            <CircleProgress pct={person.pct} color={person.pct > 80 ? BRAND : WARN} size={36} delay={0.3 + i * 0.12} />
            <m.span className="text-[18px] sm:text-[14px] font-bold flex-shrink-0 w-12 text-right"
              style={{ color: person.pct > 80 ? BRAND : WARN }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.12 }}>
              {person.pct}%
            </m.span>
          </m.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ACT 6 — RANK + REWARD (podium + iFood logo)
   ═══════════════════════════════════════════════════════════════════════ */
function SceneRank({ mob }: { mob: boolean }) {
  const sorted = [...TEAM].sort((a, b) => b.pts - a.pts);
  const colors = [GOLD, SILVER, BRONZE];
  const barH = [mob ? 65 : 100, mob ? 45 : 70, mob ? 30 : 45];

  return (
    <div className="relative px-5 sm:px-8 py-5 h-full flex flex-col">
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-[18px] sm:text-[15px] font-bold text-slate-800">🏆 Ranking & Recompensas</span>
        <span className="text-[15px] sm:text-[13px] text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full">Ciclo Q1 2026</span>
      </div>

      {/* Podium */}
      <div className="relative z-10 flex items-end justify-center gap-4 sm:gap-6 mb-4 mt-2" style={{ height: mob ? 150 : 200 }}>
        {[1, 0, 2].map((rank) => {
          const person = sorted[rank];
          if (!person) return null;
          const isFirst = rank === 0;
          return (
            <m.div key={rank} className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + rank * 0.15, duration: 0.7, ease }}>
              <div className="relative mb-1.5">
                <img src={person.avatar} alt={person.name}
                  className="rounded-full object-cover shadow-md"
                  style={{
                    width: isFirst ? (mob ? 48 : 60) : (mob ? 38 : 48),
                    height: isFirst ? (mob ? 48 : 60) : (mob ? 38 : 48),
                    border: `3px solid ${colors[rank]}`,
                  }}
                  draggable={false} loading="eager" fetchPriority="high" decoding="async" />
                {isFirst && (
                  <m.span className="absolute -top-2 -right-2 text-[18px] sm:text-[22px]"
                    initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 300 }}>👑</m.span>
                )}
              </div>
              <span className="text-[16px] sm:text-[14px] font-bold text-slate-700 text-center whitespace-nowrap mb-1.5">{person.name}</span>
              <m.div className="rounded-t-lg flex items-end justify-center pb-1.5"
                style={{ width: mob ? 62 : 84, background: `linear-gradient(to top, ${colors[rank]}25, ${colors[rank]}08)`, borderTop: `2.5px solid ${colors[rank]}` }}
                initial={{ height: 0 }} animate={{ height: barH[rank] }}
                transition={{ delay: 0.4 + rank * 0.15, duration: 0.8, ease }}>
                <span className="text-[18px] sm:text-[15px] font-black" style={{ color: colors[rank] }}>
                  {person.pts.toLocaleString("pt-BR")}
                </span>
              </m.div>
            </m.div>
          );
        })}
      </div>

      {/* Reward card with official iFood logo */}
      <m.div className="relative z-10 flex items-center gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 rounded-xl px-4 py-3"
        initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease }}>
        {/* iFood logo — no background circle, clean */}
        <img src={IFOOD_LOGO} alt="iFood" className="h-6 sm:h-8 w-auto object-contain flex-shrink-0" draggable={false} loading="eager" fetchPriority="high" decoding="async" />
        <div className="flex-1 min-w-0">
          <span className="text-[16px] sm:text-[14px] font-bold text-slate-800 block">Recompensa liberada</span>
          <span className="text-[14px] sm:text-[12px] text-amber-600 font-semibold">Marina S. - Voucher iFood R$ 50 resgatado ✓</span>
        </div>
        <m.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 400 }}>
          <svg width="22" height="22" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill={BRAND} />
            <path d="M8 12l3 3 5-5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </m.div>
      </m.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN — app frame with act switching
   ═══════════════════════════════════════════════════════════════════════ */
export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(860);
  const [act, setAct] = useState<Act>(Act.CHAOS);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const logicalW = 600;
  const logicalH = 391;
  // Calculate scaling factor so the 600px desktop view perfectly fits whatever width we have (if width is smaller than 600px)
  const scale = w < logicalW ? w / logicalW : 1;
  const scaledH = logicalH * scale;

  useEffect(() => {
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      timer = setTimeout(() => {
        idx = (idx + 1) % 6;
        setAct(idx as Act);
        next();
      }, ACT_MS[idx]);
    };
    next();
    return () => clearTimeout(timer);
  }, []);

  const label = LABELS[act];

  return (
    <LazyMotion strict features={domAnimation}>
    <div ref={containerRef} className="relative w-full mx-auto" style={{ maxWidth: 720 }}>
      {/* Phase label */}
      <div className="flex justify-center mb-3 sm:mb-4">
        <AnimatePresence mode="wait">
          <m.div key={act}
            className="relative inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-[#013511]"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.5, ease }}>
            <span className="text-[12px] sm:text-[14px] font-medium text-slate-500">
              {label.pre}{" "}<span className="text-[#02CE37] font-bold">{label.em}</span>
            </span>
          </m.div>
        </AnimatePresence>
      </div>

      {/* App frame wrapper with Cinematic Aura */}
      <div className="relative mt-2 md:mt-4 w-full">
        {/* Breathing Premium Cinematic Aura (Soft Glow) - DESLIGADA NO MOBILE devido ao alto custo computacional do blur */}
        <m.div
          className="hidden md:block absolute -inset-1 sm:-inset-1.5 bg-gradient-to-tr from-[#02CE37]/20 via-[#02CE37]/40 to-emerald-400/20 rounded-[20px] sm:rounded-[24px] blur-[16px] sm:blur-[24px] z-0"
          animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.97, 1.01, 0.97] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Crisp Glassmorphism Border wrapping the App */}
        <div className="relative z-10 p-[1px] rounded-[18px] sm:rounded-[22px] bg-gradient-to-br from-slate-200 via-white to-slate-200 md:shadow-[0_12px_40px_rgba(2,206,55,0.08)] shadow-[0_4px_16px_rgba(2,206,55,0.05)]">
          {/* The actual App frame */}
          <div className="relative bg-[#f9fafb] rounded-[17px] sm:rounded-[21px] overflow-hidden w-full h-full flex flex-col">
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div className="w-[9px] h-[9px] rounded-full bg-red-400/60" />
              <div className="w-[9px] h-[9px] rounded-full bg-amber-400/60" />
              <div className="w-[9px] h-[9px] rounded-full bg-emerald-400/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-slate-50 border border-slate-200/60 rounded-lg px-3 py-1 flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                  <circle cx="7" cy="7" r="5" /><path d="M11 11l3 3" />
                </svg>
                <span className="text-[11px] sm:text-[13px] text-slate-400 font-medium">app.atingi.com.br</span>
              </div>
            </div>
            <EngineOrb size={20} active={act === Act.CENTRALIZE} />
          </div>

          {/* Scene content — FIXED 1:1 DESKTOP WITH CSS SCALE FOR MOBILE */}
          <div style={{ height: scaledH, overflow: "hidden", transition: "height 0.3s ease", display: "flex", justifyContent: "center" }}>
            <div style={{ width: logicalW, height: logicalH, transform: `scale(${scale})`, transformOrigin: "top center", flexShrink: 0 }}>
              <AnimatePresence mode="wait">
                <m.div key={act} className="w-full h-full"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6, ease }}>
                  {act === Act.CHAOS && <SceneChaos />}
                  {act === Act.CENTRALIZE && <SceneCentralize mob={false} />}
                  {act === Act.TRANSFORM && <SceneTransform mob={false} />}
                  {act === Act.DISTRIBUTE && <SceneDistribute mob={false} />}
                  {act === Act.EVOLVE && <SceneEvolve mob={false} />}
                  {act === Act.RANK && <SceneRank mob={false} />}
                </m.div>
              </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </LazyMotion>
  );
}
