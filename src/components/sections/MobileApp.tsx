"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalCTA from "../ui/GlobalCTA";
import NextImage from "next/image";

/* ═══ Check-in items based on Atingi feature map ═══ */
const CHECK_ITEMS = [
  { icon: "🎯", title: "OKR atualizado", desc: "Aumentar Receita → 72% concluído", status: "success" },
  { icon: "📊", title: "Check-in registrado", desc: "Meta: Faturamento R$ 1M · Valor: R$ 780k", status: "success" },
  { icon: "🏆", title: "+100 pontos conquistados", desc: "Meta 'Fechar 200 contratos' concluída!", status: "success" },
  { icon: "📈", title: "Meta no caminho", desc: "Crescer base de clientes 25% → 56%", status: "progress" },
  { icon: "🤖", title: "Insight da IA", desc: "Risco detectado: Meta 'Reduzir custos' abaixo", status: "warning" },
  { icon: "📋", title: "Ciclo encerrado", desc: "1º Trimestre 2026 · Progresso médio: 68%", status: "success" },
  { icon: "🔔", title: "Notificação do Mural", desc: "Equipe Comercial atingiu 90% do objetivo!", status: "success" },
  { icon: "⚡", title: "Nova meta criada por IA", desc: "Sugestão aceita: 'NPS acima de 85'", status: "progress" },
  { icon: "✅", title: "Key Result atingido", desc: "KR: Ticket médio +15% · 100% concluído", status: "success" },
  { icon: "🎖️", title: "Recompensa disponível", desc: "Você tem 450 pontos · Day-off disponível", status: "success" },
];

