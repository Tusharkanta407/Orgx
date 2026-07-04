# Orgx Web

This is the `Next.js` frontend for Orgx. It will host:

- the public `orgx.com` website
- package and customer onboarding flows
- tenant workspaces such as `cgu.orgx.com`
- employee onboarding, consent capture, and work-proof flows
- wallet registration
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
- `NEXT_PUBLIC_ROOT_DOMAIN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

The current page is a product scaffold only. Real flows will be added on top of the App Router structure in `src/app`.

## Next Build Targets

- public `orgx.com` marketing and onboarding
- tenant host resolution
- Firebase auth shell
- employee onboarding and wallet connection
- remote attendance and work-proof flow
- manager and HR dashboards
