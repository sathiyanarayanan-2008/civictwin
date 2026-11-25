# BUILDFEST 2026 HACKATHON SUBMISSION DOSSIER

**Competition:** BUILDFEST 2026 — National Student Hackathon by Learnix Labs  
**Project ID:** BF26-CIVICTWIN-AI  
**Project Title:** CivicTwin AI — Agentic AI-Powered Predictive Digital Twin for Urban Crisis Prevention  
**Domain:** Artificial Intelligence & Machine Learning  
**Participation Mode:** Individual  
**Developer Name:** Sathiya Narayanan V S  
**Institution:** Easwari Engineering College  
**Department:** Information Technology  

---

## 1. Project Summary & Core Innovation

CivicTwin AI is an agentic, simulation-driven urban digital twin designed to transition municipal crisis management from reactive post-disaster response to predictive, simulation-driven prevention.

### Primary Innovation:
The **Cascading Crisis Intelligence Engine** models structural interdependencies between environmental triggers (cloudbursts), municipal drainage networks, power grids, road transit links, and critical healthcare facilities (hospitals and shelters).

### Quantitative Impact:
- **Disruption Reduction:** 62.1% reduction in modeled urban disruption score.
- **Healthcare Accessibility:** 100% preservation of critical trauma hospital ingress corridors under a 95 mm/hr monsoonal cloudburst scenario.
- **Emergency Travel Time Saved:** 14.6 minutes reduction in average ambulance response delay.
- **Model Accuracy:** 89.60% classification accuracy on test split ($N = 625$ records), with an ROC-AUC of 0.9459.

---

## 2. Technical Stack Verification

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber, MapLibre GL JS, Recharts, Zustand, Lucide React.
- **Backend:** Python 3.11+, FastAPI, Uvicorn, Pydantic v2, SQLAlchemy, NetworkX, Scikit-Learn, ReportLab.
- **Database:** PostgreSQL/PostGIS in production deployment, with a verified local SQLite fallback.
- **Multi-Agent Engine:** 8 collaborative agents (Weather, Risk, Topology, Cascade, Citizen, Resource, Explainability, Supervisor).

---

## 3. Submission Links & Showcase Instructions

> [!NOTE]
> Per BUILDFEST 2026 competition guidelines, the official project showcase URL is generated upon publishing through the Learnix Labs Project Portal.

- **GitHub Repository:** Configurable via repository settings (instructions provided in `README.md`).
- **Live Demo Credentials:** Accessible without mandatory registration using the seeded `Demo Viewer` role.
- **Automated Verification:** All 9 pytest suites passed with 0 failures; frontend production build verified in 15.40s.
