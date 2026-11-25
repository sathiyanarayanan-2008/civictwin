"""
CivicTwin AI - Multi-Agent Orchestrator
Executes the sequential and staged pipeline across all 8 agents.
Manages WebSocket broadcast connections so connected clients see
live agent executions, active thinking indicators, and tool calls in real time.
"""

from typing import Dict, Any, List
import asyncio
from datetime import datetime, timezone
from app.agents.specialized_agents import (
    WeatherIntelligenceAgent,
    UrbanRiskPredictionAgent,
    InfrastructureDependencyAgent,
    CascadingCrisisSimulationAgent,
    CitizenIntelligenceAgent,
    EmergencyResourceOptimizationAgent,
    ExplainabilityAgent
)
from app.agents.supervisor_agent import SupervisorAgent
from app.core.database import SessionLocal
from app.models.entities import AgentRun, AgentEvent, Recommendation

# Active WebSocket connections registry
_active_ws_connections = set()

def register_ws(websocket):
    _active_ws_connections.add(websocket)

def unregister_ws(websocket):
    _active_ws_connections.discard(websocket)

async def broadcast_event(event_data: Dict[str, Any]):
    """Broadcast real agent execution event to all live dashboard clients."""
    if not _active_ws_connections:
        return
    dead = set()
    for ws in list(_active_ws_connections):
        try:
            await ws.send_json(event_data)
        except Exception:
            dead.add(ws)
    for d in dead:
        _active_ws_connections.discard(d)

