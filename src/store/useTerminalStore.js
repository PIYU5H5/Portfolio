import { create } from 'zustand'

export const useTerminalStore = create((set, get) => ({
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

  toggleTerminal: (open) => {
    set((state) => ({ isOpen: open !== undefined ? open : !state.isOpen }))
  },

  setHeight: (height) => {
    const clamped = Math.max(120, Math.min(550, height))
    set({ height: clamped })
  },

  addEntry: (entry) => {
    const newEntry = {
      ...entry,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    }
    set((state) => ({ history: [...state.history, newEntry] }))
  },

  clearHistory: () => {
    set({ history: [] })
  },

  setCurrentInput: (val) => {
    set({ currentInput: val })
  },

  addToCommandHistory: (cmd) => {
    if (!cmd.trim()) return
    set((state) => ({
      commandHistory: [...state.commandHistory, cmd],
      historyCursor: -1,
    }))
  },

  navigateHistory: (direction) => {
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

