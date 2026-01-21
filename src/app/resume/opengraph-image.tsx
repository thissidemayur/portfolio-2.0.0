import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mayur Pal - Professional Resume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0F172A",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Subtle decorative border */}
      <div
        style={{
          position: "absolute",
          inset: "20px",
          border: "2px solid rgba(34, 211, 238, 0.1)",
          borderRadius: "24px",
        }}
      />

      {/* Header Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#22D3EE",
            fontWeight: 600,
            letterSpacing: "0.1em",
            marginBottom: "16px",
          }}
        >
          CURRICULUM VITAE
        </div>

        <h1
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: "#F8FAFC",
            margin: 0,
            lineHeight: 1,
          }}
        >
          Mayur Pal
        </h1>

        <div
          style={{
            fontSize: 32,
            color: "#94A3B8",
            marginTop: "12px",
            fontWeight: 500,
          }}
        >
          Full-Stack & DevOps Engineer
        </div>
      </div>

      {/* Call to Action Button Design */}
      <div
        style={{
          marginTop: "60px",
          background: "#22D3EE",
          padding: "16px 40px",
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#0F172A",
          }}
        >
          VIEW FULL RESUME
        </div>
      </div>

      {/* Footer URL */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          fontSize: 20,
          color: "rgba(148, 163, 184, 0.5)",
          fontFamily: "monospace",
        }}
      >
        thissidemayur.me/resume
      </div>
    </div>,
    { ...size },
  );
}
