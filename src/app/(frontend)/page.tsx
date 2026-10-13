import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import biocharAndKiln from '@/assets/shoot/biochar-and-kiln.jpg'
import farmersAtKiln from '@/assets/shoot/farmers-at-kiln.jpg'
import farmersCertificates from '@/assets/shoot/farmers-certificates.jpg'
import farmersWithKiln from '@/assets/shoot/farmers-with-kiln.jpg'
import fieldData from '@/assets/shoot/field-data.jpg'
import kilnFiring from '@/assets/shoot/kiln-firing.jpg'
import team from '@/assets/shoot/team.jpg'
import villageCircle from '@/assets/shoot/village-circle.jpg'
import { Arrow } from '@/components/Arrow'
import { Atom } from '@/components/Atom'
import { CreditLedger, CreditTag } from '@/components/Credits'
import { HeroVideo } from '@/components/HeroVideo'
import {
  BatchArt,
  BuyersArt,
  CreditArt,
  GeotagArt,
  KilnArt,
  PermanenceArt,
  PlotsArt,
  RecordArt,
  ShareArt,
  SoilArt,
  SproutArt,
} from '@/components/LineArt'
import { LoopVideo } from '@/components/LoopVideo'
import { TestimonialVideo } from '@/components/TestimonialVideo'
import { getCredits } from '@/lib/credits'

// The credit figures come from the CMS; saving them there refreshes this page straight away
export const revalidate = 3600

const ENQUIRE = '/enquire'

/** Stagger index for the reveal, read by the CSS as --i. */
const stagger = (i: number) => ({ '--i': i }) as CSSProperties

const MANIFESTO =
  'Carbon finance enables practical carbon sequestration on farms, while creating value for soils and rural communities.'

// The process, from KriSHE's own brief: three phases, three steps in each, one continuous record
const PHASES: { tag: string; title: string; sub: string; art: ReactNode; steps: [string, string][] }[] = [
  {
    tag: 'Diagnose',
    title: 'Know the ground',
    sub: 'Before anything goes into the field.',
    art: <GeotagArt />,
    steps: [
      ['Map the farm', 'A GPS polygon of every plot, tied to a farmer profile.'],
      ['Sample the soil', 'A baseline test on every plot, first.'],
      ['Score and prescribe', 'What this soil needs, and how much biochar.'],
    ],
  },
  {
    tag: 'Act',
    title: 'Place the carbon',
    sub: 'Produce, charge and apply, to a standard.',
    art: <KilnArt />,
    steps: [
      ['Make biochar', 'In modified Kon-Tiki kilns, each batch recorded.'],
      ['Charge and mix', 'To neutral, by a fixed recipe.'],
      ['Apply', 'To a logged strip of the field, rotated yearly.'],
    ],
  },
  {
    tag: 'Prove',
    title: 'Show the result',
    sub: 'Measure, verify and report back.',
    art: <CreditArt />,
    steps: [
      ['Re-test', 'Soil measured again each season.'],
      ['Certify', 'Carbon independently verified and issued.'],
      ['Report', 'An annual soil-health report for the farmer.'],
    ],
  },
]

const PROOFS: { title: string; text: string; art: ReactNode }[] = [
  {
    title: 'Every farm is mapped',
    text: 'GPS polygons of each plot, attached to a farmer profile with photo and landholding. We know precisely whose land, and where.',
    art: <PlotsArt />,
  },
  {
    title: 'Every soil is tested first',
    text: 'A baseline soil test before any biochar goes down. We act on what the soil actually shows, not on assumption.',
    art: <SoilArt />,
  },
  {
    title: 'Every batch is verifiable',
    text: 'Each biochar batch carries a unique ID, GPS and timestamp, with automated checks so no two runs overlap or double-count.',
    art: <BatchArt />,
  },
  {
    title: 'Every outcome is measured',
    text: 'Soil is re-tested on schedule and carbon is independently certified. The result is a record, not a claim.',
    art: <RecordArt />,
  },
]

