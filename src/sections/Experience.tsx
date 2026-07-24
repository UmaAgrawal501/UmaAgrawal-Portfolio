"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TechIconPill } from "@/components/ui/TechIcon";
import {
  sectionHeadlineClassName,
  sectionLabelClassName,
} from "@/constants/sections";
import {
  getCuratedHighlights,
  getOrderedExperience,
} from "@/lib/selectors";
import { cn } from "@/lib/cn";
import type { Experience as ExperienceEntry } from "@/types";

function monogram(entry: ExperienceEntry) {
  const source = entry.company.trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

function JourneyCard({
  entry,
  side,
}: {
  entry: ExperienceEntry;
  side: "left" | "right";
}) {
  const highlights = getCuratedHighlights(entry);
  const period = `${entry.startDate} – ${entry.endDate}`;
  const isEducation = entry.kind === "education";
  const achievementsLabel = isEducation ? "Focus" : "Key Achievements";
  const skills = entry.skillsUsed ?? [];

  return (
    <article
      className={cn(
        "relative w-full rounded-[1.75rem] glass p-5 sm:p-6",
        side === "left" ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-background/70 text-[0.7rem] font-semibold tracking-wide text-accent-hover"
        >
          {monogram(entry)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[clamp(1.05rem,2.4vw,1.35rem)] font-semibold tracking-[-0.02em] text-text-primary">
            {entry.role}
          </h3>
          <p className="mt-1 type-body font-medium text-accent-hover">
            {entry.company}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 type-mono text-[0.7rem] text-text-tertiary sm:text-[0.75rem]">
        <span>{period}</span>
        {entry.location ? <span>{entry.location}</span> : null}
      </div>

      {entry.summary ? (
        <p className="type-body mt-4 text-text-secondary">{entry.summary}</p>
      ) : null}

      {highlights.length > 0 ? (
        <div className="mt-5">
          <p className="type-mono text-[0.65rem] tracking-[0.08em] text-text-tertiary uppercase">
            {achievementsLabel}
          </p>
          <ul className="mt-3 list-none space-y-2.5 p-0">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="type-body flex gap-3 text-text-secondary"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {skills.length > 0 ? (
        <div className="mt-5">
          <p className="type-mono text-[0.65rem] tracking-[0.08em] text-text-tertiary uppercase">
            {isEducation ? "Core Areas" : "Technologies Used"}
          </p>
          <ul className="mt-3 flex list-none flex-wrap gap-2.5 p-0">
            {skills.map((skill) => (
              <li key={skill} className="relative z-0 hover:z-20">
                <TechIconPill name={skill} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export function Experience() {
  const entries = getOrderedExperience();

  if (entries.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="py-20 lg:py-28"
    >
      <Container>
        <Reveal>
          <p className={sectionLabelClassName}>Journey</p>
          <h2
            id="experience-title"
            className={`${sectionHeadlineClassName} font-display mt-3`}
          >
            Professional Journey
          </h2>
          <p className="type-body mt-4 max-w-[40rem] text-text-secondary">
            Work and education that shaped how I ship AI systems.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* Center spine — desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 lg:block"
          />

          {/* Left spine — mobile */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-[0.7rem] w-px bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0 lg:hidden"
          />

          <ol className="list-none space-y-10 p-0 lg:space-y-16">
            {entries.map((entry, index) => {
              const side = index % 2 === 0 ? "left" : "right";

              return (
                <li key={entry.id} className="relative">
                  {/* Mobile node */}
                  <span
                    aria-hidden="true"
                    className="absolute top-6 left-[0.45rem] z-10 size-2.5 rounded-full border-2 border-accent bg-background lg:hidden"
                  />

                  {/* Desktop node */}
                  <span
                    aria-hidden="true"
                    className="absolute top-8 left-1/2 z-10 hidden size-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background glow-accent-sm lg:block"
                  />

                  <div className="pl-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:pl-0">
                    {side === "left" ? (
                      <>
                        <Reveal>
                          <JourneyCard entry={entry} side="left" />
                        </Reveal>
                        <div className="hidden lg:block" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:block" aria-hidden="true" />
                        <Reveal>
                          <JourneyCard entry={entry} side="right" />
                        </Reveal>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
