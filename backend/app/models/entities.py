from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

def utc_now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=True)
    role = Column(String(50), default="Citizen", nullable=False) # Administrator, Municipal Operator, Emergency Response Coordinator, Citizen, Demo Viewer
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utc_now)
    
    citizen_reports = relationship("CitizenReport", back_populates="user")
    approvals = relationship("ApprovalRecord", back_populates="user")

class City(Base):
    __tablename__ = "cities"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    state = Column(String(100), default="Tamil Nadu")
    country = Column(String(100), default="India")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    population = Column(Integer, default=11000000)
    boundary_geojson = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    
    zones = relationship("Zone", back_populates="city")
    weather_records = relationship("WeatherRecord", back_populates="city")
    resources = relationship("EmergencyResource", back_populates="city")

class Zone(Base):
    __tablename__ = "zones"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    name = Column(String(100), nullable=False)
    zone_code = Column(String(20), nullable=False)
    risk_level = Column(String(20), default="Moderate") # Low, Moderate, High, Critical
    elevation_m = Column(Float, default=6.5)
    drainage_capacity = Column(Float, default=50.0) # mm/hr
    vulnerability_score = Column(Float, default=0.5)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    population = Column(Integer, default=500000)
    boundary_coords = Column(JSON, nullable=True)
    
    city = relationship("City", back_populates="zones")
    infrastructure = relationship("Infrastructure", back_populates="zone")
    road_segments = relationship("RoadSegment", back_populates="zone")
    incidents = relationship("Incident", back_populates="zone")

class Infrastructure(Base):
    __tablename__ = "infrastructure"
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)
    name = Column(String(150), nullable=False)
    category = Column(String(50), nullable=False) # Hospital, Shelter, School, Fire Station, Drainage Pump, Power Substation
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    capacity = Column(Integer, default=500)
    status = Column(String(50), default="Operational") # Operational, Degraded, Flooded, Inaccessible
    vulnerability = Column(Float, default=0.3)
    critical_level = Column(String(20), default="High") # Low, Medium, High, Critical
    elevation_m = Column(Float, default=6.0)
    has_backup_power = Column(Boolean, default=True)
    metadata_json = Column(JSON, nullable=True)
    
    zone = relationship("Zone", back_populates="infrastructure")

class InfrastructureDependency(Base):
    __tablename__ = "infrastructure_dependencies"
    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("infrastructure.id"), nullable=False)
    target_id = Column(Integer, ForeignKey("infrastructure.id"), nullable=False)
    dependency_type = Column(String(50), nullable=False) # Power, Access, Drainage, Telecommunications
    criticality = Column(Float, default=0.8) # 0.0 to 1.0
    description = Column(String(255), nullable=True)

class RoadSegment(Base):
    __tablename__ = "road_segments"
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)
    name = Column(String(150), nullable=False)
    category = Column(String(50), default="Arterial") # Arterial, Primary, Secondary
    length_km = Column(Float, default=2.5)
    elevation_m = Column(Float, default=5.0)
    drainage_capacity = Column(Float, default=45.0) # mm/hr
    surface_water_mm = Column(Float, default=0.0)
    flood_risk_score = Column(Float, default=0.2)
    is_closed = Column(Boolean, default=False)
    speed_limit_kmh = Column(Integer, default=50)
    coordinates_json = Column(JSON, nullable=True)
    
    zone = relationship("Zone", back_populates="road_segments")

class WeatherRecord(Base):
    __tablename__ = "weather_records"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    timestamp = Column(DateTime, default=utc_now)
    temperature_c = Column(Float, default=29.5)
    rainfall_mm = Column(Float, default=0.0)
    precipitation_probability = Column(Float, default=15.0)
    wind_speed_kmh = Column(Float, default=12.0)
    humidity_pct = Column(Float, default=78.0)
    weather_code = Column(Integer, default=1)
    condition_text = Column(String(50), default="Partly Cloudy")
    source = Column(String(100), default="Open-Meteo API")
    is_forecast = Column(Boolean, default=False)
    
    city = relationship("City", back_populates="weather_records")

class RiskPrediction(Base):
    __tablename__ = "risk_predictions"
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=True)
    road_id = Column(Integer, ForeignKey("road_segments.id"), nullable=True)
    timestamp = Column(DateTime, default=utc_now)
    risk_score = Column(Float, nullable=False) # 0.0 to 1.0
    risk_level = Column(String(20), nullable=False) # Low, Moderate, High, Critical
    model_version = Column(String(50), default="CivicTwin-RF-v1.0")
    contributing_factors_json = Column(JSON, nullable=True)
    confidence_score = Column(Float, default=0.92)

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)
    title = Column(String(150), nullable=False)
    category = Column(String(50), nullable=False) # Flooding, Road Disruption, Power Outage, Tree Fall
    severity = Column(String(20), default="High") # Low, Moderate, High, Critical
    status = Column(String(50), default="Active") # Active, Under Response, Mitigated, Resolved
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    reported_at = Column(DateTime, default=utc_now)
    mitigated_at = Column(DateTime, nullable=True)
    
    zone = relationship("Zone", back_populates="incidents")

