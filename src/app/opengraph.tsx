import { ImageResponse } from "next/og";

export const alt = "Mayur Pal | Full Stack & DevOps Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Replace with your actual deployed URL for the transparent PNG
  const imageUrl = "https://thissidemayur.me/mayur-photo.png";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #111 2%, transparent 0%)",
        backgroundSize: "50px 50px",
        padding: "0 80px",
      }}
    >
      {/* LEFT SECTION: TEXT HIERARCHY */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Status Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#2563eb",
            }}
          />
          <span
            style={{
              color: "#2563eb",
              fontSize: "20px",
              fontWeight: 400,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            System_Online
          </span>
        </div>

        {/* Name: Bold + Regular Mix */}
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          <span
            style={{
              fontSize: "110px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-4px",
            }}
          >
            MAYUR
          </span>
          <span
            style={{
              fontSize: "110px",
              fontWeight: 200,
              color: "white",
              letterSpacing: "-4px",
              opacity: 0.8,
            }}
          >
            PAL
          </span>
        </h1>

        {/* Title & Subtitle */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#2563eb",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Full Stack & DevOps
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
              margin: "10px 0 0 0",
              maxWidth: "500px",
              lineHeight: 1.4,
            }}
          >
            Building robust digital infrastructure and high-performance web
            experiences.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: YOUR PHOTO */}
      <div
        style={{
          display: "flex",
          flex: 0.8,
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Subtle Glow behind photo */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            backgroundColor: "#2563eb",
            filter: "blur(120px)",
            opacity: 0.15,
            bottom: "100px",
          }}
        />

        <img
          src={imageUrl}
          style={{
            height: "580px",
            objectFit: "contain",
            zIndex: 10,
            // Drop shadow to make the photo pop from the background
            filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      {/* FOOTER INFO */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "80px",
          display: "flex",
          gap: "40px",
          color: "rgba(255,255,255,0.2)",
          fontSize: "18px",
          fontFamily: "monospace",
        }}
      >
        <span>LPU_CSE_2026</span>
        <span>FEDORA_ENV</span>
      </div>
    </div>,
    { ...size },
  );
}
