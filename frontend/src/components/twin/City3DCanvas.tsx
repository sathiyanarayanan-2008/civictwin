import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

// Procedural 3D Building Blocks representing Chennai Infrastructure & Zones
interface BuildingData {
  id: number;
  name: string;
  category: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  vulnerability: number;
  dependency: string;
  recommendedAction: string;
}

const CHENNAI_3D_BUILDINGS: BuildingData[] = [
  // Guindy / Manapakkam Corridor
  { id: 101, name: 'MIOT International Hospital', category: 'Hospital', x: -14, z: 2, width: 7, depth: 6, height: 12, riskLevel: 'Critical', vulnerability: 0.72, dependency: 'Mount-Poonamallee Road (Access)', recommendedAction: 'Deploy 2 de-watering pumps to maintain trauma access' },
  { id: 201, name: 'Chennai Trade Centre Shelter', category: 'Shelter', x: -16, z: -8, width: 8, depth: 8, height: 8, riskLevel: 'High', vulnerability: 0.35, dependency: 'Inner Ring Road (Access)', recommendedAction: 'Pre-stock 3,500 dry ration packets' },
  { id: 501, name: 'Guindy Fire & Rescue (TNFRS)', category: 'Fire Station', x: -6, z: -4, width: 5, depth: 5, height: 6, riskLevel: 'Moderate', vulnerability: 0.30, dependency: 'Anna Salai', recommendedAction: 'Mobilize 6 rescue inflatable boats' },
  { id: 402, name: 'TANGEDCO Guindy Substation', category: 'Power', x: -8, z: 6, width: 5, depth: 5, height: 7, riskLevel: 'Moderate', vulnerability: 0.45, dependency: 'Kathipara Grid', recommendedAction: 'Check secondary transformer elevation' },

  // Velachery Low-Lying Basin
  { id: 105, name: 'Dr. Kamakshi Memorial Hospital', category: 'Hospital', x: 12, z: 14, width: 6, depth: 6, height: 10, riskLevel: 'Critical', vulnerability: 0.88, dependency: 'Velachery Bypass Road', recommendedAction: 'Maintain ambulance bypass via OMR Thoraippakkam' },
  { id: 301, name: 'Velachery Lake Surplus Pump Station', category: 'Drainage Pump', x: 6, z: 12, width: 4, depth: 4, height: 5, riskLevel: 'Critical', vulnerability: 0.85, dependency: 'Velachery Substation (Power)', recommendedAction: 'Stage mobile 500kVA emergency generator' },
  { id: 401, name: 'TANGEDCO Velachery 230kV Substation', category: 'Power', x: 10, z: 6, width: 6, depth: 6, height: 8, riskLevel: 'Critical', vulnerability: 0.90, dependency: 'Feeds 4 stormwater pumps', recommendedAction: 'Sandbag perimeter wall against 0.6m runoff' },
  { id: 203, name: 'Guru Nanak College Relief Camp', category: 'Shelter', x: 8, z: 18, width: 7, depth: 6, height: 7, riskLevel: 'High', vulnerability: 0.70, dependency: 'Velachery Main Road', recommendedAction: 'Deploy high-clearance military relief trucks' },

  // T. Nagar Commercial Hub
  { id: 104, name: 'Apollo Speciality Hospital Nandanam', category: 'Hospital', x: -4, z: -16, width: 6, depth: 5, height: 14, riskLevel: 'High', vulnerability: 0.58, dependency: 'Anna Salai Corridor', recommendedAction: 'Reserve northbound contraflow blue lane' },
  { id: 302, name: 'Mambalam Canal Stormwater Sluice', category: 'Drainage Pump', x: -2, z: -10, width: 4, depth: 4, height: 4, riskLevel: 'High', vulnerability: 0.75, dependency: 'Adyar River Outfall', recommendedAction: 'Desilt canal trash racks to prevent backflow' },

  // Adyar Coastal Corridor
  { id: 102, name: 'Fortis Malar Hospital Adyar', category: 'Hospital', x: 16, z: -8, width: 5, depth: 5, height: 9, riskLevel: 'High', vulnerability: 0.65, dependency: 'Sardar Patel Road', recommendedAction: 'Ensure tidal gate closure against storm surge' },
  { id: 202, name: 'Anna University Relief Center', category: 'Shelter', x: 8, z: -12, width: 8, depth: 7, height: 9, riskLevel: 'Low', vulnerability: 0.25, dependency: 'Elevated Highland (15.2m)', recommendedAction: 'Primary regional emergency command node' },

  // Anna Nagar Highland Zone
  { id: 103, name: 'Sri Ramachandra Medical Centre', category: 'Hospital', x: -22, z: 16, width: 8, depth: 7, height: 13, riskLevel: 'Low', vulnerability: 0.40, dependency: 'Porur Kundrathur Road', recommendedAction: 'Tertiary referral hospital on standby' },
];

