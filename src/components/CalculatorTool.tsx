'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { CalculatorSettings } from '@/lib/calculator'

import { Arrow } from './Arrow'

const count = (n: number) => Math.round(n).toLocaleString('en-IN')
const rupees = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

/**
 * Estimates what a group of farms could produce in a year. The sums are deliberately simple:
 *   residue  = farmers × acres each × residue per acre
 *   biochar  = residue × yield
 *   credits  = biochar × credits per tonne
 * and the income and investment lines only appear when their figures are set in the CMS.
 */
export function CalculatorTool({ settings }: { settings: CalculatorSettings }) {
  const [farmers, setFarmers] = useState(150)
  const [acres, setAcres] = useState(2)
  const [residuePerAcre, setResiduePerAcre] = useState(settings.residuePerAcre)

  const residue = farmers * acres * residuePerAcre
  const biochar = residue * (settings.biocharYield / 100)
  const credits = biochar * settings.creditsPerTonne
  const climapreneurs = Math.ceil(biochar / settings.biocharPerClimapreneur)

  const income = settings.creditPrice ? credits * settings.creditPrice : null
  const farmerIncome = income !== null && settings.farmerShare ? income * (settings.farmerShare / 100) : null
  const investment = settings.kilnCost ? climapreneurs * settings.kilnCost : null

  const results = [
    { label: 'Biochar made', value: count(biochar), unit: 'tonnes a year' },
    { label: 'Carbon credits', value: count(credits), unit: 'a year' },
    { label: 'Climapreneurs needed', value: count(climapreneurs), unit: climapreneurs === 1 ? 'person' : 'people' },
    income !== null && { label: 'Credit income', value: rupees(income), unit: 'a year' },
    farmerIncome !== null && {
      label: 'To farmers',
      value: rupees(farmerIncome),
      unit: farmers > 0 ? `about ${rupees(farmerIncome / farmers)} each` : 'a year',
    },
    investment !== null && { label: 'Investment to start', value: rupees(investment), unit: 'once' },
  ].filter((row): row is { label: string; value: string; unit: string } => Boolean(row))

  const assumptions = [
    `${settings.biocharYield}% of the residue’s weight becomes biochar`,
    `${settings.creditsPerTonne} credits per tonne of biochar`,
    `One Climapreneur makes about ${settings.biocharPerClimapreneur} tonnes of biochar a year`,
    settings.creditPrice && `${rupees(settings.creditPrice)} per credit`,
    settings.farmerShare && `${settings.farmerShare}% of credit income goes to farmers`,
    settings.kilnCost && `${rupees(settings.kilnCost)} to set up one Climapreneur with a kiln`,
  ].filter(Boolean)

  const number = (set: (n: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) =>
    set(Math.max(0, Number(event.target.value) || 0))

  return (
    <div className="calc">
      <form className="form glass" onSubmit={(event) => event.preventDefault()} data-reveal>
        <label className="field">
          <span className="label-sm">Farmers in your network</span>
          <input className="input" type="number" min={0} step={10} value={farmers} onChange={number(setFarmers)} />
        </label>
        <label className="field">
          <span className="label-sm">Acres per farmer</span>
          <input className="input" type="number" min={0} step={0.5} value={acres} onChange={number(setAcres)} />
        </label>
        <label className="field">
          <span className="label-sm">Crop residue per acre, per year (tonnes)</span>
          <input
            className="input"
            type="number"
            min={0}
            step={0.1}
            value={residuePerAcre}
            onChange={number(setResiduePerAcre)}
          />
        </label>
        <p className="calc__note">That is {count(residue)} tonnes of residue a year.</p>
      </form>

      <div className="calc__out" data-reveal>
        <dl className="calc__results" aria-live="polite">
          {results.map(({ label, value, unit }) => (
            <div key={label}>
              <dt className="label-sm">{label}</dt>
              <dd>
                {value} <small>{unit}</small>
              </dd>
            </div>
          ))}
        </dl>

        <div className="calc__basis">
          <span className="label-sm">Worked out from</span>
          <ul>
            {assumptions.map((line) => (
              <li key={String(line)}>{line}</li>
            ))}
          </ul>
          <p>These are estimates. Real figures depend on the crop, the season and the soil.</p>
        </div>

        <Link className="btn" href="/enquire?role=partner">
          Explore a project with KriSHE <Arrow />
        </Link>
      </div>
    </div>
  )
}
