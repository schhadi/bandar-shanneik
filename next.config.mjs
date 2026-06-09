import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [],
    // Serve modern formats and stop the optimizer from softening portraits at
    // the default quality of 75.
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
}

export default withPayload(nextConfig)
