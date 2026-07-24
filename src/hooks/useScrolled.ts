"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 12;

/** True after the page has scrolled past a small threshold. */
export function useScrolled(threshold = SCROLL_THRESHOLD_PX): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > threshold);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
