export type KnowledgeChunk = {
  id: string;
  title: string;
  /** Display label for citations */
  source: string;
  /** Site path for citation links when available */
  href?: string;
  text: string;
  keywords: string[];
};

export type PortfolioAISource = {
  id: string;
  title: string;
  source: string;
  href?: string;
};

export type PortfolioAIResponse = {
  answer: string;
  sources: PortfolioAISource[];
};

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};
