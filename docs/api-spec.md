# Orgx MVP API Spec

## 1. API Design Principles

- all business endpoints are company-scoped
- all privileged actions are authorized server side
- API responses should return explicit state transitions
- payout operations must be idempotent
- rejected attendance and payout failures must return structured reason codes

Base path suggestion:

```text
/api/v1
```

## 2. Authentication

### `POST /api/v1/auth/login`

Authenticate a user and return a session or token.

### `POST /api/v1/auth/logout`

Terminate the current session.

### `GET /api/v1/auth/me`

Return the current user, role, and company context.

## 3. Company And User Setup

### `GET /api/v1/company`

Return current company profile and configuration summary.

### `PATCH /api/v1/company`

Update company-level settings such as approved payout token policy and base currency.

### `GET /api/v1/users`

List users for the current company.

### `POST /api/v1/users`

Create a manager, HR user, or admin user.

## 4. Employees

### `GET /api/v1/employees`

List employees within the current company.

### `POST /api/v1/employees`

Create an employee record.

Request body should support:

- identity fields
- reporting manager linkage
- primary location
- employment status

### `GET /api/v1/employees/{employeeId}`

Return employee details, onboarding state, consent state, wallet state, and attendance summary.

### `PATCH /api/v1/employees/{employeeId}`

Update employee metadata.

## 5. Consent Management

### `GET /api/v1/employees/{employeeId}/consents`

List recorded consent events for the employee.

### `POST /api/v1/employees/{employeeId}/consents`

Record biometric or location consent for the employee.

Request body should support:

- `consent_type`
- `consent_version`
- `given_at`

## 6. Face Enrollment

### `POST /api/v1/employees/{employeeId}/face-enrollment`

Create or register face enrollment reference metadata.

This endpoint should reject the request unless required consent has already been recorded.

### `GET /api/v1/employees/{employeeId}/face-enrollment`

Return enrollment status and provider reference summary.

## 7. Wallet Management

### `POST /api/v1/employees/{employeeId}/wallets`

Register an employee payout wallet.

Request body should support:

- `chain_id`
- `wallet_address`
- `wallet_type`

### `GET /api/v1/employees/{employeeId}/wallets`

List wallet records for an employee.

### `PATCH /api/v1/employees/{employeeId}/wallets/{walletId}`

Update wallet metadata that does not bypass the approval flow.

### `POST /api/v1/employees/{employeeId}/wallets/{walletId}/request-verification`

Request wallet verification through the defined two-party approval process.

## 8. Locations And Geofences

### `GET /api/v1/locations`

List company locations.

### `POST /api/v1/locations`

Create a new office or site with geofence settings.

Request body should support:

- `name`
- `latitude`
- `longitude`
- `radius_meters`

### `PATCH /api/v1/locations/{locationId}`

Update location or geofence settings.

## 9. Attendance

### `POST /api/v1/attendance/check-in`

Submit a check-in attempt.

This endpoint should reject the request unless the required biometric and location consent is already recorded.

Request body should support:

- `employee_id`
- `captured_at`
- `latitude`
- `longitude`
- face-match payload or provider reference

Response should return:

- attempt id
- acceptance or rejection status
- rejection reason if failed
- canonical attendance event id if accepted

### `POST /api/v1/attendance/check-out`

Submit a check-out attempt.

This endpoint should reject the request unless the required biometric and location consent is already recorded.

### `GET /api/v1/attendance/attempts`

List attendance attempts with filters for employee, date, and status.

### `GET /api/v1/attendance/events`

List accepted attendance events.

### `GET /api/v1/attendance/events/{eventId}`

Return a single attendance event with validation summary.

### `POST /api/v1/attendance/events/{eventId}/verify`

Recompute and verify the linked audit-record hash chain for one attendance event.

## 10. Payroll

### `GET /api/v1/payroll/periods`

List payroll periods.

