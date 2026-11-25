import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAppStore } from '../stores/useAppStore';
import { City3DCanvas } from '../components/twin/City3DCanvas';
import { MapLibreView } from '../components/map/MapLibreView';
import {
  Activity,
  AlertTriangle,
  Ambulance,
  Building2,
  CloudRain,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export const CommandCentre: React.FC = () => {
  const { openGuidedDemo, openCopilot } = useAppStore();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'3d' | 'map'>('3d');
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getDashboardOverview();
      setDashboardData(data);
      const recs = await api.getRecommendations();
      setRecommendations(recs);
    } catch (err) {
      console.error('Error fetching dashboard overview:', err);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await api.actOnRecommendation(id, 'Approved');
      loadData();
    } catch (err) {
      console.error('Error approving recommendation:', err);
    }
  };

  const handleQuickSimulation = async () => {
    setIsSimulating(true);
    try {
      await api.triggerAgentWorkflow({
        scenario_code: 'SCENARIO_A',
        rainfall_intensity_mmh: 95.0,
        rainfall_duration_h: 4.0
      });
      await loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  // 12-Hour Risk Trend Projection Data
  const riskTrendData = [
    { time: '08:00', risk: 38, rainfall: 12 },
    { time: '10:00', risk: 45, rainfall: 24 },
    { time: '12:00', risk: 62, rainfall: 48 },
    { time: '14:00', risk: 78, rainfall: 75 },
    { time: '16:00', risk: 85, rainfall: 95 },
    { time: '18:00', risk: 72, rainfall: 55 },
    { time: '20:00', risk: 54, rainfall: 30 }
  ];

  const zoneRiskDistribution = [
    { zone: 'Velachery', risk: 94, color: '#EF4444' },
    { zone: 'Perungudi', risk: 90, color: '#EF4444' },
    { zone: 'T. Nagar', risk: 82, color: '#F59E0B' },
    { zone: 'Adyar', risk: 78, color: '#F59E0B' },
    { zone: 'Porur', risk: 76, color: '#F59E0B' },
    { zone: 'Guindy', risk: 55, color: '#06D6EF' },
    { zone: 'Tambaram', risk: 60, color: '#06D6EF' },
    { zone: 'Anna Nagar', risk: 32, color: '#10B981' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Status & Quick Simulation Trigger */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Chennai Urban Command Centre · BF26-CIVICTWIN-AI
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              TAMIL NADU, INDIA
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Real-time multi-agent crisis monitoring: 8 zones, 12 critical infrastructure nodes, live radar telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={openGuidedDemo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#131D38] border border-[#2563EB]/40 text-[#06D6EF] hover:bg-[#2563EB]/20 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guided Tour</span>
          </button>
          <button
            onClick={handleQuickSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white shadow-lg shadow-[#2563EB]/30 hover:brightness-110 disabled:opacity-50 transition"
          >
            <Cpu className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Running 8 Agents...' : 'Trigger Full Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Urban Risk Index */}
        <div className="p-3.5 rounded-xl bg-[#0D1428] border border-[#F59E0B]/40 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-[10px] font-mono">
            <span>URBAN RISK INDEX</span>
            <Activity className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-mono font-extrabold text-[#F59E0B]">
              {dashboardData?.urban_risk_index || '68.5'}
            </span>
            <span className="text-[10px] text-[#94A3B8]">/ 100</span>
          </div>
          <span className="text-[10px] font-semibold text-amber-400 mt-1">Elevated Risk</span>
        </div>

        {/* Doppler Rainfall */}
        <div className="p-3.5 rounded-xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-[10px] font-mono">
            <span>RAINFALL RATE</span>
            <CloudRain className="w-3.5 h-3.5 text-[#06D6EF]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-mono font-extrabold text-[#06D6EF]">
              {dashboardData?.weather?.rainfall_mm || '48.2'}
            </span>
            <span className="text-[10px] text-[#94A3B8]">mm/hr</span>
          </div>
          <span className="text-[10px] text-[#94A3B8] mt-1">{dashboardData?.weather?.condition || 'Monsoon Showers'}</span>
        </div>

        {/* Critical Zones */}
        <div className="p-3.5 rounded-xl bg-[#0D1428] border border-red-500/30 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-[10px] font-mono">
            <span>CRITICAL ZONES</span>
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-mono font-extrabold text-red-400">
              {dashboardData?.kpi_metrics?.critical_risk_zones || '3'}
            </span>
            <span className="text-[10px] text-[#94A3B8]">/ 8 Zones</span>
          </div>
          <span className="text-[10px] text-red-400 mt-1">Velachery, Perungudi, T.Ngr</span>
        </div>

        {/* Hospital Accessibility */}
        <div className="p-3.5 rounded-xl bg-[#0D1428] border border-[#2563EB]/40 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-[10px] font-mono">
            <span>HOSPITALS ACTIVE</span>
            <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-mono font-extrabold text-white">
              {dashboardData?.kpi_metrics?.operational_facilities || '10'}
            </span>
            <span className="text-[10px] text-[#94A3B8]">/ 12 Nodes</span>
          </div>
          <span className="text-[10px] text-amber-400 mt-1">2 Corridors Threatened</span>
        </div>

        {/* Emergency Fleet */}
        <div className="p-3.5 rounded-xl bg-[#0D1428] border border-[#10B981]/30 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-[10px] font-mono">
            <span>FLEET READINESS</span>
            <Ambulance className="w-3.5 h-3.5 text-[#10B981]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-mono font-extrabold text-[#10B981]">
              {dashboardData?.kpi_metrics?.available_emergency_units || '11'}
            </span>
            <span className="text-[10px] text-[#94A3B8]">Units Free</span>
          </div>
          <span className="text-[10px] text-[#10B981] mt-1">86.4% Coverage</span>
        </div>

        {/* Pending Approvals */}
        <div className="p-3.5 rounded-xl bg-[#0D1428] border border-[#8B5CF6]/40 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#94A3B8] text-[10px] font-mono">
            <span>PENDING SIGN-OFF</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-mono font-extrabold text-[#8B5CF6]">
              {dashboardData?.kpi_metrics?.pending_approvals_count || '4'}
            </span>
            <span className="text-[10px] text-[#94A3B8]">Actions</span>
          </div>
          <span className="text-[10px] text-[#8B5CF6] mt-1">Human Gate Active</span>
        </div>
      </div>

      {/* Main Visualizer: 3D Twin vs MapLibre Map */}
      <div className="relative rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 overflow-hidden shadow-2xl">
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-[#060B1A]/90 border border-[#2563EB]/40 backdrop-blur-md">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === '3d'
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            3D Digital Twin
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'map'
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            2D MapLibre Map
          </button>
        </div>

        <div className="w-full h-[520px]">
          {viewMode === '3d' ? <City3DCanvas /> : <MapLibreView />}
        </div>
      </div>

      {/* Middle Row: Risk Trend Projection & Zone Threat Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Trend Projection Chart */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Precipitation & Risk Trend Projection</h3>
              <p className="text-xs text-[#94A3B8]">Modeled flood stress progression over Chennai basins</p>
            </div>
            <span className="text-xs font-mono text-[#06D6EF]">Doppler Model</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1428', borderColor: '#2563EB', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#riskGrad)" name="Risk Index" />
                <Area type="monotone" dataKey="rainfall" stroke="#06D6EF" strokeWidth={1.5} fill="transparent" name="Rainfall mm/h" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zone Threat Bar Distribution */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Zone Vulnerability Index</h3>
              <p className="text-xs text-[#94A3B8]">Ranked hydrological stress by urban ward</p>
            </div>
            <span className="text-xs font-mono text-[#F59E0B]">8 Zones</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneRiskDistribution} layout="vertical" margin={{ left: 10, right: 10 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" fontSize={10} />
                <YAxis dataKey="zone" type="category" stroke="#94A3B8" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1428', borderColor: '#06D6EF', fontSize: '12px' }}
                />
                <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
                  {zoneRiskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section: Preventive Recommendations with Human Approval Gate */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#06D6EF]" />
            <div>
              <h3 className="font-bold text-sm text-white">
                AI Supervisor Preventive Recommendations · Human Approval Gate
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Consequential municipal actions requiring authorization before field deployment
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
            Safety Protocol Enforced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A1124] text-[#94A3B8] font-mono uppercase text-[10px] border-b border-[#131D38]">
              <tr>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Strategy / Action</th>
                <th className="py-2.5 px-3">Target Zone</th>
                <th className="py-2.5 px-3">Estimated Impact</th>
                <th className="py-2.5 px-3">Governance Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#131D38]">
              {(recommendations.length > 0 ? recommendations : [
                {
                  id: 1,
                  priority: 'Critical',
                  title: 'Pre-stage 2 High-Flow Mobile Pumps at Mount-Poonamallee Sluice',
                  target_zone: 'Guindy / Manapakkam',
                  estimated_impact: 'Prevents MIOT Hospital cutoff; saves 14.5 min ambulance delay',
                  status: 'Pending Approval'
                },
                {
                  id: 2,
                  priority: 'High',
                  title: 'Implement Emergency Blue Lane Contraflow on Anna Salai',
                  target_zone: 'Guindy to Nandanam',
                  estimated_impact: 'Maintains ambulance transit speed > 40 km/h',
                  status: 'Pending Approval'
                },
                {
                  id: 3,
                  priority: 'Critical',
                  title: 'Stage Mobile 500kVA Generator at Velachery 230kV Substation',
                  target_zone: 'Velachery',
                  estimated_impact: 'Maintains 85,000 L/min stormwater pump discharge',
                  status: 'Pending Approval'
                }
              ]).map((rec) => (
                <tr key={rec.id} className="hover:bg-[#131D38]/50 transition">
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rec.priority === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-white">{rec.title}</td>
                  <td className="py-3 px-3 font-mono text-[#06D6EF]">{rec.target_zone}</td>
                  <td className="py-3 px-3 text-[#94A3B8]">{rec.estimated_impact}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        rec.status === 'Approved'
                          ? 'bg-[#10B981]/20 text-[#10B981] font-bold'
                          : 'bg-[#8B5CF6]/20 text-[#8B5CF6]'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {rec.status !== 'Approved' ? (
                      <button
                        onClick={() => handleApprove(rec.id)}
                        className="px-3 py-1 bg-gradient-to-r from-[#10B981] to-[#06D6EF] text-[#060B1A] font-bold text-[11px] rounded-lg shadow hover:brightness-110 active:scale-95 transition"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-[#10B981] font-semibold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Authorized
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
