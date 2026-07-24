import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import {
  siDotenv,
  siFastapi,
  siGit,
  siGooglegemini,
  siHtml5,
  siMongodb,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siRedux,
  siScikitlearn,
  siSqlite,
  siSupabase,
  siTensorflow,
  siTypescript,
} from "simple-icons";

import { cn } from "@/lib/cn";

type TechIconProps = {
  name: string;
  className?: string;
};

type IconDef =
  | { kind: "brand"; icon: SimpleIcon; fill?: string }
  | { kind: "custom"; hex: string; path: string }
  | { kind: "mark"; hex: string; label: string }
  | { kind: "image"; src: string };

/** Official OpenAI bloom path (removed from Simple Icons). */
const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.1412.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3882.6767l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6766 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.1412-.0852-4.783-2.7622a.7834.7834 0 0 0-.7854 0L9.409 9.2297V6.8974a.0852.0852 0 0 1 .0332-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

/**
 * Map skill labels → real brand marks (Simple Icons), provided PNGs,
 * or short lettermarks when no official brand logo exists.
 */
const SKILL_ICON_MAP: Record<string, IconDef> = {
  python: { kind: "brand", icon: siPython },
  sql: { kind: "mark", hex: "4479A1", label: "SQL" },
  typescript: { kind: "brand", icon: siTypescript },
  html: { kind: "brand", icon: siHtml5 },
  css: { kind: "image", src: "/icons/css.png" },
  react: { kind: "brand", icon: siReact },
  "node.js": { kind: "brand", icon: siNodedotjs },
  node: { kind: "brand", icon: siNodedotjs },
  mongodb: { kind: "brand", icon: siMongodb },
  redux: { kind: "brand", icon: siRedux },
  "redux toolkit": { kind: "brand", icon: siRedux },
  tensorflow: { kind: "brand", icon: siTensorflow },
  opencv: { kind: "brand", icon: siOpencv },
  pandas: { kind: "brand", icon: siPandas },
  numpy: { kind: "brand", icon: siNumpy },
  "scikit-learn": { kind: "brand", icon: siScikitlearn },
  sklearn: { kind: "brand", icon: siScikitlearn },

  rag: { kind: "mark", hex: "A855F7", label: "RAG" },
  "llm applications": { kind: "mark", hex: "C084FC", label: "LLM" },
  "prompt engineering": { kind: "mark", hex: "E879F9", label: "PE" },
  langchain: { kind: "image", src: "/icons/langchain.png" },
  langgraph: { kind: "image", src: "/icons/langgraph.png" },
  "conversational ai": { kind: "mark", hex: "818CF8", label: "CAI" },
  cnn: { kind: "mark", hex: "FF6F00", label: "CNN" },
  "computer vision": { kind: "mark", hex: "5C3EE8", label: "CV" },
  "machine learning": { kind: "mark", hex: "F59E0B", label: "ML" },
  "data structures": { kind: "mark", hex: "6366F1", label: "DS" },
  pca: { kind: "mark", hex: "F59E0B", label: "PCA" },
  "k-means": { kind: "mark", hex: "EF4444", label: "KM" },

  fastapi: { kind: "brand", icon: siFastapi },
  "rest apis": { kind: "mark", hex: "38BDF8", label: "REST" },
  webhooks: { kind: "mark", hex: "22D3EE", label: "WH" },
  "supabase edge functions": { kind: "brand", icon: siSupabase },
  "api integration": { kind: "image", src: "/icons/api.png" },

  openai: { kind: "custom", hex: "10A37F", path: OPENAI_PATH },
  gemini: { kind: "brand", icon: siGooglegemini },
  "gemini api": { kind: "brand", icon: siGooglegemini },
  liveavatar: { kind: "image", src: "/icons/liveavatar.png" },
  heygen: { kind: "image", src: "/icons/heygen.png" },
  tavus: { kind: "image", src: "/icons/tavus.png" },

  postgresql: { kind: "brand", icon: siPostgresql },
  sqlite: { kind: "brand", icon: siSqlite },
  pinecone: {
    kind: "custom",
    hex: "1B17FF",
    path: "M12 1.5 3.5 16.2h4.1L12 8.1l4.4 8.1h4.1L12 1.5zm-3.2 16.3h6.4V22.5H8.8z",
  },
  chromadb: { kind: "mark", hex: "FF6B35", label: "CDB" },
  chroma: { kind: "mark", hex: "FF6B35", label: "CDB" },

  git: { kind: "brand", icon: siGit },
  supabase: { kind: "brand", icon: siSupabase },
  "environment configuration": { kind: "brand", icon: siDotenv },
};

