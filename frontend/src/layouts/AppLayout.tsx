import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { CivicCopilotModal } from '../components/copilot/CivicCopilotModal';
import { GuidedDemoModal } from '../components/demo/GuidedDemoModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060B1A] text-[#F8FAFC] flex flex-col antialiased">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar bg-gradient-to-b from-[#060B1A] to-[#0A1124]">
          <Outlet />
        </main>
      </div>

      {/* Global Floating Modals */}
      <CivicCopilotModal />
      <GuidedDemoModal />
    </div>
  );
};
