import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { api } from '../../services/api';
import { Layers, ZoomIn, ZoomOut, Maximize2, ShieldAlert } from 'lucide-react';

export const MapLibreView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'zones' | 'roads' | 'hospitals' | 'shelters'>('all');
  const [timeSliderHours, setTimeSliderHours] = useState(0); // 0h to 6h ahead

  // Offline fallback dark style that does not require any external paid API key
  const defaultMapStyle: maplibregl.StyleSpecification = {
    version: 8,
    name: 'CivicTwin Dark Vector',
    sources: {
      'osm-tiles': {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors'
      }
    },
    layers: [
      {
        id: 'osm-background',
        type: 'raster',
        source: 'osm-tiles',
        minzoom: 0,
        maxzoom: 19,
        paint: {
          'raster-opacity': 0.65,
          'raster-brightness-min': 0.1,
          'raster-brightness-max': 0.5,
          'raster-contrast': 0.2
        }
      }
    ]
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize MapLibre GL
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: defaultMapStyle,
      center: [80.2341, 13.0418], // Chennai center (T. Nagar / Guindy)
      zoom: 11.2,
      pitch: 35,
      bearing: 10,
      attributionControl: false
    });

    mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

    mapInstance.on('load', async () => {
      setIsLoaded(true);
      map.current = mapInstance;

      try {
        // Fetch bundled GeoJSON (local or backend)
        let geoData = await api.getGeoJSON();
        if (!geoData) {
          const localRes = await fetch('/data/chennai_zones.geojson');
          geoData = await localRes.json();
        }

        if (geoData && mapInstance.getSource('chennai-data') === undefined) {
          mapInstance.addSource('chennai-data', {
            type: 'geojson',
            data: geoData
          });

          // 1. Zone Polygons Layer
          mapInstance.addLayer({
            id: 'zones-fill',
            type: 'fill',
            source: 'chennai-data',
            filter: ['==', ['get', 'layer_type'], 'zone'],
            paint: {
              'fill-color': [
                'match',
                ['get', 'risk_level'],
                'Critical', '#EF4444',
                'High', '#F59E0B',
                'Moderate', '#06D6EF',
                '#10B981'
              ],
              'fill-opacity': 0.25
            }
          });

          // 2. Zone Outline Borders
          mapInstance.addLayer({
            id: 'zones-line',
            type: 'line',
            source: 'chennai-data',
            filter: ['==', ['get', 'layer_type'], 'zone'],
            paint: {
              'line-color': [
                'match',
                ['get', 'risk_level'],
                'Critical', '#EF4444',
                'High', '#F59E0B',
                'Moderate', '#06D6EF',
                '#10B981'
              ],
              'line-width': 2.5
            }
          });

          // 3. Road Network Layer
          mapInstance.addLayer({
            id: 'roads-line',
            type: 'line',
            source: 'chennai-data',
            filter: ['==', ['get', 'layer_type'], 'road'],
            paint: {
              'line-color': [
                'case',
                ['boolean', ['get', 'is_closed'], false],
                '#EF4444',
                ['>', ['get', 'flood_risk_score'], 0.7],
                '#F59E0B',
                '#06D6EF'
              ],
              'line-width': 4.5
            }
          });

          // 4. Critical Infrastructure Points (Hospitals & Shelters)
          mapInstance.addLayer({
            id: 'infra-points',
            type: 'circle',
            source: 'chennai-data',
            filter: ['==', ['get', 'layer_type'], 'infrastructure'],
            paint: {
              'circle-radius': 7,
              'circle-color': [
                'match',
                ['get', 'category'],
                'Hospital', '#EF4444',
                'Shelter', '#2563EB',
                'Drainage Pump', '#06D6EF',
                'Power Substation', '#8B5CF6',
                '#10B981'
              ],
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF'
            }
          });

          // Interactive Click Popups
          mapInstance.on('click', 'infra-points', (e) => {
            if (!e.features || !e.features[0]) return;
            const props = e.features[0].properties;
            const coords = (e.features[0].geometry as any).coordinates.slice();

            new maplibregl.Popup({ className: 'civic-popup', closeButton: true })
              .setLngLat(coords)
              .setHTML(`
                <div style="font-family: Inter, sans-serif; padding: 4px; color: #F8FAFC;">
                  <div style="font-size: 10px; color: #06D6EF; text-transform: uppercase; font-weight: bold;">
                    ${props.category} · Status: ${props.status}
                  </div>
                  <div style="font-weight: bold; font-size: 13px; margin: 2px 0 6px 0;">${props.name}</div>
                  <div style="font-size: 11px; color: #94A3B8; line-height: 1.4;">
                    Elevation: <b>${props.elevation_m}m MSL</b><br/>
                    Capacity: <b>${props.capacity}</b><br/>
                    Vulnerability: <b>${Math.round(props.vulnerability * 100)}%</b>
                  </div>
                </div>
              `)
              .addTo(mapInstance);
          });

          // Hover cursor
          mapInstance.on('mouseenter', 'infra-points', () => { mapInstance.getCanvas().style.cursor = 'pointer'; });
          mapInstance.on('mouseleave', 'infra-points', () => { mapInstance.getCanvas().style.cursor = ''; });
        }
      } catch (err) {
        console.error('Error loading GeoJSON layers into MapLibre:', err);
      }
    });

    const handleResize = () => {
      mapInstance.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mapInstance.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-[#06D6EF]/20 bg-[#060B1A]">
      {/* Map Container Element */}
      <div ref={mapContainer} className="w-full h-full absolute inset-0" />

      {/* Floating Layer Filter Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-[#0D1428]/90 border border-[#2563EB]/40 shadow-xl backdrop-blur-md">
        {(['all', 'zones', 'roads', 'hospitals', 'shelters'] as const).map((layer) => (
          <button
            key={layer}
            onClick={() => setSelectedLayer(layer)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
              selectedLayer === layer
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#131D38]'
            }`}
          >
            {layer}
          </button>
        ))}
      </div>

      {/* Interactive Time-based Flood Risk Slider */}
      <div className="absolute bottom-4 right-4 z-10 p-3 rounded-xl bg-[#0D1428]/90 border border-[#06D6EF]/40 shadow-2xl backdrop-blur-md flex flex-col gap-1 w-64">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-white">Precipitation Progression</span>
          <span className="font-mono text-[#06D6EF] font-bold">+{timeSliderHours} Hours</span>
        </div>
        <input
          type="range"
          min={0}
          max={6}
          step={1}
          value={timeSliderHours}
          onChange={(e) => setTimeSliderHours(Number(e.target.value))}
          className="w-full accent-[#06D6EF] cursor-pointer"
        />
        <div className="flex justify-between text-[9px] font-mono text-[#94A3B8]">
          <span>Now (Live)</span>
          <span>+2h (Surge)</span>
          <span>+4h (Peak)</span>
          <span>+6h (Recede)</span>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 p-3 rounded-xl bg-[#0D1428]/90 border border-[#131D38] shadow-xl backdrop-blur-md text-[11px] font-mono space-y-1">
        <div className="font-bold text-white text-xs mb-1">Chennai Risk Layers</div>
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <span className="w-3 h-3 rounded-sm bg-red-500/60 border border-red-500" />
          <span>Critical Risk Zone (Velachery/OMR)</span>
        </div>
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <span className="w-3 h-3 rounded-sm bg-amber-500/60 border border-amber-500" />
          <span>High Risk Zone (T. Nagar/Porur)</span>
        </div>
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <span className="w-3 h-1 bg-red-500 rounded" />
          <span>Closed / Inundated Road</span>
        </div>
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
          <span>Major Hospital (MIOT/Apollo/Fortis)</span>
        </div>
      </div>
    </div>
  );
};
