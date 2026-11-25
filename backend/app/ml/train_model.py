"""
CivicTwin AI - Machine Learning Pipeline for Urban Flood Risk Prediction
Generates reproducible Chennai hydrological crisis dataset, trains Baseline,
Random Forest, and Gradient Boosting models, evaluates actual metrics,
calculates feature importance, and serializes the production model artifacts.
"""

import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.dummy import DummyClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix
)
import joblib

def generate_chennai_hydrological_dataset(n_samples: int = 2500, random_seed: int = 42) -> pd.DataFrame:
    """
    Generate synthetic hydrological and urban drainage dataset reflecting
    Chennai's terrain, rainfall intensities (monsoon depressions / cyclonic surges),
    soil imperviousness, and stormwater canal topologies.
    """
    np.random.seed(random_seed)

    # 1. Rainfall Intensity (mm/hr): Range 0 to 180 mm/hr
    rainfall_intensity = np.random.exponential(scale=35.0, size=n_samples)
    rainfall_intensity = np.clip(rainfall_intensity, 0.0, 180.0)

    # 2. Accumulated Rainfall over past 24h (mm): Range 0 to 450 mm
    accumulated_rainfall = rainfall_intensity * np.random.uniform(1.5, 4.0, size=n_samples) + np.random.normal(30, 20, size=n_samples)
    accumulated_rainfall = np.clip(accumulated_rainfall, 0.0, 450.0)

    # 3. Terrain Elevation (m above MSL): Chennai ranges from 2m (Velachery/Adyar) to 25m (Tambaram)
    elevation = np.random.uniform(2.5, 24.0, size=n_samples)

    # 4. Drainage Network Capacity (mm/hr): Capacity of stormwater drains
    drainage_capacity = np.random.uniform(25.0, 85.0, size=n_samples)

    # 5. Impervious Surface Ratio (0.0 to 1.0): Dense concrete urban vs permeable soil
    impervious_ratio = np.random.beta(a=5, b=2, size=n_samples) # Skewed towards high urban density

    # 6. Distance to Water Body / Surplus Canal (m): 50m to 3500m
    distance_to_water = np.random.exponential(scale=650.0, size=n_samples) + 50.0
    distance_to_water = np.clip(distance_to_water, 50.0, 3500.0)

    # 7. Historical Flood Events Count (0 to 10)
    historical_floods = np.random.poisson(lam=3.5, size=n_samples)
    historical_floods = np.clip(historical_floods, 0, 10)

    # 8. Drainage Maintenance / Desilting Score (0.0 to 1.0)
    drainage_maintenance = np.random.uniform(0.3, 0.95, size=n_samples)

    # Physical runoff calculation (Rational Method approximation: Q = C * I * A)
    # Effective net flood stress
    effective_drainage = drainage_capacity * drainage_maintenance
    rain_excess = np.maximum(0, rainfall_intensity - effective_drainage)
    
    elevation_penalty = np.maximum(0, (15.0 - elevation) / 15.0) # Lower elevation = higher flood risk
    water_proximity_penalty = np.maximum(0, (1200.0 - distance_to_water) / 1200.0)
    
    latent_risk_score = (
        0.35 * (rain_excess / 60.0) +
        0.20 * (accumulated_rainfall / 250.0) +
        0.20 * elevation_penalty +
        0.15 * water_proximity_penalty +
        0.10 * impervious_ratio +
        np.random.normal(0, 0.08, size=n_samples)
    )

    # Target class: 1 = Severe Waterlogging / Flood Disruption Risk, 0 = Manageable
    # Threshold chosen so ~28% of events represent high risk crisis states
    threshold = np.percentile(latent_risk_score, 70)
    flood_risk_label = (latent_risk_score >= threshold).astype(int)

    df = pd.DataFrame({
        "rainfall_intensity_mmh": np.round(rainfall_intensity, 2),
        "accumulated_rainfall_mm": np.round(accumulated_rainfall, 2),
        "elevation_m": np.round(elevation, 2),
        "drainage_capacity_mmh": np.round(drainage_capacity, 2),
        "impervious_surface_ratio": np.round(impervious_ratio, 3),
        "distance_to_water_body_m": np.round(distance_to_water, 1),
        "historical_flood_events": historical_floods,
        "drainage_maintenance_score": np.round(drainage_maintenance, 3),
        "flood_risk_label": flood_risk_label
    })

    return df

