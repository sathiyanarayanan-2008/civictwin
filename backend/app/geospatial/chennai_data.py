"""
CivicTwin AI - Chennai Geospatial Dataset & Infrastructure Registry
Location: Chennai, Tamil Nadu, India (13.0827° N, 80.2707° E)
Deterministic, reproducible demonstration dataset covering major urban zones,
drainage basins, road segments, critical facilities, and flood risk zones.
"""

from typing import List, Dict, Any
import json
import math

CHENNAI_CITY = {
    "name": "Chennai",
    "state": "Tamil Nadu",
    "country": "India",
    "latitude": 13.0827,
    "longitude": 80.2707,
    "population": 11200000,
    "area_sq_km": 426.51
}

# 8 Core Demonstration Zones across Chennai's flood-vulnerable and critical transit corridors
CHENNAI_ZONES: List[Dict[str, Any]] = [
    {
        "id": 1,
        "name": "T. Nagar",
        "zone_code": "TN-01",
        "risk_level": "High",
        "elevation_m": 7.2,
        "drainage_capacity": 42.0,  # mm/hr
        "vulnerability_score": 0.82,
        "latitude": 13.0418,
        "longitude": 80.2341,
        "population": 280000,
        "impervious_ratio": 0.88,
        "historical_floods": 6,
        "primary_threat": "Commercial impervious runoff and Mambalam canal backflow",
        "boundary_coords": [
            [80.222, 13.048], [80.244, 13.048], [80.245, 13.033], [80.223, 13.033], [80.222, 13.048]
        ]
    },
    {
        "id": 2,
        "name": "Velachery",
        "zone_code": "VEL-02",
        "risk_level": "Critical",
        "elevation_m": 4.1,
        "drainage_capacity": 32.0,
        "vulnerability_score": 0.94,
        "latitude": 12.9815,
        "longitude": 80.2180,
        "population": 340000,
        "impervious_ratio": 0.85,
        "historical_floods": 8,
        "primary_threat": "Velachery lake overflow and Pallikaranai marsh inundation",
        "boundary_coords": [
            [80.205, 12.992], [80.232, 12.992], [80.230, 12.968], [80.206, 12.968], [80.205, 12.992]
        ]
    },
    {
        "id": 3,
        "name": "Adyar",
        "zone_code": "ADY-03",
        "risk_level": "High",
        "elevation_m": 3.8,
        "drainage_capacity": 48.0,
        "vulnerability_score": 0.78,
        "latitude": 13.0012,
        "longitude": 80.2565,
        "population": 220000,
        "impervious_ratio": 0.72,
        "historical_floods": 5,
        "primary_threat": "Adyar river estuary surge and coastal high-tide backwater",
        "boundary_coords": [
            [80.244, 13.012], [80.268, 13.012], [80.267, 12.990], [80.243, 12.990], [80.244, 13.012]
        ]
    },
    {
        "id": 4,
        "name": "Guindy",
        "zone_code": "GDY-04",
        "risk_level": "Moderate",
        "elevation_m": 12.4,
        "drainage_capacity": 60.0,
        "vulnerability_score": 0.55,
        "latitude": 13.0067,
        "longitude": 80.2024,
        "population": 190000,
        "impervious_ratio": 0.78,
        "historical_floods": 3,
        "primary_threat": "Kathipara cloverleaf underpass water accumulation",
        "boundary_coords": [
            [80.190, 13.018], [80.215, 13.018], [80.214, 12.995], [80.189, 12.995], [80.190, 13.018]
        ]
    },
    {
        "id": 5,
        "name": "Anna Nagar",
        "zone_code": "AN-05",
        "risk_level": "Low",
        "elevation_m": 16.5,
        "drainage_capacity": 75.0,
        "vulnerability_score": 0.32,
        "latitude": 13.0850,
        "longitude": 80.2101,
        "population": 310000,
        "impervious_ratio": 0.68,
        "historical_floods": 1,
        "primary_threat": "Otteri Nullah localized localized stormwater bottlenecks",
        "boundary_coords": [
            [80.198, 13.098], [80.225, 13.098], [80.224, 13.072], [80.197, 13.072], [80.198, 13.098]
        ]
    },
    {
        "id": 6,
        "name": "Porur",
        "zone_code": "POR-06",
        "risk_level": "High",
        "elevation_m": 9.2,
        "drainage_capacity": 45.0,
        "vulnerability_score": 0.76,
        "latitude": 13.0382,
        "longitude": 80.1565,
        "population": 260000,
        "impervious_ratio": 0.81,
        "historical_floods": 5,
        "primary_threat": "Porur lake surplus sluice discharge into Chembarambakkam channel",
        "boundary_coords": [
            [80.142, 13.050], [80.170, 13.050], [80.169, 13.025], [80.141, 13.025], [80.142, 13.050]
        ]
    },
    {
        "id": 7,
        "name": "Perungudi (OMR)",
        "zone_code": "PGD-07",
        "risk_level": "Critical",
        "elevation_m": 4.5,
        "drainage_capacity": 35.0,
        "vulnerability_score": 0.90,
        "latitude": 12.9654,
        "longitude": 80.2412,
        "population": 210000,
        "impervious_ratio": 0.86,
        "historical_floods": 7,
        "primary_threat": "Pallikaranai buffer encroachment and IT expressway water logging",
        "boundary_coords": [
            [80.228, 12.978], [80.255, 12.978], [80.254, 12.952], [80.227, 12.952], [80.228, 12.978]
        ]
    },
    {
        "id": 8,
        "name": "Tambaram",
        "zone_code": "TAM-08",
        "risk_level": "Moderate",
        "elevation_m": 22.0,
        "drainage_capacity": 58.0,
        "vulnerability_score": 0.60,
        "latitude": 12.9249,
        "longitude": 80.1000,
        "population": 390000,
        "impervious_ratio": 0.70,
        "historical_floods": 4,
        "primary_threat": "Mudichur low-lying basin stormwater collection",
        "boundary_coords": [
            [80.085, 12.940], [80.118, 12.940], [80.117, 12.910], [80.084, 12.910], [80.085, 12.940]
        ]
    }
]

