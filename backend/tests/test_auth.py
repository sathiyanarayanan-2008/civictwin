import pytest
from starlette.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_user_registration_and_login():
    test_user = {
        "username": "test_officer_2026",
        "email": "test_officer_2026@civictwin.ai",
        "password": "SecurePassword@123",
        "full_name": "Test Officer"
    }
    # Register
    res = client.post("/api/v1/auth/register", json=test_user)
    # 200 on first create, or 400 if already exists in test run
    assert res.status_code in [200, 400]

    # Login
    login_res = client.post("/api/v1/auth/login", json={
        "username": test_user["username"],
        "password": test_user["password"]
    })
    assert login_res.status_code == 200
    data = login_res.json()
    assert "access_token" in data
    assert data["user"]["role"] == "Citizen" # Default public registration is Citizen

def test_demo_user_authentication():
    res = client.post("/api/v1/auth/login", json={
        "username": "demo",
        "password": "DemoViewer@2026"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["user"]["role"] == "Demo Viewer"
