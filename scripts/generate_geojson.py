"""
Script to generate offline GeoJSON for Chennai and export to datasets and frontend public folder.
"""
import json
import os
import sys

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.geospatial.chennai_data import generate_chennai_geojson

def main():
    geojson_data = generate_chennai_geojson()
    
    # Target paths
    dataset_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "datasets", "processed", "chennai_zones.geojson"))
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "data"))
    os.makedirs(frontend_dir, exist_ok=True)
    frontend_path = os.path.join(frontend_dir, "chennai_zones.geojson")
    
    with open(dataset_path, "w", encoding="utf-8") as f:
        json.dump(geojson_data, f, indent=2)
    print(f"Exported GeoJSON to {dataset_path}")
    
    with open(frontend_path, "w", encoding="utf-8") as f:
        json.dump(geojson_data, f, indent=2)
    print(f"Exported GeoJSON to {frontend_path}")

if __name__ == "__main__":
    main()