function getRiskColor(level: string) {
  switch (level) {
    case 'Critical': return '#EF4444'; // Red
    case 'High':     return '#F59E0B'; // Amber
    case 'Moderate': return '#06D6EF'; // Cyan
    case 'Low':      return '#10B981'; // Green
    default:         return '#2563EB';
  }
}

// Single Interactive Building Mesh
const Building: React.FC<{
  data: BuildingData;
  isSelected: boolean;
  onSelect: (b: BuildingData) => void;
}> = ({ data, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = getRiskColor(data.riskLevel);

  return (
    <group position={[data.x, data.height / 2, data.z]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[data.width, data.height, data.depth]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={isSelected ? color : '#060B1A'}
          emissiveIntensity={isSelected ? 0.6 : 0.2}
          wireframe={false}
        />
      </mesh>

      {/* Building Rooftop Beacon Pin */}
      <mesh position={[0, data.height / 2 + 0.8, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Subtle 3D Label */}
      <Text
        position={[0, data.height / 2 + 2.5, 0]}
        fontSize={1.2}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.15}
        outlineColor="#060B1A"
      >
        {data.name.split(' ')[0]}
      </Text>
    </group>
  );
};

// Animated Dynamic Flood Water Surface
const FloodWaterSurface: React.FC<{ rainfall: number }> = ({ rainfall }) => {
  const waterRef = useRef<THREE.Mesh>(null);
  // Water rises higher when rainfall increases (simulating urban submergence)
  const targetWaterY = Math.min(2.8, Math.max(0.1, (rainfall / 100) * 2.5));

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = THREE.MathUtils.lerp(
        waterRef.current.position.y,
        targetWaterY,
        0.05
      );
      // Gentle ripple effect
      waterRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.005;
    }
  });

  return (
    <mesh ref={waterRef} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[70, 70]} />
      <meshStandardMaterial
        color="#06D6EF"
        transparent
        opacity={0.45}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

