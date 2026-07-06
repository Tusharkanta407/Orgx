# Orgx

Orgx is a B2B SaaS workforce platform where companies buy and manage plans on `orgx.com`, receive their own tenant workspace such as `cgu.orgx.com`, onboard employees, verify work attendance, and settle crypto payroll to employee wallets with a full audit trail.

The platform is designed for multi-tenant SaaS from the beginning:

- `orgx.com` is the public B2B SaaS site (product, plans, pricing, org signup, login, and payment)
- after payment, the buying company gets an **org dashboard** on `orgx.com` (employees, settings, approvals, payroll)
- `{tenant}.orgx.com` is the **employee workspace** only (login, attendance, work proofs, payout view)
- `FastAPI` owns tenant logic, attendance validation, payroll, payouts, and audit flows
- `Supabase Postgres` stores the operational source of truth
- `Supabase Storage` stores images and work-proof media
- blockchain stores value movement and proof or audit references, not raw media files

## Product Overview

Orgx combines five core capabilities:

- public SaaS onboarding for client companies
- tenant-based workforce operations under subdomains
- verified attendance and work-proof capture
- crypto payroll payout to approved employee wallets
- tamper-evident auditability with optional proof anchoring

## SaaS Flow

### 1. Public acquisition on `orgx.com`

A company discovers Orgx on the public website, reviews packages, submits business details, purchases a plan, and gets provisioned into a tenant workspace.

Example:

- company signs up on `orgx.com`
- company chooses a plan and pays
- Orgx provisions the org dashboard and employee subdomain (e.g. `cgu.orgx.com`)
- company admin manages the org from the dashboard on `orgx.com`
- employees use `cgu.orgx.com` for daily work

### 2. Two surfaces

| Host | Purpose |
|------|---------|
| `orgx.com` | public marketing, plans, org signup/login, payment, and org dashboard after purchase |
| `cgu.orgx.com` | employees — attendance and daily workflow (`cgu` is just an example tenant slug) |

Company admins, HR, and managers work from the org dashboard on `orgx.com`. Employees use the tenant subdomain only.

## Attendance Modes

Orgx should support tenant-configurable attendance policies.

### Remote-work mode

For remote teams, attendance should combine:

1. face verification
2. work-environment proof photos
3. daily task or work-plan submission
4. backend validation and audit logging

### On-site mode

For physical teams, attendance can use a simpler face-based flow, with optional location policy if needed later.

## Storage and Blockchain Rules

Orgx should not store raw photos or heavy attendance payloads on blockchain.

Recommended pattern:

- raw photos and work-proof files go to `Supabase Storage`
- attendance, tasks, validation results, approvals, and payroll records go to `Postgres`
- blockchain stores payout transactions and, where needed, proof hashes or audit anchors

This keeps the system more practical on cost, privacy, compliance, and performance.

## Payroll and Payout

Payroll is generated from approved attendance and recorded leave inputs.

The payout flow is:

1. attendance and related work-proof records are compiled for a payroll period
2. manager reviews and approves
3. HR reviews and approves
4. payroll rules engine calculates value in a fixed base currency
5. Orgx marks the payroll item as payout-ready by snapshotting the approved wallet, conversion rate, and token amount
6. Orgx creates and submits a crypto payout instruction to the employee's verified wallet
7. employee may later convert the received crypto externally

For the MVP, a stablecoin-first policy is recommended.

## Technology Direction

Recommended stack:

- `Next.js` for `orgx.com` and tenant workspaces
- `FastAPI` for backend APIs and business logic
- `Supabase Postgres` for operational data
- `Supabase Storage` for images and work-proof media
- `Firebase Auth` for user sign-in and company email access
- face verification provider for biometric matching
- `EVM` RPC integration for wallet payout and transaction tracking

## Guiding Product Rules

- public site and tenant workspaces are part of the same SaaS product
- each customer gets its own tenant context and subdomain
- attendance is accepted only when the tenant's required validations pass
- payroll cannot move to payout without manager and HR approval
- wallet activation requires an approval flow before the wallet becomes payout-eligible
- payout goes to the approved wallet snapshotted on the specific payroll item
- blockchain is used for value movement and proof anchoring, not raw media storage
- every critical state change must create an audit log entry

## Documentation

The detailed product docs live in:

- `docs/prd.md`
- `docs/features.md`
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/api-spec.md`
- `docs/mvp-roadmap.md`
- `docs/blockchain.md`

## Status

This repository now contains:

- the Orgx product definition
- a SaaS scaffold using `Supabase` for data and storage plus `Firebase Auth` for identity
- the initial `Next.js` and `FastAPI` project structure

The next implementation phase should focus on:

- tenant provisioning
- auth integration
- first database models
- attendance and work-proof flows
- payout-safe payroll infrastructure