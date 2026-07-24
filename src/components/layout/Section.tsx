import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  /**
   * When false, children render without the shell Container.
   * Use for full-bleed media or custom layouts.
   */
  contain?: boolean;
  /**
   * Accessible name for the region when no visible heading is present.
   */
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  id,
  title,
  subtitle,
  className,
  containerClassName,
  contain = true,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SectionProps) {
  const titleId = id && title ? `${id}-title` : undefined;
  const labelledBy = ariaLabelledby ?? titleId;

  const header =
    title || subtitle ? (
      <header className={cn(children ? "mb-10 lg:mb-12" : undefined)}>
        {title ? (
          <h2 id={titleId} className="type-h1 text-text-primary">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p
            className={cn(
              "type-body-lg max-w-[var(--container-hero-support)] text-text-secondary",
              title ? "mt-3" : undefined,
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </header>
    ) : null;

  const inner = (
    <>
      {header}
      {children}
    </>
  );

  const content = contain ? (
    <Container className={containerClassName}>{inner}</Container>
  ) : (
    inner
  );

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      className={cn("py-24 lg:py-32", className)}
    >
      {content}
    </section>
  );
}
