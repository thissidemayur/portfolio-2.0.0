import { ImageResponse } from "next/og";

export const alt = "Mayur Pal Certifications";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        justifyContent: "center",
        borderBottom: "20px solid #f59e0b", // Amber/Gold for achievements
      }}
    >
      <span
        style={{
          color: "#f59e0b",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "0.4em",
        }}
      >
        VERIFIED_CREDENTIALS
      </span>
      <h1
        style={{
          fontSize: "100px",
          fontWeight: 900,
          color: "white",
          margin: "20px 0",
        }}
      >
        SKILL <span style={{ color: "#f59e0b" }}>VAULT</span>
      </h1>
      <p
        style={{
          fontSize: "30px",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "monospace",
        }}
      >
        
        AWS // HashiCorp // Google Cloud // LPU Records
      </p>
    </div>,
    { ...size },
  );
}