# Chennai Critical Infrastructure Nodes
CHENNAI_INFRASTRUCTURE: List[Dict[str, Any]] = [
    # Hospitals
    {
        "id": 101,
        "zone_id": 4,
        "name": "MIOT International Hospital",
        "category": "Hospital",
        "latitude": 13.0234,
        "longitude": 80.1876,
        "capacity": 1000,
        "status": "Operational",
        "vulnerability": 0.72,
        "critical_level": "Critical",
        "elevation_m": 6.8,
        "has_backup_power": True,
        "specialty": "Trauma & Multi-specialty",
        "icu_beds": 140
    },
    {
        "id": 102,
        "zone_id": 3,
        "name": "Fortis Malar Hospital Adyar",
        "category": "Hospital",
        "latitude": 13.0062,
        "longitude": 80.2573,
        "capacity": 250,
        "status": "Operational",
        "vulnerability": 0.65,
        "critical_level": "Critical",
        "elevation_m": 5.2,
        "has_backup_power": True,
        "specialty": "Cardiology & Emergency",
        "icu_beds": 65
    },
    {
        "id": 103,
        "zone_id": 6,
        "name": "Sri Ramachandra Medical Centre",
        "category": "Hospital",
        "latitude": 13.0360,
        "longitude": 80.1444,
        "capacity": 1500,
        "status": "Operational",
        "vulnerability": 0.40,
        "critical_level": "Critical",
        "elevation_m": 14.5,
        "has_backup_power": True,
        "specialty": "Tertiary Referral & Trauma",
        "icu_beds": 210
    },
    {
        "id": 104,
        "zone_id": 1,
        "name": "Apollo Speciality Hospital Nandanam",
        "category": "Hospital",
        "latitude": 13.0298,
        "longitude": 80.2405,
        "capacity": 320,
        "status": "Operational",
        "vulnerability": 0.58,
        "critical_level": "High",
        "elevation_m": 8.0,
        "has_backup_power": True,
        "specialty": "Emergency Care",
        "icu_beds": 50
    },
    {
        "id": 105,
        "zone_id": 2,
        "name": "Dr. Kamakshi Memorial Hospital",
        "category": "Hospital",
        "latitude": 12.9510,
        "longitude": 80.2078,
        "capacity": 400,
        "status": "Operational",
        "vulnerability": 0.88,
        "critical_level": "Critical",
        "elevation_m": 4.6,
        "has_backup_power": True,
        "specialty": "Emergency & Oncology",
        "icu_beds": 80
    },
    # Shelters / Relief Camps
    {
        "id": 201,
        "zone_id": 4,
        "name": "Chennai Trade Centre Emergency Shelter",
        "category": "Shelter",
        "latitude": 13.0175,
        "longitude": 80.1882,
        "capacity": 3500,
        "status": "Operational",
        "vulnerability": 0.35,
        "critical_level": "High",
        "elevation_m": 12.1,
        "has_backup_power": True,
        "food_supplies_days": 10,
        "medical_post": True
    },
    {
        "id": 202,
        "zone_id": 5,
        "name": "Anna University Relief Center",
        "category": "Shelter",
        "latitude": 13.0125,
        "longitude": 80.2355,
        "capacity": 4000,
        "status": "Operational",
        "vulnerability": 0.25,
        "critical_level": "High",
        "elevation_m": 15.2,
        "has_backup_power": True,
        "food_supplies_days": 14,
        "medical_post": True
    },
    {
        "id": 203,
        "zone_id": 2,
        "name": "Guru Nanak College Relief Shelter",
        "category": "Shelter",
        "latitude": 12.9892,
        "longitude": 80.2195,
        "capacity": 2200,
        "status": "Operational",
        "vulnerability": 0.70,
        "critical_level": "Medium",
        "elevation_m": 5.9,
        "has_backup_power": True,
        "food_supplies_days": 5,
        "medical_post": True
    },
    # Stormwater Pumps & Drainage Stations
    {
        "id": 301,
        "zone_id": 2,
        "name": "Velachery Lake Surplus Drain Pump Station",
        "category": "Drainage Pump",
        "latitude": 12.9770,
        "longitude": 80.2150,
        "capacity": 85000,  # liters/min
        "status": "Operational",
        "vulnerability": 0.85,
        "critical_level": "Critical",
        "elevation_m": 3.9,
        "has_backup_power": True,
        "discharge_basin": "Pallikaranai Marsh"
    },
    {
        "id": 302,
        "zone_id": 1,
        "name": "Mambalam Canal Stormwater Sluice & Pump",
        "category": "Drainage Pump",
        "latitude": 13.0385,
        "longitude": 80.2280,
        "capacity": 62000,
        "status": "Operational",
        "vulnerability": 0.75,
        "critical_level": "High",
        "elevation_m": 6.8,
        "has_backup_power": True,
        "discharge_basin": "Adyar River"
    },
    # Power Substations
    {
        "id": 401,
        "zone_id": 2,
        "name": "TANGEDCO 230kV Velachery Substation",
        "category": "Power Substation",
        "latitude": 12.9732,
        "longitude": 80.2210,
        "capacity": 450,  # MVA
        "status": "Operational",
        "vulnerability": 0.90,
        "critical_level": "Critical",
        "elevation_m": 4.2,
        "has_backup_power": False,
        "feeds": ["MIOT Access Corridor", "Velachery Core", "Perungudi Tech Zone"]
    },
    {
        "id": 402,
        "zone_id": 4,
        "name": "TANGEDCO Guindy Industrial 110kV Substation",
        "category": "Power Substation",
        "latitude": 13.0090,
        "longitude": 80.2085,
        "capacity": 320,
        "status": "Operational",
        "vulnerability": 0.45,
        "critical_level": "High",
        "elevation_m": 11.5,
        "has_backup_power": False,
        "feeds": ["Anna Salai Metro Grid", "Kathipara Infrastructure"]
    },
    # Fire & Emergency Stations
    {
        "id": 501,
        "zone_id": 4,
        "name": "Guindy Fire & Rescue Station (TNFRS)",
        "category": "Fire Station",
        "latitude": 13.0112,
        "longitude": 80.2065,
        "capacity": 8,  # Tender vehicles
        "status": "Operational",
        "vulnerability": 0.30,
        "critical_level": "High",
        "elevation_m": 12.8,
        "has_backup_power": True,
        "boats_available": 6
    },
    {
        "id": 502,
        "zone_id": 1,
        "name": "T. Nagar Fire Station",
        "category": "Fire Station",
        "latitude": 13.0402,
        "longitude": 80.2315,
        "capacity": 5,
        "status": "Operational",
        "vulnerability": 0.50,
        "critical_level": "High",
        "elevation_m": 7.8,
        "has_backup_power": True,
        "boats_available": 3
    }
]

