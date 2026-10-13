import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Where next/image is allowed to read local files from
    localPatterns: [
      { pathname: '/api/media/file/**' }, // CMS uploads
      { pathname: '/_next/static/media/**' }, // images imported in code
      { pathname: '/brand/**' },
      { pathname: '/media/**' },
    ],
    // CMS uploads when the site runs on Vercel
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
