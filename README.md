# Orgx

Orgx is a B2B workforce platform for companies that need trustworthy attendance, payroll approval, and a tamper-evident audit trail without adding unnecessary operational or compliance risk.

The idea is simple: we provide client companies with a system that verifies employee attendance, stores records in a traceable audit log, calculates payroll, routes approvals through managers and HR, and settles payouts through standard payment rails such as bank transfer or UPI.

## Vision

Orgx is designed for companies that want:

- reliable employee attendance capture
- stronger verification than a basic punch-in system
- payroll linked to validated attendance
- manager and HR approval gates
- a full audit trail for internal review or external audit
- no crypto wallet in the salary disbursement path

This keeps the useful parts of the original idea:

- attendance verification
- tamper-evident records
- full auditability
- manager and HR approval before payroll settlement

And removes the parts that add complexity without helping the business:

- no blockchain transaction per attendance event
- no salary payout through crypto
- no unnecessary compliance exposure in the disbursement flow

## Core Product Flow

### 1. Employee attendance

An employee checks in through the Orgx mobile experience.

Attendance can be verified using one or more of the following methods:

- face verification
- GPS / geofence validation
- device-based validation

For the MVP, the strongest default flow is:

1. employee taps check-in
2. system captures live face data and device GPS
3. face-match service compares the live image to the enrolled reference
4. geofence check confirms the employee is within the allowed office or site radius
5. both checks must pass for attendance to be accepted
6. accepted attendance is written to the backend and audit log
7. if validation fails, the employee sees the reason and can retry

### 2. Backend processing

The backend receives verified attendance events and stores them in Postgres as the system of record.

Postgres holds:

- employee and company data
- attendance records
- leave and payroll data
- payroll approvals
- audit records

### 3. Tamper-evident audit trail

Each audit record is linked to the previous one using a hash chain. This creates a tamper-evident history inside the database without requiring a public blockchain for every record.

If independent timestamping is needed, Orgx can optionally anchor the daily root hash to Polygon:

- one Polygon transaction per day
- not one transaction per attendance record
- used only to prove that a set of records existed at a point in time

This is the valid use of public-chain anchoring in the system: external proof for the audit trail, not payroll execution.

### 4. Payroll flow

Payroll is generated from approved attendance and leave data.

The approval path remains:

1. attendance and payroll data are compiled
2. manager reviews and approves
3. HR reviews and approves
4. payroll rules engine calculates final payout
5. payment gateway executes settlement
6. employee receives money in bank account or UPI

Supported payment rails can include:

- Razorpay
- Cashfree
- NEFT / bank transfer
- UPI

There is no crypto wallet in the disbursement path.

## Architecture Summary

Orgx has two important branches in the architecture:

### Left branch: audit and proof

- records are stored in Postgres
- audit entries are chained using hashes
- a daily root hash may be anchored to Polygon
- auditors or regulators can verify integrity if needed

### Right branch: real money movement

- payroll is calculated from attendance and rules
- manager and HR approvals are required
- payment happens through standard payment gateways
- money lands in bank accounts or UPI, not wallets

## Why This Design Makes Sense

This approach is practical for an MVP and safer for real clients because it:

- keeps the verification and audit strengths
- reduces engineering complexity
- avoids unnecessary on-chain cost
- avoids introducing crypto into salary payments
- aligns better with enterprise and compliance expectations
- remains extensible if stronger external audit proof is needed later

## MVP Scope

The MVP should focus on the smallest version that proves value to client companies.

### Recommended MVP modules

- company onboarding
- employee onboarding
- face enrollment
- office or site geofence setup
- employee check-in and check-out
- attendance dashboard
- approval workflow for manager and HR
- payroll calculation based on attendance and leave inputs
- payment gateway integration
- audit log viewer

### Recommended MVP stack

If you want to build quickly, a good MVP path is:

- `Next.js` for the web dashboard and admin portal
- `FastAPI` for backend APIs and business logic
- `Postgres` as the source of truth
- a face-match API or provider for identity verification
- GPS/geofence validation in the client app

Notes:

- `Next.js` is strong for the company admin panel, HR dashboard, and manager approval flows
- if employee mobile use is essential from day one, add a mobile app later or use a lightweight mobile-first web experience first
- `FastAPI` works well for verification workflows, audit logic, payroll rules, and integration APIs

## Business Model

Orgx is intended as a platform for client companies.

That means we do not build a one-off tool for a single business. We build a reusable system that any company can use, with tenant-specific data and configuration such as:

- office locations and geofences
- departments and reporting managers
- payroll rules
- leave policies
- employee rosters
- approval workflows

In later versions, this should evolve into a multi-tenant SaaS architecture.

## Example End-to-End Flow

1. a company signs up to Orgx
2. the company adds employees, managers, HR, office locations, and payroll rules
3. each employee enrolls identity data for verification
4. the employee checks in from an approved location
5. Orgx validates face match and geofence
6. successful attendance is stored and added to the tamper-evident audit log
7. payroll period closes
8. manager approves
9. HR approves
10. payroll engine calculates payouts
11. payment gateway settles to bank account or UPI
12. audit history remains available for review, dispute handling, and compliance

## Long-Term Extensions

After the MVP, Orgx can grow into:

- multi-tenant SaaS for many companies
- advanced fraud detection
- shift scheduling
- leave and reimbursement workflows
- compliance reporting
- auditor verification tools
- daily root-hash proof explorer
- integrations with ERP, HRMS, and accounting platforms

## Positioning

Orgx is best described as:

> a verifiable attendance and payroll platform for businesses, with strong approval workflows, tamper-evident records, and standard financial settlement rails

## Status

This repository currently represents the product definition and MVP direction for Orgx.

The next implementation phase should turn this into:

- product requirements
- database schema
- API design
- frontend flows
- tenant model
- payroll and audit modules