import React from 'react';
import { useAppStore, USER_ROLES, UserRole } from '../stores/useAppStore';
import { User, Shield, CheckCircle2, Lock } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { currentRoleKey, currentRole, setRole } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#06D6EF]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              User Profile & Role-Based Access Control (RBAC)
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              5 SECURE ROLES
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Server-validated role-based permissions governing simulations, citizen report submissions, and consequential dispatches.
          </p>
        </div>

        <div className="text-xs font-mono text-[#06D6EF] bg-[#060B1A] px-3 py-1.5 rounded-xl border border-[#131D38]">
          ACTIVE: {currentRole.name.toUpperCase()}
        </div>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {(Object.entries(USER_ROLES) as [string, UserRole][]).map(([key, role]) => (
          <div
            key={key}
            onClick={() => setRole(key)}
            className={`p-4 rounded-xl bg-[#0D1428] border cursor-pointer transition flex flex-col justify-between ${
              currentRoleKey === key
                ? 'border-[#06D6EF] bg-[#06D6EF]/10 shadow-lg'
                : 'border-[#131D38] hover:border-[#2563EB]/40'
            }`}
          >
            <div>
              <div className="text-[10px] font-mono text-[#06D6EF] mb-1">{role.badge}</div>
              <h4 className="font-bold text-xs text-white">{role.name}</h4>
            </div>
            <div className="mt-3 pt-2 border-t border-[#131D38] text-[10px] font-mono">
              {currentRoleKey === key ? (
                <span className="text-[#10B981] font-bold">Active Role</span>
              ) : (
                <span className="text-[#64748B]">Click to Switch</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Active Permissions Breakdown */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
        <h3 className="font-bold text-sm text-white">Active Operational Permissions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {currentRole.permissions.map((perm: string, idx: number) => (
            <div key={idx} className="p-3 rounded-xl bg-[#0A1124] border border-[#131D38] flex items-center gap-2 text-[#F8FAFC]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="font-mono text-[11px]">{perm}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

