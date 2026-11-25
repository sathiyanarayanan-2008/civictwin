"""
CivicTwin AI - Multi-Agent AI Control Centre Endpoints
Triggers 8-agent workflows, streams agent execution telemetry, and fetches history.
"""

from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.agents.orchestrator import orchestrator
from app.models.entities import AgentRun, AgentEvent
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/agents", tags=["AI Agent Control Centre"])

class RunWorkflowRequest(BaseModel):
    scenario_code: Optional[str] = "SCENARIO_A"
    rainfall_intensity_mmh: Optional[float] = 85.0
    rainfall_duration_h: Optional[float] = 4.0
    drainage_efficiency: Optional[float] = 0.60
    closed_roads: Optional[List[int]] = []

@router.post("/run")
async def trigger_agent_workflow(req: RunWorkflowRequest):
    """Execute live 8-agent workflow and broadcast real-time events over WebSocket."""
    result = await orchestrator.run_full_analysis(
        scenario_code=req.scenario_code,
        rainfall_intensity_mmh=req.rainfall_intensity_mmh,
        rainfall_duration_h=req.rainfall_duration_h,
        drainage_efficiency=req.drainage_efficiency,
        closed_roads=req.closed_roads
    )
    return result

@router.get("/runs")
def get_recent_runs(limit: int = 10, db: Session = Depends(get_db)):
    runs = db.query(AgentRun).order_by(AgentRun.id.desc()).limit(limit).all()
    return runs

@router.get("/runs/{run_id}/events")
def get_run_events(run_id: int, db: Session = Depends(get_db)):
    events = db.query(AgentEvent).filter(AgentEvent.agent_run_id == run_id).all()
    return events
