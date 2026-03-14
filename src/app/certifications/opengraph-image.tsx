import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { getCertificatesCount } from "@/dal/certificates.dal";

export const alt = "Mayur Pal | Verified Credentials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const totalCerts = await getCertificatesCount();

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
        flexDirection: "column",
        padding: "90px",
        position: "relative",
        overflow: "hidden",
        border: "2px solid rgba(245, 158, 11, 0.1)", // Amber border
      }}
    >
      {/* 1. BACKGROUND DECORATION (Amber Grid) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "600px",
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          zIndex: 1,
        }}
      />

      {/* 2. PHOTO LAYER (Mayur - Grayscale/Amber Tint) */}
      <img
        src={`${baseUrl}/mayur_transparent.webp`}
        alt="Mayur's Certifications"
        style={{
          
          position: "absolute",
          right: "-20px",
          bottom: "-40px",
          height: "640px",
          zIndex: 5,
          filter: "grayscale(100%) brightness(0.6) sepia(20%) saturate(120%)",
        }}
      />

      {/* 3. RADIAL OVERLAY (Focus on text) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #050505 50%, transparent 100%)",
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
        {/* SECURITY STATUS HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              background: "#f59e0b",
              borderRadius: "50%",
              opacity: 0.8,
            }}
          />
          <span
            style={{
              color: "#f59e0b",
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: "0.4em",
              fontFamily: "monospace",
            }}
          >
            IDENTITY_VERIFIED // SECURE_ACCESS
          </span>
        </div>

        {/* MAIN TITLE */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "110px",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 0.85,
              letterSpacing: "-5px",
            }}
          >
            SKILL <br />
            <span style={{ color: "#f59e0b" }}>VAULT_V1</span>
          </h1>

          <p
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.4)",
              marginTop: "40px",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            {">"} Industry_Standard_Certifications_Unlocked
          </p>
        </div>

        {/* BOTTOM STATS / FOOTER */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "50px",
            borderTop: "1px solid rgba(245, 158, 11, 0.2)",
            paddingTop: "30px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "rgba(245, 158, 11, 0.4)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "5px",
              }}
            >
              ISSUED_CREDENTIALS
            </span>
            <span style={{ color: "white", fontSize: "36px", fontWeight: 800 }}>
              {totalCerts.toString().padStart(2, "0")}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "rgba(245, 158, 11, 0.4)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "5px",
              }}
            >
              STATUS
            </span>
            <span
              style={{ color: "#f59e0b", fontSize: "36px", fontWeight: 800 }}
            >
              ACTIVE
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
              thissidemayur.me
            </span>
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
