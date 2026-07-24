/**
 * Section chrome labels not represented in primary navigation.
 */
export const sectionLabels = {
  principles: "Approach",
  skills: "Skills",
} as const;

export const sectionLabelClassName =
  "type-mono text-[0.6875rem] tracking-[0.14em] uppercase text-accent-hover sm:text-[0.75rem]";

export const sectionLabelRailClassName = `${sectionLabelClassName} lg:sticky lg:top-28`;

export const sectionHeadlineClassName =
  "break-words text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-text-primary";

/** Contact link display priority */
export const contactLinkPriority = [
  "email",
  "linkedin",
  "resume",
  "github",
  "portfolio",
] as const;
