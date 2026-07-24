import type { Experience } from "@/types";

/**
 * Education — verified graduation only. No invented GPA, awards, or rankings.
 */
export const education = [
  {
    id: "anand-ice-btech",
    kind: "education",
    company: "Anand International College of Engineering",
    role: "B.Tech CSE (AI)",
    startDate: "2021",
    endDate: "2025",
    location: "Jaipur, Rajasthan",
    summary:
      "Undergraduate focus on computer science with an artificial intelligence specialization—foundations for building LLM products and applied ML systems.",
    highlights: [
      "Core coursework in programming, algorithms, databases, and AI/ML foundations.",
      "Specialization track in artificial intelligence within Computer Science & Engineering.",
      "Foundation for shipping production AI features—agents, retrieval, and backend systems.",
    ],
    skillsUsed: ["Python", "Machine Learning", "Data Structures", "SQL"],
    order: 3,
  },
] as const satisfies readonly Experience[];
