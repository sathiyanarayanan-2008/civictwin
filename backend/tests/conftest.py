import pytest
from app.database.init_db import init_database, seed_database

@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """Ensure database schema and demonstration records exist before tests."""
    init_database()
    seed_database()
