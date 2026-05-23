import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF6EF',
          100: '#F5EFE4',
          200: '#EFE7D6',
        },
        forest: {
          DEFAULT: '#1F3A2F',
          dark: '#15281F',
          light: '#2C5142',
        },
        gold: {
          DEFAULT: '#B5985A',
          light: '#D0B987',
          dark: '#8E743D',
        },
        accent: {
          purple: '#8B1F6E',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
