import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import farmerAndFounder from '@/assets/shoot/farmer-and-founder.jpg'
import trainedGroup from '@/assets/shoot/trained-group.jpg'
import { Arrow } from '@/components/Arrow'
import { LoopVideo } from '@/components/LoopVideo'

export const metadata: Metadata = {
  title: 'The Climapreneur model',
  description:
    'A Climapreneur is a trained local entrepreneur who runs biochar production and owns the farmer relationship in their area. How the model works, how it scales and why it lasts.',
}

/** Stagger index for the reveal, read by the CSS as --i. */
const stagger = (i: number) => ({ '--i': i }) as CSSProperties

// Most of this page follows KriSHE's own one-page brief on the model (9 Oct 2026)

// `word` marks a figure that is a word, not a number: it is set smaller so the three stay level
const MODEL: { figure: string; word?: boolean; label: string; text: string }[] = [
  { figure: '2–3', label: 'Contiguous clusters', text: 'The territory each Climapreneur looks after.' },
  { figure: '4–5', label: 'Kon-Tiki kilns', text: 'Run by each one to produce biochar.' },
  {
    figure: 'Acreage',
    word: true,
    label: 'What they are rewarded on',
    text: 'Land brought under biochar, not just the number of farmers.',
  },
]

// What the Climapreneur connects: [name, what it stands for]
const HUB: [string, string][] = [
  ['2–3 clusters', 'Their territory'],
  ['4–5 Kon-Tikis', 'Biochar output'],
  ['Farm and soil', 'Maps and samples'],
  ['KriSHE app', 'Verified data'],
]

const WORK = [
  { title: 'Run the kilns', text: 'A set of Kon-Tiki kilns, producing biochar batch by batch.' },
  { title: 'Collect the ground data', text: 'Farm polygons and soil samples: what makes the work verifiable.' },
  { title: 'Stay the familiar face', text: 'The same person the farmer sees, season after season.' },
  { title: 'Keep value local', text: 'Carbon finance creates value for farmers and local operators.' },
]

const ECONOMICS = [
  {
    title: 'Paid per batch',
    text: 'Production cost plus a fair margin on every batch they make: a real income, not a wage.',
  },
  {
    title: 'Rewarded on acreage',
    text: 'Measured on land brought under biochar, not just farmer headcount. Depth over tally.',
  },
  {
    title: 'Funded by carbon',
    text: 'Paid out of carbon-credit revenue, so farmers pay nothing in the early years.',
  },
]

// Each point is [the part in bold, the rest]
const REASONS: { tag: string; title: string; points: [string, string][] }[] = [
  {
    tag: 'Scales',
    title: 'Add clusters, not head office',
    points: [
      ['The unit repeats.', 'Select, train, equip: one operator for every 2–3 clusters.'],
      ['Growth is adding Climapreneurs,', 'not rebuilding central teams.'],
      ['KriSHE holds the standards, the app and the certification;', 'the operator holds the ground.'],
    ],
  },
  {
    tag: 'Lasts',
    title: 'Built around someone already there',
    points: [
      ['Local ownership.', 'The person earning from it lives there and stays.'],
      ['Trust compounds.', 'The same face returns each season, so farmers remember KriSHE.'],
      ['Aligned incentives.', 'More good acreage means more carbon and more income, all verifiable.'],
    ],
  },
]

const WHO = [
  {
    title: 'Farmers',
    text: 'Smallholders with crop residue who want another source of income.',
    gains: ['Direct payments', 'Training provided', 'Equipment support'],
  },
  {
    title: 'Rural entrepreneurs',
    text: 'Local people interested in climate action and sustainable agriculture.',
    gains: ['Training', 'Local business opportunity', 'Community impact'],
  },
  {
    // KriSHE asked for this card in place of "Agents"; its wording is adapted from theirs for agents
    title: 'Grassroots organisations',
    text: 'Local organisations that connect farmers with KriSHE and support field coordination.',
    gains: ['Training', 'Field coordination', 'Business opportunity'],
  },
]

const BELIEF =
  'Carbon removal that depends on a distant team breaks at the last mile. This is built around someone who’s already there, so it holds.'

