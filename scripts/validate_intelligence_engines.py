"""
CivicTwin AI - Comprehensive Validation Script for ML, Cascade Engine, and Optimizer
"""
import sys
import os
import json

# Add backend to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.ml.predict import predict_urban_risk
from app.simulation.cascade_engine import cascade_engine
from app.simulation.comparator import compare_scenarios
from app.optimization.resource_optimizer import resource_optimizer

def validate_all():
    print("=== 1. VALIDATING ML RISK PREDICTOR & EXPLAINABILITY ===")
    ml_res = predict_urban_risk(
        rainfall_intensity_mmh=95.0,
        accumulated_rainfall_mm=210.0,
        elevation_m=4.1,
        drainage_capacity_mmh=32.0,
        impervious_surface_ratio=0.85,
        distance_to_water_body_m=400.0,
        historical_flood_events=5,
        drainage_maintenance_score=0.60
    )
    print(f"Prediction Score: {ml_res['risk_score']} ({ml_res['risk_level']})")
    print(f"Confidence: {ml_res['confidence_score']}")
    print(f"Model Version: {ml_res['model_version']}")
    print(f"SHAP Contributions: {json.dumps(ml_res['shap_contributions'])}")
    print(f"Rationale: {ml_res['explanation']}\n")

    print("=== 2. VALIDATING 3 DISTINCT CASCADE CRISIS SCENARIOS ===")
    scenarios = [
        ("Scenario A: Heavy Rainfall", 95.0, 4.0, 0.55, [1001, 1004]),
        ("Scenario B: Road Disruption", 60.0, 3.0, 0.70, [1003, 1008]),
        ("Scenario C: Compound Substation Failure", 140.0, 5.0, 0.35, [1001, 1003, 1006])
    ]

    for name, rain, dur, drain, closed in scenarios:
        sim = cascade_engine.simulate_cascade(
            rainfall_intensity_mmh=rain,
            rainfall_duration_h=dur,
            drainage_efficiency=drain,
            initial_closed_roads=closed
        )
        print(f"[{name}]")
        print(f"  Affected Roads: {sim['affected_roads_count']}, Inaccessible Facilities: {sim['inaccessible_facilities_count']}")
        print(f"  Avg Travel Time: {sim['avg_emergency_travel_time_min']}m, Fleet Coverage: {sim['resource_coverage_pct']}%")
        print(f"  Disruption Score: {sim['disruption_score']} / 1.0, Cascade Events: {len(sim['cascade_events'])}")

    print("\n=== 3. VALIDATING PREVENTION IMPACT COMPARATOR ===")
    comp = compare_scenarios(
        baseline_rainfall=95.0,
        baseline_duration=4.0,
        baseline_drainage_eff=0.50,
        intervention_drainage_eff=0.85
    )
    delta = comp["delta_improvement"]
    print(f"Roads Saved: {delta['roads_kept_open']}, Facilities Saved: {delta['facilities_saved_access']}")
    print(f"Travel Delay Reduced By: {delta['travel_time_reduction_min']} minutes")
    print(f"Coverage Increased By: {delta['coverage_increase_pct']}%")
    print(f"Net Disruption Score Reduction: {delta['disruption_reduction_score']} ({delta['improvement_pct']}% improvement)\n")

    print("=== 4. VALIDATING OR-TOOLS RESOURCE OPTIMIZATION ===")
    opt = resource_optimizer.optimize_resources(
        closed_roads=[1001, 1003],
        available_ambulances=18,
        available_rescue_boats=10,
        available_pumps=6
    )
    print(f"Ambulances Allocated: {opt['summary']['total_ambulances_assigned']}")
    print(f"Rescue Boats Allocated: {opt['summary']['total_boats_assigned']}")
    print(f"Mobile Pumps Allocated: {opt['summary']['total_pumps_assigned']}")
    print(f"Avg Response Time (avoiding closed roads): {opt['summary']['average_modeled_response_time_min']} min")
    print(f"Detour Routes Formulated: {len(opt['critical_routes'])}")
    for r in opt['critical_routes']:
        print(f"  -> {r['facility']}: Detour: {r['recommended_detour']} (+{r['detour_penalty_min']} min)")

if __name__ == "__main__":
    validate_all()
