import pytest
from app.services.weather_service import get_live_or_fallback_weather
from app.ml.predict import predict_urban_risk
from app.simulation.cascade_engine import cascade_engine
from app.optimization.resource_optimizer import resource_optimizer
from app.services.export_service import generate_pdf_report, generate_csv_analytics

@pytest.mark.asyncio
async def test_weather_and_offline_fallback():
    weather = await get_live_or_fallback_weather()
    assert "temperature_c" in weather
    assert "rainfall_mm" in weather
    assert "source" in weather
    assert weather["temperature_c"] > 0

def test_risk_prediction_engine():
    res = predict_urban_risk(
        rainfall_intensity_mmh=95.0,
        accumulated_rainfall_mm=220.0,
        elevation_m=4.1,
        drainage_capacity_mmh=32.0,
        impervious_surface_ratio=0.85,
        distance_to_water_body_m=350.0
    )
    assert res["risk_score"] > 0.6
    assert res["risk_level"] in ["High", "Critical"]
    assert "explanation" in res
    assert "shap_contributions" in res

def test_cascade_simulation_reproducibility():
    sim = cascade_engine.simulate_cascade(
        rainfall_intensity_mmh=95.0,
        rainfall_duration_h=4.0,
        drainage_efficiency=0.55,
        initial_closed_roads=[1001, 1003]
    )
    assert sim["affected_roads_count"] >= 2
    assert sim["inaccessible_facilities_count"] >= 1
    assert sim["disruption_score"] > 0.3
    assert len(sim["cascade_events"]) > 0

def test_resource_optimization_routing():
    opt = resource_optimizer.optimize_resources(
        closed_roads=[1001, 1003],
        available_ambulances=18,
        available_rescue_boats=10
    )
    assert opt["summary"]["total_ambulances_assigned"] > 0
    assert len(opt["zone_allocations"]) == 8
    assert len(opt["critical_routes"]) == 2

def test_pdf_and_csv_generation():
    sample = {
        "scenario_name": "Test Scenario",
        "rainfall_mmh": 85.0,
        "affected_roads": 3,
        "inaccessible_facilities": 1,
        "travel_time_min": 24.5,
        "coverage_pct": 74.0,
        "disruption_score": 0.45
    }
    pdf_bytes = generate_pdf_report(sample)
    assert len(pdf_bytes) > 1000 # Valid PDF file stream
    assert pdf_bytes.startswith(b"%PDF")

    csv_text = generate_csv_analytics([sample])
    assert "Scenario Name" in csv_text
    assert "Test Scenario" in csv_text
