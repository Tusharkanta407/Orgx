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

Update company-level settings such as approved payout token policy.

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

Return employee details, onboarding state, wallet state, and attendance summary.

### `PATCH /api/v1/employees/{employeeId}`

Update employee metadata.

## 5. Face Enrollment

### `POST /api/v1/employees/{employeeId}/face-enrollment`

Create or register face enrollment reference metadata.

### `GET /api/v1/employees/{employeeId}/face-enrollment`

Return enrollment status and provider reference summary.

## 6. Wallet Management

### `POST /api/v1/employees/{employeeId}/wallets`

Register an employee payout wallet.

Request body should support:

- `chain_id`
- `wallet_address`
- `wallet_type`

### `GET /api/v1/employees/{employeeId}/wallets`

List wallet records for an employee.

### `PATCH /api/v1/employees/{employeeId}/wallets/{walletId}`

Update wallet state such as verification or activation status.

### `POST /api/v1/employees/{employeeId}/wallets/{walletId}/verify`

Mark or validate wallet verification through the chosen verification process.

## 7. Locations And Geofences

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

## 8. Attendance

### `POST /api/v1/attendance/check-in`

Submit a check-in attempt.

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

### `GET /api/v1/attendance/attempts`

List attendance attempts with filters for employee, date, and status.

### `GET /api/v1/attendance/events`

List accepted attendance events.

### `GET /api/v1/attendance/events/{eventId}`

Return a single attendance event with validation summary.

## 9. Payroll

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

## 10. Leave Inputs

### `GET /api/v1/leave-records`

List leave records for the current company with filters by employee, period, and status.

### `POST /api/v1/leave-records`

Create a leave record used as payroll input.

### `PATCH /api/v1/leave-records/{leaveRecordId}`

Update a leave record before payroll finalization.

## 11. Approvals

### `POST /api/v1/payroll/runs/{runId}/approve/manager`

Submit manager approval for a payroll run or scoped portion of it.

### `POST /api/v1/payroll/runs/{runId}/approve/hr`

Submit final HR approval.

### `GET /api/v1/payroll/runs/{runId}/approvals`

Return approval timeline and actors.

## 12. Payouts

### `POST /api/v1/payouts`

Create payout instructions for approved payroll items.

Request body should support:

- `payroll_run_id` or explicit payroll item ids
- payout token
- chain id

### `GET /api/v1/payouts`

List payout instructions and statuses.

### `GET /api/v1/payouts/{payoutId}`

Return payout instruction, wallet, token, and transaction status details.

### `POST /api/v1/payouts/{payoutId}/submit`

Submit or relay the on-chain payout transaction.

This endpoint must be idempotent.

### `POST /api/v1/payouts/{payoutId}/retry`

Retry a failed payout when allowed.

### `GET /api/v1/payouts/{payoutId}/transactions`

Return blockchain transaction history for the payout.

## 13. Audit

### `GET /api/v1/audit/events`

List audit events with filters by entity, actor, action type, date range, and company.

### `GET /api/v1/audit/events/{auditId}`

Return one audit event with hash-chain metadata.

### `POST /api/v1/audit/verify`

Run or trigger audit chain integrity verification for a selected range.

## 14. Dashboard Views

These may be composed in the frontend from multiple endpoints or served through dedicated summary APIs.

### `GET /api/v1/dashboard/employee`

Return employee summary including attendance history and payout status.

### `GET /api/v1/dashboard/manager`

Return manager summary including team attendance and approval tasks.

### `GET /api/v1/dashboard/hr`

Return HR summary including payroll, payout exceptions, and audit highlights.

## 15. Core Response Shapes

Recommended response conventions:

- `status`: machine-readable state
- `message`: user-facing summary when appropriate
- `reason_code`: present for failed validations or failed payouts
- `data`: canonical payload
- `meta`: pagination or processing metadata

## 16. Idempotency Requirements

These operations should require idempotency protection:

- payroll generation
- payout creation
- payout submission
- payout retry

Suggested mechanism:

- client-supplied or server-issued idempotency keys stored with request result

## 17. Webhook And Background Needs

The MVP should plan for:

- blockchain confirmation polling or webhook-style event ingestion
- payout status reconciliation job
- audit verification job

These do not need public API endpoints at first, but the system design should reserve space for them.
