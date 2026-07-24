import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getProjectBySlug } from "@/lib/selectors";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Case study";
  const summary = project?.summary ?? site.tagline;
  const year = project?.year ?? "";

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
            justifyContent: "space-between",
            fontSize: 24,
            color: "#71717a",
            letterSpacing: "0.06em",
          }}
        >
          <span>{site.name}</span>
          <span>{year}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 920,
            }}
          >
            {summary}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
