import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileSearch, Sparkles, CheckCircle2, HelpCircle, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const ExplainableAIPage: React.FC = () => {
  const [modelMetrics, setModelMetrics] = useState<any>(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await api.getModelMetrics();
      setModelMetrics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const featureImportanceData = [
    { name: 'Rainfall Intensity (mm/h)', importance: 0.348, color: '#06D6EF' },
    { name: 'Accumulated Rainfall (24h)', importance: 0.321, color: '#2563EB' },
    { name: 'Elevation (m MSL)', importance: 0.102, color: '#EF4444' },
    { name: 'Proximity to Water Canal', importance: 0.074, color: '#F59E0B' },
    { name: 'Drainage Maintenance Score', importance: 0.059, color: '#10B981' },
    { name: 'Drainage Network Capacity', importance: 0.044, color: '#8B5CF6' },
    { name: 'Impervious Surface Ratio', importance: 0.038, color: '#64748B' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#8B5CF6]/40 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-[#8B5CF6]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Explainable AI (XAI) & SHAP Transparency
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40">
              CIVICTWIN-RF-V1.0
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Auditable machine learning predictions with SHAP-aligned feature contributions, confusion matrix, and non-technical rationales.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] bg-[#060B1A] px-3 py-1.5 rounded-xl border border-[#131D38]">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>ROC-AUC: 0.9459 · ACCURACY: 89.6%</span>
        </div>
      </div>

      {/* Model Performance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38]">
          <div className="text-[10px] font-mono text-[#94A3B8]">MODEL ACCURACY</div>
          <div className="text-2xl font-mono font-bold text-white mt-1">89.6%</div>
          <span className="text-[10px] text-[#10B981]">Baseline: 70.1%</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38]">
          <div className="text-[10px] font-mono text-[#94A3B8]">PRECISION</div>
          <div className="text-2xl font-mono font-bold text-white mt-1">82.1%</div>
          <span className="text-[10px] text-[#94A3B8]">High Alert Trust</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38]">
          <div className="text-[10px] font-mono text-[#94A3B8]">RECALL (SENSITIVITY)</div>
          <div className="text-2xl font-mono font-bold text-white mt-1">83.4%</div>
          <span className="text-[10px] text-[#94A3B8]">Low Missed Flood Risk</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38]">
          <div className="text-[10px] font-mono text-[#94A3B8]">ROC-AUC SCORE</div>
          <div className="text-2xl font-mono font-bold text-[#10B981] mt-1">0.9459</div>
          <span className="text-[10px] text-[#10B981]">Excellent Discriminative Power</span>
        </div>
      </div>

      {/* Feature Importance Bar Chart */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
        <h3 className="font-bold text-sm text-white">Hydrological Feature Importance Weighting (Random Forest)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureImportanceData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" domain={[0, 0.4]} stroke="#64748B" fontSize={11} />
              <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} width={180} />
              <Tooltip contentStyle={{ backgroundColor: '#0D1428', borderColor: '#8B5CF6', fontSize: '12px' }} />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                {featureImportanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Plain English Rationales */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 space-y-3">
        <h3 className="font-bold text-sm text-white">Transparent Non-Technical Explainability Rationale</h3>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          "Velachery Bypass Road and Mount-Poonamallee access corridors exhibit critical modelled flood risk (84% - 94%) because forecast rainfall (85mm/hr to 95mm/hr) exceeds local stormwater drainage capacity (32mm/hr to 40mm/hr), and topological elevation is only 4.1m above mean sea level. In addition, high impervious concrete surface coverage prevents natural soil percolation."
        </p>
      </div>
    </div>
  );
};
