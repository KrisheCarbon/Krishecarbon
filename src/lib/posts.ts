import config from '@payload-config'
import { getPayload } from 'payload'

import type { Media, Post } from '@/payload-types'

/** Published posts, newest first. An unreachable database means an empty blog, not a broken page. */
export async function getPosts(): Promise<Post[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    })
    return docs
  } catch (error) {
    console.error('Could not load blog posts from the CMS:', error)
    return []
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
      limit: 1,
      depth: 1,
    })
    return docs[0] ?? null
  } catch (error) {
    console.error(`Could not load blog post "${slug}" from the CMS:`, error)
    return null
  }
}

/** The cover as a full media record, or null when there is none (or it was not loaded). */
export const coverOf = (post: Post): Media | null =>
  post.cover && typeof post.cover === 'object' && post.cover.url ? post.cover : null

export const formatDate = (date?: string | null) =>
  date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

/* ---------- Reading the rich text ---------- */

type RichNode = { type?: string; tag?: string; text?: string; children?: RichNode[] }

const textOf = (node: RichNode): string => node.text ?? (node.children ?? []).map(textOf).join('')

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** The post's section headings (h2), for the "In this article" list. */
export function headingsOf(post: Post): { id: string; text: string }[] {
  const nodes = (post.content?.root.children ?? []) as RichNode[]
  return nodes
    .filter((node) => node.type === 'heading' && node.tag === 'h2')
    .map((node) => ({ id: slugify(textOf(node)), text: textOf(node) }))
}

/** Minutes to read at about 200 words a minute. */
export function readingTime(post: Post): number {
  const nodes = (post.content?.root.children ?? []) as RichNode[]
  const words = nodes.map(textOf).join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export { textOf }
export type { RichNode }
