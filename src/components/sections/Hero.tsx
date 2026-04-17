"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import GlobalCTA from "../ui/GlobalCTA";

const HeroAnimationDynamic = dynamic(() => import("./HeroAnimation"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] sm:h-[400px] w-full max-w-[720px] mx-auto bg-slate-200/50 animate-pulse rounded-[24px]" />
  ),
});

function HeroAnimationDeferred() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    // A animação do Hero pesa mais de 8.5 segundos no Main Thread em celulares devido aos cálculos estruturais do Framer Motion. 
    // Para resolver o PageSpeed e garantir nota verde, disable total das animações da Hero no mobile.
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => setIsDesktop(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (!isDesktop) {
    return (
      <div className="w-full flex justify-center py-6 opacity-80">
        <div className="max-w-sm rounded-[24px] border border-slate-200 bg-white/50 p-6 flex flex-col items-center gap-3">
           <span className="text-4xl">📊</span>
           <span className="text-[14px] font-semibold text-slate-600 text-center">Visibilidade Total da Operação</span>
        </div>
      </div>
    );
  }
  return <HeroAnimationDynamic />;
}

export default function Hero({ onCTA }: { onCTA: (source: string) => void }) {
  return (
    <section
      className="relative min-h-screen pt-[100px] md:pt-[120px] pb-12 md:pb-20 overflow-hidden bg-[#fafafa] flex flex-col items-center justify-center font-sans"
    >
      {/* Subtle CSS background — dot grid + gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, #02CE37 0.6px, transparent 0.6px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Soft gradient blobs - Desligados no mobile por conta do filter blur caríssimo na GPU (P0 Otimização) */}
        <div className="hidden md:block absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#02CE37]/[0.05] rounded-full blur-[80px] md:blur-[120px]" />
        <div className="hidden md:block absolute bottom-[10%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#02CE37]/[0.04] rounded-full blur-[60px] md:blur-[100px]" />
        <div className="hidden md:block absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] md:w-[700px] h-[200px] md:h-[400px] bg-[#02CE37]/[0.03] rounded-full blur-[80px] md:blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 flex flex-col items-center">
        
        {/* Hero Title - LCP Imediato sem Motion blocking */}
        <div className="text-center w-full px-2 mb-4 md:mb-6 mt-4">
          <h1 className="text-[clamp(2.1rem,5vw,4.5rem)] font-extrabold tracking-tight text-[#0c111d] leading-[1.15] md:leading-[1.1]">
            Software de Gestão de <br className="hidden sm:block" />
            <span className="text-[#02CE37]">Metas e Performance</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-[800px] mb-8 md:mb-10 w-full px-4">
          <p className="text-center text-[15px] sm:text-[18px] md:text-[20px] leading-[1.6] text-slate-600">
            Pare de gerenciar metas em planilhas e reuniões. A Atingi dá visibilidade, controle e previsibilidade para toda a sua operação, do estratégico ao operacional.
          </p>
        </div>

        {/* Hero Animation Component */}
        <div className="w-full mt-4 md:mt-10">
          <HeroAnimationDeferred />
        </div>

        {/* CTA Button */}
        <div className="mt-8 md:mt-12 mb-4">
          <GlobalCTA onClick={() => onCTA('hero_cta')} />
          <p className="mt-4 text-[12px] sm:text-[13px] text-slate-400 font-medium">
            Sem compromisso · Comece em 2 minutos
          </p>
        </div>
      </div>
    </section>
  );
}