# Chennai Road Arterials & Connecting Segments
CHENNAI_ROADS: List[Dict[str, Any]] = [
    {
        "id": 1001,
        "zone_id": 2,
        "name": "Velachery Bypass Road",
        "category": "Arterial",
        "length_km": 3.8,
        "elevation_m": 4.3,
        "drainage_capacity": 35.0,
        "surface_water_mm": 15.0,
        "flood_risk_score": 0.78,
        "is_closed": False,
        "speed_limit_kmh": 50,
        "connected_infra": [105, 301, 203],
        "coordinates_json": [
            [80.2110, 12.9890], [80.2185, 12.9810], [80.2240, 12.9680]
        ]
    },
    {
        "id": 1002,
        "zone_id": 4,
        "name": "Anna Salai (Guindy to Nandanam)",
        "category": "Arterial",
        "length_km": 5.2,
        "elevation_m": 9.5,
        "drainage_capacity": 62.0,
        "surface_water_mm": 5.0,
        "flood_risk_score": 0.28,
        "is_closed": False,
        "speed_limit_kmh": 60,
        "connected_infra": [402, 501, 104],
        "coordinates_json": [
            [80.2030, 13.0070], [80.2220, 13.0230], [80.2410, 13.0310]
        ]
    },
    {
        "id": 1003,
        "zone_id": 4,
        "name": "Mount-Poonamallee Road (MIOT Access)",
        "category": "Arterial",
        "length_km": 4.6,
        "elevation_m": 5.9,
        "drainage_capacity": 40.0,
        "surface_water_mm": 28.0,
        "flood_risk_score": 0.85,
        "is_closed": False,
        "speed_limit_kmh": 50,
        "connected_infra": [101, 201],
        "coordinates_json": [
            [80.2010, 13.0080], [80.1870, 13.0230], [80.1740, 13.0310]
        ]
    },
    {
        "id": 1004,
        "zone_id": 1,
        "name": "Usman Road & South Usman Flyover Base",
        "category": "Primary",
        "length_km": 2.4,
        "elevation_m": 6.8,
        "drainage_capacity": 38.0,
        "surface_water_mm": 20.0,
        "flood_risk_score": 0.74,
        "is_closed": False,
        "speed_limit_kmh": 40,
        "connected_infra": [302, 502],
        "coordinates_json": [
            [80.2310, 13.0450], [80.2340, 13.0380], [80.2360, 13.0320]
        ]
    },
    {
        "id": 1005,
        "zone_id": 3,
        "name": "Sardar Patel Road (Guindy - Adyar)",
        "category": "Arterial",
        "length_km": 4.1,
        "elevation_m": 8.2,
        "drainage_capacity": 55.0,
        "surface_water_mm": 8.0,
        "flood_risk_score": 0.38,
        "is_closed": False,
        "speed_limit_kmh": 50,
        "connected_infra": [202, 102],
        "coordinates_json": [
            [80.2150, 13.0080], [80.2360, 13.0110], [80.2560, 13.0050]
        ]
    },
    {
        "id": 1006,
        "zone_id": 7,
        "name": "OMR (Rajiv Gandhi Salai - Perungudi)",
        "category": "Arterial",
        "length_km": 6.5,
        "elevation_m": 4.8,
        "drainage_capacity": 36.0,
        "surface_water_mm": 22.0,
        "flood_risk_score": 0.82,
        "is_closed": False,
        "speed_limit_kmh": 60,
        "connected_infra": [401],
        "coordinates_json": [
            [80.2520, 12.9880], [80.2440, 12.9640], [80.2350, 12.9420]
        ]
    },
    {
        "id": 1007,
        "zone_id": 6,
        "name": "Porur Kundrathur Main Road",
        "category": "Primary",
        "length_km": 3.9,
        "elevation_m": 8.8,
        "drainage_capacity": 44.0,
        "surface_water_mm": 12.0,
        "flood_risk_score": 0.62,
        "is_closed": False,
        "speed_limit_kmh": 45,
        "connected_infra": [103],
        "coordinates_json": [
            [80.1620, 13.0420], [80.1510, 13.0340], [80.1410, 13.0220]
        ]
    },
    {
        "id": 1008,
        "zone_id": 4,
        "name": "Inner Ring Road (100 Feet Road Jafferkhanpet)",
        "category": "Arterial",
        "length_km": 4.8,
        "elevation_m": 6.2,
        "drainage_capacity": 42.0,
        "surface_water_mm": 26.0,
        "flood_risk_score": 0.81,
        "is_closed": False,
        "speed_limit_kmh": 50,
        "connected_infra": [101, 302],
        "coordinates_json": [
            [80.2100, 13.0410], [80.2020, 13.0240], [80.1970, 13.0120]
        ]
    }
]