const LAST_MILE = [
  { key: 'ID', text: 'A unique batch code on every production run.' },
  { key: 'GPS', text: 'Location tagged at source.' },
  { key: 'Time', text: 'Timestamped and sequence-checked.' },
  { key: 'App', text: 'Entered and verified on the KriSHE app.' },
]

// Four reasons, each a small illustration, a heading and one line; `source` credits a figure
const FACTS: { title: string; art: ReactNode; text: string; source?: { label: string; href: string } }[] = [
  {
    title: 'Market leader',
    art: <ShareArt />,
    // The figures and the source are the ones KriSHE supplied (CDR.fyi, published 9 Sep 2025)
    text: '86% of all durable carbon removal credits delivered since 2022, and 92% of those retired, are biochar.',
    source: {
      label: 'CDR.fyi, 2025',
      href: 'https://www.cdr.fyi/blog/biochar-carbon-removal-market-snapshot-2025',
    },
  },
  { title: '1000+ years permanence', art: <PermanenceArt />, text: 'Carbon sequestered in soil.' },
  {
    title: 'A pathway leading buyers choose',
    art: <BuyersArt />,
    // Worded so it cannot be read as these companies buying KriSHE's own credits
    text: 'Biochar is a removal pathway chosen by prominent buyers such as Microsoft, Google and Frontier.',
  },
  { title: 'Soil benefits', art: <SproutArt />, text: 'Improves soil health, nutrient retention and water availability.' },
]

const APPROACH = [
  { title: 'Climapreneurs', text: 'Rural entrepreneurs trained to run kilns and lead climate action on the ground.' },
  { title: 'Smart kilns', text: 'Low-cost, on-farm pyrolysis that cuts logistics and keeps quality high.' },
  { title: 'Digital MRV', text: 'Geotagged field data and layered verification create traceability from field to credit.' },
  {
    title: 'Farmer-first economics',
    text: 'Carbon finance is structured to create value for farmers and local operators.',
  },
]

// `count` animates up to the number; `value` is shown as written
const IMPACT: { count?: number; value?: string; suffix?: string; title: string; text: string }[] = [
  { count: 1000, suffix: '+', title: 'Farmers', text: 'Reached through KriSHE’s field network.' },
  { count: 3000, suffix: '+', title: 'Credits issued', text: '3,000 tonnes of CO₂ removed.' },
  { value: '₹1Cr+', title: 'To the rural economy', text: 'New income for rural communities.' },
  { count: 3, title: 'Pilot zones', text: 'Across multiple rural regions.' },
  { count: 200, suffix: '+', title: 'Soil samples', text: 'Supporting research on soil carbon and soil health.' },
  { count: 30, suffix: '+', title: 'Climapreneurs', text: 'Trained to run kilns and lead field operations.' },
]

// The first three are the films KriSHE selected, shot in Talaja (Bhavnagar). The second and third are
// the same man answering different questions, so both are kept. The last two are from KriSHE's
// Impact Room folder, filmed on a phone and cut to the women's own words.
// Names as KriSHE gave them on 13 Oct 2026: Jeev Ben and Mani Ben (Anjali), Bhamar Ramubhai
// Jitharbhai (Tanisha). Manjula Ben, her group and the village of Pasvi are as heard in the films
// (a machine transcript of the Gujarati), which KriSHE has not corrected.
const TESTIMONIALS = [
  { name: 'testimonial-1', caption: 'Jeev Ben · Uchdi, Talaja', label: 'Jeev Ben, a farmer from Uchdi village, speaks to camera' },
  { name: 'testimonial-2', caption: 'Ramubhai · Pasvi, Talaja', label: 'Ramubhai, a farmer from Pasvi village, introduces himself' },
  { name: 'testimonial-3', caption: 'Ramubhai · Pasvi, Talaja', label: 'Ramubhai on making biochar from his cotton waste' },
  { name: 'testimonial-4', caption: 'Manjula Ben · Rani Mata group', label: 'Manjula Ben, president of the Rani Mata group, speaks' },
  { name: 'testimonial-5', caption: 'Mani Ben · Rani Mata group', label: 'Mani Ben, a farmer in the Rani Mata group, speaks outside her home' },
]

