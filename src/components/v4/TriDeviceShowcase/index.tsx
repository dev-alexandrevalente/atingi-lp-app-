"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ComputerMockup from "./ComputerMockup";
import TabletMockup from "./TabletMockup";
import MobileMockup from "./MobileMockup";

export default function TriDeviceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Floating animations for the devices
  const floatComputer = {
    animate: { y: [0, -8, 0] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const }
  };
  const floatTablet = {
    animate: { y: [0, -10, 0] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }
  };
  const floatMobile = {
    animate: { y: [0, -12, 0] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[800px] aspect-[4/3] lg:aspect-[16/10] flex items-center justify-center z-10 mx-auto perspective-1000 mt-10"
    >
      <div className="relative w-full h-full transform-style-3d">
        
        {/* =========================================
            COMPUTER (Back Center)
        ========================================= */}
        <motion.div
           className="absolute top-[5%] left-[10%] right-[10%] bottom-[15%] z-10"
           initial={{ opacity: 0, y: 40, rotateX: 10 }}
           animate={{ 
             opacity: isInView ? 1 : 0, 
             y: isInView ? floatComputer.animate.y : 40, 
             rotateX: isInView ? 0 : 10 
           }}
           transition={{ 
             opacity: { duration: 1, ease: 'easeOut' },
             rotateX: { duration: 1, ease: 'easeOut' },
             y: floatComputer.transition 
           }}
        >
          <ComputerMockup />
        </motion.div>

        {/* =========================================
            TABLET (Front Right)
        ========================================= */}
        <motion.div
           className="absolute bottom-[5%] right-[2%] w-[38%] aspect-[3/4] z-20"
           initial={{ opacity: 0, x: 30, y: 30 }}
           animate={{ 
             opacity: isInView ? 1 : 0, 
             x: isInView ? 0 : 30, 
             y: isInView ? floatTablet.animate.y : 30 
           }}
           transition={{ 
             opacity: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
             x: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
             y: floatTablet.transition 
           }}
        >
          <TabletMockup />
        </motion.div>

        {/* =========================================
            MOBILE (Front Left) -> Runs the 3 Scenes
        ========================================= */}
        <motion.div
           className="absolute bottom-[-2%] left-[8%] w-[24%] aspect-[9/19] z-30"
           initial={{ opacity: 0, x: -30, y: 40 }}
           animate={{ 
             opacity: isInView ? 1 : 0, 
             x: isInView ? 0 : -30, 
             y: isInView ? floatMobile.animate.y : 40 
           }}
           transition={{ 
             opacity: { duration: 0.8, delay: 0.5, ease: 'easeOut' },
             x: { duration: 0.8, delay: 0.5, ease: 'easeOut' },
             y: floatMobile.transition 
           }}
        >
          <MobileMockup />
        </motion.div>

      </div>
    </div>
  );
}
