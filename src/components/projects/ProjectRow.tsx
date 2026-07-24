import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { GoldPills } from "@/components/ui/GoldPills";
import { cn } from "@/lib/cn";

type ProjectRowProps = {
  project: Project;
};

/** Vertical project card — media on top, Explore on image hover */
export function ProjectRow({ project }: ProjectRowProps) {
  const technologies =
    project.caseStudy.techStack.length > 0
      ? project.caseStudy.techStack
      : project.tags;
  const thumb = project.thumbnail ?? project.featuredImage;
  const label =
    project.cardLabel ??
    project.caseStudy.category?.split("·")[0]?.trim() ??
    "Selected Work";
  const cardTags = project.cardTags ?? [];
  const monogram = project.title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-border/80 bg-surface/70 no-underline",
        "glass transition-[border-color,box-shadow,transform] duration-300",
        "hover:-translate-y-1 hover:border-accent/40 hover:shadow-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus",
      )}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
        {thumb ? (
          <Image
            src={thumb.src}
            alt=""
            fill
            className="object-cover object-center opacity-95 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(224,169,94,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(127,199,196,0.12),transparent_50%)]"
          >
            <span className="font-display text-5xl font-bold tracking-tight text-accent/40 sm:text-6xl">
              {monogram}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-background/15" />

        <span className="absolute top-4 left-4 max-w-[70%] rounded-full border border-border-strong bg-background/55 px-3 py-1 font-mono text-[0.625rem] tracking-[0.08em] text-text-secondary uppercase backdrop-blur-sm">
          {label}
        </span>

        {project.year ? (
          <span className="absolute top-4 right-4 font-mono text-[0.7rem] tracking-[0.06em] text-text-tertiary">
            {project.year}
          </span>
        ) : null}

        {/* Explore — visible on hover / keyboard focus; always on touch */}
        <span
          className={cn(
            "absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5",
            "text-[0.75rem] font-semibold text-text-inverse shadow-md",
            "translate-y-0 opacity-100 transition-[opacity,transform] duration-300",
            "[@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0",
            "[@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100",
            "[@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100",
          )}
        >
          Explore
          <span aria-hidden="true">↗</span>
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-tight tracking-[-0.03em] text-text-primary">
          {project.title}
        </h3>

        <p className="type-body mt-3 flex-1 break-words leading-7 text-text-secondary">
          {project.cardSummary ?? project.summary}
        </p>

        {cardTags.length > 0 ? (
          <GoldPills items={cardTags} className="mt-5" size="sm" />
        ) : null}

        {technologies.length > 0 ? (
          <GoldPills items={technologies} className="mt-4" size="sm" />
        ) : null}
      </div>
    </Link>
  );
}
