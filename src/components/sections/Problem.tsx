"use client";
/**
 * Problem — framer-motion REMOVIDO.
 * Animações via CSS transitions + useScrollReveal.
 * SpringCounter substituído por counter nativo com IntersectionObserver.
 * ProgressRing animado via CSS strokeDashoffset transition onVisible.
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ═══ Animated SVG Icons (SVG nativo, sem framer-motion) ═══ */
function VisibilityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="#dc2626" strokeWidth="2.5" fill="none"
        className="stroke-anim" style={{ strokeDasharray: 69, strokeDashoffset: 69, transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }} />
      <path d="M7 14c0 0 3-5 7-5s7 5 7 5-3 5-7 5-7-5-7-5z"
        stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round"
        className="stroke-anim" style={{ strokeDasharray: 50, strokeDashoffset: 50, transition: "stroke-dashoffset 1s 0.3s cubic-bezier(0.22,1,0.36,1)" }} />
      <line x1="7" y1="21" x2="21" y2="7" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"
        className="stroke-anim" style={{ strokeDasharray: 20, strokeDashoffset: 20, transition: "stroke-dashoffset 0.6s 1s ease" }} />
    </svg>
  );
}

function ControlIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="6" width="22" height="16" rx="3" stroke="#d97706" strokeWidth="2.5" fill="none"
        className="stroke-anim" style={{ strokeDasharray: 78, strokeDashoffset: 78, transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }} />
      <rect x="6" y="10" width="10" height="2" rx="1" fill="#f59e0b" />
      <rect x="6" y="14" width="6" height="2" rx="1" fill="#f59e0b" style={{ opacity: 0.6 }} />
      <rect x="6" y="18" width="14" height="2" rx="1" fill="#f59e0b" />
    </svg>
  );
}

function PredictIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <polyline points="4,22 10,16 14,19 20,10 24,6"
        stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        className="stroke-anim" style={{ strokeDasharray: 40, strokeDashoffset: 40, transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }} />
      <line x1="4" y1="20" x2="24" y2="8" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

function AlignIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="3" stroke="#2563eb" strokeWidth="2.5" fill="none" />
      <circle cx="6" cy="20" r="3" stroke="#2563eb" strokeWidth="2.5" fill="none" />
      <circle cx="22" cy="20" r="3" stroke="#2563eb" strokeWidth="2.5" fill="none" />
      <line x1="12" y1="8" x2="8" y2="17" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="16" y1="8" x2="20" y2="17" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

/* ═══ Counter nativo — sem framer spring ═══ */
function NativeCounter({ target, suffix = "", color }: { target: number; suffix?: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-[36px] md:text-[46px] font-black leading-none tabular-nums tracking-tighter" style={{ color }}>
      {display}{suffix}
    </span>
  );
}

/* ═══ SVG Progress Ring — animado via CSS transition onVisible ═══ */
function ProgressRing({ percentage, color, size = 48 }: { percentage: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.strokeDashoffset = String(circ * (1 - percentage / 100));
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [circ, percentage]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={6} />
      <circle
        ref={ref}
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeLinecap="round" strokeDasharray={circ}
        strokeDashoffset={circ}
        style={{ transition: "stroke-dashoffset 1.5s 0.3s cubic-bezier(0.22,1,0.36,1)", transformOrigin: "center", transform: `rotate(-90deg)` }}
      />
      <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" className="text-[13px] font-black" fill={color}>{percentage}%</text>
    </svg>
  );
}

