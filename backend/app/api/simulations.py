"""
CivicTwin AI - Crisis Simulation Lab & Prevention Comparator Endpoints
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.simulation.cascade_engine import cascade_engine
from app.simulation.comparator import compare_scenarios
from app.models.entities import SimulationScenario
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/simulations", tags=["Crisis Simulation Lab"])

class SimulateRequest(BaseModel):
    rainfall_intensity_mmh: float = 85.0
    rainfall_duration_h: float = 4.0
    drainage_efficiency: float = 0.60
    closed_roads: Optional[List[int]] = []
    disabled_facilities: Optional[List[int]] = []

@router.get("/scenarios")
def get_seeded_scenarios(db: Session = Depends(get_db)):
    """Fetch seeded Scenarios A, B, and C."""
    return db.query(SimulationScenario).all()

@router.post("/run")
def run_simulation(req: SimulateRequest):
    """Execute bounded cascade failure propagation on Chennai dependency graph."""
    return cascade_engine.simulate_cascade(
        rainfall_intensity_mmh=req.rainfall_intensity_mmh,
        rainfall_duration_h=req.rainfall_duration_h,
        drainage_efficiency=req.drainage_efficiency,
        initial_closed_roads=req.closed_roads or [],
        disabled_facilities=req.disabled_facilities or []
    )

@router.get("/compare")
def get_prevention_comparison(
    rainfall: float = 95.0,
    duration: float = 4.0,
    baseline_drainage: float = 0.50,
    preventive_drainage: float = 0.85
):
    """
    Dedicated Prevention Impact Comparator:
    Side-by-side comparison of Scenario 1 (No Intervention) vs Scenario 2 (AI Preventive Plan).
    """
    return compare_scenarios(
        baseline_rainfall=rainfall,
        baseline_duration=duration,
        baseline_drainage_eff=baseline_drainage,
        intervention_drainage_eff=preventive_drainage
    )
