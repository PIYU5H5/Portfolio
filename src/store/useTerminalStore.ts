import { create } from 'zustand'
import React from 'react'

export interface TerminalEntry {
  id: string
  command?: string
  output?: React.ReactNode | string
  isError?: boolean
  timestamp: number
}

interface TerminalState {
  isOpen: boolean
  height: number
  history: TerminalEntry[]
  commandHistory: string[]
  historyCursor: number
  currentInput: string
  startTime: number

  toggleTerminal: (open?: boolean) => void
  setHeight: (height: number) => void
  addEntry: (entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => void
  clearHistory: () => void
  setCurrentInput: (val: string) => void
  navigateHistory: (direction: 'up' | 'down') => void
  addToCommandHistory: (cmd: string) => void
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  isOpen: false,
  height: 220,
  history: [
    {
      id: 'welcome',
      output: (
        'Welcome to Piyush\'s Interactive Terminal Shell [v2.4.0-release]\n' +
        'Type "help" to see available commands or "open projects" to browse work.\n' +
        'Try typing "sudo hire piyush" for an easter egg.'
      ),
      timestamp: Date.now(),
    },
  ],
  commandHistory: [],
  historyCursor: -1,
  currentInput: '',
  startTime: Date.now(),

  toggleTerminal: (open?: boolean) => {
    set((state) => ({ isOpen: open !== undefined ? open : !state.isOpen }))
  },

  setHeight: (height: number) => {
    const clamped = Math.max(120, Math.min(550, height))
    set({ height: clamped })
  },

  addEntry: (entry) => {
    const newEntry: TerminalEntry = {
      ...entry,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    }
    set((state) => ({ history: [...state.history, newEntry] }))
  },

  clearHistory: () => {
    set({ history: [] })
  },

  setCurrentInput: (val: string) => {
    set({ currentInput: val })
  },

  addToCommandHistory: (cmd: string) => {
    if (!cmd.trim()) return
    set((state) => ({
      commandHistory: [...state.commandHistory, cmd],
      historyCursor: -1,
    }))
  },

  navigateHistory: (direction: 'up' | 'down') => {
    const { commandHistory, historyCursor } = get()
    if (commandHistory.length === 0) return

    if (direction === 'up') {
      const nextIndex = historyCursor === -1 ? commandHistory.length - 1 : Math.max(0, historyCursor - 1)
      set({
        historyCursor: nextIndex,
        currentInput: commandHistory[nextIndex],
      })
    } else {
      if (historyCursor === -1) return
      const nextIndex = historyCursor + 1
      if (nextIndex >= commandHistory.length) {
        set({
          historyCursor: -1,
          currentInput: '',
        })
      } else {
        set({
          historyCursor: nextIndex,
          currentInput: commandHistory[nextIndex],
        })
      }
    }
  },
}))
