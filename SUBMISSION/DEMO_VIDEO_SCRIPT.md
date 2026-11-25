# CIVICTWIN AI — 3-MINUTE HACKATHON DEMO VIDEO SCRIPT
**Competition:** BUILDFEST 2026 — Learnix Labs  
**Project ID:** BF26-CIVICTWIN-AI  
**Project:** CivicTwin AI — Predictive Digital Twin for Urban Crisis Prevention  
**Target Duration:** Exactly 3 Minutes (180 Seconds)  
**Presenter:** Sathiya Narayanan V S (Easwari Engineering College)  

---

## VIDEO OVERVIEW TIMELINE

```
0:00 - 0:30  |  Hook & The Problem (Reactive vs Predictive)
0:30 - 1:10  |  The 3D Digital Twin & Predictive Risk Map
1:10 - 1:55  |  Cascading Crisis Simulation & Prevention Impact Comparator
1:55 - 2:35  |  Agentic AI Control Centre & OR-Tools Optimization
2:35 - 3:00  |  Explainable AI, Verification & Conclusion
```

---

## DETAILED RUNNING SCRIPT

### 0:00 – 0:30 | Hook & Problem Statement
- **Visual:** Open on the futuristic Landing Page (`/`). Animated SVG CivicTwin logo glows with cyan borders. Smoothly scroll past the hero section displaying *"The Future of Urban Crisis Prevention: Predict. Prevent. Protect."*
- **Audio / Voiceover:**
  > *"Respected judges, during catastrophic urban floods like those Chennai experienced in 2015 and Cyclone Michaung in 2023, modern cities face a critical vulnerability: our emergency systems are completely reactive. We monitor water levels after canals overflow. We divert traffic after roads are submerged. We discover hospitals cut off only when ambulances are stuck.*
  >
  > *My name is Sathiya Narayanan V S from Easwari Engineering College, and this is CivicTwin AI: an agentic AI-powered predictive digital twin engineered to shift urban crisis governance from reactive firefighting to predictive, simulation-driven crisis prevention."*
- **Action:** Click the glowing button **"Launch Command Centre"** to navigate into `/app/command-centre`.

---

### 0:30 – 1:10 | 3D Digital Twin & Predictive Risk Map
- **Visual:** Screen shows the Command Centre with live KPI counters, Chennai Doppler weather gauges, and alert ticker. Click **"3D Digital Twin"** (`/app/digital-twin`).
- **Audio / Voiceover:**
  > *"Here in the Command Centre, we integrate environmental telemetry, infrastructure records, and terrain topography. In our interactive Three.js 3D Digital Twin, judges can observe Chennai's critical infrastructure. 
  >
  > Watch as I adjust the flood elevation slider: the procedural water plane rises over low-lying areas in Velachery and Adyar, instantly illuminating vulnerable nodes with predictive risk halos.
  >
  > Switching to the Predictive Risk Map, our MapLibre vector GIS engine visualizes all six Chennai municipal zones. Because we engineered a local GeoJSON fallback, this map is 100% resilient and operates with zero blank screens, even completely offline."*
- **Action:** Drag flood slider in 3D view; navigate briefly to `/app/risk-map` to show Chennai zone polygons.

---

### 1:10 – 1:55 | Cascading Crisis Engine & Prevention Comparator
- **Visual:** Navigate to **Simulation Lab** (`/app/simulation-lab`), select **Scenario A: Monsoon Surge (95mm/h)**. Click **"Execute Cascade Simulation"**. The NetworkX dependency tree renders showing failure propagation.
- **Audio / Voiceover:**
  > *"The core innovation of CivicTwin AI is our Cascading Crisis Intelligence Engine. In urban disasters, failures cascade: heavy rainfall floods Velachery canal, which severs Mount-Poonamallee Road, which isolates the regional trauma centre at MIOT International Hospital.
  >
  > But predicting disaster is only half the battle. Let's open our Prevention Impact Comparator.
  >
  > Unlike static dashboards with hardcoded numbers, our engine runs a real counterfactual dual simulation: Baseline Crisis versus AI-Recommended Preventive Action.
  >
  > Look at the computed delta: by pre-deploying high-capacity mobile pumps and sandbagging the 230kV substation 90 minutes before peak rainfall, we achieve an actual 48.4% reduction in overall disruption score, keep 4 arterial roads open, and save 16.8 minutes of critical emergency travel time!"*
- **Action:** Click into `/app/prevention-comparator` and highlight the delta metric cards: *+4 Roads Saved, 16.8 min delay reduced, 48.4% improvement*.

---

### 1:55 – 2:35 | Agentic AI Control Centre & OR-Tools Optimization
- **Visual:** Switch to **AI Agent Control Centre** (`/app/agents`). Click **"Trigger Multi-Agent Analysis"**.
- **Audio / Voiceover:**
  > *"Behind this intelligence is an 8-Agent Orchestration Pipeline inspired by LangGraph. In sub-second time, our Weather, Risk ML, Infrastructure, Cascade, Citizen, Resource, XAI, and Supervisor agents collaborate over WebSockets.
  >
  > Moving to the Emergency Resource Planner, our Google OR-Tools optimization engine dispatches ambulances, rescue boats, and mobile dewatering pumps. 
  >
  > Notice the intelligent routing: when Mount-Poonamallee Road floods, the engine avoids sending ambulances into waterlogged traps, automatically generating turn-by-turn contraflow detours via Manapakkam Bridge."*
- **Action:** Navigate to `/app/resource-planner` and show the detour cards and fleet allocation table.

---

### 2:35 – 3:00 | Citizen Portal, Explainable AI & Closing
- **Visual:** Rapidly show **Explainable AI** (`/app/explainable-ai`) displaying SHAP feature weights, then the **Analytics & Reports** page clicking **"Download PDF Report"** (opens ReportLab generated PDF).
- **Audio / Voiceover:**
  > *"Every prediction is explainable. We display tree-based SHAP contributions and plain-language engineering rationales so municipal commissioners understand exactly why an alert was triggered.
  >
  > Our crowdsourced Citizen Portal features spatial deduplication within 300 meters, and instant ReportLab PDF scenario reports can be exported with one click.
  >
  > Built with React, TypeScript, FastAPI, and Scikit-learn, CivicTwin AI requires zero paid APIs, zero mandatory logins for judges, and has completed end-to-end automated testing with 100% pass rates.
  >
  > Predict. Prevent. Protect. Thank you!"*
- **Action:** Show the downloaded PDF, end on the Project Architecture page (`/app/architecture`).

---

## RECORDING TIPS FOR THE PRESENTER
1. **Screen Resolution:** Record at 1920x1080 (1080p 60fps) using OBS Studio or Windows Game Bar (`Win + G`).
2. **Audio Quality:** Use a clean USB microphone or headset; avoid room echo.
3. **Cursor Visibility:** Enable cursor highlighting in OBS so evaluators can clearly follow where you click.
4. **Pacing:** Speak confidently at ~130–140 words per minute. Do not rush; let the UI animations finish naturally.
