"use client";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { workSectionTitle } from "@/constants/navigation";
import { sectionHeadlineClassName, sectionLabelClassName } from "@/constants/sections";
import { getFeaturedProjects } from "@/lib/selectors";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  if (featured.length === 0) {
    return null;
  }

  return (
    <section id="work" aria-labelledby="work-title" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <p className={sectionLabelClassName}>Projects</p>
          <h2 id="work-title" className={`${sectionHeadlineClassName} mt-3`}>
            {workSectionTitle}
          </h2>
          <p className="type-body mt-4 max-w-[40rem] text-text-secondary">
            Full-stack and AI solutions built to solve real problems—not demos that die in a notebook.
          </p>
        </Reveal>

        <ul className="mt-12 grid list-none gap-5 p-0 sm:grid-cols-2 lg:gap-6">
          {featured.map((project) => (
            <li key={project.id} className="min-w-0">
              <Reveal className="h-full">
                <ProjectRow project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
