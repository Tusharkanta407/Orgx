export function resolveTenantFromHost(host: string, rootDomain: string) {
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
    return normalizedHost.slice(0, -(`.${normalizedRoot}`).length);
  }

  return null;
}
