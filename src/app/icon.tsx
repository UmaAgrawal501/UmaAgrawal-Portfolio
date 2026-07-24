import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tab favicon — monochrome initial, no UI dependency. */
export default function Icon() {
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
          fontSize: 18,
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
