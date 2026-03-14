import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";
export const alt = "Mayur Pal - Professional Resume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {

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
        padding: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. BACKGROUND DECORATION (System Grid) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "500px",
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.1) 1px, transparent 0)",
          backgroundSize: "30px 30px",
          zIndex: 1,
        }}
      />

      {/* 2. TRANSPARENT PHOTO (Right Aligned) */}
      <img
        src={`${baseUrl}/mayur_transparent.webp`}
        style={{
          position: "absolute",
          right: "-20px",
          bottom: "-40px",
          height: "600px",
          zIndex: 5,
          filter: "grayscale(100%) brightness(0.8)",
        }}
      />

      {/* 3. GRADIENT OVERLAY */}
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
          justifyContent: "center",
        }}
      >
        {/* Label */}
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
              background: "#22D3EE",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              color: "#22D3EE",
              fontSize: "20px",
              fontWeight: "bold",
              letterSpacing: "0.3em",
              fontFamily: "monospace",
            }}
          >
            PROFESSIONAL_DOSSIER_V3
          </span>
        </div>

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
          MAYUR <br /> <span style={{ color: "#22D3EE" }}>PAL</span>
        </h1>

        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "30px",
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span>{">"} FULL_STACK_ENGINEER</span>
          <span>{">"} DEVOPS_SPECIALIST</span>
        </div>

        {/* Call to Action Design (System Prompt Style) */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            background: "rgba(34, 211, 238, 0.1)",
            padding: "15px 25px",
            borderRadius: "8px",
            border: "1px solid #22D3EE",
            width: "fit-content",
          }}
        >
          <span
            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
          >
            DOWNLOAD_CV.sh
          </span>
          <div
            style={{
              width: "10px",
              height: "20px",
              background: "#22D3EE",
              animationName: "pulse",
              opacity: 0.8,
            }}
          />
        </div>
      </div>

      {/* 5. FOOTER URL */}
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          left: "80px",
          display: "flex",
          color: "rgba(255,255,255,0.2)",
          fontSize: "18px",
          fontFamily: "monospace",
        }}
      >
        thissidemayur.me/resume 
      </div>
    </div>,
    { ...size },
  );
}
