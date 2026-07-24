"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Sitewide teal cursor — follows the pointer and expands on interactive targets.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 420, damping: 32, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'a, button, [role="button"], [role="tab"], input, textarea, select, label, summary, [data-cursor="hover"]',
        ),
      );
    };

    const onMove = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
      setHovering(isInteractive(event.target));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY, reduceMotion]);

  if (reduceMotion || !enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ x, y }}
    >
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full border border-accent/70 bg-accent/15 shadow-[0_0_20px_rgb(127_199_196_/_0.35)] transition-[width,height,background-color,border-color] duration-200",
          hovering ? "size-12 border-accent bg-accent/25" : "size-8",
        )}
      >
        <span className="size-1.5 rounded-full bg-accent" />
      </span>
    </motion.div>
  );
}
