# REST API SPECIFICATION — CIVICTWIN AI

All endpoints reside under `/api/v1` and feature interactive Swagger documentation at `/docs`.

## 1. Health & System Status
- `GET /health` — Returns application health, project ID, and author credentials.
- `GET /ready` — Checks database connectivity, ML engine, and active agent states.

## 2. Authentication & Access Control
- `POST /api/v1/auth/register` — Registers new users (strictly defaults to Citizen role).
- `POST /api/v1/auth/login` — Issues HS256 JWT access token with role permissions.
- `GET /api/v1/auth/me` — Returns authenticated user profile and active permissions.

## 3. Command Centre Dashboard
- `GET /api/v1/dashboard/overview` — Aggregated KPIs: Urban Risk Index, critical zones, active incidents, available resources, and weather telemetry.

## 4. Geospatial Registries & Bundled GeoJSON
- `GET /api/v1/cities` — Lists registered cities (Chennai default).
- `GET /api/v1/zones` — Returns 8 urban basins with elevation and drainage ratings.
- `GET /api/v1/infrastructure` — Returns 12 critical assets (hospitals, shelters, pumps).
- `GET /api/v1/roads` — Lists 8 arterial road segments and speed limits.
- `GET /api/v1/geojson` — Complete GeoJSON FeatureCollection with polygons and lines.

## 5. Weather & ML Risk Prediction
- `GET /api/v1/weather/current` — Fetches live Open-Meteo telemetry or cached fallback.
- `POST /api/v1/risk/predict` — Runs Random Forest risk inference with SHAP contributions.

## 6. AI Agent Control Centre
- `POST /api/v1/agents/run` — Triggers 8-agent workflow and streams events over WebSocket.
- `GET /api/v1/agents/runs` — Returns historical agent run executions.
- `WS /api/v1/ws` — Real-time WebSocket connection for live agent activity logs.

## 7. Crisis Simulation Lab & Prevention Comparator
- `GET /api/v1/simulations/scenarios` — Returns seeded Scenarios A, B, and C.
- `POST /api/v1/simulations/run` — Executes bounded failure cascade on NetworkX graph.
- `GET /api/v1/simulations/compare` — Side-by-side counterfactual comparison.

## 8. Emergency Resource Optimization
- `GET /api/v1/resources` — Emergency fleet inventory (ambulances, boats, pumps).
- `POST /api/v1/optimization/allocate` — OR-Tools constrained fleet allocation and detour routes.

## 9. Citizen Reporting & Deduplication
- `GET /api/v1/reports` — Lists crowdsourced field incident reports.
- `POST /api/v1/reports` — Submits incident with spatial clustering deduplication.

## 10. Preventive Recommendations & Governance
- `GET /api/v1/recommendations` — Lists preventive actions awaiting human approval.
- `POST /api/v1/recommendations/{id}/action` — Approves or rejects consequential action.

## 11. Reports & Real Exports
- `GET /api/v1/analytics/model-metrics` — Model accuracy, confusion matrix, and feature weights.
- `GET /api/v1/analytics/export/pdf` — Downloads compiled scenario PDF report.
- `GET /api/v1/analytics/export/csv` — Downloads scenario comparison CSV.

## 12. Conversational Copilot
- `POST /api/v1/copilot/query` — Grounded urban twin Q&A with evidence source citations.
