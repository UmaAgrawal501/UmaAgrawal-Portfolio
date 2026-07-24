import type { NavItem } from "@/types";

/**
 * Product chrome only (labels + anchors).
 */
export const navigation: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "principles", label: "Approach", href: "#principles" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/** Section heading for Featured Projects */
export const workSectionTitle = "Featured Projects";

export const MAIN_CONTENT_ID = "main-content";
