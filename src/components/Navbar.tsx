"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GlobalCTA from "./ui/GlobalCTA";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Teste Grátis", href: "#teste-gratis" },
  { label: "Gamificação", href: "#gamificacao" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ onCTA }: { onCTA: (source: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-[10px] left-3 right-3 md:left-[52px] md:right-[52px] z-50 h-[49px] animate-fade-in-up"
        style={{ animationDuration: "0.4s" }}
      >
        <div className="h-full bg-white/95 md:bg-white/80 md:backdrop-blur-xl rounded-full border border-white/60 shadow-[0_4px_12px_rgba(204,219,235,0.1)] md:shadow-[0_0.6px_0.6px_rgba(204,219,235,0.11),0_2.3px_2.3px_rgba(204,219,235,0.11),0_10px_10px_rgba(204,219,235,0.11)] flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src={`/atingi-fnofd-0001-demo-mads-${process.env.NEXT_PUBLIC_FUNNEL_VERSION || 'v1'}/Marca_Principal.png`} alt="Atingi" className="h-6 md:h-7 w-auto object-contain" draggable={false} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-muted hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <GlobalCTA text="Começar Teste Grátis" onClick={() => onCTA('navbar_desktop_cta')} className="!px-6 !py-2.5 !text-[13px]" />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <motion.span
              className="block w-5 h-[2px] bg-slate-700 rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[2px] bg-slate-700 rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.span
              className="block w-5 h-[2px] bg-slate-700 rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-[70px] px-4 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/60 md:bg-black/20 md:backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-1"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-[15px] font-medium text-slate-700 py-3 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="border-t border-slate-100 mt-2 pt-3 flex justify-center">
                <GlobalCTA text="Começar Teste Grátis" onClick={() => { onCTA('navbar_cta'); setMobileOpen(false); }} className="w-full !py-3.5 !text-[14px]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
