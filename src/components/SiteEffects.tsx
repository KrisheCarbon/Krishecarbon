'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

/**
 * Page-wide behaviour that markup opts into with attributes:
 *   data-reveal            focus-in once when scrolled into view ("draw" / "words" reveal their own parts)
 *   data-count="1000"      count up to the number when revealed
 *   .art                   line art whose strokes draw themselves on reveal
 * It also keeps the scroll-linked state on <html> / the hero that the CSS reads.
 * Re-runs on every route change, since each page brings new elements.
 */
export function SiteEffects() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Line art: every solid stroke gets a normalised length so CSS can draw it in */
    document.querySelectorAll('.art').forEach((svg) => {
      svg.querySelectorAll('path, line, circle, ellipse, rect, polygon').forEach((shape) => {
        if (shape.matches('.dash, .flow')) return
        shape.setAttribute('pathLength', '1')
        shape.classList.add('draw')
      })
    })

    if (reduceMotion) {
      document.querySelectorAll<SVGSVGElement>('.atom svg, svg.art').forEach((svg) => svg.pauseAnimations())
    }

    /* Reveal + count-up */
    const countUp = (el: HTMLElement) => {
      if (reduceMotion) return
      const target = Number(el.dataset.count)
      const start = performance.now()
      const step = (now: number) => {
        const t = clamp((now - start) / 1400)
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 4))))
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return
          target.classList.add('is-in')
          target.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
          revealObserver.unobserve(target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el))

    /* The bottom edge blur leaves the footer clear */
    const footer = document.querySelector('footer')
    const footerObserver = new IntersectionObserver(([entry]) => {
      root.classList.toggle('is-at-footer', entry.isIntersecting)
    })
    if (footer) footerObserver.observe(footer)

    /* Scroll-linked state */
    const hero = document.querySelector<HTMLElement>('.hero')
    let frameQueued = false
    let scrollIdle: ReturnType<typeof setTimeout>

    /* The three-phase process: its rail names the phase on screen, and a line fills beside it
       as the reader moves through. The middle of the window is the reading position. */
    const spine = document.querySelector<HTMLElement>('[data-spine]')
    const railItems = spine ? [...spine.querySelectorAll('.spine__rail li')] : []
    const phases = spine ? [...spine.querySelectorAll<HTMLElement>('[data-phase]')] : []
    const updateSpine = () => {
      if (!spine) return
      const middle = innerHeight / 2
      const box = spine.getBoundingClientRect()
      spine.style.setProperty('--spine', clamp((middle - box.top) / box.height).toFixed(3))
      let onScreen = 0
      phases.forEach((phase, i) => {
        if (phase.getBoundingClientRect().top < middle) onScreen = i
      })
      railItems.forEach((item, i) => item.classList.toggle('is-active', i === onScreen))
    }

    const onFrame = () => {
      frameQueued = false
      if (hero && !reduceMotion) {
        hero.style.setProperty('--hp', clamp(scrollY / (hero.offsetHeight * 0.85)).toFixed(3))
      }
      updateSpine()
    }

    const onScroll = () => {
      // The edge blur shows while the page is moving and settles once it stops
      root.classList.add('is-scrolling')
      clearTimeout(scrollIdle)
      scrollIdle = setTimeout(() => root.classList.remove('is-scrolling'), 220)

      if (frameQueued) return
      frameQueued = true
      requestAnimationFrame(onFrame)
    }

    onFrame()
    addEventListener('scroll', onScroll, { passive: true })

    /* Links to a section of the same page glide there. Left alone, the jump happens in a single
       frame, which is jarring from the top of a long page to its far end. */
    let glide = 0
    const stopGlide = () => cancelAnimationFrame(glide)

    const glideTo = (top: number) => {
      const from = scrollY
      const distance = top - from
      // Longer trips take longer, within limits, so the page never crawls or snaps
      const duration = clamp(Math.abs(distance) * 0.3, 650, 1500)
      const started = performance.now()
      const step = (now: number) => {
        const t = clamp((now - started) / duration)
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        scrollTo({ top: from + distance * eased, behavior: 'instant' })
        if (t < 1) glide = requestAnimationFrame(step)
      }
      stopGlide()
      glide = requestAnimationFrame(step)
    }

    const onLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
      if (!link || link.target === '_blank') return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return
      const section = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!section) return

      // Takes the click away from the browser and from Next's router, which would both jump
      event.preventDefault()
      history.pushState(null, '', url.hash)
      const top = section.getBoundingClientRect().top + scrollY
      if (reduceMotion) scrollTo({ top, behavior: 'instant' })
      else glideTo(top)
    }

    // On the window, in the capture phase, so it runs before anything else sees the click
    addEventListener('click', onLinkClick, true)
    // The visitor scrolling by hand always wins
    addEventListener('wheel', stopGlide, { passive: true })
    addEventListener('touchstart', stopGlide, { passive: true })

    return () => {
      revealObserver.disconnect()
      footerObserver.disconnect()
      removeEventListener('scroll', onScroll)
      removeEventListener('click', onLinkClick, true)
      removeEventListener('wheel', stopGlide)
      removeEventListener('touchstart', stopGlide)
      stopGlide()
      clearTimeout(scrollIdle)
      root.classList.remove('is-scrolling', 'is-at-footer')
    }
  }, [pathname])

  return null
}
