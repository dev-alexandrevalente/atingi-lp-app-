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
      className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] flex flex-col items-center pt-16 px-4 z-10"
      initial={false}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        filter: isScene2 ? "blur(4px)" : "blur(0px)",
        pointerEvents: isVisible ? "auto" : "none" 
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Clock */}
      <motion.div 
        className="text-[#64748b] text-[36px] font-light mb-10 tracking-wider"
        animate={{ opacity: isScene2 ? 0.3 : 1 }}
      >
        09:41
      </motion.div>

      {/* Main Single Notification */}
      <motion.div
        className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ 
            y: isScene1 ? 0 : isScene2 ? -20 : 20, 
            opacity: isScene1 ? 1 : 0,   // Hidden in Scene 2 because it's replaced by the 3 staggers
            scale: isScene1 ? 1 : 0.95 
        }}
        transition={{ delay: isScene1 ? 0.3 : 0, ...springBouncy }}
      >
        <div className="w-7 h-7 rounded-full bg-[#02CE37] flex items-center justify-center shrink-0 shadow-sm shadow-[#02CE37]/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold text-slate-800 mb-0.5 tracking-tight">Meta Alcançada!</div>
          <div className="text-[9px] text-slate-500 leading-[1.2]">A sua equipe atingiu 120 vendas na semana.</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
