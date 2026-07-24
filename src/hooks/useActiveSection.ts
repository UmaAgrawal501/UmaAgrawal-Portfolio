"use client";

import { useEffect, useState } from "react";
import { navigation } from "@/constants/navigation";

/**
 * Tracks which primary section is in view for quiet active nav states.
 * Returns null near the top (hero) so no link is forced active.
 */
export function useActiveSection(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = navigation.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
          return;
        }

        if (window.scrollY < 80) {
          setActiveId(null);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return activeId;
}
