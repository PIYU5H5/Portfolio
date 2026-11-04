import React from 'react'
import {
  FileCode,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Trophy,
  User,
  Home,
  Briefcase,
  Mail,
  BookOpen,
  Lock,
  Cpu,
  FileSpreadsheet,
} from 'lucide-react'

interface FileIconProps {
  name: string
  className?: string
  size?: number
  isOpen?: boolean
}

export const FileIcon: React.FC<FileIconProps> = ({ name, className = '', size = 16, isOpen = false }) => {
  const ext = name.split('.').pop()?.toLowerCase()

  if (name.includes('/') || ext === undefined) {
    return isOpen ? (
      <FolderOpen size={size} className={`text-amber-400 ${className}`} />
    ) : (
      <Folder size={size} className={`text-amber-400 ${className}`} />
    )
  }

  switch (ext) {
    case 'jsx':
    case 'tsx':
      return <FileCode size={size} className={`text-sky-400 ${className}`} />
    case 'js':
    case 'ts':
      return <FileCode size={size} className={`text-yellow-400 ${className}`} />
    case 'json':
      return <FileJson size={size} className={`text-emerald-400 ${className}`} />
    case 'md':
      return <BookOpen size={size} className={`text-blue-400 ${className}`} />
    case 'pdf':
      return <FileSpreadsheet size={size} className={`text-red-400 ${className}`} />
    case 'txt':
      return <FileText size={size} className={`text-purple-400 ${className}`} />
    default:
      return <FileText size={size} className={`text-slate-400 ${className}`} />
  }
}

export const SpecialIcon: React.FC<{
  type: 'home' | 'user' | 'briefcase' | 'code' | 'folder' | 'trophy' | 'mail' | 'book' | 'lock' | 'cpu'
  size?: number
  className?: string
}> = ({ type, size = 16, className = '' }) => {
  switch (type) {
    case 'home':
      return <Home size={size} className={`text-sky-400 ${className}`} />
    case 'user':
      return <User size={size} className={`text-purple-400 ${className}`} />
    case 'briefcase':
      return <Briefcase size={size} className={`text-yellow-400 ${className}`} />
    case 'code':
      return <FileJson size={size} className={`text-emerald-400 ${className}`} />
    case 'folder':
      return <Folder size={size} className={`text-orange-400 ${className}`} />
    case 'trophy':
      return <Trophy size={size} className={`text-amber-400 ${className}`} />
    case 'mail':
      return <Mail size={size} className={`text-rose-400 ${className}`} />
    case 'book':
      return <BookOpen size={size} className={`text-blue-400 ${className}`} />
    case 'lock':
      return <Lock size={size} className={`text-pink-400 ${className}`} />
    case 'cpu':
      return <Cpu size={size} className={`text-emerald-400 ${className}`} />
  }
}
