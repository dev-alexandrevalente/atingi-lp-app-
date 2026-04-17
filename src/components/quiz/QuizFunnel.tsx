"use client";

import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { submitLeadAndRedirect, submitLeadAndTrialRedirect } from "@/utils/tracking";
import { useFunnelVersion } from "@/hooks/useFunnelVersion";
import { initSession, trackStep, updateLiveLead, endSessionBeacon, STEP_NAMES } from "@/utils/analytics";

/* ═══════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════ */



const ROLES = [
  { label: "Dono / Fundador", value: "dono", emoji: "👑", desc: "Visão geral das metas" },
  { label: "Gestor / Líder", value: "gestor", emoji: "🎯", desc: "Acompanhar equipe" },
  { label: "Coordenador", value: "coordenador", emoji: "📋", desc: "Executar e reportar" },
  { label: "Consultor / Parceiro", value: "consultor", emoji: "🤝", desc: "Recomendar para clientes" },
];

const TEAM_SIZES = [
  { label: "1–5", value: "1-5" },
  { label: "6–15", value: "6-15" },
  { label: "16–30", value: "16-30" },
  { label: "31–50", value: "31-50" },
  { label: "50+", value: "50+" },
];

const easePremium = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ═══════════════════════════════════════════════════════
   PHONE MASK
   ═══════════════════════════════════════════════════════ */
function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ═══════════════════════════════════════════════════════
   ANIMATED PARTICLE CONSTELLATION BACKGROUND
   Canvas-based for performance — organic flowing dots
   ═══════════════════════════════════════════════════════ */
