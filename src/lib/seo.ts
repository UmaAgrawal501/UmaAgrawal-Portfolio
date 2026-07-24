import type { Metadata } from "next";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import type { Project, SiteConfig } from "@/types";

const siteConfig = site as SiteConfig;

const DEFAULT_LOCALE = "en_US";
const OG_IMAGE_PATH = "/opengraph-image";
const TWITTER_IMAGE_PATH = "/opengraph-image";

/** Canonical site origin for metadataBase, sitemap, and JSON-LD. */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const fromSite = siteConfig.url?.replace(/\/$/, "");
  if (fromSite) return fromSite;

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /\/$/,
    "",
  );
  if (vercelProduction) {
    return vercelProduction.startsWith("http")
      ? vercelProduction
      : `https://${vercelProduction}`;
  }

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) {
    return vercel.startsWith("http") ? vercel : `https://${vercel}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const origin = getSiteOrigin();
  if (!path || path === "/") return origin;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function sameAsProfiles(): string[] {
  return socials
    .filter((link) => link.external && link.href.startsWith("http"))
    .map((link) => link.href);
}

function defaultOgImage() {
  const image = site.ogImage;
  if (image?.src) {
    return {
      url: image.src.startsWith("http") ? image.src : absoluteUrl(image.src),
      alt: image.alt,
    };
  }

  return {
    url: absoluteUrl(OG_IMAGE_PATH),
    alt: `${site.name} — ${site.role}`,
  };
}

/** Root layout metadata — driven by site.ts. */
export function buildRootMetadata(): Metadata {
  const origin = getSiteOrigin();
  const description = site.description ?? site.tagline;
  const titleDefault = `${site.name} · ${site.role}`;
  const og = defaultOgImage();

  return {
    metadataBase: new URL(origin),
    title: {
      default: titleDefault,
      template: site.titleTemplate ?? `%s · ${site.name}`,
    },
    description,
    keywords: site.keywords,
    authors: [{ name: site.name, url: origin }],
    creator: site.name,
    publisher: site.name,
    applicationName: site.name,
    category: "technology",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: DEFAULT_LOCALE,
      url: origin,
      siteName: site.name,
      title: titleDefault,
      description,
      images: [
        {
          url: og.url,
          alt: og.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      images: [
        {
          url: absoluteUrl(TWITTER_IMAGE_PATH),
          alt: og.alt,
        },
      ],
      creator: site.name,
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png" }],
      apple: [{ url: "/apple-icon", type: "image/png" }],
      ...(site.favicon?.src
        ? { shortcut: [{ url: site.favicon.src }] }
        : {}),
    },
    manifest: "/manifest.webmanifest",
  };
}

/** Per-project metadata — unique title, description, canonical, OG/Twitter. */
export function buildProjectMetadata(project: Project): Metadata {
  const path = `/projects/${project.slug}`;
  const url = absoluteUrl(path);
  const title = project.title;
  const description = project.summary;
  const imageSrc =
    project.featuredImage?.src ??
    project.caseStudy.architectureDiagram?.src ??
    site.ogImage?.src ??
    `/projects/${project.slug}/opengraph-image`;
  const imageAlt =
    project.featuredImage?.alt ??
    project.caseStudy.architectureDiagram?.alt ??
    site.ogImage?.alt ??
    `${project.title} — case study by ${site.name}`;
  const imageUrl = imageSrc.startsWith("http")
    ? imageSrc
    : absoluteUrl(imageSrc);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      locale: DEFAULT_LOCALE,
      url,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function personJsonLd() {
  const origin = getSiteOrigin();
  const sameAs = sameAsProfiles();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description ?? site.tagline,
    email: site.email,
    url: origin,
    ...(site.location ? { address: { "@type": "PostalAddress", addressLocality: site.location } } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  const origin = getSiteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: origin,
    description: site.description ?? site.tagline,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: site.name,
    },
  };
}

export function breadcrumbJsonLd(project: Project) {
  const home = absoluteUrl("/");
  const work = absoluteUrl("/#work");
  const projectUrl = absoluteUrl(`/projects/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: home,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Selected Work",
        item: work,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };
}

export function creativeWorkJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const image =
    project.featuredImage?.src ??
    project.caseStudy.architectureDiagram?.src ??
    absoluteUrl(`/projects/${project.slug}/opengraph-image`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    url,
    dateCreated: project.year,
    inLanguage: "en",
    keywords: project.tags.join(", "),
    author: {
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      url: getSiteOrigin(),
    },
    creator: {
      "@type": "Person",
      name: site.name,
    },
    ...(image
      ? {
          image: image.startsWith("http") ? image : absoluteUrl(image),
        }
      : {}),
    about: project.caseStudy.techStack,
  };
}
