import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

// Blog pages are cached; refresh them whenever a post is saved or removed
const refreshBlog = () => {
  try {
    revalidatePath('/blog', 'layout')
  } catch {
    // Saved from a script outside the web server: there is no page cache to refresh
  }
}

/** Blog posts. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
  },
  access: {
    // Anyone can read published posts; drafts need a login
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [refreshBlog],
    afterDelete: [refreshBlog],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'The post address: /blog/your-slug' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'topic',
      type: 'text',
      admin: { position: 'sidebar', description: 'A one- or two-word label shown above the title, e.g. "Biochar".' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'One or two sentences, shown on the blog list and in search results.' },
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
  ],
}