# Chennai Major Water Bodies & Drainage Channels
CHENNAI_WATER_BODIES: List[Dict[str, Any]] = [
    {
        "name": "Adyar River Basin",
        "type": "River",
        "current_water_level_m": 3.2,
        "danger_mark_m": 4.8,
        "risk_status": "Elevated",
        "coordinates": [
            [80.170, 13.020], [80.200, 13.015], [80.240, 13.010], [80.265, 13.005]
        ]
    },
    {
        "name": "Cooum River Canal",
        "type": "River",
        "current_water_level_m": 2.8,
        "danger_mark_m": 4.5,
        "risk_status": "Normal",
        "coordinates": [
            [80.180, 13.075], [80.215, 13.072], [80.260, 13.068], [80.285, 13.065]
        ]
    },
    {
        "name": "Velachery Lake & Surplus Canal",
        "type": "Lake",
        "current_water_level_m": 4.2,
        "danger_mark_m": 4.5,
        "risk_status": "Near Overflow",
        "coordinates": [
            [80.212, 12.982], [80.222, 12.985], [80.225, 12.975], [80.215, 12.972]
        ]
    },
    {
        "name": "Pallikaranai Marshland",
        "type": "Wetland",
        "current_water_level_m": 2.4,
        "danger_mark_m": 3.0,
        "risk_status": "High Absorption",
        "coordinates": [
            [80.205, 12.960], [80.235, 12.965], [80.230, 12.930], [80.200, 12.935]
        ]
    }
]

