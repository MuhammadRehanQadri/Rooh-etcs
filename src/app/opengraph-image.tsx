import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ETCS — Where Vision Becomes Reality";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
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
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#E6B954",
            fontWeight: 500,
          }}
        >
          <span style={{ display: "block", width: 60, height: 2, background: "#E6B954" }} />
          ETCS
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: -2,
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <span>Where Vision Becomes</span>
            <span style={{ color: "#D4A537" }}>Reality.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Expert Technical Contracting & Services — trusted industrial and
            construction solutions across the Kingdom of Saudi Arabia.
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