def train_and_evaluate_models():
    """Execute complete training pipeline and save artifacts."""
    print("Generating Chennai Hydrological Dataset...")
    df = generate_chennai_hydrological_dataset()
    
    # Save raw dataset
    data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "datasets", "synthetic"))
    os.makedirs(data_dir, exist_ok=True)
    dataset_csv_path = os.path.join(data_dir, "chennai_flood_dataset.csv")
    df.to_csv(dataset_csv_path, index=False)
    print(f"Dataset saved to {dataset_csv_path} ({len(df)} records)")

    features = [
        "rainfall_intensity_mmh",
        "accumulated_rainfall_mm",
        "elevation_m",
        "drainage_capacity_mmh",
        "impervious_surface_ratio",
        "distance_to_water_body_m",
        "historical_flood_events",
        "drainage_maintenance_score"
    ]
    target = "flood_risk_label"

    X = df[features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42, stratify=y
    )

    # 1. Baseline Model (Dummy Classifier)
    baseline = DummyClassifier(strategy="most_frequent")
    baseline.fit(X_train, y_train)
    y_pred_base = baseline.predict(X_test)
    base_acc = accuracy_score(y_test, y_pred_base)

    # 2. Random Forest Model
    rf_model = RandomForestClassifier(
        n_estimators=120,
        max_depth=9,
        min_samples_split=6,
        random_state=42,
        class_weight="balanced"
    )
    rf_model.fit(X_train, y_train)
    y_pred_rf = rf_model.predict(X_test)
    y_prob_rf = rf_model.predict_proba(X_test)[:, 1]

    # Compute actual metrics
    rf_acc = float(accuracy_score(y_test, y_pred_rf))
    rf_prec = float(precision_score(y_test, y_pred_rf, zero_division=0))
    rf_rec = float(recall_score(y_test, y_pred_rf, zero_division=0))
    rf_f1 = float(f1_score(y_test, y_pred_rf, zero_division=0))
    rf_auc = float(roc_auc_score(y_test, y_prob_rf))
    rf_cm = confusion_matrix(y_test, y_pred_rf).tolist()

    # 3. Gradient Boosting Model (as comparison)
    gb_model = GradientBoostingClassifier(
        n_estimators=100,
        learning_rate=0.08,
        max_depth=5,
        random_state=42
    )
    gb_model.fit(X_train, y_train)
    y_pred_gb = gb_model.predict(X_test)
    gb_f1 = float(f1_score(y_test, y_pred_gb, zero_division=0))

    # Feature importances
    feature_importances = {
        feat: round(float(imp), 4)
        for feat, imp in zip(features, rf_model.feature_importances_)
    }

    # Model packaging
    model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "models"))
    os.makedirs(model_dir, exist_ok=True)
    model_save_path = os.path.join(model_dir, "chennai_rf_model.joblib")
    joblib.dump(rf_model, model_save_path)
    print(f"Model saved to {model_save_path}")

    # Metrics documentation
    metrics_summary = {
        "model_version": "CivicTwin-RF-v1.0",
        "model_algorithm": "RandomForestClassifier",
        "baseline_dummy_accuracy": round(base_acc, 4),
        "metrics": {
            "accuracy": round(rf_acc, 4),
            "precision": round(rf_prec, 4),
            "recall": round(rf_rec, 4),
            "f1_score": round(rf_f1, 4),
            "roc_auc": round(rf_auc, 4),
            "confusion_matrix": rf_cm
        },
        "gradient_boosting_comparison_f1": round(gb_f1, 4),
        "feature_importances": feature_importances,
        "features_list": features,
        "training_samples": len(X_train),
        "test_samples": len(X_test),
        "training_timestamp": pd.Timestamp.now().isoformat(),
        "notes": "Trained on synthetic Chennai hydrological dataset; verified with balanced class weights."
    }

    metrics_save_path = os.path.join(model_dir, "metrics.json")
    with open(metrics_save_path, "w", encoding="utf-8") as f:
        json.dump(metrics_summary, f, indent=2)
    print(f"Metrics saved to {metrics_save_path}")

    return metrics_summary

if __name__ == "__main__":
    train_and_evaluate_models()
