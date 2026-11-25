import React, { useState } from 'react';
import { api } from '../services/api';
import { useAppStore } from '../stores/useAppStore';
import { Sliders, Play, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CrisisSimulationLabPage: React.FC = () => {
  const {
    activeScenarioCode,
    rainfallIntensity,
    rainfallDuration,
    drainageEfficiency,
    setScenarioParams
  } = useAppStore();

  const [simResult, setSimResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectScenario = (code: string, rain: number, dur: number, drain: number) => {
    setScenarioParams(code, rain, dur, drain);
  };

  const handleRunSimulation = async () => {
    setIsRunning(true);
    try {
      const result = await api.runSimulation({
        rainfall_intensity_mmh: rainfallIntensity,
        rainfall_duration_h: rainfallDuration,
        drainage_efficiency: drainageEfficiency
      });
      setSimResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#06D6EF]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              What-If Crisis Simulation Lab
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              HYDROLOGICAL & TOPOLOGY ENGINE
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Simulate environmental stress, test infrastructure failure thresholds, and preview cascading secondary impacts.
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white shadow-lg hover:brightness-110 disabled:opacity-50 transition"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isRunning ? 'Simulating Cascade...' : 'Execute What-If Run'}</span>
        </button>
      </div>

      {/* Preset Seeded Scenarios (A, B, C) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            code: 'SCENARIO_A',
            title: 'Scenario A: Heavy Rainfall & Waterlogging',
            rain: 95.0,
            dur: 4.0,
            drain: 0.55,
            desc: 'Severe monsoon depression targeting Velachery and T. Nagar drainage basins.'
          },
          {
            code: 'SCENARIO_B',
            title: 'Scenario B: Arterial Road Disruption',
            rain: 60.0,
            dur: 3.0,
            drain: 0.70,
            desc: 'Severing Mount-Poonamallee corridor, threatening MIOT hospital access.'
          },
          {
            code: 'SCENARIO_C',
            title: 'Scenario C: Compound Substation Outage',
            rain: 140.0,
            dur: 5.0,
            drain: 0.35,
            desc: 'Extreme 140mm/h cloudburst combined with Velachery 230kV substation tripping.'
          }
        ].map((sc) => (
          <div
            key={sc.code}
            onClick={() => handleSelectScenario(sc.code, sc.rain, sc.dur, sc.drain)}
            className={`p-4 rounded-xl bg-[#0D1428] border cursor-pointer transition flex flex-col justify-between ${
              activeScenarioCode === sc.code
                ? 'border-[#06D6EF] bg-[#06D6EF]/10 shadow-lg'
                : 'border-[#131D38] hover:border-[#2563EB]/40'
            }`}
          >
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#06D6EF] mb-1">
                <span>{sc.code}</span>
                {activeScenarioCode === sc.code && <span className="font-bold text-[#10B981]">SELECTED</span>}
              </div>
              <h4 className="font-bold text-sm text-white">{sc.title}</h4>
              <p className="text-xs text-[#94A3B8] mt-1">{sc.desc}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#131D38] flex justify-between text-[11px] font-mono text-[#94A3B8]">
              <span>{sc.rain} mm/h</span>
              <span>{sc.dur} hrs</span>
              <span>{Math.round(sc.drain * 100)}% Drain Eff</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Sliders Panel */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-6">
        <h3 className="font-bold text-sm text-white">Fine-tune Environmental & Infrastructure Stress Parameters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rainfall Intensity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Rainfall Intensity:</span>
              <span className="font-mono text-[#06D6EF] font-bold">{rainfallIntensity} mm/hr</span>
            </div>
            <input
              type="range"
              min={20}
              max={180}
              step={5}
              value={rainfallIntensity}
              onChange={(e) => setScenarioParams(activeScenarioCode, Number(e.target.value), rainfallDuration, drainageEfficiency)}
              className="w-full accent-[#06D6EF] cursor-pointer"
            />
          </div>

          {/* Rainfall Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Storm Duration:</span>
              <span className="font-mono text-[#2563EB] font-bold">{rainfallDuration} Hours</span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              step={0.5}
              value={rainfallDuration}
              onChange={(e) => setScenarioParams(activeScenarioCode, rainfallIntensity, Number(e.target.value), drainageEfficiency)}
              className="w-full accent-[#2563EB] cursor-pointer"
            />
          </div>

          {/* Drainage Performance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Drainage Efficiency:</span>
              <span className="font-mono text-[#10B981] font-bold">{Math.round(drainageEfficiency * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={1.0}
              step={0.05}
              value={drainageEfficiency}
              onChange={(e) => setScenarioParams(activeScenarioCode, rainfallIntensity, rainfallDuration, Number(e.target.value))}
              className="w-full accent-[#10B981] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Simulated Outcomes Display */}
      {simResult && (
        <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Modeled Cascading Failure Outcomes</h3>
            <span className="text-xs font-mono text-[#F59E0B]">
              Overall Disruption Score: {simResult.disruption_score} / 1.0
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#0A1124] border border-[#131D38]">
              <div className="text-xl font-mono font-bold text-red-400">{simResult.affected_roads_count}</div>
              <div className="text-[10px] text-[#94A3B8] uppercase">Roads Submerged</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0A1124] border border-[#131D38]">
              <div className="text-xl font-mono font-bold text-amber-400">{simResult.inaccessible_facilities_count}</div>
              <div className="text-[10px] text-[#94A3B8] uppercase">Facilities Inaccessible</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0A1124] border border-[#131D38]">
              <div className="text-xl font-mono font-bold text-[#06D6EF]">{simResult.avg_emergency_travel_time_min} m</div>
              <div className="text-[10px] text-[#94A3B8] uppercase">Avg Response Delay</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0A1124] border border-[#131D38]">
              <div className="text-xl font-mono font-bold text-[#10B981]">{simResult.resource_coverage_pct}%</div>
              <div className="text-[10px] text-[#94A3B8] uppercase">Fleet Coverage</div>
            </div>
          </div>

          {/* Cascade Event Trace */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono text-[#06D6EF] uppercase font-bold">Cascade Failure Trace</h4>
            <div className="space-y-1.5 text-xs">
              {simResult.cascade_events.slice(0, 5).map((ev: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#060B1A] border border-[#131D38] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="font-semibold text-white">{ev.name || ev.target_name}</span>
                  </div>
                  <span className="text-[#94A3B8] text-[11px]">{ev.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
