"""
CivicTwin AI - Database Initialization and Seeding Script
Populates default users, roles, Chennai urban data, infrastructure,
dependency graph edges, and seeded crisis scenarios.
"""

from sqlalchemy.orm import Session
from app.core.database import engine, Base, SessionLocal
from app.core.security import get_password_hash
from app.models.entities import (
    User, City, Zone, Infrastructure, RoadSegment,
    InfrastructureDependency, EmergencyResource, WeatherRecord,
    SimulationScenario, Incident, Notification, Recommendation
)
from app.geospatial.chennai_data import (
    CHENNAI_CITY, CHENNAI_ZONES, CHENNAI_INFRASTRUCTURE,
    CHENNAI_ROADS, INFRASTRUCTURE_DEPENDENCIES, EMERGENCY_RESOURCES
)
import json

def init_database():
    """Create all tables in the database with connection retry resilience for cloud deployments."""
    import time
    for attempt in range(1, 6):
        try:
            Base.metadata.create_all(bind=engine)
            print("Database schema verified and tables initialized.")
            break
        except Exception as e:
            if attempt < 5:
                print(f"Database connection attempt {attempt} failed ({e}). Retrying in 2 seconds...")
                time.sleep(2)
            else:
                print(f"Failed to connect to database after 5 attempts: {e}")
                raise e

