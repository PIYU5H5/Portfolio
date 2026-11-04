import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { App } from './App.jsx'

describe('App', () => {
  it('renders without crashing', () => {
    const html = renderToString(<App />)
    expect(html).toBeDefined()
    console.log('Rendered HTML length:', html.length)
  })
})

