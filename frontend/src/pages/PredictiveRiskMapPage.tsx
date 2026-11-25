import React from 'react';
import { MapLibreView } from '../components/map/MapLibreView';
import { Map, Layers, ShieldAlert, Compass } from 'lucide-react';

export const PredictiveRiskMapPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-[#06D6EF]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Predictive Geospatial Risk Map
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              MAPLIBRE GL JS
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Geospatial intelligence for Chennai (13.0827° N, 80.2707° E) with bundled offline GeoJSON fallback layers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] bg-[#060B1A] p-2 rounded-xl border border-[#131D38]">
          <Compass className="w-4 h-4 text-[#06D6EF]" />
          <span>INITIAL ZOOM: 11.2 · 8 URBAN BASINS</span>
        </div>
      </div>

      {/* MapLibre Map Viewport */}
      <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-[#06D6EF]/30 shadow-2xl">
        <MapLibreView />
      </div>

      {/* Map Layer Information */}
      <div className="p-4 rounded-xl bg-[#0D1428] border border-[#131D38] text-xs text-[#94A3B8] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#06D6EF]" />
          <span>Active Layers: Urban Wards (Polygons) · Arterial Roads (LineStrings) · Emergency Facilities (Points)</span>
        </div>
        <div className="text-[11px] font-mono text-[#64748B]">
          Attribution: &copy; OpenStreetMap Contributors · Bundled Offline Local Vector Style Active
        </div>
      </div>
    </div>
  );
};
