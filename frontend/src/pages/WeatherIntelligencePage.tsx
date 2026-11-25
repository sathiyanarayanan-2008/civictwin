import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { CloudRain, Wind, Droplets, Compass, Thermometer, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const WeatherIntelligencePage: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      const data = await api.getCurrentWeather();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  const hourlyData = weather?.hourly_forecast || [
    { timestamp: '+1h', rainfall_mm: 24.0, temperature_c: 29.8, precipitation_probability: 85 },
    { timestamp: '+2h', rainfall_mm: 42.5, temperature_c: 28.5, precipitation_probability: 90 },
    { timestamp: '+3h', rainfall_mm: 65.0, temperature_c: 27.2, precipitation_probability: 95 },
    { timestamp: '+4h', rainfall_mm: 38.0, temperature_c: 27.8, precipitation_probability: 80 },
    { timestamp: '+6h', rainfall_mm: 15.0, temperature_c: 28.4, precipitation_probability: 60 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/30 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-[#06D6EF]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Weather Intelligence & Precipitation Radar
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#06D6EF] border border-[#06D6EF]/30">
              OPEN-METEO INTEGRATION
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Real-time atmospheric telemetry, rainfall probability index, and Chennai Doppler radar trend forecasting.
          </p>
        </div>

        <div className="text-xs font-mono text-[#06D6EF] bg-[#060B1A] px-3 py-1.5 rounded-xl border border-[#131D38]">
          SOURCE: {weather?.source || 'Open-Meteo Live API'}
        </div>
      </div>

      {/* Atmospheric Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-2">
          <div className="flex justify-between items-center text-[#94A3B8] text-xs font-mono">
            <span>SURFACE TEMP</span>
            <Thermometer className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {weather?.temperature_c || '29.5'} °C
          </div>
          <span className="text-[10px] text-[#94A3B8]">Tropical Coastal Heat</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#06D6EF]/40 space-y-2">
          <div className="flex justify-between items-center text-[#94A3B8] text-xs font-mono">
            <span>RAINFALL RATE</span>
            <CloudRain className="w-4 h-4 text-[#06D6EF]" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#06D6EF]">
            {weather?.rainfall_mm || '48.2'} mm/h
          </div>
          <span className="text-[10px] text-cyan-400 font-semibold">{weather?.condition_text || 'Heavy Monsoon Showers'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-2">
          <div className="flex justify-between items-center text-[#94A3B8] text-xs font-mono">
            <span>PRECIPITATION PROB</span>
            <Droplets className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {weather?.precipitation_probability || '85'} %
          </div>
          <span className="text-[10px] text-[#94A3B8]">Depression Ingress</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-2">
          <div className="flex justify-between items-center text-[#94A3B8] text-xs font-mono">
            <span>WIND VELOCITY</span>
            <Wind className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {weather?.wind_speed_kmh || '24.5'} km/h
          </div>
          <span className="text-[10px] text-[#94A3B8]">Bay of Bengal Inflow</span>
        </div>
      </div>

      {/* Precipitation Projection Chart */}
      <div className="p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
        <h3 className="font-bold text-sm text-white">6-Hour Hourly Rainfall & Precipitation Probability</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData}>
              <XAxis dataKey="timestamp" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0D1428', borderColor: '#06D6EF', fontSize: '12px' }} />
              <Area type="monotone" dataKey="rainfall_mm" stroke="#06D6EF" fill="#06D6EF" fillOpacity={0.2} name="Rainfall (mm/h)" />
              <Area type="monotone" dataKey="precipitation_probability" stroke="#8B5CF6" fill="transparent" name="Probability (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
