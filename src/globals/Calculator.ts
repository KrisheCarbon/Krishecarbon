import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * The assumptions behind the partner calculator. Every figure on that page is
 * worked out from these, and the page lists them so a visitor can see where a
 * result came from. The money fields are optional: leave one empty and the
 * calculator simply does not show that line.
 */
export const Calculator: GlobalConfig = {
  slug: 'calculator',
  label: 'Calculator assumptions',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath('/calculator')
        } catch {
          // Saved from a script outside the web server: there is no page cache to refresh
        }
      },
    ],
  },
  fields: [
    {
      name: 'residuePerAcre',
      label: 'Crop residue per acre, per year (tonnes)',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 1,
    },
    {
      name: 'biocharYield',
      label: 'Biochar yield (% of residue weight)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      defaultValue: 25,
    },
    {
      name: 'creditsPerTonne',
      label: 'Carbon credits per tonne of biochar',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 2.5,
    },
    {
      name: 'biocharPerClimapreneur',
      label: 'Biochar one Climapreneur can produce in a year (tonnes)',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: 100,
    },
    {
      name: 'creditPrice',
      label: 'Price per credit (₹)',
      type: 'number',
      min: 0,
      admin: { description: 'Optional. Without it the calculator shows no income figures.' },
    },
    {
      name: 'farmerShare',
      label: 'Share of credit income that goes to farmers (%)',
      type: 'number',
      min: 0,
      max: 100,
      admin: { description: 'Optional. Needs a price per credit as well.' },
    },
    {
      name: 'kilnCost',
      label: 'Cost to set up one Climapreneur with a kiln (₹)',
      type: 'number',
      min: 0,
      admin: { description: 'Optional. Without it the calculator shows no starting investment.' },
    },
  ],
}
