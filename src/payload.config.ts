import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Calculator } from './globals/Calculator'
import { Credits } from './globals/Credits'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// A Postgres URL (Vercel's database for the demo, the client's Supabase later) is used when one
// is set; otherwise a local SQLite file, so the CMS runs on a laptop with no setup.
// Vercel's database integrations name the variable DATABASE_URL or POSTGRES_URL, so both are read.
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || 'file:./payload.db'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts],
  globals: [Credits, Calculator],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: databaseUrl.startsWith('postgres')
    ? // On a server the tables are created from src/migrations when the site is built or first starts.
      // push is off so a script run from a laptop can never alter the server's tables on its own.
      postgresAdapter({ pool: { connectionString: databaseUrl }, prodMigrations: migrations, push: false })
    : sqliteAdapter({ client: { url: databaseUrl } }),
  sharp,
  plugins: [
    // Vercel's servers do not keep files, so uploads made in the CMS go to Vercel Blob there
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
