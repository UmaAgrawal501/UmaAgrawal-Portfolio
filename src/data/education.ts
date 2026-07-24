import type { Experience } from "@/types";

/**
 * Education — verified graduation only. No invented GPA, awards, or rankings.
 */
export const education = [
  {
    id: "anand-ice-btech",
    kind: "education",
    company: "Anand International College of Engineering",
    role: "B.Tech in Computer Science & Engineering (Artificial Intelligence)",
    startDate: "2021",
    endDate: "2025",
    location: "Jaipur, Rajasthan",
    summary:
      "Studied Computer Science with a specialization in Artificial Intelligence, building a strong foundation in software engineering, machine learning, algorithms, and backend systems that continue to shape my approach to developing production AI applications.",
    highlights: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Machine Learning",
      "Artificial Intelligence",
      "Database Systems",
    ],
    skillsUsed: [],
    order: 3,
  },
] as const satisfies readonly Experience[];
