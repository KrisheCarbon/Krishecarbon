'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { NAV_LINKS, SITE } from '@/lib/site'

import { Logo } from './Logo'

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className={`nav${solid ? ' is-solid' : ''}`}>
      <div className="nav__bar glass">
        <Logo priority />
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav__cta">
          <a className="btn btn--ghost btn--sm" href={SITE.loginUrl}>
            Login
          </a>
          <Link className="btn btn--sm" href="/enquire">
            Buy credits
          </Link>
        </div>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className={`menu glass${menuOpen ? ' is-open' : ''}`} id="menu" onClick={() => setMenuOpen(false)}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <Link href="/enquire">Buy credits</Link>
        <a href={SITE.loginUrl}>Login</a>
      </div>
    </header>
  )
}
