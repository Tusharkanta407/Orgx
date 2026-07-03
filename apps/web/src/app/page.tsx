export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Orgx MVP Scaffold
          </span>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Verified attendance, approvals, audit trail, and crypto payroll.
            </h1>
            <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
              This frontend is scaffolded for the Orgx MVP. The next build steps
              are employee onboarding, consent capture, wallet registration,
              attendance flows, approval dashboards, and payout visibility.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Employee app",
              items: [
                "Consent capture",
                "Face enrollment",
                "Wallet registration",
                "Check-in / check-out",
              ],
            },
            {
              title: "Manager & HR",
              items: [
                "Attendance review",
                "Payroll approvals",
                "Exception handling",
                "Audit visibility",
              ],
            },
            {
              title: "Backend links",
              items: [
                "FastAPI health route",
                "Supabase Postgres",
                "Audit hash chain",
                "Payout instruction flow",
              ],
            },
            {
              title: "External services",
              items: [
                "Supabase",
                "EVM RPC provider",
                "Treasury wallet",
                "Mock face provider first",
              ],
            },
          ].map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold">What to configure next</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            <li>1. Create a Supabase project and copy its credentials into `.env`.</li>
            <li>2. Install workspace dependencies once disk space is available again.</li>
            <li>3. Add the first SQLAlchemy models and Alembic migration.</li>
            <li>4. Implement auth, company setup, and employee onboarding flows.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
