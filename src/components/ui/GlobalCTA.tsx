"use client";

import React from "react";

export default function GlobalCTA({
  text = "Começar Teste Grátis",
  onClick,
  className = ""
}: {
  text?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-[#02CE37] text-white rounded-full font-bold text-[14px] sm:text-[16px] overflow-hidden shadow-[0_6px_24px_rgba(2,206,55,0.3)] hover:shadow-[0_12px_40px_rgba(2,206,55,0.5)] transform transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      {/* ── Outer dynamic border ── */}
      <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/60 transition-colors duration-500" />
      
      {/* ── Inner glowing hover effect ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -rotate-12 pointer-events-none" />
      
      {/* ── Content ── */}
      <span className="relative z-10 flex items-center gap-3">
        {text}
        <span
          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/5 transform transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#02CE37]/20 group-hover:border-[#02CE37]/50"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 11L11 5M11 5H5.5M11 5V10.5" />
          </svg>
        </span>
      </span>
    </button>
  );
}
