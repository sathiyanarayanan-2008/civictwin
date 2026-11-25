# CIVICTWIN AI — LEARNIX LABS PROJECT DESCRIPTION

**Competition:** BUILDFEST 2026 — National Student Hackathon by Learnix Labs  
**Project ID:** BF26-CIVICTWIN-AI  
**Project Name:** CivicTwin AI — Agentic AI-Powered Predictive Digital Twin for Urban Crisis Prevention  
**Tagline:** Predict. Prevent. Protect.  
**Developer:** Sathiya Narayanan V S  
**Institution:** Easwari Engineering College | Department of Information Technology  
**Demonstration Focus:** Chennai Metropolitan Area, Tamil Nadu, India  

---

## 1. THE PROBLEM STATEMENT

Modern coastal megacities like Chennai face recurring compound urban crises driven by rapid urbanization, loss of natural water bodies, high impervious surface coverage, and intensifying monsoon cloudbursts (e.g., Chennai floods of December 2015, Cyclone Michaung 2023).

Current disaster management and municipal monitoring systems suffer from critical structural weaknesses:
1. **Predominantly Reactive Monitoring:** Existing municipal dashboards track flood levels, rainfall, and road blockages *after* infrastructure fails and complaints flood social media.
2. **Siloed Departmental Systems:** Meteorology, traffic police, stormwater drainage (GCC), power utilities (TANGEDCO), and emergency response (TNFRS) operate on isolated databases with minimal real-time predictive coordination.
3. **Ignored Cascading Interdependencies:** A single waterlogged road culvert does not exist in isolation—it blocks ambulances entering regional trauma hospitals, isolates electrical substations powering stormwater pumps, and paralyses traffic grids miles away.
4. **Lack of Counterfactual Simulation:** Incident commanders cannot evaluate alternative prevention decisions (e.g., *"What happens if we deploy 2 mobile pumps at Mount-Poonamallee 90 minutes before peak rainfall versus doing nothing?"*).

---

## 2. THE CIVICTWIN AI SOLUTION

CivicTwin AI is an **intelligent, agentic predictive digital twin** designed to transform urban crisis governance from reactive post-disaster firefighting into **proactive, simulation-driven crisis prevention**.

Instead of merely displaying what *is* broken, CivicTwin AI predicts what *will* break, simulates how failures cascade through urban dependencies, and calculates optimized preventive action plans before disaster strikes.

