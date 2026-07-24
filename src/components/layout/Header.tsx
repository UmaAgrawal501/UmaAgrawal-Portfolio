"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { Container } from "@/components/layout/Container";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/constants/navigation";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

export function Header() {
  const scrolled = useScrolled();
  const activeId = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const portrait = about.portrait;

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };
    closeOnDesktop();
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 transition-[padding] duration-200 lg:pt-4">
      <Container
        className={cn(
          "flex h-14 items-center justify-between gap-4 rounded-full border px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 lg:h-16 lg:px-5",
          scrolled || menuOpen
            ? "border-border/80 bg-background/80 shadow-sm backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#"
          className="flex min-w-0 items-center gap-3 no-underline"
          onClick={closeMenu}
        >
          {portrait ? (
            <Image
              src={portrait.src}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full object-cover portrait-ring"
            />
          ) : (
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/30 text-sm font-semibold text-text-primary">
              {site.name.charAt(0)}
            </span>
          )}
          <span className="type-body-sm truncate font-medium text-text-primary">
            {site.name}
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 items-center gap-1 lg:flex xl:gap-2"
        >
          {navigation.map((item) => (
            <NavLink key={item.id} item={item} active={activeId === item.id} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#contact" size="sm" className="btn-glow rounded-full px-5">
            Contact Me
          </Button>
        </div>

        <button
          type="button"
          className="type-body-sm inline-flex min-h-11 shrink-0 items-center text-text-secondary transition-colors hover:text-text-primary lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </Container>

      <div
        id={menuId}
        className={cn(
          "mx-auto mt-2 max-w-[var(--container-shell)] rounded-2xl border border-border bg-surface/95 backdrop-blur-md lg:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <div className="px-5 py-6">
          <nav aria-label="Primary mobile">
            <ul className="flex flex-col gap-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <NavLink
                    item={item}
                    active={activeId === item.id}
                    onNavigate={closeMenu}
                    className="min-h-12 w-full"
                  />
                </li>
              ))}
              <li className="pt-3" onClick={closeMenu}>
                <Button href="#contact" className="btn-glow w-full">
                  Contact Me
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
