import React from 'react';
import { Network, Cpu, Database, Globe, Layers, ShieldCheck } from 'lucide-react';

export const ProjectArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-[#06D6EF]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              System Architecture & Data Engineering Pipeline
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              END-TO-END SPECIFICATION
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Production-oriented monorepo architecture connecting FastAPI, NetworkX, Scikit-Learn, React Three Fiber, and MapLibre GL.
          </p>
        </div>

        <div className="text-xs font-mono text-[#10B981] bg-[#060B1A] px-3 py-1.5 rounded-xl border border-[#131D38]">
          ENTERPRISE TIERS (4 LAYERS)
        </div>
      </div>

      {/* Layer Architecture Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        {/* Layer 1: Geospatial Ingestion */}
        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#2563EB]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#06D6EF] font-bold">
            <Globe className="w-4 h-4" />
            <span>1. Sensing & Ingestion</span>
          </div>
          <ul className="space-y-1.5 text-[#94A3B8]">
            <li>• Open-Meteo Doppler Radar & Precipitation Telemetry</li>
            <li>• Chennai DEM Elevation Grids (2m to 25m MSL)</li>
            <li>• GCC 1913 Crowdsourced Citizen Reporting API</li>
            <li>• TANGEDCO High-Voltage Substation Feeder Topology</li>
          </ul>
        </div>

        {/* Layer 2: Intelligence & Simulation */}
        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#8B5CF6]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#8B5CF6] font-bold">
            <Cpu className="w-4 h-4" />
            <span>2. AI & Graph Simulation</span>
          </div>
          <ul className="space-y-1.5 text-[#94A3B8]">
            <li>• Random Forest Risk Predictor (89.6% Acc, 0.945 AUC)</li>
            <li>• NetworkX Cascading Infrastructure Dependency Graph</li>
            <li>• Google OR-Tools Constrained Resource Optimizer</li>
            <li>• SHAP-aligned Feature Contribution Engine</li>
          </ul>
        </div>

        {/* Layer 3: Multi-Agent Orchestration */}
        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#06D6EF] font-bold">
            <Layers className="w-4 h-4" />
            <span>3. 8-Agent LangGraph Layer</span>
          </div>
          <ul className="space-y-1.5 text-[#94A3B8]">
            <li>• Staged State Blackboard Execution</li>
            <li>• Supervisor Agent Conflict Resolution</li>
            <li>• Mandatory Human-in-the-Loop Approval Gate</li>
            <li>• WebSocket Real-time Telemetry Broadcaster</li>
          </ul>
        </div>

        {/* Layer 4: Interactive Command UI */}
        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#10B981]/40 space-y-3">
          <div className="flex items-center gap-2 text-[#10B981] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>4. Presentation & Twin</span>
          </div>
          <ul className="space-y-1.5 text-[#94A3B8]">
            <li>• Three.js / React Three Fiber Procedural 3D City</li>
            <li>• MapLibre GL JS Offline-Resilient Chennai Map</li>
            <li>• Prevention Impact Comparator (Side-by-side)</li>
            <li>• ReportLab Real PDF Dossier Exporter</li>
          </ul>
        </div>
      </div>

      {/* Relational Database Schema Overview */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Database className="w-4 h-4 text-[#06D6EF]" />
          <span>Relational Schema & PostGIS Compatibility (22 Tables)</span>
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          The database architecture supports SQLite locally with zero configuration and seamless PostgreSQL / PostGIS migration in production. Tables include <code>users</code>, <code>cities</code>, <code>zones</code>, <code>infrastructure</code>, <code>infrastructure_dependencies</code>, <code>road_segments</code>, <code>weather_records</code>, <code>risk_predictions</code>, <code>incidents</code>, <code>citizen_reports</code>, <code>resources</code>, <code>simulation_scenarios</code>, <code>simulation_results</code>, <code>agent_runs</code>, <code>agent_events</code>, <code>recommendations</code>, <code>approval_records</code>, and <code>audit_logs</code>.
        </p>
      </div>
    </div>
  );
};