export default function ClimapreneursPage() {
  return (
    <>
      {/* ========== Hero ========== */}
      <section className="hero hero--page on-dark" id="top">
        <div className="hero__media" aria-hidden="true">
          <Image className="hero__poster" src={farmerAndFounder} alt="" fill priority sizes="100vw" placeholder="blur" />
        </div>
        <div className="hero__shade" aria-hidden="true" />

        <div className="wrap hero__inner">
          <p className="eyebrow" data-enter style={stagger(0)}>
            The Climapreneur model
          </p>
          <h1 className="display" data-enter style={stagger(1)}>
            Climate action, <em>led locally.</em>
          </h1>
          <div className="hero__row" data-enter style={stagger(2)}>
            <p className="lede">
              The Climapreneur is the person who makes it happen on the ground: a trained local entrepreneur who runs
              biochar production and owns the farmer relationship in their area.
            </p>
            <div className="hero__actions">
              <Link className="btn" href="/enquire?role=partner">
                Partner with us <Arrow />
              </Link>
              <Link className="btn btn--ghost" href="/projects/biochar">
                See the project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== The model: three facts, then what the Climapreneur connects ========== */}
      <section className="sec on-light" id="model">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                The model
              </p>
              <h2 className="h2" data-reveal>
                One Climapreneur, <em>a network of farms.</em>
              </h2>
            </div>
            <p className="sec__sub" data-reveal>
              Climapreneurs are the local backbone of KriSHE’s decentralised network. 20 have been trained so far.
            </p>
          </div>

          <ol className="chain chain--plain">
            {MODEL.map(({ figure, word, label, text }, i) => (
              <li key={label} data-reveal style={stagger(i)}>
                <span className={`chain__fig${word ? ' chain__fig--word' : ''}`}>{figure}</span>
                <h3>{label}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>

          <figure className="hub glass" data-reveal>
            {/* Lines from the centre to the four corners; they stretch with the box */}
            <svg className="hub__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="50" y1="50" x2="20" y2="24" />
              <line x1="50" y1="50" x2="80" y2="24" />
              <line x1="50" y1="50" x2="20" y2="76" />
              <line x1="50" y1="50" x2="80" y2="76" />
            </svg>
            {HUB.map(([name, meaning]) => (
              <div key={name} className="hub__node">
                <b>{name}</b>
                <span>{meaning}</span>
              </div>
            ))}
            <div className="hub__core">Climapreneur</div>
          </figure>
          <p className="hub__cap" data-reveal>
            One trained local operator connects production, data and the farmer. KriSHE keeps the standards and the
            certification.
          </p>
        </div>
      </section>

      {/* ========== What a Climapreneur does ========== */}
      <section className="sec on-dark" id="work">
        <div className="wrap split">
          <div className="split__aside">
            <p className="eyebrow" data-reveal>
              Who they are, what they do
            </p>
            <h2 className="h2" data-reveal>
              Selected, trained <em>and equipped.</em>
            </h2>
            <p className="sec__sub" data-reveal>
              A local operator, not a passing contractor: they live in the area and build the relationship.
            </p>
            <figure className="split__film" data-reveal>
              <LoopVideo name="field-capture" />
              <figcaption className="shot__cap glass glass--dark">Field data logging · Gujarat</figcaption>
            </figure>
          </div>

          <div className="split__main">
            <ol className="rows">
              {WORK.map(({ title, text }, i) => (
                <li key={title} className="row" data-reveal>
                  <span className="row__n label-sm">{String(i + 1).padStart(2, '0')}</span>
                  <div className="row__body">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ========== The economics ========== */}
      <section className="sec on-light" id="economics">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                The economics, simply
              </p>
              <h2 className="h2" data-reveal>
                A real income, <em>not a wage.</em>
              </h2>
            </div>
          </div>

          <ul className="ways">
            {ECONOMICS.map(({ title, text }, i) => (
              <li key={title} className="way glass" data-reveal style={stagger(i)}>
                <span className="way__n label-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== Why it scales, and why it lasts ========== */}
      <section className="sec on-dark" id="design">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                Why it is built this way
              </p>
              <h2 className="h2" data-reveal>
                Why it scales, <em>and why it lasts.</em>
              </h2>
            </div>
            <div data-reveal>
              <Link className="btn" href="/enquire?role=partner">
                Partner with us <Arrow />
              </Link>
            </div>
          </div>

          <ul className="blocks">
            {REASONS.map(({ tag, title, points }, i) => (
              <li key={tag} className="block glass" data-reveal style={stagger(i)}>
                <span className="block__tag label-sm">{tag}</span>
                <h3>{title}</h3>
                <ul>
                  {points.map(([lead, rest]) => (
                    <li key={lead}>
                      <b>{lead}</b> {rest}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== Who can join ========== */}
      <section className="sec on-light" id="join">
        <div className="wrap">
          <div className="sec__head">
            <div>
              <p className="eyebrow" data-reveal>
                Who can join
              </p>
              <h2 className="h2" data-reveal>
                Three ways <em>in.</em>
              </h2>
            </div>
          </div>

          <ul className="ways">
            {WHO.map(({ title, text, gains }, i) => (
              <li key={title} className="way glass" data-reveal style={stagger(i)}>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>
                  {gains.map((gain) => (
                    <li key={gain}>{gain}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== Why KriSHE believes in it, and the way in ========== */}
      <section className="sec sec--cta on-dark" id="become">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            Why we believe in it
          </p>
          <p className="manifesto" data-reveal="words">
            {BELIEF.split(' ').map((word, n) => (
              <span key={n}>
                <span className="w" style={{ '--n': n } as CSSProperties}>
                  {word}
                </span>{' '}
              </span>
            ))}
          </p>

          {/* Asked for by KriSHE: the way in for someone who wants to become one. It leads to the calculator. */}
          <div className="joinrow">
            <figure className="joinrow__photo" data-reveal>
              <Image
                src={trainedGroup}
                alt="Women and men hold up their training certificates beside a biochar kiln"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                placeholder="blur"
              />
            </figure>
            <div className="become glass" data-reveal style={{ '--i': 1 } as CSSProperties}>
              <div>
                <h2 className="become__t">Become a Climapreneur</h2>
                <p>Lead carbon removal at village level and unlock an opportunity to earn up to ₹10 lakh a year.</p>
              </div>
              <Link className="btn" href="/calculator">
                Estimate your project <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
