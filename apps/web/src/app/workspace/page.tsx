export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-50">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <span className="rounded-full bg-blue-900/40 px-3 py-1 text-sm font-medium text-blue-200">
            Employee workspace
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">
            `{`tenant`}.orgx.com` — where employees work.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-300">
            Company admins manage the org from the dashboard on `orgx.com`
            after signup and payment. This subdomain is only for employees:
            attendance, remote work proofs, and payout visibility.
          </p>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold">Planned employee flow</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>• Firebase login with company email</li>
            <li>• Consent and face enrollment</li>
            <li>• Remote proof upload and daily task entry</li>
            <li>• Check-in / check-out and payout history</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
