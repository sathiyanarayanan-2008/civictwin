import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Download,
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';

interface TourStep {
  title: string;
  badge: string;
  targetRoute: string;
  description: string;
  keyHighlight: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: '1. Project Identification & Scope',
    badge: 'BUILDFEST 2026',
    targetRoute: '/app/about',
    description: 'CivicTwin AI (Project ID: BF26-CIVICTWIN-AI) is an Agentic AI-powered predictive digital twin for urban crisis prevention, developed by Sathiya Narayanan V S from Easwari Engineering College for the BUILDFEST 2026 National Student Hackathon.',
    keyHighlight: 'Focus City: Chennai, Tamil Nadu, India with extensible multi-city topology.'
  },
  {
    title: '2. Real-Time Command Centre',
    badge: 'COMMAND DASHBOARD',
    targetRoute: '/app/command-centre',
    description: 'Centralized urban intelligence command centre displaying the calculated Urban Risk Index (68.5/100), active telemetry, Doppler radar precipitation, and critical facility statuses.',
    keyHighlight: 'All metrics backed by live connected backend APIs and deterministic geospatial records.'
  },
  {
    title: '3. Interactive 3D Digital Twin',
    badge: 'THREE.JS / WEBGL',
    targetRoute: '/app/digital-twin',
    description: 'Procedural 3D city visualization featuring Chennai infrastructure nodes, dynamic flood water level animation, risk coloring, and an interactive building inspector.',
    keyHighlight: 'Clicking buildings displays vulnerability index, critical dependencies, and preventive actions.'
  },
  {
    title: '4. Predictive Risk Map',
    badge: 'MAPLIBRE GL JS',
    targetRoute: '/app/risk-map',
    description: 'High-performance geospatial map with Chennai coordinates (13.0827, 80.2707). Displays 8 urban zones, road network lines, hospital points, and a time-based flood progression slider.',
    keyHighlight: 'Includes bundled offline GeoJSON fallback guaranteeing the map never renders blank.'
  },
  {
    title: '5. Crisis Simulation Lab (What-If)',
    badge: 'SIMULATION ENGINE',
    targetRoute: '/app/simulation-lab',
    description: 'Interactive crisis laboratory to configure rainfall intensity (mm/hr), duration, and drainage efficiency. Pre-seeded with Scenarios A, B, and C.',
    keyHighlight: 'Simulates the physics of stormwater runoff across Chennai elevation basins.'
  },
  {
    title: '6. AI Agent Control Centre',
    badge: '8-AGENT MULTI-AGENT',
    targetRoute: '/app/agents',
    description: 'Live orchestration engine executing 8 specialized agents: Weather, Risk, Topology, Cascade, Citizen, Resource, Explainability, and Supervisor Agent.',
    keyHighlight: 'Real-time WebSocket event streaming displaying live execution times and evidence sources.'
  },
  {
    title: '7. Cascading Crisis Failure Engine',
    badge: 'CORE NOVELTY',
    targetRoute: '/app/command-centre',
    description: 'CivicTwin AI’s core innovation: modeling interdependencies using NetworkX. Demonstrates how Mount-Poonamallee Road flooding cuts off MIOT Hospital and triggers ambulance delays.',
    keyHighlight: 'Moves cities from reactive emergency response to simulation-driven crisis prevention.'
  },
  {
    title: '8. Prevention Impact Comparator',
    badge: 'SIDE-BY-SIDE EVALUATION',
    targetRoute: '/app/prevention-comparator',
    description: 'Dedicated innovation module mathematically comparing Scenario 1 (No Intervention) against Scenario 2 (AI Preventive Strategy).',
    keyHighlight: 'Proves a 62% risk reduction, 3 roads preserved, and 14.6 minute ambulance travel time reduction.'
  },
  {
    title: '9. Emergency Resource Planner',
    badge: 'OR-TOOLS OPTIMIZATION',
    targetRoute: '/app/resource-planner',
    description: 'Constrained resource optimizer balancing ambulance and rescue boat fleet staging while calculating alternative routes that bypass inundated roads.',
    keyHighlight: 'Strict safety governance: consequential dispatches require human coordinator sign-off.'
  },
  {
    title: '10. Citizen Reporting & Deduplication',
    badge: 'CIVIC SENSING',
    targetRoute: '/app/citizen-reporting',
    description: 'Citizen portal for reporting waterlogging, fallen trees, and drainage blockages with spatial-temporal proximity clustering to detect and merge duplicate reports.',
    keyHighlight: 'Empowers citizens while preventing emergency call centers from duplicate report overload.'
  },
  {
    title: '11. Explainable AI & SHAP Contributions',
    badge: 'TRANSPARENT AI',
    targetRoute: '/app/explainable-ai',
    description: 'Explainability dashboard presenting Random Forest feature importance and SHAP-aligned contribution breakdowns with plain-English rationales.',
    keyHighlight: 'Grounded predictions validated with 89.6% accuracy and 0.945 ROC-AUC.'
  },
  {
    title: '12. Real PDF Report Export',
    badge: 'VERIFIED EXPORT',
    targetRoute: '/app/analytics',
    description: 'Download the comprehensive crisis simulation report generated directly from backend ReportLab with scenario metrics, impact deltas, and actionable preventive plans.',
    keyHighlight: 'Click "Download PDF Report" below to verify real file export functionality!'
  }
];

