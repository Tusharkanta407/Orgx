# Orgx MVP PRD

## 1. Product Summary

Orgx is a B2B platform for client companies that need verified attendance, approval-based payroll, crypto salary disbursement, and a tamper-evident audit trail.

The MVP will support a mobile-first employee web experience, a web dashboard for managers, HR, and company admins, and a backend that stores operational records in `Postgres` while executing approved payroll payouts to employee `MetaMask` or compatible `EVM` wallets.

## 2. Problem Statement

Many companies still manage attendance and payroll with systems that are easy to dispute, easy to manipulate, or poorly connected across verification, approval, and payment.

Orgx solves this by combining:

- attendance verification using face match and geofence validation
- payroll calculated from accepted records
- manager and HR approval gates before payout
- wallet-based crypto disbursement
- tamper-evident audit logging for every critical event

## 3. Target Customers

The initial target customer is a pilot company that:

- manages field, office, or hybrid workers
- wants stronger proof of attendance than manual punch systems
- is comfortable paying via crypto wallet rails
- wants a complete review trail for payroll decisions

Longer term, Orgx should serve multiple client companies through a tenant-ready architecture.

## 4. Personas

### Company Admin

Responsible for setting up the company, configuring locations, assigning reporting structure, defining payroll settings, and monitoring the tenant.

### Employee

Uses the mobile-first web app to enroll required identity data, register a wallet, check in, check out, review personal attendance, and view payout status.

### Manager

Reviews attendance or payroll data for the employees who report to them and gives first-level approval.

### HR

Performs final approval before payroll is released and reviews exceptions, payout records, and audit history.

### Auditor or Compliance Reviewer

Reviews traceable records and verifies who performed important actions and when.

## 5. Goals

### Business Goals

- prove the end-to-end value of Orgx for a pilot client
- establish Orgx as a reusable product rather than a one-off build
- demonstrate a reliable attendance-to-payroll workflow with crypto settlement

### Product Goals

- capture verified attendance with visible pass or fail reasons
- prevent payroll release without required approvals
- send salary to employee `EVM` wallets
- preserve an auditable trail of all critical actions

### Technical Goals

- keep the backend tenant-ready even for a single pilot company
- separate operational data from integration and chain-tracking concerns
- make payment execution pluggable enough to support more tokens or chains later

## 6. Non-Goals For MVP

- native mobile apps
- self-serve multi-tenant signup
- unlimited token support
- advanced tax and country-specific payroll compliance automation
- built-in fiat off-ramp or exchange services
- leave approval workflows beyond the minimum needed as payroll input
- deep ERP or HRMS integrations

## 7. Product Assumptions

- the pilot customer accepts crypto payroll as a valid operating model
- employees have or can create `MetaMask` or compatible `EVM` wallets
- fiat conversion happens outside Orgx
- attendance validation requires face match and geofence by default
- a supported token allowlist will be used in MVP, with stablecoin-first policy recommended for predictable salary value

## 8. Core User Journeys

### Journey A: Company Setup

1. company admin creates or is provisioned into the company workspace
2. company admin configures locations and geofences
3. company admin adds managers, HR users, and employees
4. company admin defines payroll settings and approved payout token policy

### Journey B: Employee Onboarding

1. employee receives access
2. employee completes profile
3. employee enrolls face reference data
4. employee registers payout wallet address
5. system stores onboarding status and readiness for attendance and payroll

### Journey C: Attendance Capture

1. employee opens the mobile-first web app
2. employee taps check-in or check-out
3. system captures face and GPS data
4. backend validates face match and geofence
5. system accepts or rejects the attempt
6. system stores the result and creates audit records

### Journey D: Payroll Review And Approval

1. payroll period is opened
2. approved attendance and recorded leave inputs are compiled
3. manager reviews and approves
4. HR reviews and approves
5. payout batch is prepared only after required approvals are complete

### Journey E: Crypto Payout

1. Orgx creates a payout instruction for an approved payroll item
2. Orgx submits an on-chain transfer to the employee wallet
3. transaction hash and final status are tracked
4. employee sees payout state in the product
5. audit records capture initiation, success, failure, or retry

## 9. Functional Requirements

### FR-1: Authentication And Roles

- the system must support authenticated access for company admin, HR, manager, and employee roles
- the system must scope data by company
- the system must prevent unauthorized approval or payout actions

### FR-2: Company And Location Setup