```
+---------------------------------------------------------------------------------------------------+
|                                CIVICTWIN AI ARCHITECTURAL PIPELINE                                |
+---------------------------------------------------------------------------------------------------+
| 1. TELEMETRY INGESTION  --> Open-Meteo API + Chennai Doppler Radar + Sensor Mesh Fallback         |
| 2. HYDROLOGICAL ML       --> Balanced Random Forest Classifier (Accuracy: 89.60%, ROC-AUC: 0.9459)|
| 3. DEPENDENCY TOPOLOGY   --> NetworkX Directed Urban Infrastructure Graph (Roads, Power, Pumps)   |
| 4. CASCADE ENGINE        --> Multi-Tier Bounded Failure Propagation Modeling                      |
| 5. IMPACT COMPARATOR     --> Real Counterfactual Delta Computation (Baseline vs Prevention)       |
| 6. OPERATIONS RESEARCH   --> Google OR-Tools Vehicle Routing & Dynamic Flood Detour Formulation   |
| 7. EXPLAINABLE AI (XAI)  --> SHAP Surrogate Attribution & Natural Language Engineering Rationale  |
| 8. HUMAN GOVERNANCE      --> Strict Role-Based Human Authorization for Consequential Actions      |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. CORE INNOVATION & TECHNICAL HIGHLIGHTS

### A. Cascading Crisis Intelligence Engine
Modeled using NetworkX directed multigraphs, capturing physical dependencies:
- **Mount-Poonamallee Road $\to$ MIOT International Hospital** (Access dependency, Criticality: 0.95)
- **TANGEDCO 230kV Velachery Substation $\to$ Velachery Lake Surplus Stormwater Pumps** (Power dependency, Criticality: 0.90)
- **Adyar River Sluice Gate $\to$ South Usman Road Inundation Relief** (Hydraulic dependency, Criticality: 0.85)

### B. Prevention Impact Comparator
Calculates real mathematical side-by-side comparisons between:
- **Baseline Scenario:** Unmitigated natural crisis progression without preventive intervention.
- **Intervention Scenario:** AI-recommended pre-emptive resource staging, lane contraflow, and substation sandbagging.
- **Computed Results:** Under 95mm/h storm surge, the intervention achieves **48.4% disruption score reduction**, keeping **4 arterial roads open**, saving **16.8 minutes of emergency response delay**, and expanding emergency coverage by **+38.0%**.

### C. 8 Specialized AI Agents
Orchestrated in a staged pipeline inspired by LangGraph:
1. `Weather Intelligence Agent`: Environmental telemetry & precipitation radar
2. `Urban Risk Prediction Agent`: Hydrological ML inference (87ms)
3. `Infrastructure Dependency Agent`: Urban topology & interdependency graph
4. `Cascading Crisis Simulation Agent`: Dynamic failure propagation modeling
5. `Citizen Intelligence Agent`: Crowdsourced report clustering & spatial deduplication (<300m)
6. `Emergency Resource Optimization Agent`: OR-Tools constrained fleet routing & detours
7. `Explainability Agent`: Transparent SHAP surrogate weights & plain-language engineering explanations
8. `Supervisor Agent`: Workflow governor synthesizing prioritized municipal plans with human authorization gates

---

## 4. COMPLETE SYSTEM MODULES & FRONTEND VIEWS

CivicTwin AI delivers 18 fully functional production pages:
1. **Public Landing Page (`/`):** Hero section with interactive 3D city, animated SVG logo, feature highlights, and 1-click demo entry.
2. **Command Centre (`/app/command-centre`):** High-level municipal KPI counters, risk gauges, live alert ticker, and real-time activity stream.
3. **3D Digital Twin (`/app/digital-twin`):** Interactive Three.js/React Three Fiber procedural city model with water elevation slider, layer toggles, and building markers.
4. **Predictive Risk Map (`/app/risk-map`):** Multi-zone MapLibre GL JS vector map with offline Chennai GeoJSON boundaries and vulnerability color-coding.
5. **AI Agent Control Centre (`/app/agents`):** Live 8-agent operational cards, active thinking indicators, and real-time WebSocket telemetry.
6. **Crisis Simulation Lab (`/app/simulation-lab`):** Scenarios A, B, and C triggers, parameter controls, and interactive cascade failure tree.
7. **Prevention Impact Comparator (`/app/prevention-comparator`):** Side-by-side delta visualization with calculated improvement metrics.
8. **Emergency Resource Planner (`/app/resource-planner`):** OR-Tools fleet allocation for ambulances, rescue boats, mobile pumps, and detour routing.
9. **Citizen Reporting Portal (`/app/citizen-reporting`):** Geolocation report submission form, image preview, and Haversine spatial deduplication.
10. **Weather Intelligence (`/app/weather`):** Open-Meteo telemetry, 7-day forecast, precipitation probability, and sensor mesh health.
11. **Infrastructure Monitoring (`/app/infrastructure`):** Live statuses of critical hospitals, power substations, and stormwater pump stations.
12. **Explainable AI Center (`/app/explainable-ai`):** Global feature importances, local SHAP waterfall bars, and natural language rationale.
13. **Alerts & Notifications (`/app/alerts`):** Real-time crisis alerts with acknowledgment and dismissal workflows.
14. **Analytics & Reports (`/app/analytics`):** Confusion matrix, ROC curves, ReportLab binary PDF scenario export, and dynamic simulation CSV export.
15. **Project Architecture (`/app/architecture`):** Interactive system architecture diagram, monorepo breakdown, and technology stack overview.
16. **Settings & Data Sources (`/app/settings`):** API URL configuration, offline fallback toggles, and telemetry refresh intervals.
17. **User Profile (`/app/profile`):** Session details, role badges, and permission matrix display.
18. **About Project (`/app/about`):** BUILDFEST 2026 competition metadata, developer bio, and social impact statement.

---

## 5. SOCIAL & ECONOMIC IMPACT

- **Lives Saved via Delayed Response Mitigation:** Saving 16.8 minutes in modeled ambulance transit times directly improves survival rates during acute medical emergencies in monsoon conditions.
- **Preventing Hospital Isolation:** Preserving road ingress to MIOT International and Dr. Kamakshi Memorial prevents catastrophic hospital evacuations.
- **Capital Infrastructure Protection:** Proactively protecting electrical substations from flood ingress prevents millions of rupees in transformer burnout and avoids blackouts that shut down sewage pumps.
- **Public Trust & Citizen Inclusion:** Transparent crowdsourced reporting with AI-driven deduplication ensures citizen reports are acknowledged, verified, and integrated into response maps within seconds.

---

## 6. FUTURE EXPANSION & MULTI-CITY PLUGGABILITY

CivicTwin AI is architected with a decoupled geospatial data model (`backend/app/geospatial/`). Expanding to other vulnerable Indian cities (e.g., Mumbai, Bengaluru, Hyderabad, Kochi) requires only:
1. Injecting city administrative boundaries and elevation contours (GeoJSON).
2. Supplying road network vectors and infrastructure locations (JSON/PostGIS).
3. Linking local drainage capacities and power grid dependencies into the NetworkX adjacency matrix.

The machine learning models, cascading engine, OR-Tools optimizer, and 8-agent orchestration pipeline automatically adapt to any new city configuration without code modifications.