// City Ground & Road Network Grid
const CityGroundAndRoads: React.FC = () => {
  return (
    <group>
      {/* Ground Floor */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[75, 75]} />
        <meshStandardMaterial color="#0A1124" roughness={0.9} />
      </mesh>
      
      {/* Grid Floor Lines */}
      <gridHelper args={[75, 50, '#2563EB', '#131D38']} position={[0, 0, 0]} />

      {/* Primary Road Arterials */}
      {/* Anna Salai Corridor (Z-axis) */}
      <mesh position={[-5, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 65]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>
      {/* Mount-Poonamallee / Guindy Road (X-axis) */}
      <mesh position={[0, 0.02, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[65, 2.5]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>
      {/* Velachery Bypass Expressway */}
      <mesh position={[10, 0.02, 10]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[35, 2.2]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>
    </group>
  );
};

export const City3DCanvas: React.FC = () => {
  const { rainfallIntensity } = useAppStore();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(CHENNAI_3D_BUILDINGS[0]);
  const [isNight, setIsNight] = useState(true);
  const [is2DFallback, setIs2DFallback] = useState(false);

  if (is2DFallback) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#060B1A] p-6 text-center border border-[#06D6EF]/20 rounded-xl">
        <div className="max-w-md p-6 rounded-2xl bg-[#0D1428] border border-[#2563EB]/40 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-2">2D Lightweight Elevation Mode</h3>
          <p className="text-xs text-[#94A3B8] mb-4">
            Low-performance fallback mode active. Interactive 2D schematic of Chennai's 12 urban infrastructure nodes.
          </p>
          <div className="grid grid-cols-2 gap-2 text-left mb-4">
            {CHENNAI_3D_BUILDINGS.slice(0, 6).map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBuilding(b)}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                  selectedBuilding?.id === b.id ? 'border-[#06D6EF] bg-[#06D6EF]/10' : 'border-[#131D38] bg-[#0A1124]'
                }`}
              >
                <div className="font-semibold text-white truncate">{b.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] text-[#94A3B8]">{b.category}</span>
                  <span className={`text-[10px] font-bold ${b.riskLevel === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>
                    {b.riskLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIs2DFallback(false)}
            className="w-full py-2 bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white text-xs font-semibold rounded-lg shadow-lg hover:brightness-110"
          >
            Switch Back to 3D WebGL Canvas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#060B1A] rounded-xl overflow-hidden border border-[#06D6EF]/20">
      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0D1428]/90 border border-[#06D6EF]/40 text-[#06D6EF] backdrop-blur-md">
          CHENNAI 3D DIGITAL TWIN · WEBGL
        </span>
        <button
          onClick={() => setIsNight(!isNight)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0D1428]/80 hover:bg-[#131D38] border border-[#2563EB]/40 text-[#F8FAFC] backdrop-blur-md transition"
        >
          {isNight ? '🌙 Night Mode' : '☀️ Day Mode'}
        </button>
        <button
          onClick={() => setIs2DFallback(true)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0D1428]/80 hover:bg-[#131D38] border border-[#2563EB]/40 text-[#94A3B8] backdrop-blur-md transition"
        >
          2D Fallback
        </button>
      </div>

      {/* Active Building Inspector Glass Overlay */}
      {selectedBuilding && (
        <div className="absolute bottom-4 left-4 z-10 max-w-sm p-4 rounded-xl bg-[#0D1428]/90 border border-[#06D6EF]/40 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#06D6EF]">
              {selectedBuilding.category} · NODE #{selectedBuilding.id}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                selectedBuilding.riskLevel === 'Critical'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : selectedBuilding.riskLevel === 'High'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              {selectedBuilding.riskLevel} Risk
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-2">{selectedBuilding.name}</h4>
          
          <div className="space-y-1.5 text-xs text-[#94A3B8]">
            <div className="flex justify-between">
              <span>Vulnerability Index:</span>
              <span className="font-mono text-white font-medium">{selectedBuilding.vulnerability * 100}%</span>
            </div>
            <div className="flex justify-between">
              <span>Critical Dependency:</span>
              <span className="text-white font-medium truncate max-w-[180px]">{selectedBuilding.dependency}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-[#131D38]">
              <span className="text-[11px] text-[#06D6EF] font-semibold">Recommended Action:</span>
              <p className="text-[11px] text-[#F8FAFC] mt-0.5 leading-snug">
                {selectedBuilding.recommendedAction}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend & Instructions */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5 text-[11px] font-mono text-[#94A3B8]">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D1428]/80 border border-[#131D38] backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> High
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 ml-2" /> Moderate
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ml-2" /> Low
        </div>
        <span className="text-[10px] text-[#64748B]">Click building to inspect · Drag to orbit · Scroll to zoom</span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [25, 30, 35], fov: 45 }}
        shadows
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={isNight ? 0.4 : 0.8} />
        <directionalLight
          position={[30, 50, 20]}
          intensity={isNight ? 0.7 : 1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {isNight && <pointLight position={[0, 15, 0]} color="#06D6EF" intensity={1.5} distance={50} />}

        <CityGroundAndRoads />
        <FloodWaterSurface rainfall={rainfallIntensity} />

        {CHENNAI_3D_BUILDINGS.map((b) => (
          <Building
            key={b.id}
            data={b}
            isSelected={selectedBuilding?.id === b.id}
            onSelect={(item) => setSelectedBuilding(item)}
          />
        ))}

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={10}
          maxDistance={70}
        />
      </Canvas>
    </div>
  );
};
