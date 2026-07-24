import type { Experience } from "@/types";

/**
 * Experience — verified from LinkedIn / resume. No invented metrics.
 *
 * Official title at Amplework is Junior Associate Software Developer;
 * portfolio role emphasizes the AI systems work owned in that seat.
 */
export const experience = [
  {
    id: "amplework-junior-associate",
    kind: "work",
    company: "Amplework Software Pvt. Ltd.",
    role: "AI Systems Developer",
    startDate: "Jun 2025",
    endDate: "Present",
    location: "Jaipur, Rajasthan",
    summary:
      "Own LLM features in live customer workflows—conversational agents, retrieval grounding, and the APIs that connect them to existing product systems.",
    highlights: [
      "Shipped a production SMS AI assistant on FastAPI and LangGraph: intent classification, multi-turn dialogue, and multi-user session tracking (SQLite).",
      "Designed LangChain/LangGraph multi-agent flows for lead handling and response generation, then integrated them with .NET backends and CRM systems.",
      "Iterated RAG-style grounding and prompts so LLM answers stay tied to context under concurrent real-user load.",
    ],
    skillsUsed: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "SQLite",
      "OpenAI",
    ],
    order: 1,
  },
  {
    id: "feynn-labs-ml",
    kind: "work",
    company: "Feynn Labs",
    role: "Machine Learning (Data Science)",
    startDate: "Aug 2024",
    endDate: "Feb 2025",
    summary:
      "Built and evaluated machine learning solutions on real-world datasets—from preprocessing and feature engineering through training, evaluation, and insight.",
    highlights: [
      "Developed ML solutions with data preprocessing, feature engineering, model training, and evaluation on real-world datasets.",
      "Built an AI pipeline for image segmentation and object analysis using deep learning computer-vision workflows.",
      "Conducted market segmentation analysis with clustering techniques and supported decisions with EDA and visualization.",
    ],
    skillsUsed: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
    ],
    order: 2,
  },
] as const satisfies readonly Experience[];
