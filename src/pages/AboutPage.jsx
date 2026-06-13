export default function AboutPage() {
  const features = [
    {
      title: "Task Management",
      description:
        "Create, view, and organize your daily tasks in a clean interface.",
    },
    {
      title: "Secure Authentication",
      description:
        "Protected routing ensuring your todo list is only accessible to you.",
    },
    {
      title: "Dynamic Navigation",
      description:
        "Seamless page transitions without reloading, powered by client-side routing.",
    },
  ];

  const technologies = [
    {
      name: "React",
      version: "v19.2.4",
      role: "Core library for building the declarative UI components and managing component state.",
    },
    {
      name: "React Router",
      version: "v7.17.0",
      role: "Handles application navigation, protected routes, and dynamic URL parameters.",
    },
    {
      name: "Vite",
      version: "v8.0.1",
      role: "Next-generation frontend tooling providing an ultra-fast development server and bundling.",
    },
  ];

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "system-ui, sans-serif",
        color: "#333",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 10, color: "#111" }}>
          Todo Application
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666", margin: 0 }}>
          A modern, secure, and lightning-fast task management platform.
        </p>
      </section>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #eee",
          marginBottom: 40,
        }}
      />

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: 20, color: "#222" }}>
          Application Features
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: 20,
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                backgroundColor: "#fafafa",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 10, color: "#0066cc" }}>
                {feature.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  color: "#555",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: 20, color: "#222" }}>
          Technologies Used
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {technologies.map((tech, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                padding: 15,
                borderLeft: "4px solid #0066cc",
                backgroundColor: "#f4f9ff",
                borderRadius: "0 8px 8px 0",
              }}
            >
              <div style={{ minWidth: 140 }}>
                <strong style={{ fontSize: "1.1rem" }}>{tech.name}</strong>
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: "0.85rem",
                    color: "#888",
                    backgroundColor: "#e1ecf4",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  {tech.version}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "#444",
                  lineHeight: "1.4",
                }}
              >
                {tech.role}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
