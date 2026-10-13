import type { CSSProperties } from 'react'

// One orbit of the logo's atom, in its own frame. The three rings are this path turned 90°, 30° and -30°.
const ORBIT = 'M71.1 0A71.1 29 0 1 1-71.1 0 71.1 29 0 1 1 71.1 0'

// Seconds per lap and starting offset for each ring's electron, at the slow background pace
const RINGS = [
  { turn: 90, lap: 16, offset: -9.7 },
  { turn: 30, lap: 20, offset: -8.1 },
  { turn: -30, lap: 24, offset: -9.3 },
]

// "solid" matches the logo's proportions and orbits a little quicker
const VARIANTS = {
  bg: { electron: 1.1, speed: 1 },
  solid: { electron: 6.25, speed: 0.32 },
}

type AtomProps = {
  variant?: keyof typeof VARIANTS
  // Seconds before each ring starts drawing, and before its electron appears (loader only)
  drawDelays?: { ring: number; electron: number }[]
}

/**
 * The atom from the logo on its own: three interlocked rings and their electrons.
 * Each ring is clipped by #atom-weave (defined once in the layout) so it passes
 * behind its neighbour exactly where it does in the logo, electron included.
 */
export function Atom({ variant = 'bg', drawDelays }: AtomProps) {
  const { electron, speed } = VARIANTS[variant]

  return (
    <svg viewBox="-80 -80 160 160" fill="none" aria-hidden="true">
      {RINGS.map(({ turn, lap, offset }, i) => (
        <g key={turn} transform={`rotate(${turn})`} clipPath="url(#atom-weave)">
          <path
            className="atom__orbit"
            pathLength={1}
            d={ORBIT}
            style={drawDelays && ({ '--t': `${drawDelays[i].ring}s` } as CSSProperties)}
          />
          <circle
            className="atom__electron"
            r={electron}
            style={drawDelays && ({ '--t': `${drawDelays[i].electron}s` } as CSSProperties)}
          >
            <animateMotion
              dur={`${(lap * speed).toFixed(2)}s`}
              begin={`${(offset * speed).toFixed(2)}s`}
              repeatCount="indefinite"
              path={ORBIT}
            />
          </circle>
        </g>
      ))}
    </svg>
  )
}

/**
 * Shared SVG definitions, rendered once per page.
 *
 * #atom-weave is how the three rings interlock in the logo. In a ring's own frame it passes behind
 * wherever it is inside the neighbour turned -60° but outside the one turned +60°: two small lens
 * shapes. Clipping each ring to everything except those hides that stretch of its line and makes its
 * electron slide behind there too. (One path, one fill rule: browsers disagree on mixed rules.)
 */
export function AtomDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <clipPath id="atom-weave">
        <path
          clipRule="evenodd"
          d="M-200 -200H200V200H-200Z M32.594 0A71.1 29 -60 0 0 0 -47.371A71.1 29 60 0 1 32.594 0Z M-32.594 0A71.1 29 -60 0 0 0 47.371A71.1 29 60 0 1 -32.594 0Z"
        />
      </clipPath>
    </svg>
  )
}
