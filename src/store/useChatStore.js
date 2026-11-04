import { create } from 'zustand'
import { PROFILE } from '../data/profile.js'
import { SKILLS_DATA } from '../data/skills.js'

const INITIAL_MESSAGES = [
  {
    id: 'welcome-bot',
    role: 'assistant',
    content:
      `Hello! I'm **Piyush's Co-Pilot**, an AI assistant grounded in his real background, projects, and engineering experience.\n\n` +
      `Ask me anything about his tech stack, hackathon wins, work at Indux Technology, or how to get in touch! Click any of the suggested prompts below to get started.`,
    timestamp: 'Just now',
  },
]

export const SYSTEM_KNOWLEDGE = `
You are Piyush's AI Co-Pilot on his Visual Studio Code-style developer portfolio.
Profile Details:
- Name: ${PROFILE.name} (${PROFILE.preferredName})
- Education: ${PROFILE.education.degree} at ${PROFILE.education.college}, Pune (${PROFILE.education.university}). Aug 2024 - Jun 2028 (3rd year).
- SGPA: Sem 1: 8.73, Sem 2: 8.64, Sem 3: 8.32.
- Core Stack: ${SKILLS_DATA.core_stack.join(', ')}.
- Experience:
  1. Full Stack Developer Intern at Indux Technology (Aug 2026 - Present): Built 8+ React Native views, cut rendering latency by 35%, 99.8% crash-free rate.
  2. SDE Intern at Shoption: Lead Lens lead analysis and agent performance platform.
- Projects:
  1. Student Admission Management System (Next.js, Prisma, Redis, PostgreSQL) - served 500+ profiles with sub-200ms latency.
  2. AI Web Applications (React, Next.js, Cursor, Lovable) - AI-assisted workflows cutting cycles by 70%.
  3. AI & Automation Workflows (n8n, OpenAI API, Apify, Gmail API) - automated 40+ hrs/week of manual operations.
  4. Neural Network from Scratch (Python, NumPy) - 85% accuracy on MNIST digit classification.
  5. Elvion Hackathon Platform (https://elvion.theclub.tech/) - official portal for 500+ attendees.
  6. UniDB Lab - SPPU DBMS practical simulator with sql.js and Claude AI.
  7. Algorithm Visualizers - interactive Python Pygame simulations.
- Hackathons: AMD Developer Hackathon Global Finalist (lablab.ai, SF on-site finals, team Sheads), SuperNova 2.0 Finalist, Void Hackathon 8.0, Smart India Hackathon 2025 Qualifier.
- Leadership: President of Sinhgad TECH Club (Aug 2025 - Present), directed Elvion Hackathon for 500+ participants.
- Contact: Email piyushjadhavyt@gmail.com, GitHub github.com/PIYU5H5, LinkedIn linkedin.com/in/piyush-jadhav5.
`

