import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          'navy-deep': '#1b1d39',
          'navy-dark': '#0e1029',
          'black': '#000000',
          'white': '#ffffff'
        },
        // Accent Colors
        accent: {
          'blue': '#256ad1',
          'pink': '#d1258c',
          'pink-soft': '#db97bf',
          'pink-bright': '#ec4899'
        },
        // Neutral Colors
        neutral: {
          'light': '#e2e8f0',
          'medium': '#cbd5e1',
          'dark': '#94a3b8'
        }
      },
      fontFamily: {
        primary: ['"Lato"', '"Trebuchet MS"', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem', 
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem'
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(89.87deg, #256ad1 7.57%, #d1258c 95.58%)'
      }
    }
  }
} satisfies Config
