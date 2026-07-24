"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const ROTATING_TITLES = [
  "AI Engineer",
  "LLM Engineer",
  "AI Agent Developer",
] as const;

const CAPABILITY_CHIPS = ["RAG", "AI Agents", "LangChain", "FastAPI"] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const portrait = about.portrait;
  const [firstName, ...restName] = site.name.split(" ");
  const lastName = restName.join(" ");

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      aria-labelledby="hero-name"
      className="relative flex min-h-screen flex-col justify-center pb-24 pt-28 lg:pb-28 lg:pt-32"
    >
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="min-w-0">
            <div className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-text-secondary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.availability ?? "Available for AI projects"}
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-tertiary">
              #
            </p>

            <h1
              id="hero-name"
              className="font-display mt-2 text-5xl font-bold leading-[0.95] tracking-tight text-text-primary sm:text-6xl md:text-7xl"
            >
              <span className="block">{firstName}</span>
              {lastName ? (
                <span className="gradient-text block">{lastName}</span>
              ) : null}
            </h1>

            <p className="mt-6 text-xl text-text-secondary sm:text-2xl">
              I&apos;m an{" "}
              <span className="relative inline-flex min-w-[12ch] align-bottom font-semibold text-accent-hover">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_TITLES[titleIndex]}
                    className="inline-block"
                    initial={reduceMotion ? false : { y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: -12, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ROTATING_TITLES[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>

            <p className="mt-6 max-w-[36rem] text-[1.05rem] leading-8 text-text-secondary sm:text-[1.125rem]">
              {site.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#work" size="lg" className="btn-glow px-7">
                View My Work
              </Button>
              <Button
                href="#contact"
                size="lg"
                variant="secondary"
                className="px-7"
              >
                Let&apos;s Talk
              </Button>
            </div>

            <ul className="mt-8 flex list-none flex-wrap gap-2 p-0">
              {CAPABILITY_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="glass rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] tracking-wide text-text-secondary"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto flex w-full max-w-[22rem] justify-center lg:max-w-[26rem]">
            <div
              className="absolute inset-0 -z-10 scale-95 rounded-[2rem] bg-[radial-gradient(circle_at_50%_30%,rgba(224,169,94,0.35),transparent_65%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border/80 bg-surface">
              <div className="absolute inset-0 animate-pulse-glow rounded-[2rem] bg-accent/10" />
              {portrait ? (
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 22rem, 26rem"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-raised font-display text-5xl font-bold text-text-primary">
                  {firstName?.[0]}
                  {lastName?.[0]}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-text-inverse">
                <span className="size-1.5 rounded-full bg-text-inverse" />
                Open to Work
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className={cn(
            "absolute bottom-0 left-1/2 mt-16 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-tertiary no-underline transition-colors hover:text-accent md:flex",
          )}
          aria-label="Scroll to about"
        >
          <span className="flex h-9 w-5 justify-center rounded-full border border-border p-1">
            <span className="mt-1 size-1 animate-float rounded-full bg-accent" />
          </span>
        </a>
      </Container>
    </section>
  );
}
