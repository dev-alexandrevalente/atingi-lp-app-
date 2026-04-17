/**
 * useScrollReveal — lightweight IntersectionObserver hook
 * Replaces framer-motion whileInView for static sections.
 * 
 * Usage:
 *   const sectionRef = useScrollReveal<HTMLElement>();
 *   return <section ref={sectionRef}>
 *     <div className="reveal">...</div>
 *     <div className="reveal reveal-d1">...</div>  // staggered delay
 *   </section>
 * 
 * All children with className="reveal" or "reveal-scale" will
 * receive ".is-visible" when the section scrolls into view.
 */
"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll<HTMLElement>(".reveal, .reveal-scale");
    
    // If already visible (e.g. SSR pre-rendered above fold), skip
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "-40px 0px", ...options }
    );

    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}
