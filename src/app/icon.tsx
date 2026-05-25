import { ImageResponse } from "next/og";

// Satori (next/og) doesn't support oklch() or radial-gradient. Use hex.
const INK = "#100b09";
const BONE = "#fcfaf9";
const RED = "#c0331e";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
          color: BONE,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: -2,
        }}
      >
        S
        <span style={{ color: RED, marginLeft: -2 }}>.</span>
      </div>
    ),
    { ...size }
  );
}
