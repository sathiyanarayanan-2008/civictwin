import React, { useState, useEffect } from 'react';
import { api, WS_URL } from '../services/api';
import {
  Cpu,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  AlertCircle
} from 'lucide-react';

interface AgentCard {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  lastExecutionMs?: number;
  lastSummary?: string;
}

const INITIAL_AGENTS: AgentCard[] = [
  { id: 'agent-01', name: 'Weather Intelligence Agent', role: 'Environmental Telemetry Analyst', status: 'idle', lastSummary: 'Open-Meteo Doppler radar validated.' },
  { id: 'agent-02', name: 'Urban Risk Prediction Agent', role: 'Hydrological ML Specialist', status: 'idle', lastSummary: 'Random Forest risk inference completed.' },
  { id: 'agent-03', name: 'Infrastructure Dependency Agent', role: 'Topology Graph Engineer', status: 'idle', lastSummary: 'NetworkX dependency graph analyzed.' },
  { id: 'agent-04', name: 'Cascading Crisis Simulation Agent', role: 'Failure Propagation Specialist', status: 'idle', lastSummary: 'Simulated 6 multi-tier failure events.' },
  { id: 'agent-05', name: 'Citizen Intelligence Agent', role: 'Crowdsourced Telemetry Analyst', status: 'idle', lastSummary: 'Verified citizen reports & deduplicated.' },
  { id: 'agent-06', name: 'Resource Optimization Agent', role: 'Constrained OR-Tools Specialist', status: 'idle', lastSummary: 'Optimized fleet allocation & detour routing.' },
  { id: 'agent-07', name: 'Explainability (XAI) Agent', role: 'Audit & Transparency Specialist', status: 'idle', lastSummary: 'SHAP waterfall rationales synthesized.' },
  { id: 'agent-08', name: 'Supervisor Agent', role: 'Multi-Agent Workflow Governor', status: 'idle', lastSummary: 'Routed recommendations to human approval.' }
];

export const AIAgentControlCentrePage: React.FC = () => {
  const [agents, setAgents] = useState<AgentCard[]>(INITIAL_AGENTS);
  const [logs, setLogs] = useState<string[]>([
    'System standby: 8 structured agents initialized.',
    'WebSocket real-time telemetry stream ready.'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    // Connect to backend WebSocket for live event streaming
    let ws: WebSocket;
    try {
      ws = new WebSocket(WS_URL);
      ws.onopen = () => {
        setWsConnected(true);
        setLogs((prev) => [...prev, 'Live WebSocket connected to backend agent orchestrator.']);
      };
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'AGENT_START') {
            setAgents((prev) =>
              prev.map((a) => (a.id === data.agent_id ? { ...a, status: 'running' } : a))
            );
            setLogs((prev) => [...prev, `[START] ${data.name} executing tools...`]);
          } else if (data.type === 'AGENT_FINISH') {
            const ev = data.event;
            setAgents((prev) =>
              prev.map((a) =>
                a.id === ev.agent_id
                  ? { ...a, status: 'success', lastExecutionMs: ev.execution_time_ms, lastSummary: ev.output_summary }
                  : a
              )
            );
            setLogs((prev) => [
              ...prev,
              `[SUCCESS] ${ev.agent_name} (${ev.execution_time_ms}ms): ${ev.output_summary}`
            ]);
          } else if (data.type === 'WORKFLOW_COMPLETE') {
            setIsRunning(false);
            setLogs((prev) => [...prev, 'Workflow completed. All consequential dispatches routed to human approval gate.']);
          }
        } catch (e) {
          console.error(e);
        }
      };
      ws.onclose = () => setWsConnected(false);
    } catch (e) {
      console.warn('WebSocket connection not available; standard polling active.');
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleStartWorkflow = async () => {
    setIsRunning(true);
    setLogs((prev) => [...prev, 'Triggering 8-Agent LangGraph Workflow for Chennai...']);
    
    // Optimistic animation for UI
    setAgents((prev) => prev.map((a) => ({ ...a, status: 'running' })));

    try {
      const res: any = await api.triggerAgentWorkflow({
        scenario_code: 'SCENARIO_A',
        rainfall_intensity_mmh: 95.0,
        rainfall_duration_h: 4.0
      });
      if (res && res.events) {
        setAgents((prev) =>
          prev.map((a, i) => {
            const ev = res.events[i];
            return ev
              ? { ...a, status: 'success', lastExecutionMs: ev.execution_time_ms, lastSummary: ev.output_summary }
              : { ...a, status: 'success' };
          })
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#8B5CF6]/40 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#8B5CF6]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              AI Agent Control Centre · LangGraph Orchestration
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40">
              8 AGENTS ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Deterministic multi-agent workflow coordinating meteorological, hydrological ML, topological, and resource optimization algorithms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#060B1A] border border-[#131D38] text-[11px] font-mono">
            <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
            <span className="text-[#94A3B8]">{wsConnected ? 'WEBSOCKET STREAMING' : 'OFFLINE POLLING'}</span>
          </div>
          <button
            onClick={handleStartWorkflow}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] text-white shadow-lg hover:brightness-110 disabled:opacity-50 transition"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? 'Orchestrating...' : 'Start 8-Agent Analysis'}</span>
          </button>
        </div>
      </div>

      {/* 8-Agent Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((ag) => (
          <div
            key={ag.id}
            className={`p-4 rounded-2xl bg-[#0D1428] border transition relative flex flex-col justify-between ${
              ag.status === 'running'
                ? 'border-[#06D6EF] shadow-lg shadow-[#06D6EF]/20'
                : ag.status === 'success'
                ? 'border-[#10B981]/50'
                : 'border-[#131D38]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-[#06D6EF]">{ag.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    ag.status === 'running'
                      ? 'bg-[#06D6EF]/20 text-[#06D6EF] animate-pulse'
                      : ag.status === 'success'
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#1E293B] text-[#94A3B8]'
                  }`}
                >
                  {ag.status}
                </span>
              </div>
              <h4 className="font-bold text-sm text-white">{ag.name}</h4>
              <p className="text-[11px] text-[#94A3B8] mt-1">{ag.role}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#131D38] space-y-1 text-[11px]">
              <div className="flex justify-between text-[#64748B]">
                <span>Latency:</span>
                <span className="font-mono text-white font-medium">
                  {ag.lastExecutionMs ? `${ag.lastExecutionMs} ms` : '180 ms'}
                </span>
              </div>
              <p className="text-[#94A3B8] text-[10px] leading-tight line-clamp-2 mt-1">
                {ag.lastSummary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Live Event Stream Terminal */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#06D6EF]" />
            <h3 className="font-bold text-sm text-white">Live Multi-Agent Orchestration Logs</h3>
          </div>
          <span className="text-xs font-mono text-[#94A3B8]">Streaming Live</span>
        </div>

        <div className="p-4 rounded-xl bg-[#060B1A] border border-[#131D38] font-mono text-xs text-[#06D6EF] h-48 overflow-y-auto space-y-1.5 custom-scrollbar">
          {logs.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#64748B] select-none">&gt;</span>
              <span className={line.includes('SUCCESS') ? 'text-[#10B981]' : line.includes('START') ? 'text-[#8B5CF6]' : 'text-[#F8FAFC]'}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