/* ═══ Pain data ═══ */
const PAIN_POINTS = [
  {
    Icon: VisibilityIcon,
    pillar: "Visibilidade",
    title: "Ninguém sabe o progresso real",
    description: "Cada departamento usa uma planilha diferente. O progresso das metas fica invisível até que seja tarde demais.",
    stat: 73,
    statSuffix: "%",
    statLabel: "dos gestores desconhecem o status real",
    ringPct: 27,
    color: "#ef4444",
  },
  {
    Icon: ControlIcon,
    pillar: "Controle",
    title: "Metas criadas e depois esquecidas",
    description: "Definidas no início do trimestre e abandonadas. Sem check-ins, sem atualizações, sem responsáveis.",
    stat: 68,
    statSuffix: "%",
    statLabel: "das metas são abandonadas no ciclo",
    ringPct: 32,
    color: "#f59e0b",
  },
  {
    Icon: PredictIcon,
    pillar: "Previsibilidade",
    title: "Surpresas negativas todo fechamento",
    description: "O resultado só é descoberto quando já passou. Sem indicadores antecipados, cada ciclo é um tiro no escuro.",
    stat: 4,
    statSuffix: "x",
    statLabel: "mais retrabalho sem dados em tempo real",
    ringPct: 25,
    color: "#8b5cf6",
  },
  {
    Icon: AlignIcon,
    pillar: "Alinhamento",
    title: "Equipes desconectadas da estratégia",
    description: "O time operacional não sabe como seu trabalho conecta com os objetivos da empresa.",
    stat: 85,
    statSuffix: "%",
    statLabel: "não conhecem as metas da empresa",
    ringPct: 15,
    color: "#3b82f6",
  },
];

/* ═══ Main Section ═══ */
export default function Problem() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.scrollWidth / PAIN_POINTS.length;
    setActiveCard(Math.round(scrollLeft / cardWidth));
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-24 bg-[#f2f2f5] overflow-hidden">
      {/* Gradient blobs — apenas desktop */}
      <div className="hidden md:block absolute top-[-5%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-500/[0.03] rounded-full blur-[80px] md:blur-[120px]" />
      <div className="hidden md:block absolute bottom-[10%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500/[0.03] rounded-full blur-[60px] md:blur-[100px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-14">
          <div>
            <div className="reveal inline-flex items-center gap-2 bg-red-50 border border-red-200/60 rounded-full px-4 py-1.5 mb-5 w-fit">
              <span className="text-[12px]">⚠️</span>
              <span className="text-[12px] font-bold text-red-500">O problema que custa caro</span>
            </div>

            <h2 className="reveal reveal-d1 text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight text-[#0c111d] leading-[1.15] mb-4">
              Por que as empresas <br className="hidden md:block" />
              <span className="text-red-500">não atingem</span> suas metas?
            </h2>
            <p className="reveal reveal-d2 text-[14px] sm:text-[18px] text-slate-500 leading-relaxed max-w-[520px]">
              O problema não é falta de ambição, é falta de sistema. <br className="hidden md:block" />
              Veja os 4 pilares que travam a execução.
            </p>
          </div>
        </div>

        {/* ── Cards Grid / Slider ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 gap-5 md:gap-6 mb-4 md:mb-16 overflow-x-auto md:overflow-visible pb-4 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {PAIN_POINTS.map((pain, i) => (
            <div
              key={i}
              className="reveal-scale group bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 w-[85vw] max-w-[340px] md:max-w-none md:w-auto shrink-0 snap-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="p-5 sm:p-7">
                {/* Top: Icon + Pillar badge + Ring */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${pain.color}10` }}
                    >
                      <pain.Icon />
                    </div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ color: pain.color, backgroundColor: `${pain.color}12` }}
                    >
                      {pain.pillar}
                    </span>
                  </div>
                  <ProgressRing percentage={pain.ringPct} color={pain.color} />
                </div>

                {/* Title + description */}
                <h3 className="text-[18px] font-bold text-[#0c111d] mb-2 tracking-tight leading-tight">
                  {pain.title}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed mb-5">
                  {pain.description}
                </p>

                {/* Stat */}
                <div className="flex items-end gap-2.5 pt-4 border-t border-slate-100">
                  <NativeCounter target={pain.stat} suffix={pain.statSuffix} color={pain.color} />
                  <span className="text-[11px] text-slate-400 leading-tight mb-1.5 max-w-[180px]">
                    {pain.statLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators - mobile only */}
        <div className="flex justify-center gap-2 mb-6 md:hidden">
          {PAIN_POINTS.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeCard ? 'bg-red-500 w-5' : 'bg-slate-300'}`} />
          ))}
        </div>

        {/* ── Transition CTA ── */}
        <div className="reveal text-center">
          <div
            className="hidden md:inline-flex items-center gap-2.5 bg-[#02CE37]/10 border border-[#02CE37]/20 rounded-full px-5 py-2"
            style={{ animation: "float-gentle 3s ease-in-out infinite" }}
          >
            <span className="text-[14px] sm:text-[16px] font-semibold text-[#02CE37]">
              Existe uma forma melhor →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
