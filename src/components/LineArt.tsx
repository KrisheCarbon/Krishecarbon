import type { ReactNode } from 'react'

/**
 * Line-art illustrations. Shapes are plain strokes; SiteEffects gives each one a
 * normalised length so the CSS can draw it in when its card is revealed.
 *   .occ   filled with the panel colour, to hide what is behind it
 *   .hi    highlight stroke     .tint  highlight fill
 *   .dash  dashed, fades in     .flow  dashes that travel along the path
 */

function Art({ viewBox = '0 0 360 240', children }: { viewBox?: string; children: ReactNode }) {
  return (
    <svg className="art" viewBox={viewBox} aria-hidden="true">
      {children}
    </svg>
  )
}

// One ear of grain, drawn pointing up from the tip of its stalk
const EAR = 'M0 0C-7 -9 -7 -22 0 -32C7 -22 7 -9 0 0Z'

/** A sheaf: five stalks tied at the waist, standing in a cut field. Nothing crosses; the tie hides the pinch. */
export function ResidueArt() {
  return (
    <Art>
      <path d="M48 212H312" />
      <path d="M76 212v-9M100 212v-6M124 212v-8M236 212v-8M260 212v-6M284 212v-9" />
      <path d="M180 212V72" />
      <path d="M170 212C173 180 176 158 175 140C173 116 160 94 148 76" />
      <path d="M190 212C187 180 184 158 185 140C187 116 200 94 212 76" />
      <path d="M158 212C166 182 171 160 170 140C167 118 142 106 120 100" />
      <path d="M202 212C194 182 189 160 190 140C193 118 218 106 240 100" />
      <path d={EAR} transform="translate(180 72)" />
      <path d={EAR} transform="translate(148 76) rotate(-33.7)" />
      <path d={EAR} transform="translate(212 76) rotate(33.7)" />
      <path d={EAR} transform="translate(120 100) rotate(-74.7)" />
      <path d={EAR} transform="translate(240 100) rotate(74.7)" />
      <path d="M166 180C156 170 146 170 138 176C146 184 156 186 166 180Z" />
      <path d="M194 180C204 170 214 170 222 176C214 184 204 186 194 180Z" />
      <rect className="occ hi" x="164" y="133" width="32" height="14" rx="5" />
    </Art>
  )
}

/** The cone kiln as it is in the field: on a wheeled trailer, burning, with a sensor reporting from its side. */
export function KilnArt() {
  return (
    <Art>
      <path d="M56 215H304" />
      {/* The fire sits inside the mouth of the cone: in front of the back of the rim (drawn first, and
          hidden where the flames cover it) and behind the front of the rim (drawn last) */}
      <path d="M100 112A72 13 0 0 1 244 112" />
      <path
        className="occ"
        d="M134 112C130 90 140 80 144 62C152 72 156 82 158 92C160 72 166 54 174 34C184 52 190 68 192 86C198 78 202 70 205 58C214 74 218 92 212 112Q173 123 134 112Z"
      />
      <path className="hi" d="M160 113C158 94 166 84 172 68C180 84 186 96 184 113Q172 118 160 113Z" />
      <path d="M100 112A72 13 0 0 0 244 112" />
      <path d="M100 112 146 184M244 112 198 184" />
      <path d="M146 184A26 5 0 0 0 198 184" />
      <path d="M123 148A49 9 0 0 0 221 148" />
      {/* Trailer: chassis, tow bar and one wheel in front of the chassis */}
      <path d="M152 198 147 187M192 198 197 187" />
      <path d="M108 198H262" />
      <path d="M108 198 82 214" />
      <circle className="occ" cx="236" cy="200" r="15" />
      <circle cx="236" cy="200" r="5" />
      {/* Sensor */}
      <path d="M227 140H260" />
      <rect x="260" y="130" width="28" height="20" rx="5" />
      <path className="hi" d="M268 140H280" />
      <path d="M266 122A8 8 0 0 1 282 122M260 116A15 15 0 0 1 288 116" />
    </Art>
  )
}

