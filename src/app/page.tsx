import { JsonLd } from "@/components/seo/JsonLd";
import { MAIN_CONTENT_ID } from "@/constants/navigation";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { EngineeringPrinciples } from "@/sections/EngineeringPrinciples";
import { Experience } from "@/sections/Experience";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Hero } from "@/sections/Hero";
import { Skills } from "@/sections/Skills";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * Homepage: Hero → About → Approach → Experience → Projects → Skills → Contact
 */
export default function Home() {
  return (
    <main
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      className="flex min-h-full min-w-0 max-w-full flex-1 flex-col outline-none"
    >
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <Hero />
      <About />
      <EngineeringPrinciples />
      <Experience />
      <FeaturedProjects />
      <Skills />
      <Contact />
    </main>
  );
}
