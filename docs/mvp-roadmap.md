# Orgx MVP Roadmap

## Roadmap Goal

Deliver a pilot-ready Orgx MVP that proves:

1. verified attendance works and is written to a tamper-evident chain
2. approvals block unauthorized payroll release and unauthorized wallet activation
3. crypto salary payout reaches employee wallets exactly once
4. the full process is auditable and record integrity can be verified

## Phase 0: Product Definition

### Outputs

- `README.md` aligned to the current product model
- `docs/prd.md`
- `docs/features.md`
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/api-spec.md`
- `docs/mvp-roadmap.md`

### Exit Criteria

- MVP scope is written and internally consistent
- roles, flows, and payout assumptions are explicit
- open verification items are documented

## Phase 1: Repo And Dev Foundation

### Goals

- set up the monorepo layout
- create `Next.js` and `FastAPI` application shells
- create local development and environment conventions

### Outputs

- `apps/web`
- `apps/api`
- `infra`
- `.env.example`
- shared development readme

### Exit Criteria

- frontend and backend both run locally
- database connectivity is working
- environment variables are documented

## Phase 2: Identity, Company Setup, And Onboarding

### Goals

- create role-aware access foundation
- support company, employee, location, leave, and wallet setup
- capture consent before biometric enrollment begins
- require two-party approval before a wallet becomes payout-eligible

### Outputs

- company profile setup
- user and employee creation
- consent capture flow for biometric and location data
- location and geofence setup
- face enrollment metadata flow
- minimal leave input management
- wallet registration with pending and verified states

### Exit Criteria

- a pilot company can fully onboard users and employees
- an employee has a valid wallet and enrollment-ready state
- no wallet becomes payout-eligible without the required approval flow

## Phase 3: Attendance Flow

### Goals

- implement the core employee experience
- validate face and geofence checks
- record accepted and rejected attempts
- make accepted records verifiable against the audit chain

### Outputs

- mobile-first check-in and check-out flow
- attendance validation service
- attendance review screens
- audit logging for attendance events
- on-demand verification for individual attendance records

### Exit Criteria

- an employee can successfully check in and check out
- failed validation returns a visible reason
- attendance history and audit entries are visible to authorized roles
- an accepted attendance record can be recomputed and verified on demand

## Phase 4: Payroll And Approval Flow

### Goals

- convert attendance data into payroll runs
- enforce manager and HR approval gates
- preserve salary value in a base currency while tracking the conversion used for token payout

### Outputs

- payroll period creation
- payroll calculation engine using attendance and leave inputs
- manager approval flow
- HR approval flow
- conversion-rate capture with rate, source, and capture timestamp on payroll items
- audit logging for payroll and approvals

### Exit Criteria

- a payroll run can be generated from approved inputs
- payout cannot start before both approvals exist
- each payout-ready payroll item shows both its base-currency value and token conversion details

## Phase 5: Crypto Payout

### Goals

- execute approved payout instructions to employee wallets
- track on-chain transaction state
- guarantee that duplicate submission or retry cannot double-pay a payroll item

### Outputs

- payout instruction creation from payout-ready payroll items with immutable settlement snapshots
- `EVM` transaction submission
- transaction status tracking
- explicit, attributable retry flow with lineage to the original instruction
- employee payout visibility

### Exit Criteria

- an approved payroll item can be paid to its verified snapshotted wallet
- transaction hash and status are stored and visible
- a duplicate submission or retry cannot result in a second payment for the same payroll item

## Phase 6: Hardening And Verification

### Goals

- make the MVP reliable enough for a pilot
- verify the core controls and audit guarantees

### Outputs

- permission checks, including wallet verification controls
- idempotency protection for payout
- seed data or demo tenant
- key automated tests for high-risk paths
- audit hash verification utility usable by employees for their own records and by HR or auditors more broadly

### Exit Criteria

- core end-to-end demo works on seeded data
- duplicate payout risk is controlled
- audit chain verifies without mismatch

### Named High-Risk Tests

1. payout cannot fire without both manager and HR approval present
2. a given approved payroll item cannot be paid twice under retry or duplicate-submission conditions
3. a tampered attendance or payroll record is detected by audit verification

## Suggested Milestone Sequence

### Milestone A

Docs complete and scope frozen.

### Milestone B

Apps scaffolded and database connected.

### Milestone C

Employee onboarding, consent capture, and attendance flow working end to end.

### Milestone D

Payroll, approvals, and conversion-rate tracking working end to end.

### Milestone E

Crypto payout working on the first supported chain with idempotency proven under retry.

### Milestone F

Pilot readiness with named tests, seed data, and audit verification.

## Recommended Verification Approach

Before expanding features, verify:

- employee mobile web usability
- face-match reliability in real usage
- wallet registration, approval, and payout usability
- payout tracking accuracy and idempotency under real network conditions
- audit log integrity after realistic workflows

## After MVP

Once the pilot flow is stable, the next roadmap can include:

- multi-tenant self-serve onboarding
- more chains and tokens
- stronger fraud checks
- richer payroll configuration
- public-chain anchoring for audit summaries
