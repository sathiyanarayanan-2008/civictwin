# DATASET DOCUMENTATION & PROVENANCE

## 1. Dataset Overview

CivicTwin AI uses a reproducible, transparent dataset architecture centered on Chennai, Tamil Nadu, India.

- **Primary Focus:** Chennai Metropolitan Area (CMDA)
- **Geographic Bounds:** Latitude 12.91° N to 13.11° N, Longitude 80.08° E to 80.28° E
- **Total Urban Wards Represented:** 8 major vulnerable hydrological zones
- **Synthetic Training Records Generated:** 2,500 physical hydrological records

## 2. Feature Definitions & Hydrological Rationales

| Feature Name | Type | Range | Hydrological Physical Rationale |
| :--- | :--- | :--- | :--- |
| `rainfall_intensity_mmh` | Float | 0 – 180 mm/h | Rate of precipitation delivery from monsoonal depressions. |
| `accumulated_rainfall_mm` | Float | 0 – 450 mm | 24-hour antecedent rainfall saturating groundwater table. |
| `elevation_m` | Float | 2.5 – 24.0 m | Terrain height above Mean Sea Level (MSL) from DEM. |
| `drainage_capacity_mmh` | Float | 25 – 85 mm/h | Engineered stormwater channel maximum discharge capacity. |
| `impervious_surface_ratio` | Float | 0.0 – 1.0 | Proportion of asphalt/concrete preventing natural percolation. |
| `distance_to_water_body_m` | Float | 50 – 3500 m | Proximity to Adyar River, Cooum, or Velachery Lake. |
| `historical_flood_events` | Int | 0 – 10 events | Frequency of inundation during 2015, 2021, and 2023 cyclones. |
| `drainage_maintenance_score`| Float | 0.3 – 0.95 | Pre-monsoon municipal desilting index. |

## 3. Data Provenance & Open Data Attribution

1. **Weather Data:** Open-Meteo Weather API (`https://open-meteo.com/`) licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).
2. **Geospatial Basemap:** OpenStreetMap contributors (`https://www.openstreetmap.org/copyright`) licensed under the Open Database License (ODbL).
3. **Terrain & Elevation:** Inspired by public SRTM DEM data for Chennai coastal plains.
4. **Synthetic Flood Dataset:** Synthesized deterministically using Rational Runoff Formulation ($Q = C \times I \times A$) and seeded with `random_seed = 42`.
