# Orgx MVP Roadmap

## Roadmap Goal

Deliver a pilot-ready Orgx MVP that proves:

1. `orgx.com` works as a B2B SaaS site (product, plans, org signup, login, payment)
2. after payment, the buying org gets a dashboard on `orgx.com` and a tenant subdomain such as `cgu.orgx.com`
3. employees can log in on `{tenant}.orgx.com` and complete the attendance / work-proof workflow
4. org admins can manage employees and operations from the org dashboard on `orgx.com`
4. verified attendance and remote work-proof capture work with tamper-evident audit records
5. approvals block unauthorized payroll release and unauthorized wallet activation
6. crypto salary payout reaches employee wallets exactly once (see `docs/blockchain.md`)
7. optional on-chain proof anchoring and payslip verification after the core loop is stable

## Success Definition (Product)

The project succeeds when:

| Surface | Host | Who uses it |
|--------|------|-------------|
| Public SaaS | `orgx.com` | prospects — product, plans, signup, login, payment |
| Org dashboard | `orgx.com` (logged-in) | company admin, HR, managers — employees, policies, approvals |
| Employee workspace | `cgu.orgx.com` | employees — login, attendance, work proofs, payout view |

Success = a company can buy on `orgx.com`, land in the org dashboard, and employees can use `{tenant}.orgx.com`. (`cgu` is an example slug only.)

## Recommended Build Order

Build in this order — public SaaS and org onboarding first, then employee subdomain.

### Step 1 — Public B2B website (`orgx.com`)

- product pages, features, pricing / plans
- marketing layout and clear SaaS positioning

**Why first:** this is how companies discover and understand Orgx.

### Step 2 — Org signup, login, and payment

- org account creation on `orgx.com`
- Firebase Auth for org users
- plan selection and payment (can start with manual / pilot billing)

**Why second:** a company must sign up and pay before they get a workspace.

### Step 3 — Provision tenant + org dashboard

- create `Company` record with subdomain slug (e.g. `cgu`)
- after payment, show org dashboard on `orgx.com`
- org admin can add employees, basic settings, see tenant URL `cgu.orgx.com`

**Why third:** the org dashboard is where admins set up the company before employees start.

### Step 4 — Employee workspace (`{tenant}.orgx.com`)

- employee login on tenant subdomain
- consent, check-in / check-out, remote work proofs
- attendance history and payout view

**Why fourth:** employees need the org to exist and admins to add them first.

### Step 5 — Approvals and payroll (org dashboard + backend)

- manager / HR approval gates
- payroll period and payout-ready items

### Step 6 — Blockchain (see `docs/blockchain.md`)

- ERC-20 payout + `tx_hash` tracking
- audit root anchoring via `OrgxAnchor`
- payslip hash verification last

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
- create environment conventions for public site, tenant subdomains, storage, and auth

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
- public and tenant workspace assumptions are documented

## Phase 2: Public SaaS, Payment, And Tenant Provisioning

### Goals

- complete the public B2B site on `orgx.com`
- org signup, login, and payment
- provision tenant subdomain and org dashboard after purchase

### Outputs

- product and pricing pages on `orgx.com`
- org signup and payment flow
- tenant provisioning API and `Company` data model
- org dashboard on `orgx.com` (logged-in area)
- host resolution for `{tenant}.orgx.com`
- `Firebase Auth` integration and Orgx role mapping

### Exit Criteria

- a company can sign up, pay, and land in the org dashboard on `orgx.com`
- provisioning `cgu` yields a working `cgu.orgx.com` employee URL
- org admin can add an employee from the dashboard

## Phase 2b: Org Dashboard

### Goals

- give company admins a real control surface on `orgx.com` after login

### Outputs

- org dashboard shell
- employee CRUD
- tenant settings (attendance mode, base currency placeholder)
- view onboarding / consent status per employee
- display employee workspace URL (`{tenant}.orgx.com`)

### Exit Criteria

- org admin can add an employee email and see them in the system
- employee record exists before the employee opens `{tenant}.orgx.com`
## Phase 3: Identity, Company Setup, And Onboarding

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
- proof media storage metadata flow
- minimal leave input management
- wallet registration with pending and verified states

### Exit Criteria

- a pilot company can fully onboard users and employees
- an employee has a valid wallet and enrollment-ready state
- no wallet becomes payout-eligible without the required approval flow
## Phase 4: Attendance Flow

### Goals

- implement the core employee experience
- validate face and remote proof checks
- record accepted and rejected attempts
- make accepted records verifiable against the audit chain

### Outputs

- mobile-first check-in and check-out flow
- attendance validation service
- remote-work proof capture and storage flow
- attendance review screens
- audit logging for attendance events
- on-demand verification for individual attendance records

### Exit Criteria

- an employee can successfully check in and check out
- failed validation returns a visible reason
- attendance history and audit entries are visible to authorized roles
- an accepted attendance record can be recomputed and verified on demand
## Phase 5: Payroll And Approval Flow

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

## Phase 6: Crypto Payout

See `docs/blockchain.md` for full design.

### Goals

- execute approved payout instructions via direct ERC-20 transfer (not payroll smart contract)
- track on-chain transaction state
- guarantee that duplicate submission or retry cannot double-pay a payroll item

### Outputs

- `apps/api/app/services/blockchain.py` — payout execution
- payout instruction creation from payout-ready payroll items with immutable settlement snapshots
- `EVM` transaction submission and `BlockchainTransaction` records
- explicit, attributable retry flow with lineage to the original instruction
- employee payout visibility on `{tenant}.orgx.com`

### Exit Criteria

- an approved payroll item can be paid to its verified snapshotted wallet
- transaction hash and status are stored and visible
- a duplicate submission or retry cannot result in a second payment for the same payroll item

## Phase 7: On-Chain Proof And Payslips

### Goals

- deploy `OrgxAnchor` registry contract on testnet
- anchor periodic attendance and audit roots
- optional payslip hash registration and `orgx.com/verify` portal

### Outputs

- `contracts/OrgxAnchor.sol`
- periodic anchoring background job
- `apps/api/app/services/payslip.py` (PDF + hash registration)
- `apps/web/src/app/verify/page.tsx`

### Exit Criteria

- audit root can be anchored and verified against chain state
- payslip hash verifies on `/verify` after registration
- tampered payslip fails verification

## Phase 8: Hardening And Verification

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

Tenant provisioned: company paid on `orgx.com`, org dashboard live, `cgu.orgx.com` resolving; admin can add employees.

### Milestone D

Employee attendance and remote proof flow working on `cgu.orgx.com`.

### Milestone E

Payroll, approvals, and conversion-rate tracking working end to end.

### Milestone F

Crypto payout (ERC-20) working on testnet with idempotency proven under retry.

### Milestone G

`OrgxAnchor` anchoring and payslip verify (if in scope for pilot).

### Milestone H

Pilot readiness with named tests, seed data, and audit verification.

## Recommended Verification Approach

Before expanding features, verify:

- employee mobile web usability
- public-site conversion and tenant onboarding usability
- face-match reliability in real usage
- wallet registration, approval, and payout usability
- payout tracking accuracy and idempotency under real network conditions
- audit log integrity after realistic workflows

## After MVP

Once the pilot flow is stable, the next roadmap can include:

- more chains and tokens
- stronger fraud checks
- richer payroll configuration
- public-chain anchoring for audit summaries
