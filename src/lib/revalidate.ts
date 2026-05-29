import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

// Revalidate the root layout, which transitively invalidates every page and
// the header/footer rendered inside (frontend)/[locale]/layout.tsx.
const revalidateAll = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // revalidatePath throws if called outside a request scope (e.g. during seed/CLI).
  }
}

export const revalidateOnChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateAll()
  return doc
}

export const revalidateOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateAll()
  return doc
}

export const revalidateGlobalOnChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidateAll()
  return doc
}
