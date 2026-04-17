"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { MockupScene } from "./variants";
import Scene1Lockscreen from "./Scene1Lockscreen";
import Scene2Notifications from "./Scene2Notifications";
import Scene3Dashboard from "./Scene3Dashboard";

export default function MobileShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [currentScene, setCurrentScene] = useState<MockupScene>("SCENE_1_LOCKSCREEN");

  // Timeline Orchestration for the Single Phone
  useEffect(() => {
    if (!isInView) return;

    // Start with Scene 1 (0s - 3s)
    setCurrentScene("SCENE_1_LOCKSCREEN");

    // Enter Scene 2 (3s - 6s)
    const t1 = setTimeout(() => {
      setCurrentScene("SCENE_2_NOTIFICATIONS");
    }, 3000);

    // Enter Scene 3 (6s+)
    const t2 = setTimeout(() => {
      setCurrentScene("SCENE_3_DASHBOARD");
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[320px] lg:max-w-[360px] aspect-[9/19] flex items-center justify-center z-10 mx-auto perspective-1000"
    >
      {/* 
        The Phone Hardware Frame 
        Light aesthetics, silver/white borders, crisp neumorphic shadows
      */}
      <div className="relative w-full h-full bg-[#f8fafc] rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.1),_inset_0_0_0_10px_#ffffff,_inset_0_0_0_12px_#e2e8f0] overflow-hidden border border-slate-200">
        
        {/* Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[28px] bg-white border-b border-l border-r border-slate-200 rounded-b-[18px] z-50 flex items-center justify-center gap-2">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div>
        </div>

        {/* Side physical buttons */}
        <div className="absolute -left-1 top-[120px] w-1 h-12 bg-slate-200 rounded-l-md"></div>
        <div className="absolute -left-1 top-[180px] w-1 h-16 bg-slate-200 rounded-l-md"></div>
        <div className="absolute -right-1 top-[150px] w-1 h-20 bg-slate-200 rounded-r-md"></div>

        {/* The Screen (where scenes happen) */}
        <div className="absolute inset-[12px] bg-white rounded-[28px] overflow-hidden">
           <Scene1Lockscreen currentScene={currentScene} />
           <Scene2Notifications currentScene={currentScene} />
           <Scene3Dashboard currentScene={currentScene} />
           
           {/* iOS Home Indicator */}
           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-[4px] bg-slate-300 rounded-full z-50"></div>
        </div>
        
      </div>

    </div>
  );
}
