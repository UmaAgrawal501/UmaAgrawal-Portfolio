import type { SiteConfig } from "@/types";

export const site = {
  name: "Uma Agrawal",
  role: "AI Engineer",
  tagline:
    "I build AI products that solve real problems—turning complex ideas into reliable, production-ready systems people can actually use.",
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
  contactHeadline: "Let's build something intelligent",
} satisfies SiteConfig;
