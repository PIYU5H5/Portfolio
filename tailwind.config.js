/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-sidebar': 'var(--bg-sidebar)',
        'bg-activity': 'var(--bg-activitybar)',
        'bg-titlebar': 'var(--bg-titlebar)',
        'bg-statusbar': 'var(--bg-statusbar)',
        border: 'var(--border)',
        'text-main': 'var(--text)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        syntax: {
          keyword: 'var(--syn-keyword)',
          string: 'var(--syn-string)',
          number: 'var(--syn-number)',
          comment: 'var(--syn-comment)',
          fn: 'var(--syn-function)',
          type: 'var(--syn-type)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

