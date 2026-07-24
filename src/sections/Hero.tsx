"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { getContactLinks } from "@/lib/selectors";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export function Hero() {
  const firstName = site.name.split(" ")[0] ?? site.name;
  const fullLine = `Hello, I'm ${firstName}`;
  const reduceMotion = useReducedMotion();
  const [charCount, setCharCount] = useState(0);
  const links = getContactLinks().filter((link) => link.id !== "resume");
  const portrait = about.portrait;

  useEffect(() => {
    if (reduceMotion) return;

    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setCharCount(index);
      if (index >= fullLine.length) {
        window.clearInterval(id);
      }
    }, 55);

    return () => window.clearInterval(id);
  }, [fullLine, reduceMotion]);

  const typed = reduceMotion ? fullLine : fullLine.slice(0, charCount);

  return (
    <section
      aria-labelledby="hero-name"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center pb-16 pt-10 lg:min-h-[calc(100vh-4.5rem)] lg:pb-24 lg:pt-16"
    >
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="min-w-0">
            <h1
              id="hero-name"
              className="text-[clamp(2.5rem,7vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.03em]"
            >
              <span className="text-gradient-hero">{typed}</span>
              <span
                aria-hidden="true"
                className="caret-blink ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] bg-accent align-middle"
              />
            </h1>

            <p className="mt-5 text-xl font-medium text-text-primary sm:text-2xl">
              {site.role}
            </p>

            <p className="mt-6 max-w-[36rem] text-[1.05rem] leading-8 text-text-secondary sm:text-[1.125rem]">
              {site.tagline}
            </p>

            <div className="mt-10">
              <Button
                href="/resume.pdf"
                download="Uma-Agrawal-Resume.pdf"
                size="lg"
                className="btn-glow gap-2.5 px-7"
              >
                <SocialIcon name="resume" className="size-4 text-white" />
                {site.primaryCtaLabel ?? "Download Resume"}
              </Button>
            </div>

            {links.length > 0 ? (
              <ul className="mt-8 flex list-none flex-wrap items-center gap-3 p-0">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-label={link.label}
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full border border-border-strong text-text-secondary no-underline",
                        "transition-[color,border-color,box-shadow] duration-200 hover:border-accent hover:text-accent-hover hover:glow-accent",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                      )}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <SocialIcon name={link.icon ?? link.id} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="relative mx-auto flex w-full max-w-[22rem] justify-center lg:max-w-[26rem]">
            <div
              className="absolute inset-[8%] rounded-full bg-accent/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-full portrait-ring">
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
                <div className="flex h-full w-full items-center justify-center bg-surface-raised text-5xl font-semibold text-text-primary">
                  {site.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
