export type TenantSurface = "employee" | "admin";

export type TenantContext = {
  slug: string;
  surface: TenantSurface;
};

/**
 * Resolve tenant from host patterns:
 * - cgu.orgx.com -> employee workspace
 * - cgu.admin.orgx.com -> tenant admin dashboard
 */
export function resolveTenantFromHost(
  host: string,
  rootDomain: string,
): TenantContext | null {
  if (!host || !rootDomain) {
    return null;
  }

  const normalizedHost = host.toLowerCase().split(":")[0];
  const normalizedRoot = rootDomain.toLowerCase();

  if (
    normalizedHost === normalizedRoot ||
    normalizedHost === `www.${normalizedRoot}`
  ) {
    return null;
  }

  const adminSuffix = `.admin.${normalizedRoot}`;
  if (normalizedHost.endsWith(adminSuffix)) {
    const slug = normalizedHost.slice(0, -adminSuffix.length);
    if (slug && !slug.includes(".")) {
      return { slug, surface: "admin" };
    }
    return null;
  }

  if (normalizedHost.endsWith(`.${normalizedRoot}`)) {
    const slug = normalizedHost.slice(0, -(`.${normalizedRoot}`).length);
    if (slug && !slug.includes(".")) {
      return { slug, surface: "employee" };
    }
  }

  return null;
}
