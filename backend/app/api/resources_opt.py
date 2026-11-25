"""
CivicTwin AI - Emergency Resources & Optimization API Endpoints
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import EmergencyResource
from app.optimization.resource_optimizer import resource_optimizer
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(tags=["Emergency Resources & Optimization"])

class OptimizeRequest(BaseModel):
    closed_roads: Optional[List[int]] = []
    available_ambulances: int = 18
    available_rescue_boats: int = 10
    available_pumps: int = 6
    priority_zone: Optional[str] = None

@router.get("/resources")
def get_resource_inventory(db: Session = Depends(get_db)):
    return db.query(EmergencyResource).all()

@router.post("/optimization/allocate")
def allocate_resources(req: OptimizeRequest):
    return resource_optimizer.optimize_resources(
        closed_roads=req.closed_roads or [],
        available_ambulances=req.available_ambulances,
        available_rescue_boats=req.available_rescue_boats,
        available_pumps=req.available_pumps,
        priority_zone=req.priority_zone
    )
