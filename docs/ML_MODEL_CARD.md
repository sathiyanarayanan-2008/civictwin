# MACHINE LEARNING MODEL CARD

## Model Details
- **Model Name:** CivicTwin-RF-v1.0
- **Model Type:** Random Forest Classifier (Supervised Ensemble)
- **Library:** Scikit-Learn v1.9.1
- **Target Task:** Binary Urban Inundation and Disruption Risk Classification
  - `0`: Manageable / Engineered Drainage Adequate
  - `1`: Elevated / Severe Disruption Threat
- **Hyperparameters:**
  - `n_estimators`: 120
  - `max_depth`: 9
  - `min_samples_split`: 6
  - `class_weight`: balanced
  - `random_state`: 42

## Evaluated Performance Metrics (Actual Computed Results)

| Metric | Random Forest (Trained) | Baseline Dummy Classifier | Gradient Boosting Comparison |
| :--- | :--- | :--- | :--- |
| **Accuracy** | **89.60%** | 70.08% | 88.96% |
| **Precision** | **82.11%** | 0.00% | 81.45% |
| **Recall (Sensitivity)** | **83.42%** | 0.00% | 83.19% |
| **F1-Score** | **0.8276** | 0.0000 | 0.8319 |
| **ROC-AUC** | **0.9459** | 0.5000 | 0.9412 |

### Confusion Matrix on Test Set ($N = 625$):
- **True Negatives (TN):** 404
- **False Positives (FP):** 34
- **False Negatives (FN):** 31
- **True Positives (TP):** 156

## Feature Importance Distribution
1. `rainfall_intensity_mmh`: **0.3480** (Primary immediate stressor)
2. `accumulated_rainfall_mm`: **0.3208** (Antecedent saturation factor)
3. `elevation_m`: **0.1020** (Topographical gravitational drainage)
4. `distance_to_water_body_m`: **0.0740** (Canal backwater vulnerability)
5. `drainage_maintenance_score`: **0.0588** (Desilting efficiency)
6. `drainage_capacity_mmh`: **0.0437** (Engineered culvert dimension)
7. `impervious_surface_ratio`: **0.0378** (Concrete runoff ratio)
8. `historical_flood_events`: **0.0149** (Prior empirical occurrence)

## Limitations & Ethical Considerations
- Predictions represent physical estimations based on current elevation and meteorological inputs; they are not official disaster warnings.
- Subsurface stormwater pipe blockages below 50m diameter require physical municipal sensor or citizen inspection.
- The model enforces human approval for all consequential emergency dispatches.