/** A grid of plots with a map pin over the treated one. */
export function GeotagArt() {
  return (
    <Art>
      <path d="M180 92 36 140M228 108 84 156M276 124 132 172M324 140 180 188" />
      <path d="M180 92 324 140M132 108 276 156M84 124 228 172M36 140 180 188" />
      <path d="M36 140V152L180 200 324 152V140M180 188V200" />
      <polygon className="hi tint" points="180,124 228,140 180,156 132,140" />
      <path className="dash" d="M180 122V140" />
      <path className="occ" d="M180 122C168 106 163 97 163 88A17 17 0 1 1 197 88C197 97 192 106 180 122Z" />
      <circle cx="180" cy="88" r="6" />
    </Art>
  )
}

/** A satellite on its orbit, scanning one patch of ground. The orbit and the ground line stop short of what sits on them. */
export function SatelliteArt() {
  return (
    <Art>
      {/* Orbit, broken where the satellite is */}
      <path className="dash" d="M24 96Q65 79.7 106 72M254 72Q295 79.7 336 96" />
      <rect x="166" y="54" width="28" height="22" rx="3" />
      <rect x="114" y="56" width="44" height="18" />
      <rect x="202" y="56" width="44" height="18" />
      <path d="M128.7 56V74M143.3 56V74M216.7 56V74M231.3 56V74M158 65H166M194 65H202" />
      <path d="M180 76V84M172 84A8 8 0 0 0 188 84" />
      {/* Beam and its footprint */}
      <path className="dash" d="M175 98 126 194M185 98 234 194" />
      <ellipse cx="180" cy="204" rx="62" ry="13" />
      <ellipse className="dash" cx="180" cy="204" rx="36" ry="7.5" />
      <ellipse className="hi tint" cx="180" cy="204" rx="14" ry="3.2" />
      <path d="M20 208H104M256 208H340" />
    </Art>
  )
}

/** Four farm plots, each drawn as its own outline with a point inside it; one is the plot in hand. */
export function PlotsArt() {
  return (
    <Art>
      <polygon className="hi tint" points="40,60 142,50 158,112 62,132" />
      <polygon className="dash" points="172,54 284,64 272,134 166,120" />
      <polygon className="dash" points="68,148 188,136 204,198 92,208" />
      <polygon className="dash" points="224,148 332,136 342,194 238,202" />
      <circle cx="100" cy="88" r="5" />
      <circle cx="224" cy="94" r="5" />
      <circle cx="136" cy="172" r="5" />
      <circle cx="284" cy="170" r="5" />
    </Art>
  )
}

/** Soil in section beside a depth scale: a sampling tube taken through the top layer and the one under it. */
export function SoilArt() {
  return (
    <Art>
      <path d="M78 46V198" />
      <path d="M70 46H78M70 122H78M70 198H78" />
      <text className="art__txt art__txt--sm" x="62" y="50" textAnchor="end">
        0
      </text>
      <text className="art__txt art__txt--sm" x="62" y="126" textAnchor="end">
        15
      </text>
      <text className="art__txt art__txt--sm" x="62" y="202" textAnchor="end">
        30 cm
      </text>
      <path d="M96 46H176M214 46H312" />
      <path className="dash" d="M96 122H176M214 122H312" />
      <path className="dash" d="M96 198H176M214 198H312" />
      <circle className="hi" cx="120" cy="72" r="3.5" />
      <circle className="hi" cx="152" cy="98" r="3.5" />
      <circle className="hi" cx="244" cy="70" r="3.5" />
      <circle className="hi" cx="286" cy="96" r="3.5" />
      <circle className="hi" cx="262" cy="104" r="3.5" />
      <rect x="186" y="30" width="18" height="184" rx="7" />
      <path className="hi" d="M186 122H204" />
    </Art>
  )
}

/** A batch tag: its code as bars, with the place and the time it was made beneath. */
export function BatchArt() {
  return (
    <Art>
      <path d="M92 60H240L276 100 240 140H92Z" />
      <circle cx="244" cy="100" r="6" />
      <path d="M114 80V120M124 80V120M131 80V112M142 80V120M152 80V112M163 80V120M173 80V120M180 80V112M191 80V120M202 80V112M212 80V120" />
      <path d="M130 196C122 185 118 179 118 173A12 12 0 1 1 142 173C142 179 138 185 130 196Z" />
      <circle className="hi" cx="130" cy="173" r="4" />
      <circle cx="222" cy="178" r="17" />
      <path className="hi" d="M222 168V178L230 183" />
    </Art>
  )
}

