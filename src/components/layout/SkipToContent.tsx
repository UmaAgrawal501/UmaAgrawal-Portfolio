import { MAIN_CONTENT_ID } from "@/constants/navigation";

/**
 * Keyboard-only skip link. Visually hidden until focused.
 */
export function SkipToContent() {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className="skip-to-content">
      Skip to main content
    </a>
  );
}