# Infrastructure Dependencies (for Cascading Intelligence Engine)
# Format: source depends on target for dependency_type
INFRASTRUCTURE_DEPENDENCIES: List[Dict[str, Any]] = [
    {
        "source_id": 101,  # MIOT Hospital
        "source_name": "MIOT International Hospital",
        "target_id": 1003, # Mount-Poonamallee Road
        "target_name": "Mount-Poonamallee Road (MIOT Access)",
        "dependency_type": "Access",
        "criticality": 0.95,
        "description": "Primary patient & emergency ambulance ingress/egress corridor"
    },
    {
        "source_id": 101,  # MIOT Hospital
        "source_name": "MIOT International Hospital",
        "target_id": 401,  # Velachery Substation
        "target_name": "TANGEDCO 230kV Velachery Substation",
        "dependency_type": "Power",
        "criticality": 0.88,
        "description": "High-voltage main power feeder line for ICU and surgical wings"
    },
    {
        "source_id": 105,  # Dr. Kamakshi Hospital
        "source_name": "Dr. Kamakshi Memorial Hospital",
        "target_id": 1001, # Velachery Bypass Road
        "target_name": "Velachery Bypass Road",
        "dependency_type": "Access",
        "criticality": 0.92,
        "description": "Only dual-lane access corridor connecting from OMR and GST Road"
    },
    {
        "source_id": 1001, # Velachery Bypass Road
        "source_name": "Velachery Bypass Road",
        "target_id": 301,  # Velachery Pump Station
        "target_name": "Velachery Lake Surplus Drain Pump Station",
        "dependency_type": "Drainage",
        "criticality": 0.85,
        "description": "Surface storm water pump offload to prevent road submergence"
    },
    {
        "source_id": 301,  # Velachery Pump Station
        "source_name": "Velachery Lake Surplus Drain Pump Station",
        "target_id": 401,  # Velachery Substation
        "target_name": "TANGEDCO 230kV Velachery Substation",
        "dependency_type": "Power",
        "criticality": 0.96,
        "description": "Direct industrial feed powering 4 heavy-duty submersible flood pumps"
    },
    {
        "source_id": 1004, # Usman Road
        "source_name": "Usman Road & South Usman Flyover Base",
        "target_id": 302,  # Mambalam Canal Pump
        "target_name": "Mambalam Canal Stormwater Sluice & Pump",
        "dependency_type": "Drainage",
        "criticality": 0.78,
        "description": "Active canal discharge required to avoid 0.6m commercial flash flood"
    },
    {
        "source_id": 203,  # Guru Nanak Shelter
        "source_name": "Guru Nanak College Relief Shelter",
        "target_id": 1001, # Velachery Bypass Road
        "target_name": "Velachery Bypass Road",
        "dependency_type": "Access",
        "criticality": 0.82,
        "description": "Supply convoy route for food packets, clean water and medical teams"
    },
    {
        "source_id": 1008, # Inner Ring Road
        "source_name": "Inner Ring Road (100 Feet Road)",
        "target_id": 1003, # Mount-Poonamallee Road
        "target_name": "Mount-Poonamallee Road",
        "dependency_type": "Traffic Transfer",
        "criticality": 0.75,
        "description": "Feeds 45% of southern diversionary traffic when Mount-Poonamallee overflows"
    }
]

