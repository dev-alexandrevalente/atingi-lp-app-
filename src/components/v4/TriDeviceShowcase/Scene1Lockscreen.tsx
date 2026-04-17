import React from "react";
import { motion } from "framer-motion";
import { SceneProps, springBouncy, springMedium } from "./variants";

export default function Scene1Lockscreen({ currentScene }: SceneProps) {
  // Show in Scene 1, but also slightly keep it visible under Scene 2 before fading out? 
  // Given Scene 2 has 3 notifications on a blurred background, let's just transition smoothly.
  // Actually, let's keep Lockscreen active during Scene 2 but blur it, exactly like the image.
  const isScene1 = currentScene === "SCENE_1_LOCKSCREEN";
  const isScene2 = currentScene === "SCENE_2_NOTIFICATIONS";
  const isVisible = isScene1 || isScene2;

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] flex flex-col items-center pt-6 z-10"
      initial={false}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        filter: isScene2 ? "blur(4px)" : "blur(0px)",
        pointerEvents: isVisible ? "auto" : "none" 
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Clock & Date */}
      <div className="flex flex-col items-center mb-4 mt-1">
         <motion.div 
           className="text-slate-800 text-[20px] font-medium leading-none tracking-tight"
           animate={{ opacity: isScene2 ? 0.2 : 1 }}
         >
           09:41
         </motion.div>
         <motion.div 
           className="text-slate-500 text-[6px] font-medium mt-0.5 uppercase tracking-widest"
           animate={{ opacity: isScene2 ? 0.2 : 1 }}
         >
           Segunda-feira, 4 de Abril
         </motion.div>
      </div>

      {/* Main Single Notification */}
      <motion.div
        className="w-[92%] bg-white/70 backdrop-blur-2xl rounded-[10px] p-2 flex items-center gap-2 shadow-xl border border-white/80"
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ 
            y: isScene1 ? 0 : isScene2 ? -10 : 20, 
            opacity: isScene1 ? 1 : 0,   // Hidden in Scene 2
            scale: isScene1 ? 1 : 0.95 
        }}
        transition={{ delay: isScene1 ? 0.3 : 0, ...springBouncy }}
      >
        {/* Soft Icon Circle */}
        <div className="w-5 h-5 rounded-[5px] bg-[#02CE37]/10 flex items-center justify-center shrink-0">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#02CE37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        
        {/* Typographical Hierarchy */}
        <div className="flex-1 overflow-hidden">
          <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate tracking-tight leading-none">
            Meta Alcançada
          </div>
          <div className="text-[6px] text-slate-500 leading-tight">
            A equipe superou o alvo da semana.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
