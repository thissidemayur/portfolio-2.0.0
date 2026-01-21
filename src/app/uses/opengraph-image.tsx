import { ImageResponse } from "next/og";

export const alt = "Mayur Setup & Tools";
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
        padding: "60px",
        justifyContent: "center",
        borderRight: "20px solid #8b5cf6", // Purple for tools/hardware
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: 900,
          color: "white",
          margin: 0,
        }}
      >
        THE <span style={{ color: "#8b5cf6" }}>STACK</span>
      </h1>
      <p
        style={{
          fontSize: "32px",
          color: "white",
          opacity: 0.6,
          fontFamily: "monospace",
        }}
      >
        Fedora 42 // Dell G15 // Podman // VS Code
      </p>
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          color: "#8b5cf6",
          fontSize: "20px",
          letterSpacing: "0.5em",
        }}
      >
        SYSTEM_INVENTORY_REPORT_2026
      </div>
    </div>,
    { ...size },
  );
}