// What three of them say in the films. KriSHE asked for real names here (13 Oct 2026); these
// replace the three quotes carried over from the old website. The first two follow Tanisha's own
// English translations of the films, shortened; the third is ours.
const QUOTES = [
  {
    text: 'We made biochar for the first time and applied it on our pearl millet field. We were happy with the result.',
    name: 'Jeev Ben',
    role: 'Farmer, Uchdi, Talaja',
  },
  {
    text: 'I never thought that cotton waste could be converted into charcoal like this. We mixed it with farmyard manure and applied it on the field.',
    name: 'Ramubhai',
    role: 'Farmer, Pasvi, Talaja',
  },
  {
    text: 'After we put it in our fields, the farming went well. This time we had sown cotton, and the cotton did well too.',
    name: 'Manjula Ben',
    role: 'President, Rani Mata group',
  },
]

export default async function HomePage() {
  const credits = await getCredits()

  return (
    <>
      {/* ========== Hero ========== */}
      <section className="hero on-dark" id="top">
        <div className="hero__media" aria-hidden="true">
          <Image className="hero__poster" src="/media/hero.jpg" alt="" fill priority sizes="100vw" />
          <HeroVideo />
        </div>
        <div className="hero__shade" aria-hidden="true" />

        <div className="wrap hero__inner">
          <p className="eyebrow" data-enter style={stagger(0)}>
            Carbon sequestration · Rural India
          </p>
          <h1 className="display" data-enter style={stagger(1)}>
            We turn farms into <em>measurable carbon sinks.</em>
          </h1>
          <div className="hero__row" data-enter style={stagger(2)}>
            <p className="lede">
              We turn crop residue into biochar: a stable, charcoal-like carbon that locks CO₂ into farmers’ soil
              for centuries while improving the land.
            </p>
            <div className="hero__actions">
              <Link className="btn" href="#credits">
                Buy verified credits <Arrow />
              </Link>
              <Link className="btn btn--ghost" href="#how">
                See how it works
              </Link>
            </div>
          </div>
          <dl className="hero__stats" data-enter style={stagger(3)}>
            <div>
              <dt>Farmers</dt>
              <dd>1000+</dd>
            </div>
            <div>
              <dt>Credits issued</dt>
              <dd>3000+</dd>
            </div>
            <div>
              <dt>To rural economy</dt>
              <dd>₹1Cr+</dd>
            </div>
            <div className="hero__scroll label-sm">
              <span>Scroll</span>
              <i />
            </div>
          </dl>
        </div>
      </section>

      {/* ========== Manifesto ========== */}
      <section className="sec sec--atom on-light" id="about">
        <div className="atom atom--bg atom--right" data-reveal="draw" aria-hidden="true">
          <Atom />
        </div>
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            Empowering rural India. Healing the planet.
          </p>
          <p className="manifesto" data-reveal="words">
            {MANIFESTO.split(' ').map((word, n) => (
              <span key={n}>
                <span className="w" style={{ '--n': n } as CSSProperties}>
                  {word}
                </span>{' '}
              </span>
            ))}
          </p>

          <div className="duo">
            <Link className="duo__card glass" href="#join" data-reveal style={stagger(0)}>
              <span className="duo__k label-sm">For farmers</span>
              <span className="duo__t">Return what the harvest takes, back to the soil.</span>
              <span className="link">
                Join us <Arrow />
              </span>
            </Link>
            <Link className="duo__card glass" href="#credits" data-reveal style={stagger(1)}>
              <span className="duo__k label-sm">For buyers</span>
              <span className="duo__t">Buy high-quality carbon credits you can trace end to end.</span>
              <span className="link">
                Buy credits <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== How it works: the three-phase process, read as you scroll ========== */}
      <section className="sec on-dark" id="how">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                How it works
              </p>
              <h2 className="h2" data-reveal>
                Soil to sink, <em>tracked end to end.</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Three phases, one continuous record. Every step is logged on the KriSHE Carbon app before the next one
              begins.
            </p>
          </div>

          {/* SiteEffects marks the phase on screen in the rail and fills the line beside it */}
          <div className="spine" data-spine>
            <ol className="spine__rail" aria-hidden="true">
              {PHASES.map(({ tag }, i) => (
                <li key={tag}>
                  <span className="label-sm">{String(i + 1).padStart(2, '0')}</span>
                  {tag}
                </li>
              ))}
            </ol>

            <ol className="spine__phases">
              {PHASES.map(({ tag, title, sub, art, steps }, i) => (
                <li key={tag} className="phase" data-phase>
                  <div className="phase__art card__art" data-reveal>
                    {art}
                  </div>
                  <div className="phase__body">
                    <p className="phase__tag label-sm" data-reveal>
                      {String(i + 1).padStart(2, '0')} · {tag}
                    </p>
                    <h3 data-reveal>{title}</h3>
                    <p className="phase__sub" data-reveal>
                      {sub}
                    </p>
                    <ol className="phase__steps">
                      {steps.map(([lead, text], n) => (
                        <li key={lead} data-reveal style={stagger(n)}>
                          <b>{lead}</b>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ========== Proof: why the numbers can be trusted ========== */}
      <section className="sec on-light" id="proof">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                Why we can trust the numbers
              </p>
              <h2 className="h2" data-reveal>
                Whose land, which soil, <em>which batch.</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Last-mile accuracy is the whole point. Four things make it real.
            </p>
          </div>

          <ol className="proofs">
            {PROOFS.map(({ title, text, art }, i) => (
              <li key={title} className="card glass" data-reveal style={stagger(i)}>
                <div className="card__art">
                  <span className="card__num label-sm">{String(i + 1).padStart(2, '0')}</span>
                  {art}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>

          <div className="lastmile on-dark" data-reveal>
            <div className="lastmile__head">
              <p className="eyebrow">Last-mile accuracy</p>
              <h3>One unbroken chain from kiln to field</h3>
            </div>
            <dl className="lastmile__chain">
              {LAST_MILE.map(({ key, text }) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
            <p className="lastmile__note">
              Data is collected by trained Climapreneurs and the field team, and verified before anything moves
              forward.
            </p>
          </div>
        </div>
      </section>

      {/* ========== On the ground: the Gujarat shoot ========== */}
      <section className="sec on-dark" id="ground">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                On the ground · Gujarat
              </p>
              <h2 className="h2" data-reveal>
                Made on the farm. <em>Recorded at every step.</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              The kiln goes to the field. The data comes with it.
            </p>
          </div>

          <div className="ground">
            <figure className="shot shot--feature" data-reveal>
              <Image
                className="shot__media"
                src={kilnFiring}
                alt="A farm worker throws crop residue into a burning cone kiln at the edge of a field"
                fill
                sizes="(max-width: 900px) 100vw, 66vw"
                placeholder="blur"
              />
              <figcaption className="shot__cap glass glass--dark">Crop residue goes into the kiln</figcaption>
            </figure>
            <figure className="shot" data-reveal style={stagger(1)}>
              <LoopVideo className="shot__media" name="biochar-pile" />
              <figcaption className="shot__cap glass glass--dark">Biochar, ready for the soil</figcaption>
            </figure>
            <figure className="shot" data-reveal style={stagger(2)}>
              <LoopVideo className="shot__media" name="moisture-reading" />
              <figcaption className="shot__cap glass glass--dark">Checking residue moisture</figcaption>
            </figure>
            <figure className="shot" data-reveal>
              <LoopVideo className="shot__media" name="field-capture" />
              <figcaption className="shot__cap glass glass--dark">Photo evidence, logged from the field</figcaption>
            </figure>
            <figure className="shot" data-reveal style={stagger(1)}>
              <Image
                className="shot__media"
                src={fieldData}
                alt="A team member records field data on a tablet in a village"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                placeholder="blur"
              />
              <figcaption className="shot__cap glass glass--dark">Field data, recorded on site</figcaption>
            </figure>
            <figure className="shot" data-reveal style={stagger(2)}>
              <Image
                className="shot__media"
                src={biocharAndKiln}
                alt="A pile of fresh biochar in the foreground with the kiln burning behind it"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                placeholder="blur"
              />
              <figcaption className="shot__cap glass glass--dark">Fresh biochar beside the kiln</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ========== Why biochar ========== */}
      <section className="sec on-light" id="why">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                Why biochar
              </p>
              <h2 className="h2" data-reveal>
                Trusted worldwide for <em>permanent</em> carbon removal
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Biochar is a proven pathway for both carbon sequestration and soil improvement.
            </p>
          </div>

          <ul className="facts">
            {FACTS.map(({ title, art, text, source }, i) => (
              <li key={title} className="fact glass" data-reveal style={stagger(i)}>
                <span className="fact__art">{art}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {source && (
                  <a className="fact__source label-sm" href={source.href} target="_blank" rel="noopener">
                    Source: {source.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== What makes KriSHE different ========== */}
      <section className="sec sec--atom on-dark" id="different">
        <div className="wrap split">
          <div className="split__aside">
            <p className="eyebrow" data-reveal>
              What makes KriSHE different
            </p>
            <h2 className="h2" data-reveal>
              Technology, community and <em>fair economics.</em>
            </h2>
            {/* Hangs below the heading and travels with it, so the two never overlap */}
            <div className="atom atom--bg atom--aside" data-reveal="draw" aria-hidden="true">
              <Atom />
            </div>
          </div>

          <div className="split__main">
            <ol className="rows">
              {APPROACH.map(({ title, text }, i) => (
                <li key={title} className="row" data-reveal>
                  <span className="row__n label-sm">{String(i + 1).padStart(2, '0')}</span>
                  <div className="row__body">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <blockquote className="pull glass" data-reveal>
              <p>One Climapreneur can support ~150 farmers and enable ~100 tonnes of biochar per year.</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ========== Impact ========== */}
      <section className="sec on-light" id="impact">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                Impact so far
              </p>
              <h2 className="h2" data-reveal>
                Measurable climate impact. <em>Real rural empowerment.</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Building measurable impact for farms, communities and the climate.
            </p>
          </div>

          {/* The people the figures stand for, from KriSHE's own photographs */}
          <div className="fieldshots">
            <figure className="fieldshot fieldshot--wide" data-reveal>
              <Image
                src={villageCircle}
                alt="Women farmers sit in a circle on mats in the yard of a village house, with two visitors in the foreground"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                placeholder="blur"
              />
              <figcaption className="shot__cap glass glass--dark">A village meeting</figcaption>
            </figure>
            <figure className="fieldshot" data-reveal style={stagger(1)}>
              <Image
                src={farmersCertificates}
                alt="Five women farmers hold up their training certificates beside a biochar kiln"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                placeholder="blur"
              />
              <figcaption className="shot__cap glass glass--dark">Training certificates</figcaption>
            </figure>
            <figure className="fieldshot" data-reveal style={stagger(2)}>
              <Image
                src={farmersAtKiln}
                alt="Two women farmers stand smiling at a blue biochar kiln, a palm tree behind them"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                placeholder="blur"
              />
              <figcaption className="shot__cap glass glass--dark">Farmers at the kiln</figcaption>
            </figure>
          </div>

          <ul className="tiles">
            {IMPACT.map(({ count, value, suffix, title, text }, i) => (
              <li key={title} className="tile" data-reveal style={stagger(i % 3)}>
                <span className="tile__n label-sm">{String(i + 1).padStart(2, '0')}</span>
                <span className="tile__val">
                  {count === undefined ? value : <span data-count={count}>{count}</span>}
                  {suffix}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== The team ========== */}
      <section className="sec on-dark" id="team">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                The team
              </p>
              <h2 className="h2" data-reveal>
                The people behind <em>KriSHE Carbon.</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Meet the team driving climate action forward.
            </p>
          </div>

          <figure className="teamshot" data-reveal>
            <Image
              src={team}
              alt="The KriSHE Carbon team: nine people in white T-shirts standing together outside a brick building"
              fill
              sizes="(max-width: 1320px) 100vw, 1220px"
              placeholder="blur"
            />
          </figure>
        </div>
      </section>

      {/* ========== Voices ========== */}
      <section className="sec on-light" id="voices">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                Voices from the field
              </p>
              <h2 className="h2" data-reveal>
                What our partners <em>say</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Hear directly from the people building this work on the ground.
            </p>
          </div>

          {/* On film, in their own words: these play with sound when pressed */}
          <ul className="talks">
            {TESTIMONIALS.map(({ name, label, caption }, i) => (
              <li key={name} data-reveal style={stagger(i % 3)}>
                <TestimonialVideo name={name} label={label} caption={caption} />
              </li>
            ))}
            {/* A photograph takes the sixth place in the grid */}
            <li className="talks__photo" data-reveal style={stagger(2)}>
              <Image
                src={farmersWithKiln}
                alt="Three women farmers standing beside a biochar kiln at the edge of a field"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                placeholder="blur"
              />
            </li>
          </ul>

          <div className="quotes">
            {QUOTES.map(({ text, name, role }, i) => (
              <figure key={name} className="quote glass" data-reveal style={stagger(i)}>
                <blockquote>“{text}”</blockquote>
                <figcaption>
                  <b>{name}</b>
                  <span className="label-sm">{role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Credits you can trust ========== */}
      <section className="sec on-dark" id="credits">
        <div className="wrap trust">
          <div className="trust__copy">
            <p className="eyebrow" data-reveal>
              For buyers
            </p>
            <h2 className="h2" data-reveal>
              Carbon credits, <em>backed by evidence.</em>
            </h2>
            <p className="sec__sub" data-reveal>
              Traceable carbon removal, measured in the field and verified through multiple layers of evidence.
            </p>
            <CreditLedger credits={credits} />
            <div className="trust__cta" data-reveal>
              <Link className="btn" href={ENQUIRE}>
                Buy credits <Arrow />
              </Link>
              <Link className="btn btn--ghost" href="#how">
                How we verify
              </Link>
            </div>
          </div>

          <CreditTag />
        </div>
      </section>

      {/* ========== Join / Buy ========== */}
      <section className="sec sec--cta on-dark" id="join">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            Build the carbon economy with us
          </p>
          <div className="doors">
            <Link className="door glass" href="/climapreneurs" data-reveal style={stagger(0)}>
              <span className="door__k label-sm">Farmers · Grassroots organisations · Climapreneurs</span>
              <span className="door__t">Join the network</span>
              <span className="door__p">
                Build measurable carbon sequestration while creating local livelihood opportunities with KriSHE.
              </span>
              <span className="door__go">
                Join us <Arrow />
              </span>
            </Link>
            <Link className="door glass" href={ENQUIRE} data-reveal style={stagger(1)}>
              <span className="door__k label-sm">Companies · Buyers</span>
              <span className="door__t">Buy verified carbon credits</span>
              <span className="door__p">Traceable carbon removal, backed by evidence.</span>
              <span className="door__go">
                Buy credits <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
