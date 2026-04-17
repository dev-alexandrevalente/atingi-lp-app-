import React from "react";
import { motion } from "framer-motion";
import { SceneProps, MockupScene, springBouncy, springMedium } from "./variants";

export default function Scene2Notifications({ currentScene }: SceneProps) {
  const isActive = currentScene === "SCENE_2_NOTIFICATIONS";

  const cards = [
    {
      id: 1,
      title: "Recorde Batido!",
      desc: "Você superou a meta trimestral.",
      iconColors: "bg-[#fef3c7] text-[#f59e0b]",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Ranking Atualizado!",
      desc: "Você subiu para o 1º lugar.",
      iconColors: "bg-[#ede9fe] text-[#8b5cf6]",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 19 2 12 11 5 11 19"></polygon>
          <path d="M22 12A10 10 0 0 0 12 2v20a10 10 0 0 0 10-10z"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "Meta Alcançada!",
      desc: "120 vendas totais na semana.",
      iconColors: "bg-[#dcfce7] text-[#10b981]",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center -mt-4">
      {cards.map((card, i) => (
        <motion.div
           key={card.id}
           className="w-[92%] bg-white/80 rounded-[10px] p-2 mb-1.5 flex items-center gap-2 shadow-xl relative backdrop-blur-2xl border border-white/60"
           initial={{ opacity: 0, y: 30, scale: 0.9 }}
           animate={{ 
             opacity: isActive ? 1 : 0, 
             y: isActive ? 0 : isScene3(currentScene) ? -20 : 30,
             scale: isActive ? 1 : 0.95
           }}
           transition={{ delay: isActive ? 0.2 + (i * 0.15) : 0, ...springBouncy }}
        >
          <div className={`w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 ${card.iconColors}`}>
            {React.cloneElement(card.icon, { width: 10, height: 10 })}
          </div>
          <div className="flex-1">
            <div className="text-[7px] font-bold text-slate-800 mb-0.5 tracking-tight leading-none">{card.title}</div>
            <div className="text-[5.5px] text-slate-500 leading-tight pr-2">{card.desc}</div>
          </div>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-300">
             <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
             </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Helper condition for exit transition
function isScene3(scene: MockupScene) {
  return scene === "SCENE_3_DASHBOARD";
}
