import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glowing pulse halo */}
        <div 
          className="absolute rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#06D6EF] blur-md opacity-70 animate-pulse-subtle"
          style={{ width: size, height: size }}
        />
        {/* Core SVG Logo */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_0_8px_rgba(6,214,239,0.6)]"
        >
          {/* Hexagonal Shield Outer Rim */}
          <polygon
            points="50,5 92,27 92,73 50,95 8,73 8,27"
            stroke="url(#shieldGrad)"
            strokeWidth="5"
            fill="#060B1A"
            fillOpacity="0.85"
          />
          {/* Internal Digital Twin Isometric Grid Lines */}
          <path
            d="M50 5 L50 95 M8 27 L92 73 M8 73 L92 27"
            stroke="url(#gridGrad)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeOpacity="0.4"
          />
          {/* Central Twin Pulse Nodes */}
          <circle cx="50" cy="50" r="14" fill="url(#coreGrad)" />
          <circle cx="50" cy="50" r="8" fill="#F8FAFC" />
          {/* Predictive Radar Arcs */}
          <circle cx="50" cy="50" r="26" stroke="#06D6EF" strokeWidth="2" strokeDasharray="10 20" strokeOpacity="0.8" />
          <circle cx="50" cy="50" r="36" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="5 15" strokeOpacity="0.6" />

          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06D6EF" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="gridGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06D6EF" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="coreGrad" x1="36" y1="36" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06D6EF" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-bold text-lg tracking-wider text-white">
            CIVIC<span className="text-[#06D6EF]">TWIN</span>
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 border border-[#06D6EF]/40 text-[#06D6EF]">
            AI
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-widest text-[#94A3B8] uppercase">
          Predict · Prevent · Protect
        </span>
      </div>
    </div>
  );
};
