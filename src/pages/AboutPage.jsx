export default function AboutPage() {
  const icons = {
    0: (
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10 bg-secondary-container text-primary-light rounded-xl flex items-center justify-center mb-4                   hover:text-on-surface transition-colors"
      >
        <title>Clipboard Task List 24 Regular SVG Icon</title>
        <path
          fill="currentColor"
          d="M12.5 10.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75a.75.75 0 1 0 0 1.5h3.5a.75.75 0 1 0 0-1.5zm-2.47-5.22a.75.75 0 1 0-1.06-1.06l-1.47 1.47l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zm0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0m5.214-10.136A2.25 2.25 0 0 0 13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764zm0 .012L16 4.25q0-.078-.005-.154M10.25 6.5h3.5c.78 0 1.467-.397 1.871-1h2.129a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H6.25a.75.75 0 0 1-.75-.75V6.25a.75.75 0 0 1 .75-.75h2.129c.404.603 1.091 1 1.871 1m0-3h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5"
        />
      </svg>
    ),
    1: (
      <svg
        viewBox="0 0 24 24"
        className="aw-10 h-10 bg-secondary-container text-primary-light rounded-xl flex items-center justify-center mb-4                   hover:text-on-surface transition-colors"
      >
        <title>Bxs Lock SVG Icon</title>
        <path
          fill="currentColor"
          d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"
        />
      </svg>
    ),
    2: (
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10 bg-secondary-container text-primary-light rounded-xl flex items-center justify-center mb-4                   hover:text-on-surface transition-colors"
      >
        <title>Navigation SVG Icon</title>
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m3 11l19-9l-9 19l-2-8z"
        />
      </svg>
    ),
  };
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
    <>
      <main className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-12 bg-surface body-md text-on-surface min-h-screen">
        <div>
          <section className="text-center space-y-4">
            <h1 className="headline-lg-mobile md:headline-lg text-on-surface">
              Todo Application
            </h1>
            <p className="body-md text-on-surface-variant max-w-md mx-auto">
              A modern, secure, and lightning-fast task management platform.
            </p>
          </section>

          <div className="h-1 w-12 bg-primary-container-light mx-auto rounded-full mt-6"></div>
          <section className="py-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className="headline-md text-on-surface">
                Application Features
              </h2>
              <div className="h-px flex-1 bg-outline-variant ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-gap">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-100 soft-elevation hover-elevation transition-all duration-300"
                >
                  {icons[index]}
                  <h3 className="label-md text-primary-light mb-2">
                    {feature.title}
                  </h3>
                  <p className="body-sm text-on-surface-variant">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className="headline-md text-on-surface">Technologies Used</h2>
              <div className="h-px flex-1 bg-outline-variant ml-4"></div>
            </div>
            <div className="flex flex-col gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-surface-container-low rounded-2xl border-l-4 border-primary-light hover:bg-white transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 min-w-35">
                    <span className="label-md text-on-surface">
                      {tech.name}
                    </span>
                    <span className="bg-outline-variant text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {tech.version}
                    </span>
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    {tech.role}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
