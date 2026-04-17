"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export function HeroAtingiTest() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cursorLeftVariants = {
    animate: {
      y: [0, -15, 0, 10, 0],
      x: [0, 10, 0, -5, 0],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const cursorRightVariants = {
    animate: {
      y: [0, 15, 0, -10, 0],
      x: [0, -10, 0, 5, 0],
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F9FAFB] text-[#1C1C1C] py-[80px] lg:py-[120px] font-sans selection:bg-[#02CE37]/20 flex flex-col items-center justify-center min-h-[90vh]">
      
      {/* Background Decorativo - Grid / Cubos sutis */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" />
              <rect width="39" height="39" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-[24px] lg:px-[32px] text-center flex flex-col items-center">
        
        {/* Logo atingi */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          className="mb-[32px] flex justify-center"
        >
          {/* Implementação da marca real com Next Image */}
          <Image 
             src="/Marca_Principal.png" 
             alt="Logo Atingi" 
             width={160} 
             height={50} 
             className="h-[40px] md:h-[48px] w-auto object-contain"
             priority
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-[32px] w-full relative"
        >
          {/* Badge de Equipes */}
          <motion.div variants={itemVariants} className="z-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?img=${i + 40}`} 
                    alt="User" 
                    className="w-6 h-6 rounded-full border border-white object-cover" 
                  />
                ))}
              </div>
              {/* Text-label from DS: 12px / 500 / #1C1C1C or #6B7280 */}
              <span className="text-[12px] font-medium text-[#6B7280]">
                Equipes engajadas com metas claras
              </span>
            </div>
          </motion.div>

          {/* Floating Cursor Left (André) */}
          <motion.div 
            variants={cursorLeftVariants}
            animate="animate"
            className="absolute left-[0%] lg:left-[5%] top-[25%] z-30 hidden md:flex flex-col items-start pointer-events-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#FF7A50] w-8 h-8 drop-shadow-md">
              <path d="M5.5 3.5L19.5 10.5L12.5 13.5L9.5 20.5L5.5 3.5Z" fill="currentColor" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <div className="bg-[#FF7A50] text-[#FFFFFF] text-[12px] font-medium px-3 py-1.5 rounded-md rounded-tl-none shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center gap-2 mt-[-4px] ml-[8px]">
              <img src="https://i.pravatar.cc/100?img=11" alt="André" className="w-[16px] h-[16px] rounded-full"/>
              André
            </div>
          </motion.div>

          {/* Floating Cursor Right (Silvana) */}
          <motion.div 
            variants={cursorRightVariants}
            animate="animate"
            className="absolute right-[0%] lg:right-[5%] top-[35%] z-30 hidden md:flex flex-col items-start pointer-events-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#D926A9] w-8 h-8 drop-shadow-md transform -scale-x-100">
              <path d="M5.5 3.5L19.5 10.5L12.5 13.5L9.5 20.5L5.5 3.5Z" fill="currentColor" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <div className="bg-[#E000FF] text-[#FFFFFF] text-[12px] font-medium px-3 py-1.5 rounded-md rounded-tr-none shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center gap-2 mt-[-4px] ml-[-40px]">
              <img src="https://i.pravatar.cc/100?img=5" alt="Silvana" className="w-[16px] h-[16px] rounded-full"/>
              Silvana
            </div>
          </motion.div>

          {/* Headline Principal (h1 100% fiel ao DS: 48px, peso 600, tracking -0.02em, line-height 120%) */}
          <motion.h1
            variants={itemVariants}
            className="text-[36px] md:text-[44px] lg:text-[48px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#1C1C1C] max-w-[900px] z-20"
          >
            O sistema completo de gestão de <br className="hidden md:block"/>
            <span className="text-[#02CE37]">Objetivos, Metas e Gamificação <br className="hidden md:block"/> impulsionado por IA.</span>
          </motion.h1>

          {/* Subtítulo (body-lg 100% fiel ao DS: 18px, peso 500, line-height 150%) */}
          <motion.p
            variants={itemVariants}
            className="text-[16px] md:text-[18px] text-[#6B7280] leading-[1.5] max-w-[75ch] font-medium z-20"
          >
            O Atingi é a plataforma que centraliza o planejamento estratégico da sua empresa, automatiza o acompanhamento de resultados e engaja colaboradores através de um sistema de pontos e recompensa
          </motion.p>

          {/* CTA Area */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-[24px] pt-[16px] z-20">
            <div className="relative group perspective-[1000px]">
              {/* Green Glow effect */}
              <div className="absolute -inset-1 bg-[#02CE37] blur-[24px] opacity-40 group-hover:opacity-60 transition duration-500 rounded-full"></div>
              
              {/* Botão CTA Arredondado com Seta e Efeito de Luz */}
              <button 
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#02CE37] text-white px-[24px] py-[14px] md:px-[32px] md:py-[16px] text-[16px] md:text-[18px] font-bold transition-all duration-300 transform group-hover:bg-[#01A82D] group-hover:-translate-y-[2px] active:bg-[#018A24] shadow-[0_8px_24px_rgba(2,206,55,0.3)] focus:outline-none w-full sm:w-auto"
              >
                Sim, quero testar gratuitamente!
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform shrink-0">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                {/* Shine Animation */}
                <motion.div 
                  animate={{ left: ["-100%", "200%"] }} 
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              </button>
            </div>
            
            {/* Avaliações */}
            <div className="flex items-center gap-[8px] mt-[8px]">
              <div className="flex text-[#F59E0B]">
                <Star className="w-[16px] h-[16px] fill-current" />
                <Star className="w-[16px] h-[16px] fill-current" />
                <Star className="w-[16px] h-[16px] fill-current" />
                <Star className="w-[16px] h-[16px] fill-current" />
                <Star className="w-[16px] h-[16px] fill-current" />
              </div>
              {/* Label exato do DS: 12px, font-medium */}
              <span className="text-[12px] font-medium text-[#6B7280]">
                <strong className="text-[#1C1C1C]">4.9 / 5.0</strong> de satisfação e resultados
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
