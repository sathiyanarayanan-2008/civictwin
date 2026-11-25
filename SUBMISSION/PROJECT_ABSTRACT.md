# CIVICTWIN AI — PROJECT ABSTRACT

**Project ID:** BF26-CIVICTWIN-AI  
**Competition:** BUILDFEST 2026 — National Student Hackathon by Learnix Labs  
**Domain:** Artificial Intelligence & Machine Learning  
**Participation Type:** Individual  
**Developer:** Sathiya Narayanan V S  
**Institution:** Easwari Engineering College  
**Department:** Department of Information Technology  
**Demonstration City:** Chennai, Tamil Nadu, India  

---

### Abstract

Urban flood and infrastructure management systems in developing coastal megacities are overwhelmingly reactive, monitoring inundation, road closures, and power outages only after critical failure thresholds are breached. In emergency settings, uncoordinated failures cascade rapidly across interlinked infrastructure—for example, severe rainfall leading to canal overflow, cutting arterial road access to trauma hospitals, and inundating un-sandbagged electrical substations powering dewatering pumps. 

**CivicTwin AI** introduces an agentic AI-powered predictive digital twin for urban crisis prevention, demonstrated on Chennai, Tamil Nadu, India. Moving beyond static dashboards and chatbot wrappers, CivicTwin AI implements a **Cascading Crisis Intelligence Engine** powered by a directed NetworkX urban dependency graph and an 8-agent sequential orchestration pipeline inspired by LangGraph principles. 

The system integrates live meteorological telemetry from Open-Meteo with local offline fallbacks, terrain elevation deficit models, and an empirical hydrological Random Forest classifier (`CivicTwin-RF-v1.0`) trained on 2,500 samples. The model achieves an evaluated **accuracy of 89.60%, precision of 82.11%, recall of 83.42%, F1 score of 82.76%, and ROC-AUC of 0.9459**, delivering predictions with sub-18ms inference latency.

The platform's primary innovation is the **Prevention Impact Comparator**, which computes real counterfactual differences between unmitigated crisis baselines and proactive municipal interventions. In simulated high-risk monsoon events (95 mm/hr surge), AI-recommended pre-emptive actions—such as staging mobile dewatering pumps at critical culverts, executing arterial contraflow diversions, and sandbagging power substations—demonstrate an actual computed **48.4% reduction in overall disruption score**, keeping **4 arterial roads open**, preserving **MIOT International Hospital** emergency access, and cutting modeled emergency transit delays by **16.8 minutes** while expanding fleet coverage by **+38.0%**. 

Emergency vehicle dispatch is optimized using **Google OR-Tools** constrained vehicle routing, dynamically calculating detour routes around inundated segments. Crowdsourced citizen incident reports undergo Haversine spatial deduplication (<300m threshold) and multi-report clustering. Model reasoning is rendered fully transparent through tree-based SHAP surrogate contributions and plain-language engineering explanations. 

The entire stack is production-built using React 18, TypeScript, Three.js, React Three Fiber, MapLibre GL JS, FastAPI, and SQLAlchemy (PostgreSQL/PostGIS/SQLite), operating without mandatory registration or paid third-party API dependencies.

**Keywords:** Urban Digital Twin, Agentic AI, Cascading Crisis Simulation, Disaster Prevention, Explainable AI (XAI), Operations Research, Geospatial Intelligence, Smart Cities.
