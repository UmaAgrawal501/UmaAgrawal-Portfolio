"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { about } from "@/data/about";
import { cn } from "@/lib/cn";
import type { PortfolioAISource } from "@/lib/portfolio-ai/types";

const portraitSrc = about.portrait?.src ?? "/uma-portrait-12x16.jpg";
const portraitAlt = about.portrait?.alt ?? "Uma Agrawal";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: PortfolioAISource[];
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M5 12h12M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PortfolioAI() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey! Curious about Uma's work? Ask about her projects, skills, experience — or how to get in touch.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: q },
    ]);
    setLoading(true);

    try {
      const res = await fetch("/api/portfolio-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = (await res.json()) as {
        answer?: string;
        sources?: PortfolioAISource[];
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.answer || "I couldn't find a clear answer for that.",
          sources: data.sources,
        },
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void ask(input);
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[70] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Ask about Uma"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "pointer-events-auto flex w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-2xl border border-border/90",
              "bg-surface/95 shadow-[0_24px_70px_rgb(0_0_0_/0.5)] backdrop-blur-xl",
              "h-[min(68vh,32rem)]",
            )}
          >
            <header className="flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3">
              <div className="min-w-0">
                <p className="font-display text-[0.9rem] font-semibold tracking-tight text-text-primary">
                  Ask Uma
                </p>
                <p className="mt-0.5 text-[0.6875rem] text-text-tertiary">
                  Projects, skills & experience
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-full text-text-secondary",
                  "transition-colors hover:bg-surface-raised hover:text-text-primary",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                )}
                aria-label="Close chat"
              >
                <CloseIcon className="size-4" />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[0.8125rem] leading-relaxed",
                      m.role === "user"
                        ? "bg-accent text-text-inverse"
                        : "border border-border/70 bg-background/55 text-text-secondary",
                    )}
                  >
                    <p className="whitespace-pre-wrap text-inherit">
                      {m.content}
                    </p>
                    {m.sources && m.sources.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5 border-t border-border/50 pt-2">
                        {m.sources.map((s) =>
                          s.href ? (
                            <Link
                              key={s.id}
                              href={s.href}
                              onClick={() => setOpen(false)}
                              className="rounded-full border border-accent/35 bg-accent/10 px-2 py-0.5 font-mono text-[0.6rem] tracking-wide text-accent no-underline transition-colors hover:border-accent/60 hover:bg-accent/15"
                            >
                              {s.source}
                            </Link>
                          ) : (
                            <span
                              key={s.id}
                              className="rounded-full border border-border/70 px-2 py-0.5 font-mono text-[0.6rem] text-text-tertiary"
                            >
                              {s.source}
                            </span>
                          ),
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-border/70 bg-background/55 px-3.5 py-2.5 text-[0.8125rem] text-text-tertiary">
                    <span className="inline-flex gap-1">
                      <span className="animate-pulse">Thinking</span>
                      <span className="animate-pulse delay-75">.</span>
                      <span className="animate-pulse delay-150">.</span>
                      <span className="animate-pulse delay-200">.</span>
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-t border-border/80 p-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/50 px-2.5 py-1.5 focus-within:border-accent/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills…"
                  maxLength={500}
                  disabled={loading}
                  className="min-w-0 flex-1 bg-transparent px-1.5 py-2 text-[0.8125rem] text-text-primary outline-none placeholder:text-text-tertiary disabled:opacity-60"
                  aria-label="Ask a question"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-text-inverse",
                    "transition-[opacity,transform] hover:opacity-90 active:scale-[0.97]",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                  )}
                  aria-label="Send message"
                >
                  <SendIcon className="size-4" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close chat" : "Ask about Uma"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "pointer-events-auto relative size-12 overflow-hidden rounded-full",
          "border-2 border-accent/70 bg-surface",
          "shadow-[0_12px_36px_rgb(127_199_196_/0.35)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        )}
      >
        <Image
          src={portraitSrc}
          alt={portraitAlt}
          fill
          sizes="48px"
          className="object-cover object-[center_18%]"
          priority={false}
        />
        {open ? (
          <span className="absolute inset-0 flex items-center justify-center bg-background/55 text-text-primary backdrop-blur-[1px]">
            <CloseIcon className="size-5" />
          </span>
        ) : null}
      </motion.button>
    </div>
  );
}
