import { contactLinkPriority } from "@/constants/sections";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { principles } from "@/data/principles";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import type { Experience, Principle, Project, SocialLink } from "@/types";

/**
 * Derived lists — keep filtering/sorting out of UI components.
 */
export function getFeaturedProjects(
  items: readonly Project[] = projects,
): Project[] {
  return [...items]
    .filter((project) => project.featured)
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
}

export function getProjectBySlug(
  slug: string,
  items: readonly Project[] = projects,
): Project | undefined {
  return items.find((project) => project.slug === slug);
}

export function getOrderedPrinciples(
  items: readonly Principle[] = principles,
): Principle[] {
  return [...items].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER),
  );
}

/** Work + education journey cards, ordered for the timeline. */
export function getOrderedExperience(
  work: readonly Experience[] = experience,
  school: readonly Experience[] = education,
): Experience[] {
  return [...work, ...school].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER),
  );
}

/** First three highlights for editorial density. */
export function getCuratedHighlights(
  entry: Experience,
  limit = 3,
): string[] {
  return entry.highlights.slice(0, limit);
}

/**
 * Available contact links in product priority order.
 * Skips empty hrefs. Ensures email from site when present.
 */
export function getContactLinks(
  items: readonly SocialLink[] = socials,
): SocialLink[] {
  const byId = new Map(items.map((item) => [item.id, item]));

  if (site.email) {
    const existing = byId.get("email");
    byId.set("email", {
      id: "email",
      label: existing?.label ?? "Email",
      href: existing?.href || `mailto:${site.email}`,
      external: existing?.external ?? false,
      order: existing?.order,
      icon: existing?.icon ?? "email",
    });
  }

  return contactLinkPriority.flatMap((id) => {
    const link = byId.get(id);
    if (!link?.href) return [];
    return [link];
  });
}