function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; phase: number;
  }>>([]);

  useEffect(() => {
    // OTIMIZAÇÃO LCP MOBILE: Aborta o worker visual pesado se a tela for mobile.
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const count = 45;
    const W = window.innerWidth;
    const H = window.innerHeight;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1.5 + Math.random() * 1.5,
      opacity: 0.15 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const animate = () => {
      time += 0.008;
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);
      const pts = particlesRef.current;

      // Update & draw particles
      for (const p of pts) {
        p.x += p.vx + Math.sin(time + p.phase) * 0.15;
        p.y += p.vy + Math.cos(time + p.phase * 0.7) * 0.15;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(time * 2 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(2, 206, 55, ${pulseOpacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.08;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(2, 206, 55, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hidden md:block absolute inset-0 z-0 pointer-events-none" />;
}

/* ═══════════════════════════════════════════════════════
   ANIMATED GRADIENT MESH — organic flowing gradients
   ═══════════════════════════════════════════════════════ */
function GradientMesh() {
  return (
    <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(2,206,55,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "10%", left: "50%", translateX: "-50%",
        }}
        animate={{
          scale: [1, 1.2, 0.95, 1.15, 1],
          x: [0, 40, -30, 20, 0],
          y: [0, -30, 20, -15, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Secondary blob */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          bottom: "20%", right: "10%",
        }}
        animate={{
          scale: [1.1, 0.9, 1.15, 0.95, 1.1],
          x: [0, -25, 15, -10, 0],
          y: [0, 20, -25, 10, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Accent blob */}
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(2,206,55,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
          top: "60%", left: "15%",
        }}
        animate={{
          scale: [0.9, 1.2, 0.95, 1.1, 0.9],
          x: [0, 20, -15, 25, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}



/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTING — counting up to a target
   ═══════════════════════════════════════════════════════ */
function AnimatedCount({ target, duration = 2, delay = 0 }: { target: number; duration?: number; delay?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress >= 1) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return <>{count}</>;
}

/* ═══════════════════════════════════════════════════════
   ANIMATED GRADIENT BORDER BUTTON
   Conic gradient that rotates around the button edge
   ═══════════════════════════════════════════════════════ */
function GradientBorderButton({ children, onClick, className = "" }: {
  children: React.ReactNode; onClick: () => void; className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 bg-[#02CE37] text-white rounded-full font-bold text-[15px] overflow-hidden shadow-[0_6px_24px_rgba(2,206,55,0.3)] transition-all ${className}`}
      whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(2,206,55,0.5)" }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Outer dynamic border */}
      <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/60 transition-colors duration-500" />
      
      {/* Inner glowing hover effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -rotate-12" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════
   TELA 1: HERO — Cinematic premium experience
   ═══════════════════════════════════════════════════════ */

// Word-by-word stagger animation foi removida por decisão de performance (LCP imediato)

function ScreenHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex flex-col items-center w-full text-center overflow-visible">
      
      {/* Badge — premium pill */}
      <div className="mb-8">
        <img
          src={`/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/Marca_Principal.png`}
          alt="Atingi"
          className="h-8 w-auto object-contain"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Headline — static render for instant LCP */}
      <h1 className="relative z-10 text-[32px] md:text-[42px] font-extrabold text-slate-900 leading-[1.12] mb-1 px-4">
        <span className="flex flex-wrap justify-center gap-x-[7px]">
          <span className="inline-block">Chega</span>
          <span className="inline-block">de</span>
          <span className="inline-block text-[#02CE37]">metas</span>
        </span>
      </h1>
      
      <h1 className="relative z-10 text-[32px] md:text-[42px] font-extrabold text-slate-900 leading-[1.12] mb-4 px-4">
        <span className="flex flex-wrap justify-center gap-x-[7px]">
          <span className="inline-block">que</span>
          <span className="inline-block">ninguém</span>
          <span className="inline-block">bate.</span>
        </span>
      </h1>

      {/* Sub headline — static text immediately visible */}
      <p className="relative z-10 text-[16px] md:text-[18px] text-slate-700 font-medium leading-[1.5] max-w-[460px] mb-8">
        Teste grátis a única plataforma de Objetivos e metas com IA e gamificação que vai elevar o resultado das suas equipes.
      </p>

      {/* Social proof with animated count */}
      <div className="relative z-10 flex items-center gap-2.5 mb-8">
        {/* Overlapping avatars */}
        <div className="flex -space-x-2">
          {[
            "https://framerusercontent.com/images/r3db9Fvw0izSpE5Mvg1s4n3yw.png",
            "https://framerusercontent.com/images/UaCrJmEIuheeobCl9Q4FRgIXmk.png",
            "https://framerusercontent.com/images/a2Z3ZvmZfdFDbQtSD3NwCBZTA4.png",
            "https://framerusercontent.com/images/ZI5BuIsbw50xj9j15FIyBzAtj84.png",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ))}
        </div>
        <div className="text-[13px] text-slate-600 font-medium">
          <span className="font-bold text-[#02CE37]">+<AnimatedCount target={850} delay={0.2} /></span> empresas já testaram
        </div>
      </div>

      {/* CTA — animated gradient border */}
      <div className="relative z-10 w-full max-w-[320px]">
        <GradientBorderButton onClick={onStart} className="w-full h-[56px]">
          Quero testar grátis
          <motion.svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </GradientBorderButton>
      </div>

      {/* Trust badge */}
      <div className="relative z-10 flex items-center gap-2 mt-4">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="3" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <span className="text-[12px] text-slate-400 font-medium">Sem cartão de crédito</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TELA 1 — V2: HERO DE CONTINUIDADE
   Lead veio da landing page: já conhece a Atingi.
   Não pitcha mais — executa. Tom: contextual, direto.
   ═══════════════════════════════════════════════════════ */
function ScreenHeroV2({ onStart }: { onStart: () => void }) {
  // Etapas do funil para mostrar como indicador de progresso
  const steps = ["Seu perfil", "Tamanho do time", "Segmento", "Maturidade", "Ativar teste"];

  return (
    <motion.div
      className="relative flex flex-col items-center w-full text-center overflow-visible"
    >
      {/* Logo */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -16, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.05, type: "spring", stiffness: 200, damping: 16 }}
      >
        <img
          src={`/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/Marca_Principal.png`}
          alt="Atingi"
          className="h-7 w-auto object-contain"
          fetchPriority="high"
          loading="eager"
        />
      </motion.div>

      {/* Headline de continuidade */}
      <motion.h1
        className="relative z-10 text-[28px] md:text-[36px] font-extrabold text-slate-900 leading-[1.15] mb-3 px-4"
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.4, delay: 0.1, ease: easePremium }}
      >
        Agora vamos configurar a{" "}
        <span className="text-[#02CE37]">Atingi para o seu time.</span>
      </motion.h1>

      {/* Sub-headline contextual */}
      <motion.p
        className="relative z-10 text-[15px] md:text-[17px] text-slate-600 font-medium leading-[1.55] max-w-[400px] mb-7"
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.4, delay: 0.2, ease: easePremium }}
      >
        Responda algumas perguntas rápidas para que a gente entenda o seu contexto e ative o teste ideal para a sua empresa.
      </motion.p>

      {/* Indicador de etapas — mini journey map */}
      <motion.div
        className="relative z-10 flex items-center gap-1.5 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 180, damping: 16 }}
      >
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <div className="w-6 h-6 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center mb-1">
                <span className="text-[9px] font-bold text-slate-400">{i + 1}</span>
              </div>
              <span className="text-[8px] text-slate-400 font-medium whitespace-nowrap hidden sm:block">{step}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="w-5 h-px bg-slate-200 mb-5 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* CTA principal */}
      <motion.div
        className="relative z-10 w-full max-w-[300px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
      >
        <GradientBorderButton onClick={onStart} className="w-full h-[52px]">
          Iniciar configuração
          <motion.svg
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </GradientBorderButton>
      </motion.div>

      {/* Trust micro-copy */}
      <motion.div
        className="relative z-10 flex items-center gap-1.5 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-[11px] text-slate-400 font-medium">Grátis · Sem cartão · Cancele quando quiser</span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   TELA 1.5: INTRO — Cinematic Dashboard Assembly
   Multi-phase build animation showing the product
   being configured live for the lead
   ═══════════════════════════════════════════════════════ */
function ScreenIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3300);
    return () => clearTimeout(timer);
  }, [onDone]);

  const line1Words = ["Vamos", "personalizar", "sua", "experiência"];
  const line2Words = ["Precisamos", "entender", "seu", "contexto."];

  // Bar chart data
  const bars = [
    { h: 45, delay: 0.8 },
    { h: 70, delay: 0.9 },
    { h: 38, delay: 1.0 },
    { h: 82, delay: 1.1 },
    { h: 55, delay: 1.2 },
  ];

  // Metric cards
  const metrics = [
    { pct: 87, label: "Metas", color: "#02CE37" },
    { pct: 64, label: "Equipe", color: "#3b82f6" },
    { pct: 92, label: "Ciclos", color: "#8b5cf6" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* === PHASE 1: Dashboard wireframe assembles === */}
      <motion.div
        className="relative w-[300px] h-[180px] mb-10"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Dashboard container — glassmorphic frame */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Top bar */}
          <motion.div
            className="h-[28px] border-b border-slate-100 flex items-center px-3 gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <motion.div className="w-[6px] h-[6px] rounded-full bg-red-300"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
            <motion.div className="w-[6px] h-[6px] rounded-full bg-yellow-300"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 }} />
            <motion.div className="w-[6px] h-[6px] rounded-full bg-green-300"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
            <motion.div
              className="ml-auto h-[8px] w-[60px] rounded-full bg-slate-100"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
              style={{ transformOrigin: "right" }}
            />
          </motion.div>

          <div className="flex h-[calc(100%-28px)]">
            {/* Sidebar */}
            <motion.div
              className="w-[40px] border-r border-slate-100/80 flex flex-col items-center pt-3 gap-2.5"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className={`w-[14px] h-[14px] rounded-md ${i === 0 ? "bg-[#02CE37]/20 border border-[#02CE37]/30" : "bg-slate-100"}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, type: "spring" as const, stiffness: 300 }}
                />
              ))}
            </motion.div>

            {/* Main content area */}
            <div className="flex-1 p-3 flex flex-col gap-2.5">
              {/* Metric cards row */}
              <div className="flex gap-2">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="flex-1 bg-slate-50/80 rounded-lg p-2 border border-slate-100/60"
                    initial={{ y: 15, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, type: "spring" as const, stiffness: 200, damping: 14 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[6px] font-bold text-slate-500 uppercase tracking-wider">{m.label}</span>
                      <motion.span
                        className="text-[8px] font-bold"
                        style={{ color: m.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        {m.pct}%
                      </motion.span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-[3px] rounded-full bg-slate-200/60 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: m.color }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row: chart + activity feed */}
              <div className="flex gap-2 flex-1">
                {/* Bar chart */}
                <motion.div
                  className="flex-1 bg-slate-50/80 rounded-lg p-2 border border-slate-100/60 flex items-end justify-center gap-[5px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {bars.map((bar, i) => (
                    <motion.div
                      key={i}
                      className="w-[12px] rounded-t-sm"
                      style={{ backgroundColor: i === 3 ? "#02CE37" : "#e2e8f0" }}
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.h}%` }}
                      transition={{ delay: bar.delay, duration: 0.5, ease: "easeOut" }}
                    />
                  ))}
                </motion.div>

                {/* Activity feed */}
                <motion.div
                  className="flex-1 bg-slate-50/80 rounded-lg p-2 border border-slate-100/60 flex flex-col gap-1.5 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {[75, 55, 40, 65].map((w, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-1.5"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: i === 0 ? "#02CE37" : "#cbd5e1" }} />
                      <div
                        className="h-[3px] rounded-full bg-slate-200"
                        style={{ width: `${w}%` }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scanning line effect */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#02CE37]/40 to-transparent z-20"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Corner glow accents */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#02CE37]/30 blur-sm"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#02CE37]/30 blur-sm"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* === PHASE 2: Text reveal === */}
      <motion.div
        className="flex flex-wrap justify-center gap-x-[9px] mb-3"
        initial="hidden" animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 2.2 } } }}
      >
        {line1Words.map((word) => (
          <motion.span
            key={word}
            className={`text-[26px] font-bold inline-block ${
              word === "personalizar" ? "text-[#02CE37]" : "text-slate-900"
            }`}
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 140, damping: 14 } },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-x-[7px] mb-10"
        initial="hidden" animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 2.8 } } }}
      >
        {line2Words.map((word) => (
          <motion.span
            key={word}
            className={`text-[16px] inline-block ${
              word === "contexto." ? "font-extrabold text-[#02CE37] text-[18px]" : "text-slate-500 font-medium"
            }`}
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 150, damping: 14 } },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* === PHASE 3: Progress bar countdown === */}
      <motion.div
        className="w-[200px] h-[4px] rounded-full bg-slate-200/60 overflow-hidden"
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 3.2 }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#02CE37] to-[#86efac]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 3.3, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED SVG ILLUSTRATIONS — contextual per quiz step
   Draw-on SVGs that relate to the lead's daily work
   ═══════════════════════════════════════════════════════ */

