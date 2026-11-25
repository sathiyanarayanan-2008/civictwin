import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { useAppStore, USER_ROLES } from '../../stores/useAppStore';
import {
  Bell,
  Sparkles,
  Bot,
  Activity,
  Shield,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const {
    currentRoleKey,
    currentRole,
    setRole,
    openGuidedDemo,
    openCopilot,
    urbanRiskIndex
  } = useAppStore();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' IST'
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#060B1A]/85 backdrop-blur-md border-b border-[#06D6EF]/15 px-4 lg:px-6 flex items-center justify-between">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:opacity-95 transition">
          <Logo size={36} />
        </Link>

        {/* Live Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1428] border border-[#2563EB]/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-[#94A3B8]">CHENNAI TWIN:</span>
          <span className="text-[#06D6EF] font-bold">ONLINE</span>
          <span className="text-[#64748B]">|</span>
          <span className="text-[#F8FAFC]">{currentTime}</span>
        </div>
      </div>

      {/* Action Controls & User Role */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Guided Hackathon Demo Button */}
        <button
          onClick={openGuidedDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06D6EF] text-white shadow-lg shadow-[#2563EB]/30 hover:brightness-110 active:scale-95 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>1-Click Hackathon Demo</span>
        </button>

        {/* AI Copilot Quick Launcher */}
        <button
          onClick={openCopilot}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0D1428] border border-[#8B5CF6]/50 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 active:scale-95 transition"
          title="Open CivicTwin AI Copilot"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Copilot</span>
        </button>

        {/* Urban Risk Index Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0D1428] border border-[#131D38]">
          <Activity className="w-3.5 h-3.5 text-[#F59E0B]" />
          <div className="text-right">
            <div className="text-[9px] font-mono uppercase text-[#94A3B8]">Risk Index</div>
            <div className="text-xs font-mono font-bold text-[#F59E0B] leading-none">
              {urbanRiskIndex} / 100
            </div>
          </div>
        </div>

        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1428] border border-[#06D6EF]/30 text-xs hover:border-[#06D6EF]/60 transition"
          >
            <Shield className="w-3.5 h-3.5 text-[#06D6EF]" />
            <div className="text-left hidden sm:block">
              <div className="text-[10px] font-mono text-[#94A3B8] leading-none">Role</div>
              <div className="text-xs font-bold text-white leading-none mt-0.5">{currentRole.name}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 p-2 rounded-xl bg-[#0D1428] border border-[#2563EB]/40 shadow-2xl backdrop-blur-xl z-50">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] border-b border-[#131D38] mb-1">
                Switch Operational Role
              </div>
              {Object.entries(USER_ROLES).map(([key, role]) => (
                <button
                  key={key}
                  onClick={() => {
                    setRole(key);
                    setIsRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition flex flex-col ${
                    currentRoleKey === key
                      ? 'bg-[#2563EB]/20 border border-[#06D6EF]/50 text-white font-bold'
                      : 'text-[#94A3B8] hover:bg-[#131D38] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{role.name}</span>
                    {currentRoleKey === key && <span className="text-[10px] text-[#06D6EF]">Active</span>}
                  </div>
                  <span className="text-[9px] font-mono text-[#64748B] mt-0.5">{role.badge}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
