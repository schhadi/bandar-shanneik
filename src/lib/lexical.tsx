import React from 'react'

type Node = {
  type?: string
  tag?: string
  text?: string
  format?: number
  listType?: string
  children?: Node[]
  fields?: { url?: string; newTab?: boolean }
  url?: string
}

type RenderKey = string | number

function renderText(node: Node, key: RenderKey) {
  let element: React.ReactNode = node.text ?? ''
  const fmt = node.format ?? 0
  if (fmt & 1) element = <strong key={`b-${key}`}>{element}</strong>
  if (fmt & 2) element = <em key={`i-${key}`}>{element}</em>
  if (fmt & 8) element = <u key={`u-${key}`}>{element}</u>
  if (fmt & 4) element = <s key={`s-${key}`}>{element}</s>
  return <React.Fragment key={key}>{element}</React.Fragment>
}

function renderNode(node: Node, key: RenderKey): React.ReactNode {
  const children = node.children?.map((c, i) => renderNode(c, i))
  switch (node.type) {
    case 'text':
      return renderText(node, key)
    case 'paragraph':
      return (
        <p key={key} className="mb-4 leading-relaxed text-bone/80">
          {children}
        </p>
      )
    case 'heading': {
      const Tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <Tag key={key} className="mb-4 mt-8 text-2xl font-medium tracking-tight">
          {children}
        </Tag>
      )
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <Tag key={key} className="mb-4 ml-6 list-disc space-y-1 text-bone/80">
          {children}
        </Tag>
      )
    }
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'link':
      return (
        <a
          key={key}
          href={node.fields?.url || node.url || '#'}
          target={node.fields?.newTab ? '_blank' : undefined}
          rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          className="text-accent underline"
        >
          {children}
        </a>
      )
    case 'linebreak':
      return <br key={key} />
    case 'quote':
      return (
        <blockquote key={key} className="my-6 border-l-2 border-accent pl-4 italic text-bone/70">
          {children}
        </blockquote>
      )
    default:
      return <React.Fragment key={key}>{children}</React.Fragment>
  }
}

export function RichTextRenderer({ data }: { data: { root?: { children?: Node[] } } | null | undefined }) {
  const root = data?.root
  if (!root?.children) return null
  return <>{root.children.map((node, i) => renderNode(node, i))}</>
}
