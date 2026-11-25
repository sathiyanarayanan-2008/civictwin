import urllib.request
import json

def test_exports():
    print("=== TESTING REPORT EXPORTS & CITIZEN REPORTING ===")
    
    # 1. Test PDF Export
    pdf_url = "http://127.0.0.1:8000/api/v1/analytics/export/pdf"
    with urllib.request.urlopen(pdf_url, timeout=10) as resp:
        content = resp.read()
        assert resp.status == 200
        assert content.startswith(b"%PDF"), "Response is not a valid PDF file"
        print(f"PDF Export SUCCESS: Generated {len(content)} bytes of valid binary PDF.")

    # 2. Test CSV Export
    csv_url = "http://127.0.0.1:8000/api/v1/analytics/export/csv"
    with urllib.request.urlopen(csv_url, timeout=10) as resp:
        csv_text = resp.read().decode('utf-8')
        assert resp.status == 200
        lines = csv_text.strip().split("\n")
        assert len(lines) >= 4, f"Expected at least header + 3 scenario rows, got {len(lines)}"
        print(f"CSV Export SUCCESS: Generated {len(lines)} rows.")
        for l in lines[:4]:
            print(f"  {l}")

    # 3. Test Model Metrics
    metrics_url = "http://127.0.0.1:8000/api/v1/analytics/model-metrics"
    with urllib.request.urlopen(metrics_url, timeout=10) as resp:
        metrics = json.loads(resp.read().decode('utf-8'))
        print(f"ML Metrics Endpoint SUCCESS:")
        print(f"  Model Version: {metrics.get('model_version')}")
        print(f"  Accuracy: {metrics.get('accuracy')}")
        print(f"  F1 Score: {metrics.get('f1_score')}")
        print(f"  ROC-AUC: {metrics.get('roc_auc')}")
        print(f"  Top Features: {metrics.get('feature_importance', {})}")

    # 4. Test Citizen Reporting & Duplicate Detection
    report_url = "http://127.0.0.1:8000/api/v1/reports"
    report_1 = {
        "category": "Flooding",
        "description": "Knee-deep water stagnation outside residential apartments on Velachery Main Road.",
        "latitude": 12.9815,
        "longitude": 80.2180,
        "address": "Velachery Main Road, Chennai"
    }
    req1 = urllib.request.Request(
        report_url,
        data=json.dumps(report_1).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req1, timeout=10) as resp:
        res1 = json.loads(resp.read().decode('utf-8'))
        print(f"Citizen Report #1 Submitted: ID={res1['id']}, Status={res1['status']}, Priority={res1['priority']}")

    # Report 2: Same category within 200m (should be flagged as duplicate)
    report_2 = {
        "category": "Flooding",
        "description": "Water logging in front of local grocery store.",
        "latitude": 12.9820,
        "longitude": 80.2185,
        "address": "Velachery 1st Cross, Chennai"
    }
    req2 = urllib.request.Request(
        report_url,
        data=json.dumps(report_2).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req2, timeout=10) as resp:
        res2 = json.loads(resp.read().decode('utf-8'))
        print(f"Citizen Report #2 (Spatial Neighbor) Submitted: ID={res2['id']}, Status={res2['status']}, DuplicateOf={res2.get('duplicate_of_id')}")
        assert res2.get('duplicate_of_id') is not None, "Expected duplicate_of_id to link to initial report"
        print("Crowdsourced Spatial Deduplication Verified!")

if __name__ == "__main__":
    test_exports()
