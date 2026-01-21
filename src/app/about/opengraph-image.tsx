import { ImageResponse } from "next/og";

export const alt = "About Mayur Pal";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  // Use your actual domain here once deployed
  const imageUrl = "https://thissidemayur.me/mayur.png";

  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "60px",
        justifyContent: "space-between",
        borderBottom: "20px solid #2563eb",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <span
          style={{
            color: "#2563eb",
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0.2em",
          }}
        >
          ENGINEER_DOSSIER
        </span>
        <h1
          style={{
            fontSize: "80px",
            fontWeight: 900,
            color: "white",
            margin: "10px 0",
          }}
        >
          MAYUR <span style={{ color: "#2563eb" }}>PAL</span>
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "500px",
          }}
        >
          Full Stack & DevOps.  <br />Btech cse Student <br />
          Turning complex logic into scalable reality.
        </p>
      </div>

      {/* YOUR TRANSPARENT PHOTO */}
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
        <img
          src={imageUrl}
          alt="Mayur Pal"
          style={{
            height: "550px",
            objectFit: "contain",
            // Subtle glow behind the photo
            filter: "drop-shadow(0 0 30px rgba(37,99,235,0.3))",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
