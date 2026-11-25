# PROJECT ABSTRACT — CIVICTWIN AI

**Project Title:** CivicTwin AI — Agentic AI-Powered Predictive Digital Twin for Urban Crisis Prevention  
**Tagline:** Predict. Prevent. Protect.  
**Project ID:** BF26-CIVICTWIN-AI  
**Competition:** BUILDFEST 2026 — National Student Hackathon by Learnix Labs  
**Domain:** Artificial Intelligence & Machine Learning  
**Participation:** Individual  
**Developer:** Sathiya Narayanan V S  
**Institution:** Easwari Engineering College  
**Department:** Information Technology  

---

## Abstract

Modern metropolitan areas suffer recurring systemic disruptions driven by extreme climate events, rapid uncoordinated urbanization, and fragile infrastructure interdependencies. During monsoonal cloudbursts, localized waterlogging quickly escalates into arterial road closures, paralysis of transit networks, inundation of power substations, cutoff of primary hospital ambulance ingress corridors, and life-threatening delays in emergency medical response.

Conventional municipal disaster management operations are fundamentally **reactive**: sensors and emergency call centers alert authorities only *after* damage has occurred. Furthermore, existing smart city dashboards monitor sectors in departmental silos, failing to anticipate how a single point of failure (such as a flooded stormwater pump substation) triggers cascading secondary breakdowns across transportation and healthcare networks.

**CivicTwin AI** addresses this paradigm limitation by transitioning urban crisis management from *reactive emergency monitoring* to *predictive, simulation-driven, agentic prevention*. Using **Chennai, Tamil Nadu, India** as the primary demonstration city, CivicTwin AI integrates environmental precipitation telemetry (Open-Meteo Doppler radar), digital elevation models (DEM), topological road networks, and infrastructure dependency graphs into a connected 3D WebGL and 2D geospatial digital twin.

At the core of the system is the **Cascading Crisis Intelligence Engine**, which constructs a directed graph of urban assets using NetworkX and executes a bounded failure propagation algorithm. An 8-Agent collaborative multi-agent architecture coordinates meteorological validation, Random Forest hydrological risk inference (89.6% validated accuracy, 0.945 ROC-AUC), crowdsourced citizen report deduplication, and Google OR-Tools constrained fleet allocation.

To prove real-world decision utility, CivicTwin AI features a **Prevention Impact Comparator** that evaluates counterfactual scenarios:
- **Baseline (No Action):** 4 arterial roads severed, 2 critical trauma hospitals isolated, emergency transit delay of 28.8 minutes.
- **CivicTwin AI Preventive Plan:** Pre-staging 2 mobile de-watering pumps and establishing an emergency blue contraflow lane on Anna Salai preserves hospital access, reduces transit delay to 14.2 minutes, and mitigates **62.1% of overall urban disruption**.

All consequential emergency recommendations enforce a mandatory **Human-in-the-Loop Governance Gate**, guaranteeing that no real-world dispatch occurs without verified municipal coordinator authorization. Built using FastAPI, PostgreSQL/PostGIS (with local SQLite fallback), React, Three.js, and MapLibre GL, CivicTwin AI establishes a scalable, explainable, and production-ready decision-support blueprint for 21st-century climate-resilient cities.
