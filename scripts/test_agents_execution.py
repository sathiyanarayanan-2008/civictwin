import urllib.request
import json
import time

def test_agents():
    print("=== TESTING LIVE 8-AGENT MULTI-AGENT WORKFLOW ===")
    url = "http://127.0.0.1:8000/api/v1/agents/run"
    payload = {
        "scenario_code": "SCENARIO_A",
        "rainfall_intensity_mmh": 95.0,
        "rainfall_duration_h": 4.0,
        "drainage_efficiency": 0.55,
        "closed_roads": [1001, 1004]
    }
    
    start_t = time.time()
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req, timeout=30) as resp:
        assert resp.status == 200, f"Expected 200, got {resp.status}"
        data = json.loads(resp.read().decode('utf-8'))
        
    duration = time.time() - start_t
    print(f"Workflow finished successfully in {duration:.2f}s!")
    print(f"Run ID: {data.get('run_id')}")
    print(f"Status: {data.get('status')}")
    print(f"Total Agents Executed: {len(data.get('events', []))}")
    
    for i, ev in enumerate(data.get('events', []), 1):
        print(f"  [{i}/8] {ev.get('agent_name')} ({ev.get('agent_id')}): status={ev.get('status')}, action={ev.get('action')}")
        
    # Verify DB persistence
    runs_url = "http://127.0.0.1:8000/api/v1/agents/runs"
    with urllib.request.urlopen(runs_url, timeout=10) as resp:
        runs = json.loads(resp.read().decode('utf-8'))
        print(f"\nPersisted Runs in DB: {len(runs)}")
        latest = runs[0]
        print(f"Latest Run in DB: ID={latest['id']}, Workflow={latest['workflow_name']}, Status={latest['status']}, Agents={latest['executed_agents']}/{latest['total_agents']}")
        
    run_id = data.get('run_id')
    events_url = f"http://127.0.0.1:8000/api/v1/agents/runs/{run_id}/events"
    with urllib.request.urlopen(events_url, timeout=10) as resp:
        events = json.loads(resp.read().decode('utf-8'))
        print(f"Persisted Events for Run #{run_id}: {len(events)} events verified in SQLite database.")
        for e in events:
            print(f"  -> Persisted Agent Event: {e['agent_name']} | Role: {e['agent_role']} | Execution Time: {e['execution_time_ms']}ms")

if __name__ == "__main__":
    test_agents()
