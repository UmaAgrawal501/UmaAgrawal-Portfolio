"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { navigation } from "@/constants/navigation";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { cn } from "@/lib/cn";

const contactInvite =
  "Have an AI agent, RAG system, or chatbot in mind? I'm open to freelance and full-time work — let's talk.";

const linkedIn = socials.find((link) => link.id === "linkedin");
const github = socials.find((link) => link.id === "github");

const linkedInHandle = linkedIn?.href
  ? linkedIn.href.replace(/^https?:\/\/(www\.)?linkedin\.com\//i, "")
  : "in/uma-agrawal";

function ContactDetail({
  href,
  icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group flex min-w-0 flex-1 items-start gap-3 rounded-2xl border border-border/80 bg-background/40 px-4 py-3.5 no-underline",
        "transition-[border-color,background-color] duration-200 hover:border-accent/45 hover:bg-surface-raised/60",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="mt-0.5 text-accent">
        <SocialIcon name={icon} className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-text-tertiary uppercase">
          {label}
        </span>
        <span className="mt-1 block truncate text-[0.875rem] font-medium text-text-primary transition-colors group-hover:text-accent">
          {value}
        </span>
      </span>
    </a>
  );
}

export function Contact() {
  const headline = site.contactHeadline;
  const initials = site.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  if (!headline) {
    return null;
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-headline"
      className="pb-10 pt-20 lg:pb-12 lg:pt-28"
    >
      <Container>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] border border-border/80 px-6 py-10 shadow-md sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(127,199,196,0.14),transparent_40%),linear-gradient(120deg,rgba(127,199,196,0.08),transparent_45%)]"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
                Contact
              </p>

              <h2
                id="contact-headline"
                className="font-display mt-5 max-w-[20ch] text-[clamp(1.85rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary"
              >
                {headline}
              </h2>

              <p className="type-body mt-5 max-w-[36rem] leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8">
                {contactInvite}
              </p>

              <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <Button
                  href={`mailto:${site.email}`}
                  size="lg"
                  className="btn-glow w-fit px-7"
                >
                  Start a conversation
                  <span aria-hidden="true">↗</span>
                </Button>

                <div className="relative flex w-full max-w-[34rem] flex-col gap-3 sm:flex-row">
                  <span
                    aria-hidden="true"
                    className="absolute -top-5 right-4 hidden size-2 rounded-full bg-accent shadow-[0_0_18px_rgba(127,199,196,0.85)] sm:block"
                  />
                  <ContactDetail
                    href={`mailto:${site.email}`}
                    icon="email"
                    label="Email"
                    value={site.email}
                  />
                  {linkedIn ? (
                    <ContactDetail
                      href={linkedIn.href}
                      icon="linkedin"
                      label="LinkedIn"
                      value={linkedInHandle}
                      external
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <footer className="mt-14 border-t border-border/60 pt-10 pb-6 sm:mt-16">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-[24rem]">
                <p className="font-display text-2xl font-bold tracking-tight text-text-primary">
                  {initials}.
                </p>
                <p className="mt-3 text-[0.9375rem] leading-7 text-text-secondary">
                  AI Engineer building agents, RAG systems, and intelligent
                  applications.
                </p>
              </div>

              <div className="flex flex-col items-start gap-5 lg:items-end">
                <ul className="flex list-none items-center gap-2.5 p-0">
                  {linkedIn ? (
                    <li>
                      <a
                        href={linkedIn.href}
                        aria-label="LinkedIn"
                        className={cn(
                          "inline-flex size-10 items-center justify-center rounded-full border border-border/80 text-text-secondary no-underline",
                          "transition-[color,border-color] duration-200 hover:border-accent/50 hover:text-accent",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon name="linkedin" className="size-4" />
                      </a>
                    </li>
                  ) : null}
                  {github?.href ? (
                    <li>
                      <a
                        href={github.href}
                        aria-label="GitHub"
                        className={cn(
                          "inline-flex size-10 items-center justify-center rounded-full border border-border/80 text-text-secondary no-underline",
                          "transition-[color,border-color] duration-200 hover:border-accent/50 hover:text-accent",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon name="github" className="size-4" />
                      </a>
                    </li>
                  ) : null}
                </ul>

                <nav aria-label="Footer">
                  <ul className="flex list-none flex-wrap items-center gap-x-5 gap-y-2 p-0">
                    {navigation.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.href}
                          className="text-[0.875rem] text-text-secondary no-underline transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[0.6875rem] tracking-[0.04em] text-text-tertiary">
                © 2026 {site.name}. All rights reserved.
              </p>
              <p className="font-mono text-[0.6875rem] tracking-[0.04em] text-text-tertiary">
                Crafted with Next.js · Framer Motion
              </p>
            </div>
          </footer>
        </Reveal>
      </Container>
    </section>
  );
}
