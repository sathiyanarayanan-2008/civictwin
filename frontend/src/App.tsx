import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './layouts/AppLayout';
import { CommandCentre } from './pages/CommandCentre';
import { UrbanDigitalTwinPage } from './pages/UrbanDigitalTwinPage';
import { PredictiveRiskMapPage } from './pages/PredictiveRiskMapPage';
import { AIAgentControlCentrePage } from './pages/AIAgentControlCentrePage';
import { CrisisSimulationLabPage } from './pages/CrisisSimulationLabPage';
import { PreventionComparatorPage } from './pages/PreventionComparatorPage';
import { EmergencyResourcePlannerPage } from './pages/EmergencyResourcePlannerPage';
import { CitizenReportingPage } from './pages/CitizenReportingPage';
import { WeatherIntelligencePage } from './pages/WeatherIntelligencePage';
import { InfrastructureMonitoringPage } from './pages/InfrastructureMonitoringPage';
import { ExplainableAIPage } from './pages/ExplainableAIPage';
import { AlertsNotificationsPage } from './pages/AlertsNotificationsPage';
import { AnalyticsReportsPage } from './pages/AnalyticsReportsPage';
import { ProjectArchitecturePage } from './pages/ProjectArchitecturePage';
import { SettingsDataSourcesPage } from './pages/SettingsDataSourcesPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AboutProjectPage } from './pages/AboutProjectPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Main Command Center Application Layout */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="/app/command-centre" replace />} />
        <Route path="command-centre" element={<CommandCentre />} />
        <Route path="digital-twin" element={<UrbanDigitalTwinPage />} />
        <Route path="risk-map" element={<PredictiveRiskMapPage />} />
        <Route path="agents" element={<AIAgentControlCentrePage />} />
        <Route path="simulation-lab" element={<CrisisSimulationLabPage />} />
        <Route path="prevention-comparator" element={<PreventionComparatorPage />} />
        <Route path="resource-planner" element={<EmergencyResourcePlannerPage />} />
        <Route path="citizen-reporting" element={<CitizenReportingPage />} />
        <Route path="weather" element={<WeatherIntelligencePage />} />
        <Route path="infrastructure" element={<InfrastructureMonitoringPage />} />
        <Route path="explainable-ai" element={<ExplainableAIPage />} />
        <Route path="alerts" element={<AlertsNotificationsPage />} />
        <Route path="analytics" element={<AnalyticsReportsPage />} />
        <Route path="architecture" element={<ProjectArchitecturePage />} />
        <Route path="settings" element={<SettingsDataSourcesPage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="about" element={<AboutProjectPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
