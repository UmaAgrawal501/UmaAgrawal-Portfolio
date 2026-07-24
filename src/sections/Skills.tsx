"use client";

import { useState, type ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { sectionHeadlineClassName } from "@/constants/sections";
import { techStack } from "@/data/tech-stack";
import { cn } from "@/lib/cn";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  programming: (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "ai-genai": (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 9h8M8 13h5M7 5h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4 3v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "backend-apis": (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
      <circle cx="18" cy="17" r="2.2" />
    </svg>
  ),
  "ai-integrations": (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  databases: (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" strokeLinecap="round" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17v3h3l5.1-5.1a4 4 0 0 0 5.6-5.6l-2.2 2.2-2.8-2.8 2.2-2.2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function CategoryIcon({ id, active }: { id: string; active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
        active
          ? "bg-accent text-text-inverse"
          : "bg-surface text-text-secondary group-hover:text-text-primary",
      )}
    >
      {CATEGORY_ICONS[id] ?? CATEGORY_ICONS.tools}
    </span>
  );
}

export function Skills() {
  const categories = [...techStack].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  );
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active =
    categories.find((category) => category.id === activeId) ?? categories[0];

  if (categories.length === 0 || !active) {
    return null;
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-accent/70 sm:w-12" aria-hidden="true" />
            <p className="font-mono text-[0.7rem] tracking-[0.22em] text-accent uppercase sm:text-[0.75rem]">
              Toolkit
            </p>
            <span className="h-px w-8 bg-accent/70 sm:w-12" aria-hidden="true" />
          </div>
          <h2
            id="skills-title"
            className={`${sectionHeadlineClassName} font-display mt-4 text-center`}
          >
            The stack behind the systems
          </h2>
          <p className="type-body mx-auto mt-4 max-w-[40rem] text-center text-text-secondary">
            The models, frameworks, and infrastructure I reach for when building
            production AI.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] lg:gap-6">
          <Reveal>
            <ul className="flex list-none flex-col gap-3 p-0" role="tablist" aria-label="Skill categories">
              {categories.map((category) => {
                const selected = category.id === active.id;
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveId(category.id)}
                      className={cn(
                        "group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,box-shadow] duration-200",
                        selected
                          ? "border-border-strong bg-surface/90 shadow-sm"
                          : "border-border/70 bg-transparent hover:border-border-strong hover:bg-surface/40",
                      )}
                    >
                      <CategoryIcon id={category.id} active={selected} />
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-base font-semibold text-text-primary sm:text-lg">
                          {category.title}
                        </span>
                        <span className="mt-0.5 block font-mono text-[0.7rem] text-text-tertiary">
                          {category.items.length} technologies
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal>
            <div
              role="tabpanel"
              className="glass relative min-h-[18rem] overflow-hidden rounded-[1.75rem] p-6 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 opacity-40 cosmos-bg" aria-hidden="true" />
              <div className="relative">
                <p className="font-mono text-[0.7rem] tracking-[0.14em] text-accent uppercase">
                  {active.title}
                </p>
                <ul className="mt-6 flex list-none flex-wrap gap-3 p-0">
                  {active.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/50 px-3.5 py-2 text-sm text-text-primary"
                    >
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
