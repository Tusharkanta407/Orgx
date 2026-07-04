import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { resolveTenantFromHost } from "@/lib/tenant";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "";
  const host = request.headers.get("host") ?? "";
  const tenant = resolveTenantFromHost(host, rootDomain);

  if (tenant) {
    requestHeaders.set("x-orgx-tenant", tenant);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
