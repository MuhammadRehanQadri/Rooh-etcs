import { ImageResponse } from "next/og";
import { getService } from "@/content/services";

export const runtime = "edge";
export const alt = "ETCS Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: { slug: string; locale: string } }) {
  const service = getService(params.slug);
  const title = service?.title || "ETCS Service";
  const category = service?.category || "industrial";
  const short = service?.shortDescription || "Trusted contracting and industrial solutions across the Kingdom of Saudi Arabia.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0A1A2F 0%, #0F2645 60%, #1B3A66 100%)",
          color: "white",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#E6B954",
            fontWeight: 500,
          }}
        >
          <span style={{ display: "block", width: 60, height: 2, background: "#E6B954" }} />
          ETCS · {category}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 950,
              lineHeight: 1.35,
            }}
          >
            {short}
          </div>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4A537" }} />
            etcs-ksa.com
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 80,
            top: 80,
            width: 280,
            height: 280,
            borderRadius: "100%",
            background: "radial-gradient(circle, rgba(212,165,55,0.35) 0%, transparent 70%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
