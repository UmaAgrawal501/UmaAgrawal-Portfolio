import type { NavItem } from "@/types";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
};

export function NavLink({ item, active, onNavigate, className }: NavLinkProps) {
  return (
    <a
      href={item.href}
      aria-current={active ? "location" : undefined}
      onClick={onNavigate}
      className={cn(
        "relative inline-flex min-h-11 items-center rounded-full px-3 type-body-sm no-underline transition-colors duration-200",
        active
          ? "font-medium text-accent-hover"
          : "font-normal text-text-secondary hover:text-text-primary",
        className,
      )}
    >
      {item.label}
    </a>
  );
}
