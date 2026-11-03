export const PORTFOLIO_DATA = {
  hero: {
    greeting: "Hi, I am",
    name: "Alex Carter",
    title: "Full-Stack Developer & Creative Technologist",
    bio: "Building fast, scalable web systems and crafted digital experiences with modern React, TypeScript, and cloud architecture.",
    stats: [
      { label: "Years Experience", value: "4+" },
      { label: "Completed Projects", value: "28+" },
      { label: "Client Satisfaction", value: "100%" },
    ],
  },
  projects: [
    {
      id: "project-1",
      title: "PulseFlow AI Studio",
      category: "Full Stack / AI",
      description: "Real-time AI workflow engine built with React, WebSockets, and Python backend.",
      tags: ["React", "FastAPI", "Tailwind CSS", "Redis"],
      link: "https://github.com",
    },
    {
      id: "project-2",
      title: "Aura Commerce Architecture",
      category: "E-Commerce / Performance",
      description: "Next-gen headless e-commerce storefront with 99+ Lighthouse performance scores.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      link: "https://github.com",
    },
    {
      id: "project-3",
      title: "DevMetrics Cloud Dashboard",
      category: "Infrastructure / SaaS",
      description: "Microservices monitoring platform visualizing latency metrics and distributed traces.",
      tags: ["React", "Go", "Docker", "TimescaleDB"],
      link: "https://github.com",
    },
  ],
  about: {
    headline: "Engineering clean code, intuitive interactions, and resilient systems.",
    paragraphs: [
      "I specialize in bridging the gap between high-level architectural requirements and pixel-perfect front-end execution. My approach combines thoughtful design with rigorous engineering standards.",
      "Whether developing responsive web interfaces, architecting microservices, or tuning database query plans, I focus on delivering speed, maintainability, and user delight.",
    ],
  },
  experience: [
    {
      period: "2024 — Present",
      role: "Senior Frontend Engineer",
      company: "Synthetix Labs",
      description: "Leading frontend development of AI-powered developer tooling and component libraries.",
    },
    {
      period: "2022 — 2024",
      role: "Full-Stack Developer",
      company: "Nexus Digital",
      description: "Delivered cloud-native client applications, REST APIs, and automated CI/CD pipelines.",
    },
    {
      period: "2021 — 2022",
      role: "Junior Web Developer",
      company: "Vanguard Tech",
      description: "Built responsive user interfaces, accessible design systems, and performed code reviews.",
    },
  ],
  skills: [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Vite"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "MongoDB"] },
    { category: "DevOps & Tools", items: ["Docker", "Git / GitHub", "AWS", "CI/CD", "Linux", "Vercel"] },
  ],
  contact: {
    email: "alex.carter.dev@example.com",
    location: "San Francisco, CA (Open to Remote)",
    availability: "Available for freelance contracts & full-time roles.",
  },
};

