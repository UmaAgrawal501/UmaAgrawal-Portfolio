import { NextResponse } from "next/server";
import { generatePortfolioAnswer } from "@/lib/portfolio-ai/gemini";
import { checkRateLimit } from "@/lib/portfolio-ai/rate-limit";
import { formatContext, retrieveChunks } from "@/lib/portfolio-ai/retrieve";
import type { PortfolioAIResponse } from "@/lib/portfolio-ai/types";

export const runtime = "nodejs";

const MAX_QUESTION_LENGTH = 500;

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "local";
}

export async function POST(req: Request) {
  const limited = checkRateLimit(clientKey(req), 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const question =
    typeof body === "object" &&
    body !== null &&
    "question" in body &&
    typeof (body as { question: unknown }).question === "string"
      ? (body as { question: string }).question.trim()
      : "";

  if (!question) {
    return NextResponse.json(
      { error: "Please enter a question." },
      { status: 400 },
    );
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `Question must be under ${MAX_QUESTION_LENGTH} characters.` },
      { status: 400 },
    );
  }

  if (!process.env.GEMINI_API_KEY?.trim()) {
    return NextResponse.json(
      { error: "Portfolio AI is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const chunks = retrieveChunks(question, 6);
    const answer = await generatePortfolioAnswer({
      question,
      context: formatContext(chunks),
    });

    const seen = new Set<string>();
    const sources = chunks
      .filter((c) => {
        const key = c.source;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 4)
      .map((c) => ({
        id: c.id,
        title: c.title,
        source: c.source,
        href: c.href,
      }));

    const payload: PortfolioAIResponse = { answer, sources };
    return NextResponse.json(payload);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong";
    console.error("[portfolio-ai]", message);
    return NextResponse.json(
      {
        error:
          "Could not get an answer right now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}
