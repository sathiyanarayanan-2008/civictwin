import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Building2, Activity, Zap, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const InfrastructureMonitoringPage: React.FC = () => {
  const [infraList, setInfraList] = useState<any[]>([]);

  useEffect(() => {
    loadInfra();
  }, []);

  const loadInfra = async () => {
    try {
      const data = await api.getInfrastructure();
      setInfraList(data);
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
            <Building2 className="w-5 h-5 text-[#2563EB]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Infrastructure Health & Dependency Monitoring
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              TELEMETRY REGISTRY
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Real-time status, elevation benchmarks, backup power readiness, and topological vulnerabilities across Chennai nodes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] bg-[#060B1A] px-3 py-1.5 rounded-xl border border-[#131D38]">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>12 CRITICAL ASSETS TRACKED</span>
        </div>
      </div>

      {/* Infrastructure Table */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
        <h3 className="font-bold text-sm text-white">Chennai Critical Asset Inventory</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A1124] text-[#94A3B8] font-mono uppercase text-[10px] border-b border-[#131D38]">
              <tr>
                <th className="py-2.5 px-3">Asset ID</th>
                <th className="py-2.5 px-3">Facility Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Elevation</th>
                <th className="py-2.5 px-3">Capacity</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Vulnerability</th>
                <th className="py-2.5 px-3">Backup Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#131D38]">
              {infraList.map((inf) => (
                <tr key={inf.id} className="hover:bg-[#131D38]/50">
                  <td className="py-3 px-3 font-mono text-[#06D6EF]">#{inf.id}</td>
                  <td className="py-3 px-3 font-semibold text-white">{inf.name}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2563EB]/20 text-[#06D6EF]">
                      {inf.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#94A3B8]">{inf.elevation_m}m MSL</td>
                  <td className="py-3 px-3 font-mono text-white">{inf.capacity}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inf.status === 'Operational' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {inf.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-white">
                    {Math.round(inf.vulnerability * 100)}%
                  </td>
                  <td className="py-3 px-3">
                    {inf.has_backup_power ? (
                      <span className="text-[#10B981] flex items-center gap-1 text-[11px]">
                        <Zap className="w-3.5 h-3.5" /> Equipped
                      </span>
                    ) : (
                      <span className="text-amber-400 text-[11px]">Grid Dependent</span>
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
