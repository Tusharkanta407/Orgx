# Infrastructure Notes

Orgx is scaffolded as a SaaS platform with:

- `Next.js` for `orgx.com` and tenant workspaces
- `FastAPI` for business logic and tenant APIs
- `Supabase Postgres` for data
- `Supabase Storage` for media and proof files
- `Firebase Auth` for sign-in

## Required From Day One

- one Supabase project for development
- one Postgres connection string from Supabase
- one storage bucket strategy for face media and work-proof files
- one Firebase project for auth
- one root domain plus wildcard subdomain setup
- one `.env` file based on the root `.env.example`

## Required Soon After Basic Scaffolding

- one `EVM` testnet RPC provider such as Alchemy or Infura
- one treasury wallet for testnet payout experiments

## Intentionally Deferred At First

- production wallet custody flow
- production token contracts
- real face-match provider
- smart contracts

## Recommended Build Strategy

1. start with `orgx.com` plus tenant-subdomain assumptions in the frontend
2. keep schema changes in code and migrations
3. use `Firebase Auth` for identity and keep tenant roles in Orgx tables
4. use a mock face provider while building attendance flow
5. use managed storage for proof files instead of blockchain
6. use testnet-only wallet and payout setup first
7. add a real biometric provider only after the attendance flow works end to end
