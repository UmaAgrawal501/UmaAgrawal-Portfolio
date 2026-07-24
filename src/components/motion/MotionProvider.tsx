"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_DURATION, easeOutExpo } from "@/lib/motion";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Global Framer Motion config.
 * Caps duration at 250ms and honors prefers-reduced-motion.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: MOTION_DURATION, ease: easeOutExpo }}
    >
      {children}
    </MotionConfig>
  );
}
