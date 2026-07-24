import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-text-inverse hover:bg-accent-hover focus-visible:outline-focus",
  secondary:
    "bg-transparent text-text-primary border border-border-strong hover:border-accent hover:bg-surface-raised focus-visible:outline-focus",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-raised focus-visible:outline-focus",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 type-body-sm",
  md: "h-11 px-5 type-body-sm",
  lg: "h-12 px-6 type-body",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
    external?: never;
    download?: never;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  /** Opens in a new tab with noopener noreferrer */
  external?: boolean;
  /**
   * Native download behavior.
   * Pass `true` or a filename string. Forces an `<a>` (not next/link).
   */
  download?: boolean | string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ease-[var(--ease-out-expo)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    variantClass[variant],
    sizeClass[size],
    className,
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, download } = props;
    const downloadAttr =
      download === undefined || download === false
        ? undefined
        : download === true
          ? true
          : download;

    if (
      external ||
      downloadAttr !== undefined ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...(downloadAttr !== undefined ? { download: downloadAttr } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const { type = "button", ...rest } = buttonProps;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
