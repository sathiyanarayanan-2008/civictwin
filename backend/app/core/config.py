from pydantic_settings import BaseSettings
from typing import List
import os

_base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
_db_path = os.path.join(_base_dir, "civictwin.db")

_raw_db_url = os.getenv("DATABASE_URL", f"sqlite:///{_db_path}")
if _raw_db_url.startswith("postgres://"):
    _raw_db_url = _raw_db_url.replace("postgres://", "postgresql://", 1)

class Settings(BaseSettings):
    PROJECT_NAME: str = "CivicTwin AI"
    PROJECT_ID: str = "BF26-CIVICTWIN-AI"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    API_V1_PREFIX: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "civictwin-hackathon-2026-super-secret-key-buildfest-secure")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]
    
    # Database (Supports PostgreSQL or local SQLite fallback)
    DATABASE_URL: str = _raw_db_url
    
    # Weather
    OPEN_METEO_API_URL: str = "https://api.open-meteo.com/v1/forecast"
    
    # Demonstration Location
    DEFAULT_CITY: str = "Chennai"
    DEFAULT_LATITUDE: float = 13.0827
    DEFAULT_LONGITUDE: float = 80.2707
    
    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
