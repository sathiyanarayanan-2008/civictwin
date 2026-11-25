import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { useAppStore } from '../stores/useAppStore';
import { City3DCanvas } from '../components/twin/City3DCanvas';
import {
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Cpu,
  Box,
  MapPin,
  CheckCircle,
  GitCompare,
  Activity,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { openGuidedDemo } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#060B1A] text-[#F8FAFC] flex flex-col overflow-x-hidden selection:bg-[#06D6EF]/30 selection:text-[#06D6EF]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full h-18 bg-[#060B1A]/80 backdrop-blur-xl border-b border-[#06D6EF]/15 px-6 lg:px-12 flex items-center justify-between">
        <Logo size={38} />

        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-[#94A3B8]">
          <a href="#problem" className="hover:text-white transition">Problem & Solution</a>
          <a href="#novelty" className="hover:text-white transition">Core Innovation</a>
          <a href="#multi-agent" className="hover:text-white transition">8-Agent Architecture</a>
          <a href="#about" className="hover:text-white transition">BUILDFEST 2026</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openGuidedDemo}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0D1428] border border-[#06D6EF]/40 text-[#06D6EF] hover:bg-[#06D6EF]/10 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guided Tour</span>
          </button>
          <button
            onClick={() => navigate('/app/command-centre')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white shadow-lg shadow-[#2563EB]/40 hover:brightness-110 active:scale-95 transition"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section with Interactive 3D Preview */}
      <section className="relative px-6 lg:px-12 pt-12 pb-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#2563EB]/15 border border-[#06D6EF]/30 text-[#06D6EF]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>BUILDFEST 2026 · BF26-CIVICTWIN-AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            The Future of <br />
            <span className="bg-gradient-to-r from-[#06D6EF] via-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
              Urban Crisis Prevention
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl">
            Modern cities react after disasters strike. <b>CivicTwin AI</b> is an agentic, simulation-driven digital twin that anticipates cascading infrastructure failures—from monsoonal cloudbursts to road closures and hospital inaccessibility—and optimizes preventive interventions before disaster unfolds.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => navigate('/app/command-centre')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white shadow-xl shadow-[#2563EB]/30 hover:brightness-110 transition"
            >
              <span>Explore Command Centre</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openGuidedDemo}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#0D1428] border border-[#2563EB]/40 text-[#F8FAFC] hover:bg-[#131D38] transition"
            >
              <Sparkles className="w-4 h-4 text-[#06D6EF]" />
              <span>1-Click Hackathon Demo</span>
            </button>
            <button
              onClick={() => navigate('/app/architecture')}
              className="px-4 py-3 rounded-xl text-xs font-mono text-[#94A3B8] hover:text-white transition"
            >
              View Architecture &rarr;
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#131D38] max-w-lg">
            <div>
              <div className="text-xl font-mono font-bold text-[#06D6EF]">8</div>
              <div className="text-[11px] text-[#94A3B8]">Autonomous Agents</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-[#10B981]">62.1%</div>
              <div className="text-[11px] text-[#94A3B8]">Disruption Reduction</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-[#8B5CF6]">Chennai</div>
              <div className="text-[11px] text-[#94A3B8]">Demonstration City</div>
            </div>
          </div>
        </div>

        {/* 3D Interactive Scene Preview */}
        <div className="lg:col-span-6 relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#06D6EF]/30 shadow-2xl shadow-[#2563EB]/20 bg-[#0D1428]">
          <City3DCanvas />
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section id="problem" className="px-6 lg:px-12 py-16 bg-[#080E21] border-y border-[#131D38]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#06D6EF]">The Urban Challenge</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Reactive Systems Fail Modern Cities</h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Existing municipal monitoring dashboards operate in silos, only raising alarms after roads are submerged and hospitals are cut off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Reactive Dilemma */}
            <div className="p-6 rounded-2xl bg-[#0D1428] border border-red-500/30 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>The Conventional Reactive Approach</span>
              </div>
              <ul className="space-y-3 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Independent sensor alerts with zero cross-infrastructure dependency modeling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Cascading failures (e.g. pump substation outage leading to road submergence) are detected only after trauma hospital access is lost.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Emergency dispatch teams get trapped in flooded corridors due to lack of dynamic routing.</span>
                </li>
              </ul>
            </div>

            {/* The CivicTwin AI Solution */}
            <div className="p-6 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/40 space-y-4">
              <div className="flex items-center gap-2 text-[#06D6EF] font-bold text-sm">
                <Sparkles className="w-5 h-5" />
                <span>The CivicTwin AI Predictive Paradigm</span>
              </div>
              <ul className="space-y-3 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><b>Cascading Crisis Intelligence:</b> NetworkX topological dependency graph models multi-tier failure propagation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><b>8-Agent Collaborative Workflow:</b> Weather, ML inference, topology, and OR-Tools optimizer working in unison.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span><b>Explainable Decision Support:</b> SHAP rationales with strict human approval gates before dispatch execution.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Innovation & Cascade Example Section */}
      <section id="novelty" className="px-6 lg:px-12 py-16 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6]">Core Technical Novelty</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Cascading Crisis Intelligence Engine</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            CivicTwin AI models the domino effect across urban infrastructure so planners can stop secondary disasters before they propagate.
          </p>
        </div>

        {/* Visual Cascade Chain Diagram */}
        <div className="p-6 rounded-2xl bg-[#0D1428] border border-[#2563EB]/40 shadow-xl space-y-6">
          <div className="text-xs font-mono text-[#06D6EF] uppercase tracking-wider font-bold">
            Simulated Cascading Chain in South Chennai (Velachery & Guindy Basin)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#060B1A] border border-[#131D38]">
              <div className="text-[10px] font-mono text-[#94A3B8]">Trigger (T0)</div>
              <div className="font-bold text-white mt-1">95 mm/hr Rainfall</div>
              <p className="text-[11px] text-[#94A3B8] mt-1">Monsoon cloudburst exceeds local drainage capacity.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#060B1A] border border-[#F59E0B]/40">
              <div className="text-[10px] font-mono text-[#F59E0B]">Tier 1 (T+45m)</div>
              <div className="font-bold text-amber-300 mt-1">Velachery Ponding</div>
              <p className="text-[11px] text-[#94A3B8] mt-1">Low elevation (4.1m) leads to 0.45m surface water.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#060B1A] border border-red-500/40">
              <div className="text-[10px] font-mono text-red-400">Tier 2 (T+90m)</div>
              <div className="font-bold text-red-300 mt-1">Mount-Poonamallee Cut</div>
              <p className="text-[11px] text-[#94A3B8] mt-1">Arterial road submerged, severing primary ambulance ingress.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#060B1A] border border-purple-500/40">
              <div className="text-[10px] font-mono text-purple-400">Tier 3 (T+120m)</div>
              <div className="font-bold text-purple-300 mt-1">MIOT Hospital Isolated</div>
              <p className="text-[11px] text-[#94A3B8] mt-1">1000-bed facility access severed; travel time triples.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/50">
              <div className="text-[10px] font-mono text-[#10B981]">CivicTwin AI Action</div>
              <div className="font-bold text-emerald-300 mt-1">Pre-emptive Staging</div>
              <p className="text-[11px] text-[#94A3B8] mt-1">Stage mobile pumps & Anna Salai contraflow; chain broken!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Agent Multi-Agent Grid */}
      <section id="multi-agent" className="px-6 lg:px-12 py-16 bg-[#080E21] border-t border-[#131D38]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#06D6EF]">LangGraph Multi-Agent Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">8 Specialized Collaborative AI Agents</h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Operating deterministically without paid keys, each agent executes real calculations, graph algorithms, and operations research tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'Agent 1', name: 'Weather Intelligence', desc: 'Validates Open-Meteo live radar & forecast freshness.', color: 'border-blue-500/40' },
              { id: 'Agent 2', name: 'Urban Risk Prediction', desc: 'Random Forest inference with 89.6% validated accuracy.', color: 'border-cyan-500/40' },
              { id: 'Agent 3', name: 'Infrastructure Topology', desc: 'Maintains NetworkX urban dependency graph.', color: 'border-indigo-500/40' },
              { id: 'Agent 4', name: 'Cascading Crisis Sim', desc: 'Simulates bounded multi-tier failure propagation.', color: 'border-red-500/40' },
              { id: 'Agent 5', name: 'Citizen Intelligence', desc: 'Crowdsourced field incident clustering & deduplication.', color: 'border-amber-500/40' },
              { id: 'Agent 6', name: 'Resource Optimizer', desc: 'OR-Tools constrained fleet allocation & routing.', color: 'border-emerald-500/40' },
              { id: 'Agent 7', name: 'Explainability (XAI)', desc: 'SHAP waterfall feature contributions & rationales.', color: 'border-purple-500/40' },
              { id: 'Agent 8', name: 'Supervisor Governor', desc: 'Synthesizes recommendations & routes to human approval.', color: 'border-[#06D6EF]' },
            ].map((ag, i) => (
              <div key={i} className={`p-4 rounded-xl bg-[#0D1428] border ${ag.color} space-y-2`}>
                <div className="text-[10px] font-mono text-[#06D6EF]">{ag.id}</div>
                <div className="font-bold text-sm text-white">{ag.name}</div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{ag.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer and Hackathon Information Footer */}
      <footer id="about" className="mt-auto px-6 lg:px-12 py-10 bg-[#060B1A] border-t border-[#131D38] text-xs text-[#94A3B8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <Logo size={28} />
            <p className="text-[11px] text-[#64748B]">
              National Student Hackathon BUILDFEST 2026 by Learnix Labs · Domain: AI & Machine Learning
            </p>
          </div>

          <div className="text-center md:text-right space-y-1 font-mono text-[11px]">
            <div>Developer: <span className="text-white font-bold">Sathiya Narayanan V S</span></div>
            <div>Institution: <span className="text-[#06D6EF]">Easwari Engineering College</span> (IT Dept)</div>
            <div>Project ID: <span className="text-white">BF26-CIVICTWIN-AI</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};
