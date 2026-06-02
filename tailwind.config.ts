import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ink = page background (off-white)
        ink: {
          DEFAULT: '#FAFAF7',
          900: '#FAFAF7',
          800: '#F2F1EC',
        },
        // bone = foreground text (near-black)
        bone: {
          DEFAULT: '#111111',
          100: '#111111',
          200: '#0A0A0A',
        },
        // deep teal / petrol accent — subheadings, links, hovers
        accent: '#0E6E63',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
