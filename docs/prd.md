# Orgx MVP PRD

## 1. Product Summary

Orgx is a B2B SaaS platform for client companies that need plan-based onboarding, tenant workspaces, verified attendance, approval-based payroll, crypto salary disbursement, and a tamper-evident audit trail.

The MVP will support:

- a public `orgx.com` website for pricing, package purchase, and customer onboarding
- a tenant workspace such as `cgu.orgx.com` for employees, managers, HR, and company admins
- a backend that stores operational records in `Postgres`, stores work-proof media in managed storage, and executes approved payroll payouts to employee `MetaMask` or compatible `EVM` wallets

## 2. Problem Statement

Many companies still manage attendance and payroll with systems that are easy to dispute, easy to manipulate, or poorly connected across verification, approval, and payment.

Orgx solves this by combining:

- SaaS onboarding for client companies on `orgx.com`
- tenant workspaces for each customer under a subdomain
- attendance verification using tenant-configured policies such as face match, remote-work proofs, and optional location validation
- remote-work proof capture for distributed teams
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

### Customer Buyer / Billing Admin

Selects a package on `orgx.com`, creates the tenant, funds or configures the company wallet path, and starts company onboarding.

### Company Admin

Responsible for setting up the company, configuring locations, assigning reporting structure, defining payroll settings, and monitoring the tenant.

### Employee

Uses the tenant workspace to record consent for biometric and location data, enroll required identity data, register a wallet, check in, check out, submit daily work proofs when required, review attendance, and view payout status.

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
- demonstrate a reliable tenant-based attendance-to-payroll workflow with crypto settlement

### Product Goals

- capture verified attendance with visible pass or fail reasons
- support both public SaaS onboarding and tenant workspaces
- prevent payroll release without required approvals
- send salary to employee `EVM` wallets
- preserve an auditable trail of all critical actions
- let authorized users verify record integrity for attendance and payroll data

### Technical Goals

- keep the backend tenant-ready even for a single pilot company
- separate operational data from integration and chain-tracking concerns
- make payment execution pluggable enough to support more tokens or chains later
- make payroll value explainable in both its base-currency form and its final token payout amount
- support tenant routing and storage-backed work proofs without putting raw media on chain

## 6. Non-Goals For MVP

- native mobile apps
- unlimited token support
- advanced tax and country-specific payroll compliance automation
- built-in fiat off-ramp or exchange services
- leave approval workflows beyond the minimum needed as payroll input
- deep ERP or HRMS integrations

## 7. Product Assumptions

- customers sign up through `orgx.com` and receive tenant subdomains
- the pilot customer accepts crypto payroll as a valid operating model
- employees have or can create `MetaMask` or compatible `EVM` wallets
- fiat conversion happens outside Orgx
- employee authentication is handled through `Firebase Auth`, while Orgx manages tenant roles and permissions in its own backend
- attendance validation is policy-driven by tenant and can require face match, remote work-proof media, task submission, or a simpler on-site flow
- a supported token allowlist will be used in MVP, with stablecoin-first policy recommended for predictable salary value
- salary is defined in a fixed base currency, while token payout amount is derived from a captured conversion rate

## 8. Core User Journeys

### Journey A: Public SaaS Signup And Tenant Provisioning

1. a customer visits `orgx.com`
2. the customer reviews plans and submits company details
3. the customer purchases a package
4. Orgx provisions a tenant such as `cgu.orgx.com`
5. the customer receives admin access to the tenant workspace

### Journey B: Company Setup

1. company admin creates or is provisioned into the company workspace
2. company admin configures locations and geofences
3. company admin adds managers, HR users, and employees
4. company admin defines payroll settings, base currency, and approved payout token policy

### Journey C: Employee Onboarding

1. employee receives access
2. employee completes profile
3. employee reviews and records consent for biometric and location data collection
4. employee enrolls face reference data
5. employee registers payout wallet address
6. wallet enters a pending state and requires a two-party verification step before it becomes payout-eligible
7. system stores onboarding status and readiness for attendance and payroll

### Journey D: Remote Attendance Capture

1. employee opens the mobile-first web app
2. employee taps check-in or check-out
3. system captures face verification input
4. employee uploads work-environment proof and today's task or work-plan data when tenant policy requires it
5. backend validates the configured attendance policy
6. system accepts or rejects the attempt
7. system stores the result, media references, and audit records

