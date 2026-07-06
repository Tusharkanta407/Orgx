/**
 * Resolve employee tenant subdomain from host:
 * - cgu.orgx.com -> "cgu"
 * - orgx.com / www.orgx.com -> null (public site + org dashboard)
 */
export function resolveTenantFromHost(
  host: string,
  rootDomain: string,
): string | null {
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

  if (normalizedHost.endsWith(`.${normalizedRoot}`)) {
    const slug = normalizedHost.slice(0, -(`.${normalizedRoot}`).length);
    if (slug && !slug.includes(".")) {
      return slug;
    }
  }

  return null;
}