/** Step 1: Org Chart — represents hierarchy & leadership role */
function IllustrationOrgChart() {
  const draw: any = { hidden: { pathLength: 0, opacity: 0 }, visible: (i: number) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: 0.2 + i * 0.15, duration: 0.6, ease: "easeInOut" }, opacity: { delay: 0.2 + i * 0.15, duration: 0.2 } } }) };
  return (
    <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none" initial="hidden" animate="visible" className="mb-4">
      {/* Top circle (CEO) */}
      <motion.circle cx="32" cy="12" r="7" stroke="#02CE37" strokeWidth="2" custom={0} variants={draw} />
      <motion.line x1="32" y1="19" x2="32" y2="30" stroke="#02CE37" strokeWidth="2" custom={1} variants={draw} />
      {/* Horizontal connector */}
      <motion.line x1="14" y1="30" x2="50" y2="30" stroke="#02CE37" strokeWidth="2" custom={2} variants={draw} />
      {/* Left branch */}
      <motion.line x1="14" y1="30" x2="14" y2="38" stroke="#02CE37" strokeWidth="2" custom={3} variants={draw} />
      <motion.circle cx="14" cy="44" r="5" stroke="#94a3b8" strokeWidth="1.5" custom={4} variants={draw} />
      {/* Center branch */}
      <motion.line x1="32" y1="30" x2="32" y2="38" stroke="#02CE37" strokeWidth="2" custom={3} variants={draw} />
      <motion.circle cx="32" cy="44" r="5" stroke="#94a3b8" strokeWidth="1.5" custom={4} variants={draw} />
      {/* Right branch */}
      <motion.line x1="50" y1="30" x2="50" y2="38" stroke="#02CE37" strokeWidth="2" custom={3} variants={draw} />
      <motion.circle cx="50" cy="44" r="5" stroke="#94a3b8" strokeWidth="1.5" custom={4} variants={draw} />
      {/* Bottom nodes */}
      <motion.line x1="14" y1="49" x2="14" y2="53" stroke="#e2e8f0" strokeWidth="1.5" custom={5} variants={draw} />
      <motion.circle cx="14" cy="56" r="3" stroke="#e2e8f0" strokeWidth="1" custom={6} variants={draw} />
      <motion.line x1="50" y1="49" x2="50" y2="53" stroke="#e2e8f0" strokeWidth="1.5" custom={5} variants={draw} />
      <motion.circle cx="50" cy="56" r="3" stroke="#e2e8f0" strokeWidth="1" custom={6} variants={draw} />
    </motion.svg>
  );
}

