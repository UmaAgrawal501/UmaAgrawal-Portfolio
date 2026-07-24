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
      "Building production AI features that help businesses automate workflows, retrieve the right information, and integrate intelligent systems into existing products. My work spans conversational AI, retrieval-augmented generation, backend services, and multi-agent workflows designed for reliability and real-world use.",
    highlights: [
      "Built a production SMS AI assistant using FastAPI and LangGraph with intent classification, multi-turn conversations, and multi-user session management.",
      "Designed multi-agent workflows for lead qualification and automated response generation, integrating AI services with existing .NET applications and CRM platforms.",
      "Improved retrieval quality and prompt strategies to keep AI responses grounded in user context across real production workloads.",
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
    role: "Machine Learning Intern",
    startDate: "Aug 2024",
    endDate: "Feb 2025",
    summary:
      "Worked on applied machine learning projects focused on turning data into practical insights—from computer vision pipelines to customer segmentation models using real-world datasets.",
    highlights: [
      "Built deep learning pipelines for image segmentation and object analysis using modern computer vision techniques.",
      "Applied clustering algorithms to identify meaningful customer segments from real-world datasets.",
      "Explored feature engineering, model evaluation, and data visualization to improve model performance and support data-driven decisions.",
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