### `POST /api/v1/payroll/periods`

Create a payroll period.

### `POST /api/v1/payroll/periods/{periodId}/generate`

Generate a payroll run from approved inputs.

### `GET /api/v1/payroll/runs`

List payroll runs.

### `GET /api/v1/payroll/runs/{runId}`

Return payroll run summary and employee payout items.

### `GET /api/v1/payroll/runs/{runId}/items`

List payroll items for the run.

### `POST /api/v1/payroll/items/{itemId}/verify`

Recompute and verify the linked audit-record hash chain for one payroll item.

## 11. Leave Inputs

### `GET /api/v1/leave-records`

List leave records for the current company with filters by employee, period, and status.

### `POST /api/v1/leave-records`

Create a leave record used as payroll input.

### `PATCH /api/v1/leave-records/{leaveRecordId}`

Update a leave record before payroll finalization.

## 12. Approvals

### `POST /api/v1/payroll/runs/{runId}/approve/manager`

Submit manager approval for a payroll run or scoped portion of it.

### `POST /api/v1/payroll/runs/{runId}/approve/hr`

Submit final HR approval.

### `GET /api/v1/payroll/runs/{runId}/approvals`

Return approval timeline and actors.

### `POST /api/v1/wallets/{walletId}/approve`

Approve a pending wallet so it can become payout-eligible.

### `POST /api/v1/wallets/{walletId}/reject`

Reject a pending wallet verification request.

### `GET /api/v1/wallets/{walletId}/approvals`

Return the wallet approval history.

## 13. Payouts

### `POST /api/v1/payouts`

Create payout instructions for approved payroll items.

Request body should support:

- `payroll_run_id` or explicit payroll item ids

The service should create payout instructions only from payroll items that already store the approved wallet snapshot, payout token, chain, conversion rate, and token amount.

### `GET /api/v1/payouts`

List payout instructions and statuses.

### `GET /api/v1/payouts/{payoutId}`

Return payout instruction, immutable wallet snapshot, token, conversion details, retry lineage, and transaction status details.

### `POST /api/v1/payouts/{payoutId}/submit`

Submit or relay the on-chain payout transaction.

This endpoint must be idempotent.

### `POST /api/v1/payouts/{payoutId}/retry`

Retry a failed payout when allowed.

This endpoint should require explicit authorization and create an attributable retry record.

### `GET /api/v1/payouts/{payoutId}/transactions`

Return blockchain transaction history for the payout.

## 14. Audit

### `GET /api/v1/audit/events`

List audit events with filters by entity, actor, action type, date range, and company.

### `GET /api/v1/audit/events/{auditId}`

Return one audit event with hash-chain metadata.

### `POST /api/v1/audit/verify`

Run or trigger audit chain integrity verification for a selected record or range.

## 15. Dashboard Views

These may be composed in the frontend from multiple endpoints or served through dedicated summary APIs.

### `GET /api/v1/dashboard/employee`

Return employee summary including attendance history, payout status, and access to self-service record verification.

### `GET /api/v1/dashboard/manager`

Return manager summary including team attendance and approval tasks.

### `GET /api/v1/dashboard/hr`

Return HR summary including payroll, payout exceptions, and audit highlights.

## 16. Core Response Shapes

Recommended response conventions:

- `status`: machine-readable state
- `message`: user-facing summary when appropriate
- `reason_code`: present for failed validations or failed payouts
- `data`: canonical payload
- `meta`: pagination or processing metadata

## 17. Idempotency Requirements

These operations should require idempotency protection:

- payroll generation
- payout creation
- payout submission
- payout retry

Suggested mechanism:

- client-supplied or server-issued idempotency keys stored with request result

## 18. Webhook And Background Needs

The MVP should plan for:

- blockchain confirmation polling or webhook-style event ingestion
- payout status reconciliation job
- audit verification job

These do not need public API endpoints at first, but the system design should reserve space for them.
