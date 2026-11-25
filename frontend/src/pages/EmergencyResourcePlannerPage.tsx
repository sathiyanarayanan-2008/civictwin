import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Ambulance, Navigation, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export const EmergencyResourcePlannerPage: React.FC = () => {
  const [allocationData, setAllocationData] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    loadPlanner();
  }, []);

  const loadPlanner = async () => {
    try {
      const res = await api.optimizeResources({
        closed_roads: [1001, 1003],
        available_ambulances: 18,
        available_rescue_boats: 10,
        available_pumps: 6
      });
      setAllocationData(res);
      const resList = await api.getResources();
      setResources(resList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#2563EB]/40 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Ambulance className="w-5 h-5 text-[#2563EB]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Emergency Resource & Route Optimization Planner
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              OR-TOOLS OPTIMIZATION
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Optimizes ambulance, boat, and pump staging while calculating alternative transit routes that bypass flooded roads.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#060B1A] border border-[#131D38] text-xs font-mono text-[#06D6EF]">
          <Navigation className="w-4 h-4 text-[#10B981]" />
          <span>DYNAMIC FLOOD-AWARE ROUTING ACTIVE</span>
        </div>
      </div>

      {/* Decision Support Sign-off Banner */}
      <div className="p-3.5 rounded-xl bg-[#060B1A] border border-[#F59E0B]/50 text-xs text-[#F8FAFC] flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#F59E0B] shrink-0" />
        <p className="leading-relaxed">
          <b>PROTOTYPE DECISION-SUPPORT SYSTEM:</b> All emergency vehicle dispatches and contraflow diversions require explicit human approval from the TNFRS Emergency Response Coordinator before field dispatch.
        </p>
      </div>

      {/* Alternative Detour Routes for Critical Facilities */}
      {allocationData && allocationData.critical_routes && (
        <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <h3 className="font-bold text-sm text-white">Dynamic Hospital Access Corridor Rerouting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allocationData.critical_routes.map((rt: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-[#0A1124] border border-[#2563EB]/30 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{rt.facility}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    rt.status === 'Severed' ? 'bg-red-500/20 text-red-400' : 'bg-[#10B981]/20 text-[#10B981]'
                  }`}>
                    {rt.status}
                  </span>
                </div>
                <div className="text-xs text-[#94A3B8]">
                  <span>Standard Corridor: </span>
                  <span className="font-mono text-white">{rt.corridor}</span>
                </div>
                <div className="text-xs text-[#06D6EF]">
                  <span className="font-semibold">Recommended Detour: </span>
                  <span>{rt.recommended_detour}</span>
                </div>
                <div className="text-[11px] font-mono text-[#F59E0B]">
                  Detour Travel Penalty: +{rt.detour_penalty_min} minutes
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zone Resource Allocations Table */}
      {allocationData && allocationData.zone_allocations && (
        <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <h3 className="font-bold text-sm text-white">Optimized Fleet Distribution by Ward</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A1124] text-[#94A3B8] font-mono uppercase text-[10px] border-b border-[#131D38]">
                <tr>
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Zone</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3">Assigned Ambulances</th>
                  <th className="py-2.5 px-3">Assigned Boats</th>
                  <th className="py-2.5 px-3">Assigned Pumps</th>
                  <th className="py-2.5 px-3">Route Access Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#131D38]">
                {allocationData.zone_allocations.map((z: any) => (
                  <tr key={z.zone_id} className="hover:bg-[#131D38]/50">
                    <td className="py-3 px-3 font-mono text-[#06D6EF]">#{z.priority_rank}</td>
                    <td className="py-3 px-3 font-semibold text-white">{z.zone_name}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        z.risk_level === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {z.risk_level}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-white">{z.assigned_ambulances} units</td>
                    <td className="py-3 px-3 font-mono text-white">{z.assigned_rescue_boats} units</td>
                    <td className="py-3 px-3 font-mono text-white">{z.assigned_mobile_pumps} units</td>
                    <td className="py-3 px-3 text-[#94A3B8] text-[11px]">{z.route_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
