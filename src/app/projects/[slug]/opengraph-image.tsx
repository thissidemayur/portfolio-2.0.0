import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { getProjectByItSlug } from "@/dal/projects.dal";

export const runtime = "edge";
export const alt = "Project Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectByItSlug(params.slug);

  if (!project) {
    return new Response("Project Not Found", { status: 404 });
  }

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
        borderLeft: "20px solid #2563eb",
      }}
    >
      {/* BACKGROUND IMAGE FROM AWS (Low Opacity) */}
      {project.image_url && (
        <img
          src={project.image_url}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "70%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
            maskImage: "linear-gradient(to left, black, transparent)",
          }}
        />
      )}

      {/* CONTENT LAYER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
          flex: 1,
        }}
      >
        <p
          style={{
            fontSize: "24px",
            color: "#2563eb",
            fontFamily: "monospace",
            marginBottom: "10px",
            letterSpacing: "0.2em",
          }}
        >
          PROJECT_REGISTRY // {project.id.toString().padStart(3, "0")}
        </p>

        <h1
          style={{
            fontSize: "90px",
            fontWeight: 900,
            color: "white",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1.1,
            maxWidth: "800px",
          }}
        >
          {project.title}
        </h1>

        {/* TECH STACK TAGS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {project.tech_stack?.slice(0, 5).map((tech: string) => (
            <span
              key={tech}
              style={{
                padding: "6px 14px",
                background: "rgba(37, 99, 235, 0.1)",
                border: "1px solid #2563eb",
                borderRadius: "4px",
                color: "#2563eb",
                fontSize: "18px",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              {tech.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* BRAND FOOTER */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "40px",
          zIndex: 10,
        }}
      >
        <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
          thissidemayur.me
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "20px",
            fontFamily: "monospace",
          }}
        >
          DEVOPS_DRIVEN // CASE_STUDY
        </span>
      </div>
    </div>,
    { ...size },
  );
}
