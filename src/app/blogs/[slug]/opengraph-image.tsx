import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Engineering Log";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  // 1. Fetch your blog data based on the slug
  // For now, we'll format the slug into a Title (e.g., "docker-setup" -> "DOCKER SETUP")
  const title = params.slug.split("-").join(" ").toUpperCase();

  // You can also add a "Reading Time" or "Date" if you fetch real data here
  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#050505",
        padding: "80px",
        justifyContent: "center",
        borderLeft: "16px solid #ec4899", // Pink accent for Blogs/Docs
      }}
    >
      {/* Header: Meta Info */}
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
            padding: "6px 14px",
            backgroundColor: "rgba(236, 72, 153, 0.1)",
            border: "1px solid #ec4899",
            borderRadius: "6px",
            color: "#ec4899",
            fontSize: "18px",
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          LOG_FILE
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "20px",
            fontFamily: "monospace",
          }}
        >
          {date} • PUBLISHED_BY_MAYUR
        </span>
      </div>

      {/* Dynamic Title: Mix of Bold and Semi-Bold */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            fontSize: "85px",
            fontWeight: 900,
            color: "white",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-2px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "32px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            marginTop: "30px",
            maxWidth: "900px",
            lineHeight: 1.4,
          }}
        >
          Exploring the intersection of scalable code and automated
          infrastructure.
        </p>
      </div>

      {/* Branding Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            backgroundColor: "#ec4899",
            marginRight: "15px",
          }}
        />
        <span style={{ color: "white", fontSize: "24px", fontWeight: 600 }}>
          thissidemayur.me/blog
        </span>
      </div>

      {/* Decorative Grid Lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "100%",
          backgroundImage:
            "linear-gradient(to right, transparent, rgba(236, 72, 153, 0.05))",
          display: "flex",
        }}
      />
    </div>,
    { ...size },
  );
}
