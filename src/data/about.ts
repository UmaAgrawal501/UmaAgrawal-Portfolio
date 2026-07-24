import type { About } from "@/types";

export const about = {
  headline: "Building AI systems that create real impact.",
  body: "I'm an AI Engineer focused on Large Language Models, agents, and retrieval-augmented generation. I turn complex ideas into scalable AI products with Python, FastAPI, LangChain, LangGraph, and modern LLM APIs.",
  paragraphs: [
    "My work centers on production-ready AI—intelligent automation, grounded assistants, and systems teams can actually operate. Clean architecture and clear failure modes matter as much as model choice.",
    "When I'm not shipping, I'm exploring new models, frameworks, and ways to make AI products more reliable for real users.",
  ],
  portrait: {
    src: "/portrait.svg",
    alt: "Uma Agrawal",
  },
} satisfies About;
