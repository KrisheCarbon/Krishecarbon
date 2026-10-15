'use client'

import { useRef, useState } from 'react'

type TestimonialVideoProps = {
  // File name in /public/media without extension: expects name.mp4 and name.jpg (poster)
  name: string
  // Read out for the play button, e.g. "A farmer from Gujarat speaks"
  label: string
  // Who is speaking, shown over the still until the film starts
  caption: string
}

/**
 * Someone speaking to camera. Only the poster loads with the page; the film is fetched when
 * play is pressed, and it then plays with its sound and the browser's own controls.
 */
export function TestimonialVideo({ name, label, caption }: TestimonialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  // One voice at a time: starting a film pauses any other that is playing
  const quietOthers = () => {
    document.querySelectorAll<HTMLVideoElement>('video[data-testimonial]').forEach((other) => {
      if (other !== videoRef.current) other.pause()
    })
  }

  const play = () => {
    setStarted(true)
    videoRef.current?.play().catch(() => {})
  }

  return (
    <div className="talk">
      <video
        ref={videoRef}
        data-testimonial
        src={`/media/${name}.mp4`}
        poster={`/media/${name}.jpg`}
        preload="none"
        playsInline
        controls={started}
        onPlay={quietOthers}
      />
      {!started && (
        <>
          <button className="talk__play" type="button" onClick={play} aria-label={`Play: ${label}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </button>
          <span className="talk__cap shot__cap glass glass--dark">{caption}</span>
        </>
      )}
    </div>
  )
}
