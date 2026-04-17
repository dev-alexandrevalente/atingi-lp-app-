"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ═══ Rewards with real brand logos ═══ */
const REWARDS = [
  { brand: "iFood", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/ifood_logo_1.webp`, color: "#EA1D2C", pts: 500, desc: "Voucher R$ 50", cat: "Alimentação" },
  { brand: "Spotify", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/spotify_logo_1_2x-1-300x90.webp`, color: "#1DB954", pts: 300, desc: "1 mês Premium", cat: "Entretenimento" },
  { brand: "Shopee", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/shopee_logo_1_2x-300x96.webp`, color: "#EE4D2D", pts: 450, desc: "Cupom R$ 50", cat: "Compras" },
  { brand: "SHEIN", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/shein_1_1_2x-1-300x62.webp`, color: "#222222", pts: 600, desc: "Voucher R$ 80", cat: "Moda" },
  { brand: "Uber", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/uber_2_1_2x-1.webp`, color: "#000000", pts: 400, desc: "R$ 40 em corridas", cat: "Mobilidade" },
  { brand: "Airbnb", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/airbnb_brasil_logo_1_2x-1-300x94.webp`, color: "#FF5A5F", pts: 1500, desc: "Crédito R$ 200", cat: "Viagens" },
  { brand: "Mercado Livre", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/mercado_livre_logo_1_2x-1-300x76.webp`, color: "#2D3277", pts: 700, desc: "Crédito R$ 75", cat: "Compras" },
  { brand: "TotalPass", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/totalpass_1_2x-1-300x34.webp`, color: "#FF6B00", pts: 350, desc: "1 mês academia", cat: "Saúde" },
  { brand: "Zeklub", logo: `/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/marcas/zeklub_1_2x-1-300x76.webp`, color: "#6C5CE7", pts: 550, desc: "Sessão de coaching", cat: "Desenvolvimento" },
];

/* ═══ SVG Checkmark animation ═══ */
function AnimatedCheck({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.svg
      width="40" height="40" viewBox="0 0 40 40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.circle cx="20" cy="20" r="18" fill="#02CE37" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} />
      <motion.path
        d="M12 20L17.5 25.5L28 14"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
    </motion.svg>
  );
}

function AnimatedTarget() {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#02CE37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
      <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }} />
      <motion.circle cx="12" cy="12" r="6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }} viewport={{ once: true }} />
      <motion.circle cx="12" cy="12" r="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }} viewport={{ once: true }} fill="#02CE37" />
    </motion.svg>
  );
}

function AnimatedCoin() {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      animate={{ scale: [1, 1.05, 1], y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
      <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }} />
      <motion.path d="M12 6v12" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 }} viewport={{ once: true }} />
      <motion.path d="M15 9.5c0-1.5-1.5-2.5-3-2.5-2 0-3 1-3 2.5 0 2.5 6 1.5 6 4s-1 2.5-3 2.5c-1.5 0-3-1-3-2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1 }} viewport={{ once: true }} />
    </motion.svg>
  );
}

function AnimatedGift() {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      <motion.rect x="3" y="8" width="18" height="4" rx="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} />
      <motion.path d="M12 8v13" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} viewport={{ once: true }} />
      <motion.path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} viewport={{ once: true }} />
      <motion.path d="M12 8H7.5A2.5 2.5 0 0 1 5 5A2.5 2.5 0 0 1 7.5 2.5A2.5 2.5 0 0 1 12 8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.5 }} viewport={{ once: true }} />
      <motion.path d="M12 8h4.5A2.5 2.5 0 0 0 19 5A2.5 2.5 0 0 0 16.5 2.5A2.5 2.5 0 0 0 12 8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.5 }} viewport={{ once: true }} />
    </motion.svg>
  );
}

