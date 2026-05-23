import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Token aliases (kept stable so we don't rewrite every component).
        // ink = page background family (cream)
        ink: {
          DEFAULT: '#F5EFE4',
          900: '#F5EFE4',
          800: '#EFE7D6',
          700: '#E5DCC5',
          600: '#D6CBB0',
        },
        // bone = foreground text (forest)
        bone: {
          DEFAULT: '#1F3A2F',
          50: '#2C5142',
          100: '#1F3A2F',
          200: '#15281F',
          300: '#0E1B14',
        },
        sand: {
          DEFAULT: '#A89B7E',
          dim: '#6E6754',
        },
        gold: {
          DEFAULT: '#B5985A',
          dim: '#8E743D',
        },
        accent: '#B5985A',
        topbar: '#8B1F6E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        display: '-0.025em',
      },
      maxWidth: {
        page: '1440px',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
