# Orgx Web

This is the `Next.js` frontend for Orgx. It will host:

- employee onboarding and consent capture
- wallet registration
- mobile-first attendance check-in and check-out
- manager and HR review screens
- payout and audit visibility

## Getting Started

First, install dependencies once sufficient disk space is available, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Before running the app, create a root `.env` file from `.env.example` and set:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The current page is a product scaffold only. Real flows will be added on top of the App Router structure in `src/app`.

## Next Build Targets

- auth shell
- company onboarding
- employee onboarding and wallet connection
- attendance capture flow
- manager and HR dashboards
