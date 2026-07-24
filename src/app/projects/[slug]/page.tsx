import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { TechIconPill } from "@/components/ui/TechIcon";
import { MAIN_CONTENT_ID } from "@/constants/navigation";
import { projects } from "@/data/projects";
import { getProjectBySlug } from "@/lib/selectors";
import {
  breadcrumbJsonLd,
  buildProjectMetadata,
  creativeWorkJsonLd,
} from "@/lib/seo";
import type { Media, ProjectLink } from "@/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project" };
  }

  return buildProjectMetadata(project);
}

function CaseStudyMedia({ media, priority = false }: { media: Media; priority?: boolean }) {
  return (
    <figure className="mt-10">
      <Image
        src={media.src}
        alt={media.alt}
        width={1200}
        height={750}
        priority={priority}
        className="h-auto w-full max-w-full"
      />
    </figure>
  );
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;

  return (
    <ul className="mt-8 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="type-body-sm text-text-secondary no-underline transition-opacity duration-200 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label} →
          </a>
        </li>
      ))}
    </ul>
  );
}

function EditorialList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 max-w-[36rem] list-none space-y-3 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="type-body break-words leading-7 text-text-secondary"
        >
          <span aria-hidden="true" className="text-text-tertiary">
            –{" "}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyHeading({
  id,
  children,
}: {
  id: string;
  children: string;
}) {
  return (
    <h2
      id={id}
      className="type-mono text-[0.6875rem] tracking-[0.08em] text-text-tertiary"
    >
      {children}
    </h2>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const study = project.caseStudy;
  const technologies =
    study.techStack.length > 0 ? study.techStack : project.tags.slice(0, 5);
  const sections = study.sections ?? [];
  const gallery = study.gallery ?? [];

  return (
    <main
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      className="min-w-0 flex-1 pb-24 pt-10 outline-none sm:pt-14 lg:pb-32 lg:pt-16"
    >
      <JsonLd
        data={[breadcrumbJsonLd(project), creativeWorkJsonLd(project)]}
      />
      <Container>
        <p className="type-mono text-[0.6875rem] tracking-[0.08em] text-text-tertiary sm:text-[0.75rem]">
          <Link
            href="/#work"
            className="text-text-tertiary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            ← Selected Work
          </Link>
        </p>

        <article className="mt-12 max-w-[42.5rem] sm:mt-16">
          <header>
            <p className="type-mono text-text-tertiary">
              {[project.year, project.role].filter(Boolean).join(" · ")}
            </p>

            <h1 className="mt-4 break-words text-[clamp(1.75rem,5vw,2.75rem)] font-medium leading-tight tracking-[-0.03em] text-text-primary">
              {project.title}
            </h1>

            <p className="type-body-lg mt-6 break-words leading-8 text-text-secondary sm:mt-8">
              {project.summary}
            </p>

            {technologies.length > 0 ? (
              <ul className="mt-8 flex list-none flex-wrap gap-2.5 p-0">
                {technologies.map((tech) => (
                  <li key={tech}>
                    <TechIconPill name={tech} />
                  </li>
                ))}
              </ul>
            ) : null}

            <ProjectLinks links={project.links} />
          </header>

          {project.featuredImage ? (
            <CaseStudyMedia media={project.featuredImage} priority />
          ) : null}

          <div className="mt-16 space-y-14 sm:mt-20 sm:space-y-16">
            <section aria-labelledby="problem-heading">
              <CaseStudyHeading id="problem-heading">Problem</CaseStudyHeading>
              <p className="type-body mt-4 max-w-[36rem] break-words leading-7 text-text-secondary">
                {study.problem}
              </p>
            </section>

            <section aria-labelledby="approach-heading">
              <CaseStudyHeading id="approach-heading">Approach</CaseStudyHeading>
              <p className="type-body mt-4 max-w-[36rem] break-words leading-7 text-text-secondary">
                {study.solution}
              </p>
            </section>

            {sections.map((section) => (
              <section key={section.id} aria-labelledby={`${section.id}-heading`}>
                <CaseStudyHeading id={`${section.id}-heading`}>
                  {section.title}
                </CaseStudyHeading>
                <p className="type-body mt-4 max-w-[36rem] break-words leading-7 text-text-secondary">
                  {section.body}
                </p>
              </section>
            ))}

            {study.architectureDiagram ? (
              <section aria-labelledby="architecture-heading">
                <CaseStudyHeading id="architecture-heading">
                  Architecture
                </CaseStudyHeading>
                <CaseStudyMedia media={study.architectureDiagram} />
              </section>
            ) : null}

            {study.challenges.length > 0 ? (
              <section aria-labelledby="challenges-heading">
                <CaseStudyHeading id="challenges-heading">
                  Challenges
                </CaseStudyHeading>
                <EditorialList items={study.challenges} />
              </section>
            ) : null}

            {study.results.length > 0 ? (
              <section aria-labelledby="outcomes-heading">
                <CaseStudyHeading id="outcomes-heading">Outcomes</CaseStudyHeading>
                <EditorialList items={study.results} />
              </section>
            ) : null}

            {study.keyLearnings.length > 0 ? (
              <section aria-labelledby="learnings-heading">
                <CaseStudyHeading id="learnings-heading">
                  Learnings
                </CaseStudyHeading>
                <EditorialList items={study.keyLearnings} />
              </section>
            ) : null}

            {gallery.length > 0 ? (
              <section aria-labelledby="gallery-heading">
                <CaseStudyHeading id="gallery-heading">Gallery</CaseStudyHeading>
                <div className="mt-6 space-y-8">
                  {gallery.map((media) => (
                    <CaseStudyMedia key={media.src} media={media} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </article>
      </Container>
    </main>
  );
}
