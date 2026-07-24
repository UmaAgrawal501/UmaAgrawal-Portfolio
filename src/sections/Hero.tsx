"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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

const PORTRAIT_CHIPS = [
  {
    label: "RAG",
    className: "top-[6%] -left-2 sm:-left-4",
    strength: 42,
    invert: false,
    floatAmp: 10,
    floatSpeed: 1.1,
    phase: 0.2,
  },
  {
    label: "AI Chatbots",
    className: "top-[8%] -right-2 sm:-right-5",
    strength: 48,
    invert: true,
    floatAmp: 12,
    floatSpeed: 0.9,
    phase: 1.1,
  },
  {
    label: "AI Automations",
    className: "bottom-[12%] -left-3 sm:-left-6",
    strength: 46,
    invert: false,
    floatAmp: 11,
    floatSpeed: 1.25,
    phase: 2.0,
  },
  {
    label: "AI Agents",
    className: "bottom-[10%] -right-2 sm:-right-5",
    strength: 40,
    invert: true,
    floatAmp: 9,
    floatSpeed: 1.05,
    phase: 2.8,
  },
] as const;

function FloatingChip({
  label,
  className,
  strength,
  invert,
  floatAmp,
  floatSpeed,
  phase,
  pointerX,
  pointerY,
  enabled,
}: {
  label: string;
  className: string;
  strength: number;
  invert: boolean;
  floatAmp: number;
  floatSpeed: number;
  phase: number;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  pointerY: ReturnType<typeof useMotionValue<number>>;
  enabled: boolean;
}) {
  const idleX = useMotionValue(0);
  const idleY = useMotionValue(0);
  const followX = useSpring(0, { stiffness: 70, damping: 14, mass: 0.55 });
  const followY = useSpring(0, { stiffness: 70, damping: 14, mass: 0.55 });

  const x = useTransform([followX, idleX], ([fx, ix]) => Number(fx) + Number(ix));
  const y = useTransform([followY, idleY], ([fy, iy]) => Number(fy) + Number(iy));

  useEffect(() => {
    if (!enabled) {
      followX.set(0);
      followY.set(0);
      idleX.set(0);
      idleY.set(0);
      return;
    }

    const dir = invert ? -1 : 1;
    const unsubX = pointerX.on("change", (value) => {
      followX.set(value * strength * dir);
    });
    const unsubY = pointerY.on("change", (value) => {
      followY.set(value * strength * 0.85 * dir);
    });

    let frame = 0;
    const tick = (time: number) => {
      const t = time / 1000;
      idleX.set(Math.sin(t * floatSpeed + phase) * floatAmp);
      idleY.set(Math.cos(t * floatSpeed * 0.85 + phase) * floatAmp * 0.75);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      unsubX();
      unsubY();
      window.cancelAnimationFrame(frame);
    };
  }, [
    enabled,
    floatAmp,
    floatSpeed,
    followX,
    followY,
    idleX,
    idleY,
    invert,
    phase,
    pointerX,
    pointerY,
    strength,
  ]);

  return (
    <motion.span
      style={{ x, y }}
      className={cn(
        "absolute z-10 rounded-full border border-accent/60 bg-background/85 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
        "font-mono text-[0.65rem] tracking-[0.04em] text-accent backdrop-blur-md will-change-transform",
        className,
      )}
    >
      {label}
    </motion.span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const portrait = about.portrait;
  const [firstName, ...restName] = site.name.split(" ");
  const lastName = restName.join(" ");
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(0, { stiffness: 55, damping: 16, mass: 0.7 });
  const imageY = useSpring(0, { stiffness: 55, damping: 16, mass: 0.7 });
  const imageRotate = useSpring(0, { stiffness: 55, damping: 16, mass: 0.7 });
  const idleImageX = useMotionValue(0);
  const composedImageX = useTransform(
    [imageX, idleImageX],
    ([ix, idle]) => Number(ix) + Number(idle),
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      imageX.set(0);
      imageY.set(0);
      imageRotate.set(0);
      idleImageX.set(0);
      return;
    }

    const unsubX = pointerX.on("change", (value) => {
      imageX.set(value * 18);
      imageRotate.set(value * 3.5);
    });
    const unsubY = pointerY.on("change", (value) => {
      imageY.set(value * 14);
    });

    let frame = 0;
    const tick = (time: number) => {
      idleImageX.set(Math.sin(time / 1000 * 0.7) * 6);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      unsubX();
      unsubY();
      window.cancelAnimationFrame(frame);
    };
  }, [idleImageX, imageRotate, imageX, imageY, pointerX, pointerY, reduceMotion]);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reduceMotion || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      // Use a wider field so movement stays responsive across the hero
      const pad = 120;
      const nx =
        ((event.clientX - (rect.left - pad)) / (rect.width + pad * 2)) * 2 - 1;
      const ny =
        ((event.clientY - (rect.top - pad)) / (rect.height + pad * 2)) * 2 - 1;
      pointerX.set(Math.max(-1, Math.min(1, nx)));
      pointerY.set(Math.max(-1, Math.min(1, ny)));
    },
    [pointerX, pointerY, reduceMotion],
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      aria-labelledby="hero-name"
      className="relative flex min-h-screen flex-col justify-center pb-24 pt-28 lg:pb-28 lg:pt-32"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div className="min-w-0 overflow-visible">
            <div className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-text-secondary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.availability ?? "Available for AI projects"}
            </div>

            <h1
              id="hero-name"
              className="font-display mt-2 overflow-visible text-5xl font-bold tracking-tight text-text-primary sm:text-6xl md:text-7xl"
            >
              <span className="block leading-tight">{firstName}</span>
              {lastName ? (
                <svg
                  className="mt-1 h-[1.2em] w-auto max-w-full overflow-visible"
                  viewBox="0 0 540 130"
                  role="img"
                  aria-label={lastName}
                >
                  <defs>
                    <linearGradient
                      id="lastname-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f4f0e9" />
                      <stop offset="45%" stopColor="#e0a95e" />
                      <stop offset="100%" stopColor="#f0bd76" />
                    </linearGradient>
                  </defs>
                  <text
                    x="4"
                    y="92"
                    fill="url(#lastname-gradient)"
                    fontFamily="var(--font-syne), Syne, ui-sans-serif, sans-serif"
                    fontSize="88"
                    fontWeight="700"
                    letterSpacing="-1.2"
                  >
                    {lastName}
                  </text>
                </svg>
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
                <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </div>

          <div
            ref={stageRef}
            className="relative mx-auto w-full max-w-[17rem] overflow-visible sm:max-w-[19rem] lg:max-w-[21rem]"
          >
            <div
              className="absolute inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(224,169,94,0.38),transparent_70%)] blur-2xl"
              aria-hidden="true"
            />

            <div className="relative aspect-[12/16] w-full overflow-visible">
              <motion.div
                style={{ x: composedImageX, y: imageY, rotate: imageRotate }}
                className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-accent/30 bg-[#161210] shadow-[0_0_0_1px_rgba(224,169,94,0.1)] will-change-transform"
              >
                {portrait ? (
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 17rem, 19rem"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-text-primary">
                    {firstName?.[0]}
                    {lastName?.[0]}
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/10"
                  aria-hidden="true"
                />
              </motion.div>

              {PORTRAIT_CHIPS.map((chip) => (
                <FloatingChip
                  key={chip.label}
                  label={chip.label}
                  className={chip.className}
                  strength={chip.strength}
                  invert={chip.invert}
                  floatAmp={chip.floatAmp}
                  floatSpeed={chip.floatSpeed}
                  phase={chip.phase}
                  pointerX={pointerX}
                  pointerY={pointerY}
                  enabled={!reduceMotion}
                />
              ))}
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
          <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase">
            Scroll
          </span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-border p-1">
            <span className="mt-1 size-1 animate-float rounded-full bg-accent" />
          </span>
        </a>
      </Container>
    </section>
  );
}
