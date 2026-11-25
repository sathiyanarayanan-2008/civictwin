from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# Token & Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[str] = None
    exp: Optional[int] = None

class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    role: Optional[str] = "Citizen"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

# Weather Schemas
class WeatherCurrent(BaseModel):
    temperature_c: float
    rainfall_mm: float
    precipitation_probability: float
    wind_speed_kmh: float
    humidity_pct: float
    condition_text: str
    weather_code: int
    source: str
    timestamp: datetime
    is_live: bool = True

class WeatherForecastItem(BaseModel):
    timestamp: str
    rainfall_mm: float
    temperature_c: float
    precipitation_probability: float

# Geospatial & Zone Schemas
class ZoneResponse(BaseModel):
    id: int
    name: str
    zone_code: str
    risk_level: str
    elevation_m: float
    drainage_capacity: float
    vulnerability_score: float
    latitude: float
    longitude: float
    population: int
    boundary_coords: Optional[List[List[float]]] = None
    class Config:
        from_attributes = True

class InfrastructureResponse(BaseModel):
    id: int
    zone_id: int
    name: str
    category: str
    latitude: float
    longitude: float
    capacity: int
    status: str
    vulnerability: float
    critical_level: str
    elevation_m: float
    has_backup_power: bool
    metadata_json: Optional[Dict[str, Any]] = None
    class Config:
        from_attributes = True

class RoadSegmentResponse(BaseModel):
    id: int
    zone_id: int
    name: str
    category: str
    length_km: float
    elevation_m: float
    drainage_capacity: float
    surface_water_mm: float
    flood_risk_score: float
    is_closed: bool
    speed_limit_kmh: int
    coordinates_json: Optional[List[List[float]]] = None
    class Config:
        from_attributes = True

# ML Risk Prediction Schemas
class RiskPredictionRequest(BaseModel):
    rainfall_intensity_mmh: float = Field(..., ge=0, le=300)
    accumulated_rainfall_mm: float = Field(..., ge=0, le=1000)
    elevation_m: float = Field(..., ge=-5, le=100)
    drainage_capacity_mmh: float = Field(..., ge=5, le=150)
    impervious_surface_ratio: float = Field(0.75, ge=0, le=1.0)
    distance_to_water_body_m: float = Field(500.0, ge=10, le=20000)
    historical_flood_events: int = Field(2, ge=0, le=20)
    drainage_maintenance_score: float = Field(0.7, ge=0, le=1.0)

class RiskPredictionResponse(BaseModel):
    risk_score: float
    risk_level: str
    model_version: str
    feature_importance: Dict[str, float]
    shap_contributions: Dict[str, float]
    explanation: str
    confidence_score: float

# Cascading Simulation Schemas
class SimulationRequest(BaseModel):
    scenario_code: Optional[str] = "SCENARIO_A" # SCENARIO_A, SCENARIO_B, SCENARIO_C, CUSTOM
    rainfall_intensity_mmh: float = 75.0
    rainfall_duration_h: float = 4.0
    drainage_efficiency: float = 0.60
    closed_roads: Optional[List[int]] = []
    disabled_facilities: Optional[List[int]] = []
    total_ambulances: int = 24
    total_rescue_boats: int = 12

class SimulationResultResponse(BaseModel):
    scenario_id: int
    scenario_name: str
    affected_roads_count: int
    inaccessible_facilities_count: int
    avg_emergency_travel_time_min: float
    resource_coverage_pct: float
    unserved_demand_pct: float
    disruption_score: float
    cascade_tree: Dict[str, Any]
    counterfactual_comparison: Dict[str, Any]

# Resource Optimization Schemas
class ResourceAllocationRequest(BaseModel):
    demand_zones: Optional[List[str]] = None
    available_ambulances: int = 24
    available_rescue_boats: int = 12
    prioritize_critical_facilities: bool = True

class ResourceAllocationResponse(BaseModel):
    allocations: List[Dict[str, Any]]
    unserved_requests: int
    avg_response_time_min: float
    optimal_routes: List[Dict[str, Any]]
    bottlenecks: List[str]
    optimization_objective_value: float

# Citizen Report Schemas
class CitizenReportCreate(BaseModel):
    category: str
    description: str
    latitude: float
    longitude: float
    address: Optional[str] = None
    image_url: Optional[str] = None

class CitizenReportResponse(BaseModel):
    id: int
    user_id: Optional[int]
    category: str
    description: str
    latitude: float
    longitude: float
    address: Optional[str]
    image_url: Optional[str]
    status: str
    priority: str
    duplicate_of_id: Optional[int] = None
    ai_verified: bool
    ai_category_confidence: float
    created_at: datetime
    class Config:
        from_attributes = True

# Agent System Schemas
class AgentExecutionEvent(BaseModel):
    agent_id: str
    agent_name: str
    agent_role: str
    status: str
    input_summary: str
    output_summary: str
    tool_calls: List[str]
    evidence_sources: List[str]
    execution_time_ms: int
    timestamp: str

class AgentWorkflowResponse(BaseModel):
    run_id: int
    workflow_name: str
    status: str
    started_at: datetime
    completed_at: Optional[datetime]
    total_agents: int
    executed_agents: int
    events: List[AgentExecutionEvent]
    final_assessment: Dict[str, Any]
    recommendations: List[Dict[str, Any]]

# Copilot Query Schema
class CopilotQuery(BaseModel):
    query: str
    context_zone: Optional[str] = None
    scenario_code: Optional[str] = None

class CopilotResponse(BaseModel):
    answer: str
    evidence_sources: List[str]
    related_metrics: Dict[str, Any]
    suggested_actions: List[str]
    timestamp: datetime
