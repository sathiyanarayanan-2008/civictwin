"""
CivicTwin AI - Geospatial Intelligence Endpoints
Serves Chennai zones, critical infrastructure, road segments, and bundled GeoJSON.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.entities import Zone, Infrastructure, RoadSegment, City
from app.geospatial.chennai_data import generate_chennai_geojson, CHENNAI_CITY

router = APIRouter(prefix="", tags=["Geospatial Data"])

@router.get("/cities")
def get_cities(db: Session = Depends(get_db)):
    return db.query(City).all()

@router.get("/zones")
def get_zones(db: Session = Depends(get_db)):
    return db.query(Zone).all()

@router.get("/infrastructure")
def get_infrastructure(category: str = None, zone_id: int = None, db: Session = Depends(get_db)):
    q = db.query(Infrastructure)
    if category:
        q = q.filter(Infrastructure.category == category)
    if zone_id:
        q = q.filter(Infrastructure.zone_id == zone_id)
    return q.all()

@router.get("/roads")
def get_roads(db: Session = Depends(get_db)):
    return db.query(RoadSegment).all()

@router.get("/geojson")
def get_chennai_geojson():
    """Returns complete GeoJSON FeatureCollection with zones, roads, infra, and resources."""
    return generate_chennai_geojson()
