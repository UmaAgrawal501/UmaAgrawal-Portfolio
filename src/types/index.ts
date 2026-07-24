/**
 * Portfolio content contracts.
 *
 * constants/ vs data/
 * - `src/constants/` — product chrome & behavior config (nav labels, anchors,
 *   breakpoints). Not personal biography or career facts.
 * - `src/data/` — typed personal/professional content consumed by sections.
 *
 * Filtering & derived lists belong in `src/lib/selectors.ts` (add when UI needs
 * them). Components must not filter raw data arrays inline.
 */

/** Shared image/file reference — prefer null over omitting when a slot exists. */
export type Media = {
  src: string;
  alt: string;
};

/** Primary header destinations — mirrored in constants/navigation.ts */
export type NavItem = {
  id: string;
  label: string;
  href: string;
};

/**
 * site.ts — identity + SEO only.
 * Do not store social network links here (see socials.ts).
 * Do not store nav items here (see constants/navigation.ts).
 */
export type SiteConfig = {
  /** Brand name shown in Header and titles */
  name: string;
  /** Professional title */
  role: string;
  /** One-line positioning */
  tagline: string;
  /** Primary contact email (identity, not a social profile) */
  email: string;

  location?: string;
  availability?: string;

  /** Canonical site URL for SEO / JSON-LD */
  url?: string;
  /** Default meta description */
  description?: string;
  /** Title template, e.g. "%s · Name" */
  titleTemplate?: string;
  /** Meta keywords */
  keywords?: string[];
  /** Default Open Graph image */
  ogImage?: Media | null;
  /** Favicon / app icon */
  favicon?: Media | null;

  /** Hero primary CTA label (e.g. Email) */
  primaryCtaLabel?: string;
  /** Hero secondary CTA label (e.g. View Work) */
  secondaryCtaLabel?: string;
  /** Hero secondary CTA href (e.g. #work) */
  secondaryCtaHref?: string;
  /** Contact section editorial headline */
  contactHeadline?: string;
};

/**
 * about.ts — narrative “who / how I think”
 */
export type About = {
  headline: string;
  body: string;
  paragraphs?: string[];
  focusAreas?: string[];
  portrait?: Media | null;
};

/**
 * principles.ts — engineering mindset (typically 3–4 items)
 */
export type Principle = {
  id: string;
  title: string;
  description: string;
  order?: number;
  /** Icon key resolved in UI — never emoji in data */
  icon?: string;
};

/**
 * socials.ts — distribution links for Contact / Footer only
 */
export type SocialLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  order?: number;
  rel?: string;
  /** Icon key resolved in UI */
  icon?: string;
};

/**
 * tech-stack.ts — curated categories (no proficiency scores)
 */
export type TechItem = {
  name: string;
  href?: string;
};

export type TechCategory = {
  id: string;
  title: string;
  items: TechItem[];
  order?: number;
};

/**
 * experience.ts — curated roles / outcomes (also used for education journey cards)
 */
export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];

  /** Work role vs education / graduation card */
  kind?: "work" | "education";
  location?: string;
  employmentType?: "full-time" | "contract" | "founding";
  companyUrl?: string;
  logo?: Media | null;
  order?: number;
  /** Technologies or domains emphasized in this role */
  skillsUsed?: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type CaseStudySection = {
  id: string;
  title: string;
  body?: string;
  /** Optional bullet list under the section */
  items?: string[];
  /** Optional diagram / screenshot for this section */
  image?: Media | null;
};

/**
 * Case study payload for /projects/[slug]
 */
export type ProjectCaseStudy = {
  problem: string;
  solution: string;
  architectureDiagram: Media | null;
  techStack: string[];
  challenges: string[];
  results: string[];
  keyLearnings: string[];

  metrics?: ProjectMetric[];
  gallery?: Media[];
  /** Optional longer overview body (case study); falls back to summary/solution */
  overview?: string;
  /** Optional intro shown under the hero on stacked case studies */
  intro?: string;
  /** Heading for the results list (default: Key Features) */
  resultsHeading?: string;
  /** Heading for challenges (default: Engineering Challenges) */
  challengesHeading?: string;
  /** Heading for learnings (default: Lessons Learned) */
  learningsHeading?: string;
  /** Freeform blocks for future expansion without breaking fixed headings */
  sections?: CaseStudySection[];
  /** Optional category line under the title */
  category?: string;
  /** Closing CTA copy */
  cta?: string;
};

/**
 * projects.ts — homepage cards + case study source of truth
 */
export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  year: string;
  featured: boolean;
  tags: string[];
  links: ProjectLink[];
  caseStudy: ProjectCaseStudy;

  /** Large media for case study hero / featured placements */
  featuredImage?: Media | null;
  /** Compact media for lists and cards */
  thumbnail?: Media | null;

  /** Short homepage card blurb; falls back to `summary` */
  cardSummary?: string;
  order?: number;
  status?: "shipped" | "ongoing" | "archived";
  role?: string;
  /** Short uppercase-style label on the card media panel */
  cardLabel?: string;
  /** Gold outline pills under the summary (product/capability tags) */
  cardTags?: string[];
};
