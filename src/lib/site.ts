// The address the site is served from. NEXT_PUBLIC_SITE_URL wins when it is set; without it a
// Vercel deploy uses the address Vercel gave the project, so links in previews are never wrong.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : 'https://www.krishecarbon.com')

export const SITE = {
  name: 'KriSHE Carbon',
  url: siteUrl,
  description:
    'KriSHE Carbon turns crop residue into biochar: a stable, charcoal-like carbon that locks CO₂ into farmers’ soil for centuries while improving the land.',
  email: 'krishecarbon@gmail.com',
  phone: { href: '+917975597294', label: '+91 79755 97294' },
  address: 'Sector 77, Gurgaon, Haryana, India',
  // The buyer and partner dashboard is a separate product
  loginUrl: 'https://admin.krishecarbon.com',
}

export const NAV_LINKS = [
  { href: '/projects/biochar', label: 'Project' },
  { href: '/climapreneurs', label: 'Climapreneurs' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/blog', label: 'Blog' },
]
