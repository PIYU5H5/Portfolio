import { describe, it, expect } from 'vitest'
import { executeCommand } from '../commands'

describe('Terminal Command Parser', () => {
  it('handles help command', () => {
    const res = executeCommand('help', 10)
    expect(res.output).toContain('PIYUSH JADHAV CLI - AVAILABLE COMMANDS')
    expect(res.isError).toBeFalsy()
  })

  it('handles about command', () => {
    const res = executeCommand('about', 10)
    expect(res.output).toContain('Piyush Jadhav')
    expect(res.output).toContain('Rasiklal M. Dhariwal')
  })

  it('handles sudo hire piyush easter egg', () => {
    const res = executeCommand('sudo hire piyush', 10)
    expect(res.output).toContain('Permission granted')
    expect(res.output).toContain('Drafting offer letter')
  })

  it('handles unknown command with help hint', () => {
    const res = executeCommand('unknowncommand123', 10)
    expect(res.isError).toBe(true)
    expect(res.output).toContain('command not found')
  })
})
