'use client'

import { useEffect, useRef } from 'react'

import { Atom } from './Atom'

const STAGES = ['Collecting residue', 'Firing the kiln', 'Making biochar', 'Storing carbon']
// Where the atom sits inside the logo artwork, as fractions of the image's width / height
const LOGO_ATOM = { centerX: 0.8276, centerY: 0.3012, size: 0.3432 }
const DRAW_DELAYS = [
  { ring: 0.1, electron: 1 },
  { ring: 0.28, electron: 1.12 },
  { ring: 0.46, electron: 1.24 },
]
const MAX_MS = 6000

/**
 * First-load intro: a white atom draws itself on black, then flies onto the atom in the nav logo,
 * turning the logo's green on the way, while the black lifts off the page.
 */
export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const atomRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLSpanElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const loader = loaderRef.current
    const atom = atomRef.current
    if (!loader || !atom) return

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const minMs = reduceMotion ? 600 : 2400
    const startedAt = performance.now()
    let pageLoaded = document.readyState === 'complete'
    let finished = false
    let frame = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    const onLoad = () => {
      pageLoaded = true
    }
    addEventListener('load', onLoad)

    const setProgress = (p: number) => {
      loader.style.setProperty('--p', p.toFixed(3))
      if (percentRef.current) percentRef.current.textContent = String(Math.round(p * 100)).padStart(3, '0')
      if (stageRef.current) {
        stageRef.current.textContent = STAGES[Math.min(STAGES.length - 1, Math.floor(p * STAGES.length))]
      }
    }

    const finish = () => {
      if (finished) return
      finished = true
      setProgress(1)
      root.classList.remove('is-loading')
      root.classList.add('is-entering')

      const from = atom.getBoundingClientRect()
      const logo = document.querySelector('.nav .brand__logo')?.getBoundingClientRect()
      if (!reduceMotion && logo && from.width && logo.width) {
        const size = logo.width * LOGO_ATOM.size
        const left = logo.left + logo.width * LOGO_ATOM.centerX - size / 2
        const top = logo.top + logo.height * LOGO_ATOM.centerY - size / 2
        atom.style.transform = `translate(${left - from.left}px, ${top - from.top}px) scale(${size / from.width})`
      }
      loader.classList.add('is-leaving')

      // The atom turns green as it flies and lands after 1s:
      // the real logo then fades in underneath as the atom fades out
      timers.push(
        setTimeout(
          () => {
            root.classList.add('is-ready')
            loader.classList.add('is-done')
          },
          reduceMotion ? 200 : 1000,
        ),
        setTimeout(
          () => {
            loader.hidden = true
          },
          reduceMotion ? 600 : 1450,
        ),
      )
    }

    const tick = (now: number) => {
      if (finished) return
      const elapsed = now - startedAt
      let p = Math.min(1, elapsed / minMs)
      // Hold just short of done until the page has loaded (or we give up waiting)
      if (!pageLoaded && elapsed < MAX_MS) p = Math.min(p, 0.9)
      setProgress(p)
      if (p >= 1) finish()
      else frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    // rAF is throttled in background tabs; never leave the page stuck behind the loader
    timers.push(setTimeout(finish, MAX_MS + 500))

    return () => {
      removeEventListener('load', onLoad)
      cancelAnimationFrame(frame)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="loader" ref={loaderRef} role="status" aria-label="Loading">
      <div className="loader__bg" />
      <div className="loader__inner">
        <div className="atom atom--solid atom--draw loader__atom" ref={atomRef}>
          <Atom variant="solid" drawDelays={DRAW_DELAYS} />
        </div>
        <div className="loader__fade">
          <div className="loader__meter">
            <span className="loader__bar" />
          </div>
          <div className="loader__status label-sm">
            <span ref={stageRef}>{STAGES[0]}</span>
            <span ref={percentRef}>000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
