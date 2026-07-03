# Orgx MVP Features

## Priority Model

- `P0`: required for the first end-to-end pilot
- `P1`: important soon after the first working flow
- `P2`: useful later, but not required to prove the MVP

## 1. Identity, Access, And Tenant Foundation

### P0

- company-scoped authentication
- role-based access for company admin, HR, manager, and employee
- company-aware data filtering using `company_id`

### P1

- invitation flows for employees and managers
- password reset and session management improvements

### P2

- self-serve company signup
- advanced permission templates

## 2. Company Setup

### P0

- create and manage company profile
- create locations and geofence definitions
- define reporting hierarchy
- configure approved payout token policy

### P1

- multiple sites per company with rules by location
- company-level payroll calendars

### P2

- templated onboarding for multiple companies

## 3. Employee Onboarding

### P0

- employee profile creation
- face enrollment status tracking
- wallet address registration
- wallet verification status

### P1

- employee self-service profile updates
- wallet change request workflow

### P2

- support for multiple wallets per employee

## 4. Attendance Verification

### P0

- mobile-first check-in
- mobile-first check-out
- face-match validation
- GPS/geofence validation
- accepted or rejected result states
- visible retry reason on failure

### P1

- device integrity signals
- offline submission handling
- attendance anomaly flags

### P2

- advanced anti-spoofing and fraud scoring

## 5. Attendance Operations

### P0

- attendance event history
- manager attendance review
- HR attendance review
- attendance status filtering

### P1

- exception queues
- attendance correction workflow

### P2

- shift scheduling and roster-based attendance rules

## 6. Payroll

### P0

- payroll period creation
- compile attendance and leave inputs into payroll inputs
- minimal payroll calculation engine
- payroll item generation

### P1

- configurable earning and deduction rules
- payroll preview exports

### P2

- advanced payroll rules by employee class, site, or region

## 7. Leave Inputs

### P0

- manual leave record entry by HR or admin
- leave records linked to employee and payroll period
- audit visibility for leave changes that affect payroll

### P1

- leave import from CSV or external source
- leave correction workflow

### P2

- full employee leave request and approval workflow

## 8. Approval Workflow

### P0

- manager approval
- HR approval
- approval status timeline
- block payout until required approvals exist

### P1

- rejection and resubmission workflow
- approval comments

### P2

- multi-level custom approval chains

## 9. Crypto Payout

### P0

- create payout instruction from approved payroll item
- support payout to employee `MetaMask` or compatible `EVM` wallet
- record token, chain, wallet address, amount, and transaction hash
- track payout states: pending, confirmed, failed, retried

### P1

- token allowlist management
- treasury balance visibility
- gas estimate visibility

### P2

- multiple chains
- multiple token options per company
- payout batching optimizations

## 10. Audit And Traceability

### P0

- immutable audit event creation for every critical action
- hash chain using `prev_hash` and `record_hash`
- audit viewer for authorized roles

### P1

- audit integrity verification job
- exportable audit reports

### P2

- daily root hash anchoring to a public chain

## 11. Reporting And Visibility

### P0

- attendance summary views
- payroll run summary
- payout status summary

### P1

- manager performance and exception reporting
- employee payout history

### P2

- compliance and auditor dashboards

## 12. Recommended First Release Slice

The smallest useful release should include:

1. company setup
2. employee onboarding
3. wallet registration
4. verified attendance check-in and check-out
5. minimal leave input handling
6. manager and HR approvals
7. payroll calculation
8. crypto payout execution
9. audit trail visibility

## 13. Deferred Until After First Verification

Do not build these before the core flow works:

- native mobile apps
- multiple chain support
- generalized token marketplace behavior
- built-in employee fiat conversion
- large compliance automation modules
- full self-serve SaaS onboarding
