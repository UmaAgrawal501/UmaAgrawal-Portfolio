import { knowledgeChunks } from "./knowledge";
import type { KnowledgeChunk } from "./types";

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "what",
  "who",
  "how",
  "when",
  "where",
  "why",
  "does",
  "did",
  "do",
  "can",
  "could",
  "would",
  "should",
  "about",
  "her",
  "his",
  "she",
  "he",
  "it",
  "this",
  "that",
  "from",
  "into",
  "your",
  "you",
  "me",
  "my",
  "uma",
  "s",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\- ]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  if (queryTokens.length === 0) return 0;

  const hay = `${chunk.title} ${chunk.source} ${chunk.text} ${chunk.keywords.join(" ")}`.toLowerCase();
  const keywordSet = new Set(chunk.keywords.map((k) => k.toLowerCase()));
  let score = 0;

  for (const token of queryTokens) {
    if (keywordSet.has(token)) score += 4;
    if (chunk.title.toLowerCase().includes(token)) score += 3;
    if (chunk.source.toLowerCase().includes(token)) score += 2;
    if (hay.includes(token)) score += 1;

    // Light bigram / phrase boost for multi-word tech names
    for (const kw of keywordSet) {
      if (kw.includes(token) && kw.length > token.length) score += 1;
    }
  }

  return score;
}

export function retrieveChunks(
  query: string,
  topK = 6,
): KnowledgeChunk[] {
  const tokens = tokenize(query);
  const wantsProjects = /\bprojects?\b/i.test(query);

  const ranked = knowledgeChunks
    .map((chunk) => {
      let score = scoreChunk(tokens, chunk);
      if (wantsProjects && chunk.id.includes("project-") && chunk.id.endsWith("-overview")) {
        score += 6;
      }
      if (wantsProjects && chunk.id.startsWith("project-")) {
        score += 2;
      }
      return { chunk, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    // Fallback profile + about + first project overview so Gemini still has grounding
    return knowledgeChunks.slice(0, 4);
  }

  // Prefer diversity across projects for broad project questions
  if (wantsProjects) {
    const picked: KnowledgeChunk[] = [];
    const seenSources = new Set<string>();
    for (const r of ranked) {
      if (!r.chunk.id.startsWith("project-")) continue;
      if (picked.length >= topK) break;
      if (seenSources.has(r.chunk.source)) continue;
      seenSources.add(r.chunk.source);
      picked.push(r.chunk);
    }
    if (picked.length >= Math.min(3, topK)) return picked;
  }

  return ranked.slice(0, topK).map((r) => r.chunk);
}

export function formatContext(chunks: KnowledgeChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] ${c.title} (${c.source}${c.href ? ` · ${c.href}` : ""})\n${c.text}`,
    )
    .join("\n\n---\n\n");
}
