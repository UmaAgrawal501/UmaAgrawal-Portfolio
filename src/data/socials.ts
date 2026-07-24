import type { SocialLink } from "@/types";

/**
 * Social / distribution links for Contact.
 *
 * TODO:
 * - portfolio href — portfolio domain when ready
 */
export const socials = [
  {
    id: "email",
    label: "Email",
    href: "mailto:agrawaluma2002@gmail.com",
    external: false,
    order: 1,
    icon: "email",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/uma-agrawal/",
    external: true,
    order: 2,
    icon: "linkedin",
  },
  {
    id: "resume",
    label: "Resume",
    href: "/resume.pdf",
    external: false,
    order: 3,
    icon: "resume",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/UmaAgrawal501",
    external: true,
    order: 4,
    icon: "github",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    // TODO: Provide portfolio URL once domain is ready
    href: "",
    external: true,
    order: 5,
    icon: "globe",
  },
] as const satisfies readonly SocialLink[];
