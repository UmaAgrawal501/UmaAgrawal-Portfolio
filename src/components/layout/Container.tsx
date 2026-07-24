import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerWidth = "full" | "shell" | "prose" | "hero" | "narrow";

const widthClass: Record<ContainerWidth, string> = {
  /** Full bleed within page gutters — no max width */
  full: "max-w-none",
  /** Primary layout shell — 1200px */
  shell: "max-w-[var(--container-shell)]",
  /** Reading / about / case study measure — 680px */
  prose: "max-w-[var(--container-prose)]",
  /** Hero supporting copy — 640px */
  hero: "max-w-[var(--container-hero-support)]",
  /** Tight measure for short statements — 480px */
  narrow: "max-w-[30rem]",
};

type ContainerProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  children,
  className,
  width = "shell",
  as,
  ...rest
}: ContainerProps<T>) {
  const Tag = as ?? "div";

  return (
    <Tag
      className={cn(
        "mx-auto w-full min-w-0 max-w-full px-5 sm:px-8",
        widthClass[width],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
