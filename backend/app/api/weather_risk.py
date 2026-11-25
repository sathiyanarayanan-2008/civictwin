"""
CivicTwin AI - Weather & Risk Endpoints
"""

from fastapi import APIRouter
from app.services.weather_service import get_live_or_fallback_weather
from app.ml.predict import predict_urban_risk
from app.schemas.schemas import RiskPredictionRequest, RiskPredictionResponse

router = APIRouter(tags=["Weather & Risk Prediction"])

@router.get("/weather/current")
async def get_current_weather():
    return await get_live_or_fallback_weather()

@router.post("/risk/predict", response_model=RiskPredictionResponse)
def predict_risk(req: RiskPredictionRequest):
    return predict_urban_risk(
        rainfall_intensity_mmh=req.rainfall_intensity_mmh,
        accumulated_rainfall_mm=req.accumulated_rainfall_mm,
        elevation_m=req.elevation_m,
        drainage_capacity_mmh=req.drainage_capacity_mmh,
        impervious_surface_ratio=req.impervious_surface_ratio,
        distance_to_water_body_m=req.distance_to_water_body_m,
        historical_flood_events=req.historical_flood_events,
        drainage_maintenance_score=req.drainage_maintenance_score
    )
