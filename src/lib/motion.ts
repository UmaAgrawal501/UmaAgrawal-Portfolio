import type { Transition, Variants } from "framer-motion";

/** Shared easing — motion audit locked */
export const easeOutExpo: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Hard cap: ≤250ms sitewide */
export const MOTION_DURATION = 0.25;

export const transitionFast: Transition = {
  duration: 0.15,
  ease: easeOutExpo,
};

export const transitionBase: Transition = {
  duration: 0.2,
  ease: easeOutExpo,
};

export const transitionEnter: Transition = {
  duration: MOTION_DURATION,
  ease: easeOutExpo,
};

/** Sections — opacity + translateY(12) only */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionEnter,
  },
};

/** Hero / reduced-motion — opacity only */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionEnter,
  },
};

/** Optional short stagger — each child still ≤250ms */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
};

export const staggerItem: Variants = fadeUp;
