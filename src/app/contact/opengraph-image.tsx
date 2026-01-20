import { ImageResponse } from "next/og";

export const alt = "Contact Mayur Pal";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  const imageUrl = "https://thissidemayur.me/my-transparent-photo.png";

  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "80px",
        justifyContent: "space-between",
        borderLeft: "20px solid #2563eb",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1.2 }}>
        <h1
          style={{
            fontSize: "100px",
            fontWeight: 900,
            color: "white",
            margin: 0,
            lineHeight: 0.9,
          }}
        >
          INITIATE <br /> <span style={{ color: "#2563eb" }}>SYNC</span>
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "30px",
            fontFamily: "monospace",
          }}
        >
          Available for Summer 2026 Internships & Freelance Projects.
        </p>
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            color: "white",
            fontSize: "20px",
            gap: "20px",
          }}
        >
          <span>GitHub</span> • <span>LinkedIn</span> • <span>X</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 0.8,
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        {/* Subtle glow behind photo */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: "#2563eb",
            filter: "blur(100px)",
            opacity: 0.2,
            borderRadius: "50%",
          }}
        />
        <img
          alt="http://thissidemayur.me/about "
          src={imageUrl}
          style={{ height: "580px", objectFit: "contain", zIndex: 10 }}
        />
      </div>
    </div>,
    { ...size },
  );
}
