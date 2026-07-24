import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

type SocialIconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

/** Minimal monochrome marks — contact only. */
export function SocialIcon({ name, className, ...props }: SocialIconProps) {
  const shared = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: cn("size-5 shrink-0", className),
    ...props,
  };

  switch (name) {
    case "email":
      return (
        <svg {...shared}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...shared} fill="currentColor" stroke="none">
          <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 6.5 4.75a1.75 1.75 0 0 1 0 3.5zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 12.9 13.6a2.5 2.5 0 0 0-.1.73V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.93 3.36 3.76z" />
        </svg>
      );
    case "github":
      return (
        <svg {...shared} fill="currentColor" stroke="none">
          <path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.98 3.23 9.2 7.7 10.69.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 .1.72 1.72 2.7 1.22.08-.7.39-1.17.71-1.44-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 2.82-.38c.96 0 1.92.13 2.82.38 2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.77.54A11.02 11.02 0 0 0 23.25 11.76C23.25 5.48 18.27.5 12 .5z" />
        </svg>
      );
    case "resume":
      return (
        <svg {...shared}>
          <path d="M7 3.75h7.5L19 8.25v12A1.75 1.75 0 0 1 17.25 22H7A1.75 1.75 0 0 1 5.25 20.25V5.5A1.75 1.75 0 0 1 7 3.75Z" />
          <path d="M14.5 3.75V8h4.5M8.5 12.5h7M8.5 16h5" />
        </svg>
      );
    default:
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.8 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.8-3.8-9s1.3-6.3 3.8-9Z" />
        </svg>
      );
  }
}
