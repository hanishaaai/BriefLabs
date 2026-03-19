# Lumia Brief

Premium influencer brief builder MVP in Next.js, TypeScript, and Tailwind CSS.

## What is included

- Full product design document and UX/product spec in [docs/product-design-document.md](/Users/hani/Documents/New project/docs/product-design-document.md)
- Elegant landing page
- Dashboard workspace
- Template gallery
- Multi-step brief builder
- AI suggestions side panel
- Hook and idea generation section
- Influencer interpretation analyzer
- Final brief preview page

## Routes

- `/`
- `/dashboard`
- `/templates`
- `/builder`
- `/preview`

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion ready

## Run locally

```bash
npm install
npm run db:bootstrap
npm run dev
```

## Notes

This V1 now supports a Supabase-ready setup with:

- `.env.local` for local credentials
- `npm run db:bootstrap` to create and seed the core Postgres tables
- server-side workspace reads with graceful fallbacks if the database is unavailable

The builder UI and AI outputs are still intentionally prototype-oriented, but the dashboard, template library, and final brief preview are ready to read from a live Supabase-backed data source.
