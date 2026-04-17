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
      className="absolute inset-0 bg-white flex flex-col items-center pt-10 px-4 z-30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 50, pointerEvents: isActive ? "auto" : "none" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-8 h-1 bg-slate-200 rounded-full mb-6"></div>

      <motion.div 
         className="text-slate-800 font-bold text-[14px] mb-8 tracking-tight"
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
         transition={{ delay: 0.2 }}
      >
         Meta Atingida
      </motion.div>

      {/* Confetti & Circle Wrapper */}
      <div className="relative flex items-center justify-center mb-8">
         {/* Confetti */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {particles.map((_, i) => {
               const angle = (i * 360) / particles.length;
               const rad = (angle * Math.PI) / 180;
               // Explode outward
               const distance = 60 + Math.random() * 20;
               const x = Math.cos(rad) * distance;
               const y = Math.sin(rad) * distance;
               
               return (
                 <motion.div
                   key={i}
                   className="absolute w-1.5 h-1.5 rounded-full"
                   style={{ backgroundColor: i % 2 === 0 ? '#f59e0b' : '#10b981' }}
                   initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                   animate={showConfetti ? { x, y, scale: [0, 1.2, 0.8, 0], opacity: [0, 1, 1, 0] } : {}}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                 />
               );
            })}
         </div>

         {/* Circle Progress */}
         <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-md">
               {/* Background Track */}
               <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="none" />
               {/* Animated Progress */}
               <motion.circle 
                 cx="64" cy="64" r="56" 
                 stroke="#02CE37" strokeWidth="12" fill="none" strokeLinecap="round"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: isActive ? 1 : 0 }}
                 transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
               />
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center shadow-inner rounded-full">
               <motion.div 
                 className="text-[#02CE37] font-black text-[24px] leading-none"
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: showConfetti ? [1, 1.1, 1] : isActive ? 1 : 0.5, opacity: isActive ? 1 : 0 }}
                 transition={{ duration: 0.5, delay: isActive ? 1 : 0 }}
               >
                 100%
               </motion.div>
               <motion.div 
                  className="text-[8px] text-slate-400 uppercase tracking-widest mt-1 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ delay: 1.2 }}
               >
                 Batida
               </motion.div>
            </div>
         </div>
      </div>

      {/* Footer Stats / Dashboard rows */}
      <motion.div 
         className="w-full flex flex-col items-center gap-1"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
         transition={{ delay: 0.6, ...springSlow }}
      >
         <div className="text-[12px] font-bold text-slate-800 mb-2">120 / 120 Vendas</div>
         
         {/* Fake UI Rows */}
         <div className="w-[85%] h-8 bg-slate-50 rounded-lg border border-slate-100 flex items-center px-3 gap-2 mb-1 shadow-sm">
            <div className="w-4 h-4 rounded-full bg-[#02CE37]/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#02CE37]"></div>
            </div>
            <div className="w-16 h-1.5 bg-slate-200 rounded-full"></div>
            <div className="ml-auto w-8 h-1.5 bg-slate-300 rounded-full"></div>
         </div>
         <div className="w-[85%] h-8 bg-slate-50 rounded-lg border border-slate-100 flex items-center px-3 gap-2 shadow-sm">
            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center"></div>
            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
            <div className="ml-auto w-10 h-1.5 bg-slate-200 rounded-full"></div>
         </div>

         {/* Bottom Action Buttons */}
         <div className="flex gap-2 w-[85%] mt-4">
            <div className="flex-1 h-7 rounded-full bg-[#02CE37]/10 flex items-center justify-center border border-[#02CE37]/20">
               <div className="w-8 h-1 bg-[#02CE37]/50 rounded-full"></div>
            </div>
            <div className="flex-1 h-7 rounded-full bg-slate-100 flex items-center justify-center">
               <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
            </div>
         </div>
      </motion.div>
    </motion.div>
  );
}
