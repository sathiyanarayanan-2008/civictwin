import pytest
from starlette.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["project_id"] == "BF26-CIVICTWIN-AI"
    assert data["developer"] == "Sathiya Narayanan V S"

def test_readiness_check():
    res = client.get("/ready")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ready"
