import { getPublicBlogBySlug } from "@/dal/blogs.dal";
import { ImageResponse } from "next/og";

export const alt = "Engineering Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Fetch real data from your DB
   const slugName = (await params).slug
  const blog = await getPublicBlogBySlug(slugName);

  if (!blog) {
    return new Response("Not Found", { status: 404 });
  }

  const date = new Date(blog.created_at).toLocaleDateString("en-US", {
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE FROM AWS */}
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.3, // Dimmed for text contrast
          }}
        />
      )}

      {/* OVERLAY GRADIENT for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #050505 30%, transparent 100%)",
        }}
      />

      {/* CONTENT LAYER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          zIndex: 10,
          borderLeft: "16px solid #ec4899",
        }}
      >
        {/* Meta Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(236, 72, 153, 0.2)",
              border: "1px solid #ec4899",
              borderRadius: "6px",
              color: "#ec4899",
              fontSize: "18px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            LOG_ENTRY_001
          </div>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "20px" }}>
            {date} • BY MAYUR
          </span>
        </div>

        {/* Title and Summary */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-3px",
              textTransform: "uppercase",
            }}
          >
            {blog.title}
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.6)",
              marginTop: "20px",
              lineHeight: 1.4,
            }}
          >
            {blog.summary.length > 150
              ? `${blog.summary.substring(0, 150)}...`
              : blog.summary}
          </p>
        </div>

        {/* Branding Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "40px",
              backgroundColor: "#ec4899",
              marginRight: "20px",
            }}
          />
          <span
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            THISSIDEMAYUR.ME
          </span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
