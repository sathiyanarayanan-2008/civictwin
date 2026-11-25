# CIVICTWIN AI — PUBLIC DEPLOYMENT & PUBLICATION MANUAL
**Project ID:** BF26-CIVICTWIN-AI  
**Competition:** BUILDFEST 2026 — Learnix Labs  
**Platform Target:** Vercel (Frontend) + Render (Backend & Optional PostgreSQL)  
**Shell Environment:** Windows PowerShell (pwsh / powershell.exe)  
**Developer:** Sathiya Narayanan V S (Easwari Engineering College)  

---

## 1. PRE-DEPLOYMENT VERIFICATION CHECKLIST

Before deploying publicly, ensure local health checks pass:
```powershell
# 1. Verify Backend tests pass (9/9)
cd "C:\Users\User\OneDrive\Desktop\civic twin\backend"
.\venv\Scripts\python.exe -m pytest tests/ -v

# 2. Verify Frontend builds cleanly with zero TypeScript errors
cd "C:\Users\User\OneDrive\Desktop\civic twin\frontend"
npm run build
```

---

## 2. REPOSITORY & CREDENTIALS AUDIT

1. **GitHub Remote URL:**
   The repository is connected and synced to:
   ```
   https://github.com/sathiyanarayanan-2008/civictwin.git
   ```
2. **Secrets Verification:**
   - `.gitignore` prevents `civictwin.db`, `.env`, `node_modules/`, and `venv/` from entering version control.
   - All production secrets are injected via hosting platform environment variables.

---

## 3. BACKEND DEPLOYMENT ON RENDER (FREE TIER)

Render provides free hosting for Python FastAPI services and free PostgreSQL databases.

### Option A: 1-Click Blueprint Deployment (`render.yaml`)
1. Log in to [Render](https://dashboard.render.com/) with your GitHub account.
2. In the Render Dashboard, click **New +** $\to$ **Blueprint**.
3. Select the repository: `sathiyanarayanan-2008/civictwin`.
4. Render will read `render.yaml` and configure:
   - **Service Name:** `civictwin-backend`
   - **Environment:** `Python 3.11`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Free Database:** `civictwin-db` (PostgreSQL)
5. Click **Apply**.
6. When deployment finishes, copy your backend URL:
   `https://civictwin-backend.onrender.com`

### Option B: Manual Web Service Deployment
1. Click **New +** $\to$ **Web Service**.
2. Connect `https://github.com/sathiyanarayanan-2008/civictwin.git`.
3. Set the following parameters:
   - **Name:** `civictwin-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** `Free`
4. Add the following **Environment Variables** in the Render settings:
   - `ENVIRONMENT` = `production`
   - `DEBUG` = `false`
   - `SECRET_KEY` = `civictwin-prod-super-secure-key-bf26-2026`
   - `DATABASE_URL` = (Leave blank to use pre-seeded SQLite fallback, or paste your PostgreSQL connection string)
5. Click **Deploy Web Service**.

> [!NOTE]
> Render free-tier services spin down after 15 minutes of inactivity. On the first request after idling, the cold start takes ~30-50 seconds. The pre-warmed ML model in `predict.py` executes sub-20ms inferences once awake.

---

## 4. FRONTEND DEPLOYMENT ON VERCEL (FREE TIER)

Vercel provides blazing-fast edge CDN hosting for Vite/React applications with automatic SSL.

### Option A: Deployment via Vercel Web Dashboard (Recommended)
1. Log in to [Vercel](https://vercel.com/) with your GitHub account.
2. Click **Add New...** $\to$ **Project**.
3. Import your repository: `sathiyanarayanan-2008/civictwin`.
4. Configure Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click *Edit* and select `frontend`.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Expand **Environment Variables** and enter:
   - `VITE_API_BASE_URL` = `https://<your-render-backend-name>.onrender.com/api/v1`
   - `VITE_WS_URL` = `wss://<your-render-backend-name>.onrender.com/api/v1/ws`
   - `VITE_DEFAULT_CITY` = `Chennai`
   - `VITE_ENABLE_3D_TWIN` = `true`
6. Click **Deploy**.
7. Vercel will build and deploy the site in ~30 seconds.
8. Copy your live website URL (e.g., `https://civictwin-ai.vercel.app`).

### Option B: Deployment via Vercel CLI (PowerShell)
```powershell
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Navigate to frontend folder
cd "C:\Users\User\OneDrive\Desktop\civic twin\frontend"

# Login to your Vercel account
vercel login

# Deploy production build
vercel --prod
```

---

## 5. POST-DEPLOYMENT SMOKE TESTS

Once both services are live, verify the public URLs in PowerShell or a web browser:

```powershell
# Replace with your actual Render URL
$BACKEND_URL = "https://civictwin-backend.onrender.com"

# 1. Test Health Endpoint
Invoke-RestMethod -Uri "$BACKEND_URL/health" -Method Get

# 2. Test ML Prediction Endpoint
$Body = @{
    rainfall_intensity_mmh = 95.0
    accumulated_rainfall_mm = 210.0
    elevation_m = 4.1
    drainage_capacity_mmh = 32.0
} | ConvertTo-Json

Invoke-RestMethod -Uri "$BACKEND_URL/api/v1/risk/predict" -Method Post -Body $Body -ContentType "application/json"

# 3. Test Prevention Impact Comparator
Invoke-RestMethod -Uri "$BACKEND_URL/api/v1/simulations/compare" -Method Post -Body "{}" -ContentType "application/json"
```

---

## 6. ACTIONS REQUIRING USER CREDENTIALS & APPROVAL

Per hackathon security and privacy guidelines, the assistant **cannot** enter your personal credentials or create external cloud accounts on your behalf. You must perform the following authentications directly:

1. **GitHub Account:**  
   Confirm repository visibility is set to **Public** on GitHub:  
   Navigate to `https://github.com/sathiyanarayanan-2008/civictwin/settings` $\to$ Change visibility to **Public**.
2. **Render Account Login:**  
   Sign in to [Render](https://dashboard.render.com/) with GitHub and authorize the `civictwin` repository.
3. **Vercel Account Login:**  
   Sign in to [Vercel](https://vercel.com/) with GitHub to import and host the `frontend/` directory.
4. **Learnix Labs Submission Portal:**  
   Log in to the **BUILDFEST 2026** portal using your registered student credentials.

---

## 7. FINAL SUBMISSION URLS FORMAT

When completing the Learnix Labs submission form, supply the three required URLs:

1. **GitHub Repository URL:**  
   `https://github.com/sathiyanarayanan-2008/civictwin.git`
2. **Public Live Demonstration URL:**  
   `https://<your-chosen-subdomain>.vercel.app`
3. **Learnix Labs Project Entry:**  
   Available under your student dashboard at [Learnix Labs BUILDFEST 2026 Portal](https://learnixlabs.com).
