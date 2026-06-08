import { Inter } from 'next/font/google'

// Self-hosted via next/font (no render-blocking Google Fonts <link>).
// Exposes the `--font-sans` CSS variable consumed by tailwind.config.ts and
// globals.css. Apply `inter.variable` to every self-contained <html> document
// (the per-locale layout and the global not-found page).
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})