- company admins must be able to define offices or sites
- each location must support geofence metadata
- employees must be associated with a company and, where relevant, a location

### FR-3: Employee Onboarding

- the system must store employee identity and employment metadata
- the system must track whether face enrollment is complete
- the system must store employee payout wallet address and wallet verification status

### FR-4: Attendance Verification

- employees must be able to submit check-in and check-out attempts
- each attempt must include required verification inputs
- the backend must evaluate face-match and geofence results
- rejected attempts must return a reason code and user-facing message

### FR-5: Attendance Records

- accepted attendance attempts must become canonical attendance events
- the system must preserve rejected attempts for traceability
- managers and HR must be able to review attendance data for their scope

### FR-6: Leave Inputs

- the system must support the minimum leave input required for payroll calculation
- HR or admin users must be able to create or adjust leave records for the payroll period
- leave inputs must be attributable and auditable

### FR-7: Payroll Calculation

- the system must create payroll periods
- payroll computation must use approved attendance, leave inputs, and payroll settings
- the system must produce payout-ready records with status tracking

### FR-8: Approvals

- manager approval must be required before HR approval
- HR approval must be required before payout execution
- all approval decisions must be attributable to a specific user and timestamp

### FR-9: Crypto Payout

- the system must support payout to an employee `EVM` wallet
- the system must record token, chain, wallet address, amount, and transaction reference
- the system must track pending, confirmed, failed, and retried payout states

### FR-10: Audit Logging

- every critical action must write an immutable audit record
- audit records must be hash-chained
- the system must expose audit history to authorized reviewers

## 10. Business Rules

- attendance is accepted only when all required validations pass
- employees can retry rejected attendance submissions
- attendance and approval data must remain traceable after updates
- payroll cannot move to payout without manager and HR approval
- payout goes only to the wallet currently approved for the employee
- fiat conversion is outside the Orgx MVP scope
- supported payout assets come from an approved token allowlist

## 11. Acceptance Criteria

### Attendance

- an employee can check in from a valid location and receive an accepted result
- an employee checking in outside the geofence receives a rejected result with a visible reason
- an employee failing face verification receives a rejected result with a visible reason
- every attendance attempt produces an audit event

### Onboarding

- a company admin can create employees and assign reporting hierarchy
- an employee can register a wallet address
- a wallet cannot be used for payout until it is marked valid in the system

### Approvals

- a manager can approve only data belonging to their scope
- HR cannot release payout until manager approval exists
- an approval action is visible in the audit trail with actor and timestamp

### Payroll

- the system can create a payroll period and generate payout items from approved inputs
- a payroll item cannot be paid twice
- payout status is visible to HR and the employee

### Leave Inputs

- HR or admin can create a leave record that affects payroll inputs
- leave inputs are included in payroll calculation context
- leave changes are visible in the audit trail

### Audit

- audit records include actor, action type, target entity, timestamp, payload summary, `prev_hash`, and `record_hash`
- changes to historical audit data would be detectable through hash verification

## 12. Success Metrics

- percentage of attendance attempts successfully verified
- time from payroll close to final approval
- payout success rate
- number of disputed attendance or payout records
- number of manual interventions required per payroll cycle

## 13. Privacy, Data Handling, And Compliance Notes

- biometric and GPS data should follow data minimization and retention rules defined by the operating company
- face verification provider data handling must be explicitly documented before rollout
- wallet payout, token policy, and payroll operations must be reviewed against the target operating region's compliance requirements
- Orgx should avoid acting as an exchange in the MVP; fiat conversion remains outside the product

## 14. Risks And Verification Items

- confirm the payroll and compliance model for crypto compensation in the target operating region
- confirm the supported wallet onboarding and recovery support expectations
- confirm the initial chain and token allowlist
- confirm the face-match provider quality and latency in real conditions
- confirm employee usability on mobile web before building native apps

## 15. Recommended MVP Defaults

To keep the build focused, the first implementation should assume:

- one pilot company
- one `EVM` chain for payout
- one or a small approved set of payout tokens
- mobile-first web rather than native mobile
- manual or admin-assisted wallet verification in early rollout

## 16. Exit Criteria For MVP

The MVP is successful when a pilot company can:

1. onboard employees and managers
2. register employee wallets
3. capture verified attendance
4. review and approve payroll
5. send crypto payout to employee wallets
6. inspect the full audit trail for key actions
