import { ImageResponse } from "next/og";

// Satori (next/og) requires hex + linear-gradient. No oklch, no radial.
const INK = "#100b09";
const BONE = "#fcfaf9";
const BONE_60 = "rgba(252, 250, 249, 0.60)";
const BONE_50 = "rgba(252, 250, 249, 0.50)";
const BONE_72 = "rgba(252, 250, 249, 0.72)";
const PEACH = "#f1b29c";
const CORAL = "#d97a60";

export const alt = "Smartee Kuwait — Tomorrow's smile, today.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, #4a160e 0%, ${INK} 55%, ${INK} 100%)`,
          color: BONE,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: BONE_60,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: CORAL,
              }}
            />
            Smartee · Kuwait
          </div>
          <div>Est. orthodontic studio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 124,
              lineHeight: 0.92,
              letterSpacing: -5,
              fontWeight: 500,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Tomorrow’s smile,</span>
            <span style={{ fontStyle: "italic", color: PEACH }}>
              shaped by the millimeter.
            </span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: BONE_72,
              maxWidth: 720,
            }}
          >
            A clinical-grade aligner studio in Kuwait City. We scan, simulate, and ship a treatment plan you can watch unfold tooth by tooth.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: BONE_50,
          }}
        >
          <div>smartee.kw</div>
          <div>29.3766° N · 47.9783° E</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
