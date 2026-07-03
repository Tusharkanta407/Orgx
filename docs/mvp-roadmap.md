# Orgx MVP Roadmap

## Roadmap Goal

Deliver a pilot-ready Orgx MVP that proves:

1. verified attendance works
2. approvals block unauthorized payroll release
3. crypto salary payout reaches employee wallets
4. the full process is auditable

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

### Outputs

- company profile setup
- user and employee creation
- location and geofence setup
- face enrollment metadata flow
- minimal leave input management
- wallet registration and verification state

### Exit Criteria

- a pilot company can fully onboard users and employees
- an employee has a valid wallet and enrollment-ready state

## Phase 3: Attendance Flow

### Goals

- implement the core employee experience
- validate face and geofence checks
- record accepted and rejected attempts

### Outputs

- mobile-first check-in and check-out flow
- attendance validation service
- attendance review screens
- audit logging for attendance events

### Exit Criteria

- an employee can successfully check in and check out
- failed validation returns a visible reason
- attendance history and audit entries are visible to authorized roles

## Phase 4: Payroll And Approval Flow

### Goals

- convert attendance data into payroll runs
- enforce manager and HR approval gates

### Outputs

- payroll period creation
- payroll calculation engine using attendance and leave inputs
- manager approval flow
- HR approval flow
- audit logging for payroll and approvals

### Exit Criteria

- a payroll run can be generated from approved inputs
- payout cannot start before both approvals exist

## Phase 5: Crypto Payout

### Goals

- execute approved payout instructions to employee wallets
- track on-chain transaction state

### Outputs

- payout instruction creation
- `EVM` transaction submission
- transaction status tracking
- employee payout visibility

### Exit Criteria

- an approved payroll item can be paid to a registered employee wallet
- transaction hash and status are stored and visible

## Phase 6: Hardening And Verification

### Goals

- make the MVP reliable enough for a pilot
- verify the core controls and audit guarantees

### Outputs

- permission checks
- idempotency protection for payout
- seed data or demo tenant
- key automated tests for high-risk paths
- audit hash verification utility

### Exit Criteria

- core end-to-end demo works on seeded data
- duplicate payout risk is controlled
- audit chain verifies without mismatch

## Suggested Milestone Sequence

### Milestone A

Docs complete and scope frozen.

### Milestone B

Apps scaffolded and database connected.

### Milestone C

Employee onboarding and attendance flow working end to end.

### Milestone D

Payroll and approvals working end to end.

### Milestone E

Crypto payout working on the first supported chain.

### Milestone F

Pilot readiness with tests, seed data, and audit verification.

## Recommended Verification Approach

Before expanding features, verify:

- employee mobile web usability
- face-match reliability in real usage
- wallet registration and payout usability
- payout tracking accuracy
- audit log integrity after realistic workflows

## After MVP

Once the pilot flow is stable, the next roadmap can include:

- multi-tenant self-serve onboarding
- more chains and tokens
- stronger fraud checks
- richer payroll configuration
- public-chain anchoring for audit summaries
