"use client";

import React from "react";
import { motion } from "framer-motion";

/* ═══ Card data ═══ */
const CARDS = [
  {
    badge: "OKR",
    badgeColor: "#02CE37",
    title: "Mapa Estratégico Interativo",
    description:
      "Visualize a hierarquia completa dos seus objetivos: do planejamento estratégico até cada meta individual, com progresso em tempo real e conexões visuais entre OKRs e resultados-chave.",
    visual: "goals",
  },
  {
    badge: "⚡",
    badgeColor: "#02CE37",
    title: "Gestão de Objetivos e Metas",
    description:
      "Acompanhe todos os objetivos da empresa em um painel centralizado. Crie metas com IA ou manualmente, registre check-ins e veja o progresso individual de cada responsável.",
    visual: "dashboard",
  },
  {
    badge: "85%",
    badgeColor: "#02CE37",
    title: "Análise de Alinhamento",
    description:
      "Identifique gaps de cobertura e analise o alinhamento entre metas e objetivos estratégicos. Descubra metas órfãs e garanta que toda a operação esteja conectada à estratégia.",
    visual: "integrations",
  },
  {
    badge: "🏆",
    badgeColor: "#02CE37",
    title: "Ranking de Performance",
    description:
      "Descubra quem são os top performers da empresa. Acompanhe a evolução individual de cada colaborador, compare resultados entre equipes e reconheça quem está entregando acima da média.",
    visual: "performance",
  },
];