def seed_database():
    """Seed initial data if not already populated."""
    db: Session = SessionLocal()
    try:
        # Check if already seeded
        if db.query(City).filter(City.name == CHENNAI_CITY["name"]).first():
            print("Database already seeded. Skipping initial data injection.")
            return

        print("Seeding CivicTwin AI demonstration dataset for Chennai...")

        # 1. Seed Users (5 Roles per requirements)
        users = [
            User(
                username="admin",
                email="admin@civictwin.ai",
                hashed_password=get_password_hash("Admin@Civic2026"),
                full_name="Chief Municipal Officer (Admin)",
                role="Administrator",
                is_active=True
            ),
            User(
                username="operator",
                email="operator@civictwin.ai",
                hashed_password=get_password_hash("Operator@Civic2026"),
                full_name="GCC Control Room Operator",
                role="Municipal Operator",
                is_active=True
            ),
            User(
                username="coordinator",
                email="coordinator@civictwin.ai",
                hashed_password=get_password_hash("Rescue@Civic2026"),
                full_name="TNFRS Emergency Response Coordinator",
                role="Emergency Response Coordinator",
                is_active=True
            ),
            User(
                username="citizen",
                email="citizen@civictwin.ai",
                hashed_password=get_password_hash("Citizen@Civic2026"),
                full_name="Kavitha Ramanathan (Citizen)",
                role="Citizen",
                is_active=True
            ),
            User(
                username="demo",
                email="demo@civictwin.ai",
                hashed_password=get_password_hash("DemoViewer@2026"),
                full_name="Hackathon Evaluation Judge (Demo)",
                role="Demo Viewer",
                is_active=True
            )
        ]
        db.add_all(users)
        db.flush()

        # 2. Seed City
        city = City(
            name=CHENNAI_CITY["name"],
            state=CHENNAI_CITY["state"],
            country=CHENNAI_CITY["country"],
            latitude=CHENNAI_CITY["latitude"],
            longitude=CHENNAI_CITY["longitude"],
            population=CHENNAI_CITY["population"]
        )
        db.add(city)
        db.flush()

        # 3. Seed Zones
        zone_map = {}
        for z_data in CHENNAI_ZONES:
            zone = Zone(
                city_id=city.id,
                name=z_data["name"],
                zone_code=z_data["zone_code"],
                risk_level=z_data["risk_level"],
                elevation_m=z_data["elevation_m"],
                drainage_capacity=z_data["drainage_capacity"],
                vulnerability_score=z_data["vulnerability_score"],
                latitude=z_data["latitude"],
                longitude=z_data["longitude"],
                population=z_data["population"],
                boundary_coords=z_data["boundary_coords"]
            )
            db.add(zone)
            db.flush()
            zone_map[z_data["id"]] = zone.id

        # 4. Seed Infrastructure
        for inf in CHENNAI_INFRASTRUCTURE:
            db_zone_id = zone_map.get(inf["zone_id"], 1)
            item = Infrastructure(
                id=inf["id"],
                zone_id=db_zone_id,
                name=inf["name"],
                category=inf["category"],
                latitude=inf["latitude"],
                longitude=inf["longitude"],
                capacity=inf["capacity"],
                status=inf["status"],
                vulnerability=inf["vulnerability"],
                critical_level=inf["critical_level"],
                elevation_m=inf["elevation_m"],
                has_backup_power=inf["has_backup_power"],
                metadata_json={k: v for k, v in inf.items() if k not in ["id", "zone_id", "name", "category", "latitude", "longitude", "capacity", "status", "vulnerability", "critical_level", "elevation_m", "has_backup_power"]}
            )
            db.add(item)
        db.flush()

        # 5. Seed Road Segments
        for r in CHENNAI_ROADS:
            db_zone_id = zone_map.get(r["zone_id"], 1)
            road = RoadSegment(
                id=r["id"],
                zone_id=db_zone_id,
                name=r["name"],
                category=r["category"],
                length_km=r["length_km"],
                elevation_m=r["elevation_m"],
                drainage_capacity=r["drainage_capacity"],
                surface_water_mm=r["surface_water_mm"],
                flood_risk_score=r["flood_risk_score"],
                is_closed=r["is_closed"],
                speed_limit_kmh=r["speed_limit_kmh"],
                coordinates_json=r["coordinates_json"]
            )
            db.add(road)
        db.flush()

        # 6. Seed Infrastructure Dependencies
        for dep in INFRASTRUCTURE_DEPENDENCIES:
            # Check target exists as road or infra
            d = InfrastructureDependency(
                source_id=dep["source_id"],
                target_id=dep["target_id"],
                dependency_type=dep["dependency_type"],
                criticality=dep["criticality"],
                description=dep["description"]
            )
            db.add(d)

        # 7. Seed Emergency Resources
        for res in EMERGENCY_RESOURCES:
            r = EmergencyResource(
                city_id=city.id,
                name=res["name"],
                type=res["type"],
                status=res["status"],
                capacity=res["capacity"],
                latitude=res["latitude"],
                longitude=res["longitude"],
                assigned_zone=res["assigned_zone"]
            )
            db.add(r)

        # 8. Seed Initial Weather Record
        weather = WeatherRecord(
            city_id=city.id,
            temperature_c=29.4,
            rainfall_mm=48.2,
            precipitation_probability=85.0,
            wind_speed_kmh=24.5,
            humidity_pct=88.0,
            weather_code=65,
            condition_text="Heavy Monsoon Showers",
            source="Open-Meteo Live / Seed Backup",
            is_forecast=False
        )
        db.add(weather)

        # 9. Seed 3 Mandated Scenarios (A, B, C) per requirements
        scenarios = [
            SimulationScenario(
                name="Scenario A — Heavy Rainfall & Urban Waterlogging",
                scenario_code="SCENARIO_A",
                description="Simulates a severe monsoon depression delivering 95mm/hr for 4 hours across Velachery and T. Nagar drainage basins.",
                rainfall_intensity_mmh=95.0,
                rainfall_duration_h=4.0,
                drainage_efficiency=0.55,
                road_closures_json=[1001, 1004],
                resource_availability_json={"ambulances": 18, "rescue_boats": 10}
            ),
            SimulationScenario(
                name="Scenario B — Road Network Disruption & Hospital Inaccessibility",
                scenario_code="SCENARIO_B",
                description="Models major arterial disruption along Mount-Poonamallee Road cutting off MIOT Hospital and Kathipara transit corridor.",
                rainfall_intensity_mmh=60.0,
                rainfall_duration_h=3.0,
                drainage_efficiency=0.70,
                road_closures_json=[1003, 1008],
                resource_availability_json={"ambulances": 14, "rescue_boats": 6}
            ),
            SimulationScenario(
                name="Scenario C — Combined Extreme Rainfall & Infrastructure Substation Failure",
                scenario_code="SCENARIO_C",
                description="Catastrophic compound event: 140mm/hr cloudburst combined with Velachery 230kV Substation failure knocking out de-watering pumps.",
                rainfall_intensity_mmh=140.0,
                rainfall_duration_h=5.0,
                drainage_efficiency=0.35,
                road_closures_json=[1001, 1003, 1006],
                resource_availability_json={"ambulances": 10, "rescue_boats": 14}
            )
        ]
        db.add_all(scenarios)

        # 10. Seed Initial Recommendations
        initial_recs = [
            Recommendation(
                title="Pre-stage 2 High-Flow Mobile Pumps at Mount-Poonamallee Sluice",
                category="Drainage Intervention",
                priority="Critical",
                target_zone="Guindy / Manapakkam",
                description="Deploy heavy-duty diesel de-watering pumps to prevent Mount-Poonamallee Road closure and preserve MIOT Hospital ambulance access.",
                rationale="Prevents cascading tier-2 isolation of 1000-bed trauma hospital; reduces modelled delay by 14.5 minutes.",
                estimated_impact="Avoids MIOT corridor shutdown; saves 65 ICU ingress routes.",
                requires_approval=True,
                status="Pending Approval"
            ),
            Recommendation(
                title="Implement Traffic Contraflow & Emergency Blue Lane on Anna Salai",
                category="Traffic Diversion",
                priority="High",
                target_zone="Guindy to Nandanam",
                description="Reserve median northbound lane of Anna Salai exclusively for emergency ambulances and disaster management convoys.",
                rationale="Compensates for Inner Ring Road congestion due to localized Jafferkhanpet ponding.",
                estimated_impact="Maintains average ambulance speed above 40 km/h.",
                requires_approval=True,
                status="Pending Approval"
            ),
            Recommendation(
                title="Stage Emergency Mobile Generator at Velachery 230kV Substation",
                category="Power Resilience",
                priority="Critical",
                target_zone="Velachery",
                description="Provide secondary power redundancy to ensure 4 stormwater pumps remain operational even if local feeder lines trip.",
                rationale="Single point of failure; pump outage would inundate 400 residential dwellings in low-elevation basin.",
                estimated_impact="Maintains 85,000 L/min stormwater discharge into Pallikaranai marsh.",
                requires_approval=True,
                status="Pending Approval"
            )
        ]
        db.add_all(initial_recs)

        # 11. Seed Notifications
        notifications = [
            Notification(
                title="Monsoon Surge Alert: South Chennai Basins",
                message="Automated Weather Agent detected 85% probability of heavy precipitation (>65mm/hr) in Velachery and Perungudi corridors.",
                severity="Critical",
                category="Weather Warning"
            ),
            Notification(
                title="Pre-emptive Pump Deployment Initiated",
                message="Resource Optimizer Agent recommended staging 2 high-flow mobile pumps at Mambalam Canal Sluice (T. Nagar).",
                severity="Warning",
                category="Agent Recommendation"
            ),
            Notification(
                title="System Operational: Chennai Digital Twin Live",
                message="All 8 AI agents connected to real-time geospatial telemetry for Chennai Command Center.",
                severity="Info",
                category="System Status"
            )
        ]
        db.add_all(notifications)

        db.commit()
        print("Database seeded successfully with all Chennai urban intelligence records!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_database()
    seed_database()
