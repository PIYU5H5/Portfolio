import confetti from 'canvas-confetti'
import { PROFILE } from '../data/profile.js'
import { PROJECTS } from '../data/projects.js'
import { SKILLS_DATA } from '../data/skills.js'
import { EXPERIENCES } from '../data/experience.js'
import { FILES } from '../data/files.js'
import { useAppStore } from '../store/useAppStore.js'
import { useThemeStore } from '../store/useThemeStore.js'
import { THEMES } from '../themes/themes.js'

export const KNOWN_COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'experience',
  'contact',
  'open',
  'theme',
  'resume',
  'github',
  'linkedin',
  'leetcode',
  'neofetch',
  'clear',
  'ls',
  'cat',
  'pwd',
  'whoami',
  'date',
  'echo',
  'sudo',
]

export function executeCommand(rawCommand, uptimeSeconds) {
  const trimmed = (rawCommand || '').trim()
  if (!trimmed) return { output: '' }

  const parts = trimmed.split(/\s+/)
  const command = parts[0].toLowerCase()
  const args = parts.slice(1)

  // 1. Easter egg: sudo hire piyush
  if (trimmed.toLowerCase() === 'sudo hire piyush') {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2f81f7', '#3fb950', '#a371f7', '#ffd700'],
      })
    }
    return {
      output:
        '✨ Permission granted.\n' +
        '📄 Drafting offer letter... [████████████████████] 100%\n' +
        '🚀 Excellent choice! Piyush is ready to ship high-impact code. Check your inbox or reach out at piyushjadhavyt@gmail.com.',
    }
  }

  switch (command) {
    case 'help':
      return {
        output:
          'PIYUSH JADHAV CLI - AVAILABLE COMMANDS:\n' +
          '------------------------------------------------------------\n' +
          '  about            Display personal summary & education\n' +
          '  projects         List featured engineering projects\n' +
          '  skills           View categorized technical stack tree\n' +
          '  experience       Show professional work experience timeline\n' +
          '  contact          Display email & social contact links\n' +
          '  open <file>      Open a file in the editor (e.g. "open projects")\n' +
          '  theme <name>     Switch theme (dark, cyberpunk, light, dracula, matrix, etc.)\n' +
          '  resume           Download Piyush\'s official resume (PDF)\n' +
          '  neofetch         Display system architecture card & uptime\n' +
          '  github           Open GitHub profile in new tab\n' +
          '  linkedin         Open LinkedIn profile in new tab\n' +
          '  leetcode         Open LeetCode profile in new tab\n' +
          '  ls               List files in current workspace\n' +
          '  cat <file>       Display file contents in terminal\n' +
          '  pwd              Print working directory\n' +
          '  whoami           Print current user identity\n' +
          '  date             Display system date and time\n' +
          '  clear            Clear terminal screen buffer\n' +
          '  sudo hire piyush Unlock top secret career easter egg\n' +
          '------------------------------------------------------------',
      }

    case 'about':
      return {
        output:
          `Name:        ${PROFILE.name}\n` +
          `Role:        ${PROFILE.role}\n` +
          `Location:    ${PROFILE.based}\n` +
          `Status:      ${PROFILE.status}\n` +
          `College:     ${PROFILE.education.college}\n` +
          `Degree:      ${PROFILE.education.degree}\n` +
          `University:  ${PROFILE.education.university}\n` +
          `Timeline:    ${PROFILE.education.period}\n\n` +
          `Summary:\n${PROFILE.professionalSummary}`,
      }

    case 'projects':
      return {
        output:
          'FEATURED PROJECTS:\n' +
          PROJECTS.map((p, idx) => `  [${idx + 1}] ${p.title} (${p.period})\n      ${p.oneLiner}\n      Tech: ${p.techStack.join(', ')}`).join('\n\n') +
          '\n\nTip: type "open projects" to inspect interactive cards and detailed case studies.',
      }

    case 'skills':
      return {
        output:
          'TECHNICAL SKILLS TREE:\n' +
          Object.entries(SKILLS_DATA)
            .map(([category, list]) => `  ├── ${category}\n  │   └── ${list.join(', ')}`)
            .join('\n') +
          '\n\nTip: type "open skills" to view the interactive JSON editor.',
      }

    case 'experience':
      return {
        output:
          'PROFESSIONAL EXPERIENCE TIMELINE:\n' +
          EXPERIENCES.map((e) =>
            `  * ${e.role} @ ${e.company} (${e.period})\n` +
            `    Location: ${e.location}\n` +
            e.bullets.map((b) => `    - ${b}`).join('\n')
          ).join('\n\n'),
      }

    case 'contact':
      return {
        output:
          `CONTACT & SOCIAL CHANNELS:\n` +
          `  Email:    ${PROFILE.socials.email}\n` +
          `  GitHub:   ${PROFILE.socials.github}\n` +
          `  LinkedIn: ${PROFILE.socials.linkedin}\n` +
          `  LeetCode: ${PROFILE.socials.leetcode}\n\n` +
          `Tip: type "open contact" to send a direct message through the form.`,
      }

    case 'open': {
      if (args.length === 0) {
        return {
          output: 'Usage: open <filename>\nExample: open Projects.js or open about',
          isError: true,
        }
      }
      const targetQuery = args[0].toLowerCase()
      const matchedKey = Object.keys(FILES).find(
        (key) =>
          key.toLowerCase() === targetQuery ||
          key.toLowerCase().replace(/\.[^/.]+$/, '') === targetQuery
      )
      if (matchedKey) {
        useAppStore.getState().openFile(matchedKey)
        return { output: `Opening file ${matchedKey}...` }
      }
      return {
        output: `Error: File '${args[0]}' not found.\nAvailable files: ${Object.keys(FILES).join(', ')}`,
        isError: true,
      }
    }

    case 'theme': {
      if (args.length === 0) {
        return {
          output:
            `Current theme: ${useThemeStore.getState().currentTheme}\n` +
            `Available themes:\n` +
            THEMES.map((t) => `  - ${t.id} (${t.name})`).join('\n') +
            `\nUsage: theme <name> (e.g. "theme cyberpunk" or "theme matrix")`,
        }
      }
      const requested = args[0].toLowerCase()
      const match = THEMES.find((t) => t.id.toLowerCase().includes(requested))
      if (match) {
        useThemeStore.getState().setTheme(match.id)
        return { output: `Theme switched to '${match.name}'.` }
      }
      return {
        output: `Theme '${args[0]}' not recognized. Run "theme" to view valid themes.`,
        isError: true,
      }
    }

    case 'resume': {
      if (typeof document !== 'undefined') {
        const link = document.createElement('a')
        link.href = '/resume.pdf'
        link.download = 'Piyush_Jadhav_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        link.remove()
      }
      return { output: 'Triggered resume download: Piyush_Jadhav_Resume.pdf' }
    }

    case 'github':
      if (typeof window !== 'undefined') {
        window.open(PROFILE.socials.github, '_blank', 'noopener,noreferrer')
      }
      return { output: `Opening GitHub profile (${PROFILE.socials.github})...` }

    case 'linkedin':
      if (typeof window !== 'undefined') {
        window.open(PROFILE.socials.linkedin, '_blank', 'noopener,noreferrer')
      }
      return { output: `Opening LinkedIn profile (${PROFILE.socials.linkedin})...` }

    case 'leetcode':
      if (typeof window !== 'undefined') {
        window.open(PROFILE.socials.leetcode, '_blank', 'noopener,noreferrer')
      }
      return { output: `Opening LeetCode profile (${PROFILE.socials.leetcode})...` }

    case 'ls': {
      const fileList = Object.keys(FILES).filter((f) => {
        const fileObj = FILES[f]
        if (fileObj.isHidden && !useAppStore.getState().isSecretsUnlocked && f === 'secrets.txt') return false
        if (fileObj.isHidden && !useAppStore.getState().isDevLogUnlocked && f === 'dev-log.md') return false
        return true
      })
      return { output: fileList.join('   ') }
    }

    case 'pwd':
      return { output: '/home/piyush/portfolio' }

    case 'whoami':
      return { output: 'guest@portfolio (visitor session)' }

    case 'date':
      return { output: new Date().toString() }

    case 'echo':
      return { output: args.join(' ') }

    case 'neofetch': {
      const minutes = Math.floor(uptimeSeconds / 60)
      const seconds = uptimeSeconds % 60
      const uptimeStr = `${minutes}m ${seconds}s`
      return {
        output:
`       _\\|/_            piyush@portfolio
       (o o)            -----------------
   +--oOO-(_)-OOo--+    OS: Arch Linux x86_64
   |               |    Host: Piyush DevStation v3.8
   |  PIYUSH       |    Kernel: 6.8.9-zen1
   |  JADHAV       |    Uptime: ${uptimeStr}
   |  PORTFOLIO    |    Shell: zsh 5.9
   +---------------+    Resolution: 1920x1080 (Responsive)
      |__|__|           DE: Visual Studio Code Custom
       || ||            Theme: ${useThemeStore.getState().currentTheme}
      ooO Ooo           Terminal: FakeShell-v2
                        CPU: 3rd Year CSE @ RMD Sinhgad (SPPU)
                        Memory: 16GB / 200+ LeetCode problems
                        Stack: React, Next.js, Node, Postgres, TypeScript`,
      }
    }

    case 'cat': {
      if (args.length === 0) return { output: 'Usage: cat <filename>', isError: true }
      const target = args[0]
      if (target.toLowerCase() === 'secrets.txt') {
        return {
          output:
            '--- TOP SECRET DEV LOG ---\n' +
            'You discovered the easter egg!\n' +
            'Fun fact: Piyush runs on 90% caffeine and 10% git push --force anxiety.\n' +
            'Hire this engineer before someone else does!',
        }
      }
      if (target.toLowerCase() === 'readme.md') {
        return {
          output:
            '# Piyush Jadhav Portfolio\n' +
            'An interactive developer portfolio built with React 19, Vite, Tailwind CSS, and Framer Motion.\n' +
            'Type "open readme" to read the full guide in the editor.',
        }
      }
      return {
        output: `File content preview for '${target}'. Type 'open ${target}' to view in editor tabs.`,
      }
    }

    default:
      return {
        output: `zsh: command not found: ${command}. Type "help" to see available commands.`,
        isError: true,
      }
  }
}

