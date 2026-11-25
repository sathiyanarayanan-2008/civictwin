import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  Map,
  Cpu,
  Sliders,
  GitCompare,
  Ambulance,
  AlertTriangle,
  CloudRain,
  Building2,
  FileSearch,
  Bell,
  BarChart3,
  Network,
  Settings,
  User,
  Info
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Command Centre', path: '/app/command-centre', icon: LayoutDashboard },
  { name: '3D Digital Twin', path: '/app/digital-twin', icon: Box, badge: 'ThreeJS' },
  { name: 'Predictive Risk Map', path: '/app/risk-map', icon: Map, badge: 'MapLibre' },
  { name: 'AI Agent Control', path: '/app/agents', icon: Cpu, badge: '8 Agents', badgeColor: 'bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/40' },
  { name: 'Crisis Simulation', path: '/app/simulation-lab', icon: Sliders },
  { name: 'Prevention Comparator', path: '/app/prevention-comparator', icon: GitCompare, badge: 'Novelty', badgeColor: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40' },
  { name: 'Emergency Planner', path: '/app/resource-planner', icon: Ambulance },
  { name: 'Citizen Reporting', path: '/app/citizen-reporting', icon: AlertTriangle },
  { name: 'Weather Intelligence', path: '/app/weather', icon: CloudRain },
  { name: 'Infrastructure Health', path: '/app/infrastructure', icon: Building2 },
  { name: 'Explainable AI (XAI)', path: '/app/explainable-ai', icon: FileSearch },
  { name: 'Alerts & Incidents', path: '/app/alerts', icon: Bell },
  { name: 'Analytics & Reports', path: '/app/analytics', icon: BarChart3 },
  { name: 'System Architecture', path: '/app/architecture', icon: Network },
  { name: 'Data & Settings', path: '/app/settings', icon: Settings },
  { name: 'User Profile & Roles', path: '/app/profile', icon: User },
  { name: 'About BUILDFEST 2026', path: '/app/about', icon: Info, badge: 'Showcase' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-[#060B1A]/95 border-r border-[#06D6EF]/15 p-3 flex flex-col justify-between overflow-y-auto custom-scrollbar">
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
          Urban Intelligence Modules
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#2563EB]/20 text-white border border-[#06D6EF]/40 font-semibold shadow-md shadow-[#2563EB]/20'
                    : 'text-[#94A3B8] hover:bg-[#0D1428] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className="w-4 h-4 shrink-0 text-[#06D6EF]" />
                <span className="truncate">{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
                    item.badgeColor || 'bg-[#2563EB]/20 text-[#06D6EF] border-[#06D6EF]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Hackathon ID */}
      <div className="p-3 mt-4 rounded-xl bg-[#0D1428] border border-[#131D38] text-[10px] font-mono text-[#94A3B8] space-y-1">
        <div className="flex justify-between">
          <span>PROJECT:</span>
          <span className="text-white font-bold">BF26-CIVICTWIN-AI</span>
        </div>
        <div className="flex justify-between">
          <span>CITY:</span>
          <span className="text-[#06D6EF]">Chennai, TN</span>
        </div>
        <div className="flex justify-between">
          <span>STATUS:</span>
          <span className="text-[#10B981]">OPERATIONAL</span>
        </div>
      </div>
    </aside>
  );
};
