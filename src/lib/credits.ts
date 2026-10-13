import config from '@payload-config'
import { getPayload } from 'payload'

export type CreditFigures = {
  available?: number | null
  issued?: number | null
  retired?: number | null
  vintage?: string | null
}

/**
 * The credit figures from the CMS. If the database can't be reached the page
 * still renders, just without the figures.
 */
export async function getCredits(): Promise<CreditFigures> {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({ slug: 'credits' })
  } catch (error) {
    console.error('Could not load credit figures from the CMS:', error)
    return {}
  }
}
