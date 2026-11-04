import { useEffect, useState } from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { useToastStore } from '../components/ui/Toast'

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonamiCode() {
  const [index, setIndex] = useState(0)
  const { setTheme } = useThemeStore()
  const { showToast } = useToastStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = KONAMI_SEQUENCE[index].length === 1 ? KONAMI_SEQUENCE[index].toLowerCase() : KONAMI_SEQUENCE[index]

      if (key === expected) {
        const next = index + 1
        if (next === KONAMI_SEQUENCE.length) {
          // Trigger Matrix Theme!
          setTheme('matrix')
          showToast({
            type: 'success',
            title: '🎮 Konami Code Activated!',
            description: 'Welcome to the construct. The Matrix theme has been initiated.',
          })
          setIndex(0)
        } else {
          setIndex(next)
        }
      } else {
        setIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, setTheme, showToast])
}
