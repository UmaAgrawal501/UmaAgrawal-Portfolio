import type { Principle } from "@/types";

/**
 * AI engineering standards — support About, don’t restate it.
 */
export const principles = [
  {
    id: "grounding",
    title: "Ground before you generate",
    description:
      "If the answer isn’t in retrieved context, the system should say so—not invent confidently.",
    order: 1,
  },
  {
    id: "agents",
    title: "Keep agent boundaries explicit",
    description:
      "Intent routing, tools, and handoffs stay inspectable. Opaque multi-agent spaghetti doesn’t ship.",
    order: 2,
  },
  {
    id: "evaluate",
    title: "Evaluate the AI path, not the vibe",
    description:
      "Retrieval quality, prompt regressions, and failure modes get checked like any other backend change.",
    order: 3,
  },
  {
    id: "simplicity",
    title: "Prefer the smallest AI architecture that works",
    description:
      "One solid RAG or agent path beats a stack of models that nobody can operate.",
    order: 4,
  },
] as const satisfies readonly Principle[];
