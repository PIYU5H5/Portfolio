export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  isCurrent: boolean
  bullets: string[]
  techStack: string[]
  isFill?: boolean
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "indux-technology",
    role: "Full Stack Developer Intern",
    company: "Indux Technology",
    location: "Pune, India",
    period: "Aug 2026 – Present",
    isCurrent: true,
    bullets: [
      "Integrated dynamic backend APIs into client-side interfaces, cutting static rendering latency by 35% and improving active session retention.",
      "Diagnosed and patched 15+ production UI bugs and race conditions, lifting platform stability to a 99.8% crash-free rate.",
      "Built 8+ modular, cross-platform mobile views in React Native, standardizing component reuse across iOS and Android.",
    ],
    techStack: ["React", "React Native", "TypeScript", "REST APIs", "Tailwind CSS"],
  },
  {
    id: "shoption",
    role: "SDE Intern",
    company: "Shoption",
    location: "Pune, India",
    period: "2026", // [FILL: specific start and end dates]
    isCurrent: false,
    bullets: [
      "Contributed to the core frontend and integration architecture for Lead Lens, a high-concurrency lead analysis and agent performance platform.",
      "Implemented modular dashboards visualizing call activities, conversion telemetry, and agent throughput metrics.",
      "Collaborated on auto-dialing integration pipelines and real-time lead qualification workflows.",
    ],
    techStack: ["NEXT JS", "TypeScript", "Fast APIs", "Lead Lens", "Analytics"],
    isFill: true,
  },
]
