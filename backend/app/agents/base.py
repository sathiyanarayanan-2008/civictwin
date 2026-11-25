"""
CivicTwin AI - Base Agent Architecture
Defines common execution interface, structured telemetry, evidence tracking,
error handling, and timing for all 8 specialized urban crisis agents.
"""

from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
import time
import traceback

class BaseAgent:
    def __init__(self, agent_id: str, name: str, role: str, responsibility: str):
        self.agent_id = agent_id
        self.name = name
        self.role = role
        self.responsibility = responsibility
        self.retry_limit = 2

    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute agent with timing, error capture, and telemetry emission.
        """
        start_time = time.time()
        retries = 0
        last_error = None

        while retries <= self.retry_limit:
            try:
                execution_result = await self._run_logic(state)
                elapsed_ms = int((time.time() - start_time) * 1000)

                event = {
                    "agent_id": self.agent_id,
                    "agent_name": self.name,
                    "agent_role": self.role,
                    "status": "Success",
                    "input_summary": self._summarize_input(state),
                    "output_summary": execution_result.get("summary", "Analysis completed successfully."),
                    "tool_calls": execution_result.get("tool_calls", []),
                    "evidence_sources": execution_result.get("evidence", []),
                    "data": execution_result.get("data", {}),
                    "execution_time_ms": elapsed_ms,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
                return event
            except Exception as e:
                retries += 1
                last_error = str(e)
                traceback.print_exc()

        # If retries exceeded
        elapsed_ms = int((time.time() - start_time) * 1000)
        return {
            "agent_id": self.agent_id,
            "agent_name": self.name,
            "agent_role": self.role,
            "status": "Failed",
            "input_summary": self._summarize_input(state),
            "output_summary": f"Execution failed after {retries} attempts: {last_error}",
            "tool_calls": ["error_handler"],
            "evidence_sources": ["System Exception Log"],
            "data": {"error": last_error},
            "execution_time_ms": elapsed_ms,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

    async def _run_logic(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Must be implemented by child agents."""
        raise NotImplementedError

    def _summarize_input(self, state: Dict[str, Any]) -> str:
        scenario = state.get("scenario_code", "CUSTOM")
        rain = state.get("rainfall_intensity_mmh", 75.0)
        return f"Scenario {scenario} with rainfall {rain}mm/hr."
