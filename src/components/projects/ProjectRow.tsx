import Link from "next/link";
import type { Project } from "@/types";
import { TechIconPill } from "@/components/ui/TechIcon";
import { cn } from "@/lib/cn";

type ProjectRowProps = {
  project: Project;
};

const MAX_VISIBLE_TAGS = 5;

/** Project card — dark gold / Hussam-inspired media card */
export function ProjectRow({ project }: ProjectRowProps) {
  const technologies = project.tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface/70 no-underline",
        "glass transition-[border-color,box-shadow,transform] duration-300",
        "hover:-translate-y-1 hover:border-accent/40 hover:shadow-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(224,169,94,0.12),transparent_40%)] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold text-text-inverse">
            Explore
          </span>
          {project.year ? (
            <span className="font-mono text-xs text-text-tertiary">
              {project.year}
            </span>
          ) : null}
        </div>
        <div className="absolute right-4 bottom-4 flex size-8 items-center justify-center rounded-full bg-background/20 transition-transform duration-300 group-hover:rotate-45">
          <span aria-hidden="true" className="text-accent">
            →
          </span>
        </div>
        <p className="absolute bottom-4 left-4 max-w-[70%] font-display text-lg font-bold text-text-primary md:text-xl">
          {project.title}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="type-body flex-1 break-words text-text-secondary">
          {project.summary}
        </p>

        {technologies.length > 0 ? (
          <ul className="mt-5 flex list-none flex-wrap gap-2.5 p-0">
            {technologies.map((tech) => (
              <li key={tech} className="relative z-0 hover:z-20">
                <TechIconPill name={tech} />
              </li>
            ))}
          </ul>
        ) : null}

        <span className="mt-5 type-body-sm font-medium text-accent-hover opacity-80 transition-opacity group-hover:opacity-100">
          View Details →
        </span>
      </div>
    </Link>
  );
}