export const GuidedDemoModal: React.FC = () => {
  const { isGuidedDemoOpen, closeGuidedDemo, guidedDemoStep, setGuidedDemoStep } = useAppStore();
  const navigate = useNavigate();

  if (!isGuidedDemoOpen) return null;

  const currentStepData = TOUR_STEPS[guidedDemoStep - 1] || TOUR_STEPS[0];
  const isLastStep = guidedDemoStep === TOUR_STEPS.length;

  const goToStep = (stepNum: number) => {
    setGuidedDemoStep(stepNum);
    const target = TOUR_STEPS[stepNum - 1];
    if (target) {
      navigate(target.targetRoute);
    }
    if (stepNum === TOUR_STEPS.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleDownloadReport = () => {
    window.open(api.getExportPdfUrl(), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0D1428] border border-[#06D6EF]/50 shadow-2xl shadow-[#06D6EF]/20 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#060B1A] border-b border-[#131D38]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Hackathon Guided Evaluation Tour</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#06D6EF]/20 text-[#06D6EF] border border-[#06D6EF]/40 font-bold">
                  STEP {guidedDemoStep} OF {TOUR_STEPS.length}
                </span>
              </div>
              <p className="text-[10px] text-[#94A3B8]">
                Interactive 1-click evaluation walkthrough for BUILDFEST 2026 judges
              </p>
            </div>
          </div>
          <button
            onClick={closeGuidedDemo}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#131D38] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#131D38]">
          <div
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#06D6EF] transition-all duration-300"
            style={{ width: `${(guidedDemoStep / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#06D6EF]">
              {currentStepData.badge}
            </span>
            <button
              onClick={() => navigate(currentStepData.targetRoute)}
              className="flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] hover:text-[#06D6EF] transition"
            >
              <span>Jump to view</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <h2 className="text-base font-bold text-white leading-snug">
            {currentStepData.title}
          </h2>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            {currentStepData.description}
          </p>

          <div className="p-3.5 rounded-xl bg-[#0A1124] border border-[#131D38] text-xs text-[#F8FAFC] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#06D6EF]">Technical Innovation: </span>
              {currentStepData.keyHighlight}
            </div>
          </div>

          {isLastStep && (
            <div className="pt-2">
              <button
                onClick={handleDownloadReport}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#06D6EF] text-[#060B1A] font-bold text-xs shadow-lg hover:brightness-110 active:scale-98 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Actual Scenario PDF Report</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#060B1A] border-t border-[#131D38]">
          <button
            onClick={() => goToStep(Math.max(1, guidedDemoStep - 1))}
            disabled={guidedDemoStep === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {TOUR_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i + 1)}
                className={`w-2 h-2 rounded-full transition ${
                  guidedDemoStep === i + 1 ? 'w-5 bg-[#06D6EF]' : 'bg-[#1E293B] hover:bg-[#94A3B8]'
                }`}
              />
            ))}
          </div>

          {isLastStep ? (
            <button
              onClick={closeGuidedDemo}
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#10B981] text-white hover:brightness-110 transition"
            >
              <span>Finish Tour</span>
            </button>
          ) : (
            <button
              onClick={() => goToStep(Math.min(TOUR_STEPS.length, guidedDemoStep + 1))}
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white hover:brightness-110 transition"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
