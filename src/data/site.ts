import type { SiteConfig } from "@/types";

export const site = {
  name: "Uma Agrawal",
  role: "AI Engineer",
  tagline:
    "Architecting scalable solutions at the intersection of backend engineering and artificial intelligence—from RAG systems and multi-agent workflows to production FastAPI services.",
  email: "agrawaluma2002@gmail.com",
  location: "Jaipur, Rajasthan, India",
  availability: "Open to AI Engineer roles and collaborations.",
  description:
    "Uma Agrawal — AI Engineer building RAG systems, LLM agents, and production AI backends.",
  titleTemplate: "%s · Uma Agrawal",
  keywords: [
    "AI Engineer",
    "Generative AI",
    "LLM",
    "AI Agents",
    "LangChain",
    "LangGraph",
    "FastAPI",
    "Python",
    "RAG",
  ],
  ogImage: {
    src: "/opengraph-image",
    alt: "Uma Agrawal — AI Engineer",
  },
  favicon: {
    src: "/icon",
    alt: "Uma Agrawal",
  },
  primaryCtaLabel: "Download Resume",
  secondaryCtaLabel: "Contact Me",
  secondaryCtaHref: "#contact",
  contactHeadline: "Ready to build something with AI?",
} satisfies SiteConfig;
