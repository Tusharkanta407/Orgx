# Orgx MVP Data Model

## 1. Modeling Principles

The MVP should be built for one pilot company, but every business entity should remain tenant-ready.

Core principles:

- every business record includes `company_id`
- operational state and audit state are stored separately
- historical business events should be traceable rather than overwritten without context
- payout records must preserve on-chain references
- wallet changes must be auditable

## 2. Core Entities

### Company

Represents a client company using Orgx.

Suggested fields:

- `id`
- `name`
- `status`
- `default_chain_id`
- `approved_token_policy`
- `created_at`
- `updated_at`

### User

Represents an authenticated actor in the system.

Suggested fields:

- `id`
- `company_id`
- `email`
- `password_hash` or auth provider reference
- `role`
- `status`
- `created_at`
- `updated_at`

### Employee

Represents the workforce record associated with a user or a managed employee profile.

Suggested fields:

- `id`
- `company_id`
- `user_id` nullable for invited or pre-created employees
- `employee_code`
- `full_name`
- `manager_employee_id`
- `employment_status`
- `primary_location_id`
- `face_enrollment_status`
- `wallet_status`
- `created_at`
- `updated_at`

### Wallet

Stores payout wallet information for an employee.

Suggested fields:

- `id`
- `company_id`
- `employee_id`
- `chain_id`
- `wallet_address`
- `wallet_type`
- `verification_status`
- `is_active`
- `verified_at`
- `created_at`
- `updated_at`

For MVP simplicity, one active payout wallet per employee is recommended.

### Location

Represents a physical office or site.

Suggested fields:

- `id`
- `company_id`
- `name`
- `address`
- `latitude`
- `longitude`
- `radius_meters`
- `status`
- `created_at`
- `updated_at`

### AttendanceAttempt

Stores every submitted attendance attempt, including rejected ones.

Suggested fields:

- `id`
- `company_id`
- `employee_id`
- `attempt_type`
- `captured_at`
- `latitude`
- `longitude`
- `face_provider_ref`
- `face_result`
- `geofence_result`
- `final_status`
- `rejection_reason_code`
- `created_at`

### AttendanceEvent

Represents a canonical accepted check-in or check-out event.

Suggested fields:

- `id`
- `company_id`
- `employee_id`
- `attendance_attempt_id`
- `event_type`
- `event_time`
- `location_id`
- `created_at`

### LeaveRecord

Represents the minimum leave input required for payroll.

Suggested fields:

- `id`
- `company_id`
- `employee_id`
- `leave_type`
- `start_date`
- `end_date`
- `duration_units`
- `approval_status`
- `notes`
- `created_by`
- `created_at`
- `updated_at`

### PayrollPeriod

Defines the time window for payroll generation.

Suggested fields:

- `id`
- `company_id`
- `name`
- `period_start`
- `period_end`
- `status`
- `created_at`
- `updated_at`

### PayrollRun

Represents a payroll computation instance for a period.

Suggested fields:

- `id`
- `company_id`
- `payroll_period_id`
- `run_status`
- `currency_reference`
- `payout_token`
- `payout_chain_id`
- `created_by`
- `created_at`
- `updated_at`

### PayrollItem

Represents the computed payout for one employee in a payroll run.

Suggested fields:

- `id`
- `company_id`
- `payroll_run_id`
- `employee_id`
- `gross_amount`
- `deduction_amount`
- `net_amount`
- `token_amount`
- `wallet_id`
- `status`
- `created_at`
- `updated_at`

The model should allow both a reference payroll amount and the actual token amount used for disbursement.

### ApprovalAction

Records manager and HR decisions.

Suggested fields:

- `id`
- `company_id`
- `target_type`
- `target_id`
- `approval_stage`
- `action`
- `actor_user_id`
- `comment`
- `acted_at`

### PayoutInstruction

Represents the instruction to disburse a payroll item.

Suggested fields:

- `id`
- `company_id`
- `payroll_item_id`
- `employee_id`
- `wallet_id`
- `chain_id`
- `token_address`
- `token_symbol`
- `token_amount`
- `submission_status`
- `idempotency_key`
- `created_at`
- `updated_at`

### BlockchainTransaction

Tracks actual on-chain activity tied to a payout instruction.

Suggested fields:

- `id`
- `company_id`
- `payout_instruction_id`
- `tx_hash`
- `from_address`
- `to_address`
- `chain_id`
- `gas_fee`
- `confirmation_status`
- `submitted_at`
- `confirmed_at`

### AuditLog

Stores immutable trace records for critical events.

Suggested fields:

- `id`
- `company_id`
- `actor_user_id`
- `action_type`
- `target_type`
- `target_id`
- `event_timestamp`
- `payload_json`
- `prev_hash`
- `record_hash`

## 3. Relationship Notes

- one company has many users, employees, locations, payroll periods, payroll runs, and audit records
- one employee has many attendance attempts and attendance events
- one employee can have many leave records
- one employee should have one active payout wallet in the MVP
- one payroll period can have many payroll runs if recalculation is needed
- one payroll run has many payroll items
- one payroll item should map to at most one successful payout instruction

## 4. Tenant-Ready Requirements

To stay future-proof:

- include `company_id` on all business tables
- use compound indexes that include `company_id` where relevant
- ensure every read and write path is company-scoped at the service layer
- avoid global mutable configuration tables unless they are clearly system-level

## 5. Audit Hash-Chain Design

Each audit record should be written in sequence with:

- a normalized payload summary
- `prev_hash` from the prior audit record in sequence
- `record_hash` computed from the current record contents plus `prev_hash`

Suggested hash input shape:

```text
company_id | action_type | target_type | target_id | actor_user_id | event_timestamp | payload_json | prev_hash
```

This design provides tamper evidence without forcing every operational record to live on-chain.

## 6. Audit Events That Must Exist In MVP

- employee created
- wallet registered
- wallet changed
- attendance accepted
- attendance rejected
- manager approved payroll
- HR approved payroll
- payout instruction created
- blockchain transaction submitted
- blockchain transaction confirmed or failed

## 7. Wallet Modeling Notes

Wallet data should be treated carefully because payout depends on it.

Recommended MVP behavior:

- store the wallet address in normalized checksum-friendly form
- track verification state separately from mere registration
- preserve history if a wallet changes
- prevent payout to inactive or unverified wallets

## 8. Payout And Value Modeling Notes

The system should preserve both:

- the payroll value reference used for business review
- the token amount actually transferred on-chain

This matters because the employee may later convert the payout to rupees, dollars, or another fiat currency externally. Orgx should record enough information to explain what value was approved and what token amount was sent.

## 9. Suggested Initial Status Enums

### AttendanceAttempt.final_status

- `accepted`
- `rejected`

### PayrollPeriod.status

- `draft`
- `open`
- `closed`
- `approved`

### PayrollRun.run_status

- `draft`
- `calculated`
- `manager_approved`
- `hr_approved`
- `payout_in_progress`
- `completed`
- `failed`

### Wallet.verification_status

- `pending`
- `verified`
- `rejected`

### PayoutInstruction.submission_status

- `pending`
- `submitted`
- `confirmed`
- `failed`
- `cancelled`

## 10. Items To Verify Before Implementation

- final choice of first `EVM` chain
- final token allowlist and whether stablecoins are mandatory
- wallet verification method for the pilot
- whether payout is direct wallet transfer or contract-based batch payout