/** A field record: three entries, each one checked, and a seal on the corner once it is verified. */
export function RecordArt() {
  return (
    <Art>
      <rect x="112" y="34" width="136" height="172" rx="10" />
      <path d="M160 74H222M160 114H222M160 154H206" />
      <path className="dash" d="M160 88H204M160 128H212M160 168H190" />
      <path className="hi" strokeWidth="2" d="M130 76 136 82 147 69M130 116 136 122 147 109M130 156 136 162 147 149" />
      <circle className="occ" cx="248" cy="184" r="24" />
      <path className="hi" strokeWidth="2" d="M237 184 245 192 260 175" />
    </Art>
  )
}

/** A carbon lattice with one cell verified. */
export function CreditArt() {
  return (
    <Art>
      <polygon points="232,90 258,105 258,135 232,150 206,135 206,105" />
      <polygon points="128,90 154,105 154,135 128,150 102,135 102,105" />
      <polygon points="206,45 232,60 232,90 206,105 180,90 180,60" />
      <polygon points="154,45 180,60 180,90 154,105 128,90 128,60" />
      <polygon points="206,135 232,150 232,180 206,195 180,180 180,150" />
      <polygon points="154,135 180,150 180,180 154,195 128,180 128,150" />
      <polygon className="hi tint" points="180,90 206,105 206,135 180,150 154,135 154,105" />
      <path className="hi" strokeWidth="2" d="M169 120 177 128 192 111" />
    </Art>
  )
}

/** Money flowing from one coin to three people. */
export function RevenueArt() {
  return (
    <Art>
      <path d="M50 200H310" />
      <path className="flow" d="M180 88C180 128 92 118 92 148M180 88V148M180 88C180 128 268 118 268 148" />
      <circle className="occ" cx="180" cy="62" r="26" />
      <text className="art__txt" x="180" y="71" textAnchor="middle">
        ₹
      </text>
      <circle cx="92" cy="166" r="9" />
      <path d="M75 200A17 17 0 0 1 109 200" />
      <circle cx="180" cy="166" r="9" />
      <path d="M163 200A17 17 0 0 1 197 200" />
      <circle cx="268" cy="166" r="9" />
      <path d="M251 200A17 17 0 0 1 285 200" />
    </Art>
  )
}

/** Three buyers, three ticks. */
export function BuyersArt() {
  return (
    <Art viewBox="0 0 120 72">
      <circle cx="19" cy="36" r="18" />
      <circle cx="60" cy="36" r="18" />
      <circle cx="101" cy="36" r="18" />
      <path className="hi" strokeWidth="2" d="M11 36 17 42 28 30M52 36 58 42 69 30M93 36 99 42 110 30" />
    </Art>
  )
}

/** A ring with 86% of it drawn solid: biochar's share of the carbon removal credits delivered. */
export function ShareArt() {
  return (
    <Art viewBox="0 0 120 72">
      <path className="hi" strokeWidth="2" d="M36 10A26 26 0 1 1 15.97 19.43" />
      <path className="dash" d="M15.97 19.43A26 26 0 0 1 36 10" />
    </Art>
  )
}

/** Soil in section: the surface, the layers under it, and carbon held in the lowest one. */
export function PermanenceArt() {
  return (
    <Art viewBox="0 0 120 72">
      <path d="M8 12H112" />
      <path className="dash" d="M14 26H106" />
      <path className="dash" d="M20 46H42M78 46H100" />
      <polygon className="hi" points="60,34 70.4,40 70.4,52 60,58 49.6,52 49.6,40" />
      <path className="dash" d="M30 66H90" />
    </Art>
  )
}

/** A seedling above a soil line. */
export function SproutArt() {
  return (
    <Art viewBox="0 0 120 72">
      <path d="M8 58H112" />
      <path className="dash" d="M20 66H100" />
      <path d="M60 58V30" />
      <path className="hi" d="M60 40C46 40 38 32 36 18 50 18 58 26 60 40Z" />
      <path className="hi" d="M60 32C62 18 70 10 86 10 86 24 76 32 60 32Z" />
    </Art>
  )
}