/* ═══ Main Section ═══ */
export default function Rewards({ onCTA }: { onCTA: (source: string) => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userPoints, setUserPoints] = useState(3875);
  const [phase, setPhase] = useState<"idle" | "selecting" | "deducting" | "success">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "200px" });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!inView) return;
    let idx = 0;
    let cancelled = false;

    const cycle = () => {
      if (cancelled) return;
      idx = idx % REWARDS.length;
      setActiveIdx(idx);
      setPhase("idle");

      timerRef.current = setTimeout(() => {
        if (cancelled) return;
        setPhase("selecting");

        timerRef.current = setTimeout(() => {
          if (cancelled) return;
          setPhase("deducting");
          setUserPoints((p) => p - REWARDS[idx].pts);

          timerRef.current = setTimeout(() => {
            if (cancelled) return;
            setPhase("success");

            timerRef.current = setTimeout(() => {
              if (cancelled) return;
              idx = (idx + 1) % REWARDS.length;
              setUserPoints(3875);
              cycle();
            }, 2000);
          }, 900);
        }, 1200);
      }, 1800);
    };

    timerRef.current = setTimeout(cycle, 600);
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inView]);

  const active = REWARDS[activeIdx];

  return (
    <section id="recompensas" ref={sectionRef} className="relative py-12 md:py-20 bg-[#f2f2f5] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        <motion.div
          className="relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200/60"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* ═══ Left: Copy ═══ */}
            <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-20">
              <motion.div
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6 w-fit"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-[12px]">🎁</span>
                <span className="text-[12px] font-bold text-amber-600">Catálogo de Recompensas</span>
              </motion.div>

              <motion.h2
                className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-[#0c111d] leading-[1.15] tracking-tight mb-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Metas batidas viram <br className="hidden md:block" />
                <span className="text-[#02CE37]">recompensas de verdade.</span>
              </motion.h2>

              <motion.p
                className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed mb-8 max-w-[440px]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Cada meta concluída gera pontos automaticamente. Seu time troca por vouchers das maiores marcas do Brasil, direto na plataforma.
              </motion.p>

              {/* Animated Timeline / Mechanism Explained */}
              <div className="flex flex-col gap-0 mt-6 mb-10 w-full relative">
                {/* Visual connecting line */}
                <div className="absolute left-[20px] top-[24px] bottom-[24px] w-px bg-slate-200 z-0 overflow-hidden">
                  <motion.div
                    className="w-full h-[30%] bg-gradient-to-b from-transparent via-[#02CE37] to-transparent"
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Step 1 */}
                <motion.div
                  className="flex items-start gap-5 relative z-10 mb-6 group cursor-default"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center shrink-0 transition-colors group-hover:border-[#02CE37]/40 shadow-sm relative overflow-hidden"
                    animate={{ boxShadow: ["0 4px 10px rgba(0,0,0,0.03)", "0 4px 20px rgba(2,206,55,0.15)", "0 4px 10px rgba(0,0,0,0.03)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  >
                    <AnimatedTarget />
                  </motion.div>
                  <div className="pt-2">
                    <h4 className="text-[15px] lg:text-[16px] font-bold text-slate-800 leading-none">Bata suas metas</h4>
                    <p className="text-[13px] lg:text-[14px] text-slate-500 mt-1.5 leading-relaxed">Entregas e OKRs alcançados geram pontos sistêmicos que recompensam a alta performance do seu time.</p>
                  </div>
                </motion.div>
                
                {/* Step 2 */}
                <motion.div
                  className="flex items-start gap-5 relative z-10 mb-6 group cursor-default"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center shrink-0 transition-colors group-hover:border-[#3b82f6]/40 shadow-sm relative overflow-hidden"
                    animate={{ boxShadow: ["0 4px 10px rgba(0,0,0,0.03)", "0 4px 20px rgba(59,130,246,0.15)", "0 4px 10px rgba(0,0,0,0.03)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <AnimatedCoin />
                  </motion.div>
                  <div className="pt-2">
                    <h4 className="text-[15px] lg:text-[16px] font-bold text-slate-800 leading-none">Acumule saldo real</h4>
                    <p className="text-[13px] lg:text-[14px] text-slate-500 mt-1.5 leading-relaxed">Os pontos caem na hora após a aprovação do gestor e ficam disponíveis na carteira virtual de cada colaborador.</p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  className="flex items-start gap-5 relative z-10 group cursor-default"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center shrink-0 transition-colors group-hover:border-amber-400/40 shadow-sm relative overflow-hidden"
                    animate={{ boxShadow: ["0 4px 10px rgba(0,0,0,0.03)", "0 4px 20px rgba(245,158,11,0.15)", "0 4px 10px rgba(0,0,0,0.03)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    <AnimatedGift />
                  </motion.div>
                  <div className="pt-2">
                    <h4 className="text-[15px] lg:text-[16px] font-bold text-slate-800 leading-none">Troque por prêmios reais</h4>
                    <p className="text-[13px] lg:text-[14px] text-slate-500 mt-1.5 leading-relaxed">Resgate instantâneo de vouchers iFood, Uber, Airbnb, Spotify e grandes e-commerces direto do aplicativo.</p>
                  </div>
                </motion.div>
              </div>

              <motion.button
                onClick={() => onCTA('rewards_cta')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 bg-[#02CE37] text-white rounded-full font-semibold text-[14px] sm:text-[15px] w-fit transition-all hover:scale-105 shadow-[0_4px_20px_rgba(2,206,55,0.3)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ boxShadow: "0 6px 28px rgba(2,206,55,0.4)" }}
              >
                Ativar Recompensas
                <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 11L11 5M11 5H5.5M11 5V10.5" />
                  </svg>
                </span>
              </motion.button>
            </div>

            {/* ═══ Right: Interactive visual ═══ */}
            <div className="relative bg-[#f8f9fa] border-t lg:border-t-0 lg:border-l border-slate-100 p-5 sm:p-8 lg:p-10 flex flex-col justify-center min-h-[350px] sm:min-h-[500px]">

              {/* User balance bar */}
              <motion.div
                className="flex items-center justify-between bg-white rounded-2xl px-5 py-3.5 mb-6 shadow-sm border border-slate-100"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#02CE37]/40">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-slate-800 block leading-tight">Marina Silva</span>
                    <span className="text-[9px] text-slate-500">Gerente · Comercial</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">Saldo</span>
                  <motion.span
                    className="text-[18px] font-black tabular-nums"
                    style={{ color: phase === "deducting" ? "#ef4444" : "#02CE37" }}
                    animate={phase === "deducting" ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {userPoints.toLocaleString("pt-BR")}
                  </motion.span>
                  <span className="text-[10px] font-bold text-slate-400 ml-1">pts</span>
                </div>
              </motion.div>

              {/* Reward card showcase */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-4"
                  initial={{ opacity: 0, x: 50, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Brand header strip */}
                  <div className="h-2 w-full" style={{ backgroundColor: active.color }} />

                  <div className="px-5 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-sm">
                        <img src={active.logo} alt={active.brand} className="w-full h-full object-contain" draggable={false} />
                      </div>
                      <div className="flex-1">
                        <span className="text-[16px] font-bold text-slate-800 block">{active.brand}</span>
                        <span className="text-[13px] text-slate-500">{active.desc}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[18px] font-black text-[#02CE37] block">{active.pts}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">pontos</span>
                      </div>
                    </div>

                    {/* Category tag */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] bg-slate-100 text-slate-500 rounded-full px-2.5 py-0.5 font-medium">{active.cat}</span>
                      <span className="text-[10px] text-slate-400">·</span>
                      <span className="text-[10px] text-slate-400">Resgate imediato</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action status */}
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div
                    key="idle"
                    className="h-[44px] rounded-xl flex items-center justify-center font-bold text-[13px] text-white"
                    style={{ background: "linear-gradient(135deg, #02CE37, #028a25)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                  >
                    <motion.span animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      🎁 Resgatar Recompensa
                    </motion.span>
                  </motion.div>
                )}
                {phase === "selecting" && (
                  <motion.div
                    key="selecting"
                    className="h-[44px] rounded-xl bg-white border border-slate-200 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-[#02CE37] border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-[12px] text-slate-500 font-medium">Processando resgate...</span>
                  </motion.div>
                )}
                {phase === "deducting" && (
                  <motion.div
                    key="deducting"
                    className="h-[44px] rounded-xl bg-red-50 border border-red-200 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      className="text-[13px] font-bold text-red-500"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      −{active.pts} pts debitados
                    </motion.span>
                  </motion.div>
                )}
                {phase === "success" && (
                  <motion.div
                    key="success"
                    className="h-[44px] rounded-xl bg-green-50 border border-green-200 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AnimatedCheck show />
                    <span className="text-[13px] font-bold text-[#02CE37]">Voucher {active.brand} resgatado!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5 mt-5">
                {REWARDS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: activeIdx === i ? 18 : 6,
                      height: 6,
                      backgroundColor: activeIdx === i ? "#02CE37" : "#e2e8f0",
                    }}
                    layout
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Recent redeems */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Últimos resgates da equipe</span>
                <div className="mt-2 space-y-1.5">
                  {[
                    { name: "Lucas F.", brand: "Spotify", time: "2min" },
                    { name: "Camila S.", brand: "iFood", time: "15min" },
                    { name: "Pedro M.", brand: "Uber", time: "1h" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#02CE37]" />
                        <span className="text-[11px] text-slate-600 font-medium">{item.name}</span>
                        <span className="text-[11px] text-slate-400">resgatou</span>
                        <span className="text-[11px] text-slate-700 font-semibold">{item.brand}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
