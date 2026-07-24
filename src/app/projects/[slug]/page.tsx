import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { GoldPills } from "@/components/ui/GoldPills";
import { MAIN_CONTENT_ID } from "@/constants/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { getProjectBySlug } from "@/lib/selectors";
import {
  breadcrumbJsonLd,
  buildProjectMetadata,
  creativeWorkJsonLd,
} from "@/lib/seo";
import type { CaseStudySection, Media, Project, ProjectLink } from "@/types";

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

function CaseStudyMedia({
  media,
  priority = false,
  caption,
  className,
}: {
  media: Media;
  priority?: boolean;
  caption?: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-border/80 bg-[#0a0c10] ${className ?? ""}`}
    >
      <Image
        src={media.src}
        alt={media.alt}
        width={1600}
        height={900}
        priority={priority}
        className="h-auto w-full max-w-full object-contain"
      />
      {caption ? (
        <figcaption className="border-t border-border/60 bg-surface/40 px-4 py-3 font-mono text-[0.7rem] text-text-tertiary">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;

  return (
    <ul className="flex list-none flex-wrap gap-3 p-0">
      {links.map((link) => (
        <li key={link.href}>
          <Button
            href={link.href}
            variant={link === links[0] ? "primary" : "secondary"}
            external={link.external}
            className={link === links[0] ? "btn-glow" : undefined}
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}

function EditorialList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 max-w-[48rem] list-none space-y-3 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="type-body break-words leading-7 text-text-secondary"
        >
          <span aria-hidden="true" className="text-accent">
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
      className="font-mono text-[0.6875rem] tracking-[0.12em] text-accent uppercase"
    >
      {children}
    </h2>
  );
}

function FreeformSection({ section }: { section: CaseStudySection }) {
  if (section.image) {
    return (
      <section aria-labelledby={`${section.id}-heading`} className="min-w-0">
        <CaseStudyHeading id={`${section.id}-heading`}>
          {section.title}
        </CaseStudyHeading>
        <CaseStudyMedia
          className="mt-6"
          media={section.image}
          caption={section.image.alt}
        />
        {section.body ? (
          <p className="type-body mt-6 max-w-[48rem] whitespace-pre-line break-words leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8">
            {section.body}
          </p>
        ) : null}
        {section.items && section.items.length > 0 ? (
          <EditorialList items={section.items} />
        ) : null}
      </section>
    );
  }

  return (
    <section
      aria-labelledby={`${section.id}-heading`}
      className="grid gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-5">
        <CaseStudyHeading id={`${section.id}-heading`}>
          {section.title}
        </CaseStudyHeading>
      </div>
      <div className="lg:col-span-7">
        {section.body ? (
          <p className="type-body whitespace-pre-line break-words leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8">
            {section.body}
          </p>
        ) : null}
        {section.items && section.items.length > 0 ? (
          <EditorialList items={section.items} />
        ) : null}
      </div>
    </section>
  );
}

function ProjectHero({ project }: { project: Project }) {
  const study = project.caseStudy;
  const technologies =
    study.techStack.length > 0 ? study.techStack : project.tags;
  const cardTags = project.cardTags ?? [];
  const label =
    project.cardLabel ??
    study.category?.split("·")[0]?.trim() ??
    null;
  const stackedHero = Boolean(project.featuredImage);
  const splitVisual =
    !stackedHero && (project.thumbnail ?? project.featuredImage);

  return (
    <header className="mt-10 sm:mt-14">
      <div
        className={
          splitVisual
            ? "grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
            : "max-w-[52rem]"
        }
      >
        <div className={splitVisual ? "lg:col-span-6" : undefined}>
          <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-text-tertiary sm:text-[0.75rem]">
            <Link
              href="/#work"
              className="text-text-tertiary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              ← Back to Projects
            </Link>
          </p>

          {label ? (
            <p className="mt-8 font-mono text-[0.75rem] tracking-[0.1em] text-accent uppercase">
              {label}
            </p>
          ) : study.category ? (
            <p className="mt-8 font-mono text-[0.75rem] tracking-[0.06em] text-accent">
              {study.category}
            </p>
          ) : null}

          <h1 className="font-display mt-4 break-words text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
            {project.title}
          </h1>

          {!stackedHero ? (
            <p className="type-body-lg mt-6 max-w-[40rem] break-words leading-8 text-text-secondary">
              {project.summary}
            </p>
          ) : null}

          {cardTags.length > 0 ? (
            <GoldPills items={cardTags} className="mt-6" />
          ) : null}

          {technologies.length > 0 && !stackedHero ? (
            <GoldPills items={technologies} className="mt-5" size="sm" />
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ProjectLinks links={project.links} />
            {project.links.length === 0 ? (
              <Button href={`mailto:${site.email}`} className="btn-glow">
                Discuss this project
                <span aria-hidden="true">↗</span>
              </Button>
            ) : null}
          </div>

          <p className="mt-6 font-mono text-[0.7rem] tracking-[0.04em] text-text-tertiary">
            {[project.year, project.role, project.status]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>

        {splitVisual ? (
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-[#0a0c10] p-3 sm:p-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <Image
                  src={splitVisual.src}
                  alt={splitVisual.alt}
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {stackedHero && project.featuredImage ? (
        <CaseStudyMedia
          className="mt-10 sm:mt-12"
          media={project.featuredImage}
          priority
          caption={project.featuredImage.alt}
        />
      ) : null}
    </header>
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
      className="min-w-0 flex-1 pb-24 pt-28 outline-none sm:pt-32 lg:pb-32"
    >
      <JsonLd
        data={[breadcrumbJsonLd(project), creativeWorkJsonLd(project)]}
      />
      <Container width="shell">
        <article className="w-full min-w-0">
          <ProjectHero project={project} />

          <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-20">
            {study.intro ? (
              <p className="type-body-lg max-w-[48rem] whitespace-pre-line break-words leading-8 text-text-secondary">
                {study.intro}
              </p>
            ) : null}

            <section
              aria-labelledby="overview-heading"
              className="grid gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <CaseStudyHeading id="overview-heading">
                  Overview
                </CaseStudyHeading>
              </div>
              <div className="lg:col-span-7">
                <p className="type-body whitespace-pre-line break-words leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8">
                  {study.overview ??
                    (project.featuredImage ? project.summary : study.solution)}
                </p>
              </div>
            </section>

            <section
              aria-labelledby="challenge-heading"
              className="grid gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <CaseStudyHeading id="challenge-heading">
                  The Challenge
                </CaseStudyHeading>
              </div>
              <div className="lg:col-span-7">
                <p className="type-body whitespace-pre-line break-words leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8">
                  {study.problem}
                </p>
              </div>
            </section>

            {project.featuredImage ? (
              <section
                aria-labelledby="solution-heading"
                className="grid gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-5">
                  <CaseStudyHeading id="solution-heading">
                    The Solution
                  </CaseStudyHeading>
                </div>
                <div className="lg:col-span-7">
                  <p className="type-body whitespace-pre-line break-words leading-7 text-text-secondary sm:text-[1.05rem] sm:leading-8">
                    {study.solution}
                  </p>
                </div>
              </section>
            ) : null}

            {sections.map((section) =>
              section.id === "technologies" ? (
                <section
                  key={section.id}
                  aria-labelledby="stack-heading"
                  className="grid gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <div className="lg:col-span-5">
                    <CaseStudyHeading id="stack-heading">
                      {section.title}
                    </CaseStudyHeading>
                  </div>
                  <div className="lg:col-span-7">
                    <GoldPills
                      items={
                        section.items && section.items.length > 0
                          ? section.items
                          : technologies
                      }
                    />
                  </div>
                </section>
              ) : (
                <FreeformSection key={section.id} section={section} />
              ),
            )}

            {study.architectureDiagram ? (
              <section aria-labelledby="architecture-diagram-heading">
                <CaseStudyHeading id="architecture-diagram-heading">
                  Architecture Diagram
                </CaseStudyHeading>
                <CaseStudyMedia
                  className="mt-6"
                  media={study.architectureDiagram}
                />
              </section>
            ) : null}

            {study.results.length > 0 ? (
              <section
                aria-labelledby="features-heading"
                className="grid gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-5">
                  <CaseStudyHeading id="features-heading">
                    {study.resultsHeading ?? "Key Features"}
                  </CaseStudyHeading>
                </div>
                <div className="lg:col-span-7">
                  <EditorialList items={study.results} />
                </div>
              </section>
            ) : null}

            {study.challenges.length > 0 ? (
              <section
                aria-labelledby="challenges-heading"
                className="grid gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-5">
                  <CaseStudyHeading id="challenges-heading">
                    {study.challengesHeading ?? "Engineering Challenges"}
                  </CaseStudyHeading>
                </div>
                <div className="lg:col-span-7">
                  <EditorialList items={study.challenges} />
                </div>
              </section>
            ) : null}

            {study.keyLearnings.length > 0 ? (
              <section
                aria-labelledby="learnings-heading"
                className="grid gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-5">
                  <CaseStudyHeading id="learnings-heading">
                    {study.learningsHeading ?? "Lessons Learned"}
                  </CaseStudyHeading>
                </div>
                <div className="lg:col-span-7">
                  <EditorialList items={study.keyLearnings} />
                </div>
              </section>
            ) : null}

            {technologies.length > 0 &&
            !sections.some((section) => section.id === "technologies") ? (
              <section
                aria-labelledby="stack-heading-fallback"
                className="grid gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-5">
                  <CaseStudyHeading id="stack-heading-fallback">
                    Technology Stack
                  </CaseStudyHeading>
                </div>
                <div className="lg:col-span-7">
                  <GoldPills items={technologies} />
                </div>
              </section>
            ) : null}

            {gallery.length > 0 ? (
              <section aria-labelledby="gallery-heading">
                <CaseStudyHeading id="gallery-heading">Gallery</CaseStudyHeading>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {gallery.map((media) => (
                    <CaseStudyMedia key={media.src} media={media} />
                  ))}
                </div>
              </section>
            ) : null}

            {study.cta ? (
              <section
                aria-labelledby="cta-heading"
                className="glass rounded-[1.75rem] p-6 sm:p-10 lg:p-12"
              >
                <div className="grid items-center gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <CaseStudyHeading id="cta-heading">
                      Next Step
                    </CaseStudyHeading>
                    <p className="type-body mt-4 max-w-[42rem] leading-7 text-text-secondary">
                      {study.cta}
                    </p>
                  </div>
                  <div className="lg:col-span-4 lg:justify-self-end">
                    <Button href={`mailto:${site.email}`} className="btn-glow">
                      Start a conversation
                    </Button>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </article>
      </Container>
    </main>
  );
}
