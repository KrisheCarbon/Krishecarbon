'use client'

import { useEffect, useRef } from 'react'

type LoopVideoProps = {
  // File name in /public/media without extension: expects name.mp4 and name.jpg (poster)
  name: string
  className?: string
}

/**
 * A short silent loop. Only its poster loads with the page; the video itself is fetched
 * a screen or so before it scrolls into view, so it is already playing when it arrives,
 * and it pauses again when it leaves.
 */
export function LoopVideo({ name, className }: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // See HeroVideo: the attribute alone is not enough for autoplay
    video.muted = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.preload = 'auto'
            video.src = `/media/${name}.mp4`
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '900px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [name])

  return <video ref={videoRef} className={className} poster={`/media/${name}.jpg`} muted loop playsInline preload="none" />
}
