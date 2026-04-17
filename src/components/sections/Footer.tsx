"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlobalCTA from "../ui/GlobalCTA";

export default function Footer({ onCTA }: { onCTA: (source: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <footer id="footer" ref={ref} className="relative bg-[#f2f2f5] overflow-hidden pt-10 md:pt-20">
      
      {/* ═══ Cinematic Final CTA Wrapper ═══ */}
      <div className="max-w-[1200px] mx-auto px-5 mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative bg-[#0c111d] rounded-[28px] md:rounded-[40px] overflow-hidden px-6 py-12 md:p-24 text-center border border-slate-800 shadow-[0_20px_80px_rgba(0,0,0,0.15)]"
        >
          {/* Animated Background System — Aurora Glow */}
          <div className="absolute inset-0 bg-[#0c111d]" />
          <motion.div
            className="absolute -top-[30%] md:-top-[50%] left-[-20%] md:-left-[10%] w-[120%] md:w-[60%] h-[150%] rounded-full blur-[100px] md:blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(2,206,55,0.15) 0%, transparent 70%)" }}
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-[30%] md:-bottom-[50%] right-[-20%] md:-right-[10%] w-[120%] md:w-[60%] h-[150%] rounded-full blur-[100px] md:blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(2,206,55,0.12) 0%, transparent 70%)" }}
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
            backgroundSize: '150px 150px'
          }} />
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            maskImage: `radial-gradient(ellipse 60% 60% at 50% 50%, #000 0%, transparent 100%)`
          }} />

          {/* Content */}
          <div className="relative z-10 max-w-[700px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 md:px-5 py-1.5 md:py-2 mb-6 md:mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#02CE37] animate-pulse" />
                <span className="text-[11px] md:text-[13px] font-bold tracking-widest text-[#02CE37] uppercase">Elevando Padrões</span>
              </div>

              <h2 className="text-[clamp(2.2rem,8vw,4.5rem)] font-black text-white leading-[1.05] tracking-tight mb-5 md:mb-6">
                A execução do <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#02CE37] to-[#028a25]">
                  próximo nível.
                </span>
              </h2>

              <p className="text-[15px] md:text-[20px] text-slate-400 mb-8 md:mb-10 leading-relaxed font-medium">
                Chega de planilhas quebradas e metas esquecidas. Coloque toda a sua operação na mesma página e veja os resultados acontecerem.
              </p>

              {/* Enhanced Universal CTA customized slightly for the dark footer */}
              <div className="flex flex-col items-center gap-4">
                <GlobalCTA 
                  onClick={() => onCTA('footer_cta')} 
                  text="Começar Agora" 
                  className="w-full sm:w-auto !px-8 md:!px-12 !py-5 md:!py-6 !text-[16px] md:!text-[18px] !bg-[#02CE37] !text-white !shadow-[0_8px_40px_rgba(2,206,55,0.4)] hover:!shadow-[0_12px_60px_rgba(2,206,55,0.6)] !border-none" 
                />
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-2 sm:mt-3 text-slate-400 text-[12px] md:text-[13px] font-medium">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L6 11L3 8"/></svg>
                    Sem cartão
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L6 11L3 8"/></svg>
                    Setup em minutos
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ═══ Minimal bottom bar ═══ */}
      <div className="border-t border-slate-200 py-6">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#02CE37] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8.5L6.5 12L13 4" />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-[#0c111d] tracking-tight">Atingi</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[12px] font-medium text-slate-500">
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#0c111d] transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-[#0c111d] transition-colors">Privacidade</a>
            </div>
            <span>© 2026 Atingi. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
