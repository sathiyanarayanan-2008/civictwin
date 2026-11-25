"""
CivicTwin AI - Demonstration Reset and Seeder CLI
Run anytime to re-initialize SQLite database and reload all Chennai records.
"""
import os
import sys

# Ensure backend is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.database.init_db import init_database, seed_database

if __name__ == "__main__":
    print("Initializing CivicTwin AI demonstration database...")
    init_database()
    seed_database()
    print("Database ready.")
