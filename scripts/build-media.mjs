// Turns the raw Gujarat shoot (kept outside this project: it is ~2 GB) into small web assets.
//   npm run media                 everything
//   npm run media -- hero-480     only the named parts: hero-1080, hero-720, hero-480, loops, testimonials, photos
//   npm run media -- testimonial-4   one film by its name
// Videos go to public/media (streamed as files); photos go to src/assets/shoot (served through next/image).
// The footage was shot at 50 fps. SPEED below sets how fast it plays: 1 is real time, 0.5 is slow motion.

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import ffmpeg from 'ffmpeg-static'
import sharp from 'sharp'

const here = path.dirname(fileURLToPath(import.meta.url))
const RAW =
  process.env.RAW_MEDIA_DIR ||
  path.resolve(
    here,
    '../../media/Gujarat Shoot_April_2026 All Data-20261007T064911Z-1-004/Gujarat Shoot_April_2026 All Data',
  )
// What KriSHE sent on 13 Oct 2026: testimonials to camera, and photos of farmers and of the team.
// Its iPhone photos are HEIC, which sharp cannot open: scripts/heic-to-jpg.ps1 turns a folder of
// them into JPEGs first ("Impact Room jpg" below is "Impact Room" after that step).
const CLIENT = process.env.CLIENT_MEDIA_DIR || path.resolve(here, '../../media/client 13 Oct')
const VIDEO_OUT = path.resolve(here, '../public/media')
const PHOTO_OUT = path.resolve(here, '../src/assets/shoot')

// 1 = real time, 0.5 = half speed. The first cut of the site used 0.5, which read as lag; real time
// and then 0.75 were too quick, most of all in the small clips that loop side by side. 0.6 it is.
const SPEED = 0.6

const raw = (file) => path.join(RAW, file)
const run = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
const h264 = (crf) => ['-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart']
const mb = (file) => `${(fs.statSync(file).size / 1048576).toFixed(2)} MB`

/* ---------- Hero: four shots cross-faded into one loop ---------- */

// [file, start in the source (s), seconds on screen]
const HERO_SHOTS = [
  ['Process/AMD_0195.MP4', 1.0, 5.0], // loading residue into the kiln
  ['Process/Copy of AMD_0216.MP4', 2.0, 5.0], // the kiln burning in the field
  ['Process/AMD_0055.MP4', 1.0, 4.4], // finished biochar
  ['Videos/Filler Clips/AMD_0121.MP4', 41.0, 4.4], // village meeting
]
const FADE = 0.6

// The speed change and the common frame rate, applied to every clip first
const retime = `setpts=PTS/${SPEED},fps=25`

function hero(width, height, crf, name) {
  // The loop has no seam: the first shot is fed in a second time, the last shot cross-fades into
  // its opening, and the film is cut to start where that fade ends. Its last frame is its first.
  const shots = [...HERO_SHOTS, [HERO_SHOTS[0][0], HERO_SHOTS[0][1], FADE + 0.4]]
  const inputs = shots.flatMap(([file, start, seconds]) => ['-ss', String(start), '-t', String(seconds * SPEED), '-i', raw(file)])
  const prep = shots.map(
    (_, i) => `[${i}:v]${retime},scale=${width}:${height}:flags=lanczos,settb=AVTB,format=yuv420p[s${i}]`,
  )
  const chain = []
  let total = shots[0][2]
  let last = 's0'
  for (let i = 1; i < shots.length; i++) {
    const out = `x${i}`
    chain.push(`[${last}][s${i}]xfade=transition=fade:duration=${FADE}:offset=${(total - FADE).toFixed(2)}[${out}]`)
    if (i < HERO_SHOTS.length) total += shots[i][2] - FADE
    last = out
  }
  chain.push(`[${last}]trim=start=${FADE}:end=${total.toFixed(2)},setpts=PTS-STARTPTS[v]`)
  const out = path.join(VIDEO_OUT, name)
  run([...inputs, '-filter_complex', [...prep, ...chain].join(';'), '-map', '[v]', ...h264(crf), out])
  console.log(`  ${name}  ${(total - FADE).toFixed(1)}s  ${mb(out)}`)
  return out
}

/* ---------- Short loops for tiles ---------- */

