import { create } from 'zustand';

export interface UserRole {
  name: 'Administrator' | 'Municipal Operator' | 'Emergency Response Coordinator' | 'Citizen' | 'Demo Viewer';
  badge: string;
  permissions: string[];
}

export const USER_ROLES: Record<string, UserRole> = {
  admin: {
    name: 'Administrator',
    badge: 'CHIEF MUNICIPAL OFFICER',
    permissions: ['all', 'approve_recommendations', 'system_config', 'sensor_override']
  },
  operator: {
    name: 'Municipal Operator',
    badge: 'GCC CONTROL ROOM',
    permissions: ['run_simulations', 'approve_recommendations', 'manage_reports']
  },
  coordinator: {
    name: 'Emergency Response Coordinator',
    badge: 'TNFRS DISPATCH',
    permissions: ['dispatch_resources', 'approve_recommendations', 'route_planning']
  },
  citizen: {
    name: 'Citizen',
    badge: 'PUBLIC CITIZEN ACCESS',
    permissions: ['submit_reports', 'view_public_alerts', 'view_risk_map']
  },
  demo: {
    name: 'Demo Viewer',
    badge: 'HACKATHON JUDGE MODE',
    permissions: ['full_inspection', 'run_simulations', 'view_all', 'safe_demo']
  }
};

interface AppState {
  currentRoleKey: string;
  currentRole: UserRole;
  setRole: (roleKey: string) => void;
  
  // Active Scenario & Rainfall parameters
  activeScenarioCode: string;
  rainfallIntensity: number; // mm/hr
  rainfallDuration: number;  // hours
  drainageEfficiency: number; // 0.0 - 1.0
  setScenarioParams: (code: string, intensity: number, duration: number, efficiency: number) => void;
  
  // Guided Demo Modal
  isGuidedDemoOpen: boolean;
  guidedDemoStep: number;
  openGuidedDemo: () => void;
  closeGuidedDemo: () => void;
  setGuidedDemoStep: (step: number) => void;
  
  // Copilot Assistant Modal
  isCopilotOpen: boolean;
  openCopilot: () => void;
  closeCopilot: () => void;
  
  // System Telemetry
  urbanRiskIndex: number;
  setUrbanRiskIndex: (idx: number) => void;
  
  // Selected Map Feature
  selectedFeature: any | null;
  setSelectedFeature: (feature: any | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentRoleKey: 'demo',
  currentRole: USER_ROLES.demo,
  setRole: (roleKey: string) => {
    const role = USER_ROLES[roleKey] || USER_ROLES.demo;
    set({ currentRoleKey: roleKey, currentRole: role });
  },

  activeScenarioCode: 'SCENARIO_A',
  rainfallIntensity: 85.0,
  rainfallDuration: 4.0,
  drainageEfficiency: 0.60,
  setScenarioParams: (code, intensity, duration, efficiency) =>
    set({
      activeScenarioCode: code,
      rainfallIntensity: intensity,
      rainfallDuration: duration,
      drainageEfficiency: efficiency
    }),

  isGuidedDemoOpen: false,
  guidedDemoStep: 1,
  openGuidedDemo: () => set({ isGuidedDemoOpen: true, guidedDemoStep: 1 }),
  closeGuidedDemo: () => set({ isGuidedDemoOpen: false }),
  setGuidedDemoStep: (step: number) => set({ guidedDemoStep: step }),

  isCopilotOpen: false,
  openCopilot: () => set({ isCopilotOpen: true }),
  closeCopilot: () => set({ isCopilotOpen: false }),

  urbanRiskIndex: 68.5,
  setUrbanRiskIndex: (idx: number) => set({ urbanRiskIndex: idx }),

  selectedFeature: null,
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),
}));
