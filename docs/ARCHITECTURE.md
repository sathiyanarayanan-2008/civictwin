# SYSTEM ARCHITECTURE — CIVICTWIN AI

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER                               │
│                                                                        │
│   React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion          │
│   ├── Interactive 3D Digital Twin (React Three Fiber / Three.js)       │
│   ├── Predictive Geospatial Map (MapLibre GL JS + Bundled GeoJSON)     │
│   ├── AI Agent Control Centre (WebSocket Real-Time Event Stream)       │
│   ├── Crisis Simulation Lab (What-If Parameters & Sliders)             │
│   ├── Prevention Impact Comparator (Side-by-Side Evaluation)           │
│   ├── Emergency Resource Planner (Dynamic Detour Routing)              │
│   ├── Citizen Reporting Portal (Deduplication & GPS Ingestion)         │
│   └── CivicTwin Copilot Assistant & 1-Click Guided Demo Modal          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST / WebSocket (/api/v1)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION API TIER                           │
│                                                                        │
│   FastAPI + Uvicorn + Pydantic v2 + OAuth2 RBAC (5 Roles)              │
│   ├── /dashboard       ├── /agents          ├── /optimization          │
│   ├── /cities          ├── /simulations     ├── /recommendations       │
│   ├── /zones           ├── /resources       ├── /reports               │
│   ├── /weather         ├── /analytics       ├── /copilot               │
│   └── /risk            ├── /geojson         └── /ws (Live Telemetry)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼───────────────────────────┐
       ▼                            ▼                           ▼
┌──────────────┐          ┌───────────────────┐       ┌─────────────────┐
│ MULTI-AGENT  │          │ INTELLIGENCE      │       │ PERSISTENCE     │
│ ENGINE       │          │ ENGINES           │       │ LAYER           │
│              │          │                   │       │                 │
│ 8-Agent State│          │ • Scikit-Learn RF │       │ PostgreSQL +    │
│ Blackboard   │          │ • NetworkX Graph  │       │ PostGIS         │
│ Orchestrator │          │ • OR-Tools Solver │       │ (SQLite Local   │
│ & Supervisor │          │ • ReportLab PDF   │       │ Fallback)       │
└──────────────┘          └───────────────────┘       └─────────────────┘
```
