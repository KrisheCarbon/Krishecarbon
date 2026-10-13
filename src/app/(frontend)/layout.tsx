import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Google_Sans } from 'next/font/google'
import React from 'react'

import { AtomDefs } from '@/components/Atom'
import { EdgeBlur } from '@/components/EdgeBlur'
import { Footer } from '@/components/Footer'
import { Loader } from '@/components/Loader'
import { Nav } from '@/components/Nav'
import { SiteEffects } from '@/components/SiteEffects'
import { SITE } from '@/lib/site'

import './globals.css'

const googleSans = Google_Sans({
  subsets: ['latin'],
  variable: '--font-google-sans',
  display: 'swap',
})

// The heading typeface in KriSHE's brand guide. Headings are in Google Sans for now; change this
// to true to set them in DM Serif Display instead (and set `preload` below to true with it).
const SERIF_HEADINGS = false

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
  // Not fetched at all unless a heading actually uses it
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'KriSHE Carbon — Biochar carbon removal with India’s smallholder farmers',
    template: '%s — KriSHE Carbon',
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_IN',
    images: ['/media/hero.jpg'],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#13231d',
}

// Without JavaScript nothing would ever reveal, so show everything straight away
const NO_SCRIPT_CSS = `
  .loader { display: none }
  html.is-loading { overflow: auto }
  .is-loading .nav, .js .nav .brand__logo, .js [data-reveal], .js [data-enter], .js .manifesto .w,
  .js .art .dash, .js .art .flow, .js .atom--bg .atom__electron { opacity: 1 !important; filter: none !important; transform: none !important }
  .js .art .draw, .js .atom--bg .atom__orbit { stroke-dashoffset: 0 !important }
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `js` and `is-loading` are read by the CSS; the loader swaps them for `is-entering` / `is-ready`
    <html
      lang="en"
      className={`${googleSans.variable} ${dmSerif.variable}${SERIF_HEADINGS ? ' serif-headings' : ''} js is-loading`}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <style>{NO_SCRIPT_CSS}</style>
        </noscript>
        <AtomDefs />
        <Loader />
        <Nav />
        <EdgeBlur />
        <main>{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  )
}
