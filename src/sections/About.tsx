"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { navigation } from "@/constants/navigation";
import {
  sectionHeadlineClassName,
  sectionLabelClassName,
} from "@/constants/sections";
import { about } from "@/data/about";

const aboutLabel =
  navigation.find((item) => item.id === "about")?.label ?? "About";

const PILLARS = [
  {
    id: "production",
    title: "Production-first",
    description:
      "Systems built to ship — observable, resilient, and grounded in real workflows.",
  },
  {
    id: "retrieval",
    title: "Retrieval-grounded",
    description:
      "RAG and vector search so answers stay accurate, current, and trustworthy.",
  },
  {
    id: "agents",
    title: "Agentic by design",
    description:
      "Tools, memory, and multi-step reasoning that get real work done.",
  },
] as const;

export function About() {
  const paragraphs = about.paragraphs ?? [];

  if (!about.headline || !about.body) {
    return null;
  }

  return (
    <section id="about" aria-labelledby="about-headline" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <p className={sectionLabelClassName}>{aboutLabel}</p>
          <h2
            id="about-headline"
            className={`${sectionHeadlineClassName} font-display mt-3 max-w-[40rem]`}
          >
            {about.headline}
          </h2>
          <p className="type-body-lg mt-6 max-w-[40rem] leading-8 text-text-secondary">
            {about.body}
          </p>
          {paragraphs.slice(0, 1).map((paragraph) => (
            <p
              key={paragraph}
              className="type-body mt-4 max-w-[40rem] leading-7 text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <ul className="mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <li key={pillar.id}>
              <Reveal delay={index * 0.04}>
                <article className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-border-strong md:p-7">
                  <p className="font-mono text-sm text-accent/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-4 text-xl font-bold text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="type-body mt-3 text-text-secondary">
                    {pillar.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
