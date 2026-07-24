import type { TechCategory } from "@/types";

/**
 * Tech stack from resume Skills section (primary source of truth).
 *
 * CONFLICT TO RESOLVE:
 * Your brief also listed JavaScript, C++, React, Next.js, Tailwind CSS,
 * Node.js, Express.js, MongoDB, MySQL, Chroma, Qdrant, and Docker.
 * Those are NOT on the resume Skills list, so they were omitted.
 * Confirm which extras (if any) should be added.
 */
export const techStack = [
  {
    id: "programming",
    title: "Programming",
    order: 1,
    items: [
      { name: "Python" },
      { name: "SQL" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    id: "ai-genai",
    title: "AI / GenAI",
    order: 2,
    items: [
      { name: "RAG" },
      { name: "LLM Applications" },
      { name: "Prompt Engineering" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "Conversational AI" },
    ],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    order: 3,
    items: [
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "Webhooks" },
      { name: "Supabase Edge Functions" },
      { name: "API Integration" },
    ],
  },
  {
    id: "ai-integrations",
    title: "AI Integrations",
    order: 4,
    items: [
      { name: "OpenAI" },
      { name: "Gemini" },
      { name: "LiveAvatar" },
      { name: "HeyGen" },
      { name: "Tavus" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    order: 5,
    items: [
      { name: "PostgreSQL" },
      { name: "SQLite" },
      { name: "ChromaDB" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    order: 6,
    items: [
      { name: "Git" },
      { name: "Supabase" },
      { name: "Environment Configuration" },
    ],
  },
] as const satisfies readonly TechCategory[];
