import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/data/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  const from = caseStudy?.from ?? "#FFFBEB";
  const to = caseStudy?.to ?? "#FEF3C7";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
        }}
      >
        <div style={{ fontSize: 64, color: "#111111" }}>
          {caseStudy?.title ?? "Eron Begiqi"}
        </div>
        <div style={{ fontSize: 28, color: "#555555", marginTop: 16 }}>
          {caseStudy?.tagline ?? "Product Designer — B2B SaaS"}
        </div>
      </div>
    ),
    size
  );
}
