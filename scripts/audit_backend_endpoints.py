"""
CivicTwin AI - Comprehensive Backend Endpoints Audit Script
Queries every REST endpoint on http://127.0.0.1:8000 and tests functionality.
"""
import httpx
import json
import time

BASE_URL = "http://127.0.0.1:8000"

def audit_all_endpoints():
    client = httpx.Client(timeout=10.0)
    results = []

    endpoints = [
        ("GET", "/health", None),
        ("GET", "/ready", None),
        ("GET", "/api/v1/dashboard/overview", None),
        ("GET", "/api/v1/cities", None),
        ("GET", "/api/v1/zones", None),
        ("GET", "/api/v1/infrastructure", None),
        ("GET", "/api/v1/roads", None),
        ("GET", "/api/v1/geojson", None),
        ("GET", "/api/v1/weather/current", None),
        ("POST", "/api/v1/risk/predict", {
            "rainfall_intensity_mmh": 85.0,
            "accumulated_rainfall_mm": 200.0,
            "elevation_m": 4.1,
            "drainage_capacity_mmh": 32.0,
            "impervious_surface_ratio": 0.85,
            "distance_to_water_body_m": 400.0,
            "historical_flood_events": 5,
            "drainage_maintenance_score": 0.60
        }),
        ("GET", "/api/v1/simulations/scenarios", None),
        ("POST", "/api/v1/simulations/run", {
            "rainfall_intensity_mmh": 95.0,
            "rainfall_duration_h": 4.0,
            "drainage_efficiency": 0.55,
            "closed_roads": [1001, 1003]
        }),
        ("GET", "/api/v1/simulations/compare?rainfall=95.0&duration=4.0&baseline_drainage=0.50&preventive_drainage=0.85", None),
        ("GET", "/api/v1/resources", None),
        ("POST", "/api/v1/optimization/allocate", {
            "closed_roads": [1001, 1003],
            "available_ambulances": 18,
            "available_rescue_boats": 10,
            "available_pumps": 6
        }),
        ("GET", "/api/v1/reports", None),
        ("POST", "/api/v1/reports", {
            "category": "Flooding",
            "description": "Live audit test: 0.4m water accumulation near Velachery junction.",
            "latitude": 12.9815,
            "longitude": 80.2180,
            "address": "Velachery Bypass Ward 178"
        }),
        ("GET", "/api/v1/recommendations", None),
        ("POST", "/api/v1/recommendations/1/action", {
            "action": "Approved",
            "comments": "QA Audit test approval by coordinator."
        }),
        ("GET", "/api/v1/notifications", None),
        ("GET", "/api/v1/analytics/model-metrics", None),
        ("GET", "/api/v1/analytics/export/pdf", None),
        ("GET", "/api/v1/analytics/export/csv", None),
        ("POST", "/api/v1/copilot/query", {
            "query": "Which areas have the highest estimated flood risk and why?",
            "context_zone": "Chennai"
        }),
        ("POST", "/api/v1/auth/login", {
            "username": "demo",
            "password": "DemoViewer@2026"
        })
    ]

    print(f"Auditing {len(endpoints)} live endpoints against {BASE_URL}...\n")
    passed = 0
    failed = 0

    for method, path, body in endpoints:
        start = time.time()
        try:
            if method == "GET":
                resp = client.get(f"{BASE_URL}{path}")
            elif method == "POST":
                resp = client.post(f"{BASE_URL}{path}", json=body)
            duration_ms = round((time.time() - start) * 1000, 1)

            is_ok = 200 <= resp.status_code < 300
            content_type = resp.headers.get("content-type", "")
            size = len(resp.content)

            status_str = "PASS" if is_ok else "FAIL"
            if is_ok:
                passed += 1
            else:
                failed += 1

            res_entry = {
                "method": method,
                "path": path,
                "status_code": resp.status_code,
                "duration_ms": duration_ms,
                "size_bytes": size,
                "content_type": content_type,
                "result": status_str
            }
            results.append(res_entry)
            print(f"[{status_str}] {method:<4} {path:<48} -> {resp.status_code} ({duration_ms}ms, {size} bytes)")
        except Exception as e:
            failed += 1
            print(f"[FAIL] {method:<4} {path:<48} -> Exception: {e}")
            results.append({
                "method": method,
                "path": path,
                "status_code": 0,
                "duration_ms": 0,
                "size_bytes": 0,
                "content_type": "error",
                "result": "FAIL",
                "error": str(e)
            })

    print(f"\nAudit Complete: {passed} PASSED, {failed} FAILED out of {len(endpoints)} endpoints.")
    with open("docs/live_endpoint_audit.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    audit_all_endpoints()
