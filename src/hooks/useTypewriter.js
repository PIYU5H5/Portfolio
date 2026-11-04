import { useState, useEffect } from 'react'

export function useTypewriter(words, typingSpeed = 75, deletingSpeed = 40, pauseTime = 1600) {
  const [wordIndex, setWordIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return

    const currentWord = words[wordIndex]

    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [subIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return words && words[wordIndex] ? words[wordIndex].substring(0, subIndex) : ''
}
