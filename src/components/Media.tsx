import Image from 'next/image'

type MediaProp =
  | {
      url?: string | null
      alt?: string | null
      width?: number | null
      height?: number | null
    }
  | string
  | null
  | undefined

export function MediaImage({
  media,
  className,
  sizes = '100vw',
  priority,
  quality = 90,
}: {
  media: MediaProp
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
}) {
  if (!media || typeof media === 'string') return null
  if (!media.url) return null
  // Payload's default upload handler serves at /api/media/file/<name>, which has no
  // persistent disk on Vercel serverless. The same files are bundled in /public/media,
  // so rewrite to the static asset and drop any Payload-appended "-N" dedupe suffix.
  const url = media.url
    .replace(/^\/api\/media\/file\//, '/media/')
    .replace(/-\d+(\.[^./]+)$/, '$1')
  const width = media.width || 1200
  const height = media.height || 1200
  return (
    <Image
      src={url}
      alt={media.alt || ''}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={quality}
    />
  )
}