/** Step 2: Team Growth — people scaling up */
function IllustrationTeamGrowth() {
  const draw: any = { hidden: { pathLength: 0, opacity: 0 }, visible: (i: number) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: 0.15 + i * 0.12, duration: 0.5, ease: "easeInOut" }, opacity: { delay: 0.15 + i * 0.12, duration: 0.2 } } }) };
  const pop: any = { hidden: { scale: 0, opacity: 0 }, visible: (i: number) => ({ scale: 1, opacity: 1, transition: { delay: 0.3 + i * 0.12, type: "spring" as const, stiffness: 300, damping: 15 } }) };
  return (
    <motion.svg width="80" height="56" viewBox="0 0 80 56" fill="none" initial="hidden" animate="visible" className="mb-4">
      {/* Person 1 (small, left) */}
      <motion.circle cx="12" cy="30" r="5" stroke="#e2e8f0" strokeWidth="1.5" custom={0} variants={draw} />
      <motion.path d="M4 48a8 8 0 0116 0" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" custom={1} variants={draw} />
      {/* Person 2 */}
      <motion.circle cx="28" cy="26" r="6" stroke="#94a3b8" strokeWidth="1.5" custom={1} variants={draw} />
      <motion.path d="M18 48a10 10 0 0120 0" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" custom={2} variants={draw} />
      {/* Person 3 (center, main) */}
      <motion.circle cx="46" cy="20" r="8" stroke="#02CE37" strokeWidth="2" custom={2} variants={draw} />
      <motion.path d="M32 48a14 14 0 0128 0" stroke="#02CE37" strokeWidth="2" strokeLinecap="round" custom={3} variants={draw} />
      {/* Person 4 */}
      <motion.circle cx="66" cy="26" r="6" stroke="#94a3b8" strokeWidth="1.5" custom={3} variants={draw} />
      <motion.path d="M56 48a10 10 0 0120 0" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" custom={4} variants={draw} />
      {/* Growth arrow */}
      <motion.path d="M8 12L40 6L72 2" stroke="#02CE37" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" custom={5} variants={draw} />
      <motion.circle cx="72" cy="2" r="2.5" fill="#02CE37" custom={5} variants={pop} />
    </motion.svg>
  );
}

/** Step 3: Industry Building — represents business segment */
function IllustrationIndustry() {
  const draw: any = { hidden: { pathLength: 0, opacity: 0 }, visible: (i: number) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: 0.15 + i * 0.1, duration: 0.5, ease: "easeInOut" }, opacity: { delay: 0.15 + i * 0.1, duration: 0.2 } } }) };
  const pop: any = { hidden: { scale: 0, opacity: 0 }, visible: (i: number) => ({ scale: 1, opacity: 1, transition: { delay: 0.2 + i * 0.1, type: "spring" as const, stiffness: 300, damping: 15 } }) };
  return (
    <motion.svg width="72" height="60" viewBox="0 0 72 60" fill="none" initial="hidden" animate="visible" className="mb-4">
      {/* Left building */}
      <motion.rect x="4" y="24" width="16" height="32" rx="2" stroke="#94a3b8" strokeWidth="1.5" custom={0} variants={draw} />
      <motion.rect x="8" y="30" width="4" height="4" rx="0.5" fill="#e2e8f0" custom={2} variants={pop} />
      <motion.rect x="8" y="38" width="4" height="4" rx="0.5" fill="#e2e8f0" custom={3} variants={pop} />
      <motion.rect x="8" y="46" width="4" height="4" rx="0.5" fill="#e2e8f0" custom={4} variants={pop} />
      {/* Center building (tallest, primary) */}
      <motion.rect x="24" y="8" width="24" height="48" rx="2" stroke="#02CE37" strokeWidth="2" custom={1} variants={draw} />
      <motion.rect x="30" y="16" width="5" height="5" rx="0.5" fill="#02CE37" fillOpacity="0.2" custom={3} variants={pop} />
      <motion.rect x="37" y="16" width="5" height="5" rx="0.5" fill="#02CE37" fillOpacity="0.2" custom={4} variants={pop} />
      <motion.rect x="30" y="26" width="5" height="5" rx="0.5" fill="#02CE37" fillOpacity="0.2" custom={5} variants={pop} />
      <motion.rect x="37" y="26" width="5" height="5" rx="0.5" fill="#02CE37" fillOpacity="0.2" custom={5} variants={pop} />
      <motion.rect x="30" y="36" width="5" height="5" rx="0.5" fill="#02CE37" fillOpacity="0.15" custom={6} variants={pop} />
      <motion.rect x="37" y="36" width="5" height="5" rx="0.5" fill="#02CE37" fillOpacity="0.15" custom={6} variants={pop} />
      {/* Door */}
      <motion.rect x="33" y="46" width="6" height="10" rx="1" stroke="#02CE37" strokeWidth="1.5" custom={7} variants={draw} />
      {/* Right building */}
      <motion.rect x="52" y="30" width="16" height="26" rx="2" stroke="#94a3b8" strokeWidth="1.5" custom={2} variants={draw} />
      <motion.rect x="56" y="36" width="4" height="4" rx="0.5" fill="#e2e8f0" custom={5} variants={pop} />
      <motion.rect x="56" y="44" width="4" height="4" rx="0.5" fill="#e2e8f0" custom={6} variants={pop} />
      {/* Ground line */}
      <motion.line x1="0" y1="56" x2="72" y2="56" stroke="#e2e8f0" strokeWidth="1.5" custom={3} variants={draw} />
    </motion.svg>
  );
}

