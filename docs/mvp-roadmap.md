# Orgx MVP Roadmap

## Roadmap Goal

Deliver a pilot-ready Orgx MVP that proves:

1. a tenant can be provisioned with working subdomains: `{tenant}.orgx.com` for employees and `{tenant}.admin.orgx.com` for tenant admins
2. employees can log in on the tenant workspace and complete the attendance / work-proof workflow
3. tenant admins can manage employees and review operations from the admin subdomain
4. verified attendance and remote work-proof capture work with tamper-evident audit records
5. approvals block unauthorized payroll release and unauthorized wallet activation
6. crypto salary payout reaches employee wallets exactly once (see `docs/blockchain.md`)
7. optional on-chain proof anchoring and payslip verification after the core loop is stable

## Success Definition (Product)

The project succeeds when:

| Surface | Host | Who uses it |
|--------|------|-------------|
| Public site | `orgx.com` | prospects, signup (can be simplified early) |
| Employee workspace | `cgu.orgx.com` | employees — login, attendance, work proofs, payout view |
| Tenant admin | `cgu.admin.orgx.com` | company admin, HR, managers — employees, policies, approvals |

Generating the tenant subdomains and making both workspaces usable is the core org-side success metric. Employee workflows only matter once a tenant exists.

## Recommended Build Order

Build in this order—not employee-first in isolation, and not full public marketing before tenant works.

### Step 1 — Tenant foundation (org side, minimal)

- tenant record + subdomain slug (`cgu`)
- host resolution for `{tenant}.orgx.com` and `{tenant}.admin.orgx.com`
- Firebase Auth wiring + Orgx role mapping
- manual or API-based tenant provisioning for pilot

**Why first:** without this, there is no `cgu.orgx.com` for employees to use.

### Step 2 — Tenant admin (org side, operational)

- `{tenant}.admin.orgx.com` dashboard shell
- create / list employees
- basic tenant settings and attendance policy flags
- consent and onboarding status visibility

**Why second:** admins must add employees before the employee app is meaningful.

### Step 3 — Employee workspace (employee side)

- `{tenant}.orgx.com` mobile-first flow
- login, consent, face enrollment metadata, check-in / check-out
- remote work-proof upload (storage) + task notes
- attendance history for the employee

**Why third:** this is the main daily-use loop, but it depends on Step 1 and 2.

### Step 4 — Approvals and payroll (admin + backend)

- manager / HR approval gates
- payroll period and payout-ready items

### Step 5 — Blockchain (see `docs/blockchain.md`)

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

## Phase 2: Tenant Provisioning And Subdomains

### Goals

- provision tenant subdomains for customers
- resolve `{tenant}.orgx.com` and `{tenant}.admin.orgx.com` correctly
- establish `Firebase Auth` and Orgx role mapping

### Outputs

- tenant provisioning API and data model
- host resolution for employee and admin subdomains
- `Firebase Auth` integration and session exchange with FastAPI
- minimal public signup path on `orgx.com` (can stay thin until later)

### Exit Criteria

- provisioning `cgu` yields `cgu.orgx.com` and `cgu.admin.orgx.com`
- tenant context resolves correctly from both host patterns
- a tenant admin user can access the admin subdomain

## Phase 2b: Tenant Admin Dashboard

### Goals

- give tenant admins a real control surface on `{tenant}.admin.orgx.com`

### Outputs

- admin dashboard shell
- employee CRUD
- tenant settings (attendance mode, base currency placeholder)
- view onboarding / consent status per employee

### Exit Criteria

- tenant admin can add an employee email and see them in the system
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

Tenant provisioned: `cgu.orgx.com` + `cgu.admin.orgx.com` resolving; admin can add employees.

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
