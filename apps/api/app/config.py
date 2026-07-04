from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Orgx API"
    app_env: str = "development"
    api_host: str = "127.0.0.1"
    api_port: int = 8000
    root_domain: str = "orgx.localhost"
    database_url: str = (
        "postgresql+psycopg://postgres:postgres@db.your-project-id.supabase.co:5432/postgres"
    )
    jwt_secret_key: str = "replace-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    supabase_project_id: str = "your-project-id"
    supabase_db_host: str = "db.your-project-id.supabase.co"
    supabase_storage_face_bucket: str = "face-media"
    supabase_storage_proof_bucket: str = "work-proofs"
    firebase_project_id: str = "your-firebase-project-id"
    firebase_client_email: str = "your-service-account@your-project-id.iam.gserviceaccount.com"
    firebase_private_key: str = "replace-me"
    face_provider: str = "mock"
    evm_chain_id: int = 80002
    evm_rpc_url: str = "https://polygon-amoy.g.alchemy.com/v2/your-key"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
