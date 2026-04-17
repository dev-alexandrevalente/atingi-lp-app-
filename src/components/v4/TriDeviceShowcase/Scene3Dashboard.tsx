import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { SceneProps, springBouncy, springSlow } from "./variants";

export default function Scene3Dashboard({ currentScene }: SceneProps) {
  const isActive = currentScene === "SCENE_3_DASHBOARD";
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti slightly after the scene hits
  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setShowConfetti(true), 800);
      return () => clearTimeout(t);
    } else {
      setShowConfetti(false);
    }
  }, [isActive]);

  const particles = Array.from({ length: 12 });

  return (
    <motion.div
      className="absolute inset-0 bg-[#f8fafc] flex flex-col z-30 rounded-[2rem] overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 50, pointerEvents: isActive ? "auto" : "none" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* App Header */}
      <div className="pt-4 pb-1.5 px-2 bg-white border-b border-slate-100 flex flex-col items-center justify-center shrink-0">
          <div className="w-5 h-[2px] bg-slate-200 rounded-full mb-1.5"></div>
          <motion.div 
             className="text-slate-800 font-bold text-[7px] tracking-tight"
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
             transition={{ delay: 0.2 }}
          >
             Visão Geral
          </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center pt-2 px-1.5 overflow-hidden relative">
          {/* Confetti */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
             {particles.map((_, i) => {
                const angle = (i * 360) / particles.length;
                const rad = (angle * Math.PI) / 180;
                const distance = 20 + Math.random() * 10;
                const x = Math.cos(rad) * distance;
                const y = Math.sin(rad) * distance;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-[2px] h-[2px] rounded-full"
                    style={{ backgroundColor: i % 2 === 0 ? '#f59e0b' : '#10b981' }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={showConfetti ? { x, y, scale: [0, 1.2, 0.8, 0], opacity: [0, 1, 1, 0] } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                );
             })}
          </div>

          {/* Circle Progress as Hero Element */}
          <div className="relative w-14 h-14 mb-2">
             <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                <motion.circle 
                  cx="80" cy="80" r="70" 
                  stroke="#02CE37" strokeWidth="12" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isActive ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-white/60 backdrop-blur-[2px]">
                <motion.div 
                  className="text-[#02CE37] font-black text-[12px] leading-none tracking-tight"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: showConfetti ? [1, 1.1, 1] : isActive ? 1 : 0.5, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: isActive ? 1 : 0 }}
                >
                  100%
                </motion.div>
                <motion.div 
                   className="text-[4px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: isActive ? 1 : 0 }}
                   transition={{ delay: 1.2 }}
                >
                  Da Meta
                </motion.div>
             </div>
          </div>

          {/* App Content Rows */}
          <motion.div 
             className="w-full flex flex-col gap-1"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
             transition={{ delay: 0.6, ...springSlow }}
          >
             <div className="flex justify-between items-center px-1">
                 <span className="text-[5px] font-bold text-slate-800">Hoje</span>
                 <span className="text-[5px] font-bold text-[#02CE37]">120 Vendas</span>
             </div>
             
             {/* List Item 1 */}
             <div className="w-[96%] mx-auto bg-white rounded-[6px] p-1.5 flex items-center gap-1.5 shadow-sm border border-slate-100">
                <div className="w-4 h-4 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0">
                   <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M20 6L9 17l-5-5" />
                   </svg>
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                   <div className="w-[70%] h-1 bg-slate-800 rounded-full"></div>
                   <div className="w-[50%] h-[2px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="text-[5px] font-bold text-slate-800">+ R$ 4K</div>
             </div>

             {/* List Item 2 */}
             <div className="w-[96%] mx-auto bg-white rounded-[6px] p-1.5 flex items-center gap-1.5 shadow-sm border border-slate-100 opacity-80">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0"></div>
                <div className="flex flex-col gap-0.5 flex-1">
                   <div className="w-[60%] h-1 bg-slate-300 rounded-full"></div>
                   <div className="w-[40%] h-[2px] bg-slate-200 rounded-full"></div>
                </div>
                <div className="text-[5px] font-bold text-slate-400">R$ 2K</div>
             </div>
          </motion.div>
      </div>

      {/* App Bottom Tab Bar */}
      <div className="h-[24px] bg-white border-t border-slate-100 flex items-center justify-around px-1 shrink-0 pb-0.5 z-20">
         <div className="flex flex-col items-center gap-0.5 opacity-40">
            <div className="w-2.5 h-2.5 rounded-[3px] bg-slate-400"></div>
         </div>
         <div className="flex flex-col items-center gap-0.5">
            <div className="w-2.5 h-2.5 rounded-[3px] bg-[#02CE37]/20 flex items-center justify-center border border-[#02CE37]/30">
               <div className="w-1.5 h-1.5 rounded-full bg-[#02CE37]"></div>
            </div>
         </div>
         <div className="flex flex-col items-center gap-0.5 opacity-40">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
         </div>
      </div>
    </motion.div>
  );
}
