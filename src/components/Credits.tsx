import type { CreditFigures } from '@/lib/credits'

import { Atom } from './Atom'

const CREDIT_FACTS = [
  { label: 'Verification', value: 'AI-verified application', note: 'Data integrity from field to report.' },
  { label: 'Monitoring', value: 'Soil-based MRV', note: 'Audit-grade traceability.' },
  { label: 'Revenue', value: 'Farmer-first economics', note: 'Your purchase helps finance climate action in rural communities.' },
  { label: 'Permanence', value: '1,000+ years', note: 'Nature-based removal, stored in soil.' },
]

const formatCount = (n: number) => n.toLocaleString('en-IN')

/** The credit figures from the CMS. Any figure that has not been entered is left out. */
export function CreditLedger({ credits }: { credits: CreditFigures }) {
  const rows = [
    { label: 'Available to purchase', value: credits.available },
    { label: 'Issued', value: credits.issued },
    { label: 'Retired', value: credits.retired },
  ].filter((row): row is { label: string; value: number } => typeof row.value === 'number')

  if (rows.length === 0 && !credits.vintage) return null

  return (
    <dl className="ledger" data-reveal>
      {rows.map(({ label, value }) => (
        <div key={label}>
          <dt className="label-sm">{label}</dt>
          <dd>{formatCount(value)}</dd>
        </div>
      ))}
      {credits.vintage && (
        <div>
          <dt className="label-sm">Vintage</dt>
          <dd>{credits.vintage}</dd>
        </div>
      )}
    </dl>
  )
}

/** "What's inside a KriSHE carbon credit": the four things a buyer is paying for. */
export function CreditTag() {
  return (
    <div className="tag glass" data-reveal>
      <div className="tag__head">
        <span className="atom atom--solid tag__atom" aria-hidden="true">
          <Atom variant="solid" />
        </span>
        <div>
          <span className="tag__k label-sm">What’s behind each credit</span>
          <span className="tag__t">What a KriSHE carbon credit represents</span>
        </div>
      </div>
      <dl className="tag__rows">
        {CREDIT_FACTS.map(({ label, value, note }) => (
          <div key={label}>
            <dt className="label-sm">{label}</dt>
            <dd>
              {value}
              <small>{note}</small>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * Who certifies the project. KriSHE names one body for its method and registry: Carbon Standards
 * International, under its Global Artisan C-Sink standard. Shown on the project page only.
 */
export function Certification() {
  return (
    <div className="standards" data-reveal>
      <span className="standards__k label-sm">Standard &amp; certification</span>
      <ul>
        <li>
          <a href="https://www.carbon-standards.com/en/home" target="_blank" rel="noopener">
            Certified by Carbon Standards International
          </a>
        </li>
        <li>Global Artisan C-Sink standard</li>
      </ul>
    </div>
  )
}
