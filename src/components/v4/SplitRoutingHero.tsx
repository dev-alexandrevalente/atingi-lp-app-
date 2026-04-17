"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizModal from "@/components/quiz/QuizModal";
import DirectLeadForm from "./DirectLeadForm";
import { trackInteraction } from "@/utils/analytics";
import TriDeviceShowcase from "./TriDeviceShowcase";

export default function SplitRoutingHero() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen bg-[#fafafa] relative font-sans text-[#0c111d]">
        
        {/* ─── LEFT COLUMN: SPLIT ROUTING & STATS (Pixel-perfect Homepage Clone) ─── */}
        <div className="relative flex flex-col justify-center min-h-screen lg:min-h-full w-full px-6 lg:px-10 xl:px-16 py-12 lg:py-16 bg-[#fafafa]">
          
          {/* Subtle CSS background — dot grid + V2 palette */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute inset-0 opacity-[0.2]"
              style={{
                backgroundImage: "radial-gradient(circle, #02CE37 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                backgroundPosition: "center center"
              }}
            />
            {/* Soft V2 gradient blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#02CE37]/[0.06] rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10 flex flex-col w-full max-w-[620px] mx-auto lg:mx-0 lg:my-auto">
            
            <AnimatePresence mode="wait">
              {!showLeadForm ? (
                <motion.div 
                  key="hero-content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col pt-4 lg:pt-0"
                >
                  {/* Header / Badges */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#02CE37] via-emerald-400 to-teal-500 shadow-sm flex-shrink-0 flex items-center justify-center">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                    <span className="text-[#0c111d] font-bold text-[22px] tracking-tight">Atingi Metas</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <p className="text-[20px] lg:text-[22px] font-medium text-slate-600 tracking-tight">
                      Software B2B
                    </p>
                    <div className="flex items-center gap-[6px] pt-[2px]">
                      <div className="h-[24px] px-2.5 rounded-full bg-[#00b67a] flex items-center justify-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 17 16" fill="white"><path d="M8.5 0L11.09 5.26L16.5 6.11L12.5 10.26L13.58 16L8.5 13.26L3.42 16L4.5 10.26L0.5 6.11L5.91 5.26L8.5 0Z"/></svg>
                        <span className="text-white text-[13px] font-bold">5.0</span>
                      </div>
                      <span className="text-[14px] font-medium text-slate-500">Satisfação de Clientes</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h1 className="text-[44px] lg:text-[56px] tracking-tight leading-[1.1] text-[#0c111d] w-full font-extrabold mb-4">
                    Software de Gestão de <br />
                    <span className="text-[#02CE37]">Metas e Performance</span>
                  </h1>
                  <p className="text-[20px] lg:text-[22px] text-slate-600 leading-[1.5] mb-8">
                    Pare de gerenciar metas operacionais em planilhas. A Atingi entrega total visibilidade e previsibilidade para o seu negócio em tempo real.
                  </p>

                  {/* Routing Buttons */}
                  <div className="flex flex-col gap-[18px] w-full mb-12">
                    
                    <motion.div 
                      whileHover={{ scale: 1.01, borderColor: '#02CE37', backgroundColor: '#f0fdf4' }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                      trackInteraction('route_choice', 'v4_agendar_demo', 'Agendar Demonstração clicked');
                      setShowLeadForm(true);
                    }}
                      className="cursor-pointer group flex items-center justify-between bg-white border border-slate-200 rounded-[20px] p-[24px] shadow-sm transition-all duration-300"
                    >
                      <div className="flex flex-col">
                        <h3 className="text-[22px] lg:text-[24px] font-medium text-[#0c111d] mb-1">Agendar Demonstração</h3>
                        <p className="text-[16px] text-slate-500 font-normal mt-0.5">
                          Mostraremos como a Atingi funcionaria na sua operação, passo a passo.
                        </p>
                      </div>
                      <div className="text-[#02CE37] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all pl-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                      </div>
                    </motion.div>

                  </div>

                  {/* Stats Grid */}
                  <div className="w-full relative">
                    <h4 className="text-[20px] font-medium text-slate-600 mb-6 tracking-tight text-center lg:text-left">
                      Benefícios Imediatos
                    </h4>
                    <div className="grid grid-cols-2 gap-[16px]">
                      <div className="bg-white border border-slate-200 rounded-[16px] p-[20px] relative overflow-hidden shadow-sm">
                        <h4 className="text-[32px] font-extrabold text-[#0c111d] leading-none mb-1 text-[#02CE37]">100%</h4>
                        <p className="text-[15px] text-slate-500 font-medium">Visibilidade da Operação</p>
                        <div className="absolute bottom-[-10px] right-[-10px] opacity-[0.03] text-[#0c111d]">
                           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-[16px] p-[20px] relative overflow-hidden shadow-sm">
                        <h4 className="text-[32px] font-extrabold text-[#0c111d] leading-none mb-1 text-[#02CE37]">OKRs</h4>
                        <p className="text-[15px] text-slate-500 font-medium">Metodologia Nativa</p>
                        <div className="absolute bottom-[-10px] right-[-10px] opacity-[0.03] text-[#0c111d]">
                           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-[16px] p-[20px] relative overflow-hidden shadow-sm">
                        <h4 className="text-[32px] font-extrabold text-[#0c111d] leading-none mb-1 text-[#02CE37]">Zero</h4>
                        <p className="text-[15px] text-slate-500 font-medium">Planilhas Quebradas</p>
                        <div className="absolute bottom-[-10px] right-[-10px] opacity-[0.03] text-[#0c111d]">
                           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 3h18v18H3zM12 8v4l3 3"/></svg>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-[16px] p-[20px] relative overflow-hidden shadow-sm">
                        <h4 className="text-[32px] font-extrabold text-[#0c111d] leading-none mb-1 text-[#02CE37]">Real</h4>
                        <p className="text-[15px] text-slate-500 font-medium">Dados Operacionais Atuais</p>
                        <div className="absolute bottom-[-10px] right-[-10px] opacity-[0.03] text-[#0c111d]">
                           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <DirectLeadForm key="lead-form" onBack={() => setShowLeadForm(false)} />
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* ─── RIGHT COLUMN: MARKETING PANEL (Wavy bg & Acrobits Demo Mockups) ─── */}
        <div className="relative bg-[#f8fafc] min-h-[600px] lg:min-h-full flex flex-col items-center justify-center pt-16 pb-8 px-6 lg:px-10 xl:px-16 overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200">
          
          {/* Subtle Concentric Rings (V2 styling matching) */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{
            backgroundImage: `repeating-radial-gradient(circle at center, transparent 0, transparent 48px, rgba(2, 206, 55, 0.05) 48px, rgba(2, 206, 55, 0.05) 50px)`,
            backgroundSize: "100% 100%"
          }} />

          {/* Top Headline */}
          <div className="relative z-10 w-full max-w-[650px] text-center mb-8 lg:mb-12 mt-auto">
             <h2 className="text-[28px] lg:text-[40px] font-extrabold text-[#0c111d] leading-[1.15] tracking-[-0.01em]">
                O Software de Gestão desenvolvido para empresas focadas em <span className="text-[#02CE37]">Resultados Reais</span>
             </h2>
          </div>

          {/* Tri-Device Cluster Showcase */}
          <TriDeviceShowcase />

          {/* Bottom Logos / Softswitches */}
          <div className="mt-auto pt-8 flex flex-col items-center justify-center gap-4 relative z-10 w-full">
             <p className="text-[15px] text-slate-500 font-semibold tracking-tight">Onde a sua operação já acontece</p>
             <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 opacity-[0.4] grayscale mix-blend-multiply transition-opacity hover:opacity-70">
                <span className="text-2xl font-black tracking-tighter text-[#0c111d]">Microsoft Excel</span>
                <span className="text-2xl font-black tracking-tighter text-[#0c111d]">Google Sheets</span>
                <span className="text-2xl font-black tracking-tighter text-[#0c111d]">PowerBI</span>
                <span className="text-2xl font-black tracking-tighter text-[#0c111d]">Notion</span>
             </div>
          </div>

        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <QuizModal isOpen={true} onClose={() => setShowQuizModal(false)} />
        </div>
      )}
    </>
  );
}
