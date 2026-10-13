import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // A demo on a vercel.app address is a copy of the real site, so search engines are kept out of it
  if (new URL(SITE.url).hostname.endsWith('.vercel.app')) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    // The CMS and its API are not for search engines
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
