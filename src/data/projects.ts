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
    title: "Enterprise Knowledge Assistant",
    summary:
      "Production-ready conversational AI system powered by Retrieval-Augmented Generation (RAG), enabling grounded responses over private knowledge bases through semantic search and LLM reasoning.",
    year: "2025",
    featured: true,
    order: 1,
    role: "AI Engineer",
    status: "shipped",
    cardLabel: "Production RAG System",
    cardTags: [
      "Retrieval-Augmented Generation",
      "Grounded Responses",
      "Semantic Search",
    ],
    tags: ["FastAPI", "LangChain", "LangGraph", "OpenAI", "ChromaDB", "Python"],
    links: [],
    featuredImage: null,
    thumbnail: {
      src: "/projects/ai-knowledge-assistant/chat-ui.png",
      alt: "Enterprise Knowledge Assistant chat interface",
    },
    caseStudy: {
      category: "Production AI System · Retrieval-Augmented Generation (RAG)",
      problem:
        "General-purpose LLMs struggle with organization-specific knowledge and often generate inaccurate responses when working without external context. The objective was to design an AI assistant capable of retrieving relevant information from indexed documents before generating answers, ensuring reliable and trustworthy responses.",
      solution:
        "Designed a modular RAG architecture where retrieval and generation are separated into independent components. Backend services run on FastAPI; retrieval pipelines use LangChain; multi-step workflows are orchestrated with LangGraph; LLM APIs generate grounded answers from retrieved context.",
      architectureDiagram: null,
      techStack: [
        "FastAPI",
        "LangChain",
        "LangGraph",
        "OpenAI",
        "ChromaDB",
        "Python",
      ],
      challenges: [
        "Grounding Responses — Designed retrieval-first workflows to keep generated answers tied to relevant document context instead of relying solely on model knowledge.",
        "Retrieval Quality — Balanced retrieval depth with prompt size by selecting only the most relevant document chunks before generation.",
        "Prompt Engineering — Structured prompts to improve consistency, reduce hallucinations, and maintain response quality across different question types.",
        "Modular Architecture — Separated ingestion, retrieval, orchestration, and generation into reusable components, simplifying maintenance and future expansion.",
        "Scalability — Designed the backend around reusable APIs and modular AI services, making it straightforward to support additional knowledge sources and workflows.",
      ],
      results: [
        "Retrieval-Augmented Generation (RAG)",
        "Semantic Document Search",
        "Context-Aware Question Answering",
        "Grounded AI Responses",
        "Multi-Step AI Workflows",
        "FastAPI REST APIs",
        "Modular AI Architecture",
        "Production-Oriented Backend Design",
      ],
      keyLearnings: [
        "Building production AI systems requires much more than integrating an LLM API. Retrieval quality, prompt engineering, workflow orchestration, and system architecture have a greater impact on reliability than model selection alone. This project reinforced the importance of designing AI systems that are modular, observable, and built for real-world use.",
      ],
      cta: "Interested in the architecture or implementation details? Feel free to reach out—I'm always happy to discuss AI systems, RAG pipelines, and production LLM engineering.",
      sections: [
        {
          id: "role",
          title: "My Role",
          items: [
            "Designed the end-to-end RAG architecture.",
            "Developed backend services using FastAPI.",
            "Built retrieval pipelines with LangChain.",
            "Orchestrated multi-step AI workflows using LangGraph.",
            "Integrated LLM APIs for grounded question answering.",
            "Optimized prompt construction and retrieval flow for response quality.",
          ],
        },
        {
          id: "architecture",
          title: "Architecture",
          body: "The system follows a modular AI architecture where retrieval and generation are separated into independent components, allowing each stage to be optimized and scaled individually.",
          image: {
            src: "/projects/ai-knowledge-assistant/system-architecture.png",
            alt: "System Architecture — User to FastAPI to Retriever to Vector Database to LLM to Grounded Response",
          },
        },
        {
          id: "request-flow",
          title: "Request Flow",
          body: "Every request follows a retrieval-first workflow:",
          items: [
            "User submits a question.",
            "Query is converted into vector embeddings.",
            "Similar document chunks are retrieved from the vector database.",
            "Retrieved context is injected into the prompt.",
            "The LLM generates a grounded response.",
            "FastAPI returns the final answer.",
          ],
          image: {
            src: "/projects/ai-knowledge-assistant/request-lifecycle.png",
            alt: "Request Lifecycle sequence diagram for the AI knowledge system",
          },
        },
        {
          id: "rag-pipeline",
          title: "Retrieval-Augmented Generation Pipeline",
          body: "The retrieval pipeline ensures the language model always has access to relevant knowledge before generating an answer, improving factual accuracy and reducing hallucinations.",
          image: {
            src: "/projects/ai-knowledge-assistant/rag-pipeline.png",
            alt: "Retrieval-Augmented Generation Pipeline from documents to grounded answer",
          },
        },
        {
          id: "multi-agent",
          title: "Multi-Agent Workflow",
          body: "Stateful multi-step orchestration coordinates planner, retriever, reasoning, and response agents so complex questions move through inspectable stages instead of a single opaque prompt.",
          image: {
            src: "/projects/ai-knowledge-assistant/multi-agent-workflow.png",
            alt: "Multi-Agent Workflow from user request to final answer",
          },
        },
        {
          id: "ux",
          title: "User Experience",
          body: "The assistant provides a conversational interface where responses are generated from retrieved knowledge rather than relying solely on the model's internal memory. Retrieved context remains transparent throughout the interaction, improving trust and explainability.",
          image: {
            src: "/projects/ai-knowledge-assistant/chat-ui.png",
            alt: "Chat UI with grounded response and retrieved context panel",
          },
        },
        {
          id: "decisions",
          title: "Key Engineering Decisions",
          items: [
            "FastAPI — Chosen for its asynchronous request handling, lightweight architecture, and suitability for production AI APIs.",
            "LangChain — Used to orchestrate retrieval, prompt construction, and interactions between language models and external tools.",
            "LangGraph — Implemented to manage stateful, multi-step AI workflows and agent orchestration.",
            "Retrieval-Augmented Generation — Adopted a retrieval-first architecture to improve factual accuracy by grounding responses in relevant document context before generation.",
          ],
        },
        {
          id: "metadata",
          title: "Project Metadata",
          items: [
            "Duration: Jun 2025 – Present",
            "Role: AI Engineer",
            "Status: Production Project",
            "Repository: Private (Client Project)",
          ],
        },
      ],
      gallery: [],
    },
  },
  {
    id: "text-intelligence-sentiment-analysis",
    slug: "text-intelligence-sentiment-analysis",
    title: "Text Intelligence & Sentiment Analysis",
    cardSummary:
      "Built an NLP pipeline that analyzes textual content to identify sentiment and emotional tone using Python and NLTK. The project focuses on text preprocessing, lexical analysis, and sentiment classification to transform unstructured text into meaningful insights.",
    summary:
      "Built an NLP pipeline that analyzes textual content to identify sentiment and emotional tone using Python and NLTK. The project focuses on text preprocessing, lexical analysis, and sentiment classification to transform unstructured text into meaningful insights.",
    year: "2024",
    featured: true,
    order: 2,
    role: "ML Engineer",
    status: "shipped",
    cardLabel: "NLP · Sentiment Analysis",
    cardTags: ["Natural Language Processing", "Text Preprocessing", "Sentiment Classification"],
    tags: ["Python", "NLTK", "Pandas", "NumPy", "Matplotlib"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/UmaAgrawal501/Sentiment_Analysis-Project",
        external: true,
      },
    ],
    featuredImage: {
      src: "/projects/sentiment-analysis/hero-imac.png",
      alt: "Sentiment Analysis dashboard displayed on desktop — positive prediction with keywords and pipeline status",
    },
    thumbnail: {
      src: "/projects/sentiment-analysis/hero-imac.png",
      alt: "Text Intelligence & Sentiment Analysis dashboard",
    },
    caseStudy: {
      category: "Natural Language Processing · Sentiment Analysis",
      overview:
        "Understanding customer opinions, reviews, and social media conversations is essential for making informed decisions. This project explores how Natural Language Processing (NLP) can automatically analyze textual data to determine whether the underlying sentiment is positive, negative, or neutral.\n\nThe system processes raw text through multiple preprocessing stages before applying sentiment analysis techniques to produce interpretable results.",
      problem:
        "Large volumes of textual feedback are difficult to analyze manually. Businesses need an automated way to understand customer opinions and identify overall sentiment without reading every message individually.\n\nThe challenge was to design a pipeline capable of cleaning noisy text and extracting meaningful sentiment information.",
      solution:
        "A sentiment analysis workflow was developed using Python and NLTK. The pipeline performs text cleaning, tokenization, stop-word removal, and lexical analysis before classifying the sentiment of each input sentence.\n\nThe project demonstrates the complete NLP workflow from raw text to interpretable sentiment output.",
      architectureDiagram: null,
      techStack: ["Python", "NLTK", "Pandas", "NumPy", "Matplotlib"],
      challengesHeading: "Challenges",
      resultsHeading: "Technical Highlights",
      learningsHeading: "Key Learnings",
      challenges: [
        "Natural language is often ambiguous, containing slang, abbreviations, and contextual meanings that are difficult to interpret using rule-based methods. Designing an effective preprocessing pipeline was essential for improving classification quality.",
        "The project also highlighted the limitations of lexicon-based sentiment analysis compared to modern transformer-based approaches.",
      ],
      results: [
        "Developed using Python and NLTK.",
        "Implemented text preprocessing and normalization techniques.",
        "Performed tokenization and stop-word removal.",
        "Used an emotion lexicon for sentiment identification.",
        "Classified textual input into sentiment categories.",
        "Generated visual summaries for easier interpretation.",
      ],
      keyLearnings: [
        "This project strengthened my understanding of Natural Language Processing fundamentals, including text preprocessing, lexical analysis, and sentiment classification. It also provided practical experience in preparing unstructured text for machine learning and analytics workflows.",
      ],
      sections: [
        {
          id: "nlp-workflow",
          title: "NLP Processing Workflow",
          body: "The processing pipeline consists of text input, cleaning, tokenization, stop-word removal, emotion dictionary matching, sentiment classification, and result generation.",
          items: [
            "Text Input",
            "Text Cleaning",
            "Tokenization",
            "Stop-word Removal",
            "Emotion Dictionary Matching",
            "Sentiment Classification",
            "Result Generation",
          ],
          image: {
            src: "/projects/sentiment-analysis/nlp-workflow.png",
            alt: "NLP processing workflow from raw text through cleaning, tokenization, and sentiment classification to business insight",
          },
        },
        {
          id: "text-preprocessing",
          title: "Text Preprocessing",
          body: "Before sentiment analysis, every sentence passes through several preprocessing steps to improve accuracy.\n\nProper preprocessing significantly improves the quality of sentiment classification.",
          items: [
            "Removing punctuation",
            "Converting text to lowercase",
            "Tokenization",
            "Removing stop words",
            "Normalizing text",
            "Preparing tokens for lexical analysis",
          ],
          image: {
            src: "/projects/sentiment-analysis/text-preprocessing.png",
            alt: "NLP processing workflow with TF-IDF feature extraction and model output summary",
          },
        },
        {
          id: "dashboard",
          title: "Sentiment Analysis Dashboard",
          body: "The final output summarizes sentiment predictions in a simple analytical interface, making it easier to interpret large collections of textual data.\n\nVisualizations provide a quick overview of sentiment distribution and help identify overall trends within the dataset.",
          image: {
            src: "/projects/sentiment-analysis/dashboard.png",
            alt: "Sentiment analysis dashboard showing customer feedback, positive prediction, keywords, and inference pipeline",
          },
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
      "An end-to-end computer vision pipeline that combines instance segmentation, object detection, feature extraction, and information analysis to transform raw images into structured, machine-readable insights. Built with Python, TensorFlow, OpenCV, and Mask R-CNN to automate visual understanding and generate contextual outputs from complex images.",
    year: "2024",
    featured: true,
    order: 3,
    role: "ML Engineer",
    status: "shipped",
    cardLabel: "Computer Vision Pipeline",
    cardTags: [
      "Instance Segmentation",
      "Object Detection",
      "Feature Extraction",
    ],
    tags: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "Mask R-CNN",
      "NumPy",
      "Pandas",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/UmaAgrawal501/Building-an-AI-Pipeline-for-Image-Segmentation-and-Object-Analysis",
        external: true,
      },
    ],
    featuredImage: {
      src: "/projects/ai-pipeline-image-segmentation/hero-dashboard.png",
      alt: "AI computer vision dashboard with segmentation masks, pipeline stages, and analytics",
    },
    thumbnail: {
      src: "/projects/ai-pipeline-image-segmentation/hero-dashboard.png",
      alt: "AI Pipeline for Image Segmentation dashboard",
    },
    caseStudy: {
      category: "Computer Vision · Instance Segmentation · Object Analysis",
      problem:
        "Understanding an image requires much more than detecting objects. Modern AI systems must identify visual elements, analyze relationships between them, extract meaningful information, and convert those findings into structured data that downstream applications can use.\n\nThe goal of this project was to design a modular AI pipeline capable of performing the complete journey—from raw image ingestion to structured information generation—using deep learning–based computer vision techniques.",
      solution:
        "The system processes every image through multiple stages, including preprocessing, instance segmentation, object detection, feature extraction, and contextual analysis.\n\nRather than returning only detected objects, the pipeline enriches each prediction with additional information, making the output useful for reporting, analytics, and AI-assisted decision-making.",
      architectureDiagram: null,
      techStack: [
        "Python",
        "TensorFlow",
        "OpenCV",
        "Mask R-CNN",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "NLTK",
      ],
      challenges: [],
      results: [],
      keyLearnings: [],
      sections: [
        {
          id: "architecture",
          title: "Architecture",
          body: "The architecture follows a modular design where each stage is responsible for a single processing task. This separation allows individual components to be improved or replaced without affecting the rest of the pipeline, making the system easier to maintain and extend.\n\nFlow: Input Image → Image Preprocessing → Mask R-CNN Segmentation → Object Detection → Feature Extraction → Information Analysis → Structured Output.",
          image: {
            src: "/projects/ai-pipeline-image-segmentation/architecture.png",
            alt: "AI Computer Vision Architecture blueprint — Input, Processing, Inference, and Output layers",
          },
        },
        {
          id: "capabilities",
          title: "Key Capabilities",
          items: [
            "Image Preprocessing — Prepared raw images through normalization, resizing, and enhancement before inference.",
            "Instance Segmentation — Used Mask R-CNN to generate accurate pixel-level masks for each detected object.",
            "Object Detection — Detected and classified multiple objects while preserving spatial information.",
            "Feature Extraction — Extracted visual attributes such as size, position, texture, and appearance for downstream analysis.",
            "Information Analysis — Combined extracted features into structured information describing every detected object.",
            "Structured Output — Generated organized results containing detected objects, confidence scores, metadata, and descriptive summaries.",
          ],
        },
        {
          id: "technologies",
          title: "Technologies",
          items: [
            "Python",
            "TensorFlow",
            "OpenCV",
            "Mask R-CNN",
            "NumPy",
            "Pandas",
            "Matplotlib",
            "NLTK",
          ],
        },
        {
          id: "inference",
          title: "AI Inference",
          body: "After preprocessing, the image is passed through the segmentation model to identify individual objects and generate precise masks.\n\nThe detected objects are then analyzed to extract visual attributes, confidence scores, and contextual information before being compiled into a structured output.\n\nThis stage demonstrates how the pipeline converts raw model predictions into information that can be consumed by other AI systems or business workflows.",
          image: {
            src: "/projects/ai-pipeline-image-segmentation/inference-dashboard.png",
            alt: "AI Vision Lab inference dashboard comparing input detection with mask overlays and analytics",
          },
        },
        {
          id: "vision-comparison",
          title: "Computer Vision Analysis",
          body: "To better understand model behavior, the system visualizes the AI's perception alongside the original image.\n\nThis comparison highlights the segmentation masks, detected regions, and object relationships, making it easier to validate inference quality and interpret model decisions.\n\nPresenting both views also improves explainability by showing not only the final output but how the model understands the scene internally.",
          image: {
            src: "/projects/ai-pipeline-image-segmentation/vision-comparison.png",
            alt: "Original image versus AI perception with Mask R-CNN segmentation overlays and metrics",
          },
        },
        {
          id: "decisions",
          title: "Engineering Decisions",
          body: "During development, the focus was on building a modular and reusable computer vision workflow rather than a collection of isolated scripts.",
          items: [
            "Separating preprocessing, inference, and post-processing into independent stages.",
            "Using Mask R-CNN for instance segmentation to obtain pixel-level localization.",
            "Designing reusable processing components for future model upgrades.",
            "Converting raw detections into structured outputs suitable for downstream applications.",
            "Maintaining a pipeline architecture that supports scalability and extensibility.",
          ],
        },
        {
          id: "outcomes",
          title: "Outcomes",
          body: "The completed pipeline successfully transforms raw image data into structured, machine-readable information through a sequence of AI-driven processing stages.\n\nInstead of producing only visual detections, the system generates enriched outputs that combine segmentation, object analysis, contextual understanding, and structured reporting within a unified workflow.",
        },
        {
          id: "learnings",
          title: "What I Learned",
          body: "Building this project deepened my understanding of modern computer vision systems, instance segmentation, feature extraction, and modular AI architecture.\n\nIt also reinforced the importance of designing AI solutions that generate structured, actionable information rather than raw model predictions, making them more practical for real-world applications.",
        },
      ],
      gallery: [],
    },
  },
  {
    id: "market-segmentation-analysis",
    slug: "market-segmentation-analysis",
    title: "AI-Powered Customer Segmentation Analysis",
    cardSummary:
      "Built an end-to-end machine learning pipeline that segments customers into meaningful groups using PCA and K-Means clustering, enabling data-driven marketing strategies through interactive analytics and business insights.",
    summary:
      "Built an end-to-end machine learning pipeline that segments customers into meaningful groups using PCA and K-Means clustering, enabling data-driven marketing strategies through interactive analytics and business insights.",
    year: "2024",
    featured: true,
    order: 4,
    role: "ML Engineer",
    status: "shipped",
    cardLabel: "Customer Analytics",
    cardTags: ["PCA", "K-Means", "Unsupervised Learning"],
    tags: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Jupyter Notebook",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/UmaAgrawal501/Market_Segmentation_Analysis",
        external: true,
      },
    ],
    featuredImage: {
      src: "/projects/market-segmentation-analysis/analytics-dashboard.png",
      alt: "Customer Segmentation Analysis dashboard with PCA scatter plot and distribution metrics",
    },
    thumbnail: {
      src: "/projects/market-segmentation-analysis/analytics-dashboard.png",
      alt: "Customer Segmentation Analysis dashboard",
    },
    caseStudy: {
      category: "Machine Learning · Customer Analytics · Unsupervised Learning",
      intro:
        "Understanding customer behavior through machine learning is more valuable than simply collecting more data. This project explores how unsupervised learning techniques can uncover meaningful customer segments that support better marketing decisions and personalized customer experiences.",
      overview:
        "Customer datasets often contain dozens of features that make manual analysis difficult. The objective was to build an end-to-end machine learning workflow capable of identifying hidden customer groups based on purchasing behavior and demographic attributes.\n\nThe final system combines data preprocessing, dimensionality reduction, clustering, visualization, and business insight generation into a structured analytics pipeline.",
      problem:
        "Organizations collect large amounts of customer data but often struggle to translate it into actionable strategies.\n\nWithout meaningful segmentation, marketing campaigns become generic, customer retention decreases, and personalization becomes difficult.\n\nThe goal of this project was to discover naturally occurring customer groups using unsupervised machine learning and transform those patterns into practical business recommendations.",
      solution:
        "A complete analytics pipeline was designed to process customer data from raw records through final business insights.\n\nThe workflow includes:\n\n– Data preprocessing\n– Feature engineering\n– Principal Component Analysis (PCA)\n– K-Means clustering\n– Cluster visualization\n– Customer profiling\n– Business recommendation generation\n\nThe resulting clusters provide interpretable customer segments that can support targeted marketing campaigns and product strategies.",
      architectureDiagram: null,
      techStack: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Matplotlib",
        "Seaborn",
        "Jupyter Notebook",
      ],
      challengesHeading: "Challenges",
      resultsHeading: "Technical Highlights",
      learningsHeading: "Key Learnings",
      challenges: [
        "Balancing dimensionality reduction with cluster interpretability — selecting an appropriate number of clusters required iterative experimentation and evaluation to ensure meaningful business segmentation rather than mathematically convenient groups.",
        "Presenting machine learning results in a format understandable by non-technical stakeholders.",
      ],
      results: [
        "Built an end-to-end customer segmentation pipeline using Python and Scikit-learn.",
        "Applied Principal Component Analysis for dimensionality reduction and visualization.",
        "Performed customer clustering using K-Means.",
        "Evaluated clustering quality using quantitative metrics.",
        "Generated visual analytics for cluster interpretation.",
        "Converted model outputs into business-oriented recommendations.",
      ],
      keyLearnings: [
        "Successful machine learning systems are not defined solely by model accuracy but by how effectively insights can be communicated and applied in real business scenarios.",
        "Strengthened practical experience with unsupervised learning, feature engineering, visualization, and analytics storytelling.",
      ],
      sections: [
        {
          id: "workflow",
          title: "System Workflow",
          image: {
            src: "/projects/market-segmentation-analysis/ml-workflow.png",
            alt: "End-to-end machine learning workflow from raw customer data to business insights.",
          },
        },
        {
          id: "pipeline",
          title: "Machine Learning Pipeline",
          body: "The pipeline follows a structured sequence designed for reproducible analysis.",
          items: [
            "Customer data collection",
            "Data cleaning and preprocessing",
            "Feature scaling",
            "Principal Component Analysis",
            "K-Means clustering",
            "Cluster evaluation",
            "Customer profiling",
            "Business insight generation",
          ],
        },
        {
          id: "dimensionality",
          title: "Dimensionality Reduction",
          body: "Principal Component Analysis reduced the feature space while preserving the majority of variance within the dataset. This simplified visualization allowed clearer separation between customer groups and improved cluster interpretability.\n\nThe transformed feature space became the input for K-Means clustering.",
          image: {
            src: "/projects/market-segmentation-analysis/pca-visualization.png",
            alt: "PCA projects high-dimensional customer data into two principal components, making cluster separation easier to interpret.",
          },
        },
        {
          id: "business-insights",
          title: "Business Insights",
          body: "Rather than stopping at cluster generation, the project focuses on translating machine learning outputs into business decisions.\n\nEach customer segment was analyzed based on purchasing behavior, demographics, and engagement patterns to recommend targeted marketing actions such as:\n\n– Premium loyalty campaigns\n– Personalized promotions\n– Retention strategies\n– Cross-selling opportunities\n– Discount optimization\n\nThis demonstrates how machine learning can support real-world decision making beyond predictive modeling.",
          image: {
            src: "/projects/market-segmentation-analysis/business-insights.png",
            alt: "Each discovered customer segment can be translated into practical marketing and retention strategies.",
          },
        },
      ],
      gallery: [],
    },
  },
] as const satisfies readonly Project[];
