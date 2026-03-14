import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const alt = "About Mayur Pal | Systems Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Dynamic base URL logic for local /public/mayur_transparent.webp
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
        padding: "80px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "20px solid #2563eb",
      }}
    >
      {/* BACKGROUND GRID */}
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

      {/* LEFT CONTENT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1.2,
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: "#2563eb",
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0.3em",
            fontFamily: "monospace",
            marginBottom: "10px",
          }}
        >
          ENGINEER_DOSSIER_V1
        </span>
        <h1
          style={{
            fontSize: "100px",
            fontWeight: 900,
            color: "white",
            margin: "0",
            lineHeight: 0.9,
            letterSpacing: "-4px",
          }}
        >
          MAYUR <span style={{ color: "#2563eb" }}>PAL</span>
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "30px",
            maxWidth: "550px",
            lineHeight: 1.4,
          }}
        >
          Full Stack & DevOps. <br />
          BTech CSE. <br />
          Turning complex logic into scalable reality.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            color: "#2563eb",
            fontSize: "20px",
            fontFamily: "monospace",
          }}
        >
          SYSTEM_STATUS: [READY_TO_BUILD]
        </div>
      </div>

      {/* RIGHT PHOTO AREA */}
      <div
        style={{
          display: "flex",
          flex: 0.8,
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <img
          src={`${baseUrl}/mayur_transparent.webp`}
          alt="Mayur Pal"
          style={{
            height: "600px",
            objectFit: "contain",
            zIndex: 10,
            filter:
              "grayscale(100%) brightness(0.9) drop-shadow(0 0 30px rgba(37,99,235,0.2))",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
