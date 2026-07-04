from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.public import router as public_router
from app.api.routes.tenants import router as tenant_router
from app.config import settings


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Orgx backend for attendance, approvals, payroll, audit, and wallet payouts.",
)

app.include_router(health_router)
app.include_router(public_router)
app.include_router(tenant_router)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": settings.app_name,
        "env": settings.app_env,
        "message": "Orgx API scaffold is ready.",
    }
