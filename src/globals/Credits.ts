import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * The credit figures shown on the site. They change two or three times a year,
 * so they are edited here by hand rather than pulled from the registry.
 * A figure left empty is simply not shown.
 */
export const Credits: GlobalConfig = {
  slug: 'credits',
  label: 'Carbon credits',
  access: {
    read: () => true,
  },
  hooks: {
    // Pages are cached; refresh them as soon as the numbers change
    afterChange: [
      () => {
        try {
          revalidatePath('/', 'layout')
        } catch {
          // Saved from a script outside the web server: there is no page cache to refresh
        }
      },
    ],
  },
  fields: [
    {
      name: 'available',
      label: 'Available to purchase',
      type: 'number',
      min: 0,
      admin: { description: 'Credits a buyer can purchase today.' },
    },
    {
      name: 'issued',
      label: 'Issued',
      type: 'number',
      min: 0,
      admin: { description: 'Total credits issued to date.' },
    },
    {
      name: 'retired',
      label: 'Retired',
      type: 'number',
      min: 0,
      admin: { description: 'Credits already retired on behalf of buyers.' },
    },
    {
      name: 'vintage',
      label: 'Vintage',
      type: 'text',
      admin: { description: 'Year or range the available credits belong to, e.g. "2025" or "2024–2025".' },
    },
  ],
}
