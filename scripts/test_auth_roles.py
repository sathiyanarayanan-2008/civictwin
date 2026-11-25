import urllib.request
import json
import time

BASE_URL = "http://127.0.0.1:8000/api/v1/auth"

def test_auth():
    print("=== TESTING ALL 5 ROLES & AUTHENTICATION ===")
    
    roles_credentials = [
        ("Administrator", "admin", "Admin@Civic2026"),
        ("Municipal Operator", "operator", "Operator@Civic2026"),
        ("Emergency Response Coordinator", "coordinator", "Rescue@Civic2026"),
        ("Citizen", "citizen", "Citizen@Civic2026"),
        ("Demo Viewer", "demo", "DemoViewer@2026"),
    ]
    
    for role_name, username, password in roles_credentials:
        login_payload = {"username": username, "password": password}
        req = urllib.request.Request(
            f"{BASE_URL}/login",
            data=json.dumps(login_payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            token = data["access_token"]
            user = data["user"]
            assert user["role"] == role_name, f"Expected {role_name}, got {user['role']}"
            print(f"Role Verified [{user['role']}]: User='{user['full_name']}' | Token Valid")
            
    # Verify Protected /me endpoint
    req_me = urllib.request.Request(
        f"{BASE_URL}/me",
        headers={'Authorization': f"Bearer {token}"}
    )
    with urllib.request.urlopen(req_me, timeout=10) as resp:
        me = json.loads(resp.read().decode('utf-8'))
        print(f"Auth /me Verification: Current User={me['username']} ({me['role']})")

    # Test Registration of a new Citizen (strictly defaults to Citizen)
    reg_username = f"citizen_{int(time.time())}"
    reg_payload = {
        "username": reg_username,
        "email": f"{reg_username}@chennaicitizen.in",
        "password": "SecurePassword123!",
        "full_name": "Ravi Shankar"
    }
    req_reg = urllib.request.Request(
        f"{BASE_URL}/register",
        data=json.dumps(reg_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req_reg, timeout=10) as resp:
        new_u = json.loads(resp.read().decode('utf-8'))
        print(f"Registration Test: User '{new_u['username']}' created with role='{new_u['role']}'")
        assert new_u["role"] == "Citizen", f"Expected default Citizen role, got {new_u['role']}"

    print("ALL 5 ROLES, LOGIN, TOKEN & REGISTRATION TESTS PASSED!\n")

if __name__ == "__main__":
    test_auth()