export function TechIcon({ name, className }: TechIconProps) {
  const def = resolveIcon(name);

  if (def.kind === "image") {
    return (
      <Image
        src={def.src}
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
        className={cn("size-6 shrink-0 object-contain", className)}
      />
    );
  }

  if (def.kind === "mark") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-6 min-w-6 items-center justify-center rounded-[0.35rem] px-1 text-[0.62rem] font-bold leading-none tracking-tight text-white",
          className,
        )}
        style={{ backgroundColor: `#${def.hex}` }}
      >
        {def.label}
      </span>
    );
  }

  const hex =
    def.kind === "brand" ? (def.fill ?? def.icon.hex) : def.hex;
  const path = def.kind === "brand" ? def.icon.path : def.path;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
      fill={`#${hex}`}
    >
      <path d={path} />
    </svg>
  );
}

/** Icon pill with hover skill name — safe inside links (no nested buttons). */
export function TechIconPill({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={cn("group/tech relative inline-flex", className)}>
      <span
        aria-label={name}
        className="inline-flex size-9 items-center justify-center rounded-xl border border-border-strong bg-background/60 transition-[border-color,box-shadow,transform] duration-200 group-hover/tech:-translate-y-0.5 group-hover/tech:border-accent group-hover/tech:glow-accent-sm"
      >
        <TechIcon name={name} className="size-5" />
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-[calc(100%+0.35rem)] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface-raised px-2 py-1 text-[0.65rem] font-medium text-text-primary opacity-0 shadow-lg transition-opacity duration-150 group-hover/tech:opacity-100"
      >
        {name}
      </span>
    </span>
  );
}

function resolveIcon(name: string): IconDef {
  const key = name.toLowerCase().trim();
  if (SKILL_ICON_MAP[key]) return SKILL_ICON_MAP[key];

  if (key.includes("python")) return SKILL_ICON_MAP.python;
  if (key.includes("typescript")) return SKILL_ICON_MAP.typescript;
  if (key.includes("postgres")) return SKILL_ICON_MAP.postgresql;
  if (key.includes("sqlite")) return SKILL_ICON_MAP.sqlite;
  if (key.includes("fastapi")) return SKILL_ICON_MAP.fastapi;
  if (key.includes("supabase")) return SKILL_ICON_MAP.supabase;
  if (key.includes("langchain")) return SKILL_ICON_MAP.langchain;
  if (key.includes("langgraph")) return SKILL_ICON_MAP.langgraph;
  if (key.includes("openai")) return SKILL_ICON_MAP.openai;
  if (key.includes("gemini")) return SKILL_ICON_MAP.gemini;
  if (key.includes("pinecone")) return SKILL_ICON_MAP.pinecone;
  if (key.includes("chroma")) return SKILL_ICON_MAP.chromadb;
  if (key.includes("heygen")) return SKILL_ICON_MAP.heygen;
  if (key.includes("tavus")) return SKILL_ICON_MAP.tavus;
  if (key.includes("liveavatar") || key.includes("live avatar")) {
    return SKILL_ICON_MAP.liveavatar;
  }
  if (key.includes("react")) return SKILL_ICON_MAP.react;
  if (key.includes("node")) return SKILL_ICON_MAP["node.js"];
  if (key.includes("mongo")) return SKILL_ICON_MAP.mongodb;
  if (key.includes("redux")) return SKILL_ICON_MAP.redux;
  if (key.includes("tensorflow")) return SKILL_ICON_MAP.tensorflow;
  if (key.includes("opencv")) return SKILL_ICON_MAP.opencv;
  if (key.includes("pandas")) return SKILL_ICON_MAP.pandas;
  if (key.includes("numpy")) return SKILL_ICON_MAP.numpy;
  if (key.includes("scikit") || key.includes("sklearn")) {
    return SKILL_ICON_MAP["scikit-learn"];
  }
  if (key.includes("computer vision")) return SKILL_ICON_MAP["computer vision"];
  if (key.includes("machine learning")) return SKILL_ICON_MAP["machine learning"];
  if (key.includes("data structures")) return SKILL_ICON_MAP["data structures"];
  if (key === "cnn") return SKILL_ICON_MAP.cnn;
  if (key === "html" || key.startsWith("html")) return SKILL_ICON_MAP.html;
  if (key === "css" || key.startsWith("css")) return SKILL_ICON_MAP.css;
  if (key.includes("git")) return SKILL_ICON_MAP.git;

  return { kind: "mark", hex: "71717A", label: name.slice(0, 3).toUpperCase() };
}
