"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export default function LazySection({ children, minHeight = "400px" }: { children: ReactNode, minHeight?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Quando entrar a 400px do grid, ativa
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { rootMargin: "400px", threshold: 0.01 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    // Safety fallback: always mount after 3 seconds anyway to prevent empty page bugs
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : minHeight }}>
      {isVisible && children}
    </div>
  );
}
