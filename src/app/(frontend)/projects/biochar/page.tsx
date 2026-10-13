import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import kilnField from '@/assets/shoot/kiln-field.jpg'
import kilnFiring from '@/assets/shoot/kiln-firing.jpg'
import { Arrow } from '@/components/Arrow'
import { Atom } from '@/components/Atom'
import { Certification, CreditLedger, CreditTag } from '@/components/Credits'
import { EnquiryForm } from '@/components/EnquiryForm'
import { LoopVideo } from '@/components/LoopVideo'
import { getCredits } from '@/lib/credits'

export const metadata: Metadata = {
  title: 'Biochar for Soil Health Enhancement in India',
  description:
    'KriSHE Carbon’s first project converts agricultural residue into biochar and returns it to farmers’ fields. Every batch is measured, recorded and traceable.',
}

// The credit figures come from the CMS; saving them there refreshes this page straight away
export const revalidate = 3600

/** Stagger index for the reveal, read by the CSS as --i. */
const stagger = (i: number) => ({ '--i': i }) as CSSProperties

const PROBLEM =
  'After harvest, crop residue is often burned in the open. What the crop took from the soil is lost instead of returned.'

const COSTS = [
  { title: 'Smoke', text: 'Open burning releases greenhouse gases and harmful air pollutants.' },
  { title: 'Soil', text: 'Carbon and nutrients in crop residues are lost instead of being returned to the soil.' },
  { title: 'Farmers', text: 'Smallholders face the long-term cost of declining soil health.' },
]

const FIELD_STEPS: { title: string; text: string; media: ReactNode }[] = [
  {
    title: 'Residue is gathered and checked',
    text: 'Moisture is recorded for every batch.',
    media: <LoopVideo className="step__media" name="moisture-reading" />,
  },
  {
    title: 'Residue is converted in a kiln on the farm',
    text: 'Low-cost kilns convert it into stable biochar on site.',
    media: (
      <Image
        className="step__media"
        src={kilnFiring}
        alt="A farm worker throws crop residue into a burning cone kiln at the edge of a field"
        fill
        sizes="(max-width: 900px) 100vw, 25vw"
        placeholder="blur"
      />
    ),
  },
  {
    title: 'Biochar returns to the field',
    text: 'It is applied to the farmer’s own soil.',
    // From KriSHE's own footage: a farmer scattering biochar over her field
    media: <LoopVideo className="step__media" name="biochar-spreading" />,
  },
  {
    title: 'Every step is recorded',
    text: 'Geotagged photos and field data create a traceable record.',
    media: <LoopVideo className="step__media" name="field-capture" />,
  },
]

// The chain that ties a batch to a field, from KriSHE's own brief (9 Oct 2026)
const EVIDENCE = [
  { title: 'A unique ID', text: 'Every production run carries its own batch code.' },
  { title: 'A place', text: 'Its location is tagged by GPS at the source.' },
  { title: 'A time', text: 'It is timestamped and sequence-checked, so no two runs overlap or double-count.' },
  { title: 'A verified record', text: 'It is entered and verified on the KriSHE app before anything moves forward.' },
]

const MIX = [
  { title: 'Recipe tiers', text: 'Set by crop and soil.' },
  { title: '8 step-cards', text: 'One method, everywhere.' },
  { title: 'Mix to neutral', text: 'No forced pH.' },
  { title: 'Rotate the strip', text: 'A new area each year.' },
]

const CHECKS = ['Field-level data', 'Digital traceability', 'Independent verification', 'Local Climapreneur network']

