# DEPLOYMENT GUIDE — CIVICTWIN AI

CivicTwin AI supports two straightforward deployment methods:

---

## Method A: Docker Compose Deployment (Recommended for Production)

### Prerequisites:
- Docker Desktop v24+
- Docker Compose v2+

### Commands:
```bash
# 1. Clone repository
git clone https://github.com/your-username/civictwin-ai.git
cd civictwin-ai

# 2. Build and launch all containers (PostGIS, Backend, Frontend)
docker-compose up --build -d

# 3. Check container health
docker-compose ps
```

### Endpoints:
- **Frontend Command Centre:** `http://localhost:3000`
- **FastAPI REST API:** `http://localhost:8000`
- **Interactive Swagger Docs:** `http://localhost:8000/docs`
- **PostgreSQL / PostGIS Database:** `localhost:5432`

---

## Method B: Local Startup Without Docker (Windows & Linux)

### 1. Backend Startup (Python 3.11+):
```powershell
# Open terminal in project root
cd backend

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate   # On Linux/macOS: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install email-validator

# Initialize and seed database
python app\database\init_db.py

# Start Uvicorn Server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Backend will be live at: `http://127.0.0.1:8000`

---

### 2. Frontend Startup (Node.js 18+):
```powershell
# Open second terminal in project root
cd frontend

# Install npm packages
npm install

# Start Vite Development Server
npm run dev
```
Frontend will be live at: `http://localhost:5173`

---

## Default Demonstration Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Demo Viewer (Judges)** | `demo` | `DemoViewer@2026` |
| **Administrator** | `admin` | `Admin@Civic2026` |
| **Municipal Operator** | `operator` | `Operator@Civic2026` |
| **Emergency Coordinator**| `coordinator` | `Rescue@Civic2026` |
| **Citizen Access** | `citizen` | `Citizen@Civic2026` |
