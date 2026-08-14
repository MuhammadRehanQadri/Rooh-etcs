import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Navy tile with the gold ETCS monogram — matches Logo.tsx's placeholder mark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A1A2F 0%, #0F2645 100%)",
          color: "#D4A537",
          fontSize: 52,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        ETCS
      </div>
    ),
    { ...size }
  );
}