function generateLocalSmartResponse(query) {
  const q = (query || '').toLowerCase()

  if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('portfolio')) {
    return (
      `Piyush has built several notable production-grade systems:\n\n` +
      `1. **Student Admission Management System**: High-throughput admission engine using Next.js, Prisma, Redis, and PostgreSQL, serving 500+ students with sub-200ms latency.\n` +
      `2. **AI & Automation Pipelines**: Orchestrated n8n workflows with OpenAI and Gmail APIs, automating 40+ hours/week of manual operations.\n` +
      `3. **Neural Network from Scratch**: Vectorized multi-layer perceptron written purely in Python and NumPy achieving 85% MNIST accuracy.\n` +
      `4. **Elvion Hackathon Platform**: Live portal handling 500+ registrations for Sinhgad TECH Club.\n` +
      `5. **UniDB Lab**: In-browser DBMS practical playground with WebAssembly SQLite and Claude API.\n\n` +
      `You can check out interactive demos and source code in [Projects.js]!`
    )
  }

  if (q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('tech')) {
    return (
      `Piyush's core engineering stack includes:\n\n` +
      `- **Frontend**: React, Next.js, React Native, TypeScript, Tailwind CSS, Framer Motion\n` +
      `- **Backend**: Node.js, Express, PostgreSQL, Redis, Prisma ORM, MongoDB, RESTful APIs\n` +
      `- **AI & Automation**: n8n, OpenAI API, Claude API, Google Gemini, Apify\n` +
      `- **Competitive**: 200+ solved problems on LeetCode (@Piyush_op)\n\n` +
      `Check out [Skills.json] to inspect the interactive syntax tree or chart view!`
    )
  }

  if (q.includes('intern') || q.includes('job') || q.includes('availab') || q.includes('hire') || q.includes('status')) {
    return (
      `**Yes, Piyush is actively open to internships and full-stack software engineering opportunities!**\n\n` +
      `He has proven industry experience as a Full Stack Developer Intern at Indux Technology (cutting latency by 35% and building 8+ mobile views in React Native) and as an SDE Intern at Shoption.\n\n` +
      `You can reach out directly via [Contact.jsx] or email him at [piyushjadhavyt@gmail.com](mailto:piyushjadhavyt@gmail.com). You can also run \`sudo hire piyush\` in the terminal!`
    )
  }

  if (q.includes('hackathon') || q.includes('award') || q.includes('achievement') || q.includes('contest')) {
    return (
      `Piyush is an active competitive builder and hackathon finalist:\n\n` +
      `- 🏆 **AMD Developer Hackathon (lablab.ai)**: Advanced to on-site global finals in San Francisco with team "Sheads".\n` +
      `- 🥈 **SuperNova 2.0 & Void Hackathon 8.0**: Finalist across nationwide university teams.\n` +
      `- 🇮🇳 **Smart India Hackathon 2025**: Advanced through national technical evaluation & prototype phases.\n` +
      `- 🚀 **President, TECH Club**: Co-organised the Elvion Hackathon for 500+ participants.\n\n` +
      `Inspect the complete timeline in [Achievements.md]!`
    )
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('linkedin')) {
    return (
      `Here is how you can connect with Piyush:\n\n` +
      `- **Email**: [piyushjadhavyt@gmail.com](mailto:piyushjadhavyt@gmail.com)\n` +
      `- **LinkedIn**: [linkedin.com/in/piyush-jadhav5](https://www.linkedin.com/in/piyush-jadhav5/)\n` +
      `- **GitHub**: [github.com/PIYU5H5](https://github.com/PIYU5H5)\n` +
      `- **LeetCode**: [leetcode.com/u/Piyush_op](https://leetcode.com/u/Piyush_op/)\n\n` +
      `You can also open [Contact.jsx] to send a message directly from the editor!`
    )
  }

  return (
    `Thanks for asking! Piyush is a 3rd year CSE undergraduate at RMD Sinhgad (SPPU), Pune with an 8.5+ SGPA, specializing in React, Next.js, Node.js, TypeScript, PostgreSQL, and autonomous AI automation pipelines.\n\n` +
    `Feel free to explore [Projects.js], [Skills.json], [Experience.json], or open the terminal with \`Ctrl+\` \` to run CLI commands!`
  )
}

export const useChatStore = create((set, get) => ({
  messages: INITIAL_MESSAGES,
  isStreaming: false,
  streamingText: '',

  sendMessage: async (userText) => {
    if (!userText.trim() || get().isStreaming) return

    const userMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    set((state) => ({
      messages: [...state.messages, userMessage],
      isStreaming: true,
      streamingText: '',
    }))

    let finalAnswer = ''
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...get().messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (response.ok && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          set({ streamingText: accumulated })
        }
        finalAnswer = accumulated
      } else {
        throw new Error('API route unavailable, using local intelligence')
      }
    } catch {
      const fullText = generateLocalSmartResponse(userText)
      const words = fullText.split(' ')
      let accumulated = ''

      for (let i = 0; i < words.length; i++) {
        accumulated += (i > 0 ? ' ' : '') + words[i]
        set({ streamingText: accumulated })
        await new Promise((resolve) => setTimeout(resolve, 24))
      }
      finalAnswer = fullText
    }

    const botMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'assistant',
      content: finalAnswer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    set((state) => ({
      messages: [...state.messages, botMessage],
      isStreaming: false,
      streamingText: '',
    }))
  },

  clearChat: () => {
    set({ messages: INITIAL_MESSAGES, isStreaming: false, streamingText: '' })
  },
}))
