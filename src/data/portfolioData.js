export const PORTFOLIO_DATA = {
  hero: {
    greeting: "Hi, I am",
    name: "Chintan Nakum",
    title: "Full - Stack Developer",
    bio: "Full-Stack Developer passionate about building responsive, scalable web applications using modern frontend and backend technologies.",
    stats: [
      { label: "Months Experience", value: "6+" },
      { label: "Completed Projects", value: "5+" },
    ],
  },
  projects: [
    {
      id: "project-1",
      title: "Bizconnect E-Commerce Platform",
      category: "Full Stack / E-Commerce",
      description: "Developed a dynamic e-commerce storefront template with reusable UI components, API-driven product management, and seamless shopping experiences. Integrated TanStack Query for efficient server-state management, caching, and optimized API interactions.",
      tags: ["React", "TanStack Query", "Tailwind CSS", "Axios", "REST APIs", "Framer Motion"],
      link: "https://bizconnect.in/",
    },
    {
      id: "project-2",
      title: "Taskfyer — Task Management System",
      category: "Full Stack / MERN",
      description: "Developed a full-stack task management system with authentication, real-time updates, and admin reporting tools for tracking employees and task assignments efficiently.",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
      link: "https://github.com/chintan21-png/task-manager-app",
    },
    {
      id: "project-3",
      title: "Premier Zone — Backend Project",
      category: "Backend / REST API",
      description: "Developed a backend application for managing and retrieving Premier League player statistics using Spring Boot and PostgreSQL. Implemented CSV-based data import and RESTful APIs to efficiently store, retrieve, and organize player information.",
      tags: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "CSV Processing"],
      link: "https://github.com/chintan21-png/premier_zone",
    },
  ],
  about: {
    headline: "Building meaningful web experiences through clean code and thoughtful engineering.",
    paragraphs: [
      "I'm a Full-Stack Developer with 6+ months of practical development experience, focused on building modern, responsive, and scalable web applications. I work primarily with React, TypeScript, Node.js, Express.js, and MongoDB, turning ideas into functional products with intuitive user experiences.",
      "Through personal projects and professional experience, I've worked on e-commerce platforms, task management systems, RESTful APIs, and database-driven applications. I enjoy solving problems, writing maintainable code, and exploring better ways to build reliable software.",
    ],
    stats: [
      { value: "6+", label: "Months experience", testId: "stat-years-experience" },
      { value: "5+", label: "Projects shipped", testId: "stat-projects-shipped" },
      { value: "100%", label: "Code Quality", testId: "stat-happy-clients" },
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

