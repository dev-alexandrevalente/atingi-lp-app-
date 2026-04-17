"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    // Only run on the client
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "-40px 0px" }
    );

    // Initial observation
    const elements = document.querySelectorAll(".reveal, .reveal-scale");
    elements.forEach((el) => observer.observe(el));

    // Setup a MutationObserver to watch for new dynamic content (like V1 rendering after quiz)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            const el = node as HTMLElement;
            if (el.matches && (el.matches(".reveal") || el.matches(".reveal-scale"))) {
              observer.observe(el);
            }
            if (el.querySelectorAll) {
              el.querySelectorAll(".reveal, .reveal-scale").forEach((child) => observer.observe(child));
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
