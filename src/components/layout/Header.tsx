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

const monogram =
  site.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "UA";

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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-4xl items-center justify-between rounded-full px-3 py-2 pl-5 transition-all duration-500",
          scrolled || menuOpen
            ? "glass border-border/80 shadow-sm"
            : "border border-transparent bg-transparent",
        )}
        aria-label="Primary"
      >
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-text-primary no-underline transition-colors hover:text-accent"
          onClick={closeMenu}
        >
          {monogram}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.id}>
              <NavLink item={item} active={activeId === item.id} />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {portrait ? (
            <Image
              src={portrait.src}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full object-cover portrait-ring"
            />
          ) : null}
          <Button href="#contact" size="sm" className="btn-glow rounded-full px-5">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          className="type-body-sm inline-flex min-h-11 shrink-0 items-center px-2 text-text-secondary transition-colors hover:text-text-primary lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <div
        id={menuId}
        className={cn(
          "absolute top-[calc(100%+0.5rem)] right-4 left-4 rounded-2xl border border-border bg-surface/95 backdrop-blur-md lg:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <Container className="py-6">
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
                Let&apos;s Talk
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
