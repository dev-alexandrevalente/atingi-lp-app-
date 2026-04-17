"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import GlobalCTA from "../ui/GlobalCTA";

/* ═══ All collaborators ═══ */
const ALL_PEOPLE = [
  { id: "marina", name: "Marina Silva", role: "Gerente", dept: "Comercial", basePts: 3875, metas: 23, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" },
  { id: "lucas", name: "Lucas Ferreira", role: "Coordenador", dept: "Marketing", basePts: 3700, metas: 14, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" },
  { id: "pedro", name: "Pedro Mendes", role: "Analista", dept: "Financeiro", basePts: 3500, metas: 11, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face" },
  { id: "camila", name: "Camila Santos", role: "Head", dept: "Produto", basePts: 3200, metas: 18, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { id: "rafael", name: "Rafael Oliveira", role: "Tech Lead", dept: "Engenharia", basePts: 2900, metas: 15, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
  { id: "juliana", name: "Juliana Costa", role: "Supervisora", dept: "Operações", basePts: 2700, metas: 12, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
  { id: "andre", name: "André Lima", role: "Coordenador", dept: "Suporte", basePts: 2400, metas: 10, avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face" },
];

const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];
const MEDAL_EMOJIS = ["🥇", "🥈", "🥉"];
const BAR_HEIGHTS = [160, 120, 90];

/* ═══ Sparkle particles ═══ */
function Sparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
          style={{ left: `${30 + Math.random() * 40}%`, top: `${10 + Math.random() * 30}%` }}
          animate={{ y: [0, -20, 0], opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

/* ═══ Animated number counter ═══ */
function AnimatedNumber({ value, className, style }: { value: number; className?: string; style?: React.CSSProperties }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = value;
    if (prev === value) return;

    const diff = value - prev;
    const steps = 20;
    const inc = diff / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.round(prev + inc * step));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return <span className={className} style={style}>{display.toLocaleString("pt-BR")}</span>;
}

/* ═══ Point change notification ═══ */
function PointBubble({ change, name }: { change: number; name: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-md border border-slate-100"
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-[10px] font-semibold text-slate-600">{name}</span>
      <motion.span
        className="text-[11px] font-black"
        style={{ color: change > 0 ? "#02CE37" : "#ef4444" }}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
      >
        {change > 0 ? "+" : ""}{change} pts
      </motion.span>
      <span className="text-[9px]">{change > 0 ? "🎯" : ""}</span>
    </motion.div>
  );
}

/* ═══ Main Section ═══ */
export default function Ranking({ onCTA }: { onCTA: (source: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });

  // Track live points for each person
  const [livePoints, setLivePoints] = useState<Record<string, number>>(() => {
    const pts: Record<string, number> = {};
    ALL_PEOPLE.forEach((p) => (pts[p.id] = p.basePts));
    return pts;
  });

  // Recent change notification
  const [recentChange, setRecentChange] = useState<{ id: string; change: number } | null>(null);

  // Sorted ranked list by points
  const ranked = useMemo(() => {
    return [...ALL_PEOPLE]
      .map((p) => ({ ...p, pts: livePoints[p.id] }))
      .sort((a, b) => b.pts - a.pts);
  }, [livePoints]);

  const top3 = ranked.slice(0, 3);
  // Reorder for podium display: [2nd, 1st, 3rd]
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
  const extra = ranked.slice(3);

  // Simulate live point changes
  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    const simulateChange = () => {
      if (cancelled) return;

      // Pick a random person
      const person = ALL_PEOPLE[Math.floor(Math.random() * ALL_PEOPLE.length)];
      // Generate a logical point change (completing a meta = 100pts, partial = 25-75pts)
      const possibleChanges = [25, 50, 75, 100, 100, 100, 150];
      const change = possibleChanges[Math.floor(Math.random() * possibleChanges.length)];

      setLivePoints((prev) => ({
        ...prev,
        [person.id]: prev[person.id] + change,
      }));

      setRecentChange({ id: person.id, change });

      // Clear notification after a bit
      setTimeout(() => {
        if (!cancelled) setRecentChange(null);
      }, 2200);
    };

    // First change after 2s
    const firstTimer = setTimeout(simulateChange, 2000);
    // Then every 3.5s
    const interval = setInterval(simulateChange, 3500);

    return () => {
      cancelled = true;
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [inView]);

  return (
    <section id="gamificacao" className="relative py-14 md:py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #e8faf0 0%, #f0fdf4 50%, #f2f2f5 100%)" }}>
      {/* Subtle decorative blobs - DESLIGADO NO MOBILE */}
      <div className="hidden md:block absolute top-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#02CE37]/[0.06] rounded-full blur-[80px] md:blur-[150px]" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#02CE37]/[0.04] rounded-full blur-[60px] md:blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* ═══ Left: Copy ═══ */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <motion.div
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6 w-fit"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-[12px]">🏆</span>
                <span className="text-[12px] font-bold text-amber-600">Gamificação</span>
              </motion.div>

              <motion.h2
                className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-[#0c111d] leading-[1.15] tracking-tight mb-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Transforme metas em <br className="hidden md:block" />
                <span className="text-[#02CE37]">competição saudável.</span>
              </motion.h2>

              <motion.p
                className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed mb-8 max-w-[440px]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Engaje sua equipe com rankings em tempo real, pontuação automática por meta concluída e um catálogo de recompensas, quem entrega mais, ganha mais.
              </motion.p>

              {/* Feature pills - marquee on mobile, wrap on desktop */}
              <div className="relative w-[calc(100%+2.5rem)] -mx-5 mb-8 overflow-hidden md:w-auto md:mx-0 md:mb-8 md:overflow-visible">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 md:hidden pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 md:hidden pointer-events-none" />

                <motion.div
                  className="flex items-center gap-2 w-max animate-marquee-pills-mobile px-5 md:px-0 md:w-auto md:flex-wrap"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {[
                    { text: "Ranking Mensal + Geral", icon: "📊", bg: "bg-indigo-50", border: "border-indigo-100", textCol: "text-indigo-700", isDup: false },
                    { text: "100pts por meta", icon: "✨", bg: "bg-yellow-50", border: "border-yellow-100", textCol: "text-yellow-700", isDup: false },
                    { text: "Catálogo de Prêmios", icon: "🎁", bg: "bg-rose-50", border: "border-rose-100", textCol: "text-rose-700", isDup: false },
                    { text: "Aprovação do Gestor", icon: "🤝", bg: "bg-cyan-50", border: "border-cyan-100", textCol: "text-cyan-700", isDup: false },
                    // Duplicate for continuous loop on mobile
                    { text: "Ranking Mensal + Geral", icon: "📊", bg: "bg-indigo-50", border: "border-indigo-100", textCol: "text-indigo-700", isDup: true },
                    { text: "100pts por meta", icon: "✨", bg: "bg-yellow-50", border: "border-yellow-100", textCol: "text-yellow-700", isDup: true },
                    { text: "Catálogo de Prêmios", icon: "🎁", bg: "bg-rose-50", border: "border-rose-100", textCol: "text-rose-700", isDup: true },
                    { text: "Aprovação do Gestor", icon: "🤝", bg: "bg-cyan-50", border: "border-cyan-100", textCol: "text-cyan-700", isDup: true }
                  ].map((pill, i) => (
                    <motion.span
                      key={`${pill.text}-${i}`}
                      className={`flex items-center gap-1.5 md:gap-2 ${pill.bg} border ${pill.border} shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-full px-3.5 py-1.5 md:px-4 md:py-2 text-[12px] md:text-[13px] font-semibold ${pill.textCol} shrink-0 ${pill.isDup ? 'md:hidden' : ''}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-[14px] md:text-[15px] leading-none">{pill.icon}</span>
                      {pill.text}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Stats row */}
              <motion.div
                className="flex items-center gap-6 mb-8"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div>
                  <span className="text-[24px] font-black text-[#02CE37] block leading-none">
                    {inView ? <CountUpText target={94} duration={1500} /> : 0}%
                  </span>
                  <span className="text-[11px] text-slate-500">engajamento</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <span className="text-[24px] font-black text-[#0c111d] block leading-none">
                    {inView ? <CountUpText target={3200} duration={1800} /> : 0}
                  </span>
                  <span className="text-[11px] text-slate-500">recompensas trocadas</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <span className="text-[24px] font-black text-amber-500 block leading-none">
                    +{inView ? <CountUpText target={47} duration={1200} /> : 0}%
                  </span>
                  <span className="text-[11px] text-slate-500">produtividade</span>
                </div>
              </motion.div>

              <div className="mt-8">
                <GlobalCTA text="Começar Teste Grátis" onClick={() => onCTA('gamification_cta')} />
              </div>
            </div>

            {/* ═══ Right: Live Ranking ═══ */}
            <div className="relative bg-white/60 backdrop-blur-sm border border-[#02CE37]/10 rounded-3xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10 order-1 lg:order-2 shadow-sm h-[600px] sm:h-[620px] lg:h-[640px] overflow-hidden">
              <div className="hidden md:block"><Sparkles /></div>

              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-2"
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[16px]">🏆</span>
                  <span className="text-[14px] font-bold text-slate-800">Ranking Geral</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1 border border-slate-200">
                    <span className="text-[10px] font-bold text-[#02CE37] bg-[#02CE37]/10 rounded-full px-2 py-0.5">Mês</span>
                    <span className="text-[10px] font-medium text-slate-400">Geral</span>
                  </div>
                  {/* Live indicator */}
                  <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-red-500"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-[8px] font-bold text-red-500 uppercase">Live</span>
                  </div>
                </div>
              </motion.div>

              {/* Point change notification */}
              <div className="h-[36px] flex items-center justify-center mb-2">
                <AnimatePresence mode="wait">
                  {recentChange && (
                    <PointBubble
                      key={recentChange.id + Date.now()}
                      change={recentChange.change}
                      name={ALL_PEOPLE.find((p) => p.id === recentChange.id)?.name.split(" ")[0] || ""}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Podium */}
              <div className="flex items-end justify-center gap-3 mb-6">
                <LayoutGroup>
                  {podiumOrder.map((person, idx) => {
                    const rankIndex = top3.findIndex((t) => t.id === person.id);
                    return (
                      <motion.div
                        key={person.id}
                        className="flex flex-col items-center"
                        layout
                        transition={{ layout: { duration: 0.6, type: "spring", stiffness: 200 } }}
                      >
                        {/* Avatar */}
                        <div className="relative mb-2">
                          <motion.div
                            className={`relative rounded-full overflow-hidden border-[3px] shadow-lg ${
                              rankIndex === 0 ? 'w-14 h-14 sm:w-[72px] sm:h-[72px]' : 'w-11 h-11 sm:w-[58px] sm:h-[58px]'
                            }`}
                            style={{
                              borderColor: MEDAL_COLORS[rankIndex],
                            }}
                            whileHover={{ scale: 1.1 }}
                            animate={rankIndex === 0 ? { boxShadow: ["0 0 0 0 rgba(251,191,36,0)", "0 0 20px 4px rgba(251,191,36,0.3)", "0 0 0 0 rgba(251,191,36,0)"] } : {}}
                            transition={rankIndex === 0 ? { boxShadow: { duration: 2.5, repeat: Infinity } } : {}}
                          >
                            <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" draggable={false} loading="lazy" decoding="async" />
                          </motion.div>
                          <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[12px] shadow-md"
                            style={{ backgroundColor: MEDAL_COLORS[rankIndex] }}
                            key={`medal-${person.id}-${rankIndex}`}
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {MEDAL_EMOJIS[rankIndex]}
                          </motion.div>
                        </div>

                        {/* Name */}
                        <span className="text-[11px] sm:text-[13px] font-bold text-slate-800 text-center leading-tight">{person.name}</span>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 mb-1">{person.role} · {person.dept}</span>

                        {/* Points - live updating */}
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-[9px]">✨</span>
                          <AnimatedNumber
                            value={person.pts}
                            className="text-[15px] font-black tabular-nums"
                            style={{ color: rankIndex === 0 ? "#02CE37" : "#0c111d" }}
                          />
                          <span className="text-[10px] font-bold text-slate-400">pts</span>
                        </div>

                        {/* Bar */}
                        <motion.div
                          className="rounded-t-xl w-[60px] sm:w-[80px] relative overflow-hidden"
                          style={{
                            background: rankIndex === 0
                              ? "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)"
                              : rankIndex === 1
                              ? "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)"
                              : "linear-gradient(180deg, #fbbf24 0%, #d97706 100%)",
                          }}
                          initial={{ height: 0 }}
                          whileInView={{ height: BAR_HEIGHTS[rankIndex] }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                        >
                          <motion.span
                            className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[28px] font-black text-white/40"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.2 + idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {rankIndex + 1}º
                          </motion.span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </LayoutGroup>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/60 my-4" />

              {/* Extra rankings - animate reordering */}
              <div className="flex justify-start md:block overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <LayoutGroup id="extra-ranks">
                  {extra.map((person, i) => (
                    <motion.div
                      key={person.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl mb-0 md:mb-1 cursor-pointer transition-colors hover:bg-[#02CE37]/5 min-w-[240px] md:min-w-0 shrink-0 snap-center border border-slate-100 md:border-transparent md:border-0 mr-3 md:mr-0"
                      layout
                      transition={{ layout: { duration: 0.5, type: "spring", stiffness: 250 } }}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                      viewport={{ once: true }}
                    >
                      <motion.span
                        className="text-[12px] font-black text-slate-400 w-[20px] text-center tabular-nums"
                        layout
                      >
                        {i + 4}º
                      </motion.span>
                      <div className="w-[28px] h-[28px] rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
                        <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" draggable={false} loading="lazy" decoding="async" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] font-semibold text-slate-800 block truncate leading-tight">{person.name}</span>
                        <span className="text-[9px] text-slate-500">{person.dept}</span>
                      </div>
                      <AnimatedNumber
                        value={person.pts}
                        className="text-[12px] font-bold text-slate-600 tabular-nums"
                      />
                      <span className="text-[10px] text-slate-400">pts</span>
                    </motion.div>
                  ))}
                </LayoutGroup>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-pills {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 767px) {
          .animate-marquee-pills-mobile {
            animation: marquee-pills 20s linear infinite;
          }
          .animate-marquee-pills-mobile:hover {
            animation-play-state: paused;
          }
        }
      `}} />
    </section>
  );
}

/* ═══ Helper: inline count-up ═══ */
function CountUpText({ target, duration }: { target: number; duration: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count.toLocaleString("pt-BR")}</>;
}
