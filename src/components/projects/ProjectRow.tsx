import Link from "next/link";
import type { Project } from "@/types";
import { TechIconPill } from "@/components/ui/TechIcon";
import { cn } from "@/lib/cn";

type ProjectRowProps = {
  project: Project;
};

const MAX_VISIBLE_TAGS = 5;

/** Project card — cosmic redesign */
export function ProjectRow({ project }: ProjectRowProps) {
  const technologies = project.tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-visible rounded-2xl border border-border/80 bg-surface/70 p-6 no-underline",
        "shadow-sm transition-[border-color,box-shadow,transform] duration-200",
        "hover:border-accent/50 hover:shadow-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus",
        "sm:p-7",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="type-h3 break-words text-text-primary transition-colors group-hover:text-accent-hover">
          {project.title}
        </h3>
        {project.year ? (
          <time
            className="type-mono shrink-0 text-text-tertiary"
            dateTime={project.year}
          >
            {project.year}
          </time>
        ) : null}
      </div>

      <p className="type-body mt-3 flex-1 break-words text-text-secondary">
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
        View case study →
      </span>
    </Link>
  );
}
