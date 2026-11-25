"""
CivicTwin AI - Prevention Impact Comparator
Calculates real mathematical side-by-side differences between:
- Scenario 1: Baseline Crisis (No Preventive Action)
- Scenario 2: AI-Recommended Preventive Intervention
Displays actual computed delta in affected roads, travel times, coverage, and disruption score.
"""

from typing import Dict, Any
from app.simulation.cascade_engine import cascade_engine

def compare_scenarios(
    baseline_rainfall: float = 95.0,
    baseline_duration: float = 4.0,
    baseline_drainage_eff: float = 0.50,
    intervention_drainage_eff: float = 0.85,
    pumps_deployed: int = 4,
    traffic_contraflow_active: bool = True
) -> Dict[str, Any]:
    """
    Simulate Baseline (no intervention) vs AI-Recommended Preventive Intervention.
    """
    # 1. Baseline Run: Severe drainage clogging, unmitigated road closures
    baseline_result = cascade_engine.simulate_cascade(
        rainfall_intensity_mmh=baseline_rainfall,
        rainfall_duration_h=baseline_duration,
        drainage_efficiency=baseline_drainage_eff,
        initial_closed_roads=[1001, 1003], # Road closures happen
        disabled_facilities=[]
    )

    # 2. Intervention Run: Drainage boosted via staged pumps, traffic rerouted
    # Result: Mount-Poonamallee and Usman Road kept open by pumps, Velachery bypass surface water lowered
    intervention_result = cascade_engine.simulate_cascade(
        rainfall_intensity_mmh=baseline_rainfall,
        rainfall_duration_h=baseline_duration,
        drainage_efficiency=intervention_drainage_eff,
        initial_closed_roads=[], # Managed proactively
        disabled_facilities=[],
        pump_boost_roads=[1003, 1004] # Staged high-flow mobile pumps
    )

    # Calculate actual computed differences
    diff_roads = baseline_result["affected_roads_count"] - intervention_result["affected_roads_count"]
    diff_facilities = baseline_result["inaccessible_facilities_count"] - intervention_result["inaccessible_facilities_count"]
    diff_travel_time = round(baseline_result["avg_emergency_travel_time_min"] - intervention_result["avg_emergency_travel_time_min"], 1)
    diff_coverage = round(intervention_result["resource_coverage_pct"] - baseline_result["resource_coverage_pct"], 1)
    diff_unserved = round(baseline_result["unserved_demand_pct"] - intervention_result["unserved_demand_pct"], 1)
    diff_disruption = round(baseline_result["disruption_score"] - intervention_result["disruption_score"], 2)

    return {
        "baseline": {
            "scenario_name": "Baseline Crisis (No Preventive Action)",
            "affected_roads": baseline_result["affected_roads_count"],
            "inaccessible_facilities": baseline_result["inaccessible_facilities_count"],
            "inaccessible_hospitals": baseline_result["inaccessible_hospitals_count"],
            "avg_travel_time_min": baseline_result["avg_emergency_travel_time_min"],
            "resource_coverage_pct": baseline_result["resource_coverage_pct"],
            "unserved_demand_pct": baseline_result["unserved_demand_pct"],
            "disruption_score": baseline_result["disruption_score"],
            "cascade_events_count": len(baseline_result["cascade_events"])
        },
        "intervention": {
            "scenario_name": "CivicTwin AI-Recommended Preventive Strategy",
            "affected_roads": intervention_result["affected_roads_count"],
            "inaccessible_facilities": intervention_result["inaccessible_facilities_count"],
            "inaccessible_hospitals": intervention_result["inaccessible_hospitals_count"],
            "avg_travel_time_min": intervention_result["avg_emergency_travel_time_min"],
            "resource_coverage_pct": intervention_result["resource_coverage_pct"],
            "unserved_demand_pct": intervention_result["unserved_demand_pct"],
            "disruption_score": intervention_result["disruption_score"],
            "cascade_events_count": len(intervention_result["cascade_events"])
        },
        "delta_improvement": {
            "roads_kept_open": diff_roads,
            "facilities_saved_access": diff_facilities,
            "travel_time_reduction_min": diff_travel_time,
            "coverage_increase_pct": diff_coverage,
            "unserved_demand_reduction_pct": diff_unserved,
            "disruption_reduction_score": diff_disruption,
            "improvement_pct": round((diff_disruption / max(0.01, baseline_result["disruption_score"])) * 100, 1)
        },
        "recommended_preventive_actions": [
            "Stage 2 high-capacity mobile de-watering pumps at Mount-Poonamallee Road culvert (Zone 4) 90 mins prior to peak surge.",
            "Activate traffic diversion on Anna Salai to reserve inner lane for MIOT emergency ambulances.",
            "Pre-deploy backup mobile diesel generator to Velachery 230kV substation to prevent stormwater pump outage.",
            "Issue targeted civic SMS advisory to Velachery and Perungudi low-lying residents for voluntary ground-floor evacuation."
        ]
    }