export default async function BiocharProjectPage() {
  const credits = await getCredits()

  return (
    <>
      {/* ========== Hero ========== */}
      <section className="hero hero--page on-dark" id="top">
        <div className="hero__media" aria-hidden="true">
          <Image className="hero__poster" src={kilnField} alt="" fill priority sizes="100vw" placeholder="blur" />
        </div>
        <div className="hero__shade" aria-hidden="true" />

        <div className="wrap hero__inner">
          <p className="eyebrow" data-enter style={stagger(0)}>
            Biochar for Soil Health Enhancement in India
          </p>
          <h1 className="display" data-enter style={stagger(1)}>
            From crop residue to <em>stronger soils.</em>
          </h1>
          <div className="hero__row" data-enter style={stagger(2)}>
            <p className="lede">
              Our first project converts agricultural residue into biochar and returns it to farmers’ fields. Every
              batch is measured, recorded and traceable.
            </p>
            <div className="hero__actions">
              <Link className="btn" href="#enquire">
                Enquire about credits <Arrow />
              </Link>
              <Link className="btn btn--ghost" href="#evidence">
                See the evidence
              </Link>
            </div>
          </div>
          <dl className="hero__stats" data-enter style={stagger(3)}>
            <div>
              <dt>Method</dt>
              <dd>Biochar</dd>
            </div>
            <div>
              <dt>Farmers</dt>
              <dd>579</dd>
            </div>
            <div>
              <dt>Carbon stored for</dt>
              <dd>1000+ yrs</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ========== The problem ========== */}
      <section className="sec on-light" id="problem">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            The problem
          </p>
          <p className="manifesto" data-reveal="words">
            {PROBLEM.split(' ').map((word, n) => (
              <span key={n}>
                <span className="w" style={{ '--n': n } as CSSProperties}>
                  {word}
                </span>{' '}
              </span>
            ))}
          </p>

          <ul className="costs">
            {COSTS.map(({ title, text }, i) => (
              <li key={title} data-reveal style={stagger(i)}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== On the ground ========== */}
      <section className="sec on-dark" id="ground">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                What the project does
              </p>
              <h2 className="h2" data-reveal>
                The kiln goes to the field. <em>The residue becomes biochar, not smoke.</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Farmers receive training and support to convert their crop residue into biochar on site.
            </p>
          </div>

          <ol className="fieldsteps">
            {FIELD_STEPS.map(({ title, text, media }, i) => (
              <li key={title} className="card glass" data-reveal style={stagger(i)}>
                <div className="step__frame">
                  <span className="card__num label-sm">{String(i + 1).padStart(2, '0')}</span>
                  {media}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>

          {/* How the biochar is prepared and applied, from KriSHE's brief */}
          <div className="mix">
            <div data-reveal>
              <p className="eyebrow">And how we mix it right</p>
              <h3 className="mix__t">
                Charged first, <em>mixed to neutral.</em>
              </h3>
              <p className="mix__text">
                Raw biochar is first charged, loaded with nutrients and microbes, then mixed into soil to a standard.
                We mix only to neutral: we let biochar do its work rather than forcing soil pH. Every field team
                follows the same recipe, so the result is consistent across clusters.
              </p>
            </div>
            <div>
              <ul className="costs">
                {MIX.map(({ title, text }, i) => (
                  <li key={title} data-reveal style={stagger(i)}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
              <p className="callout glass" data-reveal>
                The application area is logged digitally, so a different part of the field is treated each season:
                small, accurate doses that build the soil over years rather than one thin spread.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Evidence ========== */}
      <section className="sec sec--atom on-light" id="evidence">
        <div className="wrap split">
          <div className="split__aside">
            <p className="eyebrow" data-reveal>
              Traceability
            </p>
            <h2 className="h2" data-reveal>
              Every credit is <em>backed by evidence.</em>
            </h2>
            <p className="sec__sub" data-reveal>
              One unbroken chain from kiln to field. The data is collected by trained Climapreneurs and the field
              team.
            </p>
            <div className="atom atom--bg atom--aside" data-reveal="draw" aria-hidden="true">
              <Atom />
            </div>
          </div>

          <div className="split__main">
            <ol className="rows">
              {EVIDENCE.map(({ title, text }, i) => (
                <li key={title} className="row" data-reveal>
                  <span className="row__n label-sm">{String(i + 1).padStart(2, '0')}</span>
                  <div className="row__body">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="chips" data-reveal>
              {CHECKS.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== Credits ========== */}
      <section className="sec on-dark" id="credits">
        <div className="wrap trust">
          <div className="trust__copy">
            <p className="eyebrow" data-reveal>
              The credits
            </p>
            <h2 className="h2" data-reveal>
              Durable carbon removal, <em>farmer-first.</em>
            </h2>
            <p className="sec__sub" data-reveal>
              Each issued credit represents one tonne of CO₂e removed and stored through the project, with carbon
              finance supporting the farmers and local operators behind it.
            </p>
            <CreditLedger credits={credits} />
            <div className="trust__cta" data-reveal>
              <Link className="btn" href="#enquire">
                Enquire about credits <Arrow />
              </Link>
            </div>
          </div>

          <CreditTag />
          <Certification />
        </div>
      </section>

      {/* ========== Enquire ========== */}
      <section className="sec on-light" id="enquire">
        <div className="wrap enquire">
          <div>
            <p className="eyebrow" data-reveal>
              Enquire
            </p>
            <h2 className="h2" data-reveal>
              Tell us what <em>you’re looking for.</em>
            </h2>
            <p className="sec__sub" data-reveal>
              Looking to buy credits, partner with KriSHE, or visit a project site? Start here. We’ll get back to you
              by email and take it from there.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  )
}
