"use client";

import React from "react";
import { motion } from "framer-motion";
import GlobalCTA from "../ui/GlobalCTA";

/* ═══ Animated SVG Checkmark ═══ */
function AnimatedCheck({ delay }: { delay: number }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0">
      <motion.circle
        cx="10" cy="10" r="9" fill="none" stroke="#02CE37" strokeWidth="1.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M6 10.5L8.5 13L14 7"
        fill="none" stroke="#02CE37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />
    </svg>
  );
}

const TRIAL_FEATURES = [
  { icon: "🎯", label: "OKRs e Mapa Estratégico completo" },
  { icon: "📊", label: "Gestão de metas com check-ins em tempo real" },
  { icon: "📈", label: "KPIs e indicadores centralizados" },
  { icon: "🏆", label: "Gamificação com ranking e recompensas" },
  { icon: "🤖", label: "Inteligência Artificial integrada" },
  { icon: "📱", label: "Acesso total responsivo em qualquer dispositivo" },
  { icon: "🔗", label: "Automações e integrações" },
  { icon: "📢", label: "Mural corporativo e feed de resultados" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function OfferBlock({ onCTA }: { onCTA: (source: string) => void }) {
  return (
    <section id="teste-gratis" className="relative py-14 md:py-24 bg-[#f2f2f5] overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] md:w-[600px] h-[300px] md:h-[400px] bg-[#02CE37]/[0.04] rounded-full blur-[100px] md:blur-[150px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5">
        {/* ── Header — centered, same pattern as Footer header ── */}
        <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
          <motion.div
            className="inline-flex items-center gap-2 bg-[#02CE37]/10 border border-[#02CE37]/20 rounded-full px-4 py-1.5 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-[12px]">🎁</span>
            <span className="text-[12px] font-bold text-[#02CE37]">Teste grátis</span>
          </motion.div>

          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-[#0c111d] leading-[1.15] tracking-tight mb-4">
            Tudo isso no seu<br />
            <span className="text-[#02CE37]">teste grátis.</span>
          </h2>
          <p className="text-[13px] sm:text-[15px] text-slate-500 max-w-[500px] mx-auto leading-relaxed">
            Acesso completo a todas as funcionalidades. Sem limitações, sem surpresas.
          </p>
        </motion.div>

        {/* ── Product card — same visual as Features cards ── */}
        <motion.div
          className="max-w-[800px] mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Features grid */}
          <div className="p-5 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
              {TRIAL_FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#02CE37]/[0.03] transition-colors duration-300 cursor-default"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                >
                  <AnimatedCheck delay={0.3 + i * 0.08} />
                  <span className="text-[13px] sm:text-[14px] font-medium text-slate-700">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider + trust badges — same pattern as MobileApp pills */}
          <div className="border-t border-slate-100 px-5 sm:px-8 md:px-10 py-4 sm:py-5 bg-slate-50/50">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {[
                { icon: "🔒", text: "Sem cartão de crédito" },
                { icon: "⚡", text: "Ativação em 2 minutos" },
                { icon: "💬", text: "Suporte dedicado" },
              ].map((badge, i) => (
                <motion.div
                  key={badge.text}
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <span className="text-[14px]">{badge.icon}</span>
                  <span className="text-[12px] font-medium text-slate-500">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CTA — same pattern as Footer CTA ── */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          {...fadeUp}
        >
          <GlobalCTA text="Começar Teste Grátis" onClick={() => onCTA('offer_cta')} />
          <p className="text-[12px] text-slate-400 mt-4">
            Sem compromisso · Comece em 2 minutos
          </p>
        </motion.div>
      </div>
    </section>
  );
}