class CitizenReport(Base):
    __tablename__ = "citizen_reports"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    category = Column(String(50), nullable=False) # Flooding, Waterlogging, Road damage, Fallen trees, Drainage blockage, Infrastructure damage, Other
    description = Column(Text, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    address = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    status = Column(String(50), default="Pending Verification") # Submitted, Pending Verification, Verified, Under Review, Resolved, Rejected
    priority = Column(String(20), default="Moderate") # Low, Moderate, High, Critical
    duplicate_of_id = Column(Integer, ForeignKey("citizen_reports.id"), nullable=True)
    ai_verified = Column(Boolean, default=False)
    ai_category_confidence = Column(Float, default=0.88)
    created_at = Column(DateTime, default=utc_now)
    
    user = relationship("User", back_populates="citizen_reports")

class EmergencyResource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False) # Ambulance, Rescue Boat, High-Flow Pump, Supply Truck, Emergency Squad
    status = Column(String(50), default="Available") # Available, Dispatched, Maintenance
    capacity = Column(Integer, default=4)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    assigned_zone = Column(String(100), nullable=True)
    contact_number = Column(String(30), default="+91 44 2841 4545")
    
    city = relationship("City", back_populates="resources")

class SimulationScenario(Base):
    __tablename__ = "simulation_scenarios"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    scenario_code = Column(String(50), default="SCENARIO_CUSTOM") # SCENARIO_A, SCENARIO_B, SCENARIO_C
    rainfall_intensity_mmh = Column(Float, default=75.0)
    rainfall_duration_h = Column(Float, default=4.0)
    drainage_efficiency = Column(Float, default=0.60) # 0.0 to 1.0
    road_closures_json = Column(JSON, nullable=True)
    resource_availability_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    
    results = relationship("SimulationResult", back_populates="scenario")

class SimulationResult(Base):
    __tablename__ = "simulation_results"
    id = Column(Integer, primary_key=True, index=True)
    scenario_id = Column(Integer, ForeignKey("simulation_scenarios.id"), nullable=False)
    timestamp = Column(DateTime, default=utc_now)
    affected_roads_count = Column(Integer, default=0)
    inaccessible_facilities_count = Column(Integer, default=0)
    avg_emergency_travel_time_min = Column(Float, default=18.5)
    resource_coverage_pct = Column(Float, default=74.0)
    unserved_demand_pct = Column(Float, default=12.0)
    disruption_score = Column(Float, default=0.45)
    cascade_path_json = Column(JSON, nullable=True)
    counterfactual_comparison_json = Column(JSON, nullable=True)
    
    scenario = relationship("SimulationScenario", back_populates="results")

class AgentRun(Base):
    __tablename__ = "agent_runs"
    id = Column(Integer, primary_key=True, index=True)
    workflow_name = Column(String(100), default="Full Urban Cascade Analysis")
    status = Column(String(50), default="Completed") # Running, Completed, Failed, Paused
    started_at = Column(DateTime, default=utc_now)
    completed_at = Column(DateTime, nullable=True)
    total_agents = Column(Integer, default=8)
    executed_agents = Column(Integer, default=8)
    results_summary_json = Column(JSON, nullable=True)
    
    events = relationship("AgentEvent", back_populates="agent_run")
    recommendations = relationship("Recommendation", back_populates="agent_run")

class AgentEvent(Base):
    __tablename__ = "agent_events"
    id = Column(Integer, primary_key=True, index=True)
    agent_run_id = Column(Integer, ForeignKey("agent_runs.id"), nullable=False)
    agent_name = Column(String(100), nullable=False)
    agent_role = Column(String(150), nullable=False)
    status = Column(String(50), default="Success") # Pending, In Progress, Success, Warning, Error
    input_summary = Column(Text, nullable=True)
    output_summary = Column(Text, nullable=True)
    tool_calls_json = Column(JSON, nullable=True)
    evidence_sources_json = Column(JSON, nullable=True)
    execution_time_ms = Column(Integer, default=240)
    timestamp = Column(DateTime, default=utc_now)
    
    agent_run = relationship("AgentRun", back_populates="events")

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    agent_run_id = Column(Integer, ForeignKey("agent_runs.id"), nullable=True)
    title = Column(String(200), nullable=False)
    category = Column(String(50), default="Resource Optimization") # Drainage Intervention, Traffic Diversion, Pre-emptive Evacuation, Resource Staging
    priority = Column(String(20), default="High") # Low, Moderate, High, Critical
    description = Column(Text, nullable=False)
    rationale = Column(Text, nullable=False)
    target_zone = Column(String(100), nullable=True)
    estimated_impact = Column(String(200), nullable=True)
    requires_approval = Column(Boolean, default=True)
    status = Column(String(50), default="Pending Approval") # Pending Approval, Approved, Rejected, Implemented
    created_at = Column(DateTime, default=utc_now)
    
    agent_run = relationship("AgentRun", back_populates="recommendations")
    approvals = relationship("ApprovalRecord", back_populates="recommendation")

class ApprovalRecord(Base):
    __tablename__ = "approval_records"
    id = Column(Integer, primary_key=True, index=True)
    recommendation_id = Column(Integer, ForeignKey("recommendations.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String(20), nullable=False) # Approved, Rejected
    comments = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=utc_now)
    
    user = relationship("User", back_populates="approvals")
    recommendation = relationship("Recommendation", back_populates="approvals")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    severity = Column(String(20), default="Info") # Info, Warning, Critical
    category = Column(String(50), default="System")
    is_read = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=utc_now)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    action = Column(String(100), nullable=False)
    resource_type = Column(String(100), nullable=False)
    details_json = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=utc_now)
