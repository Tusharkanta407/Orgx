# Orgx

Orgx is a B2B attendance, payroll, and audit platform for companies that want verified employee check-ins, manager and HR approval gates, tamper-evident records, and crypto payroll settlement to employee wallets.

The platform is intended for client companies. Orgx helps them verify attendance, calculate payroll from approved records, route approvals through the right business roles, and disburse salary to employee `MetaMask` or compatible `EVM` wallets. Employees can later convert their received crypto into local currency such as rupees or dollars using external off-ramp services.

## Product Overview

Orgx combines four core capabilities:

- verified attendance capture
- payroll calculation from approved attendance data
- crypto payout to employee wallets
- full auditability with tamper-evident records

The product keeps the original strengths of the concept:

- face and location-based attendance verification
- manager and HR approval before payroll release
- traceable payroll actions
- a complete audit trail for disputes, review, and compliance checks

## Core Flow

### 1. Employee attendance

Employees use a mobile-first Orgx web experience to check in and check out.

The default MVP attendance validation flow is:

1. employee taps check-in
2. system captures live face data and device GPS
3. face-match provider compares the live capture to the enrolled reference
4. geofence validation checks whether the employee is inside the allowed office or site boundary
5. both checks must pass for attendance to be accepted
6. accepted attendance is written to the backend and audit log
7. rejected attendance returns a visible reason and allows retry

### 2. System of record

`Postgres` is the operational source of truth for:

- companies
- users and roles
- employees
- locations and geofences
- attendance events
- payroll periods and payroll runs
- approval actions
- payout records
- audit records

### 3. Tamper-evident audit trail

Every critical business action is written to a hash-chained audit log in `Postgres`.

This includes:

- attendance acceptance or rejection
- manager approvals
- HR approvals
- payroll finalization
- payout initiation
- on-chain transaction status updates

Each audit record links to the previous one using hashes, creating a tamper-evident chain. A later version may optionally anchor a daily root hash to a public chain such as `Polygon` for independent timestamping.

### 4. Payroll and payout

Payroll is generated from approved attendance and recorded leave inputs.

The payroll flow is:

1. attendance data is compiled for a payroll period
2. manager reviews and approves
3. HR reviews and approves
4. payroll rules engine calculates final payout
5. Orgx prepares a crypto payout instruction
6. payout is sent to the employee's `MetaMask` or compatible `EVM` wallet
7. employee may convert the received crypto into local currency externally

For the MVP, Orgx should support a controlled allowlist of tokens rather than unrestricted assets. A stablecoin-first approach is recommended for predictable payroll value, while keeping the architecture extensible for other approved tokens later.

## Why This Design Exists

Orgx is designed for companies that want:

- stronger attendance proof than a basic punch-in app
- a clear approval path before money moves
- on-chain payout instead of bank or UPI settlement
- tamper-evident records of who did what and when
- a reusable system that can be offered to multiple client companies

## MVP Scope

The MVP focuses on the smallest product that proves the full loop for a pilot company.

### In scope

- company setup for a pilot client
- employee onboarding
- face enrollment metadata capture
- geofence and location setup
- employee check-in and check-out
- attendance review dashboard
- manager approval flow
- HR approval flow
- payroll calculation from attendance and leave inputs
- employee wallet registration and verification
- crypto payout execution to `MetaMask` / `EVM` wallets
- payout status tracking
- audit log viewer

### Recommended stack

- `Next.js` for employee, manager, HR, and admin interfaces
- `FastAPI` for backend APIs and business logic
- `Postgres` for operational data and audit records
- face-match provider for biometric verification
- `EVM` RPC integration for wallet payout and transaction tracking

## Business Model

Orgx is a reusable platform for client companies, not a one-off internal tool.

Each company can have its own:

- employees
- reporting structure
- locations and geofences
- payroll settings
- approved payout token policy
- approval workflows

The MVP can start with one pilot company, but the backend and schema should stay tenant-ready from the beginning.

## Guiding Product Rules

- attendance is accepted only when required validations pass
- payroll cannot move to payout without manager and HR approval
- payout goes to the employee wallet on record
- every critical state change must create an audit log entry
- conversion from crypto to fiat happens outside Orgx in the MVP

## Documentation

The next layer of this repository is the formal MVP documentation:

- `docs/prd.md`
- `docs/features.md`
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/api-spec.md`
- `docs/mvp-roadmap.md`

## Status

This repository currently holds the product definition for the Orgx MVP.

The next implementation phase will turn the documentation into:

- a project scaffold
- backend services
- frontend flows
- tenant-ready data models
- payroll and wallet payout modules
- audit and verification utilities