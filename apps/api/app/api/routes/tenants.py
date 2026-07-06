from fastapi import APIRouter, Query

from app.config import settings

router = APIRouter(prefix="/api/v1/public/tenants", tags=["tenants"])


@router.get("/resolve")
def resolve_tenant(host: str = Query(...)) -> dict[str, str | None]:
    root_domain = settings.root_domain
    tenant_slug = None
    surface = None
    normalized_host = host.lower().split(":")[0]

    if normalized_host in {root_domain, f"www.{root_domain}"}:
        pass
    elif normalized_host.endswith(f".admin.{root_domain}"):
        prefix = f".admin.{root_domain}"
        candidate = normalized_host[: -len(prefix)]
        if candidate and "." not in candidate:
            tenant_slug = candidate
            surface = "admin"
    elif normalized_host.endswith(f".{root_domain}"):
        candidate = normalized_host[: -(len(root_domain) + 1)]
        if candidate and "." not in candidate:
            tenant_slug = candidate
            surface = "employee"

    return {
        "host": normalized_host,
        "root_domain": root_domain,
        "tenant_slug": tenant_slug,
        "surface": surface,
    }
