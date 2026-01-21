import { ImageResponse } from "next/og";

export const runtime = "edge"; // High performance
export const alt = "Project Detail";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  // Capitalize ID for the title (e.g., note-taker-cli -> Note Taker Cli)
  const title = params.id.split("-").join(" ").toUpperCase();

  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        borderLeft: "20px solid #2563eb",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p
          style={{
            fontSize: "24px",
            color: "#2563eb",
            fontFamily: "monospace",
            marginBottom: "10px",
          }}
        >
          PROJECT_REGISTRY // 0x552
        </p>
        <h1
          style={{
            fontSize: "90px",
            fontWeight: 900,
            color: "white",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "40px",
          }}
        >
          Full Stack & DevOps Case Study
        </p>
      </div>

      {/* Brand Footer */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "40px",
        }}
      >
        <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
          thissidemayur.me
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "20px",
            fontFamily: "monospace",
          }}
        >
          Built on Fedora Linux
        </span>
      </div>
    </div>,
    { ...size },
  );
}
