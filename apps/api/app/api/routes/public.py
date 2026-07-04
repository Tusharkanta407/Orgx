from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/public", tags=["public"])


@router.get("/plans")
def list_public_plans() -> dict[str, list[dict[str, str]]]:
    return {
        "plans": [
            {
                "id": "starter",
                "name": "Starter",
                "description": "For early teams onboarding one tenant workspace.",
            },
            {
                "id": "growth",
                "name": "Growth",
                "description": "For growing companies with workforce verification and crypto payroll.",
            },
        ]
    }
