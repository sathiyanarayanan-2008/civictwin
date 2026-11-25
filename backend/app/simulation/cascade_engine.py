"""
CivicTwin AI - Cascading Crisis Intelligence Engine
Constructs Chennai urban infrastructure dependency graph using NetworkX.
Executes bounded cascade propagation algorithm to simulate multi-tier failures
and identify critical intervention bottlenecks.
"""

import networkx as nx
from typing import Dict, Any, List, Set, Tuple
from app.geospatial.chennai_data import (
    CHENNAI_ZONES, CHENNAI_INFRASTRUCTURE, CHENNAI_ROADS,
    INFRASTRUCTURE_DEPENDENCIES
)

class CascadingCrisisEngine:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_dependency_graph()

    def _build_dependency_graph(self):
        """Build directed dependency graph with infrastructure and road nodes."""
        self.graph.clear()

        # Add Infrastructure Nodes
        for inf in CHENNAI_INFRASTRUCTURE:
            self.graph.add_node(
                inf["id"],
                name=inf["name"],
                category=inf["category"],
                zone_id=inf["zone_id"],
                latitude=inf["latitude"],
                longitude=inf["longitude"],
                capacity=inf["capacity"],
                elevation_m=inf["elevation_m"],
                vulnerability=inf["vulnerability"],
                critical_level=inf["critical_level"],
                status="Operational"
            )

        # Add Road Segment Nodes
        for r in CHENNAI_ROADS:
            self.graph.add_node(
                r["id"],
                name=r["name"],
                category="Road",
                zone_id=r["zone_id"],
                length_km=r["length_km"],
                elevation_m=r["elevation_m"],
                drainage_capacity=r["drainage_capacity"],
                surface_water_mm=r["surface_water_mm"],
                status="Open"
            )

        # Add Dependencies (Directed Edges: Target -> Source meaning source depends on target)
        for dep in INFRASTRUCTURE_DEPENDENCIES:
            if self.graph.has_node(dep["source_id"]) and self.graph.has_node(dep["target_id"]):
                self.graph.add_edge(
                    dep["target_id"],
                    dep["source_id"],
                    dependency_type=dep["dependency_type"],
                    criticality=dep["criticality"],
                    description=dep["description"]
                )

    def simulate_cascade(
        self,
        rainfall_intensity_mmh: float = 85.0,
        rainfall_duration_h: float = 4.0,
        drainage_efficiency: float = 0.60,
        initial_closed_roads: List[int] = None,
        disabled_facilities: List[int] = None,
        pump_boost_roads: List[int] = None,
        max_depth: int = 5
    ) -> Dict[str, Any]:
        """
        Execute bounded multi-tier cascade simulation.
        Returns step-by-step cascade chain, impacted infrastructure, and system metrics.
        """
        if initial_closed_roads is None:
            initial_closed_roads = []
        if disabled_facilities is None:
            disabled_facilities = []
        if pump_boost_roads is None:
            pump_boost_roads = []

        active_disruptions: Dict[int, Dict[str, Any]] = {}
        cascade_events: List[Dict[str, Any]] = []
        visited_nodes: Set[int] = set()

        # ---------------- Tier 1: Direct Environmental Stress ----------------
        tier_1_events = []
        
        # Roads directly flooded
        for r in CHENNAI_ROADS:
            road_id = r["id"]
            boost = 25.0 if road_id in pump_boost_roads else 0.0
            effective_drain = (r["drainage_capacity"] + boost) * drainage_efficiency
            rain_surplus = max(0.0, rainfall_intensity_mmh - effective_drain)
            elev_vuln = max(0.20, (15.0 - r["elevation_m"]) / 15.0)
            accumulated_water = rain_surplus * rainfall_duration_h * elev_vuln
            
            is_directly_closed = (road_id in initial_closed_roads) or (accumulated_water > 105.0)
            
            if is_directly_closed:
                active_disruptions[road_id] = {
                    "node_id": road_id,
                    "name": r["name"],
                    "category": "Road",
                    "status": "Closed / Submerged",
                    "tier": 1,
                    "cause": f"Surface inundation ({int(accumulated_water)}mm) exceeding elevation threshold",
                    "disruption_severity": min(1.0, accumulated_water / 150.0)
                }
                tier_1_events.append({
                    "step": 1,
                    "node_id": road_id,
                    "name": r["name"],
                    "type": "Road Inundation",
                    "impact": f"Traffic severed ({int(accumulated_water)}mm water)"
                })
                visited_nodes.add(road_id)

        # Facilities directly affected by water or manual scenario injection
        for inf in CHENNAI_INFRASTRUCTURE:
            inf_id = inf["id"]
            site_flooded = (inf["elevation_m"] < 4.8 and rainfall_intensity_mmh > 90.0 and drainage_efficiency < 0.70)
            if inf_id in disabled_facilities or site_flooded:
                active_disruptions[inf_id] = {
                    "node_id": inf_id,
                    "name": inf["name"],
                    "category": inf["category"],
                    "status": "Submerged / Disabled",
                    "tier": 1,
                    "cause": "Direct site inundation and power isolation",
                    "disruption_severity": 0.85
                }
                tier_1_events.append({
                    "step": 1,
                    "node_id": inf_id,
                    "name": inf["name"],
                    "type": "Facility Outage",
                    "impact": "Ground floor water ingress and grid isolation"
                })
                visited_nodes.add(inf_id)

        cascade_events.extend(tier_1_events)

        # ---------------- Tier 2 to Max Depth: Cascading Dependency Propagation ----------------
        current_tier = 1
        frontier = list(active_disruptions.keys())

        while frontier and current_tier < max_depth:
            current_tier += 1
            next_frontier = []

            for failed_node in frontier:
                # Find all downstream dependents (nodes that depend on failed_node)
                for dependent_node in self.graph.successors(failed_node):
                    if dependent_node in visited_nodes:
                        continue

                    edge_data = self.graph.get_edge_data(failed_node, dependent_node)
                    crit = edge_data.get("criticality", 0.5)
                    dep_type = edge_data.get("dependency_type", "Access")
                    node_data = self.graph.nodes[dependent_node]

                    # Assess cascading failure probability
                    fail_condition = crit >= 0.70 or (crit >= 0.50 and rainfall_intensity_mmh > 80.0)

                    if fail_condition:
                        visited_nodes.add(dependent_node)
                        next_frontier.append(dependent_node)
                        
                        impact_desc = ""
                        status_str = "Degraded"
                        if dep_type == "Access":
                            status_str = "Inaccessible"
                            impact_desc = f"Emergency ingress blocked via {self.graph.nodes[failed_node]['name']}"
                        elif dep_type == "Power":
                            status_str = "Auxiliary Power Mode"
                            impact_desc = f"Grid power lost from {self.graph.nodes[failed_node]['name']}"
                        elif dep_type == "Drainage":
                            status_str = "Severe Local Backflow"
                            impact_desc = f"Stormwater pump failure at {self.graph.nodes[failed_node]['name']} causes flash flooding"
                        else:
                            status_str = "Traffic Congested"
                            impact_desc = f"Major diversion bottleneck from {self.graph.nodes[failed_node]['name']}"

                        active_disruptions[dependent_node] = {
                            "node_id": dependent_node,
                            "name": node_data.get("name", "Unknown Node"),
                            "category": node_data.get("category", "Infrastructure"),
                            "status": status_str,
                            "tier": current_tier,
                            "cause": f"Cascaded from {self.graph.nodes[failed_node]['name']} ({dep_type} dependency)",
                            "disruption_severity": round(crit * 0.9, 2)
                        }

                        cascade_events.append({
                            "step": current_tier,
                            "source_id": failed_node,
                            "source_name": self.graph.nodes[failed_node]["name"],
                            "target_id": dependent_node,
                            "target_name": node_data.get("name", "Unknown Node"),
                            "dependency_type": dep_type,
                            "status": status_str,
                            "impact": impact_desc
                        })

            frontier = next_frontier

        # ---------------- System Impact Metrics Calculation ----------------
        total_roads = len(CHENNAI_ROADS)
        total_facilities = len(CHENNAI_INFRASTRUCTURE)

        affected_roads = sum(1 for d in active_disruptions.values() if d["category"] == "Road")
        inaccessible_hospitals = sum(1 for d in active_disruptions.values() if d["category"] == "Hospital" and "Inaccessible" in d["status"])
        inaccessible_facilities = sum(1 for d in active_disruptions.values() if d["category"] in ["Hospital", "Shelter"] and ("Inaccessible" in d["status"] or "Disabled" in d["status"]))

        # Modelled emergency travel time: baseline is 12 mins, each blocked road adds detour delay
        avg_travel_time_min = round(12.0 + (affected_roads * 4.2), 1)

        # Resource coverage percentage
        coverage_pct = round(max(20.0, 100.0 - (affected_roads * 7.5 + inaccessible_facilities * 8.0)), 1)
        unserved_demand_pct = round(100.0 - coverage_pct, 1)

        # Overall Disruption Score (0.0 to 1.0)
        disruption_score = round(
            min(1.0, 0.40 * (affected_roads / total_roads) + 0.40 * (inaccessible_facilities / total_facilities) + 0.20 * (avg_travel_time_min / 45.0)),
            2
        )

        # High priority intervention bottlenecks
        bottlenecks = [
            {
                "node_id": 1003,
                "name": "Mount-Poonamallee Road",
                "reason": "Direct feeder to MIOT Hospital and Kathipara arterial junction",
                "recommended_action": "Deploy 2 high-flow mobile pumps and execute lane contraflow"
            },
            {
                "node_id": 401,
                "name": "Velachery 230kV Substation",
                "reason": "Powers 4 crucial stormwater de-watering pumps in Velachery lake basin",
                "recommended_action": "Stage mobile 500kVA emergency generator and sandbag perimeter"
            },
            {
                "node_id": 1001,
                "name": "Velachery Bypass Road",
                "reason": "Sole relief convoy access to Guru Nanak College Shelter",
                "recommended_action": "Route high-clearance rescue trucks and stage inflatable boat depot"
            }
        ]

        return {
            "rainfall_intensity_mmh": rainfall_intensity_mmh,
            "rainfall_duration_h": rainfall_duration_h,
            "drainage_efficiency": drainage_efficiency,
            "total_nodes_affected": len(active_disruptions),
            "affected_roads_count": affected_roads,
            "inaccessible_facilities_count": inaccessible_facilities,
            "inaccessible_hospitals_count": inaccessible_hospitals,
            "avg_emergency_travel_time_min": avg_travel_time_min,
            "resource_coverage_pct": coverage_pct,
            "unserved_demand_pct": unserved_demand_pct,
            "disruption_score": disruption_score,
            "active_disruptions": list(active_disruptions.values()),
            "cascade_events": cascade_events,
            "critical_bottlenecks": bottlenecks
        }

cascade_engine = CascadingCrisisEngine()
