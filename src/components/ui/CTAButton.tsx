"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  showDot?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function CTAButton({
  children,
  variant = "primary",
  size = "medium",
  showDot = false,
  className = "",
  onClick,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-[6px] font-semibold rounded-full transition-all cursor-pointer select-none whitespace-nowrap";

  const sizes = {
    small: "text-[12px] h-[34px] px-4",
    medium: "text-[13px] h-[40px] px-5",
    large: "text-[14px] h-[46px] px-7",
  };

  const variants = {
    primary:
      "bg-brand text-white hover:brightness-110 shadow-[0_1px_3px_rgba(2,206,55,0.25)]",
    outline:
      "bg-white text-ink border border-black/[0.08] hover:border-black/15 shadow-sm",
    ghost: "bg-transparent text-muted hover:text-ink",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {showDot && (
        <span className="flex items-center justify-center w-[28px] h-[28px] rounded-full bg-white/15">
          <span
            className="w-[6px] h-[6px] rounded-full bg-white"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
        </span>
      )}
    </motion.button>
  );
}
