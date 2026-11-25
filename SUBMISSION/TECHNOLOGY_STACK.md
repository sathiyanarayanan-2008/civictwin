# CIVICTWIN AI — TECHNOLOGY STACK SPECIFICATION

**Project ID:** BF26-CIVICTWIN-AI  
**Competition:** BUILDFEST 2026 — Learnix Labs  
**Developer:** Sathiya Narayanan V S (Easwari Engineering College)  

---

## 1. ARCHITECTURAL OVERVIEW

CivicTwin AI is built as a unified, production-oriented monorepo separating high-performance client rendering, asynchronous multi-agent backend services, geospatial intelligence, and machine learning models.

```
civictwin-ai/
├── frontend/             # React 18 + Vite + Three.js + MapLibre GL JS + Tailwind
├── backend/              # FastAPI + 8 AI Agents + NetworkX + Scikit-Learn + SQLAlchemy
├── datasets/             # Chennai geospatial vectors, elevation GeoJSON, ML training sets
├── scripts/              # Automated audit scripts, Playwright test suite, verification tools
├── docs/                 # Documentation, architectural schemas, application screenshots
├── SUBMISSION/           # BUILDFEST 2026 Official Submission Package
└── deployment/           # Docker Compose, Render blueprints, Vercel configuration
```

---

## 2. FRONTEND TECHNOLOGY STACK

| Technology / Library | Version | Role in CivicTwin AI | Justification & Architectural Benefit |
| :--- | :--- | :--- | :--- |
| **React** | `^18.2.0` | Core UI Component Framework | Declarative component hierarchy, concurrent rendering, rich ecosystem |
| **TypeScript** | `^5.2.2` | Static Type Contract & Safety | Eliminates runtime type errors across complex simulation state structures |
| **Vite** | `^5.1.6` | Frontend Build Tool & Dev Server | Sub-second HMR, optimized production tree-shaking and chunking |
| **Three.js** | `^0.163.0` | WebGL 3D Graphics Engine | Powers real-time procedural 3D digital twin of Chennai cityscape |
| **@react-three/fiber** | `^8.16.1` | React Declarative Wrapper for Three.js | Seamlessly binds 3D canvas objects to React state and props |
| **@react-three/drei** | `^9.102.6` | 3D Helpers & Camera Controls | Provides OrbitControls, skyboxes, shadows, and camera damping |
| **MapLibre GL JS** | `^4.1.1` | Open-Source Vector GIS Mapping | High-performance WebGL vector tiles, multi-zone polygons, 0 paid API cost |
| **Tailwind CSS** | `^3.4.1` | Utility-First Styling System | Command-center dark theme (`#060B1A`, `#06D6EF`), neon borders, liquid glass |
| **Framer Motion** | `^11.0.24` | Hardware-Accelerated Animations | Smooth page transitions, modal slides, animated numerical counters |
| **Recharts** | `^2.12.3` | SVG Data Visualizations | Responsive rainfall radars, risk distribution gauges, ROC & confusion curves |
| **Zustand** | `^4.5.2` | Global Reactive State Store | Ultra-lightweight state for active scenario, layer toggles, and user sessions |
| **@tanstack/react-query**| `^5.28.9`| Async Server State Management | Cache invalidation, query deduplication, background polling |
| **React Router** | `^6.22.3` | Client-Side SPA Navigation | Declarative routing across all 18 command center views |
| **Lucide React** | `^0.363.0` | Iconography System | Clean, accessible vector icons for command center controls and status badges |
| **canvas-confetti** | `^1.9.2` | Visual Micro-Interactions | Engaging feedback for successfully mitigating crisis scenarios |

---

## 3. BACKEND & AI TECHNOLOGY STACK

| Technology / Library | Version | Role in CivicTwin AI | Justification & Architectural Benefit |
| :--- | :--- | :--- | :--- |
| **Python** | `3.11+` | Core Backend Runtime | Stable, performant execution of scientific, ML, and asynchronous services |
| **FastAPI** | `>=0.110.0` | Async REST & WebSocket API Framework | High-throughput async routing, automatic OpenAPI/Swagger docs, Pydantic type validation |
| **Uvicorn** | `>=0.28.0` | ASGI Web Server | Lightning-fast async request serving with native WebSocket support |
| **Pydantic** | `>=2.6.0` | Request/Response Data Validation | Strict schema validation, automatic serialization, and error feedback |
| **SQLAlchemy** | `>=2.0.28` | Object-Relational Mapper (ORM) | Database-agnostic persistence supporting SQLite locally and PostgreSQL/PostGIS in production |
| **NetworkX** | `>=3.2.1` | Graph Data Structures & Algorithms | Builds directed infrastructure dependency graph and bounded cascade propagation algorithms |
| **Scikit-learn** | `>=1.4.0` | Machine Learning Inference Engine | Balanced Random Forest classifier (`CivicTwin-RF-v1.0`), evaluation metrics |
| **Pandas & NumPy** | `>=2.2.0, >=1.26.0` | Numerical & Hydrological Processing | High-efficiency tabular transformations, matrix runoff calculations |
| **ReportLab** | `>=4.1.0` | Native Binary PDF Document Generator | Generates formatted, downloadable crisis scenario PDF reports |
| **Passlib & Bcrypt** | `>=1.7.4, >=4.1.2` | Cryptographic Password Hashing | Secure password hashing, credential salt generation for RBAC |
| **Python-Jose** | `>=3.3.0` | JSON Web Token (JWT) Handling | Encodes and verifies secure HS256 authentication tokens |
| **HTTPX** | `>=0.27.0` | Asynchronous HTTP Client | Fetches external meteorological telemetry from Open-Meteo API |
| **WebSockets** | `>=12.0` | Real-Time Full-Duplex Event Streaming | Streams live agent execution steps and thinking telemetry to dashboard |
| **Playwright** | `^1.65.1` | Headless Browser Automation | End-to-end automated UI audits, screenshot captures, responsive verification |
| **Pytest** | `>=8.0.0` | Automated Backend Unit Test Suite | Validates auth, ML engines, simulation reproducibility, and API health |

---

## 4. DATABASE & STORAGE CONFIGURATION

- **Local Development / Evaluation Fallback:**
  - `SQLite 3` (`civictwin.db` via SQLAlchemy absolute pathing).
  - Pre-seeded with 5 user roles, 8 Chennai zones, 12 critical infrastructure nodes, 8 primary road arterials, and historical crisis records.
- **Production Public Deployment:**
  - `PostgreSQL 15+` with `PostGIS 3.3` spatial extension.
  - Connection pooling with automatic reconnection and retry logic.
  - Automatically initializes tables and default demonstration datasets upon startup.

---

## 5. HARDWARE & OPERATING ENVIRONMENT COMPATIBILITY

- **Operating Systems Supported:** Windows 10/11, macOS (Apple Silicon & Intel), Linux (Ubuntu 22.04 LTS, Debian, Alpine).
- **Node.js Compatibility:** Version `18.x`, `20.x`, `22.x`, and `24.x`.
- **Python Compatibility:** Python `3.10`, `3.11`, `3.12`, `3.13`.
- **Client Browser Requirements:** Any modern WebGL-compatible browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Brave). Hardware acceleration recommended for 3D digital twin rendering.