# Emergency Resources (Initial Fleet Distribution)
EMERGENCY_RESOURCES: List[Dict[str, Any]] = [
    {"id": 1, "name": "Rescue Boat Unit 1", "type": "Rescue Boat", "status": "Available", "capacity": 8, "latitude": 13.0112, "longitude": 80.2065, "assigned_zone": "Guindy"},
    {"id": 2, "name": "Rescue Boat Unit 2", "type": "Rescue Boat", "status": "Available", "capacity": 8, "latitude": 13.0112, "longitude": 80.2065, "assigned_zone": "Guindy"},
    {"id": 3, "name": "Rescue Boat Unit 3", "type": "Rescue Boat", "status": "Available", "capacity": 8, "latitude": 13.0402, "longitude": 80.2315, "assigned_zone": "T. Nagar"},
    {"id": 4, "name": "Rescue Boat Unit 4", "type": "Rescue Boat", "status": "Dispatched", "capacity": 8, "latitude": 12.9815, "longitude": 80.2180, "assigned_zone": "Velachery"},
    {"id": 5, "name": "ALS Ambulance 108-Alpha", "type": "Ambulance", "status": "Available", "capacity": 2, "latitude": 13.0234, "longitude": 80.1876, "assigned_zone": "Guindy"},
    {"id": 6, "name": "ALS Ambulance 108-Bravo", "type": "Ambulance", "status": "Available", "capacity": 2, "latitude": 13.0062, "longitude": 80.2573, "assigned_zone": "Adyar"},
    {"id": 7, "name": "ALS Ambulance 108-Charlie", "type": "Ambulance", "status": "Available", "capacity": 2, "latitude": 13.0360, "longitude": 80.1444, "assigned_zone": "Porur"},
    {"id": 8, "name": "ALS Ambulance 108-Delta", "type": "Ambulance", "status": "Dispatched", "capacity": 2, "latitude": 12.9815, "longitude": 80.2180, "assigned_zone": "Velachery"},
    {"id": 9, "name": "ALS Ambulance 108-Echo", "type": "Ambulance", "status": "Available", "capacity": 2, "latitude": 13.0418, "longitude": 80.2341, "assigned_zone": "T. Nagar"},
    {"id": 10, "name": "High-Flow De-watering Pump 01", "type": "High-Flow Pump", "status": "Available", "capacity": 50000, "latitude": 12.9770, "longitude": 80.2150, "assigned_zone": "Velachery"},
    {"id": 11, "name": "High-Flow De-watering Pump 02", "type": "High-Flow Pump", "status": "Available", "capacity": 50000, "latitude": 13.0385, "longitude": 80.2280, "assigned_zone": "T. Nagar"},
    {"id": 12, "name": "Emergency Relief Squad 1", "type": "Emergency Squad", "status": "Available", "capacity": 15, "latitude": 13.0175, "longitude": 80.1882, "assigned_zone": "Guindy"},
    {"id": 13, "name": "Emergency Relief Squad 2", "type": "Emergency Squad", "status": "Available", "capacity": 15, "latitude": 13.0125, "longitude": 80.2355, "assigned_zone": "Adyar"}
]

