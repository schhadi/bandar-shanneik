import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Token aliases (kept stable so we don't rewrite every component).
        // ink = page background family (warm paper)
        ink: {
          DEFAULT: '#FBFAF6',
          900: '#FBFAF6',
          800: '#F4F2EA',
          700: '#ECE9DE',
          600: '#E2DECF',
        },
        // bone = foreground text (near-black)
        bone: {
          DEFAULT: '#1A1A17',
          50: '#3C3C36',
          100: '#1A1A17',
          200: '#121210',
          300: '#0A0A08',
        },
        sand: {
          DEFAULT: '#8A8678',
          dim: '#6E6B5F',
        },
        gold: {
          DEFAULT: '#2F5A48',
          dim: '#264a3b',
        },
        // Single accent — a deep, warm green
        accent: '#2F5A48',
        topbar: '#2F5A48',
      },
      fontFamily: {
        // Single typeface throughout the site.
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        mono: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
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
