# KriSHE Carbon website

The marketing site for KriSHE Carbon: Next.js for the pages, Payload CMS (inside the same app, at `/admin`) for the blog and the figures that change.

## Run it locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000. The CMS is at http://localhost:3000/admin; the first visit asks you to create the admin login.

Locally the CMS keeps its data in a file, `payload.db`, so there is nothing else to install. To start it off with the sample blog posts and the calculator's assumptions:

```bash
npm run seed
```

## Where things are

| What | Where |
| --- | --- |
| Pages | `src/app/(frontend)` — home, `projects/biochar`, `climapreneurs`, `calculator`, `blog`, `enquire` |
| Colours, type, the glass material | the top of `src/app/(frontend)/globals.css` |
| Fonts (Google Sans; `SERIF_HEADINGS` switches headings to the brand guide's DM Serif Display) | `src/app/(frontend)/layout.tsx` |
| Nav links, contact details | `src/lib/site.ts` |
| The atom, line art, loader | `src/components` |
| CMS: blog posts | `src/collections/Posts.ts` |
| CMS: credit figures, calculator assumptions | `src/globals` |
| Photos and clips from the shoot | `src/assets/shoot`, `public/media` |

## What is edited in the CMS

- **Carbon credits**: available, issued, retired, vintage. A figure left empty is not shown on the site.
- **Calculator assumptions**: every number the calculator uses. The income and investment lines only appear once a price and a kiln cost are entered.
- **Posts**: the blog. A post appears once it is published.

Saving any of these refreshes the pages that use them.

## Enquiries

The enquiry form sends each enquiry to a Google Sheet. The sheet needs a small script attached; the script and its five setup steps are in `integrations/google-sheet/Code.gs`. The site then needs two settings: `ENQUIRY_SHEET_WEBHOOK_URL` and `ENQUIRY_SHEET_SECRET`.

Until those are set the form tells the visitor it could not send and offers the email address instead.

## Photos and video

The raw shoot is about 2 GB and is kept outside this folder, in `../media`. The site uses compressed copies, which are already here. To make them again (after changing which shots are used, in `scripts/build-media.mjs`):

```bash
npm run media
```

## The demo on Vercel

The demo is the Vercel project `krishe-carbon` (team `strugglers`). It was deployed from this folder with Vercel's command-line tool, with no Git repository involved. To publish the current state of this folder again:

```bash
npx vercel deploy --prod
```

`.vercelignore` lists what is never uploaded: local settings, the local CMS database and its uploads. While the site is on a `vercel.app` address it tells search engines to stay out, and its links use that address; set `NEXT_PUBLIC_SITE_URL` when it gets its real domain.

## Putting it on Vercel from a Git repository

1. Put **this folder only** in the Git repository (or set the project's Root Directory to `web`). The raw shoot must not be pushed.
2. In Vercel, import the repository. It is detected as Next.js; no build settings need changing.
3. In the project's **Storage** tab add a **Postgres** database and a **Blob** store. Vercel sets the database address (`DATABASE_URL` or `POSTGRES_URL`; the site reads either) and `BLOB_READ_WRITE_TOKEN` for you.
4. In **Settings → Environment Variables** add:
   - `PAYLOAD_SECRET`: any long random text
   - `NEXT_PUBLIC_SITE_URL`: the site's address, e.g. `https://krishe-demo.vercel.app`
   - `ENQUIRY_SHEET_WEBHOOK_URL` and `ENQUIRY_SHEET_SECRET`: from the Google Sheet setup
5. Deploy, then open `/admin` on the deployed site and create the admin login.

The database tables are created during the first deploy, from `src/migrations`. Nothing else creates or changes tables on Postgres.

To add the sample posts to the deployed site, wait for the first deploy to finish, put the deployed site's `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` in your local `.env`, and run `npm run seed`. The posts show on the site within the hour, or straight away after a redeploy. Put the local values back in `.env` afterwards.

### After changing a collection or global

A change to the files in `src/collections` or `src/globals` needs a new migration, or the deployed database will not match:

```bash
DATABASE_URL=postgres://user:pass@host/db npx payload migrate:create describe-the-change
```

Commit the files it adds to `src/migrations`.

## Moving to the client's Supabase

Set `DATABASE_URL` to the Supabase connection string; nothing else in the code changes for the database. Uploads are the one thing to revisit: they use Vercel Blob here, and would move to Supabase Storage.