function ScrollingChecks() {
  const [visibleStart, setVisibleStart] = useState(0);
  const VISIBLE_COUNT = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStart((prev) => (prev + 1) % CHECK_ITEMS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const index = (visibleStart + i) % CHECK_ITEMS.length;
      items.push({ ...CHECK_ITEMS[index], key: `${visibleStart}-${i}` });
    }
    return items;
  };

  const statusColors: Record<string, { bg: string; border: string; check: string }> = {
    success: { bg: "rgba(2, 206, 55, 0.08)", border: "#02CE37", check: "#02CE37" },
    progress: { bg: "rgba(59, 130, 246, 0.08)", border: "#3b82f6", check: "#3b82f6" },
    warning: { bg: "rgba(245, 158, 11, 0.08)", border: "#f59e0b", check: "#f59e0b" },
  };

  return (
    <div className="w-[calc(100%-2rem)] sm:w-[280px] max-w-[320px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden mx-auto sm:mx-0">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#02CE37] flex items-center justify-center">
            <span className="text-white text-[12px] font-bold">A</span>
          </div>
          <span className="text-[13px] font-bold text-slate-800">Atingi Cloud</span>
        </div>
        <motion.div
          className="flex items-center gap-1.5 bg-[#02CE37] rounded-full px-3 py-1"
          animate={{ boxShadow: ["0 0 0 0 rgba(2,206,55,0)", "0 0 0 6px rgba(2,206,55,0.15)", "0 0 0 0 rgba(2,206,55,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="text-[9px] font-bold text-white">CONECTADO</span>
        </motion.div>
      </div>

      {/* Scrolling items */}
      <div className="px-4 py-3 space-y-1.5 h-[200px] overflow-hidden relative">
        {/* Fade gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        <AnimatePresence mode="popLayout">
          {getVisibleItems().map((item, i) => {
            const colors = statusColors[item.status];
            return (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 cursor-pointer transition-colors"
                style={{ backgroundColor: i === 0 ? colors.bg : "transparent" }}
              >
                <span className="text-[14px] mt-0.5 flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-slate-800 block truncate leading-tight">{item.title}</span>
                  <span className="text-[9px] text-slate-500 block truncate mt-0.5">{item.desc}</span>
                </div>
                <motion.div
                  className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: colors.bg, border: `1.5px solid ${colors.border}` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                >
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke={colors.check} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══ Main Section ═══ */
export default function MobileApp({ onCTA }: { onCTA: (source: string) => void }) {
  return (
    <section id="mobile" className="relative py-6 md:py-20 bg-[#f2f2f5] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* ═══ DESKTOP VERSION ═══ */}
        <motion.div
          className="relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200/60 hidden lg:block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-0">
            {/* Left: copy */}
            <div className="flex flex-col justify-center px-16 py-20">
              <motion.div
                className="inline-flex items-center gap-2 bg-[#02CE37]/10 rounded-full px-4 py-1.5 mb-6 w-fit"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-[12px]">💻</span>
                <span className="text-[12px] font-bold text-[#02CE37]">100% Responsivo</span>
              </motion.div>

              <motion.h2
                className="text-[2.4rem] font-bold text-[#0c111d] leading-[1.15] tracking-tight mb-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Gestão de ponta a ponta <br className="hidden md:block" />
                de <span className="text-[#02CE37]">qualquer lugar.</span>
              </motion.h2>

              <motion.p
                className="text-[17px] text-slate-500 leading-relaxed mb-8 max-w-[440px]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Não importa se você está no escritório ou em trânsito. A Atingi funciona perfeitamente em qualquer tela.
                Atualize OKRs, faça check-ins e receba alertas da IA pelo seu celular ou computador.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  { text: "Check-ins rápidos", icon: "⚡", bg: "bg-blue-50", border: "border-blue-100", textCol: "text-blue-700" },
                  { text: "Alertas em tempo real", icon: "🔔", bg: "bg-amber-50", border: "border-amber-100", textCol: "text-amber-700" },
                  { text: "Insights com IA", icon: "🧠", bg: "bg-purple-50", border: "border-purple-100", textCol: "text-purple-700" },
                  { text: "Gamificação", icon: "🏆", bg: "bg-emerald-50", border: "border-emerald-100", textCol: "text-emerald-700" }
                ].map((pill, i) => (
                  <motion.span
                    key={pill.text}
                    className={`flex items-center gap-2 ${pill.bg} border ${pill.border} shadow-sm rounded-full px-4 py-2 text-[13px] font-semibold ${pill.textCol}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-[15px] leading-none">{pill.icon}</span>
                    {pill.text}
                  </motion.span>
                ))}
              </motion.div>

              <div className="mt-8">
                <GlobalCTA text="Começar Teste Grátis" onClick={() => onCTA('mobile_cta')} />
              </div>
            </div>

            {/* Right: photo + floating card */}
            <div className="relative min-h-[500px]">
              <div className="absolute inset-0">
                <NextImage
                  src={`/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/mobile-user.png`}
                  alt="Profissional usando Atingi no celular"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
              </div>

              <motion.div
                className="absolute bottom-8 left-8 z-20"
                initial={{ opacity: 0, y: 24, x: -12 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ScrollingChecks />
              </motion.div>

              <motion.div
                className="absolute top-8 right-8 z-20 bg-white rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-[#02CE37]/10 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-[14px]">🔔</span>
                </motion.div>
                <div>
                  <span className="text-[11px] font-bold text-slate-800 block leading-tight">3 atualizações</span>
                  <span className="text-[9px] text-slate-500">agora mesmo</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#02CE37] flex-shrink-0 animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ═══ MOBILE VERSION ═══ */}
        <motion.div
          className="relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/60 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Top: Hero image - only small badge floats on it */}
          <div className="relative h-[280px] overflow-hidden">
            <NextImage
              src={`/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/mobile-user.png`}
              alt="Profissional usando Atingi no celular"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              draggable={false}
            />
            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />

            {/* Floating notification badge - top right (small, doesn't block image) */}
            <motion.div
              className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-3 py-2 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-7 h-7 rounded-full bg-[#02CE37]/10 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-[13px]">🔔</span>
              </motion.div>
              <div>
                <span className="text-[11px] font-bold text-slate-800 block leading-tight">3 atualizações</span>
                <span className="text-[9px] text-slate-500">agora mesmo</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#02CE37] flex-shrink-0 animate-pulse" />
            </motion.div>
          </div>

          {/* Scrolling checks card - BELOW the image, not overlapping */}
          <div className="px-4 -mt-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ScrollingChecks />
            </motion.div>
          </div>

          {/* Bottom: Copy + CTA */}
          <div className="px-5 pt-5 pb-7">
            <motion.div
              className="inline-flex items-center gap-2 bg-[#02CE37]/10 rounded-full px-3.5 py-1.5 mb-4 w-fit"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-[12px]">💻</span>
              <span className="text-[12px] font-bold text-[#02CE37]">100% Responsivo</span>
            </motion.div>

            <motion.h2
              className="text-[22px] font-bold text-[#0c111d] leading-[1.2] tracking-tight mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              viewport={{ once: true }}
            >
              Gestão de ponta a ponta <br className="hidden md:block" />
              de <span className="text-[#02CE37]">qualquer lugar.</span>
            </motion.h2>

            <motion.p
              className="text-[14px] text-slate-500 leading-relaxed mb-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              A Atingi funciona perfeitamente em qualquer tela. Atualize OKRs, faça check-ins e receba alertas da IA pelo celular.
            </motion.p>

            {/* Feature pills - marquee carousel */}
            <div className="relative w-[calc(100%+2.5rem)] -mx-5 mb-6 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              <motion.div
                className="flex items-center gap-2 w-max animate-marquee-pills px-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
              >
                {[
                  { text: "Check-ins rápidos", icon: "⚡", bg: "bg-blue-50", border: "border-blue-100", textCol: "text-blue-700" },
                  { text: "Alertas em tempo real", icon: "🔔", bg: "bg-amber-50", border: "border-amber-100", textCol: "text-amber-700" },
                  { text: "Insights com IA", icon: "🧠", bg: "bg-purple-50", border: "border-purple-100", textCol: "text-purple-700" },
                  { text: "Gamificação", icon: "🏆", bg: "bg-emerald-50", border: "border-emerald-100", textCol: "text-emerald-700" },
                  // Duplicate for continuous loop
                  { text: "Check-ins rápidos", icon: "⚡", bg: "bg-blue-50", border: "border-blue-100", textCol: "text-blue-700" },
                  { text: "Alertas em tempo real", icon: "🔔", bg: "bg-amber-50", border: "border-amber-100", textCol: "text-amber-700" },
                  { text: "Insights com IA", icon: "🧠", bg: "bg-purple-50", border: "border-purple-100", textCol: "text-purple-700" },
                  { text: "Gamificação", icon: "🏆", bg: "bg-emerald-50", border: "border-emerald-100", textCol: "text-emerald-700" }
                ].map((pill, idx) => (
                  <span
                    key={`${pill.text}-${idx}`}
                    className={`flex items-center gap-1.5 ${pill.bg} border ${pill.border} shadow-sm rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${pill.textCol} flex-shrink-0`}
                  >
                    <span className="text-[14px] leading-none">{pill.icon}</span>
                    {pill.text}
                  </span>
                ))}
              </motion.div>
            </div>

            <GlobalCTA text="Começar Teste Grátis" onClick={() => onCTA('mobile_cta')} />
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-pills {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-pills {
          animation: marquee-pills 20s linear infinite;
        }
        .animate-marquee-pills:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
