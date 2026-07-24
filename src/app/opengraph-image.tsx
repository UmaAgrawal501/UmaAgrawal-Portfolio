import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph / Twitter share image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070708",
          color: "#fafafa",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#71717a",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {site.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
