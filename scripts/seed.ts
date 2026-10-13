// Fills a new database with a starting point:  npm run seed
// Safe to run again: it only adds what is missing.
//   - the credit figure already published on the current site
//   - the calculator's assumptions (saved so they show up in the CMS)
//   - three blog posts made from what KriSHE has already published elsewhere (see POSTS)
// It also removes the two sample posts an earlier version of this script added.

import config from '@payload-config'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const here = path.dirname(fileURLToPath(import.meta.url))
const shoot = (file: string) => path.resolve(here, '../src/assets/shoot', file)

const BIOCHAR_TODAY =
  'https://biochartoday.com/blog/expert-profiles/building-farmer-first-carbon-removal-a-conversation-with-anjali-rose-of-krishe-carbon/'
const SCIENCE_ARTICLE = 'https://www.linkedin.com/pulse/believe-science-just-technology-anjali-rose-pd1lc/'
const FIELD_NOTES = 'https://www.linkedin.com/pulse/krishe-carbon-2025-field-notes-krishe-carbon-nklec/'

// Samples from the first version of this script, replaced by the posts below
const RETIRED_SLUGS = ['what-is-biochar', 'carbon-credits-in-plain-words']

// Each post is written afresh from a piece KriSHE pointed us to, and links back to it.
// `publishedAt` is the date of the original, so the blog reads in the order things happened.
const POSTS = [
  {
    title: 'Farmer-first carbon removal: Anjali Rose in conversation with Biochar Today',
    slug: 'farmer-first-carbon-removal-biochar-today',
    topic: 'In conversation',
    publishedAt: '2026-07-15T06:00:00.000Z',
    excerpt:
      'Our co-founder spoke to Biochar Today about why KriSHE starts with soil, how trust is built in a village, and what certification changes for a smallholder.',
    cover: { file: 'farmer-and-founder.jpg', alt: 'Anjali Rose standing beside a woman farmer in front of a crop field' },
    markdown: `In July 2026, Biochar Today published a long conversation between Shanthi Prabha and our co-founder, Anjali Rose. These are the threads we would pull out of it. The full interview is on [Biochar Today](${BIOCHAR_TODAY}).

## It began with a field on fire

Anjali grew up in Haryana, where stubble burning makes the news every winter. KriSHE came from one observation: the residue farmers burn is the organic matter their soil is short of. Turned into biochar, it goes back into the ground as stable carbon, not into the air as smoke.

## What farmer-first means in practice

The programme is designed around how a farmer experiences it. Two questions decide most things: can a farmer reach it, and can they afford it without taking on risk they cannot carry. That is why the kilns travel to the farm, so the residue does not have to travel to a plant, and why the work is built up one village at a time.

## Trust comes from showing up

Most of the farmers in the network are women whose days are already full. So the first rule is to ask for as little of a farmer's time as possible and to put as much as possible back into the farm. In Anjali's words, "trust in rural India is built through presence, not pitches." A Climapreneur from the same village does more for adoption than any brochure.

## Climapreneurs

Climapreneurs are village-level entrepreneurs, chosen for their standing in the community and trained to run Kon-Tiki kilns as a small business: operation, safety, quality, and the record-keeping that verification depends on.

## Proof without the burden

Recording a batch takes a Climapreneur a few minutes: feedstock, weight, kiln, date and a photo. The checking is done by the system, which keeps a trail from a single field to an issued credit. The weight of proof does not fall on the farmer.

## Why certification matters

KriSHE's credits are issued under the Global Artisan C-Sink standard of Carbon Standards International. Independent certification is what lets a buyer trust a tonne. It is also what moves the cost of turning residue into biochar away from the smallholder and onto the buyer of a verified result.

## Soil first, climate second

Conversations in the field start with the land and the next crop. Biochar is explained as a deposit back into the soil. The climate story comes afterwards.

Read the whole conversation on [Biochar Today](${BIOCHAR_TODAY}).`,
  },
  {
    title: '2025 field notes: a year of quiet building',
    slug: '2025-field-notes',
    topic: 'Field notes',
    publishedAt: '2025-12-31T06:00:00.000Z',
    excerpt: 'What a first pilot in Gujarat taught us: change moves at the speed of relationships.',
    cover: { file: 'farmer-group.jpg', alt: 'A group of women farmers standing together in front of a biochar kiln' },
    markdown: `*Adapted from the [field notes the KriSHE Carbon team published on LinkedIn](${FIELD_NOTES}) at the end of 2025.*

A year earlier we had asked how to build something that truly benefits farmers. We still do not have every answer. What 2025 showed is what happens when that question is worked on with farmers, and not only for them. It was a year of village visits, train rides, soil samples and a lot of listening.

## The "Climate ATM"

The moment that defined the year was a conversation. Meenakshi Ben, a farmer in our network, described the biochar kiln as a "Climate ATM": waste goes in, value comes out. It summed up the Climapreneur model we had been building, in which local people are trained to turn crop waste into biochar and farmers gain better soil without added cost or risk.

## The pilot in numbers

Our work in Gujarat from January to March 2025 was our best teacher.

- 800+ km travelled, across more than 20 villages
- 400+ farmers engaged
- 500 women farmers trained
- 150 tonnes of biochar produced
- about 300 tonnes of CO₂ sequestered

## Global standards, local roots

During the year we received endorsement from Carbon Standards International and registered our first carbon project. Our biochar is verified to remove 2.35 tCO₂e per tonne.

## Standing on many shoulders

This work is not done alone. It has been shaped by partners including CInI, CSPC, Griffith Foods, AEGF and Pradan, and by the early support of the SoilBox programme (riidl, OmniActive), which made our first pilot possible. We were also finalists in the SustainAgri Challenge, supported by the UN Women Climate & Care Accelerator, and backed by the EarthON Foundation.

## Looking ahead

We are preparing for responsible scale, not scale for its own sake: stronger data, a growing Climapreneur network, and more nature-based pathways, with gender and farmer agency at the centre. Having tested the Climapreneur platform in 2025, the next step is the full digital MRV system.`,
  },
  {
    title: 'Believe in science, not just technology',
    slug: 'believe-in-science-not-just-technology',
    topic: 'Perspective',
    publishedAt: '2025-08-26T06:00:00.000Z',
    excerpt:
      'Science is the understanding; technology is one way of applying it. In biochar, the difference decides who a carbon project is built for.',
    cover: { file: 'kiln-firing.jpg', alt: 'Crop residue being fed into a burning cone kiln at the edge of a field' },
    markdown: `*Adapted from an article by our co-founder Anjali Rose, [first published on LinkedIn](${SCIENCE_ARTICLE}) in August 2025.*

People often say they trust science when what they trust is a technology. The two are different. Science is the effort to understand how something works. Technology is one way of putting that understanding to use, usually as a product built to scale. In sustainable agriculture and carbon, and in India especially, it is worth being clear about which of the two we are trusting, and why.

KriSHE Carbon works directly with farmers. The aim is carbon solutions that are technically sound and also within a farmer's reach: adaptable, and grounded in how farming really happens. That means looking at the whole system.

## Industrial and artisanal biochar

Large industrial biochar plants are growing in number. They bring speed, volume and often early funding. They are also centralised and expensive to build, and they can pass over the communities beside them. Carbon finance that could build climate resilience gets absorbed in managing the cost of each tonne.

Artisanal biochar is small, local production. It gets less attention, but it fits the way most Indian farmers work: spread out, seasonal and short of capital.

This is not an argument against industrial models, which have their place. The science of biochar does not call for one answer everywhere. It calls for thinking that fits the context.

## Decentralised does not mean disorganised

Decentralised systems are harder to manage. When pyrolysis happens in hundreds of small units, keeping it consistent is a real challenge, and so are the risks: counting removals twice, delivering fewer credits than promised, losing the trail. The criticism is fair.

It is also answerable. Small units can be held to a standard with batch-by-batch control, a documented process and MRV tools made for the field, so that the carbon removed can be tracked. Standards such as those of Carbon Standards International are making room for credible projects led by smallholders, and large developers are starting to see the long-term value of models that grow with communities.

## Design for the farmer, deliver for the climate

No single solution fits everywhere. But every credible one should fit the people it says it serves. KriSHE is trying to hold a practical line between scientific rigour and what survives a real farming season.`,
  },
]

