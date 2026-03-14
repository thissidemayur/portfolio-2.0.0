import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const alt = "Mayur Pal | Full Stack & DevOps Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Logic to handle local WebP rendering
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* LEFT SECTION: TEXT HIERARCHY */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1.2,
          zIndex: 20,
        }}
      >
        {/* Status Badge */}
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
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#2563eb",
              boxShadow: "0 0 10px #2563eb",
            }}
          />
          <span
            style={{
              color: "#2563eb",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "4px",
              fontFamily: "monospace",
            }}
          >
            SYSTEM_READY // PORTFOLIO_V3
          </span>
        </div>

        {/* Name Section */}
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            lineHeight: 0.9,
          }}
        >
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-6px",
            }}
          >
            MAYUR
          </span>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 200,
              color: "white",
              letterSpacing: "-6px",
              opacity: 0.7,
            }}
          >
            PAL
          </span>
        </h1>

        {/* Title & Subtitle */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              border: "1px solid #2563eb",
              padding: "8px 16px",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#2563eb",
                letterSpacing: "2px",
              }}
            >
              FULL_STACK & DEVOPS
            </span>
          </div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
              margin: "20px 0 0 0",
              maxWidth: "500px",
              lineHeight: 1.4,
              fontFamily: "monospace",
            }}
          >
            {">"} Building robust infrastructure and high-performance web
            experiences.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: TRANSPARENT PHOTO */}
      <div
        style={{
          display: "flex",
          flex: 0.8,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Subtle Glow behind photo */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            backgroundColor: "#2563eb",
            filter: "blur(130px)",
            opacity: 0.2,
            bottom: "50px",
            right: "-50px",
          }}
        />

        <img
        alt="Mayur's Portfile"
          src={`${baseUrl}/mayur_transparent.webp`}
          style={{
            height: "650px",
            objectFit: "contain",
            zIndex: 10,
            filter: "grayscale(100%) brightness(0.9) contrast(1.1)",
            position: "absolute",
            bottom: "-80px",
            right: "-40px",
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
          fontSize: "14px",
          fontFamily: "monospace",
          zIndex: 30,
        }}
      >
        <span>LPU_CSE_2026 || INDIA</span>
        <span>FEDORA_ENV || SCALE_X</span>
      </div>
    </div>,
    { ...size },
  );
}
