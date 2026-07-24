import { about } from "@/data/about";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { techStack } from "@/data/tech-stack";
import type { Experience, Project } from "@/types";
import type { KnowledgeChunk } from "./types";

const experienceItems = experience as readonly Experience[];
const educationItems = education as readonly Experience[];
const projectItems = projects as readonly Project[];

function joinLines(...parts: Array<string | undefined | null>): string {
  return parts.filter(Boolean).join("\n");
}

function uniqueKeywords(...groups: string[][]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const group of groups) {
    for (const raw of group) {
      const token = raw.trim().toLowerCase();
      if (!token || seen.has(token)) continue;
      seen.add(token);
      out.push(token);
    }
  }
  return out;
}

function buildSiteChunk(): KnowledgeChunk {
  const contactLinks = socials
    .filter((s) => s.href)
    .map((s) => `${s.label}: ${s.href}`)
    .join("\n");

  return {
    id: "site-profile",
    title: "Profile & contact",
    source: "About / Contact",
    href: "/#contact",
    text: joinLines(
      `${site.name} is an ${site.role} based in ${site.location ?? "India"}.`,
      site.tagline,
      site.description,
      site.availability ? `Availability: ${site.availability}` : null,
      `Email: ${site.email}`,
      contactLinks ? `Links:\n${contactLinks}` : null,
    ),
    keywords: uniqueKeywords(
      [site.name, site.role, "contact", "email", "hire", "resume", "linkedin", "github"],
      site.keywords ?? [],
    ),
  };
}

function buildAboutChunk(): KnowledgeChunk {
  return {
    id: "about",
    title: "About Uma",
    source: "About",
    href: "/#about",
    text: joinLines(about.headline, about.body, ...(about.paragraphs ?? [])),
    keywords: uniqueKeywords([
      "about",
      "background",
      "who",
      "uma",
      "agrawal",
      "ai engineer",
    ]),
  };
}

function buildTechChunk(): KnowledgeChunk {
  const lines = techStack.map(
    (cat) => `${cat.title}: ${cat.items.map((i) => i.name).join(", ")}`,
  );
  return {
    id: "skills-tech",
    title: "Skills & tech stack",
    source: "Skills",
    href: "/#skills",
    text: joinLines(
      "Uma's technical skills organized by category:",
      ...lines,
    ),
    keywords: uniqueKeywords(
      ["skills", "tech", "stack", "tools", "languages"],
      techStack.flatMap((c) => c.items.map((i) => i.name)),
    ),
  };
}

function buildExperienceChunks(): KnowledgeChunk[] {
  return experienceItems.map((job) => ({
    id: `experience-${job.id}`,
    title: `${job.role} · ${job.company}`,
    source: "Experience",
    href: "/#experience",
    text: joinLines(
      `${job.role} at ${job.company} (${job.startDate} – ${job.endDate})${job.location ? `, ${job.location}` : ""}.`,
      job.summary,
      "Highlights:",
      ...job.highlights.map((h) => `- ${h}`),
      job.skillsUsed?.length
        ? `Skills used: ${job.skillsUsed.join(", ")}`
        : null,
    ),
    keywords: uniqueKeywords(
      [
        "experience",
        "work",
        "job",
        job.company,
        job.role,
        ...(job.skillsUsed ?? []),
      ],
      job.highlights.flatMap((h) => h.split(/\W+/).filter((w) => w.length > 4)),
    ),
  }));
}

function buildEducationChunks(): KnowledgeChunk[] {
  return educationItems.map((edu) => ({
    id: `education-${edu.id}`,
    title: `${edu.role} · ${edu.company}`,
    source: "Education",
    href: "/#experience",
    text: joinLines(
      `${edu.role} at ${edu.company} (${edu.startDate} – ${edu.endDate})${edu.location ? `, ${edu.location}` : ""}.`,
      edu.summary,
      edu.highlights.length
        ? `Focus areas: ${edu.highlights.join(", ")}`
        : null,
    ),
    keywords: uniqueKeywords([
      "education",
      "degree",
      "college",
      "university",
      "btech",
      "graduation",
      edu.company,
      "artificial intelligence",
      "computer science",
    ]),
  }));
}

function buildProjectChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  for (const project of projectItems) {
    const href = `/projects/${project.slug}`;
    const linkLines = project.links
      .filter((l) => l.href)
      .map((l) => `${l.label}: ${l.href}`);
    const cs = project.caseStudy;

    chunks.push({
      id: `project-${project.slug}-overview`,
      title: `${project.title} — overview`,
      source: project.title,
      href,
      text: joinLines(
        `${project.title} (${project.year})${project.role ? ` · ${project.role}` : ""}${project.status ? ` · ${project.status}` : ""}.`,
        project.cardLabel ? `Label: ${project.cardLabel}` : null,
        project.summary,
        project.cardSummary ? `Card summary: ${project.cardSummary}` : null,
        cs.category ? `Category: ${cs.category}` : null,
        cs.overview ? `Overview: ${cs.overview}` : null,
        cs.intro ? `Intro: ${cs.intro}` : null,
        `Tags: ${project.tags.join(", ")}`,
        project.cardTags?.length
          ? `Capabilities: ${project.cardTags.join(", ")}`
          : null,
        linkLines.length ? `Links:\n${linkLines.join("\n")}` : null,
      ),
      keywords: uniqueKeywords(
        [
          "project",
          project.title,
          project.slug,
          ...(project.tags ?? []),
          ...(project.cardTags ?? []),
        ],
        project.summary.split(/\W+/).filter((w) => w.length > 4),
      ),
    });

    chunks.push({
      id: `project-${project.slug}-problem-solution`,
      title: `${project.title} — problem & solution`,
      source: project.title,
      href,
      text: joinLines(
        `Problem: ${cs.problem}`,
        `Solution: ${cs.solution}`,
        `Tech stack: ${cs.techStack.join(", ")}`,
      ),
      keywords: uniqueKeywords(
        ["problem", "solution", "architecture", ...cs.techStack],
        [project.title, project.slug],
      ),
    });

    if (cs.challenges.length) {
      chunks.push({
        id: `project-${project.slug}-challenges`,
        title: `${project.title} — challenges`,
        source: project.title,
        href,
        text: joinLines(
          cs.challengesHeading ?? "Engineering challenges:",
          ...cs.challenges.map((c) => `- ${c}`),
        ),
        keywords: uniqueKeywords(["challenges", "engineering", project.title]),
      });
    }

    if (cs.results.length) {
      chunks.push({
        id: `project-${project.slug}-results`,
        title: `${project.title} — results & capabilities`,
        source: project.title,
        href,
        text: joinLines(
          cs.resultsHeading ?? "Key features / results:",
          ...cs.results.map((r) => `- ${r}`),
        ),
        keywords: uniqueKeywords(["results", "features", "outcomes", project.title]),
      });
    }

    if (cs.keyLearnings.length) {
      chunks.push({
        id: `project-${project.slug}-learnings`,
        title: `${project.title} — learnings`,
        source: project.title,
        href,
        text: joinLines(
          cs.learningsHeading ?? "Lessons learned:",
          ...cs.keyLearnings.map((l) => `- ${l}`),
        ),
        keywords: uniqueKeywords(["learnings", "lessons", project.title]),
      });
    }

    for (const section of cs.sections ?? []) {
      chunks.push({
        id: `project-${project.slug}-${section.id}`,
        title: `${project.title} — ${section.title}`,
        source: project.title,
        href,
        text: joinLines(
          section.body,
          ...(section.items?.map((i) => `- ${i}`) ?? []),
        ),
        keywords: uniqueKeywords(
          [section.title, project.title, section.id],
          section.items ?? [],
        ),
      });
    }
  }

  return chunks;
}

/** Portfolio knowledge chunks derived from site data (always in sync). */
export const knowledgeChunks: KnowledgeChunk[] = [
  buildSiteChunk(),
  buildAboutChunk(),
  buildTechChunk(),
  ...buildExperienceChunks(),
  ...buildEducationChunks(),
  ...buildProjectChunks(),
];
