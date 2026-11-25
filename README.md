# CivicTwin AI

**Agentic AI-Powered Predictive Digital Twin for Urban Crisis Prevention**  
*Tagline: Predict. Prevent. Protect.*  

- **Project ID:** BF26-CIVICTWIN-AI  
- **Competition:** BUILDFEST 2026 — National Student Hackathon by Learnix Labs  
- **Domain:** Artificial Intelligence & Machine Learning  
- **Participation:** Individual  
- **Developer:** Sathiya Narayanan V S  
- **Institution:** Easwari Engineering College  
- **Department:** Information Technology  

---

## 1. Executive Overview

CivicTwin AI is a simulation-driven, agentic decision-support ecosystem for modern cities. Using Chennai, Tamil Nadu, India as the primary demonstration city, the application integrates meteorological radar telemetry, digital terrain elevation models (DEM), and infrastructure topologies to anticipate cascading secondary failures and compute optimized preventive interventions.

### Key Differentiators:
- **Cascading Crisis Intelligence Engine:** Evaluates multi-tier failure propagation using NetworkX directed dependency graphs (e.g., Rainfall -> Canal overflow -> Substation trip -> Pump failure -> Road closure -> Hospital access severance).
- **Prevention Impact Comparator:** Side-by-side counterfactual evaluator demonstrating a **62.1% net reduction** in urban disruption, with zero hospitals isolated.
- **8-Agent Multi-Agent Architecture:** Staged collaborative workflow executing real data engineering and mathematical tools without requiring paid API keys.
- **Interactive 3D & 2D Geospatial Twin:** Three.js / React Three Fiber procedural city paired with MapLibre GL JS featuring offline-resilient bundled GeoJSON fallbacks.
- **Human-in-the-Loop Governance:** Mandatory approval gates for all consequential emergency vehicle dispatches.

---

## 2. Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber, MapLibre GL JS, Recharts, Zustand, Lucide React.
- **Backend:** Python 3.11+, FastAPI, Uvicorn, Pydantic v2, SQLAlchemy, NetworkX, Scikit-Learn, ReportLab.
- **Database:** PostgreSQL/PostGIS in production deployment, with transparent SQLite local fallback.
- **Testing:** Pytest (Backend, 9 passed), Vitest / TypeScript verification (Frontend).

---

## 3. Quick Startup Instructions

### Method A: Docker Compose Startup
```bash
docker-compose up --build -d
```
- Frontend UI: `http://localhost:3000`
- Backend API Docs: `http://localhost:8000/docs`

---

### Method B: Local Execution Without Docker (Windows & Linux)

#### 1. Backend Server:
```powershell
cd backend
.\venv\Scripts\activate
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API will run at `http://127.0.0.1:8000`.

#### 2. Frontend Application:
```powershell
cd frontend
npm run dev
```
Application will run at `http://localhost:5173`.

---

## 4. Default Demonstration Roles

- **Demo Viewer (Judges):** Username: `demo`, Password: `DemoViewer@2026`
- **Administrator:** Username: `admin`, Password: `Admin@Civic2026`
- **Municipal Operator:** Username: `operator`, Password: `Operator@Civic2026`
- **Emergency Coordinator:** Username: `coordinator`, Password: `Rescue@Civic2026`
- **Citizen Access:** Username: `citizen`, Password: `Citizen@Civic2026`

---

## 5. Machine Learning Evaluation

Trained on synthetic Chennai hydrological records ($N = 2,500$):
- **Accuracy:** 89.60%
- **Precision:** 82.11%
- **Recall:** 83.42%
- **F1-Score:** 0.8276
- **ROC-AUC:** 0.9459
- **Top Feature Contributions:** Rainfall intensity (34.8%), Accumulated 24h rainfall (32.1%), Terrain elevation (10.2%).
