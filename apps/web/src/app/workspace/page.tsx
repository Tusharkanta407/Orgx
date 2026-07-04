export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-50">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <span className="rounded-full bg-blue-900/40 px-3 py-1 text-sm font-medium text-blue-200">
            Tenant workspace scaffold
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">
            `{`tenant`}.orgx.com` is where customer teams actually work.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-zinc-300">
            This route is a placeholder for the future tenant workspace. It
            will host employee attendance, remote work-proof flows, manager and
            HR dashboards, wallet registration, payout visibility, and tenant
            administration.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Employee workspace</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>• Firebase login with company email</li>
              <li>• Consent and face enrollment</li>
              <li>• Remote proof upload and daily task entry</li>
              <li>• Check-in / check-out and payout history</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Admin and HR workspace</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>• Employee onboarding</li>
              <li>• Attendance review and exceptions</li>
              <li>• Payroll approval and payout monitoring</li>
              <li>• Audit and proof verification</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