def generate_chennai_geojson() -> Dict[str, Any]:
    """
    Generate comprehensive GeoJSON FeatureCollection for MapLibre GL JS
    with bundled fallback layers so maps work seamlessly offline.
    """
    features = []

    # 1. Zones (Polygons)
    for z in CHENNAI_ZONES:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [z["boundary_coords"]]
            },
            "properties": {
                "layer_type": "zone",
                "id": z["id"],
                "name": z["name"],
                "zone_code": z["zone_code"],
                "risk_level": z["risk_level"],
                "elevation_m": z["elevation_m"],
                "drainage_capacity": z["drainage_capacity"],
                "vulnerability_score": z["vulnerability_score"],
                "population": z["population"],
                "threat": z["primary_threat"]
            }
        })

    # 2. Roads (LineStrings)
    for r in CHENNAI_ROADS:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": r["coordinates_json"]
            },
            "properties": {
                "layer_type": "road",
                "id": r["id"],
                "name": r["name"],
                "category": r["category"],
                "elevation_m": r["elevation_m"],
                "surface_water_mm": r["surface_water_mm"],
                "flood_risk_score": r["flood_risk_score"],
                "is_closed": r["is_closed"]
            }
        })

    # 3. Critical Infrastructure (Points)
    for inf in CHENNAI_INFRASTRUCTURE:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [inf["longitude"], inf["latitude"]]
            },
            "properties": {
                "layer_type": "infrastructure",
                "id": inf["id"],
                "name": inf["name"],
                "category": inf["category"],
                "status": inf["status"],
                "critical_level": inf["critical_level"],
                "capacity": inf["capacity"],
                "elevation_m": inf["elevation_m"],
                "vulnerability": inf["vulnerability"]
            }
        })

    # 4. Emergency Resources (Points)
    for res in EMERGENCY_RESOURCES:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [res["longitude"], res["latitude"]]
            },
            "properties": {
                "layer_type": "resource",
                "id": res["id"],
                "name": res["name"],
                "resource_type": res["type"],
                "status": res["status"],
                "assigned_zone": res["assigned_zone"]
            }
        })

    return {
        "type": "FeatureCollection",
        "features": features
    }
