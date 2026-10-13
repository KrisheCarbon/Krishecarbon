import Link from 'next/link'

import { NAV_LINKS, SITE } from '@/lib/site'

import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="foot on-dark">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <Logo />
            <p>Channelling carbon finance into better soils, rural livelihoods, and lasting climate action.</p>
          </div>
          <nav className="foot__col" aria-label="Footer">
            <span className="foot__k label-sm">Quick links</span>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link href="/enquire">Enquire</Link>
          </nav>
          <div className="foot__col">
            <span className="foot__k label-sm">Contact</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.href}`}>{SITE.phone.label}</a>
            <span>{SITE.address}</span>
          </div>
        </div>
        <div className="foot__base">
          <span>© {new Date().getFullYear()} KriSHE Carbon. All rights reserved.</span>
          <span>
            Built with responsibility by{' '}
            <a href="https://www.camphorx.com/" target="_blank" rel="noopener">
              CamphorX
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
