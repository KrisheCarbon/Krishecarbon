import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/posts'
import { SITE } from '@/lib/site'

const PAGES = ['', '/projects/biochar', '/climapreneurs', '/calculator', '/blog', '/enquire']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  return [
    ...PAGES.map((path) => ({ url: `${SITE.url}${path}`, changeFrequency: 'monthly' as const })),
    ...posts.map((post) => ({ url: `${SITE.url}/blog/${post.slug}`, lastModified: post.updatedAt })),
  ]
}
