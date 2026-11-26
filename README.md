<div align="center">

# CivicTwin AI
### Agentic AI-Powered Predictive Digital Twin for Urban Crisis Prevention
**Tagline:** *Predict. Prevent. Protect.*

[![Competition: BUILDFEST 2026](https://img.shields.io/badge/Competition-BUILDFEST%202026-blue.svg)](https://learnixlabs.com)
[![Organizer: Learnix Labs](https://img.shields.io/badge/Organizer-Learnix%20Labs-06D6EF.svg)](https://learnixlabs.com)
[![Domain: AI & ML](https://img.shields.io/badge/Domain-AI%20%26%20Machine%20Learning-8B5CF6.svg)]()
[![Target City: Chennai](https://img.shields.io/badge/Target%20City-Chennai%2C%20India-10B981.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status: Passed](https://img.shields.io/badge/Production%20Build-Passed%20(0%20errors)-brightgreen.svg)]()

**Project ID:** `BF26-CIVICTWIN-AI`  
**Developer:** Sathiya Narayanan V S  
**Institution:** Easwari Engineering College | Department of Information Technology  
**Demonstration Focus:** Chennai Metropolitan Area, Tamil Nadu, India  

[Explore Features](#4-core-features--modules) • [Architecture](#3-system-architecture) • [Live Demo Guide](#6-demonstration-accounts--judge-access) • [Installation](#7-quick-installation--local-setup) • [Submission Package](SUBMISSION/)

---

</div>

## 1. Problem Statement

Modern coastal megacities like Chennai experience recurring compound urban crises driven by rapid urbanization, low topological elevation, high impervious surface ratios, and intensifying cloudbursts (e.g., Chennai floods of 2015, Cyclone Michaung 2023).

Traditional disaster monitoring systems suffer from critical limitations:
- **Exclusively Reactive:** Monitoring infrastructure failures, submerged roads, and power cuts *after* disaster strikes.
- **Siloed Operational Units:** Stormwater drainage, traffic management, power distribution, and emergency services operate on disconnected databases without unified predictive intelligence.
- **Ignored Cascading Domino Effects:** A flooded culvert cuts off arterial ambulance routes to regional trauma centers, and perimeter water ingress grounds out substations that power dewatering pumps.
- **No Counterfactual Simulation:** Incident commanders cannot quantitatively evaluate the outcome of preventive actions before deciding to deploy resources.

---

## 2. The CivicTwin AI Solution & Innovation

**CivicTwin AI** is an intelligent, agentic urban digital twin designed to transition municipal crisis governance from reactive firefighting into **predictive, simulation-driven crisis prevention**.

```
+---------------------------------------------------------------------------------------------------------+
|                                    CASCADING CRISIS INTELLIGENCE ENGINE                                 |
+---------------------------------------------------------------------------------------------------------+
| Heavy Rainfall (95mm/h)  --> Waterlogging (Velachery)  --> Road Closures (Mount-Poonamallee)            |
|       │                                │                               │                                |
|       ▼                                ▼                               ▼                                |
| Substation Outage (230kV)--> Pump Outage (Adyar)      --> Hospital Access Cutoff (MIOT International)   |
|                                                                        │                                |
|                                                                        ▼                                |
|                                                      Emergency Response Delayed (+41.4 min)             |
+---------------------------------------------------------------------------------------------------------+
                                                │
                                  CIVICTWIN AI PREVENTIVE STRATEGY
                                                ▼
+---------------------------------------------------------------------------------------------------------+
| 1. Stage 2 high-flow mobile pumps at Mount-Poonamallee culvert 90 mins prior to peak surge             |
| 2. Activate emergency contraflow lane on Anna Salai reserved for MIOT ambulances                        |
| 3. Pre-deploy backup diesel generator and sandbags to Velachery 230kV substation                       |
| 4. Formulate OR-Tools dynamic detours routing relief convoys around submerged corridors                 |
+---------------------------------------------------------------------------------------------------------+
                                                │
                                       CALCULATED OUTCOME
                                                ▼
            [ +4 Roads Saved | 1 Hospital Ingress Preserved | 16.8 min Delay Saved | 48.4% Score Reduction ]
```

### The Prevention Impact Comparator (Real Mathematical Deltas)
Unlike dashboards with mock numbers, CivicTwin AI computes true counterfactual differences between:
- **Baseline Scenario (No Preventive Action):** 7 roads closed, 3 facilities inaccessible, 41.4 min avg transit delay, 0.62 disruption score.
- **Intervention Scenario (AI-Recommended Actions):** Arterial roads kept open, hospital access maintained, 24.6 min avg transit time, 0.32 disruption score.
- **Actual Computed Delta:** **48.4% Net Disruption Reduction**, keeping **4 arterial roads open**, saving **16.8 minutes of emergency transit delay**, and expanding emergency fleet coverage by **+38.0%**.

---

## 3. System Architecture

```
                                      +------------------------------------+
                                      |     CIVICTWIN AI ARCHITECTURE      |
                                      +------------------------------------+

     [ CLIENT LAYER: REACT 18 + TYPESCRIPT ]
     +----------------------------------------------------------------------------------------+
     |   Interactive 3D Digital Twin   |   MapLibre Vector GIS Map   |  Futuristic Command UI |
     |   (Three.js / React Three Fiber)|   (Chennai Offline GeoJSON) |  (Tailwind CSS / Glass)|
     +----------------------------------------------------------------------------------------+
                                                 │   ▲
                       REST Calls (Axios / Fetch)│   │WebSocket Live Telemetry Stream
                                                 ▼   │
     [ BACKEND SERVICES LAYER: FASTAPI + ASYNC ASGI ]
     +----------------------------------------------------------------------------------------+
     |  /auth  |  /dashboard  |  /geospatial  |  /simulations  |  /resources  |  /analytics   |
     +----------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
     [ AGENTIC MULTI-AGENT ORCHESTRATION ENGINE (8 AGENTS) ]
     +----------------------------------------------------------------------------------------+
     | 1. Weather Intelligence Agent       --> Meteorological Telemetry (Open-Meteo & Radar) |
     | 2. Urban Risk Prediction Agent      --> Hydrological ML Inference (Random Forest)     |
     | 3. Infrastructure Dependency Agent  --> Topology Graph Construction (NetworkX)        |
     | 4. Cascading Crisis Simulation Agent--> Multi-Tier Failure Chain Propagation          |
     | 5. Citizen Intelligence Agent       --> Spatial Deduplication (<300m Haversine)       |
     | 6. Emergency Resource Optimization  --> Google OR-Tools Vehicle Routing & Detours     |
     | 7. Explainability Agent             --> SHAP Surrogate Weights & Physical Rationale   |
     | 8. Supervisor Agent                 --> Municipal Governance & Human Approval Gates   |
     +----------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
     [ PERSISTENCE & ML LAYER ]
     +----------------------------------------------------------------------------------------+
     |   PostgreSQL / PostGIS (Prod)   |   Trained ML Model   |   ReportLab PDF & CSV Engine   |
     |   SQLite Local Fallback         |   (RF: 89.6% Acc)    |   (Binary Scenario Exports)    |
     +----------------------------------------------------------------------------------------+
```

---

## 4. Core Features & Modules

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **Public Landing Page** | `/` | Animated logo, interactive 3D hero city, problem/solution, 1-click demo entry |
| **Command Centre** | `/app/command-centre` | High-level municipal KPIs, risk distribution gauges, live alert ticker, recent activity stream |
| **3D Digital Twin** | `/app/digital-twin` | Three.js procedural city model, dynamic flood elevation slider, building markers, layer toggles |
| **Predictive Risk Map** | `/app/risk-map` | MapLibre GL JS vector map with 6 Chennai zones, vulnerability coloring, offline GeoJSON |
| **AI Agent Control Centre** | `/app/agents` | 8-Agent operational cards, real-time WebSocket telemetry, active thinking indicators |
| **Crisis Simulation Lab** | `/app/simulation-lab` | Scenario triggers (A: Monsoon, B: Road disruption, C: Substation outage), cascade tree |
| **Prevention Comparator** | `/app/prevention-comparator` | Side-by-side counterfactual evaluator showing calculated 48.4% disruption reduction |
| **Emergency Resource Planner**| `/app/resource-planner`| OR-Tools fleet allocation (ambulances, boats, pumps) & dynamic flood detour routes |
| **Citizen Reporting Portal** | `/app/citizen-reporting` | Report submission form, photo preview, and Haversine spatial deduplication (<300m) |
| **Weather Intelligence** | `/app/weather` | Open-Meteo telemetry, 7-day forecast, precipitation probability, sensor mesh health |
| **Infrastructure Monitoring** | `/app/infrastructure` | Live operational statuses of hospitals, 230kV substations, and stormwater sluice pumps |
| **Explainable AI Center** | `/app/explainable-ai` | Global feature importances, local SHAP waterfall bars, and natural language rationale |
| **Alerts & Notifications** | `/app/alerts` | Prioritized crisis alerts with acknowledge/dismiss actions and real-time badges |
| **Analytics & Reports** | `/app/analytics` | Confusion matrix, ROC curves, ReportLab binary PDF export, and dynamic simulation CSV |
| **Project Architecture** | `/app/architecture` | Interactive system architecture diagram, monorepo breakdown, technology stack overview |
| **Settings & Data Sources** | `/app/settings` | API URL configuration, offline fallback toggles, and telemetry refresh intervals |
| **User Profile** | `/app/profile` | Active session details, role badges, and permission matrix display (5 roles) |
| **About Project** | `/app/about` | BUILDFEST 2026 competition metadata, developer bio, and social impact statement |

---

## 5. Machine Learning Evaluation Metrics

Trained on 2,500 samples of Chennai urban hydrological parameters (`CivicTwin-RF-v1.0`):

```
+-----------------------------------------------------------------------------------------+
| METRIC                       | EVALUATED SCORE | BASELINE BENCHMARK | NET UPLIFT        |
+-----------------------------------------------------------------------------------------+
| Accuracy                     | 89.60%          | 70.08% (Dummy)     | +19.52%           |
| Precision (Flood Event)      | 82.11%          | --                 | High Reliability  |
| Recall (Flood Event)         | 83.42%          | --                 | Low False Negative|
| F1 Score                     | 82.76%          | --                 | Balanced Class    |
| ROC-AUC Score                | 0.9459          | 0.5000 (Random)    | Exceptional       |
| Inference Latency            | < 18 ms         | --                 | Real-time Serving |
+-----------------------------------------------------------------------------------------+
```

### Feature Importance Weights
1. `rainfall_intensity_mmh`: **34.80%**
2. `accumulated_rainfall_mm`: **32.08%**
3. `elevation_m`: **10.20%**
4. `distance_to_water_body_m`: **7.40%**
5. `drainage_maintenance_score`: **5.88%**
6. `drainage_capacity_mmh`: **4.37%**
7. `impervious_surface_ratio`: **3.78%**
8. `historical_flood_events`: **1.49%**

---

## 6. Demonstration Accounts & Judge Access

Judges can explore the platform immediately without mandatory registration:

| Role | Username | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Demo Viewer (Judges)** | `demo` | `DemoViewer@2026` | Read-only access to all 18 views, 3D twin, simulations, and exports |
| **Municipal Operator** | `operator` | `Operator@Civic2026` | Trigger simulations, approve preventive actions, acknowledge alerts |
| **Emergency Coordinator**| `coordinator` | `Rescue@Civic2026` | Dispatch emergency fleets, formulate detour routes, manage incidents |
| **Administrator** | `admin` | `Admin@Civic2026` | System configurations, user role management, data source settings |
| **Citizen** | `citizen` | `Citizen@Civic2026` | Submit localized flood reports, view neighborhood safety advisories |

> [!TIP]
> **1-Click Guided Demo:** Evaluators can click the **"1-Click Guided Demo"** button on the top navigation bar to launch an interactive, 4-step guided walkthrough across the 3D Digital Twin, Cascade Engine, Impact Comparator, and Multi-Agent Controller.

---

## 7. Quick Installation & Local Setup

### Prerequisites
- Node.js `18.x` or higher
- Python `3.10` or higher
- Windows PowerShell, macOS Terminal, or Linux Bash

### Step 1: Clone Repository
```bash
git clone https://github.com/sathiyanarayanan-2008/civictwin-ai.git
cd civictwin-ai
```

### Step 2: Backend Setup
```powershell
cd backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate       # On Linux/macOS: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Backend API will be running at `http://127.0.0.1:8000`. Swagger documentation available at `http://127.0.0.1:8000/docs`.

### Step 3: Frontend Setup
In a new terminal window:
```powershell
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend application will be accessible at `http://localhost:5173`.

---

## 8. Automated Testing & Production Build

### Running Backend Unit & Integration Tests
```powershell
cd backend
.\venv\Scripts\python.exe -m pytest tests/ -v
```
*Result: 9 passed in 6.28s across auth, ML engines, simulation reproducibility, and health endpoints.*

### Running Frontend Production Build
```powershell
cd frontend
npm run build
```
*Result: Compiles cleanly with zero TypeScript errors into `dist/` in 28.6s.*

---

## 9. Official BUILDFEST 2026 Submission Package

The complete documentation package is available in the [`SUBMISSION/`](SUBMISSION/) directory:
- [`PROJECT_ABSTRACT.md`](SUBMISSION/PROJECT_ABSTRACT.md) — Academic abstract based on verified capabilities.
- [`PROJECT_DESCRIPTION.md`](SUBMISSION/PROJECT_DESCRIPTION.md) — Full Learnix Labs problem & solution description.
- [`NOVELTY.md`](SUBMISSION/NOVELTY.md) — Technical breakdown of innovation and differentiators.
- [`TECHNOLOGY_STACK.md`](SUBMISSION/TECHNOLOGY_STACK.md) — Version locks, architectural roles, and justifications.
- [`DEPLOYMENT_GUIDE.md`](SUBMISSION/DEPLOYMENT_GUIDE.md) — Step-by-step PowerShell guide for Vercel and Render deployment.
- [`DEMO_VIDEO_SCRIPT.md`](SUBMISSION/DEMO_VIDEO_SCRIPT.md) — Timed 3-minute video script with visual cues and narration.
- [`FINAL_TEST_REPORT.md`](SUBMISSION/FINAL_TEST_REPORT.md) — Full QA audit report with pass/fail matrices and error logs.
- [`SUBMISSION_CHECKLIST.md`](SUBMISSION/SUBMISSION_CHECKLIST.md) — Pre-flight compliance verification checklist.
- [`screenshots/`](SUBMISSION/screenshots/) — 20 actual high-resolution screenshots of the working platform.

---

## 10. License & Credits

Distributed under the **MIT License**. See `LICENSE` for details.

Developed for **BUILDFEST 2026** by Learnix Labs.  
**Developer:** Sathiya Narayanan V S (Department of Information Technology, Easwari Engineering College, Chennai).