/** Step 4: Timeline — represents company maturity / time */
function IllustrationTimeline() {
  const draw: any = { hidden: { pathLength: 0, opacity: 0 }, visible: (i: number) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: 0.1 + i * 0.12, duration: 0.5, ease: "easeInOut" }, opacity: { delay: 0.1 + i * 0.12, duration: 0.2 } } }) };
  const pop: any = { hidden: { scale: 0, opacity: 0 }, visible: (i: number) => ({ scale: 1, opacity: 1, transition: { delay: 0.2 + i * 0.12, type: "spring" as const, stiffness: 300, damping: 15 } }) };
  return (
    <motion.svg width="80" height="56" viewBox="0 0 80 56" fill="none" initial="hidden" animate="visible" className="mb-4">
      {/* Base timeline */}
      <motion.line x1="4" y1="44" x2="76" y2="44" stroke="#e2e8f0" strokeWidth="2" custom={0} variants={draw} />
      {/* Growth curve */}
      <motion.path d="M8 40 Q20 38 28 32 Q36 26 44 22 Q52 18 60 12 Q68 6 74 4" stroke="#02CE37" strokeWidth="2" strokeLinecap="round" fill="none" custom={1} variants={draw} />
      {/* Milestone dots */}
      <motion.circle cx="8" cy="40" r="3" fill="#94a3b8" custom={2} variants={pop} />
      <motion.circle cx="28" cy="32" r="3" fill="#94a3b8" custom={3} variants={pop} />
      <motion.circle cx="44" cy="22" r="3.5" fill="#02CE37" custom={4} variants={pop} />
      <motion.circle cx="60" cy="12" r="3" fill="#94a3b8" custom={5} variants={pop} />
      <motion.circle cx="74" cy="4" r="4" fill="#02CE37" custom={6} variants={pop} />
      {/* Year labels */}
      <motion.text x="6" y="54" fontSize="7" fill="#94a3b8" fontWeight="500" custom={2} variants={pop}>1a</motion.text>
      <motion.text x="25" y="54" fontSize="7" fill="#94a3b8" fontWeight="500" custom={3} variants={pop}>3a</motion.text>
      <motion.text x="41" y="54" fontSize="7" fill="#02CE37" fontWeight="600" custom={4} variants={pop}>7a</motion.text>
      <motion.text x="56" y="54" fontSize="7" fill="#94a3b8" fontWeight="500" custom={5} variants={pop}>15a</motion.text>
      <motion.text x="70" y="54" fontSize="7" fill="#02CE37" fontWeight="600" custom={6} variants={pop}>+</motion.text>
      {/* Rising arrow at end */}
      <motion.path d="M74 4L78 2L76 7" stroke="#02CE37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" custom={7} variants={draw} />
    </motion.svg>
  );
}

/* ═══════════════════════════════════════════════════════
   TELA 2: SEU PAPEL — justified question + premium cards
   ═══════════════════════════════════════════════════════ */
const ROLES_V2 = [
  { label: "CEO / Dono", value: "ceo", icon: "👑", benefit: "Visão estratégica e controle total dos objetivos" },
  { label: "Diretor", value: "diretor", icon: "🎯", benefit: "Alinhamento de metas entre áreas e equipes" },
  { label: "Head / Gerente", value: "head", icon: "📊", benefit: "Gestão de performance e acompanhamento de KRs" },
  { label: "Coordenador", value: "coordenador", icon: "📋", benefit: "Execução tática e reports de progresso" },
];

