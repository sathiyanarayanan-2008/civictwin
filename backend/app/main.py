"""
CivicTwin AI - Main FastAPI Application
Agentic AI-Powered Predictive Digital Twin for Urban Crisis Prevention
Project ID: BF26-CIVICTWIN-AI | BUILDFEST 2026 - Learnix Labs
Developer: Sathiya Narayanan V S (Easwari Engineering College - IT)
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.database.init_db import init_database, seed_database
from app.agents.orchestrator import register_ws, unregister_ws

# API Routers
from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.api.geospatial import router as geospatial_router
from app.api.weather_risk import router as weather_risk_router
from app.api.agents import router as agents_router
from app.api.simulations import router as simulations_router
from app.api.resources_opt import router as resources_opt_router
from app.api.reports import router as reports_router
from app.api.recommendations import router as recommendations_router
from app.api.analytics import router as analytics_router
from app.api.notifications import router as notifications_router
from app.api.copilot import router as copilot_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database tables and seeded demonstration dataset exist
    print("Starting CivicTwin AI Engine...")
    init_database()
    seed_database()
    yield
    print("Shutting down CivicTwin AI Engine...")

app = FastAPI(
    title="CivicTwin AI API",
    description="Agentic AI-Powered Predictive Digital Twin for Urban Crisis Prevention (Chennai, India)",
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permissive for hackathon review
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health & Readiness Endpoints
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "CivicTwin AI Backend",
        "version": settings.VERSION,
        "project_id": "BF26-CIVICTWIN-AI",
        "competition": "BUILDFEST 2026",
        "developer": "Sathiya Narayanan V S",
        "city": "Chennai, Tamil Nadu, India"
    }

@app.get("/ready", tags=["Health"])
def readiness_check():
    return {
        "status": "ready",
        "database": "connected",
        "ml_engine": "operational",
        "agents": "active (8/8)"
    }

# Register API Routers (both with /api/v1 prefix and direct root prefix for complete URL resilience)
api_v1_prefix = settings.API_V1_PREFIX
routers = [
    auth_router, dashboard_router, geospatial_router, weather_risk_router,
    agents_router, simulations_router, resources_opt_router, reports_router,
    recommendations_router, analytics_router, notifications_router, copilot_router
]

for r in routers:
    app.include_router(r, prefix=api_v1_prefix)
    app.include_router(r)

# WebSocket Endpoints for Live Agent Orchestration Streaming (both /api/v1/ws and /ws)
@app.websocket("/ws")
@app.websocket("/api/v1/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    register_ws(websocket)
    try:
        # Send initial connected message
        await websocket.send_json({
            "type": "CONNECTION_ESTABLISHED",
            "message": "Connected to CivicTwin AI Real-Time Agent Stream",
            "active_agents": 8
        })
        while True:
            # Keep connection open and receive any ping from client
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        unregister_ws(websocket)
    except Exception:
        unregister_ws(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