const payload = await getPayload({ config })

const credits = await payload.findGlobal({ slug: 'credits' })
if (credits.issued == null) {
  await payload.updateGlobal({ slug: 'credits', data: { issued: 3000 } })
  console.log('Credits: set "issued" to 3,000')
}

// Saving once writes the default assumptions into the database, where the team can edit them
const calculator = await payload.findGlobal({ slug: 'calculator' })
await payload.updateGlobal({
  slug: 'calculator',
  data: {
    residuePerAcre: calculator.residuePerAcre ?? 1,
    biocharYield: calculator.biocharYield ?? 25,
    creditsPerTonne: calculator.creditsPerTonne ?? 2.5,
    biocharPerClimapreneur: calculator.biocharPerClimapreneur ?? 100,
  },
})
console.log('Calculator: assumptions saved')

for (const slug of RETIRED_SLUGS) {
  const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, draft: true })
  if (docs[0]) {
    await payload.delete({ collection: 'posts', id: docs[0].id })
    console.log(`Post: removed the sample "${docs[0].title}"`)
  }
}

const editorConfig = await editorConfigFactory.default({ config: payload.config })
for (const { cover, markdown, ...post } of POSTS) {
  const existing = await payload.find({ collection: 'posts', where: { slug: { equals: post.slug } }, limit: 1 })
  if (existing.totalDocs > 0) continue

  const media = await payload.create({ collection: 'media', data: { alt: cover.alt }, filePath: shoot(cover.file) })
  await payload.create({
    collection: 'posts',
    data: {
      ...post,
      cover: media.id,
      content: convertMarkdownToLexical({ editorConfig, markdown }),
      _status: 'published',
    },
  })
  console.log(`Post: added "${post.title}"`)
}

process.exit(0)