function ScreenRole({ onSelect }: { onSelect: (v: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (role: typeof ROLES_V2[0], idx: number) => {
    setSelectedIdx(idx);
    // Short delay for selection animation feedback
    setTimeout(() => onSelect(role.value), 400);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Step indicator */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="w-6 h-6 rounded-full bg-[#02CE37] flex items-center justify-center text-white text-[11px] font-bold">1</span>
        <span className="text-[12px] text-slate-400 font-medium">de 5</span>
      </motion.div>

      {/* Animated illustration */}
      <IllustrationOrgChart />

      {/* Question */}
      <motion.h2
        className="text-[22px] font-bold text-slate-900 text-center leading-tight mb-2"
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.15, type: "spring" as const, stiffness: 150, damping: 14 }}
      >
        Qual o seu papel na empresa?
      </motion.h2>

      {/* Justification — WHY this matters */}
      <motion.p
        className="text-[13px] text-slate-500 text-center mb-8 max-w-[380px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Com base no seu perfil, vamos configurar o <span className="font-semibold text-slate-700">dashboard ideal</span> para o seu teste gratuito.
      </motion.p>

      {/* Role cards */}
      <div className="w-full space-y-3">
        {ROLES_V2.map((role, i) => {
          const isSelected = selectedIdx === i;
          return (
            <motion.button
              key={role.value}
              onClick={() => handleSelect(role, i)}
              disabled={selectedIdx !== null}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left cursor-pointer transition-all border relative overflow-hidden ${
                isSelected
                  ? "bg-[#02CE37]/[0.06] border-[#02CE37]/40 shadow-[0_0_0_1px_rgba(2,206,55,0.15),0_8px_30px_rgba(2,206,55,0.12)]"
                  : "bg-white/80 border-slate-200/60 hover:border-[#02CE37]/30 hover:shadow-lg shadow-sm"
              }`}
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring" as const, stiffness: 150, damping: 14 }}
              whileHover={selectedIdx === null ? { scale: 1.01, x: 4 } : {}}
              whileTap={selectedIdx === null ? { scale: 0.98 } : {}}
            >
              {/* Selection ripple */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-[#02CE37]/[0.04] rounded-2xl"
                  initial={{ scale: 0, borderRadius: "50%" }}
                  animate={{ scale: 2, borderRadius: "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}

              {/* Icon */}
              <motion.div
                className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                  isSelected
                    ? "bg-[#02CE37]/10 border-[#02CE37]/20"
                    : "bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200/50"
                }`}
                animate={isSelected ? { scale: [1, 1.15, 1.05], rotate: [0, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[20px]">{role.icon}</span>
              </motion.div>

              {/* Text */}
              <div className="relative z-10 flex-1 min-w-0">
                <span className="text-[15px] font-semibold text-slate-800 block">{role.label}</span>
                <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">{role.benefit}</span>
              </div>

              {/* Check / Arrow */}
              <div className="relative z-10 ml-auto flex-shrink-0">
                {isSelected ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 12 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#02CE37" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12l3 3 5-5" fill="none" />
                    </svg>
                  </motion.div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TELA 3: TAMANHO DO TIME — justified + premium grid
   ═══════════════════════════════════════════════════════ */
const TEAM_SIZES_V2 = [
  { label: "1–5", value: "1-5", desc: "Startup" },
  { label: "6–10", value: "6-10", desc: "Pequena" },
  { label: "11–20", value: "11-20", desc: "Em crescimento" },
  { label: "21–50", value: "21-50", desc: "Média" },
  { label: "51–80", value: "51-80", desc: "Grande" },
  { label: "81+", value: "81+", desc: "Enterprise" },
];

function ScreenTeam({ onSelect }: { onSelect: (v: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (size: typeof TEAM_SIZES_V2[0], idx: number) => {
    setSelectedIdx(idx);
    setTimeout(() => onSelect(size.value), 400);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Step indicator */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="w-6 h-6 rounded-full bg-[#02CE37] flex items-center justify-center text-white text-[11px] font-bold">2</span>
        <span className="text-[12px] text-slate-400 font-medium">de 5</span>
      </motion.div>

      {/* Animated illustration */}
      <IllustrationTeamGrowth />

      {/* Question */}
      <motion.h2
        className="text-[22px] font-bold text-slate-900 text-center leading-tight mb-2"
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.1, type: "spring" as const, stiffness: 150, damping: 14 }}
      >
        Qual o tamanho da sua equipe?
      </motion.h2>

      {/* Justification */}
      <motion.p
        className="text-[13px] text-slate-500 text-center mb-8 max-w-[380px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Precisamos disso para definir a <span className="font-semibold text-slate-700">capacidade do seu ambiente</span> e liberar os recursos certos.
      </motion.p>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {TEAM_SIZES_V2.map((size, i) => {
          const isSelected = selectedIdx === i;
          return (
            <motion.button
              key={size.value}
              onClick={() => handleSelect(size, i)}
              disabled={selectedIdx !== null}
              className={`group relative flex flex-col items-center justify-center py-5 rounded-2xl cursor-pointer transition-all border overflow-hidden ${
                isSelected
                  ? "bg-[#02CE37]/[0.06] border-[#02CE37]/40 shadow-[0_0_0_1px_rgba(2,206,55,0.15),0_8px_24px_rgba(2,206,55,0.12)]"
                  : "bg-white/80 border-slate-200/60 hover:border-[#02CE37]/30 hover:shadow-lg shadow-sm"
              }`}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring" as const, stiffness: 180, damping: 14 }}
              whileHover={selectedIdx === null ? { scale: 1.06, y: -3 } : {}}
              whileTap={selectedIdx === null ? { scale: 0.94 } : {}}
            >
              {/* Selection check */}
              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 400 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#02CE37" stroke="white" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l3 3 5-5" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>
              )}

              <span className={`text-[22px] font-bold transition-colors ${
                isSelected ? "text-[#02CE37]" : "text-slate-800 group-hover:text-[#02CE37]"
              }`}>
                {size.label}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 font-medium">{size.desc}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TELA 4: SEGMENTO — industry vertical selection
   ═══════════════════════════════════════════════════════ */
const SEGMENTOS = [
  { label: "Tecnologia", value: "tecnologia", icon: "💻" },
  { label: "Agência", value: "agencia", icon: "🎨" },
  { label: "Serviços B2B", value: "servicos-b2b", icon: "🤝" },
  { label: "Educação", value: "educacao", icon: "📚" },
  { label: "Varejo / Franquias", value: "varejo-franquias", icon: "🏪" },
  { label: "Saúde", value: "saude", icon: "🏥" },
  { label: "Contábil / Jurídico", value: "contabil-juridico", icon: "⚖️" },
  { label: "Indústria", value: "industria", icon: "🏭" },
];

function ScreenSegmento({ onSelect }: { onSelect: (v: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (seg: typeof SEGMENTOS[0], idx: number) => {
    setSelectedIdx(idx);
    setTimeout(() => onSelect(seg.value), 400);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Step indicator */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="w-6 h-6 rounded-full bg-[#02CE37] flex items-center justify-center text-white text-[11px] font-bold">3</span>
        <span className="text-[12px] text-slate-400 font-medium">de 5</span>
      </motion.div>

      {/* Animated illustration */}
      <IllustrationIndustry />

      {/* Question */}
      <motion.h2
        className="text-[22px] font-bold text-slate-900 text-center leading-tight mb-2"
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.1, type: "spring" as const, stiffness: 150, damping: 14 }}
      >
        Qual o segmento da sua empresa?
      </motion.h2>

      {/* Justification */}
      <motion.p
        className="text-[13px] text-slate-500 text-center mb-8 max-w-[380px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Cada setor tem <span className="font-semibold text-slate-700">desafios únicos de metas</span>. Vamos personalizar sua experiência.
      </motion.p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {SEGMENTOS.map((seg, i) => {
          const isSelected = selectedIdx === i;
          return (
            <motion.button
              key={seg.value}
              onClick={() => handleSelect(seg, i)}
              disabled={selectedIdx !== null}
              className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left cursor-pointer transition-all border overflow-hidden ${
                isSelected
                  ? "bg-[#02CE37]/[0.06] border-[#02CE37]/40 shadow-[0_0_0_1px_rgba(2,206,55,0.15),0_8px_24px_rgba(2,206,55,0.12)]"
                  : "bg-white/80 border-slate-200/60 hover:border-[#02CE37]/30 hover:shadow-lg shadow-sm"
              }`}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.05, type: "spring" as const, stiffness: 180, damping: 14 }}
              whileHover={selectedIdx === null ? { scale: 1.03, y: -2 } : {}}
              whileTap={selectedIdx === null ? { scale: 0.96 } : {}}
            >
              {/* Selection check */}
              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 400 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#02CE37" stroke="white" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l3 3 5-5" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>
              )}

              <span className="text-[18px]">{seg.icon}</span>
              <span className={`text-[14px] font-semibold transition-colors ${
                isSelected ? "text-[#02CE37]" : "text-slate-800 group-hover:text-[#02CE37]"
              }`}>
                {seg.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TELA 5: TEMPO DE EMPRESA — company maturity
   ═══════════════════════════════════════════════════════ */
const TEMPO_EMPRESA = [
  { label: "Menos de 1 ano", value: "menos-1", desc: "Nascendo" },
  { label: "1–3 anos", value: "1-3", desc: "Validando" },
  { label: "3–7 anos", value: "3-7", desc: "Crescendo" },
  { label: "7–15 anos", value: "7-15", desc: "Consolidada" },
  { label: "15+ anos", value: "15+", desc: "Madura" },
];

function ScreenTempoEmpresa({ onSelect }: { onSelect: (v: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (tempo: typeof TEMPO_EMPRESA[0], idx: number) => {
    setSelectedIdx(idx);
    setTimeout(() => onSelect(tempo.value), 400);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Step indicator */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="w-6 h-6 rounded-full bg-[#02CE37] flex items-center justify-center text-white text-[11px] font-bold">4</span>
        <span className="text-[12px] text-slate-400 font-medium">de 5</span>
      </motion.div>

      {/* Animated illustration */}
      <IllustrationTimeline />

      {/* Question */}
      <motion.h2
        className="text-[22px] font-bold text-slate-900 text-center leading-tight mb-2"
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.1, type: "spring" as const, stiffness: 150, damping: 14 }}
      >
        Há quanto tempo a empresa existe?
      </motion.h2>

      {/* Justification */}
      <motion.p
        className="text-[13px] text-slate-500 text-center mb-8 max-w-[380px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Empresas em diferentes <span className="font-semibold text-slate-700">estágios de maturidade</span> precisam de abordagens distintas para metas.
      </motion.p>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {TEMPO_EMPRESA.map((tempo, i) => {
          const isSelected = selectedIdx === i;
          return (
            <motion.button
              key={tempo.value}
              onClick={() => handleSelect(tempo, i)}
              disabled={selectedIdx !== null}
              className={`group relative flex flex-col items-center justify-center py-5 rounded-2xl cursor-pointer transition-all border overflow-hidden ${
                isSelected
                  ? "bg-[#02CE37]/[0.06] border-[#02CE37]/40 shadow-[0_0_0_1px_rgba(2,206,55,0.15),0_8px_24px_rgba(2,206,55,0.12)]"
                  : "bg-white/80 border-slate-200/60 hover:border-[#02CE37]/30 hover:shadow-lg shadow-sm"
              }`}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring" as const, stiffness: 180, damping: 14 }}
              whileHover={selectedIdx === null ? { scale: 1.06, y: -3 } : {}}
              whileTap={selectedIdx === null ? { scale: 0.94 } : {}}
            >
              {/* Selection check */}
              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 400 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#02CE37" stroke="white" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l3 3 5-5" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>
              )}

              <span className={`text-[20px] font-bold transition-colors ${
                isSelected ? "text-[#02CE37]" : "text-slate-800 group-hover:text-[#02CE37]"
              }`}>
                {tempo.label}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 font-medium">{tempo.desc}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ScreenActivate({ onSubmit }: { onSubmit: (data: { name: string; email: string; phone: string }) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValid = name.trim().length >= 2 && email.includes("@") && email.includes(".") && phone.replace(/\D/g, "").length >= 10 && !isSubmitting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    onSubmit({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.replace(/\D/g, "") });
  };

  const inputClass = (field: string) => `w-full h-[50px] pl-11 pr-4 rounded-xl text-[14px] text-slate-800 bg-white/90 border outline-none transition-all placeholder:text-slate-300 shadow-sm ${
    focusedField === field
      ? "border-[#02CE37]/50 ring-2 ring-[#02CE37]/10 shadow-[0_0_0_3px_rgba(2,206,55,0.06)]"
      : "border-slate-200/80"
  }`;

  const fields = [
    { key: "name", type: "text", value: name, set: setName, placeholder: "Seu nome completo", autoComplete: "name",
      icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
    { key: "email", type: "email", value: email, set: setEmail, placeholder: "seu@email.com", autoComplete: "email",
      icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></> },
    { key: "phone", type: "tel", value: phone, set: (v: string) => setPhone(formatPhone(v)), placeholder: "(11) 99999-9999", autoComplete: "tel",
      icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" /> },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Step indicator */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="w-6 h-6 rounded-full bg-[#02CE37] flex items-center justify-center text-white text-[11px] font-bold">5</span>
        <span className="text-[12px] text-slate-400 font-medium">de 5</span>
      </motion.div>

      {/* Animated checkmark */}
      <motion.div
        className="mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 250, damping: 15 }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52">
          <motion.circle
            cx="26" cy="26" r="24"
            fill="none" stroke="#02CE37" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M15 26L22.5 33.5L37 18"
            fill="none" stroke="#02CE37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </svg>
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="text-[22px] font-bold text-slate-900 text-center leading-tight mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ease: easePremium }}
      >
        Tudo pronto! Ative seu acesso gratuito
      </motion.h2>

      {/* Justification */}
      <motion.p
        className="text-[13px] text-slate-500 text-center mb-6 max-w-[380px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Preencha seus dados para que nosso time <span className="font-semibold text-slate-700">configure seu ambiente personalizado</span> em instantes.
      </motion.p>

      {/* Form Area */}
      <motion.div
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isValid) {
            e.preventDefault();
            handleSubmit({ preventDefault: () => {} } as React.FormEvent);
          }
        }}
        className="w-full space-y-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ease: easePremium }}
      >
        {fields.map((field, i) => (
          <motion.div
            key={field.key}
            className="relative"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.08, type: "spring" as const, stiffness: 150, damping: 14 }}
          >
            <motion.div
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              animate={{ color: focusedField === field.key ? "#02CE37" : "#cbd5e1" }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {field.icon}
              </svg>
            </motion.div>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              onFocus={() => setFocusedField(field.key)}
              onBlur={() => setFocusedField(null)}
              placeholder={field.placeholder}
              className={inputClass(field.key)}
              autoFocus={i === 0}
              autoComplete={field.autoComplete}
            />
          </motion.div>
        ))}

        {/* Submit */}
        <motion.div
          className="relative pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <GradientBorderButton
            onClick={() => { if (isValid) handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}
            className={`w-full h-[52px] ${!isValid ? "opacity-30 pointer-events-none" : ""}`}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Ativar meu acesso grátis
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </GradientBorderButton>
        </motion.div>
      </motion.div>

      {/* Trust */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#02CE37" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="7" width="10" height="7" rx="2" /><path d="M5 7V5a3 3 0 016 0v2" />
        </svg>
        <span className="text-[11px] text-slate-400 font-medium">Seus dados estão seguros. Sem spam.</span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN GATE — 7 screens (hero, intro, 4 quiz steps, activate)
   ═══════════════════════════════════════════════════════ */
type Screen = "hero" | "intro" | "role" | "team" | "segmento" | "tempo_empresa" | "activate";
const SCREEN_ORDER: Screen[] = ["hero", "intro", "role", "team", "segmento", "tempo_empresa", "activate"];

export default function QuizFunnel({ mode = 'gate' }: { mode?: 'gate' | 'modal' }) {
  const { setRole, setAnswer, setLeadInfo, setScore, completeQuiz, quizData } = useQuiz();
  const [currentScreen, setCurrentScreen] = useState<Screen>("hero");
  const [direction, setDirection] = useState(1);
  const { isV1, isV2, isV3 } = useFunnelVersion();

  const screenIndex = SCREEN_ORDER.indexOf(currentScreen);

  // ── Analytics: determine funnel version for session ──────────────────────────
  const funnelVersion = isV3 ? 'v3' : isV2 ? 'v2' : 'v1';

  // ── Analytics: init session on mount ─────────────────────────────────────────
  useEffect(() => {
    initSession(funnelVersion);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Analytics: track each screen transition ───────────────────────────────────
  useEffect(() => {
    const idx = SCREEN_ORDER.indexOf(currentScreen);
    if (idx >= 0) trackStep(idx, 'enter');
  }, [currentScreen]);

  // ── Analytics: endSessionBeacon on tab close ──────────────────────────────────
  useEffect(() => {
    const handleUnload = () => endSessionBeacon(screenIndex);
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [screenIndex]);

  const goNext = useCallback(() => {
    const next = screenIndex + 1;
    if (next < SCREEN_ORDER.length) {
      trackStep(screenIndex, 'exit');
      setDirection(1);
      setCurrentScreen(SCREEN_ORDER[next]);
    }
  }, [screenIndex]);

  const goBack = useCallback(() => {
    const prev = screenIndex - 1;
    if (prev >= 0) {
      setDirection(-1);
      setCurrentScreen(SCREEN_ORDER[prev]);
    }
  }, [screenIndex]);

  // ── Step handlers with Live Lead update on each answer ────────────────────────
  const handleRole = (v: string) => {
    setRole(v);
    setAnswer("nivel", v);
    updateLiveLead({ quiz_role: v });
    goNext();
  };

  const handleTeam = (v: string) => {
    setAnswer("tamanho", v);
    updateLiveLead({ quiz_team_size: v });
    goNext();
  };

  const handleSegmento = (v: string) => {
    setAnswer("segmento", v);
    updateLiveLead({ quiz_segment: v });
    goNext();
  };

  const handleTempoEmpresa = (v: string) => {
    setAnswer("tempo_empresa", v);
    updateLiveLead({ quiz_time_company: v });
    goNext();
  };

  const handleActivate = (data: { name: string; email: string; phone: string }) => {
    setLeadInfo(data);
    setScore(0);

    // ── Analytics: save full lead data + mark as converted ────────────────────
    const phoneDigits = data.phone.replace(/\D/g, '');
    const formattedPhone = phoneDigits.startsWith('55') ? phoneDigits : '55' + phoneDigits;
    updateLiveLead({
      lead_name: data.name,
      lead_email: data.email,
      lead_phone: formattedPhone,
      is_converted: true,
    });
    trackStep(SCREEN_ORDER.indexOf('activate'), 'interaction', { action: 'submit_lead' });

    if (mode === 'modal') {
      completeQuiz();
      if (isV3) {
        submitLeadAndTrialRedirect(data, 'quiz_modal_v3', quizData);
      } else {
        submitLeadAndRedirect(data, 'quiz_modal_v2', quizData);
      }
    } else {
      // V1: Quiz done → show landing page
      completeQuiz();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 260 : -260, opacity: 0, filter: "blur(6px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ x: dir > 0 ? -260 : 260, opacity: 0, filter: "blur(6px)" }),
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "hero": return mode === "modal"
        ? <ScreenHeroV2 key="hero" onStart={goNext} />
        : <ScreenHero key="hero" onStart={goNext} />;
      case "intro": return <ScreenIntro key="intro" onDone={goNext} />;
      case "role": return <ScreenRole key="role" onSelect={handleRole} />;
      case "team": return <ScreenTeam key="team" onSelect={handleTeam} />;
      case "segmento": return <ScreenSegmento key="segmento" onSelect={handleSegmento} />;
      case "tempo_empresa": return <ScreenTempoEmpresa key="tempo_empresa" onSelect={handleTempoEmpresa} />;
      case "activate": return <ScreenActivate key="activate" onSubmit={handleActivate} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f7f8fa] flex items-center justify-center">
      {/* Canvas particle constellation */}
      <ParticleConstellation />
      {/* Animated gradient mesh */}
      <GradientMesh />

      <div className="relative z-10 w-full max-w-[520px] h-full flex flex-col">
        {/* Top bar — progress only after hero */}
        {currentScreen !== "hero" && currentScreen !== "intro" && (
          <motion.div
            className="flex-shrink-0 px-5 pt-5 pb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <button onClick={goBack} className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Voltar
              </button>
              <div className="flex items-center gap-1.5">
                {SCREEN_ORDER.slice(1).map((s, i) => (
                  <motion.div
                    key={s}
                    className="w-8 h-1.5 rounded-full"
                    animate={{
                      backgroundColor: i < screenIndex ? "#02CE37" : i === screenIndex - 1 ? "#02CE37" : "#e2e8f0",
                      scaleX: i === screenIndex - 1 ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Screen content */}
        <div className="flex-1 flex items-center overflow-hidden px-5 pb-6">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentScreen}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
