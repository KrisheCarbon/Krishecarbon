import config from '@payload-config'
import { getPayload } from 'payload'

export type CalculatorSettings = {
  residuePerAcre: number
  biocharYield: number
  creditsPerTonne: number
  biocharPerClimapreneur: number
  creditPrice?: number | null
  farmerShare?: number | null
  kilnCost?: number | null
}

// Used until the figures are saved in the CMS, or if the database cannot be reached
const FALLBACK: CalculatorSettings = {
  residuePerAcre: 1,
  biocharYield: 25,
  creditsPerTonne: 2.5,
  biocharPerClimapreneur: 100,
}

export async function getCalculatorSettings(): Promise<CalculatorSettings> {
  try {
    const payload = await getPayload({ config })
    const saved = await payload.findGlobal({ slug: 'calculator' })
    return {
      residuePerAcre: saved.residuePerAcre ?? FALLBACK.residuePerAcre,
      biocharYield: saved.biocharYield ?? FALLBACK.biocharYield,
      creditsPerTonne: saved.creditsPerTonne ?? FALLBACK.creditsPerTonne,
      biocharPerClimapreneur: saved.biocharPerClimapreneur ?? FALLBACK.biocharPerClimapreneur,
      creditPrice: saved.creditPrice,
      farmerShare: saved.farmerShare,
      kilnCost: saved.kilnCost,
    }
  } catch (error) {
    console.error('Could not load the calculator assumptions from the CMS:', error)
    return FALLBACK
  }
}
