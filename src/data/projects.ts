import type { Project } from "@/types";

/**
 * Portfolio projects — engineering journal source of truth.
 *
 * Fill `links` with GitHub / live demo URLs when available.
 * Media + metrics only when verified — do not invent.
 */
export const projects = [
  {
    id: "ai-knowledge-assistant",
    slug: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    summary:
      "RAG over private docs and URLs—LLM answers stay grounded in retrieved sources instead of inventing them.",
    year: "2025",
    featured: true,
    order: 1,
    role: "AI Engineer",
    status: "shipped",
    tags: ["FastAPI", "LangChain", "LangGraph", "Pinecone", "OpenAI"],
    links: [],
    featuredImage: null,
    thumbnail: null,
    caseStudy: {
      problem:
        "General-purpose LLMs answer confidently even without the source material. For private documents and internal URLs, answers must come from the user’s corpus—not model prior knowledge.",
      solution:
        "Built an end-to-end RAG service on FastAPI: ingest documents and URLs, chunk and embed, store vectors in Pinecone, keep app metadata in PostgreSQL, and orchestrate retrieval plus generation with LangChain, LangGraph, and OpenAI.",
      architectureDiagram: null,
      techStack: [
        "Python",
        "FastAPI",
        "LangChain",
        "LangGraph",
        "OpenAI",
        "Pinecone",
        "PostgreSQL",
        "RAG",
      ],
      challenges: [
        "Normalizing files and URLs into one retrieval corpus without losing provenance.",
        "Chunking and retrieval that return enough context without flooding the prompt window.",
        "Control flow that favors retrieved context over unconstrained generation.",
        "Keeping multi-turn chat coherent while re-retrieving when the question shifts.",
      ],
      results: [
        "Private-corpus answers stay tied to retrieved sources instead of unconstrained guesses.",
        "Ingestion, retrieval, and generation are separate stages—each can improve independently.",
        "Graph workflows make retrieval and prompt failures inspectable when debugging.",
      ],
      keyLearnings: [
        "RAG quality is mostly retrieval and chunking discipline, not model choice alone.",
        "Vector stores need clear source metadata or debugging becomes guesswork.",
        "Explicit workflow graphs beat monolithic prompts when failure modes matter.",
        "Inspect what was retrieved before arguing about what was generated.",
      ],
      sections: [
        {
          id: "system",
          title: "System",
          body: "Request → FastAPI → LangGraph workflow → Pinecone retrieval → grounded context → OpenAI generation → response. PostgreSQL for app records; Pinecone for vectors. Stages stay replaceable.",
        },
      ],
      gallery: [],
    },
  },
  {
    id: "vidyasetu-ai-student-assistance",
    slug: "vidyasetu-ai-student-assistance",
    title: "VidyaSetu – AI Student Assistance Platform",
    summary:
      "Gemini-powered student assistant with full-stack modules—admissions, scholarships, and guidance in one AI product surface.",
    year: "2024",
    featured: true,
    order: 2,
    role: "Full-stack engineer",
    status: "shipped",
    tags: ["React", "Node.js", "MongoDB", "Gemini API", "Redux Toolkit"],
    links: [],
    featuredImage: null,
    thumbnail: null,
    caseStudy: {
      problem:
        "Students hunting admissions, scholarships, courses, and department info had to dig through fragmented institutional sites. The same questions repeated; answers stayed hard to find.",
      solution:
        "Built VidyaSetu as a full-stack product: React and Redux Toolkit on the client, Node/Express and MongoDB on the server, Gemini for conversation, plus modules for scholarships, admissions, courses, admin resources, and campus exploration.",
      architectureDiagram: null,
      techStack: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux Toolkit",
        "Tailwind CSS",
        "Gemini API",
      ],
      challenges: [
        "Integrating Gemini into product flows without treating the model as the whole app.",
        "REST APIs that serve both chat and structured module data.",
        "Auth and session boundaries for a student-facing institutional tool.",
        "Client state across chat and multi-module navigation.",
        "Keeping navigation predictable across devices.",
      ],
      results: [
        "Students reach admissions, scholarships, and department resources from one surface.",
        "Chat sits beside durable modules—conversation never has to replace structured content.",
        "Fewer dead ends from hunting across disconnected static pages.",
      ],
      keyLearnings: [
        "Conversational AI works best with durable structured content beside it.",
        "Clear API boundaries keep model calls from leaking into every feature.",
        "Redux Toolkit helps when chat state and module browsing must coexist.",
        "Institutional products need predictable navigation as much as smart answers.",
      ],
      sections: [
        {
          id: "system",
          title: "System",
          body: "React client ↔ Express API ↔ MongoDB; Gemini for conversational turns. Modules share the same backend. Chat is one interface into the product—not a bolted-on bot.",
        },
      ],
      gallery: [],
    },
  },
  {
    id: "ai-pipeline-image-segmentation",
    slug: "ai-pipeline-image-segmentation",
    title: "AI Pipeline for Image Segmentation & Object Analysis",
    summary:
      "Deep-learning image segmentation with IoU/accuracy evaluation—computer-vision quality you can measure, not eyeball.",
    year: "2024",
    featured: true,
    order: 3,
    role: "ML engineer",
    status: "shipped",
    tags: ["Python", "TensorFlow", "CNN", "OpenCV", "Computer Vision"],
    links: [],
    featuredImage: null,
    thumbnail: null,
    caseStudy: {
      problem:
        "Visual analysis needs object location, not only class labels. Weak segmentation poisons everything downstream. The pipeline had to segment, analyze, and prove quality with standard metrics.",
      solution:
        "Built a Python/TensorFlow CNN pipeline with OpenCV and NumPy for preprocessing, then evaluated with Intersection-over-Union (IoU) and classification accuracy so model changes could be compared rigorously.",
      architectureDiagram: null,
      techStack: [
        "Python",
        "TensorFlow",
        "CNN",
        "Computer Vision",
        "OpenCV",
        "NumPy",
      ],
      challenges: [
        "Preprocessing that stays consistent without destroying signal.",
        "Training segmentation models that balance localization against overfitting.",
        "Hyperparameters that move IoU and accuracy together.",
        "An evaluation loop that surfaces regressions before qualitative review.",
      ],
      results: [
        "Object-level segmentation instead of classification-only output.",
        "Quality anchored on IoU and accuracy—not visual spot-checks alone.",
        "A repeatable train → evaluate loop for model and preprocessing changes.",
      ],
      keyLearnings: [
        "Segmentation quality tracks dataset preparation quality.",
        "IoU exposes localization failures accuracy can hide.",
        "Evaluation discipline speeds iteration more than architecture churn.",
        "Preprocessing belongs as a first-class, versioned stage.",
      ],
      sections: [
        {
          id: "system",
          title: "System",
          body: "Images → OpenCV/NumPy prep → CNN segmentation (TensorFlow) → object analysis → IoU and accuracy evaluation. Metrics close the loop.",
        },
      ],
      gallery: [],
    },
  },
  {
    id: "market-segmentation-analysis",
    slug: "market-segmentation-analysis",
    title: "Market Segmentation Analysis",
    summary:
      "Behavioral data clustered into interpretable groups—so marketing isn’t aimed at an average customer who doesn’t exist.",
    year: "2024",
    featured: false,
    order: 4,
    role: "Data / ML engineer",
    status: "shipped",
    tags: ["Python", "Scikit-learn", "PCA", "K-Means", "Pandas"],
    links: [],
    featuredImage: null,
    thumbnail: null,
    caseStudy: {
      problem:
        "High-dimensional behavior data hides customer groups. Targeting needs interpretable segments—not one fictional average user.",
      solution:
        "Prepared features with Pandas/NumPy, reduced dimensions with PCA, clustered with K-Means, and visualized structure with Matplotlib/Seaborn so segments could be inspected and discussed.",
      architectureDiagram: null,
      techStack: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Matplotlib",
        "Seaborn",
        "PCA",
        "K-Means",
      ],
      challenges: [
        "Choosing features that represent behavior without noise or leakage.",
        "Scaling inputs so distance-based clustering is meaningful.",
        "Picking a cluster count stable enough to interpret.",
        "Turning centroids and plots into segment narratives people can use.",
      ],
      results: [
        "Distinct customer groups surfaced from behavioral data.",
        "Plots that make segment structure inspectable, not black-box.",
        "A clear unsupervised path from raw tables to interpretable segments.",
      ],
      keyLearnings: [
        "PCA helps distance quality and interpretability—it doesn’t replace feature judgment.",
        "Cluster count is a product decision as much as a statistical one.",
        "Visualization is part of the deliverable when stakeholders must trust segments.",
        "Unsupervised pipelines fail quietly without preprocessing checks.",
      ],
      sections: [
        {
          id: "system",
          title: "System",
          body: "Dataset → prep → PCA → K-Means → segment inspection. Output is interpretable groups for targeting—not an online serving model.",
        },
      ],
      gallery: [],
    },
  },
] as const satisfies readonly Project[];
