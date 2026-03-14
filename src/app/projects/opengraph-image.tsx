import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { getProjectStats } from "@/dal/projects.dal";

export const alt = "Mayur Pal | Project Gallery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // 1. Fetch real-time project metrics
  const stats = await getProjectStats();

  // 2. Handle Dynamic Base URL for local webp rendering
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
        flexDirection: "column",
        padding: "90px",
        position: "relative",
        overflow: "hidden",
        border: "2px solid rgba(37, 99, 235, 0.1)", // Subtle blue border
      }}
    >
      {/* BACKGROUND GRID DECORATION */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "600px",
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(37, 99, 235, 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          zIndex: 1,
        }}
      />

      {/* LOCAL TRANSPARENT PHOTO (.webp) */}
      <img
        src={`${baseUrl}/mayur_transparent.webp`}
        style={{
          position: "absolute",
          right: "-30px",
          bottom: "-60px",
          height: "650px",
          zIndex: 5,
          filter: "grayscale(100%) brightness(0.7) contrast(1.1)",
        }}
      />

      {/* GRADIENT OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #050505 45%, transparent 100%)",
          zIndex: 6,
        }}
      />

      {/* CONTENT LAYER */}
      <div
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* SYSTEM HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              background: "#2563eb",
              borderRadius: "50%",
              boxShadow: "0 0 10px #2563eb",
            }}
          />
          <span
            style={{
              color: "#2563eb",
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: "0.3em",
              fontFamily: "monospace",
            }}
          >
            SYSTEM_ARCHIVE // BUILDS_V2
          </span>
        </div>

        {/* MAIN TITLE */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "100px",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 0.9,
              letterSpacing: "-4px",
            }}
          >
            ENGINEERING <br />
            <span style={{ color: "#2563eb" }}>PROJECTS</span>
          </h1>

          <p
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.4)",
              marginTop: "40px",
              fontFamily: "monospace",
            }}
          >
            {">"} Deploying Scalable Full-Stack Solutions
          </p>
        </div>

        {/* FOOTER STATS */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "40px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "30px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "rgba(37, 99, 235, 0.4)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "5px",
              }}
            >
              TOTAL_BUILDS
            </span>
            <span style={{ color: "white", fontSize: "32px", fontWeight: 800 }}>
              {stats.total.toString().padStart(2, "0")}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "rgba(37, 99, 235, 0.4)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "5px",
              }}
            >
              FEATURED
            </span>
            <span
              style={{ color: "#2563eb", fontSize: "32px", fontWeight: 800 }}
            >
              {stats.featured.toString().padStart(2, "0")}
            </span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "22px",
                fontWeight: 600,
              }}
            >
              thissidemayur.me/projects
            </span>
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
