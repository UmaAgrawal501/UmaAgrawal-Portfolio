"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { navigation } from "@/constants/navigation";
import {
  sectionHeadlineClassName,
  sectionLabelClassName,
} from "@/constants/sections";
import { about } from "@/data/about";
import { getOrderedPrinciples } from "@/lib/selectors";

const aboutLabel =
  navigation.find((item) => item.id === "about")?.label ?? "About";

export function About() {
  const paragraphs = about.paragraphs ?? [];
  const principles = getOrderedPrinciples();

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
            className={`${sectionHeadlineClassName} font-display mt-3 max-w-[42rem]`}
          >
            {about.headline}
          </h2>
          <p className="type-body-lg mt-6 max-w-[40rem] leading-8 text-text-secondary">
            {about.body}
          </p>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="type-body mt-4 max-w-[40rem] leading-7 text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        {principles.length > 0 ? (
          <div className="mt-14">
            <Reveal>
              <p className={sectionLabelClassName}>Principles</p>
            </Reveal>
            <ul className="mt-6 grid list-none gap-4 p-0 md:grid-cols-3">
              {principles.map((principle, index) => (
                <li key={principle.id}>
                  <Reveal delay={index * 0.04}>
                    <article className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-border-strong md:p-7">
                      <p className="font-mono text-sm text-accent/70">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display mt-4 text-xl font-bold text-text-primary">
                        {principle.title}
                      </h3>
                      <p className="type-body mt-3 text-text-secondary">
                        {principle.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
