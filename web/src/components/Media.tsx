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
}: {
  media: MediaProp
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (!media || typeof media === 'string') return null
  const url = media.url
  if (!url) return null
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
    />
  )
}
