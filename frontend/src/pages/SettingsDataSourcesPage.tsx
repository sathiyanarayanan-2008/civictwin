import React from 'react';
import { Settings, Globe, Shield, RefreshCw } from 'lucide-react';

export const SettingsDataSourcesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#06D6EF]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Data Sources, Telemetry & Multi-City Settings
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              CONFIGURABLE EXTENSION
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Configure telemetry polling frequencies, inspect third-party API health, and manage multi-city topology expansions.
          </p>
        </div>

        <div className="text-xs font-mono text-[#10B981] bg-[#060B1A] px-3 py-1.5 rounded-xl border border-[#131D38]">
          CHENNAI METROPOLITAN ACTIVE
        </div>
      </div>

      {/* Connected Data Providers */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
        <h3 className="font-bold text-sm text-white">External Data Sources & Fallback Status</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#0A1124] border border-[#131D38] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Open-Meteo Weather API</span>
              <span className="text-[#10B981] font-mono">200 OK</span>
            </div>
            <p className="text-[#94A3B8]">Provides free Doppler precipitation and forecast rates without required API keys.</p>
            <div className="text-[10px] text-[#06D6EF] font-mono">TTL Cache: 15 min · Resilient Fallback: Active</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0A1124] border border-[#131D38] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">OpenStreetMap & MapLibre</span>
              <span className="text-[#10B981] font-mono">Bundled Local</span>
            </div>
            <p className="text-[#94A3B8]">Vector map styles backed by bundled Chennai GeoJSON feature collections.</p>
            <div className="text-[10px] text-[#06D6EF] font-mono">Offline-Resilient · Zero Tile Breakage</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0A1124] border border-[#131D38] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Multi-City Extensibility</span>
              <span className="text-[#2563EB] font-mono">Ready</span>
            </div>
            <p className="text-[#94A3B8]">Topology configuration schema allows loading Mumbai, Bengaluru, or Kochi.</p>
            <div className="text-[10px] text-[#06D6EF] font-mono">Initial Demonstration Focus: Chennai</div>
          </div>
        </div>
      </div>
    </div>
  );
};
