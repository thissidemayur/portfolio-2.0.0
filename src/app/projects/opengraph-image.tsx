import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mayur Pal | Project Gallery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        border: "20px solid #2563eb",
      }}
    >
      <div
        style={{
          fontSize: 32,
          color: "#2563eb",
          marginBottom: 20,
          fontWeight: "bold",
          letterSpacing: "0.2em",
        }}
      >
        SYSTEM_ARCHIVE
      </div>
      <div
        style={{
          fontSize: 80,
          fontWeight: "black",
          color: "white",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        PROJECT_BUILDS
      </div>
      <div
        style={{
          fontSize: 24,
          color: "rgba(255,255,255,0.4)",
          marginTop: 40,
          fontFamily: "monospace",
        }}
      >
        thissidemayur.me/projects
      </div>
    </div>,
    { ...size },
  );
}
