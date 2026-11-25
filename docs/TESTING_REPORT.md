# AUTOMATED TESTING REPORT — CIVICTWIN AI

**Test Execution Date:** November 2026  
**Environment:** Python 3.13.9, Pytest 9.2.0, Vite 5.4.21, TypeScript 5.2.2  
**Platform:** Windows 11 / Linux CI Compatible  

## 1. Backend Automated Test Results (Pytest)

```
============================= test session starts =============================
platform win32 -- Python 3.13.9, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\Users\User\OneDrive\Desktop\civic twin\backend
configfile: pytest.ini
plugins: anyio-4.16.0, asyncio-1.5.0
collected 9 items

tests/test_auth.py::test_user_registration_and_login PASSED              [ 11%]
tests/test_auth.py::test_demo_user_authentication PASSED                 [ 22%]
tests/test_engine.py::test_weather_and_offline_fallback PASSED           [ 33%]
tests/test_engine.py::test_risk_prediction_engine PASSED                 [ 44%]
tests/test_engine.py::test_cascade_simulation_reproducibility PASSED     [ 55%]
tests/test_engine.py::test_resource_optimization_routing PASSED          [ 66%]
tests/test_engine.py::test_pdf_and_csv_generation PASSED                 [ 77%]
tests/test_health.py::test_health_check PASSED                           [ 88%]
tests/test_health.py::test_readiness_check PASSED                        [100%]

======================= 9 passed, 2 warnings in 14.26s ========================
```

## 2. Frontend Production Compilation Verification

```
> civictwin-frontend@1.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 2695 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                     1.27 kB │ gzip:   0.69 kB
dist/assets/index-FvfYVNjh.css     97.74 kB │ gzip:  15.15 kB
dist/assets/index-CmN-HXLg.js   2,492.27 kB │ gzip: 692.85 kB
✓ built in 15.40s
```

## 3. Resilient Fallback Verification
- **Map Offline Verification:** In the absence of third-party map tiles, the bundled GeoJSON overlay renders all 8 Chennai zones, road lines, and hospital markers without a blank screen.
- **Weather Offline Verification:** When Open-Meteo external network calls fail or timeout, the local deterministic Chennai monsoon fallback activates transparently.
- **Report Verification:** `GET /api/v1/analytics/export/pdf` was tested and produces a valid, well-formed binary PDF stream (`%PDF-1.4`) with ReportLab tables and headers.
