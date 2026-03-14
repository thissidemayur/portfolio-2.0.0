import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { getBlogStats } from "@/dal/blogs.dal";

export const alt = "Mayur Pal Engineering Logs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const stats = await getBlogStats();

  // Get the host (e.g., localhost:3000 or thissidemayur.me)
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
        border: "2px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* 1. DECORATIVE GRID */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "600px",
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(236, 72, 153, 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          zIndex: 1,
        }}
      />

      {/* 2. LOCAL TRANSPARENT PHOTO */}
      {/* We use the baseUrl to make the path absolute */}
      <img
        src={`${baseUrl}/mayur_transparent.webp`}
        alt="Mayur's Blogs"
        style={{
          position: "absolute",
          right: "-40px",
          bottom: "-60px",
          height: "650px",
          zIndex: 5,
          filter: "grayscale(100%) brightness(0.7) contrast(1.1)",
        }}
      />

      {/* 3. GRADIENT OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #050505 45%, transparent 100%)",
          zIndex: 6,
        }}
      />

      {/* 4. CONTENT LAYER */}
      <div
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* WINDOW CONTROLS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "50px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              background: "#ec4899",
              borderRadius: "50%",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              background: "#333",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              background: "#333",
              borderRadius: "50%",
            }}
          />
        </div>

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
            <span style={{ color: "#ec4899" }}>ARCHIVE_V1</span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <p
              style={{
                fontSize: "26px",
                color: "#ec4899",
                fontFamily: "monospace",
                margin: 0,
              }}
            >
              {">"} Documenting_System_Workflows
            </p>
          </div>
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
                color: "rgba(255,255,255,0.2)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "5px",
              }}
            >
              TOTAL_LOGS
            </span>
            <span style={{ color: "white", fontSize: "32px", fontWeight: 800 }}>
              {stats.total.toString().padStart(2, "0")}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "5px",
              }}
            >
              FEATURED
            </span>
            <span
              style={{ color: "#ec4899", fontSize: "32px", fontWeight: 800 }}
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
                color: "rgba(255,255,255,0.4)",
                fontSize: "22px",
                fontWeight: 600,
              }}
            >
              thissidemayur.me
            </span>
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
