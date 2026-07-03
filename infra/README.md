# Infrastructure Notes

Orgx is scaffolded as a `Supabase-first` project with a `Next.js` frontend and `FastAPI` backend.

## Required From Day One

- one Supabase project for development
- one Postgres connection string from Supabase
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

1. start with Supabase as the development database
2. keep schema changes in code and migrations
3. use a mock face provider while building attendance flow
4. use testnet-only wallet and payout setup first
5. add a real biometric provider only after the attendance flow works end to end
