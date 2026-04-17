import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TabletMockup() {
  const [swapped, setSwapped] = useState(false);

  // Auto-swap rows to simulate a live leaderboard changing places
  useEffect(() => {
    const interval = setInterval(() => {
      setSwapped((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { id: 1, name: "Equipe Alpha", value: "24k" },
    { id: 2, name: "Equipe Beta", value: "18k" },
    { id: 3, name: "Equipe Gamma", value: "14k" },
    { id: 4, name: "Equipe Delta", value: "9k" },
  ];

  // Reorder items if swapped is true (Alpha and Beta trade places)
  const displayItems = swapped 
    ? [items[1], items[0], items[2], items[3]] 
    : items;

  return (
    <div className="absolute inset-0 bg-[#f1f5f9] border-[5px] border-white rounded-[24px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
       {/* iPad Top Bezel fake shadow */}
       <div className="absolute top-0 left-0 right-0 h-1 bg-black/5 z-20"></div>

       <div className="w-full h-8 bg-white flex items-center justify-between px-4 border-b border-slate-200">
         <div className="text-[10px] text-slate-800 font-bold">Leaderboard</div>
         <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
       </div>

       <div className="flex-1 p-3 flex flex-col gap-2">
         {displayItems.map((item, index) => (
            <motion.div 
               layout
               key={item.id}
               transition={{ type: "spring", stiffness: 60, damping: 14 }}
               className={`w-full h-10 rounded-lg flex items-center px-2 shadow-sm border ${
                 index === 0 ? "bg-white border-[#f59e0b]/30 shadow-[#f59e0b]/10" : "bg-white border-slate-100"
               }`}
            >
               {/* Avatar */}
               <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold text-white ${
                 index === 0 ? "bg-gradient-to-tr from-[#f59e0b] to-[#fbbf24]" : "bg-slate-300"
               }`}>
                 {item.name.charAt(7)}
               </div>
               
               <div className="ml-2 flex-1">
                 <div className="text-[9px] font-bold text-slate-800">{item.name}</div>
                 <div className="text-[7px] text-slate-400">Vendas do Mês</div>
               </div>

               <div className={`text-[10px] font-bold ${index === 0 ? "text-[#f59e0b]" : "text-slate-600"}`}>
                 {item.value}
               </div>
            </motion.div>
         ))}
       </div>
    </div>
  );
}
