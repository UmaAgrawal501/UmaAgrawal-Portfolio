import type { NavItem } from "@/types";

/**
 * Product chrome only (labels + anchors).
 */
export const navigation: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/** Section heading for Featured Projects */
export const workSectionTitle = "Featured Projects";

export const MAIN_CONTENT_ID = "main-content";
