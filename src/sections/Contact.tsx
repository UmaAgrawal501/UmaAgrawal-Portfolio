"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { navigation } from "@/constants/navigation";
import {
  sectionHeadlineClassName,
  sectionLabelClassName,
} from "@/constants/sections";
import { site } from "@/data/site";
import { getContactLinks } from "@/lib/selectors";
import { cn } from "@/lib/cn";

const contactLabel =
  navigation.find((item) => item.id === "contact")?.label ?? "Contact";

export function Contact() {
  const links = getContactLinks();
  const headline = site.contactHeadline;
  const invite = site.availability;

  if (!headline) {
    return null;
  }

  return (
    <section id="contact" aria-labelledby="contact-headline" className="py-20 lg:py-28">
      <Container>
        <div className="rounded-3xl border border-border/80 bg-surface/60 px-6 py-10 shadow-md sm:px-10 sm:py-14">
          <Reveal>
            <p className={sectionLabelClassName}>{contactLabel}</p>
            <h2 id="contact-headline" className={`${sectionHeadlineClassName} mt-3`}>
              {headline}
            </h2>
            {invite ? (
              <p className="type-body-lg mt-5 max-w-[36rem] text-text-secondary">
                {invite}
              </p>
            ) : null}
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`} className="btn-glow">
                Email Me
              </Button>
              <Button
                href="/resume.pdf"
                download="Uma-Agrawal-Resume.pdf"
                variant="secondary"
              >
                Download Resume
              </Button>
            </div>
          </Reveal>

          {links.length > 0 ? (
            <Reveal>
              <ul className="mt-10 flex list-none flex-wrap items-center gap-3 p-0">
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
                      {...(link.id === "resume"
                        ? { download: "Uma-Agrawal-Resume.pdf" }
                        : {})}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <SocialIcon name={link.icon ?? link.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>

        <Reveal>
          <footer className="mt-12 pb-4 text-center">
            <p className="type-mono text-[0.6875rem] tracking-[0.06em] text-text-tertiary/70">
              © 2026 {site.name}
            </p>
          </footer>
        </Reveal>
      </Container>
    </section>
  );
}
