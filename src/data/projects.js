export const PROJECTS = [
  {
    id: "student-admission-management",
    title: "Student Admission Management System",
    period: "May 2026 – Jul 2026",
    category: "Full-Stack",
    oneLiner: "High-throughput admission engine eliminating peak registration bottlenecks.",
    problem:
      "Legacy admission portals suffered severe bottlenecking and connection timeouts during peak university registration windows under concurrent bursts.",
    solution:
      "Architected a fault-tolerant backend on Next.js, Prisma, and PostgreSQL with a Redis caching layer to offload repetitive reads and queue concurrent profile submissions.",
    impact:
      "Eliminated ~60% of redundant database round-trips via Redis caching, serving 500+ simultaneous student applications with sub-200ms API response latency.",
    techStack: ["Next.js", "Prisma", "Redis", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/PIYU5H5/student-admission-system",
    liveUrl: "https://admission.piyushjadhav.dev",
    featured: true,
    statusChip: "Production Grade",
  },
  {
    id: "ai-web-applications",
    title: "AI-Augmented Web Platforms",
    period: "Nov 2024 – Mar 2026",
    category: "AI",
    oneLiner: "Rapid-iteration full-stack client architectures powered by modern LLM workflows.",
    problem:
      "Modern product teams require rapid prototyping without sacrificing architectural integrity, scalable state models, or multi-device design systems.",
    solution:
      "Engineered full-stack client architectures and intelligent matching algorithms utilizing AI-augmented engineering workflows (Cursor, Lovable), crafting modular design tokens and type-safe component libraries.",
    impact:
      "Compressed standard feature delivery cycles by ~70% while sustaining zero-regression test coverage and seamless multi-screen responsiveness.",
    techStack: ["React", "Next.js", "Cursor", "Lovable", "TypeScript", "Tailwind CSS", "Zustand"],
    githubUrl: "https://github.com/PIYU5H5/ai-web-apps",
    liveUrl: "https://ai-apps.piyushjadhav.dev",
    featured: true,
    statusChip: "Rapid Delivery",
  },
  {
    id: "ai-automation-workflows",
    title: "Enterprise AI & Automation Pipelines",
    period: "Aug 2024 – Dec 2024",
    category: "Automation",
    oneLiner: "Autonomous orchestration pipelines for scraping, processing, and syncing data.",
    problem:
      "Repetitive outbound operations, unstructured lead scraping, and cross-platform synchronization consumed hours of manual intervention every week.",
    solution:
      "Designed and deployed self-healing automated workflows with n8n, OpenAI API, Apify, and Gmail API, processing batch extractions and routing validated outputs to CRM storage.",
    impact:
      "Automated 40+ hours/week of manual engineering operations and scaled end-to-end pipeline execution throughput by 300%.",
    techStack: ["n8n", "OpenAI API", "Gmail API", "Apify", "Node.js", "Webhooks"],
    githubUrl: "https://github.com/PIYU5H5/automation-workflows",
    featured: true,
    statusChip: "40+ hrs/wk saved",
  },
  {
    id: "neural-network-from-scratch",
    title: "Vectorized Neural Network from Scratch",
    period: "Oct 2024 – Jan 2025",
    category: "AI",
    oneLiner: "Mathematical implementation of feedforward deep learning without ML frameworks.",
    problem:
      "Abstract high-level ML libraries often obscure low-level gradient dynamics, backpropagation mechanics, and matrix optimization challenges.",
    solution:
      "Programmed a vectorized multi-layer perceptron strictly using Python and NumPy, deriving forward propagation, backpropagation, and mini-batch gradient descent from first principles.",
    impact:
      "Benchmarked on the MNIST handwritten digit dataset, achieving 85% test accuracy with zero external machine learning dependencies.",
    techStack: ["Python", "NumPy", "Linear Algebra", "Calculus", "Data Analysis"],
    githubUrl: "https://github.com/PIYU5H5/neural-network-from-scratch",
    featured: true,
    statusChip: "85% MNIST Acc",
  },
  {
    id: "elvion-hackathon-platform",
    title: "Elvion Hackathon Official Platform",
    period: "Aug 2025 – Present",
    category: "Hackathon",
    oneLiner: "Flagship event portal for Sinhgad TECH Club's inter-college hackathon.",
    problem:
      "The club required a high-capacity, interactive event platform to announce problem statements, manage 500+ participant registrations, and publish live schedules.",
    solution:
      "Co-built and deployed the official Elvion hackathon portal with modern responsive design, team onboarding, and schedule notifications.",
    impact:
      "Successfully handled 500+ participant registrations, zero downtime during the launch window, and served as the live hub for industry sponsors.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "https://elvion.theclub.tech/",
    githubUrl: "https://github.com/PIYU5H5/elvion-portal",
    featured: false,
    statusChip: "Live Event Platform",
  },
  {
    id: "unidb-lab",
    title: "UniDB Lab (SPPU DBMS Practical Simulator)",
    period: "2025",
    category: "Full-Stack",
    oneLiner: "In-browser relational & document database playground with AI assistance.",
    problem:
      "Students lacked an accessible, zero-setup browser environment to test SPPU syllabus SQL and NoSQL practical exercises with instant validation.",
    solution:
      "Engineered an interactive web IDE integrating sql.js (WebAssembly SQLite) alongside a custom MongoDB syntax simulator, complemented by a Claude API-powered teaching assistant panel.",
    impact:
      "Allowed students to execute queries directly in the client without local DBMS setup and receive contextual diagnostic hints for syntax errors.",
    techStack: ["React", "sql.js (WASM)", "TypeScript", "Claude API", "Tailwind CSS"],
    githubUrl: "https://github.com/PIYU5H5/unidb-lab",
    liveUrl: "https://unidb.piyushjadhav.dev",
    featured: false,
    statusChip: "Educational Tool",
  },
  {
    id: "algorithm-visualizers",
    title: "Interactive Algorithm Visualizers",
    period: "2024",
    category: "Visualizers",
    oneLiner: "Visual interactive sandboxes demonstrating pathfinding & sorting mechanics.",
    problem:
      "Grasping algorithmic runtime complexities and graph traversal behavior from static pseudocode is challenging for students.",
    solution:
      "Constructed graphical visualizers in Python and Pygame featuring step-by-step state animations for Dijkstra, A*, QuickSort, and MergeSort.",
    impact:
      "Provided intuitive visual insight into tree branching, array partitioning, and heuristic exploration with adjustable simulation speed.",
    techStack: ["Python", "Pygame", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/PIYU5H5/algorithm-visualizers",
    featured: false,
    statusChip: "Interactive Simulation",
  },
  {
    id: "truth-teller",
    title: "Truth-Teller Media Authenticity Detector",
    period: "2026",
    category: "AI",
    oneLiner: "Multimodal AI detector for verifying media provenance and synthetic artifacts.",
    problem:
      "Proliferation of generative media poses risks in distinguishing authentic captures from deepfakes or modified footage.",
    solution:
      "Constructing a verification harness using Vite, React, TypeScript, Supabase Edge Functions, and Google Gemini API to inspect image forensics and metadata consistency.",
    impact:
      "Active research and prototype phase aimed at providing real-time probability scores on media tamper indicators.",
    techStack: ["Vite", "React", "TypeScript", "Google Gemini", "Supabase Edge Functions"],
    githubUrl: "https://github.com/PIYU5H5/truth-teller",
    featured: false,
    isWip: true,
    statusChip: "Work In Progress",
  },
  {
    id: "lead-lens-shoption",
    title: "Lead Lens (Shoption)",
    period: "2026",
    category: "Full-Stack",
    oneLiner: "High-level lead analysis and agent performance enterprise dashboard.",
    problem:
      "Enterprise sales teams require unified visibility over call activities, lead conversion funnels, and agent efficiency metrics.",
    solution:
      "Contributed to the frontend and service layer of a new iteration of Lead Lens, focusing on lead scoring, auto-dialing integrations, and responsive agent performance analytics.",
    impact:
      "Delivered clean modular dashboard components and real-time activity views tailored for enterprise operational speed.",
    techStack: ["React", "TypeScript", "REST APIs", "Tailwind CSS", "Data Analytics"],
    featured: false,
    statusChip: "Enterprise SDE Intern",
  },
]