### Journey E: On-Site Attendance Capture

1. employee opens the tenant workspace
2. employee taps check-in or check-out
3. system captures face verification input
4. backend validates the simpler on-site attendance policy
5. system accepts or rejects the attempt
6. system stores the result and creates audit records

### Journey F: Payroll Review And Approval

1. payroll period is opened
2. approved attendance and recorded leave inputs are compiled
3. manager reviews and approves
4. HR reviews and approves
5. payout batch is prepared only after required approvals are complete

### Journey G: Crypto Payout

1. Orgx marks an approved payroll item as payout-ready by snapshotting the wallet, conversion rate, and token amount used for settlement
2. Orgx creates a payout instruction from that snapshotted payroll item
3. Orgx submits an on-chain transfer to the employee wallet
4. transaction hash and final status are tracked
5. employee sees payout state in the product
6. audit records capture initiation, success, failure, or retry

### Journey H: Record Verification

1. employee, HR, or an auditor selects an attendance or payroll record
2. system recomputes the linked audit-record hash inputs for that record
3. system compares the recomputed values with the stored hash-chain data
4. a match confirms the record history has not been altered since it was written
5. a mismatch is surfaced as an integrity failure for investigation

## 9. Functional Requirements

### FR-1: Authentication And Roles

- the system must support authenticated access for customer buyer, company admin, HR, manager, and employee roles
- the system must support public-site onboarding and tenant-scoped workspaces
- the system must support `Firebase Auth` as the identity provider, while Orgx maintains tenant authorization and role assignment
- the system must scope data by company
- the system must prevent unauthorized approval or payout actions

### FR-2: Company And Location Setup

- the system must provision a tenant subdomain for each onboarded customer
- the system must support plan and package metadata for the customer account
- company admins must be able to define offices or sites
- each location must support geofence metadata
- employees must be associated with a company and, where relevant, a location

### FR-3: Employee Onboarding And Consent

- the system must store employee identity and employment metadata
- the system must record explicit employee consent for the data types required by the tenant attendance policy, with a timestamp and consent-policy version, before face enrollment or attendance capture proceeds
- the system must track whether face enrollment is complete
- the system must store employee payout wallet address and wallet verification status

### FR-4: Attendance Verification

- employees must be able to submit check-in and check-out attempts
- each attempt must include required verification inputs
- attendance capture must require the relevant consent already on record
- the backend must evaluate the configured tenant attendance policy
- remote attendance mode must support work-proof media and task submission
- location checks should be optional and policy-driven rather than mandatory for every tenant
- rejected attempts must return a reason code and user-facing message

### FR-5: Attendance Records

- accepted attendance attempts must become canonical attendance events
- the system must preserve rejected attempts for traceability
- managers and HR must be able to review attendance data for their scope
- authorized users must be able to verify the integrity of a specific attendance record
- media files referenced by attendance flows must live in managed storage, not on chain

### FR-6: Leave Inputs

- the system must support the minimum leave input required for payroll calculation
- HR or admin users must be able to create or adjust leave records for the payroll period
- leave inputs must be attributable and auditable

### FR-7: Payroll Calculation

- the system must create payroll periods
- payroll computation must use approved attendance, leave inputs, and payroll settings
- the system must record salary in a fixed base currency and produce payout-ready records with status tracking
- when a payroll item becomes payout-ready, the system must record the approved wallet reference, the conversion rate, the rate source, the capture timestamp, and the resulting token amount

### FR-8: Approvals

- manager approval must be required before HR approval
- HR approval must be required before payout execution
- wallet activation must require an equivalent two-party approval before a wallet becomes payout-eligible
- all approval decisions must be attributable to a specific user and timestamp

### FR-9: Crypto Payout

- the system must support payout to an employee `EVM` wallet
- the system must record token, chain, wallet address snapshot, amount, conversion rate, and transaction reference
- the system must track pending, confirmed, failed, and cancelled payout states, with retries represented as linked payout instructions
- the system must guarantee that a given approved payroll item can never be paid more than once
- retry of a failed payout must be an explicit, attributable action that creates its own audit record
- the system must keep blockchain usage limited to value movement and proof references rather than storing raw media or full attendance objects