// `seconds` is the time on screen. pingPong plays forwards then backwards, which loops without a seam
// for slow pans over still subjects; the others cross-fade their end into their own beginning.
// The loops are kept long (7 to 12 seconds): several play side by side, and short ones that keep
// restarting are disorienting to look at.
const LOOPS = [
  { name: 'biochar-pile', file: 'Process/AMD_0054.MP4', start: 0.6, seconds: 6.0, pingPong: true },
  { name: 'moisture-reading', file: 'Process/MR4.MP4', start: 0.8, seconds: 6.0, pingPong: true },
  { name: 'field-capture', file: 'Process/AMD_0151.MP4', start: 3.4, seconds: 7.2 },
  { name: 'village-meeting', file: 'Videos/Filler Clips/AMD_0121.MP4', start: 56.0, seconds: 10.0 },
  // From KriSHE's Impact Room folder: a farmer spreading biochar on her field. Filmed on a phone at
  // 30 fps in HDR, so it is brought to ordinary colour, and slowed to 0.8 (30 fps shown at 24 is smooth).
  // Hand-held over grass, it needs a firmer squeeze (crf) than the tripod shots to stay a small file.
  { name: 'biochar-spreading', file: 'Impact Room/IMG_3574.MOV', client: true, start: 5.0, seconds: 10.0, speed: 0.8, fps: 24, hdr: true, crf: 33 },
]
const LOOP_FADE = 0.5

// Phone HDR (HLG, BT.2020) to ordinary video. Without it the colours come out grey. Runs after the
// picture has been scaled down, which keeps it quick. The last step takes the edge off the colour.
const HDR_TO_SDR =
  'zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,eq=saturation=0.9'

function loop({ name, file, client, start, seconds, pingPong, speed = SPEED, fps = 25, hdr, crf = 28 }) {
  const base =
    `setpts=PTS/${speed},fps=${fps},crop=ih*4/3:ih,scale=960:720:flags=lanczos,` +
    `${hdr ? `${HDR_TO_SDR},` : ''}settb=AVTB,format=yuv420p`
  // Same idea as the hero: fade the end into a second copy of the opening, then start after the fade
  const filter = pingPong
    ? `[0:v]${base},split[f][b];[b]reverse[r];[f][r]concat=n=2:v=1[v]`
    : `[0:v]${base},split[a][b];[b]trim=end=${LOOP_FADE + 0.4},setpts=PTS-STARTPTS[head];` +
      `[a][head]xfade=transition=fade:duration=${LOOP_FADE}:offset=${(seconds - LOOP_FADE).toFixed(2)}[x];` +
      `[x]trim=start=${LOOP_FADE}:end=${seconds.toFixed(2)},setpts=PTS-STARTPTS[v]`
  const out = path.join(VIDEO_OUT, `${name}.mp4`)
  const source = client ? path.join(CLIENT, file) : raw(file)
  run(['-ss', String(start), '-t', String(seconds * speed), '-i', source, '-filter_complex', filter, '-map', '[v]', ...h264(crf), out])
  poster(out, path.join(VIDEO_OUT, `${name}.jpg`), 960)
  console.log(`  ${name}.mp4  ${mb(out)}`)
}

/* ---------- Testimonials: people speaking to camera ---------- */

// At real speed and with their sound; each is fetched only when someone presses play.
// `from` and `to` are seconds in the source. They cut away the standing still before the first word
// and after the last: each film opens about a third of a second before the speaker begins.
// `gain` (dB) lifts a quiet recording to the level of the others.
const TESTIMONIALS = [
  { name: 'testimonial-1', file: 'Selected videos/AMD_9946 (1).MP4', from: 2.4, to: 63.4, gain: 12 },
  { name: 'testimonial-2', file: 'Selected videos/AMD_9873.MP4', from: 1.9, to: 70.75 },
  { name: 'testimonial-3', file: 'Selected videos/AMD_9875.MP4', from: 1.8, to: 99.35 },
  // Two from the Impact Room folder, filmed upright on a phone (30 fps, HDR) by someone who also
  // speaks. Each is cut to the woman's own answer: it starts after the prompt and stops before the
  // person filming comes in. `window` keeps a 16:9 slice of the upright frame, that far down it.
  // Hand-held, with leaves moving behind, they need a firmer squeeze (crf) to stay a sensible size.
  { name: 'testimonial-4', file: 'Impact Room/IMG_7216.MOV', from: 1.95, to: 43.3, gain: -2, window: 0.26, hdr: true, fps: 30, crf: 31 },
  { name: 'testimonial-5', file: 'Impact Room/IMG_7218.MOV', from: 0, to: 76.7, gain: -9, window: 0.28, hdr: true, fps: 30, crf: 31 },
]

