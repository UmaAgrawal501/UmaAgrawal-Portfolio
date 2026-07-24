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

export function About() {
  const paragraphs = about.paragraphs ?? [];

  if (!about.headline || !about.body) {
    return null;
  }

  return (
    <section id="about" aria-labelledby="about-headline" className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <Reveal>
            <p className={sectionLabelClassName}>{aboutLabel}</p>
            <h2 id="about-headline" className={`${sectionHeadlineClassName} mt-3`}>
              {about.headline}
            </h2>
          </Reveal>

          <Reveal>
            <div className="max-w-[40rem] space-y-6 rounded-2xl border border-border/80 bg-surface/50 p-6 sm:p-8">
              <p className="type-body-lg leading-8 text-text-secondary">
                {about.body}
              </p>
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="type-body leading-7 text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