### FR-10: Audit Logging And Verification

- every critical action must write an immutable audit record
- audit records must be hash-chained
- the system must expose audit history to authorized reviewers
- the system must provide a verification function that recomputes and compares hashes to detect tampering for attendance and payroll records

## 10. Business Rules

- attendance is accepted only when all required validations pass
- employees can retry rejected attendance submissions
- attendance and approval data must remain traceable after updates
- each customer operates inside its own tenant workspace and subdomain
- payroll cannot move to payout without manager and HR approval
- payout goes only to the approved wallet snapshotted for that specific payroll item
- wallet changes require the same approval model before a new wallet can become payout-eligible
- fiat conversion is outside the Orgx MVP scope
- supported payout assets come from an approved token allowlist
- salary value must be traceable from approved base-currency amount to final token payout amount
- raw photos and work-proof media must remain in storage, with only proofs or value events referenced on chain when needed

## 11. Acceptance Criteria

### Attendance

- an employee can check in from a valid location and receive an accepted result
- an employee checking in outside the geofence receives a rejected result with a visible reason
- an employee failing face verification receives a rejected result with a visible reason
- every attendance attempt produces an audit event
- an accepted attendance record can be re-verified against its hash-chain data
- a remote-mode employee can submit work-proof media and task details as part of attendance capture

### Onboarding

- a customer can create a tenant through the public SaaS flow
- a company admin can create employees and assign reporting hierarchy
- an employee cannot proceed to face enrollment without a recorded consent event
- an employee can register a wallet address
- a wallet cannot be used for payout until it passes the two-party wallet approval flow
- an employee cannot submit attendance capture without the consent required by that tenant's attendance policy on record

### Approvals

- a manager can approve only data belonging to their scope
- HR cannot release payout until manager approval exists
- an approval action is visible in the audit trail with actor and timestamp

### Payroll

- the system can create a payroll period and generate payout items from approved inputs
- a payroll item cannot be paid twice
- payout status is visible to HR and the employee
- each payroll item preserves both the base-currency amount and the conversion details used to determine token payout

### Leave Inputs

- HR or admin can create a leave record that affects payroll inputs
- leave inputs are included in payroll calculation context
- leave changes are visible in the audit trail

### Audit

- audit records include actor, action type, target entity, timestamp, payload summary, `prev_hash`, and `record_hash`
- changes to historical audit data would be detectable through hash verification
- authorized users can trigger verification for the audit-record history of specific attendance or payroll records

## 12. Success Metrics

- percentage of attendance attempts successfully verified
- time from payroll close to final approval
- payout success rate
- number of disputed attendance or payout records
- number of manual interventions required per payroll cycle

## 13. Privacy, Data Handling, And Compliance Notes

- biometric and GPS data should follow data minimization and retention rules defined by the operating company
- face verification provider data handling must be explicitly documented before rollout
- storage retention and access rules for work-proof photos must be explicitly documented before rollout
- wallet payout, token policy, and payroll operations must be reviewed against the target operating region's compliance requirements
- Orgx should avoid acting as an exchange in the MVP; fiat conversion remains outside the product
- biometric consent history and retention behavior should be explicitly defined for offboarded employees

## 14. Risks And Verification Items

- confirm the payroll and compliance model for crypto compensation in the target operating region
- confirm the supported wallet onboarding and recovery support expectations
- confirm the initial chain and token allowlist
- confirm the Firebase Auth tenant and company-email setup approach
- confirm the storage policy for work-proof photos and task attachments
- confirm the face-match provider quality and latency in real conditions
- confirm employee usability on mobile web before building native apps

## 15. Recommended MVP Defaults

To keep the build focused, the first implementation should assume:

- one pilot company
- one `EVM` chain for payout
- one or a small approved set of payout tokens
- mobile-first web rather than native mobile
- manual or admin-assisted two-party wallet verification in early rollout
- one public `orgx.com` flow plus tenant subdomains for the pilot rollout

## 16. Exit Criteria For MVP

The MVP is successful when a pilot company can:

1. onboard employees and managers
2. provision a working tenant subdomain
3. register employee wallets
4. capture verified attendance
5. review and approve payroll
6. send crypto payout to employee wallets
7. inspect the full audit trail for key actions
