"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import {
  sectionHeadlineClassName,
  sectionLabelClassName,
  sectionLabels,
} from "@/constants/sections";
import { techStack } from "@/data/tech-stack";

export function Skills() {
  const categories = [...techStack].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  );
  const label = sectionLabels.skills;

  if (categories.length === 0) {
    return null;
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <p className={sectionLabelClassName}>{label}</p>
          <h2 id="skills-title" className={`${sectionHeadlineClassName} mt-3`}>
            Technical Expertise
          </h2>
          <p className="type-body mt-4 max-w-[40rem] text-text-secondary">
            Tools I use to ship AI systems and reliable backends.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Reveal key={category.id}>
              <article className="h-full overflow-visible rounded-2xl border border-border/80 bg-surface/60 p-6 shadow-sm">
                <h3 className="type-h3 text-accent-hover">{category.title}</h3>
                <ul className="mt-5 flex list-none flex-wrap gap-3 p-0">
                  {category.items.map((item) => (
                    <li key={item.name} className="group relative z-0 hover:z-20 focus-within:z-20">
                      <button
                        type="button"
                        aria-label={item.name}
                        className="inline-flex size-11 cursor-default items-center justify-center rounded-xl border border-border-strong bg-background/60 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:glow-accent focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:glow-accent focus-visible:outline-none"
                      >
                        <TechIcon name={item.name} />
                      </button>
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute top-[calc(100%+0.4rem)] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface-raised px-2.5 py-1 text-[0.7rem] font-medium text-text-primary opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