class MultiAgentOrchestrator:
    def __init__(self):
        self.weather_agent = WeatherIntelligenceAgent()
        self.risk_agent = UrbanRiskPredictionAgent()
        self.infra_agent = InfrastructureDependencyAgent()
        self.cascade_agent = CascadingCrisisSimulationAgent()
        self.citizen_agent = CitizenIntelligenceAgent()
        self.resource_agent = EmergencyResourceOptimizationAgent()
        self.explain_agent = ExplainabilityAgent()
        self.supervisor_agent = SupervisorAgent()

    async def run_full_analysis(
        self,
        scenario_code: str = "SCENARIO_A",
        rainfall_intensity_mmh: float = 85.0,
        rainfall_duration_h: float = 4.0,
        drainage_efficiency: float = 0.60,
        closed_roads: List[int] = None
    ) -> Dict[str, Any]:
        """
        Execute full multi-agent crisis prevention workflow across all 8 agents.
        Streams each agent execution live via WebSocket and persists in database.
        """
        if closed_roads is None:
            closed_roads = []

        workflow_start = datetime.now(timezone.utc)
        events_log: List[Dict[str, Any]] = []

        # Broadcast workflow start
        await broadcast_event({
            "type": "WORKFLOW_START",
            "scenario_code": scenario_code,
            "timestamp": workflow_start.isoformat()
        })

        # Shared working state across agents (LangGraph state blackboard pattern)
        state: Dict[str, Any] = {
            "scenario_code": scenario_code,
            "rainfall_intensity_mmh": rainfall_intensity_mmh,
            "rainfall_duration_h": rainfall_duration_h,
            "drainage_efficiency": drainage_efficiency,
            "closed_roads": closed_roads
        }

        # Step 1: Weather Intelligence Agent
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-01", "name": "Weather Intelligence Agent"})
        ev_weather = await self.weather_agent.execute(state)
        state["weather_data"] = ev_weather["data"]
        events_log.append(ev_weather)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_weather})
        await asyncio.sleep(0.05)

        # Step 2: Urban Risk Prediction Agent
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-02", "name": "Urban Risk Prediction Agent"})
        ev_risk = await self.risk_agent.execute(state)
        state["risk_data"] = ev_risk["data"]
        events_log.append(ev_risk)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_risk})
        await asyncio.sleep(0.05)

        # Step 3: Infrastructure Dependency Agent
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-03", "name": "Infrastructure Dependency Agent"})
        ev_infra = await self.infra_agent.execute(state)
        state["infra_data"] = ev_infra["data"]
        events_log.append(ev_infra)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_infra})
        await asyncio.sleep(0.05)

        # Step 4: Cascading Crisis Simulation Agent
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-04", "name": "Cascading Crisis Simulation Agent"})
        ev_cascade = await self.cascade_agent.execute(state)
        state["cascade_data"] = ev_cascade["data"]
        events_log.append(ev_cascade)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_cascade})
        await asyncio.sleep(0.05)

        # Step 5: Citizen Intelligence Agent
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-05", "name": "Citizen Intelligence Agent"})
        ev_citizen = await self.citizen_agent.execute(state)
        state["citizen_data"] = ev_citizen["data"]
        events_log.append(ev_citizen)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_citizen})
        await asyncio.sleep(0.05)

        # Step 6: Emergency Resource Optimization Agent
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-06", "name": "Emergency Resource Optimization Agent"})
        ev_resource = await self.resource_agent.execute(state)
        state["resource_data"] = ev_resource["data"]
        events_log.append(ev_resource)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_resource})
        await asyncio.sleep(0.05)

        # Step 7: Explainability Agent
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-07", "name": "Explainability Agent"})
        ev_explain = await self.explain_agent.execute(state)
        state["explain_data"] = ev_explain["data"]
        events_log.append(ev_explain)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_explain})
        await asyncio.sleep(0.05)

        # Step 8: Supervisor Agent (Synthesis & Human Gatekeeper)
        await broadcast_event({"type": "AGENT_START", "agent_id": "agent-08", "name": "Supervisor Agent"})
        ev_supervisor = await self.supervisor_agent.execute(state)
        state["supervisor_data"] = ev_supervisor["data"]
        events_log.append(ev_supervisor)
        await broadcast_event({"type": "AGENT_FINISH", "event": ev_supervisor})

        workflow_end = datetime.now(timezone.utc)
        recommendations = ev_supervisor["data"].get("recommendations", [])

        # Persist to database
        db = SessionLocal()
        try:
            agent_run = AgentRun(
                workflow_name=f"Cascade Prevention Analysis - {scenario_code}",
                status="Completed",
                started_at=workflow_start,
                completed_at=workflow_end,
                total_agents=8,
                executed_agents=8,
                results_summary_json={
                    "rainfall_mmh": rainfall_intensity_mmh,
                    "affected_roads": state["cascade_data"].get("affected_roads_count", 0),
                    "inaccessible_facilities": state["cascade_data"].get("inaccessible_facilities_count", 0),
                    "disruption_score": state["cascade_data"].get("disruption_score", 0.0)
                }
            )
            db.add(agent_run)
            db.flush()

            for ev in events_log:
                event_db = AgentEvent(
                    agent_run_id=agent_run.id,
                    agent_name=ev["agent_name"],
                    agent_role=ev["agent_role"],
                    status=ev["status"],
                    input_summary=ev["input_summary"],
                    output_summary=ev["output_summary"],
                    tool_calls_json=ev["tool_calls"],
                    evidence_sources_json=ev["evidence_sources"],
                    execution_time_ms=ev["execution_time_ms"]
                )
                db.add(event_db)

            for rec in recommendations:
                rec_db = Recommendation(
                    agent_run_id=agent_run.id,
                    title=rec["title"],
                    category=rec["category"],
                    priority=rec["priority"],
                    target_zone=rec["target_zone"],
                    description=rec["description"],
                    rationale=rec["rationale"],
                    estimated_impact=rec["estimated_impact"],
                    requires_approval=rec["requires_approval"],
                    status=rec["status"]
                )
                db.add(rec_db)

            db.commit()
            run_id = agent_run.id
        except Exception as e:
            db.rollback()
            print(f"Error persisting agent run: {e}")
            run_id = 1
        finally:
            db.close()

        final_response = {
            "run_id": run_id,
            "workflow_name": f"Cascade Prevention Analysis - {scenario_code}",
            "status": "Completed",
            "started_at": workflow_start.isoformat(),
            "completed_at": workflow_end.isoformat(),
            "total_agents": 8,
            "executed_agents": 8,
            "events": events_log,
            "final_assessment": {
                "weather": state["weather_data"],
                "risk": state["risk_data"],
                "cascade": state["cascade_data"],
                "resource": state["resource_data"],
                "explain": state["explain_data"]
            },
            "recommendations": recommendations
        }

        # Broadcast workflow completion
        await broadcast_event({
            "type": "WORKFLOW_COMPLETE",
            "data": final_response
        })

        return final_response

orchestrator = MultiAgentOrchestrator()
