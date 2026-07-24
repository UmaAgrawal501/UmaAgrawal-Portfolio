import type { Principle } from "@/types";

/**
 * About / Approach principles — Uma’s production AI standards.
 */
export const principles = [
  {
    id: "production",
    title: "Built for production",
    description:
      "Reliable systems with clear architecture, observability, and maintainability from day one.",
    order: 1,
  },
  {
    id: "grounded",
    title: "Grounded in context",
    description:
      "Designing retrieval-first experiences so AI responses remain accurate, relevant, and trustworthy.",
    order: 2,
  },
  {
    id: "automation",
    title: "Automation with purpose",
    description:
      "Building AI workflows and agents that reduce manual effort and solve meaningful problems.",
    order: 3,
  },
] as const satisfies readonly Principle[];
