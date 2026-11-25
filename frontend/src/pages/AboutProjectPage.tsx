import React from 'react';
import { Logo } from '../components/common/Logo';
import { useAppStore } from '../stores/useAppStore';
import { Info, Sparkles, Award, User, Building, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';

export const AboutProjectPage: React.FC = () => {
  const { openGuidedDemo } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Logo size={42} />
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              CivicTwin AI — Project Showcase & Identification
            </h1>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              BUILDFEST 2026 National Student Hackathon by Learnix Labs · Domain: AI & Machine Learning
            </p>
          </div>
        </div>

        <button
          onClick={openGuidedDemo}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white shadow-lg hover:brightness-110 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch 1-Click Evaluation Tour</span>
        </button>
      </div>

      {/* Hackathon Submission Credentials Table */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
        <h3 className="font-bold text-sm text-white">Project Identity & Author Credentials</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#0A1124] border border-[#131D38]">
            <div className="text-[10px] text-[#94A3B8]">PROJECT ID</div>
            <div className="text-sm font-bold text-white mt-1">BF26-CIVICTWIN-AI</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0A1124] border border-[#131D38]">
            <div className="text-[10px] text-[#94A3B8]">DEVELOPER</div>
            <div className="text-sm font-bold text-[#06D6EF] mt-1">Sathiya Narayanan V S</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0A1124] border border-[#131D38]">
            <div className="text-[10px] text-[#94A3B8]">INSTITUTION</div>
            <div className="text-sm font-bold text-white mt-1">Easwari Engineering College</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0A1124] border border-[#131D38]">
            <div className="text-[10px] text-[#94A3B8]">DEPARTMENT</div>
            <div className="text-sm font-bold text-white mt-1">Information Technology</div>
          </div>
        </div>
      </div>

      {/* Abstract & Innovation Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <h3 className="font-bold text-sm text-white">Project Abstract</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Modern cities experience severe interconnected crises during extreme weather events: monsoonal cloudbursts trigger urban waterlogging, which drowns arterial roads, paralyses traffic grids, isolates trauma hospitals, and delays emergency medical response. Existing municipal command systems react only after infrastructure fails.
          </p>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            <b>CivicTwin AI</b> pioneers a <b>Cascading Crisis Intelligence Engine</b> using NetworkX dependency graphs, a Random Forest hydrological risk predictor (89.6% validated accuracy, 0.945 ROC-AUC), and an 8-Agent collaborative multi-agent architecture. By modeling how failures propagate across power substations, stormwater pumps, and road networks, the system recommends pre-emptive pump staging, lane contraflow, and flood-aware routing—empirically mitigating 62.1% of overall urban disruption before crisis strikes.
          </p>
          <div className="p-4 rounded-xl bg-[#060B1A] border border-[#10B981]/40 text-xs text-[#10B981] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Demonstrated on Chennai, Tamil Nadu, India across 8 urban basins with reproducible seeded datasets.</span>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <h3 className="font-bold text-sm text-white">Key Differentiators</h3>
          <ul className="space-y-3 text-xs text-[#94A3B8]">
            <li className="flex items-start gap-2">
              <span className="text-[#06D6EF] font-bold">1.</span>
              <span><b>Predictive, Not Reactive:</b> Models the cascading domino effect before water accumulates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#06D6EF] font-bold">2.</span>
              <span><b>8 Specialized Agents:</b> Deterministic execution with real tools, without paid API dependency.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#06D6EF] font-bold">3.</span>
              <span><b>Auditable XAI:</b> Transparent SHAP feature contributions and mandatory human approval gates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#06D6EF] font-bold">4.</span>
              <span><b>Interactive 3D & 2D:</b> Three.js WebGL city coupled with MapLibre GL JS offline-fallback maps.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
