import type { Metadata } from 'next'

import { CalculatorTool } from '@/components/CalculatorTool'
import { getCalculatorSettings } from '@/lib/calculator'

export const metadata: Metadata = {
  title: 'Calculator',
  description:
    'For NGOs and farmer organisations: estimate the carbon sequestration potential of your farmer network and explore the scale of a KriSHE project.',
}

// The assumptions come from the CMS; saving them there refreshes this page straight away
export const revalidate = 3600

export default async function CalculatorPage() {
  const settings = await getCalculatorSettings()

  return (
    <section className="sec sec--top on-light">
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          For NGOs and farmer organisations
        </p>
        <h1 className="title" data-reveal>
          What could your farmer network achieve <em>through carbon sequestration?</em>
        </h1>
        <p className="sec__sub" data-reveal>
          Enter the farms in your network to estimate project potential.
        </p>

        <CalculatorTool settings={settings} />
      </div>
    </section>
  )
}
