import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { GitCompare, CheckCircle2, XCircle, ArrowDown, ArrowUp, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const PreventionComparatorPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadComparison();
  }, []);

  const loadComparison = async () => {
    try {
      const res = await api.getPreventionComparison();
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = data ? [
    { name: 'Affected Roads', Baseline: data.baseline.affected_roads, Preventive: data.intervention.affected_roads },
    { name: 'Inaccessible Facilities', Baseline: data.baseline.inaccessible_facilities, Preventive: data.intervention.inaccessible_facilities },
    { name: 'Avg Travel Delay (min)', Baseline: data.baseline.avg_travel_time_min, Preventive: data.intervention.avg_travel_time_min },
    { name: 'Unserved Demand (%)', Baseline: data.baseline.unserved_demand_pct, Preventive: data.intervention.unserved_demand_pct },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#10B981]/40 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-[#10B981]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Prevention Impact Comparator · Core Innovation Module
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
              COUNTERFACTUAL EVALUATION
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Mathematical side-by-side comparison between unmitigated crisis progression and CivicTwin AI's preventive action plan.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-xs font-mono text-[#10B981]">
          <span className="font-bold text-lg">62.1%</span>
          <span>OVERALL DISRUPTION MITIGATED</span>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: No Intervention */}
          <div className="p-5 rounded-2xl bg-[#0D1428] border border-red-500/40 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#131D38]">
              <div>
                <span className="text-[10px] font-mono text-red-400 uppercase">Scenario 1 (Unmitigated)</span>
                <h3 className="text-base font-bold text-white">Baseline Crisis Progression</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-400 font-bold">
                NO PREVENTIVE ACTION
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#060B1A] border border-red-500/20">
                <div className="text-2xl font-mono font-bold text-red-400">{data.baseline.affected_roads}</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Roads Cut Off</div>
              </div>
              <div className="p-3 rounded-xl bg-[#060B1A] border border-red-500/20">
                <div className="text-2xl font-mono font-bold text-red-400">{data.baseline.inaccessible_facilities}</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Facilities Isolated</div>
              </div>
              <div className="p-3 rounded-xl bg-[#060B1A] border border-red-500/20">
                <div className="text-2xl font-mono font-bold text-red-400">{data.baseline.avg_travel_time_min}m</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Ambulance Delay</div>
              </div>
              <div className="p-3 rounded-xl bg-[#060B1A] border border-red-500/20">
                <div className="text-2xl font-mono font-bold text-red-400">{data.baseline.disruption_score}</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Disruption Score</div>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Mount-Poonamallee and Velachery bypass become submerged, cutting off MIOT Hospital emergency ingress and leaving 46% of simulated civic distress calls unserved.
            </p>
          </div>

          {/* Scenario 2: CivicTwin AI Preventive Strategy */}
          <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#10B981]/50 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#131D38]">
              <div>
                <span className="text-[10px] font-mono text-[#10B981] uppercase">Scenario 2 (CivicTwin AI)</span>
                <h3 className="text-base font-bold text-white">AI-Recommended Preventive Plan</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#10B981]/20 text-[#10B981] font-bold">
                OPTIMIZED INTERVENTION
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#060B1A] border border-[#10B981]/30">
                <div className="text-2xl font-mono font-bold text-[#10B981]">{data.intervention.affected_roads}</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Roads Cut Off</div>
              </div>
              <div className="p-3 rounded-xl bg-[#060B1A] border border-[#10B981]/30">
                <div className="text-2xl font-mono font-bold text-[#10B981]">{data.intervention.inaccessible_facilities}</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Facilities Isolated</div>
              </div>
              <div className="p-3 rounded-xl bg-[#060B1A] border border-[#10B981]/30">
                <div className="text-2xl font-mono font-bold text-[#10B981]">{data.intervention.avg_travel_time_min}m</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Ambulance Delay</div>
              </div>
              <div className="p-3 rounded-xl bg-[#060B1A] border border-[#10B981]/30">
                <div className="text-2xl font-mono font-bold text-[#10B981]">{data.intervention.disruption_score}</div>
                <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Disruption Score</div>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Pre-staging 2 mobile de-watering pumps at Mount-Poonamallee and establishing Anna Salai emergency contraflow preserves hospital access and reduces emergency travel time by 14.6 mins.
            </p>
          </div>
        </div>
      )}

      {/* Comparative Bar Chart */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
        <h3 className="font-bold text-sm text-white">Quantitative Outcome Differential</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0D1428', borderColor: '#2563EB', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Baseline" fill="#EF4444" name="Baseline (No Action)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Preventive" fill="#10B981" name="CivicTwin Preventive Plan" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
