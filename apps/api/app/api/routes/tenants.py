from fastapi import APIRouter, Query

from app.config import settings

router = APIRouter(prefix="/api/v1/public/tenants", tags=["tenants"])


@router.get("/resolve")
def resolve_tenant(host: str = Query(...)) -> dict[str, str | None]:
    root_domain = settings.root_domain
    tenant_slug = None
    normalized_host = host.lower().split(":")[0]

    if normalized_host in {root_domain, f"www.{root_domain}"}:
        tenant_slug = None
    elif normalized_host.endswith(f".{root_domain}"):
        tenant_slug = normalized_host[: -(len(root_domain) + 1)]

    return {
        "host": normalized_host,
        "root_domain": root_domain,
        "tenant_slug": tenant_slug,
    }
