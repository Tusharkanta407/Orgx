export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            orgx.com public site scaffold
          </span>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Public SaaS onboarding for workforce verification and crypto payroll.
            </h1>
            <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
              This route represents `orgx.com`. Companies will discover Orgx,
              review plans, purchase a package, and get provisioned into a
              tenant workspace such as `cgu.orgx.com`.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Public site",
              items: [
                "Pricing and packages",
                "Customer onboarding",
                "Plan purchase flow",
                "Tenant provisioning",
              ],
            },
            {
              title: "Tenant workspace",
              items: [
                "Employee attendance",
                "Remote work proofs",
                "Manager and HR review",
                "Wallet payouts",
              ],
            },
            {
              title: "Core backend",
              items: [
                "FastAPI APIs",
                "Supabase Postgres",
                "Supabase Storage",
                "Firebase Auth",
              ],
            },
            {
              title: "Blockchain and proof",
              items: [
                "Audit hash chain",
                "Payout instruction flow",
                "EVM RPC provider",
                "Treasury wallet",
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
            <li>1. Create the Supabase and Firebase projects and copy credentials into `.env`.</li>
            <li>2. Implement plan and tenant provisioning APIs in FastAPI.</li>
            <li>3. Add host-aware tenant resolution for `{`tenant`}.orgx.com`.</li>
            <li>4. Build onboarding, storage-backed work-proof, and wallet flows.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
