"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import {
  sectionHeadlineClassName,
  sectionLabelClassName,
  sectionLabels,
} from "@/constants/sections";
import { getOrderedPrinciples } from "@/lib/selectors";

export function EngineeringPrinciples() {
  const items = getOrderedPrinciples();
  const label = sectionLabels.principles;

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="py-20 lg:py-28"
    >
      <Container>
        <Reveal>
          <p className={sectionLabelClassName}>{label}</p>
          <h2 id="principles-title" className={`${sectionHeadlineClassName} mt-3`}>
            How I work
          </h2>
        </Reveal>

        <ol className="mt-12 grid list-none gap-4 p-0 sm:grid-cols-2">
          {items.map((principle, index) => (
            <li key={principle.id}>
              <Reveal>
                <article className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-border-strong">
                  <p className="font-mono text-sm text-accent/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-3 text-xl font-bold text-text-primary">
                    {principle.title}
                  </h3>
                  <p className="type-body mt-3 text-text-secondary">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
