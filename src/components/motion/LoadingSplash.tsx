"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const monogram =
  site.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "UA";

export function LoadingSplash() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(reduceMotion ? 100 : 0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      const t = window.setTimeout(() => setDone(true), 200);
      return () => window.clearTimeout(t);
    }

    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      setProgress((prev) => {
        const next = Math.min(100, prev + (frame < 8 ? 7 : frame < 16 ? 4 : 2));
        if (next >= 100) {
          window.clearInterval(id);
          window.setTimeout(() => setDone(true), 280);
        }
        return next;
      });
    }, 40);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden={done}
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 cosmos-bg" />
          <div className="relative flex flex-col items-center">
            <motion.div
              className="font-display text-6xl font-bold tracking-tight md:text-8xl"
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="gradient-text">{monogram}</span>
              <span className="text-accent">.</span>
            </motion.div>
            <motion.p
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-text-tertiary"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              {site.role}
            </motion.p>
          </div>

          <div className="absolute bottom-16 left-1/2 w-64 -translate-x-1/2">
            <div className="mb-3 flex items-end justify-between font-mono text-xs text-text-tertiary">
              <span>Loading</span>
              <span className="tabular-nums text-accent-hover">{progress}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-border">
              <div
                className="h-full origin-left bg-gradient-to-r from-accent-muted via-accent to-accent-hover transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
