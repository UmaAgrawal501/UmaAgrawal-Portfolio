import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — monochrome initial. */
export default function AppleIcon() {
  const initial = site.name.trim().charAt(0).toUpperCase() || "U";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070708",
          color: "#fafafa",
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: "-0.04em",
        }}
      >
        {initial}
      </div>
    ),
    { ...size },
  );
}
