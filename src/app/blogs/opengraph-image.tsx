import { ImageResponse } from "next/og";

export const alt = "Mayur Pal Engineering Logs";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ display: "flex", gap: "8px", marginBottom: "40px" }}>
        <div
          style={{
            width: "12px",
            height: "12px",
            background: "#333",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            width: "12px",
            height: "12px",
            background: "#333",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            width: "12px",
            height: "12px",
            background: "#333",
            borderRadius: "50%",
          }}
        />
      </div>
      <h1
        style={{ fontSize: "80px", fontWeight: 900, color: "white", margin: 0 }}
      >
        ENGINEERING <br /> <span style={{ color: "#ec4899" }}>BLOGS</span>
      </h1>
      <p
        style={{
          fontSize: "24px",
          color: "#ec4899",
          marginTop: "40px",
          fontFamily: "monospace",
        }}
      >
        {">"} Documenting Full Stack & DevOps Workflows
      </p>
    </div>,
    { ...size },
  );
}
