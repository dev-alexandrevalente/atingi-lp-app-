import React from "react";
import { motion } from "framer-motion";

export default function ComputerMockup() {
  return (
    <div className="absolute inset-0 bg-[#f8fafc] rounded-t-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[6px] border-white overflow-hidden flex flex-col">
      {/* Laptop Top Bezel fake shadow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/5 z-20"></div>

      {/* Top Header */}
      <div className="w-full h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-4 z-10 shrink-0">
        <div className="flex gap-1.5 opacity-50">
           <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
        </div>
        <div className="w-48 h-5 bg-slate-100 rounded-md border border-slate-200 flex items-center px-2 shadow-inner">
           <div className="w-3 h-3 rounded-full bg-slate-300"></div>
        </div>
        <div className="ml-auto w-6 h-6 rounded-full bg-slate-200"></div>
      </div>

      <div className="flex-1 flex bg-[#f8fafc] overflow-hidden">
        {/* Sidebar */}
        <div className="w-[20%] h-full bg-white border-r border-slate-200 flex flex-col p-3 gap-3">
          <div className="w-full h-6 bg-[#02CE37]/10 rounded border border-[#02CE37]/20 flex items-center px-2">
             <div className="w-3 h-3 rounded-sm bg-[#02CE37]/40"></div>
             <div className="w-12 h-2 ml-2 bg-[#02CE37]/40 rounded-sm"></div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2 px-1">
                 <div className="w-3 h-3 rounded-sm bg-slate-200"></div>
                 <div className="w-16 h-2 bg-slate-200 rounded-sm"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-5 flex flex-col gap-4">
           {/* Top Stats Cards */}
           <div className="flex w-full gap-3 h-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm p-2 flex flex-col justify-center">
                   <div className="w-10 h-2 bg-slate-200 rounded mb-2"></div>
                   <div className="w-16 h-4 bg-slate-800 rounded"></div>
                </div>
              ))}
           </div>

           {/* Main Chart Area */}
           <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col">
              <div className="w-20 h-3 bg-slate-800 rounded mb-4"></div>
              
              {/* Fake Bar Chart */}
              <div className="flex-1 border-b border-l border-slate-200 flex items-end justify-between px-4 pt-4 gap-2">
                 {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                    <div key={i} className="w-full bg-[#02CE37]/10 rounded-t-sm relative group flex items-end justify-center" style={{ height: '100%' }}>
                       <motion.div 
                         className="w-full bg-[#02CE37] rounded-t-md shadow-[0_0_10px_rgba(2,206,55,0.2)]"
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + (i * 0.1) }}
                       ></motion.div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
