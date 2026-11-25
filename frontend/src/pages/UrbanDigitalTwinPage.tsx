import React, { useState } from 'react';
import { City3DCanvas } from '../components/twin/City3DCanvas';
import { useAppStore } from '../stores/useAppStore';
import { Play, RotateCcw, Sliders, Box, Layers, ShieldAlert, Activity } from 'lucide-react';

export const UrbanDigitalTwinPage: React.FC = () => {
  const { rainfallIntensity, setScenarioParams, activeScenarioCode } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSliderChange = (val: number) => {
    setScenarioParams(activeScenarioCode, val, 4.0, 0.60);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Scenario Playback Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-[#06D6EF]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Chennai 3D Urban Digital Twin
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#06D6EF]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              THREE.JS / WEBGL
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Interactive elevation-accurate 3D model of Chennai infrastructure, drainage pumps, and dynamic flood surface.
          </p>
        </div>

        {/* Dynamic Water Slider Controls */}
        <div className="flex items-center gap-4 bg-[#060B1A] p-2.5 rounded-xl border border-[#131D38]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#06D6EF]" />
            <div className="text-xs">
              <span className="text-[#94A3B8]">Water Stress: </span>
              <span className="font-mono font-bold text-[#06D6EF]">{rainfallIntensity} mm/h</span>
            </div>
          </div>
          <input
            type="range"
            min={10}
            max={160}
            step={5}
            value={rainfallIntensity}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-32 accent-[#06D6EF] cursor-pointer"
          />
        </div>
      </div>

      {/* Main 3D Canvas Box */}
      <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-[#06D6EF]/30 shadow-2xl bg-[#060B1A]">
        <City3DCanvas />
      </div>

      {/* Contextual Architecture Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38] space-y-1">
          <div className="font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Critical Infrastructure Risk</span>
          </div>
          <p className="text-[#94A3B8]">
            Buildings colored red (e.g. MIOT Hospital, Kamakshi Hospital) indicate direct or tier-2 access vulnerability.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38] space-y-1">
          <div className="font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Dynamic Inundation Layer</span>
          </div>
          <p className="text-[#94A3B8]">
            Cyan water plane rises dynamically as simulated precipitation increases, submerging low-elevation culverts.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38] space-y-1">
          <div className="font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Highland Safe Havens</span>
          </div>
          <p className="text-[#94A3B8]">
            Anna University (15.2m) and Ramachandra Hospital (14.5m) remain safe relief staging nodes during cloudbursts.
          </p>
        </div>
      </div>
    </div>
  );
};
