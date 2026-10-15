'use client'

import { useEffect, useRef, useState } from 'react'

type ConnectionNavigator = Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }

/**
 * The hero's background film. The poster image is already on screen; this starts
 * loading after hydration, picks a size for the screen, and fades in once it plays.
 * Skipped entirely for reduced motion and data-saver.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const connection = (navigator as ConnectionNavigator).connection
    if (connection?.saveData) return

    // React does not write the `muted` attribute into server-rendered HTML,
    // and browsers refuse to autoplay a video they think has sound
    video.muted = true
    // The smallest file that still looks right: phones and slow connections get the 480p cut,
    // which is well under half the size of the 720p one and so starts playing much sooner
    const slow = Boolean(connection?.effectiveType && connection.effectiveType !== '4g')
    const size = slow || innerWidth <= 700 ? 480 : innerWidth <= 1500 ? 720 : 1080
    video.src = `/media/hero-${size}.mp4`
    video.play().catch(() => {})

    // Don't decode frames nobody can see
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      className={`hero__video${playing ? ' is-playing' : ''}`}
      muted
      loop
      playsInline
      preload="auto"
      onPlaying={() => setPlaying(true)}
    />
  )
}
