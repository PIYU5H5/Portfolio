import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { useThemeStore } from '../store/useThemeStore.js'
import { useToastStore } from '../components/ui/Toast.jsx'

const KONAMI_SEQUENCE = [
  'G',
  'O',
  'A',
  'T',
]

export function useKonamiCode() {
  const [index, setIndex] = useState(0)
  const { setTheme, unlockMatrix } = useThemeStore()
  const { showToast } = useToastStore()

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing inside an input, textarea, or contentEditable
      const target = e.target
      if (
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = KONAMI_SEQUENCE[index].length === 1 ? KONAMI_SEQUENCE[index].toLowerCase() : KONAMI_SEQUENCE[index]

      if (key === expected) {
        const next = index + 1
        if (next === KONAMI_SEQUENCE.length) {
          unlockMatrix()
          setTheme('matrix')

          if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#00ff66', '#3fb950', '#2ea043', '#ffffff'],
            })
          }

          showToast({
            type: 'success',
            title: '🐐 GOAT Mode Activated!',
            description: 'Secret code accepted. The Matrix theme has been initiated.',
          })
          setIndex(0)
        } else {
          setIndex(next)
        }
      } else {
        // Reset or restart if the key matches the first key of sequence
        const firstKey = KONAMI_SEQUENCE[0].toLowerCase()
        setIndex(key === firstKey ? 1 : 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, setTheme, showToast])
}

