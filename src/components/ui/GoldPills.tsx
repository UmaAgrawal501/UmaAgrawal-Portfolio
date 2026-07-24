import { cn } from "@/lib/cn";

type GoldPillsProps = {
  items: string[];
  className?: string;
  size?: "sm" | "md";
};

const sizeClass = {
  sm: "px-3.5 py-1.5 text-[0.75rem]",
  md: "px-4 py-2 text-[0.8125rem]",
} as const;

/** Gold-bordered capability / stack pills */
export function GoldPills({ items, className, size = "md" }: GoldPillsProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex list-none flex-wrap gap-2.5 p-0", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-full border border-accent/65 bg-[rgba(127,199,196,0.08)] font-medium leading-none text-accent",
            sizeClass[size],
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