function testimonial({ name, file, from, to, gain = 0, window, hdr, fps = 25, crf = 28 }) {
  const out = path.join(VIDEO_OUT, `${name}.mp4`)
  const seconds = to - from
  const picture = [
    window === undefined ? '' : `crop=iw:iw*9/16:0:ih*${window}`,
    `fps=${fps}`,
    'scale=1280:720:flags=lanczos',
    hdr ? HDR_TO_SDR : '',
    'format=yuv420p',
  ]
  run([
    '-ss', String(from), '-t', seconds.toFixed(2), '-i', path.join(CLIENT, file),
    '-vf', picture.filter(Boolean).join(','),
    // Short fades on the sound so the cuts do not click
    '-af', `volume=${gain}dB,afade=t=in:d=0.08,afade=t=out:st=${(seconds - 0.15).toFixed(2)}:d=0.15`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
    '-c:a', 'aac', '-b:a', '96k', '-ac', '1',
    '-movflags', '+faststart',
    out,
  ])
  // The still shown before play is the film's own first frame, so pressing play does not jump
  poster(out, path.join(VIDEO_OUT, `${name}.jpg`), 1280, 0)
  console.log(`  ${name}.mp4  ${seconds.toFixed(0)}s  ${mb(out)}`)
}

function poster(video, out, width, at = 0.6) {
  run(['-ss', String(at), '-i', video, '-frames:v', '1', '-vf', `scale=${width}:-2`, '-q:v', '5', out])
}

/* ---------- Photos ---------- */

const PHOTOS = {
  'kiln-firing': 'Process/Process Backup_Talaja/AMD_9929.JPG',
  'kiln-field': 'Process/Process Backup_Talaja/AMD_9938.JPG',
  'biochar-and-kiln': 'Process/Process Backup_Talaja/AMD_9940.JPG',
  'working-the-soil': 'Stills/AMD_0078.JPG',
  'field-data': 'Stills/AMD_0033.JPG',
  'farmer-portrait': 'Stills/AMD_0027.JPG',
  'farmer-and-founder': 'Stills/AMD_9950.JPG',
}

// From KriSHE's 13 Oct folders: [file, the part to keep in the source's own pixels (optional)]
const CLIENT_PHOTOS = {
  // Each photo is cut close to its people: the sky and the empty ground around them are left out
  'farmers-with-kiln': ['Impact Room jpg/IMG_7234.jpg', { left: 150, top: 1124, width: 3378, height: 1900 }],
  'farmer-group': ['Impact Room jpg/IMG_7252.jpg'],
  // The mats in the foreground are cut away, leaving the circle of people
  'village-circle': ['Impact Room jpg/IMG_7215.jpg', { left: 0, top: 380, width: 4032, height: 2016 }],
  // Cut close to the five women, so they and their certificates fill a small square tile
  'farmers-certificates': ['Impact Room jpg/IMG_7246.jpg', { left: 1320, top: 960, width: 2110, height: 2064 }],
  'farmers-at-kiln': ['Impact Room jpg/IMG_7232.jpg', { left: 150, top: 1210, width: 2117, height: 2117 }],
  // Cut to the eight people, 3:2: the sky, the palm and the kiln are left out so they stand larger
  'trained-group': ['Impact Room jpg/IMG_7248.jpg', { left: 600, top: 757, width: 3370, height: 2247 }],
  // Cut to the group, 5:3: the wall, the swing and the plant pot either side are left out
  team: ['team selected/IMG-20260715-WA0042.jpg.jpeg', { left: 282, top: 746, width: 3468, height: 2081 }],
}

async function photo(name, source, crop) {
  const out = path.join(PHOTO_OUT, `${name}.jpg`)
  const image = sharp(source).rotate()
  if (crop) image.extract(crop)
  // 2200 px on the long edge is plenty: next/image makes the smaller sizes on demand
  await image.resize(2200, 2200, { fit: 'inside' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out)
  console.log(`  ${name}.jpg  ${mb(out)}`)
}

/* ---------- Run ---------- */

fs.mkdirSync(VIDEO_OUT, { recursive: true })
fs.mkdirSync(PHOTO_OUT, { recursive: true })

const only = process.argv.slice(2)
const wanted = (part) => only.length === 0 || only.includes(part)

console.log('Hero')
if (wanted('hero-1080')) {
  const heroLarge = hero(1920, 1080, 26, 'hero-1080.mp4')
  poster(heroLarge, path.join(VIDEO_OUT, 'hero.jpg'), 1600, 1.2)
}
if (wanted('hero-720')) hero(1280, 720, 27, 'hero-720.mp4')
// For phones and slow connections: well under half of the 720p file
if (wanted('hero-480')) hero(854, 480, 30, 'hero-480.mp4')

if (wanted('loops')) {
  console.log('Loops')
  LOOPS.forEach(loop)
}

const films = TESTIMONIALS.filter(({ name }) => wanted('testimonials') || only.includes(name))
if (films.length > 0) {
  console.log('Testimonials')
  films.forEach(testimonial)
}

if (wanted('photos')) {
  console.log('Photos')
  for (const [name, file] of Object.entries(PHOTOS)) await photo(name, raw(file))
  for (const [name, [file, crop]] of Object.entries(CLIENT_PHOTOS)) await photo(name, path.join(CLIENT, file), crop)
}
