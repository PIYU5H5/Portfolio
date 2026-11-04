export type FileId =
  | 'Home.jsx'
  | 'About.jsx'
  | 'Projects.js'
  | 'Skills.json'
  | 'Experience.json'
  | 'Achievements.md'
  | 'Contact.jsx'
  | 'README.md'
  | 'secrets.txt'
  | 'dev-log.md'

export interface FileItem {
  id: FileId
  name: string
  extension: 'jsx' | 'js' | 'json' | 'md' | 'txt'
  folder?: string
  language: string
  path: string
  iconName: 'home' | 'user' | 'briefcase' | 'code' | 'folder' | 'trophy' | 'mail' | 'book' | 'lock' | 'cpu'
  iconColor: string
  description: string
  isHidden?: boolean
}

export const FILES: Record<FileId, FileItem> = {
  'Home.jsx': {
    id: 'Home.jsx',
    name: 'Home.jsx',
    extension: 'jsx',
    folder: 'src/pages',
    language: 'JavaScript React',
    path: '/src/pages/Home.jsx',
    iconName: 'home',
    iconColor: '#38bdf8', // React cyan
    description: 'Hero, interactive developer intro & quick stats',
  },
  'About.jsx': {
    id: 'About.jsx',
    name: 'About.jsx',
    extension: 'jsx',
    folder: 'src/pages',
    language: 'JavaScript React',
    path: '/src/pages/About.jsx',
    iconName: 'user',
    iconColor: '#a78bfa', // Purple
    description: 'Background, education, SGPA progress & leadership',
  },
  'Projects.js': {
    id: 'Projects.js',
    name: 'Projects.js',
    extension: 'js',
    folder: 'src/data',
    language: 'JavaScript',
    path: '/src/data/Projects.js',
    iconName: 'briefcase',
    iconColor: '#fbbf24', // JS yellow
    description: 'Production systems, AI apps & case studies',
  },
  'Skills.json': {
    id: 'Skills.json',
    name: 'Skills.json',
    extension: 'json',
    folder: 'src/data',
    language: 'JSON',
    path: '/src/data/Skills.json',
    iconName: 'code',
    iconColor: '#4ade80', // JSON green
    description: 'Interactive JSON syntax tree & skill proficiency',
  },
  'Experience.json': {
    id: 'Experience.json',
    name: 'Experience.json',
    extension: 'json',
    folder: 'src/data',
    language: 'JSON',
    path: '/src/data/Experience.json',
    iconName: 'folder',
    iconColor: '#f97316', // Orange
    description: 'Work timeline at Indux Technology & Shoption',
  },
  'Achievements.md': {
    id: 'Achievements.md',
    name: 'Achievements.md',
    extension: 'md',
    folder: 'docs',
    language: 'Markdown',
    path: '/docs/Achievements.md',
    iconName: 'trophy',
    iconColor: '#facc15', // Gold
    description: 'Hackathon podiums, honors & certifications',
  },
  'Contact.jsx': {
    id: 'Contact.jsx',
    name: 'Contact.jsx',
    extension: 'jsx',
    folder: 'src/pages',
    language: 'JavaScript React',
    path: '/src/pages/Contact.jsx',
    iconName: 'mail',
    iconColor: '#f43f5e', // Rose
    description: 'Interactive contact form, social links & email',
  },
  'README.md': {
    id: 'README.md',
    name: 'README.md',
    extension: 'md',
    folder: 'root',
    language: 'Markdown',
    path: '/README.md',
    iconName: 'book',
    iconColor: '#60a5fa', // Blue
    description: 'Portfolio guide, keyboard shortcuts & site tech specs',
  },
  'secrets.txt': {
    id: 'secrets.txt',
    name: 'secrets.txt',
    extension: 'txt',
    folder: 'src/easter-eggs',
    language: 'Plain Text',
    path: '/src/easter-eggs/secrets.txt',
    iconName: 'lock',
    iconColor: '#ec4899',
    description: 'Easter egg unlocked after exploring 5 tabs',
    isHidden: true,
  },
  'dev-log.md': {
    id: 'dev-log.md',
    name: 'dev-log.md',
    extension: 'md',
    folder: 'docs',
    language: 'Markdown',
    path: '/docs/dev-log.md',
    iconName: 'cpu',
    iconColor: '#10b981',
    description: 'Behind-the-scenes engineering log',
    isHidden: true,
  },
}

export const INITIAL_TABS: FileId[] = ['Home.jsx', 'Projects.js', 'About.jsx']
export const DEFAULT_ACTIVE_TAB: FileId = 'Home.jsx'