/* ═══ Visual illustrations for each card ═══ */
function GoalsVisual() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [drag, setDrag] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const dragStart = React.useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const [hovered, setHovered] = React.useState<string | null>(null);

  // Drag handlers (desktop only)
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: drag.x, oy: drag.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDrag({
      x: Math.max(-200, Math.min(200, dragStart.current.ox + (e.clientX - dragStart.current.x))),
      y: Math.max(-100, Math.min(100, dragStart.current.oy + (e.clientY - dragStart.current.y))),
    });
  };
  const onPointerUp = () => setDragging(false);

  // Desktop node data
  const rootNode = { id: "root", label: "Empresa", sub: "3 objetivos · 52%", x: 310, y: 6 };
  const taticos = [
    { id: "t1", label: "Aumentar Vendas", pct: 72, metas: 2, x: 20, y: 130, color: "#02CE37" },
    { id: "t2", label: "Crescimento de Mercado", pct: 35, metas: 1, x: 270, y: 130, color: "#f59e0b" },
    { id: "t3", label: "Eficiência Operacional", pct: 48, metas: 2, x: 530, y: 130, color: "#f59e0b" },
  ];
  const metas = [
    { id: "m1", parent: "t1", label: "Faturamento R$ 1M", pct: 78, kpi: "RECEITA BRUTA", x: 0, y: 280 },
    { id: "m2", parent: "t1", label: "Fechar 200 contratos", pct: 65, kpi: "CONTRATOS", x: 170, y: 280 },
    { id: "m3", parent: "t2", label: "Conquistar 500 clientes", pct: 35, kpi: "NOVOS CLIENTES", x: 350, y: 280 },
    { id: "m4", parent: "t3", label: "Reduzir custos em 15%", pct: 48, kpi: "CUSTO OPERACIONAL", x: 540, y: 280 },
  ];
  const connections = [
    ...taticos.map(t => ({ from: { x: rootNode.x + 50, y: rootNode.y + 40 }, to: { x: t.x + 70, y: t.y } })),
    ...metas.map(m => {
      const parent = taticos.find(t => t.id === m.parent)!;
      return { from: { x: parent.x + 70, y: parent.y + 80 }, to: { x: m.x + 65, y: m.y } };
    }),
  ];

  // Mobile node data — compact 270×248 canvas, 3 levels, no drag
  const mTactics = [
    { id: "mt1", label: "Aumentar Vendas", pct: 72, color: "#02CE37", x: 0,   y: 84, w: 82 },
    { id: "mt2", label: "Cresc. Mercado",  pct: 35, color: "#f59e0b", x: 94,  y: 84, w: 82 },
    { id: "mt3", label: "Ef. Operacional", pct: 48, color: "#f59e0b", x: 188, y: 84, w: 82 },
  ];
  const mMetas = [
    { id: "mm1", label: "Faturamento R$ 1M",  pct: 78, x: 0,   y: 200, w: 82 },
    { id: "mm2", label: "500 clientes",        pct: 35, x: 94,  y: 200, w: 82 },
    { id: "mm3", label: "Reduzir custos 15%",  pct: 48, x: 188, y: 200, w: 82 },
  ];
  const mRootCx = 135, mRootBottom = 42;
  const mTacticsCx = mTactics.map(t => t.x + t.w / 2);
  const mTacticsBottom = mTactics.map(t => t.y + 72);
  const mMetasCx = mMetas.map(m => m.x + m.w / 2);
  const mobileConns = [
    ...mTactics.map((_, i) => ({ fx: mRootCx, fy: mRootBottom, tx: mTacticsCx[i], ty: mTactics[i].y })),
    ...mMetas.map((_, i) => ({ fx: mTacticsCx[i], fy: mTacticsBottom[i], tx: mMetasCx[i], ty: mMetas[i].y })),
  ];

  return (
    <>
      {/* ── MOBILE version (< md) ── */}
      <div className="md:hidden relative w-full h-full overflow-hidden select-none">
        <div className="absolute" style={{ width: 270, top: 8, left: "50%", transform: "translateX(-50%)" }}>
          <svg className="absolute inset-0" width="270" height="268" style={{ pointerEvents: "none" }}>
            {mobileConns.map((c, i) => (
              <g key={`mc-${i}`}>
                <line x1={c.fx} y1={c.fy} x2={c.tx} y2={c.ty} stroke="#d1d5db" strokeWidth={1.5} strokeDasharray="3 3" />
                <circle r="2.5" fill="#02CE37">
                  <animateMotion dur={`${2 + i * 0.25}s`} repeatCount="indefinite" path={`M${c.fx},${c.fy} L${c.tx},${c.ty}`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>

          {/* Root */}
          <motion.div className="absolute flex items-center justify-center" style={{ left: 55, top: 0, width: 160 }} initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className="bg-white border-2 border-dashed border-[#02CE37] rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
              <span className="w-4 h-4 rounded-md bg-[#02CE37] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">🏠</span>
              <div>
                <span className="text-[11px] font-bold text-slate-800 block leading-tight">Empresa</span>
                <span className="text-[9px] text-slate-500">3 obj · 52%</span>
              </div>
            </div>
          </motion.div>

          {/* Táticos */}
          {mTactics.map((t, i) => (
            <motion.div key={t.id} className="absolute" style={{ left: t.x, top: t.y, width: t.w }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }} viewport={{ once: true }}>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-2 py-2">
                <span className="inline-block text-[7px] font-bold text-white bg-blue-500 rounded px-1 py-0.5 mb-1">Tático</span>
                <p className="text-[10px] font-semibold text-slate-800 leading-tight mb-1.5">{t.label}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 h-[3px] bg-slate-100 rounded-full overflow-hidden mr-1">
                    <div className="h-full rounded-full" style={{ width: `${t.pct}%`, backgroundColor: t.color }} />
                  </div>
                  <span className="text-[9px] font-bold" style={{ color: t.color }}>{t.pct}%</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Metas */}
          {mMetas.map((m, i) => (
            <motion.div key={m.id} className="absolute" style={{ left: m.x, top: m.y, width: m.w }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }} viewport={{ once: true }}>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-2 py-1.5">
                <span className="inline-block text-[7px] font-bold text-white bg-red-400 rounded px-1 py-0.5 mb-1">Meta</span>
                <p className="text-[9px] font-semibold text-slate-800 leading-tight mb-1">{m.label}</p>
                <span className="text-[14px] font-black block leading-none" style={{ color: m.pct >= 50 ? "#02CE37" : m.pct > 0 ? "#f59e0b" : "#ef4444" }}>{m.pct}%</span>
                <div className="h-[3px] bg-slate-100 rounded-full overflow-hidden mt-1">
                  <div className="h-full rounded-full bg-[#02CE37]" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP version (md+) ── */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full h-full overflow-hidden select-none"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="absolute"
          style={{
            transform: `translate(${drag.x - 50}px, ${drag.y}px) scale(0.72)`,
            transformOrigin: "top left",
            transition: dragging ? "none" : "transform 0.3s ease",
            width: 750,
            height: 400
          }}
        >
          <svg className="absolute inset-0" width="750" height="400" style={{ pointerEvents: "none" }}>
            {connections.map((c, i) => (
              <g key={`conn-${i}`}>
                <line x1={c.from.x} y1={c.from.y} x2={c.to.x} y2={c.to.y} stroke="#d1d5db" strokeWidth={1.5} strokeDasharray="4 4" />
                <circle r="3" fill="#02CE37">
                  <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" path={`M${c.from.x},${c.from.y} L${c.to.x},${c.to.y}`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>

          <motion.div className="absolute z-10 flex flex-col items-center" style={{ left: rootNode.x, top: rootNode.y }} onMouseEnter={() => setHovered("root")} onMouseLeave={() => setHovered(null)} initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className={`bg-white border-2 border-dashed rounded-full px-5 py-2 flex items-center gap-2 transition-all duration-200 ${hovered === "root" ? "border-[#02CE37] shadow-lg scale-105" : "border-slate-300"}`}>
              <span className="w-5 h-5 rounded-md bg-[#02CE37] flex items-center justify-center"><span className="text-white text-[10px] font-bold">🏠</span></span>
              <div>
                <span className="text-[14px] font-bold text-slate-800 block leading-tight">{rootNode.label}</span>
                <span className="text-[11px] text-slate-600">{rootNode.sub}</span>
              </div>
            </div>
          </motion.div>

          {taticos.map((t, i) => (
            <motion.div key={t.id} className="absolute z-10" style={{ left: t.x, top: t.y, width: 160 }} onMouseEnter={() => setHovered(t.id)} onMouseLeave={() => setHovered(null)} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} viewport={{ once: true }}>
              <div className={`bg-white rounded-xl border px-3 py-2.5 transition-all duration-200 ${hovered === t.id ? "border-[#02CE37] shadow-lg scale-[1.03]" : "border-slate-200 shadow-sm"}`}>
                <span className="inline-block text-[10px] font-bold text-white bg-blue-500 rounded px-1.5 py-0.5 mb-1.5">Tático</span>
                <p className="text-[13px] font-semibold text-slate-800 leading-tight mb-2">{t.label}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 h-[3px] bg-slate-100 rounded-full overflow-hidden mr-2">
                    <div className="h-full rounded-full" style={{ width: `${t.pct}%`, backgroundColor: t.color }} />
                  </div>
                  <span className="text-[12px] font-bold" style={{ color: t.pct > 0 ? "#02CE37" : "#ef4444" }}>{t.pct}%</span>
                </div>
                <div className="mt-1.5">
                  <span className="text-[11px] font-semibold text-[#02CE37] bg-[#02CE37]/10 rounded-full px-2 py-0.5">{t.metas} Meta{t.metas > 1 ? "s" : ""} ↓</span>
                </div>
              </div>
            </motion.div>
          ))}

          {metas.map((m, i) => (
            <motion.div key={m.id} className="absolute z-10" style={{ left: m.x, top: m.y, width: 145 }} onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} viewport={{ once: true }}>
              <div className={`bg-white rounded-xl border px-3 py-2.5 transition-all duration-200 ${hovered === m.id ? "border-[#02CE37] shadow-lg scale-[1.03]" : "border-slate-200 shadow-sm"}`}>
                <span className="inline-block text-[10px] font-bold text-white bg-red-400 rounded px-1.5 py-0.5 mb-1">+ Meta</span>
                <p className="text-[12px] font-semibold text-slate-800 leading-tight mb-1.5">{m.label}</p>
                <span className="text-[18px] font-black block leading-none" style={{ color: m.pct >= 50 ? "#02CE37" : m.pct > 0 ? "#f59e0b" : "#ef4444" }}>{m.pct}%</span>
                <span className="text-[10px] font-bold text-slate-600 tracking-wide mt-0.5 block">{m.kpi}</span>
                <div className="h-[3px] bg-slate-100 rounded-full overflow-hidden mt-1.5">
                  <div className="h-full rounded-full bg-[#02CE37]" style={{ width: `${m.pct}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1 text-[9px] text-slate-600">
                  <span>Inicial</span><span>Atual</span><span>Meta</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-2 right-3 text-[11px] text-slate-600 flex items-center gap-1 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2v12M2 8h12M5 5L8 2l3 3M5 11l3 3 3-3M2 5l3 3-3 3M11 5l3 3-3 3" />
          </svg>
          Arraste para explorar
        </div>
      </div>
    </>
  );
}

function DashboardVisual() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [activeRow, setActiveRow] = React.useState(0);

  // Cycle through rows to simulate live updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow(prev => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const avatars = [
    "https://framerusercontent.com/images/r3db9Fvw0izSpE5Mvg1s4n3yw.png",
    "https://framerusercontent.com/images/UaCrJmEIuheeobCl9Q4FRgIXmk.png",
    "https://framerusercontent.com/images/a2Z3ZvmZfdFDbQtSD3NwCBZTA4.png",
    "https://framerusercontent.com/images/ZI5BuIsbw50xj9j15FIyBzAtj84.png",
    "https://framerusercontent.com/images/diwW1emLUnGNlb0jlCsaYxh6dU.png",
  ];

  const objectives = [
    { icon: "💰", name: "Aumentar a Receita", pct: 12, ciclo: "2026", resp: 0, metas: 4, color: "#ef4444" },
    { icon: "📈", name: "Crescer Clientes", pct: 56, ciclo: "1ºTri", resp: 1, metas: 3, color: "#02CE37" },
    { icon: "⚡", name: "Eficiência Operacional", pct: 26, ciclo: "2026", resp: 2, metas: 2, color: "#f59e0b" },
    { icon: "🎯", name: "Engajamento da Equipe", pct: 49, ciclo: "2026", resp: 3, metas: 2, color: "#02CE37" },
    { icon: "🏆", name: "Lucratividade", pct: 100, ciclo: "2026", resp: 4, metas: 2, color: "#02CE37" },
  ];

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Toolbar */}
      <motion.div
        className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#02CE37] border-b-2 border-[#02CE37] pb-0.5">≡ Lista</span>
          <span className="text-[11px] font-medium text-slate-400">⊞ Cards</span>
          <span className="text-[11px] font-medium text-slate-400">⟠ Cascata</span>
        </div>
        <motion.span
          className="text-[11px] font-bold text-white bg-[#02CE37] rounded-full px-2.5 py-1 cursor-pointer shadow-sm"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ["0 0 0 0 rgba(2,206,55,0)", "0 0 0 6px rgba(2,206,55,0.15)", "0 0 0 0 rgba(2,206,55,0)"] }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          + Objetivo
        </motion.span>
      </motion.div>

      {/* Rows */}
      {objectives.map((obj, i) => {
        const isActive = activeRow === i;
        const isHover = hovered === i;
        return (
          <motion.div
            key={i}
            className="flex items-center gap-2 px-2 py-[7px] rounded-lg mb-1 cursor-pointer transition-colors duration-300"
            style={{
              backgroundColor: isActive ? "rgba(2,206,55,0.06)" : isHover ? "rgba(0,0,0,0.02)" : "transparent",
              borderLeft: isActive ? "2px solid #02CE37" : "2px solid transparent",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.35, delay: 0.08 + i * 0.07 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <span className="text-[14px] flex-shrink-0">{obj.icon}</span>

            {/* Name + Ciclo */}
            <div className="flex-1 min-w-0">
              <span className="text-[12px] sm:text-[13px] font-semibold text-slate-800 block leading-tight">{obj.name}</span>
              <span className="text-[10px] text-slate-600">{obj.ciclo} · {obj.metas} metas</span>
            </div>

            {/* Progress bar */}
            <div className="w-[48px] sm:w-[60px] flex-shrink-0">
              <div className="h-[5px] bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: obj.color }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${obj.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            {/* Percentage */}
            <motion.span
              className="text-[13px] font-black w-[30px] text-right flex-shrink-0"
              style={{ color: obj.pct >= 50 ? "#02CE37" : obj.pct > 0 ? "#f59e0b" : "#ef4444" }}
              animate={isActive ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.6 }}
            >
              {obj.pct}%
            </motion.span>

            {/* Avatar */}
            <motion.div
              className="w-[22px] h-[22px] rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0"
              animate={isActive ? { borderColor: "#02CE37" } : { borderColor: "#fff" }}
              transition={{ duration: 0.3 }}
            >
              <img src={avatars[obj.resp]} alt="" className="w-full h-full object-cover" draggable={false} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Summary footer */}
      <motion.div
        className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3">
          <div className="text-center">
            <span className="text-[14px] font-black text-[#02CE37] block leading-none">9</span>
            <span className="text-[9px] text-slate-600">OBJETIVOS</span>
          </div>
          <div className="text-center">
            <span className="text-[14px] font-black text-slate-700 block leading-none">52%</span>
            <span className="text-[9px] text-slate-600">PROGRESSO</span>
          </div>
          <div className="text-center">
            <span className="text-[14px] font-black text-amber-500 block leading-none">3</span>
            <span className="text-[9px] text-slate-600">EM RISCO</span>
          </div>
        </div>
        <div className="flex -space-x-1.5">
          {avatars.slice(0, 4).map((src, i) => (
            <motion.div
              key={i}
              className="w-[18px] h-[18px] rounded-full overflow-hidden border border-white shadow-sm"
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
            </motion.div>
          ))}
          <div className="w-[18px] h-[18px] rounded-full bg-slate-200 border border-white flex items-center justify-center">
            <span className="text-[9px] font-bold text-slate-600">+5</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IntegrationsVisual() {
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);
  const [activeRow, setActiveRow] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => setActiveRow(prev => (prev + 1) % 4), 2200);
    return () => clearInterval(interval);
  }, []);

  const orphans = [
    { name: "Clientes multi-produtos +20%", kpi: "Taxa Multi-Produtos" },
    { name: "Expandir base de clientes 25%", kpi: "Clientes" },
    { name: "Pesquisa de reconhecimento 40%", kpi: "Reconhecimento" },
    { name: "Aumentar Receita Bruta", kpi: "Receita" },
  ];
  const gR = 18, gS = 5, circ = 2 * Math.PI * gR;

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <motion.div className="bg-white rounded-xl border border-slate-100 shadow-sm px-1.5 sm:px-3 py-2 sm:py-3 flex flex-col sm:flex-row items-center gap-1 sm:gap-2" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.03, boxShadow: "0 4px 16px rgba(2,206,55,0.12)" }} transition={{ duration: 0.4, delay: 0.1 }} viewport={{ once: true }}>
          <svg width="36" height="36" viewBox="0 0 44 44" className="flex-shrink-0 w-7 h-7 sm:w-11 sm:h-11">
            <circle cx="22" cy="22" r={gR} fill="none" stroke="#e5e7eb" strokeWidth={gS} />
            <motion.circle cx="22" cy="22" r={gR} fill="none" stroke="#02CE37" strokeWidth={gS} strokeLinecap="round" strokeDasharray={circ} initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ * 0.15 }} transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} viewport={{ once: true }} transform="rotate(-90 22 22)" />
            <text x="22" y="25" textAnchor="middle" fontSize="10" fontWeight="900" fill="#02CE37">85%</text>
          </svg>
          <div className="text-center sm:text-left">
            <span className="text-[9px] sm:text-[10px] text-slate-600 block leading-tight">Alinhamento</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 block">Geral</span>
            <div className="hidden sm:block h-[3px] bg-slate-100 rounded-full overflow-hidden mt-1 w-[50px]">
              <motion.div className="h-full rounded-full bg-[#02CE37]" initial={{ width: "0%" }} whileInView={{ width: "85%" }} transition={{ duration: 1.2, delay: 0.8 }} viewport={{ once: true }} />
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl border border-slate-100 shadow-sm px-1 sm:px-3 py-2 sm:py-3 text-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.03 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}>
          <span className="text-[10px]">🔗</span>
          <motion.span className="text-[16px] sm:text-[20px] font-black text-slate-800 block leading-none" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} viewport={{ once: true }}>22</motion.span>
          <span className="text-[8px] sm:text-[9px] text-slate-600 block">de 26 metas</span>
          <span className="text-[8px] sm:text-[9px] font-bold text-[#02CE37]">alinhadas</span>
        </motion.div>

        <motion.div className="bg-white rounded-xl border border-amber-200 shadow-sm px-1 sm:px-3 py-2 sm:py-3 text-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.03, borderColor: "#f59e0b" }} transition={{ duration: 0.4, delay: 0.3 }} viewport={{ once: true }}>
          <motion.span className="text-[10px] inline-block" animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}>⚠️</motion.span>
          <span className="text-[16px] sm:text-[20px] font-black text-amber-500 block leading-none">4</span>
          <span className="text-[8px] sm:text-[9px] text-slate-600 block">precisam de</span>
          <span className="text-[8px] sm:text-[9px] font-bold text-amber-500">OKRs</span>
        </motion.div>
      </div>

      <motion.div className="flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 mb-1.5 sm:mb-3" style={{ background: "linear-gradient(135deg, rgba(2,206,55,0.08), rgba(2,206,55,0.03))" }} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} viewport={{ once: true }}>
        <motion.div className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full bg-[#02CE37] flex items-center justify-center flex-shrink-0" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="text-[8px] sm:text-[10px] text-white font-bold">✓</span>
        </motion.div>
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#02CE37] block leading-tight">Excelente alinhamento!</span>
          <span className="text-[9px] sm:text-[10px] text-slate-700 block truncate">A maioria das metas está conectada a objetivos estratégicos.</span>
        </div>
      </motion.div>

      <div className="flex items-center justify-between px-1 mb-1">
        <div className="flex items-center gap-1">
          <span className="text-[10px]">⚠️</span>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-600">Metas Órfãs</span>
          <span className="text-[10px] text-slate-600">(4)</span>
        </div>
        <span className="text-[10px] text-[#02CE37] font-semibold cursor-pointer">Vincular →</span>
      </div>

      {orphans.map((o, i) => {
        const isActive = activeRow === i;
        const isHover = hoveredRow === i;
        return (
          <motion.div key={i} className="flex items-center justify-between px-2 sm:px-2.5 py-[5px] sm:py-[7px] rounded-lg mb-0.5 cursor-pointer transition-all duration-300" style={{ backgroundColor: isActive ? "rgba(245,158,11,0.06)" : isHover ? "rgba(0,0,0,0.02)" : "transparent", borderLeft: isActive ? "3px solid #f59e0b" : "3px solid transparent" }} onMouseEnter={() => !isMobile && setHoveredRow(i)} onMouseLeave={() => !isMobile && setHoveredRow(null)} initial={{ opacity: 0, x: isMobile ? -8 : -12 }} whileInView={{ opacity: 1, x: 0 }} whileHover={isMobile ? {} : { x: 4 }} transition={{ duration: 0.35, delay: 0.7 + i * 0.08 }} viewport={{ once: true }}>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-800 block truncate leading-tight">{o.name}</span>
              <span className="text-[9px] text-slate-600">Indicador: {o.kpi}</span>
            </div>
            <motion.span className="text-[9px] sm:text-[10px] font-bold text-amber-500 bg-amber-50 rounded-full px-1.5 sm:px-2 py-0.5 flex-shrink-0 ml-1.5 sm:ml-2" animate={isActive ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.5 }}>Órfã</motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}

function PerformanceVisual() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [activeRow, setActiveRow] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => setActiveRow(prev => (prev + 1) % 5), 2000);
    return () => clearInterval(interval);
  }, []);

  const performers = [
    { rank: 1, name: "Marina Silva", dept: "Comercial", metas: 12, pct: 94, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", medal: "🥇" },
    { rank: 2, name: "Rafael Oliveira", dept: "Marketing", metas: 8, pct: 87, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", medal: "🥈" },
    { rank: 3, name: "Camila Santos", dept: "Produto", metas: 15, pct: 82, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", medal: "🥉" },
    { rank: 4, name: "Pedro Mendes", dept: "Financeiro", metas: 6, pct: 76, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", medal: "" },
    { rank: 5, name: "Juliana Costa", dept: "Operações", metas: 10, pct: 71, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face", medal: "" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-2 sm:mb-3 pb-2 border-b border-slate-100"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[13px]">🏆</span>
          <span className="text-[12px] font-bold text-slate-800">Top Performers</span>
        </div>
        <span className="text-[10px] text-[#02CE37] font-semibold cursor-pointer">Ver pessoas →</span>
      </motion.div>

      {/* Performers list */}
      {performers.map((p, i) => {
        const isActive = activeRow === i;
        const isHover = hovered === i;
        const barColor = i === 0 ? "#02CE37" : i === 1 ? "#02CE37" : i === 2 ? "#02CE37" : "#f59e0b";
        return (
          <motion.div
            key={i}
            className="flex items-center gap-2 px-2 py-[5px] rounded-lg mb-0.5 cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: isActive ? "rgba(2,206,55,0.06)" : isHover ? "rgba(0,0,0,0.02)" : "transparent",
              borderLeft: isActive ? "3px solid #02CE37" : "3px solid transparent",
            }}
            onMouseEnter={() => !isMobile && setHovered(i)}
            onMouseLeave={() => !isMobile && setHovered(null)}
            initial={{ opacity: 0, x: isMobile ? -8 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={isMobile ? {} : { x: 4 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            viewport={{ once: true }}
          >
            {/* Rank */}
            <motion.div
              className="w-[20px] h-[20px] rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black"
              style={{
                backgroundColor: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#d97706" : "#f1f5f9",
                color: i < 3 ? "white" : "#64748b",
              }}
              animate={isActive ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              {p.medal || p.rank}
            </motion.div>

            {/* Avatar */}
            <motion.div
              className="w-[26px] h-[26px] rounded-full overflow-hidden border-2 shadow-sm flex-shrink-0"
              style={{ borderColor: isActive ? "#02CE37" : "#e2e8f0" }}
              animate={isActive ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" draggable={false} />
            </motion.div>

            {/* Name + dept */}
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-slate-800 block truncate leading-tight">{p.name}</span>
              <span className="text-[9px] text-slate-600">{p.dept} · {p.metas} metas</span>
            </div>

            {/* Progress bar */}
            <div className="w-[40px] sm:w-[45px] flex-shrink-0">
              <div className="h-[5px] bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: barColor }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${p.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            {/* Percentage */}
            <motion.span
              className="text-[12px] font-black w-[34px] text-right flex-shrink-0"
              style={{ color: p.pct >= 80 ? "#02CE37" : p.pct >= 70 ? "#f59e0b" : "#ef4444" }}
              animate={isActive ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {p.pct}%
            </motion.span>
          </motion.div>
        );
      })}

      {/* Summary footer */}
      <motion.div
        className="flex items-center justify-between mt-1 pt-1.5 border-t border-slate-100 px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-center">
            <span className="text-[13px] sm:text-[14px] font-black text-[#02CE37] block leading-none">82%</span>
            <span className="text-[9px] text-slate-600">MÉDIA</span>
          </div>
          <div className="text-center">
            <span className="text-[13px] sm:text-[14px] font-black text-slate-800 block leading-none">51</span>
            <span className="text-[9px] text-slate-600">METAS</span>
          </div>
          <div className="text-center">
            <span className="text-[13px] sm:text-[14px] font-black text-amber-500 block leading-none">2</span>
            <span className="text-[9px] text-slate-600">ABAIXO</span>
          </div>
        </div>
        <motion.span
          className="text-[10px] sm:text-[11px] font-bold text-white bg-[#02CE37] rounded-full px-2.5 sm:px-3 py-1 cursor-pointer"
          whileHover={isMobile ? {} : { scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver todos →
        </motion.span>
      </motion.div>
    </div>
  );
}

const VISUALS: Record<string, React.FC> = {
  goals: GoalsVisual,
  dashboard: DashboardVisual,
  integrations: IntegrationsVisual,
  performance: PerformanceVisual,
};

/* ═══ Main Section ═══ */
export default function Features({ onCTA }: { onCTA: (source: string) => void }) {
  return (
    <section id="funcionalidades" className="relative py-14 md:py-24 bg-[#f2f2f5]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-14">
          <div>
            <h2 className="reveal text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight text-[#0c111d] leading-[1.15] mb-4">
              Feito para empresas que <br className="hidden md:block" />
              querem <span className="text-[#02CE37]">crescer de verdade</span>
            </h2>
            <p className="reveal reveal-d1 text-[14px] sm:text-[18px] text-slate-500 leading-relaxed max-w-[520px]">
              A Atingi entrega o que planilhas e reuniões não conseguem: <br className="hidden md:block" />
              clareza, controle e velocidade na execução.
            </p>
          </div>

          <div className="reveal reveal-d2">
            <button
              onClick={() => onCTA('features_cta')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#02CE37] text-white rounded-full font-medium text-[14px] transition-transform hover:scale-105 shadow-[0_4px_16px_rgba(2,206,55,0.25)] cursor-pointer"
            >
              Começar Agora
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 11L11 5M11 5H5.5M11 5V10.5" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card, i) => {
            const Visual = VISUALS[card.visual];
            return (
              <div
                key={i}
                className="reveal-scale group bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Visual area */}
                <div className="bg-[#f8f9fa] border-b border-slate-100 px-4 sm:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 h-[315px] sm:h-[308px] overflow-hidden">
                  <Visual />
                </div>

                {/* Text content */}
                <div className="px-4 sm:px-6 py-4 sm:py-5">
                  <h3 className="text-[18px] font-bold text-[#0c111d] mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
