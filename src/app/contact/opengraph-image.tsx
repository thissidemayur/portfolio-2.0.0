import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const alt = "Contact Mayur Pal | Initiate Sync";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Handle Dynamic Base URL for local image rendering
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "90px",
        position: "relative",
        overflow: "hidden",
        borderLeft: "20px solid #2563eb",
      }}
    >
      {/* 1. BACKGROUND GRID DECORATION */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "500px",
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(37, 99, 235, 0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          zIndex: 1,
        }}
      />

      {/* 2. CONTENT AREA */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1.2,
          zIndex: 10,
        }}
      >
        {/* COMMUNICATION STATUS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#2563eb",
              borderRadius: "50%",
              boxShadow: "0 0 10px #2563eb",
            }}
          />
          <span
            style={{
              color: "#2563eb",
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "monospace",
              letterSpacing: "0.2em",
            }}
          >
            LINE_OPEN // READY_TO_SYNC
          </span>
        </div>

        <h1
          style={{
            fontSize: "110px",
            fontWeight: 900,
            color: "white",
            margin: 0,
            lineHeight: 0.85,
            letterSpacing: "-4px",
          }}
        >
          INITIATE <br /> <span style={{ color: "#2563eb" }}>SYNC</span>
        </h1>

        <p
          style={{
            fontSize: "26px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "30px",
            fontFamily: "monospace",
            maxWidth: "550px",
          }}
        >
          Available for Summer 2026 Internships & Freelance Engineering.
        </p>

        {/* SOCIAL HANDLES SECTION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            DIRECTORY_ACCESS
          </span>
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: "22px",
              gap: "25px",
              fontWeight: 500,
            }}
          >
            <span style={{ color: "#2563eb" }}>@</span>thissidemayur
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              opacity: 0.4,
              color: "white",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            <span>GITHUB</span> • <span>LINKEDIN</span> • <span>X.COM</span> •{" "}
            <span>INSTAGRAM</span>
          </div>
        </div>
      </div>

      {/* 3. PHOTO AREA */}
      <div
        style={{
          display: "flex",
          flex: 0.8,
          justifyContent: "flex-end",
          position: "relative",
          height: "100%",
        }}
      >
        {/* Subtle Glow behind photo */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            background: "#2563eb",
            filter: "blur(120px)",
            opacity: 0.15,
            borderRadius: "50%",
            right: "-100px",
            bottom: "50px",
          }}
        />

        <img
        alt="Mayur's contact"
          src={`${baseUrl}/mayur_transparent.webp`}
          style={{
            height: "650px",
            objectFit: "contain",
            zIndex: 10,
            position: "absolute",
            bottom: "-90px",
            right: "-50px",
            filter: "grayscale(100%) brightness(0.9)",
          }}
        />
      </div>

      {/* 4. BRANDING FOOTER */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "90px",
          display: "flex",
          color: "rgba(255,255,255,0.2)",
          fontSize: "14px",
          fontFamily: "monospace",
        }}
      >
        EST_2026 ||  Jalandhar, India
      </div>
    </div>,
    { ...size },
  );
}
