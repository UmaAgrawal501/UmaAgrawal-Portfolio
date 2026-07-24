"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Prefers the platform reduced-motion setting.
 * Returns true when motion should be minimized.
 */
export function useReducedMotion(): boolean {
  return Boolean(useFramerReducedMotion());
}
